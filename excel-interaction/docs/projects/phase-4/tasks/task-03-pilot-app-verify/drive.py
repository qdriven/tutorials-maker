# drive.py — task-03 浏览器验收驱动（一次性取证工具，留档）
# 用法：先起 node scripts/serve/serve.mjs --dir apps --port 4199，再 python drive.py
# 产出：shots/ 验收截图 + stdout JSON（readValue / 练习验收 / 控制台报错）
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
    page.on("pageerror", lambda e: errors.append(str(e)))

    page.goto(BASE)
    page.wait_for_function("window.Lesson && document.querySelector('#guide-panel .guide-card')")

    # 确定性逐步：停掉开场自动播放，按状态机逐拍取证
    page.evaluate("Lesson.reset()")
    page.wait_for_timeout(300)
    for n in range(1, 5):
        page.evaluate(f"Lesson.gotoStep({n})")
        page.wait_for_timeout(1600)  # 等该拍动效完（typeIn ≤1.2s + 余量）
        page.screenshot(path=str(OUT / f"step{n}.png"), full_page=True)
    page.evaluate("Lesson.finish()")
    page.wait_for_timeout(400)
    page.screenshot(path=str(OUT / "step-done.png"), full_page=True)

    result["readValue_E2"] = page.evaluate("Engine.readValue('E2')")
    result["getFormula_E2"] = page.evaluate("Engine.getFormula('E2')")

    # 验收点 2 后半：手动练习输入公式 → 自动验收
    page.evaluate("Lesson.practice()")
    page.wait_for_timeout(300)
    page.screenshot(path=str(OUT / "practice-idle.png"), full_page=True)
    page.evaluate("Engine.setFormula('E2', '=VLOOKUP(D2,A2:B5,2,0)')")
    page.wait_for_timeout(400)
    result["practice_caption"] = page.text_content("#caption-bar")
    result["practice_debug"] = page.evaluate(
        "({f: Engine.getFormula('E2'), v: String(Engine.readValue('E2'))})"
    )
    page.screenshot(path=str(OUT / "practice-pass.png"), full_page=True)

    # 验收点 4：green 主题覆盖
    page.goto(BASE + "?theme=green")
    page.wait_for_function("window.Lesson && document.querySelector('#guide-panel .guide-card')")
    page.evaluate("Lesson.reset()")
    page.evaluate("Lesson.gotoStep(3)")
    page.wait_for_timeout(1600)
    page.screenshot(path=str(OUT / "theme-green.png"), full_page=True)

    result["console_errors"] = errors
    (OUT.parent / "result.json").write_text(
        json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    print(json.dumps(result, ensure_ascii=True))
    b.close()
