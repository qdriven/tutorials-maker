# 录制方法总结：把 Excel 教程课录成视频

本文是 `skill/excel-desktop-recorder` 的方法论文档，说明**如何把 `apps/handsontable-excel` 的课程内容在真实表格软件里重做一遍并导出 mp4**，同时覆盖 LibreOffice、Microsoft Excel、WPS 与 Handsontable（浏览器）四种引擎、两种录制模式。

一句话总结方法：

> **课程内容只有一份（`course.config.ts` + `course-logic.ts`），先编译成一份与引擎无关的 `RecorderPlan`，再由不同引擎的驱动去执行；驱动在执行时顺手产出「帧 + 讲解事件」，最后统一合成讲解画布并编码成 mp4。**

> 录屏式的字幕时刻**不从页面时钟换算**，而是**从录像本身读出来**——网页课步骤圆点进行中时是实心深绿，
> 逐帧统计深绿像素就能得到每一步的精确起点（见 3.4）。这一步是"字幕不慢半拍"的关键。

---

## 1. 整体架构

```
apps/handsontable-excel/src/course.config.ts   ← 课程内容（单一事实源）
apps/handsontable-excel/src/course-logic.ts     ← 数据构造（清洗状态、RFM、查找样例）
            │
            │  node --experimental-strip-types scripts/build-plan.mjs
            ▼
        plan.json (RecorderPlan)                ← 4 模块 / 324 条动作
            │
            │  scripts/engines.mjs 选引擎
            ├──────────────┬──────────────┬──────────────┐
            ▼              ▼              ▼              ▼
      uno-driver.py   com-driver.py   hot-driver.py   （未来：更多软件）
      LibreOffice     Excel / WPS     Handsontable
      UNO 自动化      COM 自动化     Playwright 浏览器
            │              │              │
            └──────────────┴──────┬───────┘
                                  │  帧 PNG + 讲解事件 events.jsonl
                                  ▼
                      compose-frames.py（Pillow 合成讲解画布）
                                  ▼
                            ffmpeg → mp4
```

### 为什么要有 RecorderPlan 这一层

计划是**引擎无关**的：写值、公式、选中、插图、讲解都抽象成同一套动作。

| 动作 | 含义 | LibreOffice (UNO) | Excel / WPS (COM) | Handsontable (Playwright) |
| --- | --- | --- | --- | --- |
| `sheet` | 切到某张工作表 | `activate()` | `Worksheet.Activate()` | 点模块标签 |
| `commentary` | 一条讲解 + 对应一帧 | 触发一次截图 | 触发一次截图 | 等这一步变 done 后截图 |
| `write` | 写一个字面值 | `setString`/`setValue` | `Range.Value` | 由网页课自己写 |
| `formula` | 写一条公式 | `setPropertyValue("FormulaLocal", …)` | `Range.Formula` | 由网页课自己写 |
| `select` | 选中区域 | `controller.select()` | `Range.Select()` | 由网页课自己选 |
| `chart` | 插柱形图 | 插 chart 对象 | `Shapes.AddChart2` | 由网页课自己画 |

换软件 = 换执行层，计划不动。这也是为什么同一份课程内容能在四个引擎里跑出四种风格、但数据完全一致的片子。

---

## 2. 四种引擎

### 2.1 LibreOffice Calc（UNO）——已实跑验证

- **依赖**：`C:\Program Files\LibreOffice`（必须用它自带的 `program\python.exe`，只有它带 `uno` 绑定）
- **驱动**：`scripts/uno-driver.py`
- **帧来源**：`doc.storeToURL(url, (FilterName="calc_png_Export",))` 把工作表导出成 PNG
- **公式写法**：`cell.setPropertyValue("FormulaLocal", '=IF(B2="冷萃咖啡",1,0)')`
  - 用 **Excel 逗号语法**，LO 会自动归一化成自己的分号语法
  - 千万别用 `cell.setFormula(...)`——那是 API 语法，逗号不是参数分隔符，会直接 `#NAME?`
