---
name: excel-desktop-recorder
description: 把 Excel 动画课的课程内容在真实表格软件（LibreOffice / Microsoft Excel / WPS）里重做一遍，并录成带讲解字幕的教学视频（mp4）；也支持用 Playwright 驱动浏览器里的 Handsontable 引擎录屏。当用户要求"把这个 Excel 教程在 Excel 里演示并录屏""录一段 Excel 操作视频""把动画课做成实机录屏""导出操作录屏文件""用 WPS/Excel/LibreOffice/Handsontable 录视频"时使用。复用 excel-tutorial-maker 的课程配置，保证录屏内容与网页动画课一致。
---

# excel-desktop-recorder：课程配置 → 真机操作 → 录屏 → mp4

> 本文件位于 `domains/excel-animation/skill/excel-desktop-recorder/`。仓库内路径均以 `domains/excel-animation/` 为基准。
> 方法论文档：[`docs/recording-method.md`](../../docs/recording-method.md)（完整流程、命令、坑位清单）。

## 这个技能解决什么

`apps/handsontable-excel` 是**网页里的 Excel 动画课**：左侧菜单、右表格，操作在浏览器里演。

这个技能做的是**同一门课的真机版本**：同样的数据、同样的公式、同样的步骤，但在**真实表格软件**（Excel / WPS / LibreOffice Calc）里真的写进单元格、真的算公式、真的插图表，然后录成视频交付。

| | 网页动画课 | 真机录屏 |
|---|---|---|
| 载体 | Handsontable + HyperFormula | Excel / WPS / LibreOffice Calc / Handsontable |
| 公式 | 引擎计算 | 真实软件计算 |
| 图表 | HTML/CSS 预览 | 真实图表对象 |
| 交付 | 交互网页 | mp4 视频 |
| 用途 | 自学、交互练习 | 讲解、录屏、离线播放 |

**关键设计**：录屏内容不是另写一套，而是直接复用 `course.config.ts` + `course-logic.ts`。公式怎么写、清洗四步怎么算、RFM 分群怎么判，网页课和录屏共用同一份逻辑，天然一致。

## 支持的引擎

| 引擎 | 自动化接口 | 驱动脚本 | 本机验证 |
|---|---|---|---|
| `libreoffice` | UNO（`soffice --accept` 桥） | `scripts/uno-driver.py` | ✅ 已跑通出片 |
| `excel` | COM（`Excel.Application`） | `scripts/com-driver.py` | ⚠️ 代码就绪，本机未装 Excel |
| `wps` | COM（`KET.Application` / `ET.Application`） | `scripts/com-driver.py` | ⚠️ 代码就绪，本机未装 WPS |
| `hot` | Playwright（驱动浏览器里的 Handsontable） | `scripts/hot-driver.py` | ✅ 已跑通出片（渲染式 + 录屏式） |

`--engine auto` 的优先级：**excel > wps > libreoffice > hot**。探测逻辑在 `scripts/engines.mjs`（Excel/WPS 查注册表 ProgID，LibreOffice 找 `soffice.exe`，hot 探 `playwright`），探测不到会明确报错，不静默降级。

**hot 引擎的特别之处**：它不自己往单元格里写值，而是像用户一样点网页课（切模块 → 点「开始演示」→ 等这一步在 `.guide-step` 里变成 done → 截图）。所以录出来的公式是真·HyperFormula 算出来的，讲解字幕直接取自页面 DOM，和画面逐字一致。

**字幕怎么对上画面**：录屏式的字幕时刻**不从页面时钟换算**，而是**直接从录像里读出来**——网页课步骤圆点进行中时是实心深绿 `#1f6b45`，把录像的「圆点列」逐帧统计深绿像素，深绿区间的起点就是这一步的开始时刻。这样不存在"两个时钟不同速"的错位（实现见 `scripts/align-steps.py`，原理见 `docs/recording-method.md` 第 3.4 节）。

## 三种产出模式

