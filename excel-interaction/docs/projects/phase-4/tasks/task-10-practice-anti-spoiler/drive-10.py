# drive-10.py — task-10 练习态防剧透 + 布局换边 + 删指南卡 验收驱动（一次性取证工具，留档）
# 用法：先起 node scripts/serve/serve.mjs --dir apps --port 4199，再 python drive-10.py
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
    page.wait_for_function("window.Lesson && document.querySelector('#step-detail details.sd-fold')")
    page.evaluate("Lesson.reset()")
    page.wait_for_timeout(300)

    def folds_state():
        return page.evaluate(
            "Array.from(document.querySelectorAll('#step-detail details.sd-fold')).map(d => d.open)"
        )

    # ① 布局换边：验收框在表格左侧；指南卡已删
    boxes = page.evaluate(
        "(() => { const r = document.querySelector('#result-area').getBoundingClientRect();"
        " const t = document.querySelector('#table-area').getBoundingClientRect();"
        " return {result_x: r.x, table_x: t.x}; })()"
    )
    result["result_left_of_table"] = boxes["result_x"] < boxes["table_x"]
    result["guide_panel_count"] = page.evaluate("document.querySelectorAll('#guide-panel, .guide-card').length")

    # ② 自动播放回归：gotoStep(2) → 第 2 展开其余折叠（语义不变，布局已换边）
    page.evaluate("Lesson.gotoStep(2)")
    page.wait_for_timeout(1500)
    result["folds_auto_step2"] = folds_state()
    page.screenshot(path=str(OUT / "layout-auto-step2.png"), full_page=True)

    # ③ 练习态防剧透：全折叠
    page.evaluate("Lesson.practice()")
    page.wait_for_timeout(300)
    result["folds_practice_initial"] = folds_state()
    page.screenshot(path=str(OUT / "practice-folded.png"), full_page=True)

    # ④ 点标题 peek：单步展开（偏好记住）
    page.click('#step-detail details.sd-fold[data-step="2"] summary')
    page.wait_for_timeout(200)
    result["folds_after_peek"] = folds_state()
    page.screenshot(path=str(OUT / "practice-peek.png"), full_page=True)

    # ⑤ 通过后自动全展开 + ✓ 字幕
    page.evaluate("Engine.setFormula('E2', '=VLOOKUP(D2,A2:B5,2,0)')")
    page.wait_for_timeout(400)
    result["folds_after_pass"] = folds_state()
    result["pass_caption"] = page.text_content("#caption-bar")
    page.screenshot(path=str(OUT / "practice-passed.png"), full_page=True)

    # ⑥ 重载回 auto 态回归（gotoStep 不切 mode）
    page.goto(BASE)
    page.wait_for_function("window.Lesson && document.querySelector('#step-detail details.sd-fold')")
    page.evaluate("Lesson.reset()")
    page.evaluate("Lesson.gotoStep(2)")
    page.wait_for_timeout(1500)
    result["folds_auto_after_reload"] = folds_state()

    # ⑦ 顺序切步回归（出片抽帧暴露的累积缺陷）：1→2→3 逐步推进不得累积展开；done 全折叠
    page.evaluate("Lesson.reset()")
    for n in (1, 2, 3):
        page.evaluate("Lesson.gotoStep(%d)" % n)
        page.wait_for_timeout(700)
    result["folds_after_seq_1_3"] = folds_state()
    page.evaluate("Lesson.finish()")
    page.wait_for_timeout(300)
    result["folds_after_done"] = folds_state()

    result["console_errors"] = errors
    (OUT.parent / "result.json").write_text(
        json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    print(json.dumps(result, ensure_ascii=True))
    b.close()
