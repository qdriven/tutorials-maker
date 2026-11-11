# task-07 · output（产出交接）

## 什么功能完成了

**验收框逐步展示（step-detail）**（用户反馈「在验收框里面每一个步骤展示会更方便
让人看清楚」）：右侧验收框顶部按当前步大字号逐条展示四要素 + 参数逐位说明，
随步骤推进全量刷新；手动练习显示目标/参考/参数/提示；空闲与完成态有引导。

## 产出清单

| 文件 | 作用 |
| --- | --- |
| `templates/handsontable/index.html` | #result-area 增 `#step-detail`（验收框逐步展示位） |
| `templates/handsontable/lesson.js` | `stepDetailHTML`/`argsRows`：当前步四要素 + 参数 1..N 逐位；练习/空闲/完成态 |
| `templates/handsontable/theme.css` | #step-detail 样式（主题 token 联动，--accent 高亮 part） |
| `skill/excel-tutorial-maker/templates/README.md` | DOM 契约注释同步（结果区=逐步展示+验收回读） |
| `docs/.../task-07/drive-steps.py` | 验收驱动 + shots/ 4 张 + result.json |

## 要点（hand-off 给下游）

1. **展示口径**：step-detail 只反映**当前步**（状态机 render 全量刷新）——四要素
   顺序固定（标题/单元格/公式/参数/预期）；参数行仅在公式以 `=` 开头时渲染。
2. **guide 卡片保留**：底部 4 卡仍是全局概览（紧凑参数行），验收框是逐条细读位
   ——两处同源于契约，改契约全生效。
3. **主题口径澄清**（用户问答）：`kimi` 仅内部代号，对外称「编辑风（格子风）」
   ——中性表格编辑器审美（纸白/墨黑/橙红），非 Kimi 品牌样式；文档表述已改，
   机器 token 暂留 `kimi`（要改名随时可做）。
4. **布局**：#result-area 300px 定宽 + overflow-y auto，长参数文自动换行不溢出。

## 下游接线

- phase-6 出片：录屏画面右栏逐步展示可入镜（镜头不用再切小卡片）；narration 派生
  与 step-detail 同源（契约四要素 + formulaArgs）。