| 模式 | 命令 | 录到什么 | 前置条件 |
|---|---|---|---|
| **渲染式**（默认） | `node scripts/render-video.mjs` | 真实表格渲染图 + 讲解卡片 | 任一引擎即可 |
| **抓窗式** | `node scripts/record.mjs` | 真实窗口（含鼠标轨迹） | 需**解锁会话** + Excel/WPS/LO |
| **浏览器录屏式** | `node scripts/record.mjs --engine hot` | 真实页面（含鼠标点击） | Playwright（**锁屏也能录**） |
| **计划** | `node scripts/build-plan.mjs` | 只有 JSON 计划，无视频 | 只要 Node |

### 为什么默认是渲染式

渲染式把每一步的表格状态导出成 PNG，再由表格引擎自己的渲染器出图、中文字体正常、公式结果真实。它**不依赖桌面是否可见**，所以在锁屏、SSH、无人值守、CI 里都能出片。

抓窗式能录到真实鼠标和窗口边框，但要求会话处于解锁状态——本机实测 `LockApp.exe` 运行时，gdigrab 只能抓到锁屏画面，窗口级捕获报 `error 8`。

**结论：默认用渲染式；需要真实鼠标操作时，会话已解锁用抓窗式，锁屏就用 hot 引擎的浏览器录屏式。**

## 快速开始

```bash
cd domains/excel-animation/skill/excel-desktop-recorder

# 1) 从课程配置生成录制计划
node --experimental-strip-types scripts/build-plan.mjs \
  --config ../../apps/handsontable-excel/src/course.config.ts \
  --out out/plan.json

# 2) 执行计划并出片（auto 会挑本机可用的引擎）
node scripts/render-video.mjs --plan out/plan.json --out out/excel-desktop-demo.mp4

# 3) 指定引擎
node scripts/render-video.mjs --plan out/plan.json --out out/demo.mp4 --engine libreoffice
node scripts/render-video.mjs --plan out/plan.json --out out/demo.mp4 --engine excel
node scripts/render-video.mjs --plan out/plan.json --out out/demo.mp4 --engine wps
node scripts/render-video.mjs --plan out/plan.json --out out/demo.mp4 --engine hot

# 4) 录屏式
node scripts/record.mjs --plan out/plan.json --out out/demo.mp4           # 抓真实窗口
node scripts/record.mjs --plan out/plan.json --out out/demo.mp4 --engine hot  # 浏览器录屏

# 5) 带 TTS 解说的无废话成片（每步画面停留到解说说完）
node scripts/render-video.mjs --plan out/plan.json --out out/demo-vo.mp4 --tts edge
node scripts/render-video.mjs --plan out/plan.json --out out/demo-vo.mp4 --tts sapi   # 离线兜底
```

产物：

```
out/
├── excel-desktop-demo.mp4   # LibreOffice 渲染式（19 步 / 40.0s）
├── excel-desktop-tts.mp4    # 同上 + 离线解说音轨（154.7s）
├── hot-demo.mp4             # Handsontable 渲染式（16 步 / 34.0s）
├── hot-screen.mp4           # Handsontable 浏览器录屏式（40.08s / 带字幕）
├── hot-screen.meta.json     # 录屏式对轴元数据（圆点列位置、配色、点击时刻）
├── recorded.xlsx            # 真机操作后的工作簿（COM/UNO 引擎产出）
├── plan.json                # 录制计划（可复查、可改）
├── events.jsonl             # 最近一次录制的讲解事件流
├── events-<engine>.jsonl    # 按引擎各存一份（多次出片后不会串号）
└── guide.ass                # 字幕轨（抓窗式 / 录屏式用）
```