- **能力边界（26.2.6.3 实测）**：
  - ✅ `SUM / ROUND / MAX / AVERAGE / VLOOKUP / COUNTIF / SUMIF / TRIM / PROPER / TEXT / CONCAT / TEXTJOIN / IFS / FILTER / XLOOKUP / VALUE+SUBSTITUTE / IF`
  - ❌ `FORMULATEXT` → `#NAME?`；`LET` → `#NAME?`；`FORMULA` → `#N/A`；`CELL("formula",…)` → `错误:502`
- **版本判断**：注册表里的 `DisplayVersion`（25.8.1.1）是**过期**的，实际二进制自报 26.2.6.3，一律以 `soffice --version` 为准

### 2.2 Microsoft Excel（COM）——代码就绪，本机无软件

- **依赖**：装了 Excel 的机器 + 带 `pywin32` 的 Python（本机：`C:\ProgramData\anaconda3\python.exe`）
- **驱动**：`scripts/com-driver.py`
- **ProgID**：`Excel.Application`
- **公式写法**：`cell.Formula = '=IF(B2="冷萃咖啡",1,0)'`——COM 直接吃 Excel 逗号语法，**不要**用 `FormulaLocal`
- **帧来源**：Excel 没有「导出区域为图片」的接口，用经典三步：
  `UsedRange.CopyPicture(1,2)` → 临时 `ChartObjects().Add` → `Chart.Paste()` → `Chart.Export(path,"PNG")` → `Delete()`
- **插图**：`Shapes.AddChart2(-1, 51, left, top, width, height)`（51 = 簇状柱形图），失败回退 `ChartObjects().Add`
- **状态**：**本机未安装 Excel，未能实跑验证**（`New-Object -ComObject Excel.Application` → `80040154 REGDB_E_CLASSNOTREG`）。需在装有 Excel 的机器上按第 7 节验收清单复核。

### 2.3 WPS 表格（COM）——代码就绪，本机无软件

- **ProgID**：`KET.Application`（部分版本注册 `ET.Application`）
- **为什么不用 UNO**：WPS 的 `.et` 是私有格式，不走 LibreOffice UNO 自动化
- **与 Excel 的关系**：COM 对象模型基本一致，**同一份 `com-driver.py` 只切 ProgID**
- **状态**：**本机未安装 WPS，未能实跑验证**。WPS 上 `Shapes.AddChart2` 与 `CopyPicture → Chart.Export` 兼容性需实测。

### 2.4 Handsontable + HyperFormula（Playwright）——已实跑验证

- **依赖**：`playwright`（pip）+ Chromium + `apps/handsontable-excel` 的 dev server（端口 5194）
- **驱动**：`scripts/hot-driver.py`
- **思路不同**：不自己往单元格里写值，而是**像用户一样点网页课**——
  1. 点模块标签 `.tabs button.tab`
  2. 点执行按钮 `button.run`
  3. 等这一步在 `.guide-step` 里变成 `done`（说明动作真的落到表格里了）
  4. 截 `.ht_master`（Handsontable 表格本体）存帧
- **讲解文本直接来自 DOM**（`.guide-step .step-body b / p / code`），所以字幕和画面上看到的字**逐字一致**
- **优点**：录出来的公式是真·HyperFormula 算出来的；不需要装 Office；**Playwright 录像不依赖桌面是否可见，锁屏会话照样能录**
- **交叉核对**：驱动会把页面步骤标题和 `plan.json` 里的讲解标题对比，不一致会打印告警（例如 formula 模块计划里拆成 6 条讲解，页面上是 4 步）

### 2.5 引擎选择与自动探测

```bash
node scripts/render-video.mjs --engine auto      # 默认优先级：excel > wps > libreoffice > hot
node scripts/render-video.mjs --engine hot
```

`scripts/engines.mjs` 负责探测：

| 引擎 | 探测方式 | 需要什么 |
| --- | --- | --- |
| libreoffice | 找 `soffice.exe` + LibreOffice 自带 python | LibreOffice |
| excel | 注册表 `HKCR\Excel.Application` | Excel + pywin32 |
| wps | 注册表 `HKCR\KET.Application` / `ET.Application` | WPS + pywin32 |
| hot | `import playwright` | playwright + Chromium |

探测不到就报错并说明原因，**不静默降级**。

---

