# phase-6 · task-10 · task（鼠标编排，遗留 #2）

## 背景（deferred #2 原文）

> 抓窗式鼠标编排：真实鼠标轨迹/点击节奏编排（抓窗式的精细驱动），录屏式观感进阶。

出片画面里没有鼠标——操作「自己发生」，观感像自动机不像人操作。本 task 给三条
出片路径都补鼠标编排：抓窗式用**真实 OS 光标**（轨迹滑行 + 真实点击，录进 gdigrab），
录屏式/渲染式用**页内光标层**（SVG 光标 + 点击涟漪，随段移动）。

## 做什么

1. **抓窗式真实 OS 光标**（uno-driver `Mouse` 类）：
   - smoothstep 缓动滑行（`e = t*t*(3-2*t)`，默认 320ms）+ `mouse_event` 真实点击；
   - 单元格→屏幕坐标 = 窗口 `getPosSize()` + `--grid-origin`（窗口内网格原点偏移，
     物理 px，实测校准 72,195）+ UNO 列宽行高（1/100mm→px）；
   - 每段目标：step→本步单元格、intro→首格（A1，cells 含表头行）、outro→checks[0] 格；
   - **DPI 坐标空间修复**（本 task 核心坑，见 verify.md）：非 DPI-aware 进程的
     SetCursorPos/GetCursorPos 走**逻辑 px**（150% 缩放下被虚拟化 ÷1.5），而 UNO
     `getPosSize()` 返回**物理 px**——混用必偏 1-2 行。`Mouse.__init__` 首行
     `SetProcessDPIAware()`（先于任何 GDI/User 调用），此后全链物理 px，
     `GetDeviceCaps(90)` 也返回真实 DPI（144）用于 1/100mm→px。
2. **录屏式/渲染式页内光标层**（lesson.js `Lesson.mouse` + theme.css `#mouse-cursor`）：
   - 公式步→`#formula-bar`、其他步→单元格 td、outro→`#result-area [data-result]`、
     intro→首个 `[data-cell]`；
   - `Lesson.mouse.act(sel, ms)` 缓动移动 + 点击涟漪（`.mc-ripple`）；
   - hot-driver 每段 `mouse_act(seg, kind)` 派发；render-video 透传 `--mouse`。
3. **前摇裁剪**（record.mjs）：gdigrab 先起录、UNO 后开步（桥起动+铺数据 3-8s 前摇）——
   uno-driver 输出 `paceStartMs`，合成侧 `leadMs = paceStartMs - tGrab - 200`，
   `-ss` 裁片头对齐音画（否则口播错位 + 尾段被 `-shortest` 裁掉）。
4. **产品口径**：`--mouse` 为 opt-in（默认关），产品视频保持无鼠标基线不动。

## 功能清单

| 文件 | 改动 |
| --- | --- |
| `scripts/recorder/uno-driver.py` | `Mouse` 类（DPI-aware / glide / click / cell_xy）+ `--mouse` `--grid-origin` |
| `scripts/recorder/hot-driver.py` | `--mouse` + `mouse_act(seg, kind)` 页内光标派发 |
| `scripts/recorder/record.mjs` | `--mouse` 贯通 + gdigrab `-draw_mouse 1` + leadMs 前摇裁剪 |
| `scripts/recorder/render-video.mjs` | `--mouse` 透传帧渲染 |
| `templates/handsontable/lesson.js` / `theme.css` | `Lesson.mouse` API + `#mouse-cursor` 光标层（共享源全拷贝） |
| `apps/vlookup-basic/`、`apps/sum-basic/` | lesson.js/theme.css 同步（拷贝滞后修复） |

## 验证点

1. 浏览器模式：光标随段移动/点击（步→单元格/公式栏、outro→结果区），抽帧取证。
2. 抓窗式：真实光标**精确落格**——click-probe 读回选区 4/4 命中；像素差分热点与
   计算点重合（A1/E2）。
3. 音画：leadMs 裁剪后首拍对齐；整片漂移 <5%。
4. render-video `--mouse` 全链 0.0% 漂移、步骤卡 4 张不变。
