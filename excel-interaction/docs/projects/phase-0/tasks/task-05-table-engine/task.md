# task-05 · 表格引擎：LibreOffice / Excel / WPS 任一

## 做什么

确认至少一个真实表格引擎可用（渲染式出片的执行底座）：LibreOffice（免费、可脚本化、
渲染式首选）/ Microsoft Excel（COM 真机）/ WPS（COM 真机）任一即可。

## 功能定义

- 引擎可被后续驱动脚本调用（headless/COM）执行表格操作并导出渲染图。
- check.mjs 的表格引擎探针能稳定探测（含不在 PATH 的已知安装路径兜底）。

## 验证点

1. LibreOffice / Excel / WPS 至少一项探测成功，check.mjs 表格引擎判 PASS。
2. 引擎命令可执行验证：`soffice --version`（或对应引擎的版本探针）输出版本行。

## 前置与依赖

- 无（渲染式出片只要求任一引擎；真实鼠标录制模式才要求 Excel/WPS 真机）。

## 范围外

- 多引擎并存时的调度策略（phase-4/6 的引擎选择矩阵）；
- OnlyOffice Document Server（服务端引擎，另行评估）。
