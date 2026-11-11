# phase-6 · task-09 · task（逐参数高亮拆段，遗留 #4）

## 背景（deferred #4 原文）

> 逐参数高亮动画（拆段驻留）：参数口播段现为单段定帧（~24s）；进阶为逐参数高亮拆段，
> 画面随口播推进。

公式步的参数口播（task-13 formulaArgs）整段一张定帧——口播已逐参数念到第 3 个，
画面还停在整块参数列表上。本 task 把公式步驻留**按参数切块**，当前口播念到哪个参数，
哪一行就金底加粗，画面随口播推进；**总时长不变**（只切驻留，不加不减）。

## 做什么

1. **build-plan 切 `paramBlocks`**：公式步驻留按参数标签字数占比切块
   （权重 = `max(1, label.length)`，末块吃余数保证累计 = holdMs），
   每块 `{i, ms}` 写进 plan.segments。
2. **lesson.js `focusParam(i)`**（模板共享源 + 全部拷贝）：步骤卡参数行
   `.sd-arg.is-focus` 金底加粗（theme.css 同步）——交互动画课同样受益。
3. **hot-driver 块内连拍、块间切焦点**：渲染式按 `round(ms×fps/1000)` 分帧，
   每块先 `Lesson.focusParam(i)` 再拍；实时式按累计目标时刻切焦点等待。
4. **render-video ASS 步骤卡逐块 Dialogue**：当前块参数行 `{\b1\c&H34CAFF&}` 加粗金，
   块间换行文——烧进步骤卡的视频同样逐参数推进。

## 功能清单

| 文件 | 改动 |
| --- | --- |
| `scripts/recorder/build-plan.mjs` | `paramBlocks` 按标签字数占比切块 |
| `scripts/recorder/hot-driver.py` | 渲染式块内连拍/块间切焦点；实时式按块等待 |
| `scripts/recorder/render-video.mjs` | ASS 步骤卡逐块 Dialogue（当前块行加粗金） |
| `skill/excel-tutorial-maker/templates/handsontable/lesson.js` | `focusParam(i)`（共享源，全拷贝同步） |
| `skill/excel-tutorial-maker/templates/handsontable/theme.css` | `.sd-arg.is-focus` 金底加粗 |

## 验证点

1. plan.json `paramBlocks` 分布正确（vlookup 第 2 步：969/1291/969/1291ms，
   标签「查找值/查找区域/列序数/匹配方式」3:4:3:4 权重），Σ块 = holdMs。
2. 出片帧逐块高亮推进：块 1 帧参数1 金底 → 末块帧参数4 金底（抽帧取证）。
3. 总时长不变：片长 = ΣholdMs，漂移 <5%（拆段不加时长）。
4. `pnpm verify` 全绿（lesson.js 共享源改动回归）。
