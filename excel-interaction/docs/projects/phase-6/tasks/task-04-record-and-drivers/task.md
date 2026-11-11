# task-04 · record.mjs 与驱动层（浏览器录屏式 + 抓窗式）

## 做什么

modes.md 出片管线脚本清单收尾：`record.mjs`（抓窗式/浏览器录屏式真机驱动录制）、
`uno-driver.py`（LibreOffice UNO 真算重演）、`lo-paths.mjs`（路径探测）。
自动化一律渲染式（pitfalls #6）——本 task 的两档为"真软件质感"手动档，须解锁会话。

## 功能定义

1. **record.mjs --mode browser**：hot 引擎 Playwright 实时录像（按 plan holdMs 节奏）
   → leadMs 裁片头 → TTS 挂轨 → h264+aac mp4 + 时长偏差自检。
2. **record.mjs --mode capture**：uno-driver `--pace` 逐步真算重演（选格可视）+
   gdigrab 窗口实录（只录目标窗，标题 UTF-8 探测）→ 挂轨合成。
3. **uno-driver.py**：起/连 UNO 桥 → 铺契约数据 → guide 真算重演（';' 分隔符转换）
   → checks 真算真回读 → JSON 结果 + 桥收尾 taskkill。
4. **lo-paths.mjs**：soffice/自带 python 探测（文件存在为准、版本读文件资源）。

## 验证点

1. uno-driver 真算：LibreOffice 里 E2=王五（checks ok，EXIT=0）。
2. 浏览器录屏式出片：h264+aac、时长偏差 <5%。
3. 抓窗式出片：真窗口帧目检（非黑屏、公式/结果正确）、时长偏差 <5%。

## 前置与依赖

- task-01（plan + narration）、phase-0 task-05（LibreOffice）。

## 范围外

- 抓窗式逐步鼠标/菜单编排（当前=真窗口+真算态）；Excel/WPS COM 驱动（未安装）。
