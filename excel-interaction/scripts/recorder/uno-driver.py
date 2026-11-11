# uno-driver.py — LibreOffice Calc UNO 驱动（抓窗式引擎驱动 / 真算重演）。
# 运行时必须用 LibreOffice 自带 python（只有它带 uno 绑定）：
#   "C:/Program Files/LibreOffice/program/python.exe" uno-driver.py --plan out/<id>/plan.json
# 职责：起/连 UNO 桥 → 铺契约数据 → guide 公式步真算重演 → 回读 checks → 输出 JSON。
# 口径：公式分隔符 UNO 用 ";"（toUnoFormula）；真算真回读（禁手算）；桥收尾彻底关
#   （desktop.terminate 后进程可能残留——调用方补 taskkill /T /F，pitfalls 同源）。
import argparse
import json
import os
import re
import subprocess
import sys
import time
from pathlib import Path


def parse_a1(addr):
    m = re.match(r"^([A-Za-z]+)(\d+)$", addr.strip())
    if not m:
        raise ValueError("非法单元格地址: " + addr)
    col = 0
    for ch in m.group(1).upper():
        col = col * 26 + (ord(ch) - 64)
    return col - 1, int(m.group(2)) - 1  # (col, row)


def to_uno_formula(formula):
    """Excel 公式 → UNO 公式：参数分隔符 ',' → ';'、表分隔 '!' → '.'（引号内不转）。"""
    out, in_quote = [], False
    for ch in formula:
        if ch == '"':
            in_quote = not in_quote
        if in_quote:
            out.append(ch)
        elif ch == ",":
            out.append(";")
        elif ch == "!":
            out.append(".")  # 跨表引用：'利润表'!B4 → '利润表'.B4（UNO Calc A1 语法）
        else:
            out.append(ch)
    return "".join(out)


def norm_formula(f):
    """比对口径：去空白/大写/分隔符归一（UNO 回读是 ';'）+ 跨表引用归一——
    UNO 回读会剥单引号并把 '表'!B2 转成 表.B2，契约侧同步归一才能比对（探针实证）。"""
    s = re.sub(r"\s+", "", str(f or "")).upper().replace(";", ",")
    s = s.replace("'", "").replace("!", ".")
    return s


def connect(port, retries):
    import uno
    from com.sun.star.connection import NoConnectException

    local = uno.getComponentContext()
    resolver = local.ServiceManager.createInstanceWithContext(
        "com.sun.star.bridge.UnoUrlResolver", local
    )
    url = f"uno:socket,host=127.0.0.1,port={port};urp;StarOffice.ComponentContext"
    for _ in range(retries):
        try:
            return resolver.resolve(url)
        except NoConnectException:
            time.sleep(1)
    return None


def start_bridge(soffice, port, profile):
    # file URI 必须绝对路径（相对路径拼出的 file:///out/... 会启动失败）
    profile = str(Path(profile).resolve()).replace("\\", "/")
    return subprocess.Popen(
        [
            soffice,
            f"--accept=socket,host=127.0.0.1,port={port};urp;",
            "--norestore",
            "--nologo",
            "--nofirststartwizard",
            f"-env:UserInstallation=file:///{profile}",
        ],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )


def cell_of(sheet, addr):
    col, row = parse_a1(addr)
    return sheet.getCellByPosition(col, row)


def parse_range(addr):
    """'A1:B7' → (c1, r1, c2, r2)；单格 'A1' → 同起点终点。图表课数据区选中用。"""
    m = re.match(r"^([A-Za-z]+)(\d+):([A-Za-z]+)(\d+)$", addr.strip())
    if m:
        def col_idx(s):
            c = 0
            for ch in s.upper():
                c = c * 26 + (ord(ch) - 64)
            return c - 1
        return (col_idx(m.group(1)), int(m.group(2)) - 1,
                col_idx(m.group(3)), int(m.group(4)) - 1)
    c, r = parse_a1(addr)
    return (c, r, c, r)


# 契约 chart.type → UNO 图表服务（探针实测：Line/Bar/Pie/XY/Area 全可用）
CHART_SERVICES = {
    "line": "com.sun.star.chart.LineDiagram",
    "bar": "com.sun.star.chart.BarDiagram",
    "histogram": "com.sun.star.chart.BarDiagram",
    "pie": "com.sun.star.chart.PieDiagram",
    "combo": "com.sun.star.chart.LineDiagram",  # combo 双轴降级为折线（记边界）
    "scatter": "com.sun.star.chart.XYDiagram",
    "stacked": "com.sun.star.chart.BarDiagram",
}