## 3. 两种录制模式

### 3.1 渲染式（默认，锁屏也能用）

**原理**：不去抓屏幕像素，而是让驱动把「表格的样子」导出成 PNG，再由 Pillow 合成一张 1600×1000 的讲解画布（表格在左、讲解卡片在右），最后 ffmpeg 编码。

```
引擎驱动 → frames/frame_XXXX.png (+ frames.json)
        → compose-frames.py → composed/out_XXXX.png
        → ffmpeg concat → mp4
```

- ✅ **不依赖桌面是否可见**：锁屏、SSH、远程会话、无人值守 CI 都能出片
- ✅ 画面干净统一，讲解卡片不会挡住表格
- ✅ 每帧与一条讲解**严格绑定**（帧自带 event，合成时按帧读，不靠索引猜）
- ❌ 没有真实鼠标轨迹，不是"屏幕录像"

```bash
node scripts/render-video.mjs --plan out/plan.json --out out/demo.mp4
node scripts/render-video.mjs --plan out/plan.json --out out/demo.mp4 --engine hot --fps 12 --hold 24
```

`--hold` 是每帧停留的帧数（`hold/fps` 秒）。默认 24/12fps = 每帧 2 秒。

### 3.2 抓窗式（真实界面 + 真实鼠标）

**原理**：ffmpeg `gdigrab` 按窗口标题抓真实窗口像素，驱动用两阶段握手把「开窗」和「开录」对齐：

```
驱动起窗口 → 写 ready.json（hwnd + 真实标题）
编排器读到 ready.json → 启动 ffmpeg 抓窗 → 写 go.flag
驱动看到 go.flag → 才开始执行计划
```

- ✅ 录到真实软件界面、真实鼠标点击、真实选中框
- ❌ **会话必须已解锁**：锁屏时 `gdigrab` 只能抓到锁屏画面，窗口级捕获会报 `Failed to capture image (error 8)`
- ❌ 窗口标题必须 ASCII 且用完整真实标题（LibreOffice 会追加 `— LibreOffice Calc`）

```bash
node scripts/record.mjs --plan out/plan.json --out out/demo.mp4
node scripts/record.mjs --plan out/plan.json --out out/demo.mp4 --engine excel
```

### 3.3 浏览器录屏式（hot 引擎专属）

`--engine hot` 时 `record.mjs` 不走 gdigrab，而是用 **Playwright 原生录像**：

```
Playwright（无头 Chromium）→ hot.webm → ffmpeg 转码 + 烧 ASS 字幕 → mp4
```

- ✅ 录的是真实页面，**包含真实鼠标点击**
- ✅ **不依赖桌面是否可见**——锁屏会话也能录出带鼠标的片子
- ✅ 字幕用页面上的讲解文本，和画面同步（对轴方式见 3.4）

```bash
node scripts/record.mjs --plan out/plan.json --out out/hot-screen.mp4 --engine hot
```

### 3.4 字幕怎么和画面对齐

录屏类产出最容易出的问题是**字幕慢半拍**：页面已经在做第 3 步，字幕还写着第 2 步。

浏览器录屏式里，字幕时刻**不靠两个时钟互相换算**，而是**直接从录像里读出来**——这样根本不存在"页面时钟和视频时钟不同速"的问题。

#### 3.4.1 原理：读步骤圆点的配色

网页课左侧每个步骤前面有一个序号圆点（`.step-no`），三种状态填充色差异极大：

| 状态 | 颜色 | CSS |
|---|---|---|
| 待办 pending | 米白 `#fffdf8` | `--sheet` |
| **进行中 active** | **实心深绿 `#1f6b45`** | `--green` |
| 已完成 done | 浅绿 `#e2efe6` | `--green-soft` |

页面的执行节奏是 `setActiveStep → 430ms → 动作 → 360ms → 标记完成 → 420ms`，
所以**每一步对应一段连续的「深绿」区间**，区间之间有约 420ms 的空档（上一个已完成、下一个还没开始）。

于是：把录像里「圆点列」这条竖带抽成帧 → 逐帧统计接近 `#1f6b45` 的像素 → 得到 0/1 序列 →
合并连续区间 → **各段深绿区间按出现顺序就是第 1、2、3……步，区间起点就是这一步在视频里的起点**。

