# drive-fold.py — task-09 验收框全步折叠展示验收驱动（一次性取证工具，留档）
# 用法：先起 node scripts/serve/serve.mjs --dir apps --port 4199，再 python drive-fold.py
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
    page = b.new_page(viewport={"width": 1280, "height": 900})
    page.on("console", lambda m: errors.append(m.text) if m.type == "error" else None)
    page.on("pageerror", lambda e: errors.append((e.stack or str(e))[:600]))

    page.goto(BASE)
    page.wait_for_function("window.Lesson && document.querySelector('#guide-panel .guide-card')")
    page.evaluate("Lesson.reset()")
    page.wait_for_timeout(300)

    def folds_state():
        return page.evaluate(
            "Array.from(document.querySelectorAll('#step-detail details.sd-fold')).map(d => ({step: d.getAttribute('data-step'), open: d.open}))"
        )

    # ① 自动播放态：4 步常驻；gotoStep(2) → 第 2 展开、1/3/4 折叠（非替换）
    page.evaluate("Lesson.gotoStep(2)")
    page.wait_for_timeout(1500)
    result["folds_after_step2"] = folds_state()
    result["items_count"] = page.evaluate("document.querySelectorAll('#step-detail details.sd-fold').length")
    page.screenshot(path=str(OUT / "fold-auto-step2.png"), full_page=True)

    # ② 折叠交互：点第 3 标题 → 展开（偏好记住）；点第 2 → 收起
    page.click('#step-detail details.sd-fold[data-step="3"] summary')
    page.wait_for_timeout(200)
    result["after_click_step3"] = folds_state()
    page.click('#step-detail details.sd-fold[data-step="2"] summary')
    page.wait_for_timeout(200)
    result["after_click_step2"] = folds_state()
    page.screenshot(path=str(OUT / "fold-click-toggle.png"), full_page=True)

    # ③ 练习态：全展开 + 目标/提示行
    page.evaluate("Lesson.practice()")
    page.wait_for_timeout(300)
    result["folds_practice"] = folds_state()
    result["practice_has_goal"] = page.evaluate(
        "(document.querySelector('#step-detail').textContent || '').includes('目标')"
    )
    page.screenshot(path=str(OUT / "fold-practice-all-open.png"), full_page=True)

    # ④ 回归：练习验收 ✓、console 零报错
    page.evaluate("Engine.setFormula('E2', '=VLOOKUP(D2,A2:B5,2,0)')")
    page.wait_for_timeout(400)
    result["practice_verify_caption"] = page.text_content("#caption-bar")

    result["console_errors"] = errors
    (OUT.parent / "result.json").write_text(
        json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    print(json.dumps(result, ensure_ascii=True))
    b.close()
