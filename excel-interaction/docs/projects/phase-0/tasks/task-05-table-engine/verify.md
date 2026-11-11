# verify · task-05 表格引擎

> 执行环境：Windows 11，2026-11-08。

### 1. 任一引擎探测成功、check 判 PASS

- 命令：`node scripts/check.mjs --only table-engine`
- 实际输出：`[PASS] 表格引擎（必需） LibreOffice · C:/Program Files/LibreOffice/program/soffice.exe`
- 备注：LibreOffice **不在 PATH**（`where soffice` 找不到），check.mjs 按已知安装路径
  兜底探到 `C:/Program Files/LibreOffice/program/soffice.exe`
- 结论：**PASS**

### 2. 引擎版本探针可执行

- 命令：`"C:/Program Files/LibreOffice/program/soffice.exe" --version`
- 实际输出：LibreOffice 版本行正常输出、进程即退（无 GUI 滞留）
- 结论：**PASS**

### 附：其他引擎现状（如实记录）

- **WPS**：`AppData/Local/Kingsoft/WPS Office/` 下有 12.1.0.28505 / 12.1.0.29161 两个
  版本目录，但 `office6/wps.exe` 未定位（疑似更新缓存而非完整安装）→ **需人工确认**。
- **Excel**：常见安装路径（Office16/EXCEL.EXE 三处）均未见 → 暂视为未装。
- 影响：渲染式出片不受影响（LibreOffice 满足）；若后续需要 COM 真机鼠标录制，
  再立 task 处理 Excel/WPS 安装确认。

## 总结

2/2 PASS（以 LibreOffice 满足"任一"）。
