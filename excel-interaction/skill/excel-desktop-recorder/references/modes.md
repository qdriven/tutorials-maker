# 模式与引擎矩阵

三种模式 × 四个表格引擎（excel / wps / libreoffice / hot）。选模式看"要录到什么"，
选引擎看"这台机器有什么"。

## 模式 × 引擎矩阵

| | excel | wps | libreoffice | hot |
| --- | --- | --- | --- | --- |
| **渲染式**（DOM 重演 + 讲解卡） | ✅ | ✅ | ✅ | ✅（表格圆点对轴） |
| **抓窗式**（真窗口 + 鼠标） | ✅（需已安装） | ✅（需已安装） | ✅ | ➖（hot 非桌面应用） |
| **浏览器录屏式**（真页面 + 点击） | ➖ | ➖ | ➖ | ✅（Playwright 录页面） |

- ✅ 支持 / ➖ 不适用。
- **hot** = 浏览器内 Handsontable/Univer 等 web 引擎页（渲染式的重演主体，也是浏览器录屏式的目标）。

## 引擎探测顺序

`excel > wps > libreoffice > hot` 自动探测；显式指定则不探测。

- Excel：本机未必安装（未探到 exe 时别硬上抓窗式）。
- WPS：目录存在 ≠ 可执行（wps.exe 可能未定位，探测走 known paths + PATH）。
- LibreOffice：常见不在 PATH，known path `C:/Program Files/LibreOffice/program/soffice.exe`。
- hot：恒可用（纯浏览器），是渲染式与兜底选择。

## 模式选择规则

1. 默认 **渲染式**：确定性、锁屏可跑、可逐帧回归——所有自动出片走它。
2. 要"真实软件界面 + 真鼠标轨迹"→ **抓窗式**（需要解锁会话，人不在就别选）。
3. 目标是 web 表格页（hot 引擎）且要真实点击录屏 → **浏览器录屏式**。

## 录制计划（build-plan 产物）

三模式共用同一录制计划 JSON：步骤序列（对齐契约 4 步指南）+ 解说词 + 时长 +
模式/引擎/画幅参数。计划是**中间产物**（`out/<id>/plan.json`），不手改、不入库。

## 出片管线（脚本职责划分，已随 phase-6 交付 → `scripts/recorder/`）

| 脚本 | 职责 |
| --- | --- |
| `build-plan.mjs` | 契约 → 录制计划（含解说词修剪与语音时长） |
| `render-video.mjs` | 渲染式：DOM 重演截图/帧 → ffmpeg 合成 |
| `record.mjs` | 抓窗式/浏览器录屏式：真机驱动录制 |
| `tts.mjs` | 配音合成（provider 抽象） |

引擎驱动（`hot-driver.py`、`uno-driver.py`）与路径探测（`lo-paths.mjs`）已随脚本层交付（`scripts/recorder/`）。
