# phase-6 · task-10 · verify（验证记录）

日期：2026-11-09。口径：命令 + 实际输出 + 结论，FAIL 也记。含一次坐标事故的完整取证链。

## 验证点 1 · 浏览器模式页内光标（抽帧取证）

`shots/shot-browser-cursor-cell.png`（b-6.3）：第 1 步「选中 E2」，页内光标滑至 E2 单元格、
点击涟漪散开；`shots/shot-browser-cursor-outro.png`（b-17.5）：收尾拍（总结/验收态），
光标移向结果区。步→单元格/公式栏、outro→`[data-result]`、intro→首格 派发全对。

**中途事故（FAIL→修复）**：首跑帧里根本没有光标——`apps/*/lesson.js` 是旧拷贝，
0 处 mouse 代码（模板共享源已有 8 处），`Lesson.mouse &&` 短路成 no-op。
cp 同步模板→apps 后复跑，光标如上入画。教训：**模板共享源改动必须同步全部拷贝**
（templates/{handsontable,univer,onlyoffice} + apps/*），漏一处就静默失效。

## 验证点 2 · 抓窗式真实光标精确落格（核心坑：DPI 坐标空间）

**首跑全偏（FAIL）**：目标 A2/E2，实拍选中 A3/E4——恒偏 1-2 行；click-probe 4 个目标
全 miss。

**根因取证**：非 DPI-aware 进程（LO python）的 `SetCursorPos/GetCursorPos` 走
**逻辑 px**（150% 系统缩放下被 Windows 虚拟化 ÷1.5），而 UNO `getPosSize()` 返回
**物理 px**——两套坐标系混用，点击点系统性偏移；`GetDeviceCaps(90)` 也返回虚拟化的
96（真实 144）。（顺带证伪 scale 探测方案：`Toolkit.getScreenSize()` 在 LO python
反射层不存在，AttributeError×2，弃。）

**修复**：`Mouse.__init__` 首行 `SetProcessDPIAware()`（**必须先于任何 GDI/User 调用**），
此后 SetCursorPos/GetCursorPos/GetDeviceCaps 全链物理 px，1/100mm→px 用真实 DPI 144。

**复测**：

```
$ python out/_probe/click-probe.py   # 依次点 A2/B2/E2/A5，UNO 读回选区
  A2 ✓  B2 ✓  E2 ✓  A5 ✓   （4/4 OK）
$ python out/_probe/cursor-diff.py   # 前后帧 PNG 差分连通域找光标热点
  热点 (147,256) = A1 计算点；热点 (659,277) = E2 计算点（箭头图形右下延伸，
  热点=尖端，肉眼找质心会误判——以连通域尖端为准）
```

`shots/shot-os-cursor-intro.png`（c3-2.5）：intro 段真实 OS 光标落 **A1**（首格）；
`shots/shot-os-cursor-outro.png`（c3-17.5）：outro 段光标落 **E2**（验收格，王五 已算出）。
抽帧逐格核对与 UNO 选区一致，无偏移。

**probe 附带教训**：复位点击 `(X+5, Y+H-5)` 被虚拟化/钳位到屏幕左下 = 点开
Windows 开始菜单，污染后续目标点击——复位点改用计算出的空闲格（H20）。

## 验证点 3 · 音画前摇裁剪（leadMs）

gdigrab 先起录、UNO 后开步（桥起动+铺数据前摇）——uno-driver 输出 `paceStartMs`，
record.mjs `leadMs = paceStartMs - tGrab - 200` 后 `-ss` 裁片头。冷启动跑（c2）
可见 0.6-5s 前摇被裁、首拍对齐；热身后前摇 <500ms 阈值内不裁（正常）。
整片时长 = ΣholdMs，漂移 0.0%（<5% ✓）。

## 验证点 4 · render-video --mouse 全链

```
$ node scripts/recorder/render-video.mjs --plan out/vlookup-basic/plan.json --mouse
  时长 19728ms vs ΣholdMs 19728ms（偏差 0.0%，<5% ✓）
  Dialogue 7 张（步骤卡 3 张 + 第 2 步逐参数块卡 4 张，task-09 口径）
```

**产品口径 incident（已还原）**：render-video 出片后 `cpSync` 自动拷进 showcase——
smoke 跑覆盖了产品片 `vlookup-basic.mp4`，从 out 基线还原（19.728s 逐字节校验一致）。
定调：**产品视频保持无鼠标基线，`--mouse` 仅 opt-in**；smoke 出片注意 step-6 自动拷贝。

## 结论

1/2/3/4 全过。三模式鼠标编排就位（抓窗式真实光标 4/4 落格、录屏/渲染页内光标随段）；
DPI-aware 是坐标正确性的前提，leadMs 是音画对齐的前提。
