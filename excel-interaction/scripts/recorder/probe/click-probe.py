# click-probe.py — 鼠标编排坐标标定探针（recorder 校准，遗留 #2）。
# 点击计算出的格心 → UNO 回读真实选中格，直接给出错位量（行/列/px）。
# 运行："C:/Program Files/LibreOffice/program/python.exe" scripts/recorder/probe/click-probe.py [grid_origin]
import sys
import time
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
import importlib.util  # noqa: E402

_spec = importlib.util.spec_from_file_location(
    "uno_driver", Path(__file__).resolve().parents[1] / "uno-driver.py")
uno_driver = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(uno_driver)
Mouse = uno_driver.Mouse

import subprocess

import uno
from com.sun.star.connection import NoConnectException


def connect(port, retries):
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


def main():
    origin = (72, 195)
    if len(sys.argv) > 1:
        origin = tuple(int(v) for v in sys.argv[1].split(","))
    soffice = r"C:\Program Files\LibreOffice\program\soffice.exe"
    profile = Path(__file__).parent / "lo-profile-probe"
    child = subprocess.Popen(
        [soffice, "--accept=socket,host=127.0.0.1,port=2088;urp;", "--norestore",
         "--nologo", "--nofirststartwizard",
         f"-env:UserInstallation=file:///{str(profile).replace(chr(92), '/')}"],
        stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    ctx = connect(2088, 30)
    if ctx is None:
        print("bridge fail"); child.kill(); sys.exit(1)
    smgr = ctx.ServiceManager
    desktop = smgr.createInstanceWithContext("com.sun.star.frame.Desktop", ctx)
    doc = desktop.loadComponentFromURL("private:factory/scalc", "_blank", 0, ())
    sheet = doc.Sheets.getByIndex(0)
    for r in range(6):
        for c in range(6):
            sheet.getCellByPosition(c, r).setString(f"{chr(65+c)}{r+1}")
    controller = doc.getCurrentController()
    ps = controller.getFrame().getContainerWindow().getPosSize()
    print(f"PosSize X={ps.X} Y={ps.Y} W={ps.Width} H={ps.Height} origin={origin}")

    mouse = Mouse(True, origin)
    print("cursor start", mouse.pos())
    for addr in ("A2", "B2", "E2", "A5"):
        # 先点远处空格 H20 复位选中，再点目标格
        rx, ry = mouse.cell_xy(sheet, "H20", ps)
        mouse.glide(rx, ry, 120)
        mouse.click()
        time.sleep(0.3)
        x, y = mouse.cell_xy(sheet, addr, ps)
        mouse.glide(x, y, 320)
        mouse.click()
        time.sleep(0.4)
        ra = controller.getSelection().getRangeAddress()
        got = f"{chr(65+ra.StartColumn)}{ra.StartRow+1}"
        px, py = mouse.pos()
        print(f"target {addr} computed=({x},{y}) cursor=({px},{py}) clicked->{got}"
              f" {'OK' if got == addr else 'MISS'}")
    doc.close(False)
    try:
        desktop.terminate()
    except Exception:
        pass
    time.sleep(1)
    subprocess.run(["taskkill", "/PID", str(child.pid), "/T", "/F"],
                   stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)


if __name__ == "__main__":
    main()
