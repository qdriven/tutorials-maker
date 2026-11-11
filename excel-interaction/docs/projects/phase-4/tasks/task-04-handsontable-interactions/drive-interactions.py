# drive-interactions.py — task-04 四项交互验收驱动（一次性取证工具，留档）
# 用法：先起 node scripts/serve/serve.mjs --dir apps --port 4199，再 python drive-interactions.py
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

    # ① 公式栏联动：先造出公式格（step3 真算），再点字面值格 / 公式格
    page.evaluate("Lesson.gotoStep(3)")
    page.wait_for_timeout(1600)
    page.click('td[data-cell="B2"]')
    page.wait_for_timeout(200)
    result["echo_click_B2"] = page.text_content("#formula-echo")
    page.click('td[data-cell="E2"]')
    page.wait_for_timeout(200)
    result["echo_click_E2"] = page.text_content("#formula-echo")
    page.screenshot(path=str(OUT / "formula-bar-link.png"), full_page=True)

    # ② 范围拖选 + 填充柄
    a = page.locator('td[data-cell="A2"]').bounding_box()
    c = page.locator('td[data-cell="B5"]').bounding_box()
    page.mouse.move(a["x"] + 8, a["y"] + 8)
    page.mouse.down()
    page.mouse.move(c["x"] + 8, c["y"] + 8, steps=6)
    page.mouse.up()
    page.wait_for_timeout(200)
    result["selection"] = page.evaluate("Engine.getSelection()")
    result["fill_handle_visible"] = page.evaluate(
        "!!document.querySelector('#table-area .fill, #table-area .fillHandle')"
    )
    page.screenshot(path=str(OUT / "range-select.png"), full_page=True)

    # ③ 点选插引用：编辑 E2 输 "=SUM(" 后拖选 A2:B5
    page.click('td[data-cell="E3"]')  # 先选别处，确保 E2 干净进编辑
    page.dblclick('td[data-cell="E2"]')
    page.keyboard.press("Control+a")
    page.keyboard.type("=SUM(")
    page.wait_for_timeout(200)
    result["editor_after_type"] = page.evaluate(
        "document.querySelector('textarea.handsontableInput') && document.activeElement === document.querySelector('textarea.handsontableInput') ? document.querySelector('textarea.handsontableInput').value : 'NOT-FOCUSED-EDIT'"
    )
    a = page.locator('td[data-cell="A2"]').bounding_box()
    c = page.locator('td[data-cell="B5"]').bounding_box()
    page.mouse.move(a["x"] + 8, a["y"] + 8)
    page.mouse.down()
    page.mouse.move(c["x"] + 8, c["y"] + 8, steps=6)
    page.mouse.up()
    page.wait_for_timeout(200)
    result["editor_after_range"] = page.evaluate(
        "document.querySelector('textarea.handsontableInput') ? document.querySelector('textarea.handsontableInput').value : 'NO-EDITOR'"
    )
    page.screenshot(path=str(OUT / "point-mode.png"), full_page=True)

    # 单击插引用：继续编辑（光标在引用后），单击 D2
    page.click('td[data-cell="D2"]')
    page.wait_for_timeout(200)
    result["editor_after_click"] = page.evaluate(
        "document.querySelector('textarea.handsontableInput') ? document.querySelector('textarea.handsontableInput').value : 'NO-EDITOR'"
    )
    page.keyboard.press("Escape")  # 退出编辑（弹层先关）
    page.keyboard.press("Escape")

    # ④ 函数建议弹层：输入 =VL → 应见 VLOOKUP；Tab 插入 VLOOKUP(
    page.dblclick('td[data-cell="E2"]')
    page.keyboard.press("Control+a")
    page.keyboard.type("=VL")
    page.wait_for_timeout(200)
    result["suggest_visible"] = page.evaluate(
        "document.querySelector('#formula-suggest') && document.querySelector('#formula-suggest').style.display === 'block'"
    )
    result["suggest_items"] = page.evaluate(
        "Array.from(document.querySelectorAll('#formula-suggest .suggest-item')).map(e => e.textContent)"
    )
    page.screenshot(path=str(OUT / "intellisense.png"), full_page=True)
    page.keyboard.press("Tab")
    page.wait_for_timeout(200)
    result["editor_after_tab"] = page.evaluate(
        "document.querySelector('textarea.handsontableInput') ? document.querySelector('textarea.handsontableInput').value : 'NO-EDITOR'"
    )
    page.keyboard.press("Escape")
    page.keyboard.press("Escape")
    page.wait_for_timeout(200)

    # ⑤ 回归：练习验收 ✓ 仍过
    page.evaluate("Lesson.practice()")
    page.wait_for_timeout(300)
    page.evaluate("Engine.setFormula('E2', '=VLOOKUP(D2,A2:B5,2,0)')")
    page.wait_for_timeout(400)
    result["practice_caption"] = page.text_content("#caption-bar")

    result["console_errors"] = errors
    (OUT.parent / "result.json").write_text(
        json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    print(json.dumps(result, ensure_ascii=True))
    b.close()
