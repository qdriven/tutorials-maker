# drive-01.py — phase-7 task-01 展示层 验收驱动（一次性取证工具，留档）
# 用法：先起 node scripts/serve/serve.mjs --dir . --port 4174，再 python drive-01.py
import json
import sys
from pathlib import Path
from playwright.sync_api import sync_playwright

sys.stdout.reconfigure(encoding="utf-8", errors="replace")  # GBK 控制台打 ✓/✗ 不崩

BASE = "http://localhost:4174/src/standalone/index.html"
OUT = Path(__file__).parent / "shots"
OUT.mkdir(exist_ok=True)

errors = []
result = {}

with sync_playwright() as p:
    b = p.chromium.launch()
    page = b.new_page(viewport={"width": 1280, "height": 900})
    page.on("console", lambda m: errors.append(m.text) if m.type == "error" else None)
    page.on("pageerror", lambda e: errors.append((e.stack or str(e))[:600]))

    page.goto(BASE)
    page.wait_for_selector("#cards .card")

    # ① 清单驱动渲染：4 卡 + 类型分布
    result["card_count"] = page.locator("#cards .card").count()
    result["types"] = page.evaluate(
        "Array.from(document.querySelectorAll('#cards .card')).map(c => c.dataset.type + ':' + c.dataset.id)"
    )
    page.screenshot(path=str(OUT / "showcase-all.png"), full_page=True)

    # ② app 卡：iframe src 显式 index.html + 课内 DOM 真载入
    result["iframe_src"] = page.get_attribute("#cards .card[data-type=app] iframe", "src")
    frame = page.frame_locator("#cards .card[data-type=app] iframe")
    frame.locator("#lesson").wait_for(timeout=10000)
    result["iframe_lesson_theme"] = frame.locator("#lesson").get_attribute("data-theme")
    page.screenshot(path=str(OUT / "showcase-app.png"), full_page=True)

    # ③ demo 卡：视频 src 显式 + 资源 200；doc 链接 200
    result["video_src"] = page.get_attribute("#cards .card[data-type=demo] video", "src")
    result["fetch_codes"] = page.evaluate(
        """async () => {
          const urls = [
            document.querySelector('#cards .card[data-type=demo] video').src,
            ...Array.from(document.querySelectorAll('#cards .card[data-type=doc] a')).map(a => a.href),
          ];
          const out = {};
          for (const u of urls) out[u] = (await fetch(u, { method: 'GET' })).status;
          return out;
        }"""
    )

    # ④ tab 过滤：视频 → 1 卡；文档 → 2 卡；全部 → 4 卡
    page.click('#tabs button[data-type="demo"]')
    page.wait_for_timeout(150)
    result["cards_demo_tab"] = page.locator("#cards .card").count()
    page.screenshot(path=str(OUT / "showcase-demo.png"), full_page=True)
    page.click('#tabs button[data-type="doc"]')
    page.wait_for_timeout(150)
    result["cards_doc_tab"] = page.locator("#cards .card").count()
    page.click('#tabs button[data-type="all"]')
    page.wait_for_timeout(150)
    result["cards_all_tab"] = page.locator("#cards .card").count()

    b.close()

result["console_errors"] = errors
(Path(__file__).parent / "result.json").write_text(
    json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8"
)
print(json.dumps(result, ensure_ascii=False, indent=2))