```
圆点列抽帧   →  ■□□□□□■□□□□□□■□□□□□□■□…      深绿像素计数
              └┬─┘└┬─┘└┬─┘└┬─┘└┬─┘└┬─┘└┬─┘└┬─┘└┬─┘
               第1步 第2步 第3步 第4步 …        区间起点 = 步骤开始时刻
```

分辨率只取决于抽帧帧率（20fps → 50ms），**完全不依赖页面时钟**。

#### 3.4.2 实现分工

| 谁 | 做什么 |
|---|---|
| `scripts/hot-driver.py` | 录的时候顺手采集：每个模块的圆点矩形、所有模块圆点的并集包围盒 `dot_strip`、三种状态色 `dot_colors`、每次点「开始演示」的页面时刻 `run_clicks` |
| `scripts/align-steps.py` | 录像录完后，按 `dot_strip` 从 webm 抽原始 RGB 帧，统计深绿像素，输出每一步的起点秒数 |
| `scripts/record.mjs` | 调用上面两步，把检测到的时刻写进 ASS 字幕轨；检测不到就退回「页面时间轴 + 偏移量」 |

```bash
# 单独跑对轴（调试用）
python scripts/align-steps.py --video out/hot.webm --meta out/hot.webm.meta.json \
  --ffmpeg <ffmpeg> --fps 20 --expect 16
```

#### 3.4.3 交叉核对

`record.mjs` 会把录像读出的步骤时刻与「页面时钟 − 偏移量」算出的时刻做一次比对并打印最大偏差。
实测 4 次「开始演示」点击的偏差分别是 **0.25 / 0.25 / 0.23 / 0.28 秒**——
这既证明了**视频时钟与页面时钟速率完全一致**（不是"不同速"），也证明检测本身准到帧级。

> ⚠️ 历史上曾用「状态条小图逐帧像素匹配」做对轴，**这条路走不通**：
> 状态条只有 96×26 像素，各步文字只差一个数字，VP9 有损压缩后不同文字的相似度高达 0.90~0.96，
> 与同一文字的 0.99 严重重叠，匹配结果纯属噪声。**要挑就挑大面积、高对比的色块。**

#### 3.4.4 其他两条通用规则

1. **步骤开始时刻用 MutationObserver 采集，不要用轮询**。页面里 `.guide-step` 的 class 就是步骤状态机（`pending / active / past / done`），在页面里挂一个观察者记录每次 class 变化的时间戳：

   ```js
   const observer = new MutationObserver((mutations) => {
     for (const m of mutations) {
       const el = m.target;
       if (!el.classList?.contains('guide-step')) continue;
       const index = [...document.querySelectorAll('.guide-step')].indexOf(el);
       const state = el.classList.contains('done') ? 'done'
         : el.classList.contains('active') ? 'active' : 'other';
       log.push({ index, state, ts: performance.now() / 1000 });
     }
   });
   observer.observe(document.body, { subtree: true, attributes: true, attributeFilter: ['class'] });
   ```

   用 `performance.timeOrigin` 把页面时间换算成挂钟时间，再减去驱动启动时刻，得到可直接用的秒数。

2. **一条讲解覆盖到下一条开始**（上限 6 秒），而不是固定 2.4 秒——这样即使有零点几秒的误差，字幕也会跟着步骤走。

#### 3.4.5 抓窗式（Excel / WPS / LibreOffice）的对轴

抓窗式的画面里没有网页课的圆点可用，退回**墙钟偏移法**：
gdigrab 的起点与驱动启动时刻之差就是偏移量，字幕时间 = 事件时间 − 偏移量。
这条路依赖 gdigrab 的启动延迟（0.1~0.5 秒），精度略逊于浏览器录屏式，但足够用。

> 若要更准，可在原生软件窗口里找一个"每次步骤都会大面积变色"的元素（Excel 的状态栏、WPS 的状态栏），
> 用与 3.4.1 相同的"色块检测"思路做锚点——**思路可移植**，只是采样区域不同。

---


