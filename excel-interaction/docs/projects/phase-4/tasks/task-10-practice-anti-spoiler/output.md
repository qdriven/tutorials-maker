# task-10 · output（产出交接）

## 什么功能完成了

**练习态防剧透 + 布局换边 + 删指南卡**（用户反馈「选中手动练习之后所有的[内容]都要
收起来，直到用户点击展开或者通过才展开，然后手动练习这个放到左边栏，最下方内容
可以不需要了」；两处指代经 AskUserQuestion 澄清为：全局统一换边 / 删 4 张指南卡）：

1. **练习态折叠语义**：进入手动练习 4 步全折叠（公式/参数/预期默认藏起，防剧透）；
   点标题自行展开（peek，偏好记住）；**验收通过后自动全展开**对照答案。
   自动播放语义不变（当前步展开、其余折叠、done 全折叠）。
2. **布局换边（全模式）**：步骤面板（验收框）→ 左侧边栏 300px，表格 → 右侧 1fr，
   字幕条通栏在底；出片画面同此布局。
3. **删 `#guide-panel`**：4 张指南卡整行移除，DOM 契约「三区一卡」→「两区一卡」；
   `panelStep` 动效改挂折叠面板当前步（`.sd-fold.current.panelStep`）。

## 产出清单

| 文件 | 作用 |
| --- | --- |
| `templates/handsontable/index.html` | 两区一卡布局（result 左 / table 右），删 #guide-panel |
| `templates/handsontable/theme.css` | grid 换边（300px 1fr · result table）；删 guide-card 样式 |
| `templates/handsontable/lesson.js` | 练习态 defaultOpen=false；通过后全展开；bindFolds 只认 summary click |
| `templates/README.md` + `handsontable/README.md` + `references/{contract-schema,motion-spec}.md` | DOM 契约/动画挂点/formulaArgs 口径同步 |
| `scripts/recorder/hot-driver.py` | 等待选择器改折叠面板锚点（指南卡已删，旧锚点会 30s 超时） |
| `docs/.../task-10/drive-10.py` | 验收驱动 + shots/ 4 张 + result.json |

## 要点（hand-off 给下游）

1. **toggle 陷阱（重要）**：Chrome 对 innerHTML 插入的 `<details open>` 也派发
   `toggle`——记录用户折叠偏好**只能认 summary click**（键盘激活同走 click；
   click 处理先于默认切换动作，`!d.open` 即目标态）。顺序切步累积展开就是它
   （task-09 起潜伏，出片抽帧才暴露）：CLI 指标全绿≠画面对，**视觉取证不可省**。
2. **练习态折叠语义**：默认全折叠防剧透；peek=点击；通过=自动全展开；
   reset 清偏好保出片确定性（渲染式截帧走 gotoStep 可重放）。
3. **布局契约**：步骤面板在左/表格在右为全局契约（templates/README.md「两区一卡」）；
   phase-6 出片链不受影响——plan/narration 复用即可按新布局重出（本次 0.0% 漂移）。

## 下游接线

- phase-7 展示层沿用两区一卡布局与折叠面板；出片成品 vlookup-basic.mp4 已随本
  task 刷新（新布局入片）。字幕条提示文保留（用户选删指南卡项，未选字幕精简项）。