出片过程中还会产生一批中间产物，可随时删掉：`frames/`（每步的表格渲染图）、`composed/`（合成后的画布帧）、
`hot.webm`（Playwright 原始录像）、`lo-profile/`（LibreOffice 临时用户配置）、`tts/`、`narration.wav`、
`probe-*/`（对轴抽帧缓存）。
```

## TTS 配音（provider 抽象）

解说与字幕同源：都来自 RecorderPlan 的 `commentary` 事件（`title` + `detail`）。**无废话修剪**默认开启——公式行（`=`开头）不念、引号去掉、只取第一子句并截到 42 字，口播一句 ≈5 秒；`--tts-full` 改为逐字念全文。

| provider | 音色 | 依赖 | 场景 |
|---|---|---|---|
| `--tts sapi` | Microsoft Huihui（zh-CN），清晰但机械 | 无（Windows 自带，离线） | 无人值守 / 无网兜底 |
| `--tts edge` | zh-CN-YunxiNeural 等神经语音，自然 | `pip install edge-tts`，联网 | 默认推荐 |

参数（`scripts/tts.mjs` 也提供同样的 provider，可单独调用）：

- `--tts off|sapi|edge`（默认 off）
- `--tts-voice <音色>`：缺省 sapi→`Microsoft Huihui Desktop`，edge→`zh-CN-YunxiNeural`
- `--tts-rate "+8%"`：edge 专用语速
- `--tts-gap 800`：每句解说后的额外停留毫秒
- `--tts-full`：念完整 detail（默认无废话修剪）

**节奏由语音时长驱动**：每帧停留 = max(基础停留, 该帧解说时长 + 间隔)，解说轨按每帧累计起点用 `adelay` 对齐、`amix` 叠加，最后 `openscreen` 式混入（`-c:v copy -af apad -c:a aac`）。所以开 TTS 后成片时长 = Σ每步解说，不会出现"画面停了声音还没完"。

**新增 provider**：在 `scripts/tts.mjs` 里加一个分支（`text + voice → 音频文件`，统一转 22050Hz 单声道 wav），在 `PROVIDERS` 注册、`DEFAULT_VOICE` 给缺省音色即可，渲染管线不用改。

## 依赖

| 依赖 | 用途 | 本机路径 | 缺失时 |
|---|---|---|---|
| Node 24+ | 跑计划生成与编排 | `node` | 必需 |
| ffmpeg | 帧 → 视频 / 抓屏 / 烧字幕 | `C:\ProgramData\chocolatey\lib\ffmpeg-full\tools\ffmpeg\bin` | 必需 |
| LibreOffice | UNO 引擎 | `C:\Program Files\LibreOffice\program` | `libreoffice` 引擎不可用 |
| Microsoft Excel / WPS | COM 引擎 | — | `excel` / `wps` 引擎不可用 |
| Python + pywin32 | COM 引擎 | `C:\ProgramData\anaconda3\python.exe` | COM 引擎不可用 |
| Python + playwright + Chromium | hot 引擎 | 系统 `python`（3.14） | `hot` 引擎不可用 |
| Python + numpy | 录像对轴（统计圆点配色） | anaconda 或系统 python 均可 | 退化为「页面时钟 + 偏移量」近似对轴 |
| Python + Pillow | 合成讲解画布 | anaconda 或系统 python 均可 | 必需 |
| Python + edge-tts | edge 解说配音（可选） | 系统 `python`（3.14） | `--tts edge` 不可用，可用 `--tts sapi` 离线兜底 |

可用环境变量覆盖：`FFMPEG_PATH`、`SOFFICE_PATH`、`LO_PYTHON`、`PYTHON_PATH`、`COM_PYTHON`、`PLAYWRIGHT_CHROMIUM_EXECUTABLE`。

## 录制计划（RecorderPlan）

计划是**引擎无关**的动作序列，介于课程内容与具体软件之间：

```jsonc
{
  "id": "excel-desktop-demo",
  "title": "咖啡店经营分析 · Excel 实机课",
  "sections": [
    {
      "id": "chart",
      "sheet": "商品数据",
      "actions": [
        { "type": "sheet",   "name": "商品数据" },
        { "type": "commentary", "title": "建商品表", "detail": "A1 输入「商品」…" },
        { "type": "write",   "sheet": "商品数据", "address": "A1", "value": "商品" },
        { "type": "formula", "sheet": "商品数据", "address": "B9", "formula": "=SUM(B2:B7)" },
        { "type": "select",  "sheet": "商品数据", "range": "A1:B7" },
        { "type": "chart",   "sheet": "商品数据", "range": "A1:B7", "chartType": "bar" },
        { "type": "wait",    "ms": 140 }
      ]
    }
  ]
}
```

动作类型：`sheet` / `commentary` / `write` / `formula` / `select` / `chart` / `wait`。

**帧与讲解的对应关系**：`commentary` 之后的动作全部执行完，才渲染那一帧。所以画面里看到的表格状态，正好是这一步讲解所描述的状态。帧清单 `frames/frames.json` 里每一帧都自带 `event`，合成器**按帧读事件**，不靠索引猜。

## 改造成自己的课

1. 在 `build-plan.mjs` 里加一个 `planXxx(module, logic)` 函数，把课程模块翻译成动作序列。
2. 课程内容仍留在 `course.config.ts`，不要复制到计划文件里——单一事实源。
3. `course-logic.ts` 里的纯函数（`buildCleanStates` / `buildRfmData` / `buildLookupExamples`）直接复用，它们已经算好了公式原文。

## 接一个新引擎

1. 写 `scripts/xxx-driver.py`，实现同一套动作（`sheet` / `commentary` / `write` / `formula` / `select` / `chart`）。
2. 产出约定不变：
   - 帧：`frames/frame_XXXX.png`（按序号命名）
   - 帧清单：`frames/frames.json`，元素含 `path / index / sheet / note / event`
   - 讲解事件：`events.jsonl`，每行 `{"type":"commentary","title":…,"detail":…,"sheet":…,"t":秒}`
3. 在 `scripts/engines.mjs` 里加引擎条目（探测方式 + `driverSpec()`）。
4. `render-video.mjs` / `record.mjs` **不用改**——它们只认 `driverSpec()` 返回的契约。

## 已踩过的坑（照着做就不会错）

> 完整清单见 [`docs/recording-method.md`](../../docs/recording-method.md) 第 6 节。

1. **公式分隔符**。LibreOffice 的 `setFormula()` 走 API 语法，参数分隔符是 `;`，写 `,` 会得到 `#NAME?` 或 `错误:508`。**用 `FormulaLocal` 写 Excel 逗号语法**，LibreOffice 会自动归一化：

   ```python
   cell.setPropertyValue("FormulaLocal", '=IF(B2="冷萃咖啡",1,0)')  # ✅
   cell.setFormula('=IF(B2="冷萃咖啡",1,0)')                       # ❌ 错误:508
   ```

   ASCII 公式也一样坏：`=SUM(1,2,3)` 用 `setFormula` 会返回 `#NAME?`。

