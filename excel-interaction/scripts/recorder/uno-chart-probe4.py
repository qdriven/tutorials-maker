# uno-chart-probe4.py — 四轮探针：BarDiagram Vertical 属性语义实证（双图对照 + gdigrab 截帧）。
# 图A: Vertical=True；图B: Vertical=False——并排插入，截图后看谁是竖柱谁是横条。
import importlib.util
import sys
import time
from pathlib import Path

_HERE = Path(__file__).parent
_spec = importlib.util.spec_from_file_location("uno_driver", _HERE / "uno-driver.py")
_ud = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(_ud)
connect, start_bridge = _ud.connect, _ud.start_bridge

SOFFICE = r"C:\Program Files\LibreOffice\program\soffice.exe"
PORT = 2086
PROFILE = Path(__file__).parent / ".probe-profile4"


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
    sheet.setName("垂直对照")
    sheet.getCellByPosition(0, 0).setString("类别")
    sheet.getCellByPosition(1, 0).setString("值")
    for i, (m, v) in enumerate([("A", 100), ("B", 300), ("C", 200)]):
        sheet.getCellByPosition(0, i + 1).setString(m)
        sheet.getCellByPosition(1, i + 1).setValue(v)

    addr = sheet.getCellRangeByName("A1:B4").getRangeAddress()
    charts = sheet.getCharts()

    # 图A：Vertical=True（左）
    rectA = uno.createUnoStruct("com.sun.star.awt.Rectangle")
    rectA.X, rectA.Y, rectA.Width, rectA.Height = 5000, 300, 12000, 9000
    charts.addNewByName("ChartA", rectA, (addr,), True, True)
    embA = charts.getByName("ChartA").getEmbeddedObject()
    dA = embA.createInstance("com.sun.star.chart.BarDiagram")
    embA.setDiagram(dA)
    dA.setPropertyValue("Vertical", True)
    print(f"ChartA Vertical={dA.getPropertyValue('Vertical')}")

    # 图B：Vertical=False（右）
    rectB = uno.createUnoStruct("com.sun.star.awt.Rectangle")
    rectB.X, rectB.Y, rectB.Width, rectB.Height = 18000, 300, 12000, 9000
    charts.addNewByName("ChartB", rectB, (addr,), True, True)
    embB = charts.getByName("ChartB").getEmbeddedObject()
    dB = embB.createInstance("com.sun.star.chart.BarDiagram")
    embB.setDiagram(dB)
    dB.setPropertyValue("Vertical", False)
    print(f"ChartB Vertical={dB.getPropertyValue('Vertical')}")

    print("READY_FOR_CAPTURE")  # 调用方此时 gdigrab 截帧
    sys.stdout.flush()
    time.sleep(40)  # 给截帧留时间

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
