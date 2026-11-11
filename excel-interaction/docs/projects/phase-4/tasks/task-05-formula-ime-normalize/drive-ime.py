# drive-ime.py — task-05 公式全角→半角自动转换验收驱动（一次性取证工具，留档）
# 用法：先起 node scripts/serve/serve.mjs --dir apps --port 4199，再 python drive-ime.py
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

    def edit_value():
        return page.evaluate(
            "document.querySelector('textarea.handsontableInput') ? document.querySelector('textarea.handsontableInput').value : 'NO-EDITOR'"
        )

    # A 全角 SUM：输入即转 + 真算（E3 = 579）
    page.click('td[data-cell="E3"]')
    page.dblclick('td[data-cell="E3"]')
    page.keyboard.type("＝SUM（１２３，４５６）")
    page.wait_for_timeout(200)
    result["A_editor_live"] = edit_value()
    page.screenshot(path=str(OUT / "ime-live-conversion.png"), full_page=True)
    page.keyboard.press("Enter")
    page.wait_for_timeout(300)
    result["A_value"] = page.evaluate("Engine.readValue('E3')")

    # B 全角 VLOOKUP：转换后真算（E2 = 王五）
    page.click('td[data-cell="E2"]')
    page.dblclick('td[data-cell="E2"]')
    page.keyboard.press("Control+a")
    page.keyboard.type("＝VLOOKUP（D2，A2:B5，2，0）")
    page.wait_for_timeout(200)
    result["B_editor_live"] = edit_value()
    page.keyboard.press("Enter")
    page.wait_for_timeout(300)
    result["B_value"] = page.evaluate("Engine.readValue('E2')")

    # C 文本格保真：B2 输中文含全角逗号，不转换、提交后原样
    page.click('td[data-cell="B2"]')
    page.dblclick('td[data-cell="B2"]')
    page.keyboard.press("Control+a")
    page.keyboard.type("销售部，市场部")
    page.wait_for_timeout(200)
    result["C_editor_live"] = edit_value()
    page.keyboard.press("Enter")
    page.wait_for_timeout(300)
    result["C_value"] = page.evaluate("String(Engine.readValue('B2'))")
    page.screenshot(path=str(OUT / "ime-text-preserved.png"), full_page=True)

    # D 字面量保真：引号转半角、引号内全角逗号保留（E4 = 价格，单位）
    page.click('td[data-cell="E4"]')
    page.dblclick('td[data-cell="E4"]')
    page.keyboard.type("＝＂价格，单位＂")
    page.wait_for_timeout(200)
    result["D_editor_live"] = edit_value()
    page.screenshot(path=str(OUT / "ime-literal-quote.png"), full_page=True)
    page.keyboard.press("Enter")
    page.wait_for_timeout(300)
    result["D_value"] = page.evaluate("String(Engine.readValue('E4'))")

    # E 提交路径兜底：Engine.setFormula 直接喂全角也转（E5 = 3）
    page.evaluate("Engine.setFormula('E5', '＝SUM（１，２）')")
    page.wait_for_timeout(300)
    result["E_formula"] = page.evaluate("Engine.getFormula('E5')")
    result["E_value"] = page.evaluate("Engine.readValue('E5')")

    # 回归：练习验收 ✓ 仍过
    page.evaluate("Lesson.practice()")
    page.wait_for_timeout(300)
    page.evaluate("Engine.setFormula('E2', '=VLOOKUP(D2,A2:B5,2,0)')")
    page.wait_for_timeout(400)
    result["regression_caption"] = page.text_content("#caption-bar")
    page.screenshot(path=str(OUT / "ime-regression-practice.png"), full_page=True)

    result["console_errors"] = errors
    (OUT.parent / "result.json").write_text(
        json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    print(json.dumps(result, ensure_ascii=True))
    b.close()