```bash
cd domains/excel-animation/skill/excel-desktop-recorder

# 1) 生成计划（Node 24 原生 strip types，直接 import .ts）
node --experimental-strip-types scripts/build-plan.mjs \
  --config ../../apps/handsontable-excel/src/course.config.ts \
  --out out/plan.json
# → 模块 4 个，动作 324 条（chart 33 / formula 41 / clean 134 / rfm 116）

# 2) 渲染式出片（任选引擎）
node scripts/render-video.mjs --plan out/plan.json --out out/demo.mp4            # auto
node scripts/render-video.mjs --plan out/plan.json --out out/demo.mp4 --engine libreoffice
node scripts/render-video.mjs --plan out/plan.json --out out/demo.mp4 --engine excel
node scripts/render-video.mjs --plan out/plan.json --out out/demo.mp4 --engine wps
node scripts/render-video.mjs --plan out/plan.json --out out/demo.mp4 --engine hot

# 3) 抓窗式 / 浏览器录屏式出片
node scripts/record.mjs --plan out/plan.json --out out/demo.mp4                 # auto
node scripts/record.mjs --plan out/plan.json --out out/demo.mp4 --engine hot     # 浏览器录屏

# 4) 常用参数
#    --plan <plan.json>       计划文件
#    --out <video.mp4>        输出路径
#    --engine auto|libreoffice|excel|wps|hot
#    --fps 12 / --hold 24     渲染式帧率与每帧停留帧数
#    --url http://localhost:5194   hot 引擎的网页地址（dev server 没起会自动拉起）
#    --port 2002              UNO 桥端口
#    --window-title ExcelDesktopDemo
#    --ffmpeg <path>          ffmpeg 路径（默认读 FFMPEG_PATH 或 PATH）
#    --tts off|sapi|edge      解说配音 provider（默认 off；edge 需 pip install edge-tts）
#    --tts-voice <音色>        缺省 sapi→Huihui zh-CN，edge→zh-CN-YunxiNeural
#    --tts-rate "+8%"         edge 语速；--tts-gap 800 每句后额外停留
#    --tts-full               逐字念 detail（默认无废话修剪：公式行不念、只取第一子句）
```

**TTS 解说（无废话系列）**：解说词与字幕同源（RecorderPlan 的 commentary 事件）。开启后每帧停留 = max(基础停留, 该句解说时长 + 间隔)——**节奏由语音时长驱动**，成片时长 = Σ每步解说。实测同一计划：逐字念 detail 223.7s，无废话修剪后 147.8s（19 步，≈7s/步）。provider 抽象见 `scripts/tts.mjs`（sapi=Windows 离线 / edge=神经语音），新增 provider 只需加一个 `text + voice → wav` 分支。

---

## 5. 依赖清单

| 依赖 | 用途 | 备注 |
| --- | --- | --- |
| Node ≥ 22（实测 24.16.0） | 计划生成、编排、合成调用 | 需要 `--experimental-strip-types` 才能直接 import `.ts` |
| LibreOffice | UNO 引擎 | 自带 `program\python.exe`（**唯一**带 uno 绑定的） |
| Microsoft Excel / WPS | COM 引擎 | 二选一；WPS 需 `KET.Application` |
| pywin32 | COM 引擎 | 本机在 `C:\ProgramData\anaconda3\python.exe` 里 |
| Playwright + Chromium | hot 引擎 | `pip install playwright && playwright install chromium` |
| Pillow | 帧合成 | anaconda 或系统 python 都行 |
| edge-tts | edge 解说配音（可选） | `pip install edge-tts`；sapi 配音无依赖（Windows 自带） |
| ffmpeg | 编码 / 抓屏 / 烧字幕 | 本机在 `C:\ProgramData\chocolatey\lib\ffmpeg-full\tools\ffmpeg\bin` |

一个 Python 要同时满足多个引擎时，用 `PYTHON_PATH` / `COM_PYTHON` 环境变量指定；`scripts/engines.mjs` 会自动探测并给出可用解释器。

---

## 6. 已踩坑清单（不要重试）

### 录制与桌面

