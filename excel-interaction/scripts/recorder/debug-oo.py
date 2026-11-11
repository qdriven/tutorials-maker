# debug-oo.py — #14 诊断：抓插件加载链的失败请求/console/插件 iframe 状态。
import sys

try:
    sys.stdout.reconfigure(encoding="utf-8")
    sys.stderr.reconfigure(encoding="utf-8")
except Exception:
    pass

from playwright.sync_api import sync_playwright

URL = "http://localhost:4173/oo-test/index.html?fileOrigin=http://host.docker.internal:4173"


def main():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={"width": 1400, "height": 900})
        logs = []
        fails = []
        page.on("console", lambda m: logs.append(f"[{m.type}] {m.text[:200]}"))
        page.on("pageerror", lambda e: logs.append(f"[pageerror] {str(e)[:200]}"))
        page.on("requestfailed", lambda r: fails.append(f"FAIL {r.url} :: {r.failure}"))
        page.on("response", lambda r: fails.append(f"HTTP {r.status} {r.url}") if r.status >= 400 else None)

        page.goto(URL, wait_until="domcontentloaded", timeout=60000)
        page.wait_for_timeout(25000)  # 等编辑器+插件全链

        # 插件 iframe 探测：OnlyOffice 非可视化插件跑在隐藏 iframe
        info = page.evaluate("""() => {
            const iframes = Array.from(document.querySelectorAll('iframe'));
            return iframes.map(f => ({
                id: f.id || '', src: (f.src || '').slice(0, 120),
                w: f.offsetWidth, h: f.offsetHeight
            }));
        }""")
        print("== iframes ==")
        for i in info:
            print(" ", i)

        # Editor 容器状态
        st = page.evaluate("""() => ({
            editorReady: typeof window.DocsAPI !== 'undefined',
            ooDiv: !!document.getElementById('oo-editor'),
            gridHtml: (document.getElementById('grid') || {}).innerHTML ?
                document.getElementById('grid').innerHTML.slice(0, 200) : 'none',
            lessonStep: window.Lesson ? window.Lesson.state().step : null,
        })""")
        print("== state ==", st)

        print("== console (last 25) ==")
        for line in logs[-25:]:
            print(" ", line)
        print("== failed/4xx (last 15) ==")
        for line in fails[-15:]:
            print(" ", line)

        page.screenshot(path="debug-oo.png")
        browser.close()


if __name__ == "__main__":
    main()
