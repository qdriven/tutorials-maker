# drive-12.py — task-12 格数同款主题 验收驱动（一次性取证工具，留档）
# 用法：先起 node scripts/serve/serve.mjs --dir apps --port 4173，再 python drive-12.py
import json
import sys
from pathlib import Path
from playwright.sync_api import sync_playwright

sys.stdout.reconfigure(encoding="utf-8", errors="replace")  # GBK 控制台打 ✓/✗ 不崩

BASE = "http://localhost:4173/vlookup-basic/index.html"
OUT = Path(__file__).parent / "shots"
OUT.mkdir(exist_ok=True)

errors = []
result = {}

PROBE_JS = """
() => {
  const root = document.querySelector('.ht-theme-main');
  const cs = getComputedStyle(root);
  const probe = document.createElement('span');
  document.body.appendChild(probe);
  const val = (name) => {
    probe.style.background = cs.getPropertyValue(name).trim();
    return getComputedStyle(probe).backgroundColor;
  };
  const out = {
    htAccent: val('--ht-accent-color'),
    htBg: val('--ht-background-color'),
    htHeaderBg: val('--ht-header-background-color'),
    htHeaderRowActiveBg: val('--ht-header-row-active-background-color'),
    bodyBg: getComputedStyle(document.body).backgroundColor,
    captionBg: getComputedStyle(document.querySelector('#caption-bar')).backgroundColor,
  };
  probe.remove();
  return out;
}
"""

HEAD_ROW_JS = """
() => {
  const td = document.querySelector('#grid td.cell-head');
  if (!td) return { present: false };
  const cs = getComputedStyle(td);
  return { present: true, bg: cs.backgroundColor, fw: cs.fontWeight, ta: cs.textAlign,
           text: td.textContent };
}
"""

with sync_playwright() as p:
    b = p.chromium.launch()
    page = b.new_page(viewport={"width": 1280, "height": 720})
    page.on("console", lambda m: errors.append(m.text) if m.type == "error" else None)
    page.on("pageerror", lambda e: errors.append((e.stack or str(e))[:600]))

    # ① kimi 主题：--ht-* 映射落点 + 表头带 + 底色
    page.goto(BASE)
    page.wait_for_function("window.Lesson && document.querySelector('#step-detail details.sd-fold')")
    page.evaluate("Lesson.reset()")
    page.wait_for_timeout(300)
    result["kimi_probe"] = page.evaluate(PROBE_JS)
    result["kimi_head_row"] = page.evaluate(HEAD_ROW_JS)
    page.screenshot(path=str(OUT / "theme-idle.png"), full_page=True)

    # ② 自动播放第 2 步：当前步展开 + 选区/当前步配色入镜
    page.evaluate("Lesson.gotoStep(2)")
    page.wait_for_timeout(1500)
    page.screenshot(path=str(OUT / "theme-step2.png"), full_page=True)
    page.locator("#table-area").screenshot(path=str(OUT / "theme-grid.png"))

    # ③ 练习态：全折叠防剧透回归
    page.evaluate("Lesson.reset()")
    page.evaluate("Lesson.practice()")
    page.wait_for_timeout(400)
    result["folds_practice"] = page.evaluate(
        "Array.from(document.querySelectorAll('#step-detail details.sd-fold')).map(d => d.open)"
    )
    page.screenshot(path=str(OUT / "theme-practice.png"), full_page=True)

    # ③b 重置回空闲态（task-12 修 reset() 残留练习态）：面板头不再「手动练习」
    page.evaluate("Lesson.reset()")
    page.wait_for_timeout(300)
    result["reset_clears_practice"] = "手动练习" not in (page.text_content("#step-detail") or "")

    # ④ done 态：走完 4 步（第 3 步写公式）→ finish()
    page.evaluate("Lesson.reset()")
    for n in (1, 2, 3, 4):
        page.evaluate(f"Lesson.gotoStep({n})")
        page.wait_for_timeout(700)
    page.evaluate("Lesson.finish()")
    page.wait_for_timeout(400)
    result["done_caption"] = page.text_content("#caption-bar")
    result["done_panel_head"] = (page.text_content("#step-detail .sd-title") or "").strip()
    result["done_has_outro_box"] = "总结" in (page.text_content("#step-detail") or "")
    page.screenshot(path=str(OUT / "theme-done.png"), full_page=True)

    # ⑤ green 主题翻转联动（同一 DOM 契约换 token）
    page.goto(BASE + "?theme=green")
    page.wait_for_function("window.Lesson && document.querySelector('#step-detail details.sd-fold')")
    page.evaluate("Lesson.reset()")
    page.wait_for_timeout(300)
    result["green_probe"] = page.evaluate(PROBE_JS)
    result["green_head_row"] = page.evaluate(HEAD_ROW_JS)
    page.screenshot(path=str(OUT / "theme-green.png"), full_page=True)

    b.close()

result["console_errors"] = errors
(Path(__file__).parent / "result.json").write_text(
    json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8"
)
print(json.dumps(result, ensure_ascii=False, indent=2))
