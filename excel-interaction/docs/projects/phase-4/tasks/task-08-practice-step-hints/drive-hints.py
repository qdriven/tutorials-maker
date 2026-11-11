# drive-hints.py — task-08 手动练习步骤提示验收驱动（一次性取证工具，留档）
# 用法：先起 node scripts/serve/serve.mjs --dir apps --port 4199，再 python drive-hints.py
import json
from pathlib import Path
from playwright.sync_api import sync_playwright

BASE = "http://localhost:4199/vlookup-basic/index.html"
OUT = Path(__file__).parent / "shots"
OUT.mkdir(exist_ok=True)

errors = []
result = {}

with sync_playwright() as p:
    b = p.chromium.launch()
    page = b.new_page(viewport={"width": 1280, "height": 800})
    page.on("console", lambda m: errors.append(m.text) if m.type == "error" else None)
    page.on("pageerror", lambda e: errors.append((e.stack or str(e))[:600]))

    page.goto(BASE)
    page.wait_for_function("window.Lesson && document.querySelector('#guide-panel .guide-card')")
    page.evaluate("Lesson.reset()")
    page.wait_for_timeout(300)

    # ① 练习态逐步提示：目标 + 4 步清单 + 参数 + 操作提示
    page.evaluate("Lesson.practice()")
    page.wait_for_timeout(300)
    detail = page.text_content("#step-detail")
    result["practice_detail"] = detail
    result["hint_step_titles"] = page.evaluate(
        "Array.from(document.querySelectorAll('#step-detail .sd-step-title')).map(e => e.textContent)"
    )
    result["hint_arg_rows"] = page.evaluate(
        "document.querySelectorAll('#step-detail .sd-step .sd-arg').length"
    )
    result["hint_soft_expect"] = page.evaluate(
        "Array.from(document.querySelectorAll('#step-detail .sd-soft')).map(e => e.textContent)"
    )
    page.screenshot(path=str(OUT / "practice-step-hints.png"), full_page=True)

    # ② 回归：练习验收 ✓（提示不影响真算验收链）
    page.evaluate("Engine.setFormula('E2', '=VLOOKUP(D2,A2:B5,2,0)')")
    page.wait_for_timeout(400)
    result["practice_verify_caption"] = page.text_content("#caption-bar")

    # ③ 回归：自动播放态逐步展示不变（重载页面回 auto 态——gotoStep 不切 mode）
    page.goto(BASE)
    page.wait_for_function("window.Lesson && document.querySelector('#guide-panel .guide-card')")
    page.evaluate("Lesson.reset()")
    page.evaluate("Lesson.gotoStep(2)")
    page.wait_for_timeout(1500)
    result["autoplay_step2_detail"] = page.text_content("#step-detail")
    page.screenshot(path=str(OUT / "autoplay-step2-unchanged.png"), full_page=True)

    result["console_errors"] = errors
    (OUT.parent / "result.json").write_text(
        json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    print(json.dumps(result, ensure_ascii=True))
    b.close()
