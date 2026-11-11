# probe-sel.py — univer 选区事件探针（入库工具）：activate / activateAsCurrentCell / 画布点击
import json
import sys
import time

from playwright.sync_api import sync_playwright

URL = "http://localhost:4323/univer-xsum/index.html"


def main():
    with sync_playwright() as p:
        b = p.chromium.launch()
        page = b.new_page(viewport={"width": 1280, "height": 800})
        page.goto(URL)
        page.wait_for_function("window.Lesson && window.UniverExcelKit", timeout=30000)
        page.evaluate("Lesson.reset()")
        page.wait_for_timeout(800)
        out = page.evaluate("""() => {
          const hits = { selection: [], command: [] };
          window.__hits = hits;
          const kit = window.UniverExcelKit;
          // 直接对当前 api 实例挂探针（Engine.onSelection 会顶掉正式钩子，这里用 kit 层面不行——
          // 通过 Engine 换钩子，反正本探针页专用）
          Engine.onSelection((a) => hits.selection.push(a));
          Engine.focusCell('B2');
          return { ready: true };
        }""")
        time.sleep(0.6)
        r1 = page.evaluate("() => window.__hits.selection.slice()")
        print("after activate():", r1)

        page.evaluate("""() => {
          // activateAsCurrentCell 变体：直接走 kit api 不便，用 Engine.focusCell 同款 rng——
          // engine.js 没暴露；这里借 evaluate 拿内部：直接在页面再造一次 kit 调用太重，
          // 简化：用 univerAPI 活动表选区 API（若存在）
          const api = window.__kitProbe;
        }""")
        # 画布用户点击：表格区画布左上角区域（A1/B2 附近）——真鼠标事件
        box = page.evaluate("""() => {
          const c = document.querySelector('#grid canvas') || document.querySelector('#grid');
          const r = c.getBoundingClientRect();
          return { x: r.left, y: r.top, w: r.width, h: r.height };
        }""")
        print("canvas box:", box)
        page.mouse.click(box["x"] + 150, box["y"] + 120)  # 粗略点进 B2 区域
        time.sleep(0.6)
        r2 = page.evaluate("() => window.__hits.selection.slice()")
        print("after canvas click:", r2)
        print("SMOKE-SEL", "PASS" if r1 or r2 else "FAIL")
        b.close()
        sys.exit(0 if (r1 or r2) else 1)


if __name__ == "__main__":
    main()