def insert_chart(doc, sheet, chart_cfg, guide_cell, menu=""):
    """P2 图表动作：按契约 chart 配置插入真图表（addNewByName + setDiagram，探针实测接口）。
    数据区 = guide 的区域地址（如 A1:B7）。
    图型/方向按 guide 菜单文本定（探针4实证：BarDiagram Vertical=True→横条、False→竖柱；
    chart-column/bar/stacked 契约 type 都是 bar，只能靠菜单区分）。"""
    import uno as _uno
    c1, r1, c2, r2 = parse_range(str(guide_cell))
    addr = sheet.getCellRangeByPosition(c1, r1, c2, r2).getRangeAddress()
    rect = _uno.createUnoStruct("com.sun.star.awt.Rectangle")
    # 图表放在数据区右侧（1/100mm：列宽约 2200/列，行高 450/行）
    rect.X = (c2 + 1) * 2200 + 500
    rect.Y = r1 * 450
    rect.Width = 18000
    rect.Height = 9500
    charts = sheet.getCharts()
    name = "Chart1"
    if charts.hasByName(name):
        charts.removeByName(name)
    charts.addNewByName(name, rect, (addr,), True, True)
    emb = charts.getByName(name).getEmbeddedObject()

    m = str(menu or "")
    ctype = str((chart_cfg or {}).get("type") or "line")
    stacked = False
    if "堆积" in m:
        svc, vertical = "com.sun.star.chart.BarDiagram", False  # 竖柱堆积
        stacked = True
    elif "簇状柱形" in m or "直方" in m:
        svc, vertical = "com.sun.star.chart.BarDiagram", False  # 竖柱（探针4：False=竖）
    elif "条形" in m:
        svc, vertical = "com.sun.star.chart.BarDiagram", True   # 横条（探针4：True=横）
    elif "饼" in m:
        svc = "com.sun.star.chart.PieDiagram"
    elif "散点" in m:
        svc = "com.sun.star.chart.XYDiagram"  # 菜单是 XY 散点图——真散点优于契约 type=line
    elif "折线" in m:
        svc = "com.sun.star.chart.LineDiagram"
    elif "组合" in m:
        svc = "com.sun.star.chart.LineDiagram"  # 双轴组合降级为折线（记边界）
    else:
        svc = CHART_SERVICES.get(ctype, "com.sun.star.chart.LineDiagram")
        vertical = ctype in ("bar", "histogram", "stacked")

    d = emb.createInstance(svc)
    emb.setDiagram(d)
    if svc.endswith("BarDiagram"):
        try:
            d.setPropertyValue("Vertical", vertical)
            if stacked:
                d.setPropertyValue("Stacked", True)
        except Exception:
            pass
    return {"chart": name, "menu": m, "service": svc,
            "vertical": vertical if svc.endswith("BarDiagram") else None}


class Mouse:
    """真实 OS 光标编排（遗留 #2，抓窗式录屏入画）：smoothstep 缓动滑行 + 真实点击。
    坐标口径：屏幕物理 px——init 先 SetProcessDPIAware()，本进程 GetSystemMetrics/
    SetCursorPos/GetDeviceCaps 全部脱离 DPI 虚拟化（否则非感知进程被缩放比混坐标必错位，
    实测 150% 缩放下错 1~2 行），与 UNO getPosSize、gdigrab 画帧同系。
    网格原点 = 窗口内偏移（--grid-origin，物理 px）+ UNO 列宽行高（1/100mm→px）。"""

    def __init__(self, enabled, grid_origin):
        self.enabled = enabled
        self.off = grid_origin
        if not enabled:
            return
        import ctypes
        from ctypes import wintypes

        self.ct = ctypes
        self._pt = wintypes.POINT
        self.u32 = ctypes.windll.user32
        self.u32.SetProcessDPIAware()  # 必须先于任何 GDI/User 调用
        self.g32 = ctypes.windll.gdi32
        hdc = self.u32.GetDC(0)
        self.dpi = self.g32.GetDeviceCaps(hdc, 90) or 96
        self.u32.ReleaseDC(0, hdc)

    def _px(self, mm100):
        return int(mm100 / 100 / 25.4 * self.dpi)

    def pos(self):
        pt = self._pt()
        self.u32.GetCursorPos(self.ct.byref(pt))
        return pt.x, pt.y

    def glide(self, x, y, ms=320):
        if not self.enabled:
            return
        x0, y0 = self.pos()
        steps = max(2, int(ms / 16))
        for s in range(1, steps + 1):
            t = s / steps
            e = t * t * (3 - 2 * t)  # smoothstep：近似真人加减速
            self.u32.SetCursorPos(int(x0 + (x - x0) * e), int(y0 + (y - y0) * e))
            time.sleep(ms / 1000 / steps)

    def click(self):
        if not self.enabled:
            return
        self.u32.mouse_event(0x0002, 0, 0, 0, 0)  # LEFTDOWN
        time.sleep(0.03)
        self.u32.mouse_event(0x0004, 0, 0, 0, 0)  # LEFTUP

    def cell_xy(self, sheet, addr, ps):
        # 区域地址（图表课 A1:B7）取左上角格定位——parse_a1 只认单格
        if ":" in str(addr):
            addr = str(addr).split(":")[0]
        col, row = parse_a1(addr)
        x = ps.X + self.off[0]
        for c in range(col):
            x += self._px(sheet.Columns.getByIndex(c).Width)
        x += self._px(sheet.Columns.getByIndex(col).Width) // 2
        y = ps.Y + self.off[1]
        for r in range(row):
            y += self._px(sheet.Rows.getByIndex(r).Height)
        y += self._px(sheet.Rows.getByIndex(row).Height) // 2
        return x, y