1. **锁屏会话下桌面捕获只能抓到锁屏画面**。`LockApp.exe` 在跑时 `ffmpeg -i desktop` 得到的是锁屏壁纸。
2. **窗口级捕获在锁屏会话下直接失败**：`ffmpeg -i hwnd=0x...` → `Failed to capture image (error 8)`。
   → 结论：**默认走渲染式**；要真实鼠标就用 hot 引擎的 Playwright 录像（同样不依赖桌面可见）。
3. **窗口标题要用完整真实标题**。LibreOffice 会把标题改成 `ExcelDesktopDemo — LibreOffice Calc`，抓窗要写全。

### ffmpeg

4. **concat 不会自动给每帧停留时长**，不加 `-r` 视频只有 0.08 秒。
5. **Windows 下 ass 滤镜的字幕路径要用相对路径 + cwd**，绝对路径的盘符冒号会破坏滤镜解析。
6. 编码前统一 `scale=trunc(iw/2)*2:trunc(ih/2)*2,format=yuv420p`，否则部分播放器不认。

### LibreOffice / UNO

7. **公式语法**：用 `setPropertyValue("FormulaLocal", …)`，不要用 `setFormula(...)`（后者按 API 语法解析，逗号会报错）。
8. **不要动 `doc.setPropertyValue("FormulaSyntax", 1)`**：该属性是 void，一旦设置所有公式都会变成 `#NAME?`（连 `=SUM(1,2,3)` 都坏）。
9. **导出 PNG 只能导当前索引 0 的工作表**，需要先 `sheets.moveByName(name, 0)`，导完再移回去。
10. **窗口必须显式给宽高**，否则会被压成 135×37。
11. **关掉打印页眉页脚**（`HeaderIsOn` / `FooterIsOn`），否则 PNG 里会多出页眉行。
12. `insertNewByName` 返回 void，之后必须 `getByName()` 取对象。

### COM / Excel / WPS

13. `New-Object -ComObject Excel.Application` 报 `80040154 REGDB_E_CLASSNOTREG` = **根本没装 Excel**（不是脚本问题）。
14. `Range.Formula` 用 Excel 逗号语法；`FormulaLocal` 才走本地化分隔符。

### Playwright / 浏览器

15. **pip 版 playwright 与缓存里的浏览器版本号经常对不上**：本机 playwright 1.63 期望 `chromium-1243`，盘上是 `chromium-1248`，启动报 `Executable doesn't exist`。
    → **正解是补跑 `python -m playwright install chromium`**（顺带把 `ffmpeg-1011` 也装好）。
    → 驱动里另有离线回退：扫描 `%LOCALAPPDATA%\ms-playwright\chromium-*/chrome-win*/chrome.exe`（无头优先用 `chromium_headless_shell-*`）直接指过去。
16. **Playwright 录像要自带 ffmpeg**，版本号写死在 `driver/package/browsers.json`（本机要 `ffmpeg-1011`，盘上只有 `ffmpeg-1013`）。同样用 `playwright install chromium` 一次解决；驱动里的兜底逻辑是把盘上那份复制到 playwright 期望的目录名下。
17. **录像文件在 `context.close()` 之后才落盘**。顺序必须是「关上下文 → 取 `page.video.path()` → 复制」，先取路径会拿到不存在的文件。
18. **Windows 控制台中文乱码**：spawn 驱动时带上 `PYTHONIOENCODING=utf-8`。

### 字幕

19. **ASS 的 `BorderStyle=3`（不透明底框）配 `Outline=0` 会塌掉**，文字几乎看不见。要么给 `Outline≥2`，要么用 `BorderStyle=1` + 深色描边。
20. **标题行与细节行不能同 `MarginV`**：底部对齐时 `MarginV` 是离底边的距离，两者要错开（如标题 90、细节 30），否则两层文字叠在一起。
21. **相邻字幕不要重叠**：结束时间与下一条的开始时间要接上（如每条 2.4s、cursor = end），否则前后两条讲解会同时出现在屏幕上。
22. **ASS 的 `PlayResX/PlayResY` 要按视频实际分辨率填**（用 `ffmpeg -i` 的输出解析），否则字号会随分辨率漂移。
23. **别拿「小裁剪 + 像素均值差」做录像对轴**。状态条只有 96×26，各步文字只差一个数字，VP9 压缩后「不同文字」的相似度是 0.90~0.96，「同一文字」才 0.99 —— 两者严重重叠，匹配结果纯属噪声。
    → **要挑就挑大面积、高对比的色块**（本方案用的是 25×25 的实心圆点）。
