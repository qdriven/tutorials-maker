# drive-02.py — task-17/18/19/21 展示层验收取证（Playwright 截图 + console 采集）
# task-17：sidebar 完整教程；task-18：去分步讲解（步骤卡入片）+ 视频有声；
# task-19：去「如何构建」——构建命令只留 README/文档，教程页只放教程；
# task-21：快速预览（文档 markdown 渲染 / JSON HTML 渲染器 / 演示视频页内播放）
#         + 声音手势门控（无交互解静音会被 Chromium 拒绝并暂停——回归检查①）。
# 口径：run skill——启动/驱动/看截图；GBK 控制台坑：stdout 重配 utf-8。
import json
import sys
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8", errors="replace")

from playwright.sync_api import sync_playwright

BASE = "http://localhost:4174/src/standalone/index.html"
OUT = Path(__file__).parent / "shots"
OUT.mkdir(parents=True, exist_ok=True)
result = {"url": BASE, "checks": [], "console": []}


def snap_video(page):
    return page.evaluate(
        "() => { const v=document.querySelector('#main video');"
        "return v ? {muted:v.muted, paused:v.paused, t:+v.currentTime.toFixed(1), dur:Math.round(v.duration)} : null; }"
    )


with sync_playwright() as p:
    b = p.chromium.launch()
    page = b.new_page(viewport={"width": 1440, "height": 900})
    # 真实首访浏览器 = 从未交互（navigator.userActivation.hasBeenActive=false），首次真实
    # 输入后才恒 true。自动化上下文里该值从一开始就是 true（假激活），解静音路径随机过/
    # 被回滚——按真实语义伪造，把「手势前静音预览 → 点击出声」走成确定性流程（task-21 声音回归）。
    page.add_init_script("""
        let _act = false;
        Object.defineProperty(navigator, 'userActivation',
            {get: () => ({hasBeenActive: _act, isActive: _act})});
        addEventListener('pointerdown', () => {_act = true;}, true);
        addEventListener('keydown', () => {_act = true;}, true);
    """)
    page.on("console", lambda m: result["console"].append(f"{m.type}: {m.text}"[:200]))
    page.on("pageerror", lambda e: result["console"].append(f"pageerror: {e}"[:200]))
    page.goto(BASE)
    page.wait_for_function("document.querySelectorAll('a.course-item').length >= 2 && document.querySelector('#sec-summary')")

    # ① 无手势自播回归（task-21 声音根因）：绝不允许「解静音失败→视频被暂停」——
    #    手势前应为 静音播放（muted:true, paused:false），内容照常快速预览。
    page.wait_for_function("() => { const v=document.querySelector('#main video'); return v && !v.paused; }")
    page.wait_for_timeout(1200)
    result["checks"].append({"点": "首屏无手势：视频静音自播（快速预览，未被解静音误暂停）", "值": snap_video(page)})
    result["checks"].append({"点": "🔊 开声按钮可见（手势前）",
                             "值": page.locator(".video-wrap .sound-cta.show").count() >= 1})
    page.screenshot(path=str(OUT / "shot-top.png"))

    # ② 手势后出声（全局手势解锁）
    page.mouse.click(5, 5)
    page.wait_for_function("() => { const v=document.querySelector('#main video'); return v && !v.muted && !v.paused; }")
    page.wait_for_timeout(500)
    result["checks"].append({"点": "手势后有声播放（muted+paused）", "值": snap_video(page)})
    result["checks"].append({"点": "开声后 🔊 按钮隐藏",
                             "值": page.locator(".video-wrap .sound-cta.show").count() == 0})

    # ③ 整页（sidebar + 教程文章：概览→动画→练习→总结）
    page.screenshot(path=str(OUT / "shot-article-full.png"), full_page=True)
    page.locator("#sec-summary").scroll_into_view_if_needed()
    page.wait_for_timeout(300)
    page.screenshot(path=str(OUT / "shot-summary.png"))

    # 检查点（数字说话）
    secs = page.eval_on_selector_all(".sec", "els => els.map(e => e.id)")
    result["checks"].append({"点": "文章四节顺序（分步/构建已移除）", "值": secs})
    result["checks"].append({"点": "分步讲解节不存在", "值": page.locator("#sec-steps").count() == 0})
    result["checks"].append({"点": "如何构建节不存在", "值": page.locator("#sec-build").count() == 0})
    result["checks"].append({"点": "页面无构建命令文本", "值": page.locator("text=pnpm plan").count() == 0})
    result["checks"].append({"点": "本课目录条目数", "值": page.locator("#section-nav a").count()})
    result["checks"].append({"点": "动手练习 iframe", "值": page.locator(".practice iframe").get_attribute("src")})
    result["checks"].append({"点": "演示视频组条目数", "值": page.locator("#demo-links a[data-demo]").count()})

    # ④ 快速预览：演示视频（页内播放器）
    page.locator("#demo-links a[data-demo]").first.click()
    page.wait_for_selector("#preview.open .pv-body video")
    page.wait_for_timeout(800)
    result["checks"].append({"点": "演示视频快速预览（页内播放器）",
                             "值": page.evaluate("() => { const v=document.querySelector('#preview video');"
                                                 "return {open: !!document.querySelector('#preview.open'),"
                                                 " muted:v.muted, paused:v.paused, dur:Math.round(v.duration)}; }")})
    page.screenshot(path=str(OUT / "shot-preview-video.png"))
    page.locator(".pv-close").click()

    # ⑤ 快速预览：参考文档（markdown 渲染，非裸文本）
    page.locator("#doc-links a[data-doc]").first.click()
    page.wait_for_selector("#preview.open .md h1")
    result["checks"].append({"点": "文档 markdown 渲染（h1/表格/代码块/段落）",
                             "值": page.evaluate("() => ({h1: document.querySelectorAll('#preview .md h1').length,"
                                                 " h2: document.querySelectorAll('#preview .md h2').length,"
                                                 " table: document.querySelectorAll('#preview .md-table').length,"
                                                 " code: document.querySelectorAll('#preview .md-code').length,"
                                                 " p: document.querySelectorAll('#preview .md p').length})")})
    page.screenshot(path=str(OUT / "shot-preview-md.png"))
    page.locator(".pv-close").click()

    # ⑥ 快速预览：清单 JSON（HTML 渲染器，非裸 JSON）
    page.locator("#reg-view").click()
    page.wait_for_selector("#preview.open .json-view")
    result["checks"].append({"点": "清单 JSON 渲染（折叠树）",
                             "值": page.evaluate("() => ({tree: document.querySelectorAll('#preview .json-view details').length,"
                                                 " keys: document.querySelectorAll('#preview .j-key').length,"
                                                 " rawPre: document.querySelectorAll('#preview .json-view > pre').length})")})
    page.screenshot(path=str(OUT / "shot-preview-json.png"))
    page.locator(".pv-close").click()

    # ⑦ 切第二门课（SUM）：sidebar 切换 + 文章换源
    page.locator("a.course-item").nth(1).click()
    page.wait_for_timeout(800)
    page.screenshot(path=str(OUT / "shot-sum-course.png"), full_page=True)
    result["checks"].append({"点": "切课后标题", "值": page.locator(".course-head h2").inner_text()})
    result["checks"].append({"点": "切课后 active", "值": page.locator("a.course-item.active").inner_text()})
    result["checks"].append({"点": "切课后视频有声播放", "值": snap_video(page)})

    b.close()

Path(__file__).parent.joinpath("result.json").write_text(
    json.dumps(result, ensure_ascii=False, indent=1), encoding="utf-8")
print(json.dumps(result["checks"], ensure_ascii=False))
print("console:", len(result["console"]), "条")
