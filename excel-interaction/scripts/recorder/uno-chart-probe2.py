# uno-chart-probe2.py — 二轮探针：打印 getCharts() 真实接口 + 尝试所有插入路线。
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
PORT = 2084
PROFILE = Path(__file__).parent / ".probe-profile2"


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
    for i, (m, v) in enumerate([("1月", 980), ("2月", 1120), ("3月", 1050)]):
        sheet.getCellByPosition(0, i + 1).setString(m)
        sheet.getCellByPosition(1, i + 1).setValue(v)
    sheet.getCellByPosition(0, 0).setString("月份")
    sheet.getCellByPosition(1, 0).setString("销售额")

    # 1) getCharts() 的真实接口
    charts = sheet.getCharts()
    print("getCharts type:", type(charts))
    methods = [m for m in dir(charts) if not m.startswith("_")]
    print("methods:", methods)

    # 2) 逐个尝试插入路线
    addr = sheet.getCellRangeByName("A1:B4").getRangeAddress()
    rect = uno.createUnoStruct("com.sun.star.awt.Rectangle")
    rect.X, rect.Y, rect.Width, rect.Height = 5000, 500, 15000, 9000

    routes = []
    # 路线1: insertNewByName(name, rect, (addr,), colHeaders, rowHeaders)
    try:
        charts.insertNewByName("Chart1", rect, (addr,), True, True)
        routes.append(("insertNewByName 5参", True, f"count={charts.getCount()}"))
    except Exception as e:
        routes.append(("insertNewByName 5参", False, f"{type(e).__name__}: {e}"))
    # 路线2: insertNewByName(name, rect, (addr,)) 3参
    if not any(r[1] for r in routes):
        try:
            charts.insertNewByName("Chart2", rect, (addr,))
            routes.append(("insertNewByName 3参", True, f"count={charts.getCount()}"))
        except Exception as e:
            routes.append(("insertNewByName 3参", False, f"{type(e).__name__}: {e}"))
    # 路线3: addNewByName（老接口名）
    if not any(r[1] for r in routes):
        try:
            charts.addNewByName("Chart3", rect, (addr,), True, True)
            routes.append(("addNewByName", True, f"count={charts.getCount()}"))
        except Exception as e:
            routes.append(("addNewByName", False, f"{type(e).__name__}: {e}"))
    # 路线4: 通过 chart2 service 直接建
    if not any(r[1] for r in routes):
        try:
            # sheet.Charts 的底层服务名
            print("charts service name:", charts.getImplementationName() if hasattr(charts, "getImplementationName") else "?")
            routes.append(("service name", True, str(charts.getImplementationName())))
        except Exception as e:
            routes.append(("service name", False, str(e)))

    for name, ok, detail in routes:
        print(("PASS  " if ok else "FAIL  ") + name + " → " + detail)

    # 3) 若插入成功，测改类型
    if charts.getCount() > 0:
        emb = charts.getByIndex(0).getEmbeddedObject()
        print("embedded type:", type(emb))
        emb_methods = [m for m in dir(emb) if not m.startswith("_") and ("iagram" in m or "hart" in m or "roperty" in m)]
        print("embedded chart methods:", emb_methods[:30])
        try:
            ld = emb.createInstance("com.sun.star.chart.LineDiagram")
            emb.setDiagram(ld)
            print("PASS  setDiagram(LineDiagram)")
        except Exception as e:
            print(f"FAIL  setDiagram chart1 → {type(e).__name__}: {e}")
        try:
            d2 = emb.createInstance("com.sun.star.chart2.Diagram")
            print(f"PASS  chart2.Diagram createInstance → {d2}")
        except Exception as e:
            print(f"FAIL  chart2.Diagram → {type(e).__name__}: {e}")

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