def set_cell(sheet, addr, value):
    cell = cell_of(sheet, addr)
    if isinstance(value, (int, float)) and not isinstance(value, bool):
        cell.setValue(float(value))
    else:
        cell.setString(str(value))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--plan", required=True)
    ap.add_argument("--port", type=int, default=2002)
    ap.add_argument("--soffice", default=None)
    ap.add_argument("--retries", type=int, default=30)
    ap.add_argument("--keep-open", action="store_true", help="重演后不关文档/桥（调试）")
    ap.add_argument("--pace", action="store_true", help="逐步节奏重演：每步选格+停留（供抓窗式录屏）")
    ap.add_argument("--hold-ms", type=int, default=None, help="每步停留 ms（默认取 plan.holdMs）")
    ap.add_argument("--hold-open-ms", type=int, default=0, help="重演完保持窗口 N ms 再关")
    ap.add_argument("--mouse", action="store_true", help="鼠标编排：真实 OS 光标缓动滑行+点击（抓窗式录屏观感）")
    ap.add_argument("--grid-origin", default="72,195", help="网格原点偏移 x,y（窗口内物理 px，标定值）")
    args = ap.parse_args()

    plan = json.loads(Path(args.plan).read_text(encoding="utf-8"))
    soffice = args.soffice or os.environ.get("SOFFICE_PATH") or r"C:\Program Files\LibreOffice\program\soffice.exe"

    ctx = connect(args.port, 0)
    child = None
    if ctx is None:
        profile = Path(args.plan).parent / "lo-profile"
        child = start_bridge(soffice, args.port, profile)
        ctx = connect(args.port, args.retries)
        if ctx is None:
            if child:
                subprocess.run(["taskkill", "/PID", str(child.pid), "/T", "/F"],
                               stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
            print(json.dumps({"ok": False, "error": f"UNO 桥 {args.retries}s 未就绪"}))
            sys.exit(1)

    smgr = ctx.ServiceManager
    desktop = smgr.createInstanceWithContext("com.sun.star.frame.Desktop", ctx)
    doc = desktop.loadComponentFromURL("private:factory/scalc", "_blank", 0, ())
    sheet = doc.Sheets.getByIndex(0)

    # 1) 铺契约数据（与动画课同源：plan 由契约生成，这里真机重建）
    #    多表（阶段 3 跨表）：全部 sheet 铺进真机——跨表公式按名解析；主表 = sheets[0]
    config = json.loads(Path(plan["config"]).read_text(encoding="utf-8"))
    sheets_cfg = config["data"]["sheets"]
    for si, scfg in enumerate(sheets_cfg):
        if si == 0:
            tgt = doc.Sheets.getByIndex(0)
            tgt.setName(scfg["name"])
        else:
            doc.Sheets.insertNewByName(scfg["name"], doc.Sheets.getCount())
            tgt = doc.Sheets.getByName(scfg["name"])
        for addr, value in scfg["cells"].items():
            set_cell(tgt, addr, value)
    sheet = doc.Sheets.getByName(sheets_cfg[0]["name"])

    # 2) guide 重演（非公式步是视觉动作，真机取其"选格"语义；--pace 逐步节奏供录屏）
    #    段派发（遗留 #1 清偿）：--pace 按 plan.segments 全量派发——intro/outro 口播段
    #    也参与 UNO 节奏（首尾定格），不再只重演 4 步。
    controller = doc.getCurrentController()
    plan_holds = {s["n"]: s.get("holdMs", 1200) for s in plan.get("steps", [])}
    guide_by_step = {g.get("step"): g for g in config.get("guide", [])}
    replayed = []
    paced = []
    chart_state = {"done": False}  # P2：图表只插一次（首个 action=chart 步）

    def do_step(g):
        addr = str(g.get("cell") or "")
        # P2 图表动作：action=chart 的步插入真图表（数据区=该步区域地址）
        if g.get("action") == "chart":
            if not chart_state["done"]:
                try:
                    # 图型/方向按菜单文本定（insert_chart 内实证口径）
                    info = insert_chart(doc, sheet, config.get("chart"), addr, str(g.get("menu") or ""))
                    chart_state["done"] = True
                    replayed.append({"action": "chart", **info})
                except Exception as e:
                    replayed.append({"action": "chart", "error": f"{type(e).__name__}: {e}"})
            return
        # 区域地址（图表课选数据区 A1:B7）→ 整区选中；单格走原路径
        if ":" in addr:
            c1, r1, c2, r2 = parse_range(addr)
            controller.select(sheet.getCellRangeByPosition(c1, r1, c2, r2))
            replayed.append({"range": addr})
            return
        cell = cell_of(sheet, addr)
        controller.select(cell)
        f = str(g.get("formula") or "")
        if f.startswith("="):
            cell.setFormula(to_uno_formula(f))
            replayed.append({"cell": addr, "formula": f})

    segs = [s for s in plan.get("segments", []) if s.get("kind") in ("intro", "step", "outro")]
    pace_start_ms = None
    if args.pace and segs:
        mouse = Mouse(args.mouse, tuple(int(v) for v in args.grid_origin.split(",")))
        ps = controller.getFrame().getContainerWindow().getPosSize()
        checks_cells = [ck.get("cell") for ck in config.get("checks", []) if ck.get("cell")]
        pace_start_ms = int(time.time() * 1000)  # 开步时刻（epoch）：供调用方对齐 gdigrab 起录，换算 leadMs
        for seg in segs:
            kind = seg["kind"]
            hold = args.hold_ms if args.hold_ms is not None else seg.get("holdMs", 1200)
            t_seg = time.monotonic()
            g = None
            if kind == "step":
                g = guide_by_step.get(seg.get("n"))
                if g:
                    do_step(g)
            elif kind == "intro":
                # 开篇：定格铺好数据的初始画面（选中首格，焦点不空）
                controller.select(cell_of(sheet, next(iter(config["data"]["sheets"][0]["cells"]))))
            # outro：定格结果画面，无动作
            if mouse.enabled:
                # 鼠标编排（遗留 #2）：滑向本段目标并点击——步=单元格、intro=首格、outro=验收格
                if kind == "step" and g:
                    addr = g["cell"]
                elif kind == "outro":
                    addr = checks_cells[0] if checks_cells else next(iter(config["data"]["sheets"][0]["cells"]))
                else:
                    addr = next(iter(config["data"]["sheets"][0]["cells"]))
                x, y = mouse.cell_xy(sheet, addr, ps)
                mouse.glide(x, y, 320)
                mouse.click()
            paced.append({"kind": kind, "n": seg.get("n"), "holdMs": hold})
            rest = hold / 1000 - (time.monotonic() - t_seg)
            if rest > 0:
                time.sleep(rest)
    else:
        for g in config.get("guide", []):
            do_step(g)
            if args.pace:
                hold = args.hold_ms if args.hold_ms is not None else plan_holds.get(g.get("step"), 1200)
                time.sleep(hold / 1000)

    # 3) checks 回读（真算真回读，禁手算）
    results = []
    for ck in config.get("checks", []):
        cell = cell_of(sheet, ck["cell"])
        got_str = cell.getString()
        got_val = cell.getValue()
        formula = cell.getFormula()
        want = ck.get("value")
        if isinstance(want, (int, float)) and not isinstance(want, bool):
            ok = abs(got_val - float(want)) < 1e-9
        else:
            ok = got_str == str(want)
        f_ok = True
        if ck.get("formula"):
            # 锚点检查（图表课）：check.formula="="+cell（如 =B7）是数据锚点——
            # 真机没人往该格写公式（值来自铺数），跳公式比对只验值（与 lesson.js 同口径）
            anchor = norm_formula(ck["formula"]) == norm_formula("=" + ck["cell"])
            if not anchor:
                f_ok = norm_formula(formula) == norm_formula(ck["formula"])
        results.append(
            {
                "cell": ck["cell"],
                "want": want,
                "got": got_str if not isinstance(want, (int, float)) else got_val,
                "formula": formula,
                "ok": ok and f_ok,
            }
        )

    ok_all = all(r["ok"] for r in results)
    print(json.dumps({"ok": ok_all, "replayed": replayed, "paced": paced, "paceStartMs": pace_start_ms,
                      "results": results}, ensure_ascii=True))

    if not args.keep_open:
        if args.hold_open_ms:
            time.sleep(args.hold_open_ms / 1000)
        doc.close(False)
        try:
            desktop.terminate()
        except Exception:
            pass
        if child:
            time.sleep(2)
            subprocess.run(["taskkill", "/PID", str(child.pid), "/T", "/F"],
                           stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    sys.exit(0 if ok_all else 1)


if __name__ == "__main__":
    main()
