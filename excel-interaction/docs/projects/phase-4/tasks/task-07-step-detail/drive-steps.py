# drive-steps.py — task-07 验收框逐步展示验收驱动（一次性取证工具，留档）
# 用法：先起 node scripts/serve/serve.mjs --dir apps --port 4199，再 python drive-steps.py
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

    # ① 逐步展示：gotoStep(1..4) 逐步回读 #step-detail
    detail = {}
    for n in (1, 2, 3, 4):
        page.evaluate(f"Lesson.gotoStep({n})")
        page.wait_for_timeout(1500 if n == 2 else 500)
        detail[f"step{n}"] = page.text_content("#step-detail")
        if n == 2:
            page.screenshot(path=str(OUT / "step-detail-step2.png"), full_page=True)
    result["steps_detail"] = detail

    # ② 手动练习：目标/参考公式/参数/提示
    page.evaluate("Lesson.practice()")
    page.wait_for_timeout(300)
    result["practice_detail"] = page.text_content("#step-detail")
    page.screenshot(path=str(OUT / "step-detail-practice.png"), full_page=True)

    # ③ 完成态：play() 全程
    page.evaluate("Lesson.play()")
    page.wait_for_timeout(8000)
    result["done_detail"] = page.text_content("#step-detail")
    result["done_caption"] = page.text_content("#caption-bar")
    result["state"] = page.evaluate("Lesson.state()")

    # ④ green 主题渲染正常（回归）
    page.goto(BASE + "?theme=green")
    page.wait_for_function("window.Lesson && document.querySelector('#guide-panel .guide-card')")
    page.evaluate("Lesson.gotoStep(2)")
    page.wait_for_timeout(1500)
    result["green_detail_has_args"] = page.evaluate(
        "document.querySelectorAll('#step-detail .sd-arg').length"
    )
    page.screenshot(path=str(OUT / "step-detail-green.png"), full_page=True)

    result["console_errors"] = errors
    (OUT.parent / "result.json").write_text(
        json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    print(json.dumps(result, ensure_ascii=True))
    b.close()