24. **`ffmpeg -vf crop=w:h:x:y` 的 x/y 会被向下取整到偶数**。x 写成奇数会让裁出来的内容**整体平移一像素**，
    和参考图比就整体错开——本项目排查这个 bug 花的时间比写对轴逻辑还多。
    → **裁剪坐标一律先取偶数**：`x -= x % 2`。
25. **numpy 算 RGB 距离要用 int32**。`int16` 存不下 `255² = 65025`，会溢出成负数，
    结果是**白色像素全被误判成目标色**，信号直接废掉。
26. **JS 里读 DOMRect 的字段名是 `x / y / width / height`，但自己造的矩形对象字段名可能只有 `x / y / w / h`**。
    混用会让 `Math.max(...)` 得到 `NaN`，裁剪区尺寸变成 NaN，ffmpeg 直接报错。
27. **Python 里 `x, y, w, h = box` 对 dict 解包拿到的是 key 字符串**，不是值。必须 `box["x"]` 显式取。

### 页面结构（Handsontable 课）

28. **真正的滚动容器是 `ASIDE.rail`，不是 window**。它的 `scrollHeight`（1075~1171）大于 `clientHeight`（896），
    模块结束后页面的 `scrollIntoView` 会把它滚下去。**只钉 `html/body { overflow:hidden }` 是不够的**，
    一滚动，左侧步骤圆点整列都会移位。
    → 用捕获阶段的 `scroll` 监听把所有容器的 `scrollTop/scrollLeft` 拉回 0。
29. **圆点的 y 坐标随模块变化**（每个模块的步骤标题长短不同 → 列表高度不同）。
    所以圆点位置必须**每个模块采一次**，再取并集当包围盒。

### 流程

30. **PowerShell `Start-Process -ArgumentList` 必须用数组语法**，逐个传参会报「多次指定了参数 ArgumentList」。
31. 别用内联 `python -c` 写含转义引号的多行脚本——直接写 `.py` 文件执行。
32. 删除文件走 `mavis-trash` 规范路径，**不要**用 `Remove-Item`。
33. **抽帧目录要每种探测各用一个，且抽取前清空**。不同裁剪尺寸的旧帧残留（96×26 与 37×392 混存）会让匹配整体错位。
34. **ffmpeg 抽帧的输出路径要用绝对路径**。相对路径在 cwd 变化后会写到别处，排查时找不到文件。
35. **UNO 桥上的 LibreOffice 不会自己退出**。驱动里 `desktop.terminate()` 只是「请求退出」，
    `soffice.exe` 还会拉起 `soffice.bin` 继续挂着——编排侧要补 `taskkill /PID <pid> /T /F`。
    否则每出片一次漏一个后台进程，`out/lo-profile` 的锁解不掉、目录也删不掉（里面的 cache 文件名超长，
    `mavis-trash` 递归删会报「指定的路径无效」）。
36. **别用 `soffice --version` 探测版本**。它在 Windows 上会**阻塞**，而且会留下一个 soffice.bin 进程
    （那是一次真实启动，打完版本号不退出）。正确做法是读可执行文件的版本资源：
    `powershell -NoProfile -Command "(Get-Item -LiteralPath '<路径>').VersionInfo.ProductVersion"`，
    瞬时返回、零进程。实测两者结果一致（26.2.6.3）。

---

## 7. 验收清单（怎么证明录对了）

出片后按下面逐条核对，别只看"文件生成了"。