2. **Excel / WPS 的 COM 反过来**：`Range.Formula` 直接吃 Excel 逗号语法，用 `FormulaLocal` 才会走本地化分隔符。

3. **`FORMULATEXT` / `LET` 在 LibreOffice 26.2 不存在**（`#NAME?`），`CELL("formula", …)` 报 `错误:502`。课程里要用就只能在驱动层降级或换引擎。

4. **`calc_png_Export` 只导出第一个工作表**。要渲染别的表，导出前把目标表移到索引 0，导出后再移回：

   ```python
   sheets.moveByName(sheet_name, 0)
   doc.storeToURL(url, (FilterName="calc_png_Export",))
   sheets.moveByName(sheet_name, original_index)
   ```

5. **导出的 PNG 带打印元素**（页眉「工作表1」、页脚「页 1」）。关掉页面样式的 `HeaderIsOn` / `FooterIsOn`。

6. **窗口标题必须 ASCII**。`gdigrab -i title=` 对非 ASCII 标题匹配不到，而且 LibreOffice 会自动追加「— LibreOffice Calc」后缀，要用**完整真实标题**去匹配。

7. **`insertNewByName` 返回 void**，不是 sheet 对象。插入后要 `getByName()` 再取。

8. **`setPosSize(0,0,0,0,15)` 会把窗口压成 135x37**。要显式给宽高：`setPosSize(x, y, 1400, 850, 15)`。

9. **帧时长**。concat 拼图不给每帧时长，视频会变成 0.08 秒。必须带 `-r`：

   ```
   ffmpeg -f concat -safe 0 -r 12 -i frames.txt -vf scale=... -r 12 out.mp4
   ```

10. **libx264 要求宽高为偶数**。窗口尺寸是奇数时加 `-vf scale=trunc(iw/2)*2:trunc(ih/2)*2`。

