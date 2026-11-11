# drive-11.py — task-11 一句话总结/解释/收尾总结 验收驱动（一次性取证工具，留档）
# 用法：先起 node scripts/serve/serve.mjs --dir apps --port 4199，再 python drive-11.py
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

    def panel_text():
        return page.text_content("#step-detail") or ""

    def folds_state():
        return page.evaluate(
            "Array.from(document.querySelectorAll('#step-detail details.sd-fold')).map(d => d.open)"
        )

    # ① 空闲态开篇：面板「一句话/解释」框 + 字幕开篇文
    t = panel_text()
    result["idle_has_oneliner"] = "一句话" in t and "拿一个值，去一个范围里查它在哪一行" in t
    result["idle_has_explain_sql"] = "解释" in t and "SELECT 姓名 FROM 员工表 WHERE 工号 = 1003" in t
    result["idle_caption"] = page.text_content("#caption-bar")
    page.screenshot(path=str(OUT / "summary-idle.png"), full_page=True)

    # ② play() 开篇拍：驻留期间 step 仍为 0（开篇拍生效）
    #    注意：evaluate 会 await play() 返回的 Promise——须丢弃返回值才不阻塞到播完
    page.evaluate("() => { Lesson.play(); return null; }")
    page.wait_for_timeout(800)
    result["step_during_intro_beat"] = page.evaluate("Lesson.state().step")
    page.evaluate("Lesson.reset()")
    page.wait_for_timeout(200)

    # ③ 常驻 + 自动播放回归：gotoStep(2) → intro 框仍在、当前步展开
    page.evaluate("Lesson.gotoStep(2)")
    page.wait_for_timeout(1500)
    result["intro_persistent_at_step2"] = "拿一个值，去一个范围里查它在哪一行" in panel_text()
    result["folds_auto_step2"] = folds_state()
    page.screenshot(path=str(OUT / "summary-step2.png"), full_page=True)

    # ④ 动画结束再总结：走完 4 步（第 3 步写入公式）→ finish() → 面板「总结」框 + 字幕 ✓+总结
    page.evaluate("Lesson.gotoStep(3)")
    page.wait_for_timeout(700)
    page.evaluate("Lesson.gotoStep(4)")
    page.wait_for_timeout(700)
    page.evaluate("Lesson.finish()")
    page.wait_for_timeout(300)
    t = panel_text()
    result["done_has_outro"] = "总结" in t and "用关键字段的值，在范围里找到匹配的那一行" in t
    cap = page.text_content("#caption-bar") or ""
    result["done_caption_has_outro"] = "用关键字段的值，在范围里找到匹配的那一行" in cap
    result["done_verified_ok"] = "✓ 验收通过" in cap
    page.screenshot(path=str(OUT / "summary-done.png"), full_page=True)

    # ⑤ 练习态不剧透回归：全折叠、无总结剧透
    page.evaluate("Lesson.practice()")
    page.wait_for_timeout(300)
    result["folds_practice"] = folds_state()

    result["console_errors"] = errors
    (OUT.parent / "result.json").write_text(
        json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    print(json.dumps(result, ensure_ascii=True))
    b.close()