```bash
# 1) 文件与时长
ffprobe -v error -show_entries format=duration,size \
        -show_entries stream=codec_name,width,height,nb_frames \
        -of default=nw=1 out/demo.mp4

# 2) 完整解码校验（无错误输出即通过）
ffmpeg -v error -i out/demo.mp4 -f null -

# 3) 帧与讲解一一对应：帧数 == 事件数
node -e "const fs=require('fs');
const frames=JSON.parse(fs.readFileSync('out/frames/frames.json','utf8'));
const events=fs.readFileSync('out/events.jsonl','utf8').trim().split('\n');
console.log('frames',frames.length,'events',events.length);
console.log(frames.every(f=>f.event&&f.event.title)?'每帧都带讲解事件':'有帧缺事件');"

# 4) 数值核对：从产出的 xlsx 逐行读出，跟课程期望值比
#    （示例：商品数据 B9:B11 = 473 / 78.8 / 199；RFM 总计 = 8 人 / 11670 元）

# 5) 字幕对轴核对（浏览器录屏式）：确认检出的步骤数 == 讲解条数
python scripts/align-steps.py --video out/hot.webm --meta out/hot.webm.meta.json \
  --ffmpeg <ffmpeg> --fps 20 --expect 16
#    → {"steps":[{"seconds":1.25,…}, …16 条]}，秒数即每一步在视频里的起点
#    → 再抽一帧人工复核：字幕标题、左栏高亮的步骤号、右上角「执行第 N 步」三者必须一致
ffmpeg -hide_banner -loglevel error -y -ss <某一步起点+0.5> -i out/demo.mp4 -frames:v 1 check.png
```

五条都过，才算"录对了"。已完成的验收记录见 `SKILL.md` 的「验证记录」。

---

## 8. 怎么加一个新引擎

以接「ONLYOFFICE」或「Google Sheets」为例：

1. 写 `scripts/xxx-driver.py`，实现同一套动作（`sheet` / `commentary` / `write` / `formula` / `select` / `chart`）；
2. 产出约定不变：
   - 帧：`frames/frame_XXXX.png`（按序号命名）
   - 帧清单：`frames/frames.json`，元素含 `path / index / sheet / note / event`
   - 讲解事件：`events.jsonl`，每行 `{"type":"commentary","title":…,"detail":…,"sheet":…,"t":秒}`
3. 在 `scripts/engines.mjs` 里加一个引擎条目（探测方式 + `driverSpec()`）；
4. `render-video.mjs` / `record.mjs` **不用改**——它们只认 `driverSpec()` 返回的契约。

驱动只要满足这个契约，就能直接进合成与编码环节。

**如果新引擎走抓窗式**，还要额外做一件事：在窗口里找一个「每次步骤都会大面积变色」的元素
（Excel/WPS 的状态栏、LibreOffice 的状态栏），让驱动把它的位置与配色写进元数据，
编排侧就能复用第 3.4.1 节的「色块检测」拿到帧级精度的字幕时刻，而不用退回墙钟偏移。

---

## 9. 已知边界

- **Excel / WPS 的 COM 路径未在本机验证**（软件未安装），只做了静态审查与结构对齐。
- **抓窗式在锁屏会话下不可用**，这是环境限制不是代码缺陷；用渲染式或 hot 引擎的浏览器录像绕过。
- **渲染式没有真实鼠标轨迹**，画面是"表格 + 讲解卡片"的稳定构图，适合当课件片；要"看着像人在操作"，用 hot 引擎的 Playwright 录像。
- LibreOffice 不支持 `FORMULATEXT` / `LET`，课程里涉及这些公式的模块在 LO 下会显示 `#NAME?`（网页课的 Handsontable 引擎支持）。
- `course.config.ts` 与 `plan.json` 的讲解条数可能不同（formula 模块计划拆得更细），这不影响录屏：hot 引擎以页面为准，其他引擎以计划为准。
- **圆点对轴只认这一门课的 DOM**（依赖 `.guide-step .step-no` 的三种配色）。换课或改样式时，
  要么同步改 `hot-driver.py` 的 `collect_dot_rects()` / `learn_dot_color()`，要么接受退回到墙钟偏移的近似对轴。
- **hot 渲染式的字节数不保证可复现**：RFM 模块的柱状图用 CSS `grow 520ms` 动画，截图落在动画哪一帧会变
  （16 帧里通常 2 帧哈希不同），数值内容一致。
- **抓窗式的字幕精度不如浏览器录屏式**：没有可采样的色块锚点，只能用墙钟偏移，误差来自 gdigrab 的启动延迟（0.1~0.5 秒）。
