# uno-chart-probe3.py — 三轮探针：实测各图表类型服务名（Line/Bar/Pie/XY/柱形横向）。
import importlib.util
import json
import sys
import time
from pathlib import Path

_HERE = Path(__file__).parent
_spec = importlib.util.spec_from_file_location("uno_driver", _HERE / "uno-driver.py")
_ud = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(_ud)
connect, start_bridge = _ud.connect, _ud.start_bridge

SOFFICE = r"C:\Program Files\LibreOffice\program\soffice.exe"
PORT = 2085
PROFILE = Path(__file__).parent / ".probe-profile3"

SERVICES = [
    "com.sun.star.chart.LineDiagram",
    "com.sun.star.chart.BarDiagram",
    "com.sun.star.chart.PieDiagram",
    "com.sun.star.chart.XYDiagram",
    "com.sun.star.chart.AreaDiagram",
]


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
    doc = desktop.loadComponentFromURL("private:factory/scalc", "_blank", 0, ())
    sheet = doc.Sheets.getByIndex(0)
    sheet.getCellByPosition(0, 0).setString("月份")
    sheet.getCellByPosition(1, 0).setString("销售额")
    for i, (m, v) in enumerate([("1月", 980), ("2月", 1120), ("3月", 1050)]):
        sheet.getCellByPosition(0, i + 1).setString(m)
        sheet.getCellByPosition(1, i + 1).setValue(v)

    addr = sheet.getCellRangeByName("A1:B4").getRangeAddress()
    rect = uno.createUnoStruct("com.sun.star.awt.Rectangle")
    rect.X, rect.Y, rect.Width, rect.Height = 300, 3600, 20000, 10000
    charts = sheet.getCharts()
    charts.addNewByName("Chart1", rect, (addr,), True, True)
    emb = charts.getByName("Chart1").getEmbeddedObject()

    print("=== 各图表服务 createInstance + setDiagram ===")
    for svc in SERVICES:
        try:
            d = emb.createInstance(svc)
            emb.setDiagram(d)
            now = emb.getDiagram()
            print(f"PASS  {svc} → set OK, now={now}")
        except Exception as e:
            print(f"FAIL  {svc} → {type(e).__name__}: {e}")

    # BarDiagram 横向（条形图 vs 柱形图）：Vertical 属性
    try:
        d = emb.createInstance("com.sun.star.chart.BarDiagram")
        emb.setDiagram(d)
        props = [p.Name for p in d.getPropertySetInfo().Properties]
        print(f"BarDiagram props: {props}")
        if "Vertical" in props:
            print(f"  Vertical 当前={d.getPropertyValue('Vertical')}")
            d.setPropertyValue("Vertical", False)
            print(f"  设 Vertical=False OK（横向条形）")
    except Exception as e:
        print(f"FAIL  BarDiagram Vertical → {type(e).__name__}: {e}")

    # 数据回读（QC 断言用）
    try:
        d = emb.getDiagram()
        print(f"回读 getDiagram → {d}")
        # chart2 数据序列
        try:
            import uno as u
            # chart1: getDiagram().getDataRowProperties? 尝试常见回读
            print(f"  diagram type={type(d)}")
        except Exception:
            pass
    except Exception as e:
        print(f"FAIL  回读 → {e}")

    # 区域选择回归（图表课第一步选数据区）
    try:
        rng = sheet.getCellRangeByName("A1:B4")
        doc.getCurrentController().select(rng)
        sel = doc.getCurrentController().getSelection()
        print(f"PASS  区域选择回归 → {sel.RangeAddress.StartColumn},{sel.RangeAddress.StartRow}-{sel.RangeAddress.EndColumn},{sel.RangeAddress.EndRow}")
    except Exception as e:
        print(f"FAIL  区域选择回归 → {e}")

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


if __name__ == "__main__":
    main()
