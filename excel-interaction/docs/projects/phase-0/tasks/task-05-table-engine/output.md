# output · task-05 表格引擎（hand-off）

## 产出

无新增文件（环境确认类 task）。

## 完成功能

表格引擎底座就绪：**LibreOffice**（`C:/Program Files/LibreOffice/program/soffice.exe`），
渲染式出片可执行。

## 要点（交接）

1. **首选引擎 = LibreOffice**：免费、可 headless、已确认可执行；渲染式（phase-6 默认模式）
   直接可用。
2. **不在 PATH**：调用时用绝对路径或让驱动脚本按已知路径解析（check.mjs 同款兜底）。
3. **真实鼠标录制暂不可用**：Excel/WPS 未确认安装——需要 COM 真机模式时先补装
   （install.mjs 无自动命令，手动安装）或改用 hot 浏览器录屏式。
