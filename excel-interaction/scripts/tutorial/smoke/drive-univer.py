# drive-univer.py — univer 引擎模板冒烟（入库工具；测试课组装见 setup.mjs）。
# 走 lesson.js 真路径：挂载→自动播放→验收回读→手动练习 onChange→选区联动；
# 顺带探同步回读语义（setFormula 后立刻 readValue 的值——univer 公式落值可能滞后）。
import json
import sys
import time
from pathlib import Path

from playwright.sync_api import sync_playwright

URL = "http://localhost:4323/univer-xsum/index.html"
OUT = Path("out/univer-smoke")


def main():
    ok = True
    with sync_playwright() as p:
        b = p.chromium.launch()
        page = b.new_page(viewport={"width": 1280, "height": 800})
        errors = []
        page.on("console", lambda m: errors.append(m.text) if m.type == "error" else None)
        page.on("pageerror", lambda e: errors.append(str(e)))
        page.goto(URL)
        page.wait_for_function("window.Lesson && window.Engine && window.UniverExcelKit", timeout=30000)

        # 1) 同步回读探测：停表后写公式，立刻读 + 延迟读（真算落值时差实测）
        page.evaluate("Lesson.reset()")
        page.wait_for_timeout(800)
        probe = page.evaluate("""() => {
          Engine.setFormula('B2', '=SUM(明细!B2:B4)');
          const v = Engine.readValue('B2');
          return { syncValue: v, formula: Engine.getFormula('B2') };
        }""")
        print("sync-probe:", json.dumps(probe, ensure_ascii=True))
        time.sleep(0.8)
        late = page.evaluate("() => Engine.readValue('B2')")
        print("late-value:", late)

        # 2) 自动播放全链路（Lesson 状态机驱动，含 reset→mount 重建压力）
        page.evaluate("Lesson.play()")
        page.wait_for_function("() => Lesson.state().step === 5", timeout=30000)
        res = page.evaluate("""() => ({
          result: document.getElementById('result-value').textContent,
          caption: document.getElementById('caption-bar').textContent,
          value: Engine.readValue('B2'),
          formula: Engine.getFormula('B2'),
        })""")
        print("play-result:", json.dumps(res, ensure_ascii=True))
        ok &= res["result"] == "3600"
        ok &= "3600" in res["caption"] or "王五" in res["caption"] or "✓" in res["caption"]
        ok &= (res["value"] == 3600 or res["value"] == "3600")
        ok &= "SUM" in (res["formula"] or "").upper()

        # 3) 手动练习 onChange 链路（练习态写公式 → 自动验收）
        page.evaluate("Lesson.practice()")
        page.wait_for_timeout(300)
        page.evaluate("() => { Engine.setFormula('B2', '=SUM(明细!B2:B4)'); }")
        page.wait_for_timeout(600)
        practice = page.evaluate("() => document.getElementById('caption-bar').textContent")
        print("practice-caption:", practice.encode("unicode_escape").decode()[:120])
        ok &= practice.startswith("✓")

        # 4) 选区联动（focusCell → onSelection → 公式栏回显）
        page.evaluate("() => Engine.focusCell('B2')")
        page.wait_for_timeout(300)
        echo = page.evaluate("() => document.getElementById('formula-echo').textContent")
        print("formula-echo:", echo.encode("unicode_escape").decode()[:80])
        ok &= "SUM" in (echo or "").upper()

        page.screenshot(path=str(OUT / "univer-xsum.png"), full_page=True)
        errs = [e for e in errors if "favicon" not in e]
        print("console-errors:", len(errs), errs[:3])
        ok &= len(errs) == 0
        b.close()
    print("SMOKE", "PASS" if ok else "FAIL")
    sys.exit(0 if ok else 1)


if __name__ == "__main__":
    main()
