# uno-chart-probe.py — P2 探针：实测 LibreOffice UNO 的区域选择 + 图表插入 API。
# 用 LibreOffice 自带 python 跑：python.exe uno-chart-probe.py
# 输出每个 API 的真实可用性（不猜接口，FAIL 即记边界）。
import importlib.util
import json
import sys
import time
from pathlib import Path

_HERE = Path(__file__).parent
# uno-driver.py 带连字符，不能直接 import——importlib 按路径加载
_spec = importlib.util.spec_from_file_location("uno_driver", _HERE / "uno-driver.py")
_ud = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(_ud)
connect, start_bridge = _ud.connect, _ud.start_bridge

SOFFICE = r"C:\Program Files\LibreOffice\program\soffice.exe"
PORT = 2083
PROFILE = Path(__file__).parent / ".probe-profile"

results = []


def t(label, fn):
    try:
        r = fn()
        results.append({"label": label, "ok": True, "detail": str(r)[:120]})
        print(f"PASS  {label} → {r}")
    except Exception as e:
        results.append({"label": label, "ok": False, "detail": f"{type(e).__name__}: {e}"[:160]})
        print(f"FAIL  {label} → {type(e).__name__}: {e}")


def main():
    import uno
    proc = start_bridge(SOFFICE, PORT, PROFILE)
    ctx = connect(PORT, 30)
    if ctx is None:
        print("ERR: 桥连不上")
        proc.kill()
        sys.exit(1)
    smgr = ctx.ServiceManager
    desktop = smgr.createInstanceWithContext("com.sun.star.frame.Desktop", ctx)

    # 新建 Calc 文档 + 铺数据
    doc = desktop.loadComponentFromURL("private:factory/scalc", "_blank", 0, ())
    sheet = doc.Sheets.getByIndex(0)
    sheet.getCellByPosition(0, 0).setString("月份")
    sheet.getCellByPosition(1, 0).setString("销售额")
    for i, (m, v) in enumerate([("1月", 980), ("2月", 1120), ("3月", 1050)]):
        sheet.getCellByPosition(0, i + 1).setString(m)
        sheet.getCellByPosition(1, i + 1).setValue(v)

    controller = doc.getCurrentController()

    # 1) 区域选择（图表课选中数据区 A1:B4）
    def sel_range():
        rng = sheet.getCellRangeByName("A1:B4")
        controller.select(rng)
        sel = controller.getSelection()
        return f"selected={sel.RangeAddress.StartColumn},{sel.RangeAddress.StartRow}-{sel.RangeAddress.EndColumn},{sel.RangeAddress.EndRow}"
    t("区域选择 controller.select(range)", sel_range)

    # 2) 单元格选择（回归）
    def sel_cell():
        c = sheet.getCellByPosition(1, 3)
        controller.select(c)
        return f"addr={controller.getSelection().AbsoluteName}"
    t("单元格选择 controller.select(cell)", sel_cell)

    # 3) 图表插入 —— 路线 A: sheet.Charts.insertNewByName
    def chart_insert():
        addr = sheet.getCellRangeByName("A1:B4").getRangeAddress()
        # 需要 com.sun.star.awt.Rectangle
        rect = uno.createUnoStruct("com.sun.star.awt.Rectangle")
        rect.X, rect.Y, rect.Width, rect.Height = 5000, 500, 15000, 9000
        charts = sheet.getCharts()
        n0 = charts.getCount()
        charts.insertNewByName("Chart1", rect, (addr,), True, True)
        return f"charts {n0}→{charts.getCount()}"
    t("图表插入 sheet.Charts.insertNewByName", chart_insert)

    # 4) 图表类型 —— 路线 B: getEmbeddedObject().setDiagram / chart2 API
    def chart_type():
        charts = sheet.getCharts()
        if charts.getCount() == 0:
            return "no chart to type"
        embedded = charts.getByIndex(0).getEmbeddedObject()
        # 探 chart2 facade
        try:
            import uno as u
            # 尝试 chart2: Diagram = embedded.createInstance("com.sun.star.chart2.Diagram")?
            # 常见做法：embedded.getDiagram()（chart1）或 chart2.Diagram.setProperty
            info = []
            info.append(f"has getDiagram={hasattr(embedded, 'getDiagram')}")
            if hasattr(embedded, "getDiagram"):
                d = embedded.getDiagram()
                info.append(f"diagram={d}")
                # chart1 类型改写
                try:
                    d2 = embedded.createInstance("com.sun.star.chart.LineDiagram")
                    embedded.setDiagram(d2)
                    info.append("setDiagram(LineDiagram)=OK")
                except Exception as e:
                    info.append(f"setDiagram chart1 失败={e}")
            # chart2 路线
            try:
                d3 = embedded.createInstance("com.sun.star.chart2.Diagram")
                info.append(f"chart2.Diagram createInstance={d3}")
            except Exception as e:
                info.append(f"chart2.Diagram 不可用={e}")
            return " | ".join(info)
        except Exception as e:
            return f"err={e}"
    t("图表类型 getEmbeddedObject/setDiagram", chart_type)

    # 5) 图表样式：改类型为折线（chart1: LineDiagram）
    def chart_line():
        charts = sheet.getCharts()
        if charts.getCount() == 0:
            return "no chart"
        emb = charts.getByIndex(0).getEmbeddedObject()
        # chart1 改类型的正规做法：Diagram provider
        try:
            # 路线1: createInstance LineDiagram
            ld = emb.createInstance("com.sun.star.chart.LineDiagram")
            emb.setDiagram(ld)
            return f"LineDiagram set OK, current={emb.getDiagram()}"
        except Exception as e1:
            try:
                # 路线2: chart2.Diagram + setProperty("ChartType", ...)
                d2 = emb.createInstance("com.sun.star.chart2.Diagram")
                # chart2 类型常量
                LINE = 0  # com.sun.star.chart2.ChartType.LINE
                d2.setProperty("ChartType", LINE)
                emb.setDiagram(d2)
                return f"chart2 setProperty OK ({e1} fallback)"
            except Exception as e2:
                return f"路线1={e1} | 路线2={e2}"
    t("图表改折线图", chart_line)

    # 6) 图表数据回读（QC 断言用：能否读到图表已绘数据）
    def chart_readback():
        charts = sheet.getCharts()
        if charts.getCount() == 0:
            return "no chart"
        emb = charts.getByIndex(0).getEmbeddedObject()
        # chart2: DataSeries
        try:
            d = emb.getDiagram()
            return f"diagram={type(d).__name__} has getDiagram={hasattr(emb,'getDiagram')}"
        except Exception as e:
            return f"err={e}"
    t("图表对象回读", chart_readback)

    # 收尾
    try:
        doc.close(False)
    except Exception:
        pass
    try:
        desktop.terminate()
    except Exception:
        pass
    time.sleep(2)
    proc.kill()

    out = Path(__file__).parent / "uno-chart-probe.json"
    out.write_text(json.dumps(results, ensure_ascii=False, indent=2))
    npass = sum(1 for r in results if r["ok"])
    print(f"---- 探针: PASS={npass}/{len(results)} → {out}")


if __name__ == "__main__":
    main()
