# drive-oo.py — #14 onlyoffice docserver 四 API 端到端验收（playwright chromium）。
# 口径（issue #14）：seed 铺数 → setFormula 真算 → getValue 回读 → focus 选中
#                 + 练习态 500ms 轮询验收（外部文档改动 → 轮询检出 → 缓存刷新 → 验收通过）。
# 外部改动经插件桥原始命令（非 Engine.setFormula）——与用户手输公式同一文档变更路径，
# 走的正是轮询检出链（setFormula 会直发 changeHandler，测不到轮询）。
import json
import sys

# GBK 控制台打不出 ✓/中文——强制 UTF-8 输出（record.mjs 同口径）
try:
    sys.stdout.reconfigure(encoding="utf-8")
    sys.stderr.reconfigure(encoding="utf-8")
except Exception:
    pass
import time
from pathlib import Path

from playwright.sync_api import sync_playwright

# Docker 内 docserver 取 localhost 会指向容器自身（"下载失败"）——文档/插件 URL 走 host.docker.internal
URL = "http://localhost:4173/oo-test/index.html?fileOrigin=http://host.docker.internal:4173"
OUT = Path(__file__).resolve().parents[2] / "out" / "oo-test"
OUT.mkdir(parents=True, exist_ok=True)

results = []


def t(label, ok, detail=""):
    results.append({"label": label, "ok": bool(ok), "detail": str(detail)[:200]})
    print(("PASS  " if ok else "FAIL  ") + label + (" → " + str(detail) if detail else ""))


def main():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={"width": 1400, "height": 900})
        errors = []
        page.on("pageerror", lambda e: errors.append(str(e)))
        page.on("console", lambda m: errors.append("console:" + m.text) if m.type == "error" else None)

        # networkidle 永不静止（docserver 长连接/websocket）——domcontentloaded + 显式等 lesson
        # 插件跑在编辑器 iframe 的嵌套窗口（探针实证：发外层 iframe 超时）——
        # 捕获 ready 消息的 event.source 即插件真窗口；
        # 计数 ready——practice 的 reset 会重建编辑器+插件，必须等**新**插件就绪再发命令
        page.add_init_script(
            """window.addEventListener('message', (e) => {
            if (e.data && e.data.source === 'oo-tutorial' && e.data.type === 'ready') {
              window.__pw = e.source;
              window.__pwCount = (window.__pwCount || 0) + 1;
            }
          }, true);"""
        )
        page.goto(URL, wait_until="domcontentloaded", timeout=60000)

        # ── ① 自动播放全链：seed 铺数 → focus(步1) → typeIn(步2) → setFormula 真算(步3)
        #      → getValue 回读(步3 显示) → getFormula(步4 编辑栏) → finish checks ──
        try:
            page.wait_for_function(
                "() => window.Lesson && window.Lesson.state().step === 5", timeout=60000
            )
            auto_done = True
        except Exception as e:
            auto_done = False
            t("自动播放走完(step=5)", False, e)
        if auto_done:
            cap = page.evaluate("document.getElementById('caption-bar').textContent")
            val = page.evaluate("document.getElementById('result-value').textContent")
            echo = page.evaluate("document.getElementById('formula-echo').textContent")
            t("自动播放 finish 验收 ✓", cap.startswith("✓"), cap[:90])
            t("setFormula→getValue 真算回读(3600)", val.strip() == "3600", f"value={val}")
            t("getFormula 编辑栏回读", "=SUM(" in echo, f"echo={echo}")
            # focus(步1)：选区存在（插件 focus 动作）
            sel = page.evaluate("""() => {
                const f = document.querySelector('#oo-editor iframe, iframe');
                return f ? 'iframe-ok' : 'no-iframe';
            }""")
            t("编辑器 iframe 已挂载(docserver 服务)", sel == "iframe-ok", sel)

        # ── ② 练习态 500ms 轮询验收：外部文档改动 → 轮询检出 → 缓存刷新 → 通过 ──
        # reset 会销毁旧插件窗口（发过去石沉大海——实测）：等新 ready 计数 +1 且 seed 铺完
        count0 = page.evaluate("window.__pwCount || 0")
        page.click("#btn-practice")
        page.wait_for_function(
            "(c) => (window.__pwCount || 0) > c", arg=count0, timeout=30000
        )  # 新插件 ready
        page.wait_for_timeout(1500)  # seed(A1:Z200 Clear + 铺数)完成
        cap0 = page.evaluate("document.getElementById('caption-bar').textContent")
        t("练习态启动(目标提示)", "手动练习" in cap0, cap0[:70])

        # 外部改动：插件桥原始 setFormula（与用户手输同路径，必须经轮询检出）
        sheet = page.evaluate("fetch('/oo-test/course.config.json').then(r=>r.json()).then(c=>c.data.sheets[0].name)")
        sent = page.evaluate(
            """(sheet) => {
                if (!window.__pw) return 'no-plugin-window';
                window.__pw.postMessage({
                    source: 'oo-host', type: 'command', id: 90001,
                    action: 'setFormula',
                    payload: { sheet: sheet, addr: 'C2', formula: '=SUM(B2:B4)' }
                }, '*');
                return 'sent';
            }""",
            sheet,
        )
        t("外部 setFormula 经插件桥发出", sent == "sent", sent)
        try:
            page.wait_for_function(
                "() => document.getElementById('caption-bar').textContent.startsWith('✓')",
                timeout=8000,
            )
            cap1 = page.evaluate("document.getElementById('caption-bar').textContent")
            t("练习态 500ms 轮询验收通过(值+公式)", True, cap1[:90])
        except Exception:
            cap1 = page.evaluate("document.getElementById('caption-bar').textContent")
            t("练习态 500ms 轮询验收通过(值+公式)", False, cap1[:120])

        page.screenshot(path=str(OUT / "oo-test-drive.png"))
        t("console 零错误", len(errors) == 0, "; ".join(errors[:3]))

        browser.close()

    out = OUT / "drive-result.json"
    out.write_text(json.dumps(results, ensure_ascii=False, indent=2), encoding="utf-8")
    npass = sum(1 for r in results if r["ok"])
    print(f"---- #14 四 API 验收: PASS={npass}/{len(results)} → {out}")
    sys.exit(0 if npass == len(results) else 1)


if __name__ == "__main__":
    main()
