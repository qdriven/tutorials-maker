# drive-args.py — task-06 公式参数逐位说明验收驱动（一次性取证工具，留档）
# 用法：先起 node scripts/serve/serve.mjs --dir apps --port 4199，再 python drive-args.py
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

    # ① guide 卡片参数说明：公式步（= 开头）逐条 part=meaning
    result["args_cards"] = page.evaluate(
        "Array.from(document.querySelectorAll('#guide-panel .guide-card')).map(c => ({step: c.getAttribute('data-step'), args: (c.querySelector('.formula-args')||{}).textContent||null}))"
    )
    page.screenshot(path=str(OUT / "guide-args.png"), full_page=True)

    # ② 字幕带参数说明（公式步）
    page.evaluate("Lesson.gotoStep(2)")
    page.wait_for_timeout(1500)
    result["caption_step2"] = page.text_content("#caption-bar")
    page.screenshot(path=str(OUT / "caption-args.png"), full_page=True)

    # ③ 手动练习引导语带参数说明
    page.evaluate("Lesson.practice()")
    page.wait_for_timeout(300)
    result["practice_caption"] = page.text_content("#caption-bar")

    # ④ 回归：自动播放四步 + 验收 ✓、console 零报错
    page.evaluate("Lesson.play()")
    page.wait_for_timeout(8000)
    result["finish_caption"] = page.text_content("#caption-bar")
    result["state"] = page.evaluate("Lesson.state()")
    page.screenshot(path=str(OUT / "play-regression.png"), full_page=True)

    result["console_errors"] = errors
    (OUT.parent / "result.json").write_text(
        json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    print(json.dumps(result, ensure_ascii=True))
    b.close()