11. **锁屏会话抓不到真实桌面**。`LockApp.exe` 在运行时，gdigrab 桌面捕获得到锁屏画面，窗口级捕获报 `error 8`。这是环境限制，不是脚本问题。

12. **Playwright 的浏览器版本必须匹配**。pip 版 playwright 1.63 期望 `chromium-1243`，盘上只有 `chromium-1248` 时会报 `Executable doesn't exist`；录像还要求自带的 `ffmpeg-1011`。**正解是补跑 `python -m playwright install chromium`**（会一并装好 ffmpeg）；驱动里另有回退：扫描 `%LOCALAPPDATA%\ms-playwright` 里现成的 chromium 与 ffmpeg 直接指过去。

13. **Playwright 的录像文件在 `context.close()` 之后才落盘**。先取 `page.video.path()` 再关上下文会拿到不存在的文件，顺序必须是「关上下文 → 取路径 → 复制」。

14. **字幕对轴不能靠「小裁剪 + 像素匹配」**。状态条只有 96×26，各步文字只差一个数字，VP9 压缩后「不同文字」的相似度 0.90~0.96、「同一文字」0.99，两者严重重叠，匹配结果纯噪声。
    → **正解：读大面积高对比色块**。网页课步骤圆点进行中时是实心深绿 `#1f6b45`，从录像的「圆点列」逐帧统计深绿像素，深绿区间的起点就是这一步的开始时刻，**完全不依赖页面时钟**（见 `scripts/align-steps.py`）。

15. **`ffmpeg -vf crop=w:h:x:y` 的 x/y 会被向下取整到偶数**。x 写成奇数，裁出来的内容会**整体平移一像素**，与参考图比对时整体错开。裁剪坐标一律先取偶数：`x -= x % 2`。

16. **numpy 算 RGB 距离要用 int32**。`int16` 存不下 `255²`，溢出成负数后**白色像素会被误判成目标色**，信号全废。

17. **网页课的滚动容器是 `ASIDE.rail`，不是 window**。模块结束会 `scrollIntoView`，把左侧步骤圆点整列移位。只钉 `html/body { overflow:hidden }` 不够，要用捕获阶段的 `scroll` 监听把所有容器拉回 0。

18. **Windows 控制台中文乱码**：spawn Python 驱动时带上 `PYTHONIOENCODING=utf-8`。

19. **UNO 桥上的 LibreOffice 不会自己退出**。驱动里调了 `desktop.terminate()` 还不够（`soffice.exe` 还会拉起 `soffice.bin`），编排侧要补一刀 `taskkill /PID <pid> /T /F`。否则每出片一次就漏一个后台进程，`out/lo-profile` 的锁也解不掉、目录删不掉。

20. **别用 `soffice --version` 探测版本**：它在 Windows 上会阻塞，还留下一个 soffice.bin 进程。改读文件版本资源（`Get-Item ... VersionInfo.ProductVersion`），瞬时返回、零进程，结果一致。

21. **PowerShell `Start-Process -ArgumentList` 必须用数组语法**，逐个传参会报「多次指定了参数 ArgumentList」。

## 验证记录

在本机（Windows 10.0.26300、LibreOffice 26.2.6.3、ffmpeg-full、Python 3.14 + anaconda 3.13、Chromium 153）实测：

| 检查项 | LibreOffice (UNO) | Handsontable (Playwright) |
|---|---|---|
| 计划生成 | 4 模块 / 324 条动作 | 同左（计划只用于交叉核对） |
| 执行 | 全部动作完成，19 个讲解步骤各有 1 帧 | 4 模块 × 4 步 = 16 帧，与页面步骤一一对应 |
| 商品数据 | B9:B11 = 473 / 78.8 / 199 | 473 / 78.8 / 199（Handsontable 独立算出，同值） |
| 会员分群 | 8 位会员 R/F/M 三项评分真实计算 | 8 类客群各 1 人、**总计 8 人 / 11670 元**（同值） |
| 中文 | 表头、公式返回值、讲解卡片全部正常 | 同样正常（字幕直接取 DOM） |
| 渲染式出片 | h264 / 1600×1000 / 12fps / 480 帧 / 40.0s / 617,948 B | h264 / 1600×1000 / 12fps / 408 帧 / 34.0s / 599,531 B |
| 渲染式 + 解说 | h264 + aac / 1856 帧 / 154.7s / 2,473,769 B | 同左（`--tts` 与引擎无关） |
| 录屏式出片 | 需解锁会话（本机锁屏，无法验证） | h264 / 1600×1000 / 25fps / 1002 帧 / 40.08s / 2,535,964 B，**完整解码无错误** |
| 字幕对轴 | 墙钟偏移（gdigrab 启动延迟 0.1~0.5s） | **时刻直接从录像读出**：16/16 步对齐，与页面时钟最大偏差 0.372s |
| 可复现 | 连续多次重跑字节数一致（617,948 B） | 帧内容随柱状图 `grow 520ms` 动画相位浮动（16 帧里通常 2 帧哈希会变），**字节数不保证一致**，数值内容一致 |
| 进程残留 | 收尾已自动关闭 UNO 桥（实测残留 0 个） | Playwright 随上下文关闭自动退出 |

`--engine excel` / `--engine wps` **未在本机验证**（软件未安装，注册表无 `Excel.Application` / `KET.Application`），只做了静态审查与结构对齐，需在装有对应软件的机器上按 `docs/recording-method.md` 第 7 节验收。

## 已知边界

- **渲染式不是"屏幕录像"**：它是真实表格的真实渲染，但不是逐像素的窗口录制。画面是干净的表格视图，没有鼠标轨迹、菜单展开、对话框。要这些用抓窗式（需解锁）或 hot 引擎浏览器录屏式。
- **LibreOffice 不是 Excel**：函数支持有差异（`FORMULATEXT` / `LET` 缺失）。课程依赖的 `SUM` / `AVERAGE` / `MAX` / `ROUND` / `VLOOKUP` / `XLOOKUP` / `COUNTIF` / `SUMIF` / `IF` / `TRIM` / `PROPER` / `SUBSTITUTE` / `VALUE` / `TEXT` / `CONCAT` / `TEXTJOIN` / `IFS` / `FILTER` 实测全部可用。
- **图表类型有限**：当前只实现柱形图（`com.sun.star.chart.BarDiagram` / `Shapes.AddChart2(…, 51, …)`）。
- **WPS 的 `.et` 私有格式**不支持 UNO 自动化；要用 WPS 走 COM 接口操作 `.xlsx`。
- **hot 引擎的步骤数以页面为准**：formula 模块的计划拆成 6 条讲解、页面上是 4 步，驱动会打印交叉核对告警，但不影响录屏。
- **hot 渲染式的字节数不保证可复现**：RFM 模块的柱状图用 CSS `grow 520ms` 动画，截图落在动画哪一帧会变（16 帧里通常 2 帧哈希不同），数值内容一致。
- **圆点对轴只认这一门课的 DOM**：它依赖 `.guide-step .step-no` 的三种配色。换课或改样式时，要么同步改 `hot-driver.py` 的 `collect_dot_rects()` / `learn_dot_color()`，要么退回「页面时钟 + 偏移量」的近似对轴（`record.mjs` 会自动回退）。
- **抓窗式（Excel / WPS / LibreOffice）的字幕精度不如录屏式**：它没有可采样的色块锚点，只能用墙钟偏移量，误差来自 gdigrab 的启动延迟（0.1~0.5 秒）。要在原生软件里做到帧级精度，需要找一个"每次步骤都会大面积变色"的元素（Excel/WPS 的状态栏）复用同一套色块检测思路。

## 参考

- 方法论文档：[`docs/recording-method.md`](../../docs/recording-method.md)——三种引擎 × 三种模式的完整流程、命令、依赖、坑位、验收清单。
- 同仓库的 `skill/excel-tutorial-maker/`：课程配置与网页动画课的契约，本技能的输入来源。
- `docs/excel/`：Excel 课程文档与源码调研。
- 调研报告：[`docs/research/desktop-recording-skills.md`](../../docs/research/desktop-recording-skills.md)——Top 10 开源 SKILL / 工具对比与选型结论。
