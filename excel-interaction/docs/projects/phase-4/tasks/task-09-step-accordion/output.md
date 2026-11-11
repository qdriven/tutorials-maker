# task-09 · output（产出交接）

## 什么功能完成了

**验收框全步折叠展示**（用户澄清「每一个步骤都需要在验收框展示，只是折叠的
问题，不是替换」）：4 步常驻验收框（details/summary 折叠面板），当前步默认展开
（current 标记）、其余折叠；点标题任意展开/折叠（偏好记住，reset 清零保确定性）；
练习态全展开（提示形态）；验收回读行保留（非替换）。

## 产出清单

| 文件 | 作用 |
| --- | --- |
| `templates/handsontable/lesson.js` | `foldItems`/`bindFolds`/`foldState`：全步折叠面板 + 偏好记忆 |
| `templates/handsontable/theme.css` | `.sd-fold` 折叠面板样式（current 橙色标记、summary 手型） |
| `docs/.../task-09/drive-fold.py` | 验收驱动 + shots/ 3 张 + result.json |

## 要点（hand-off 给下游）

1. **折叠语义**：默认折叠态随模式——auto=当前步展开、practice=全展开、
   idle/完成=全折叠；用户点击覆盖默认（foldState），**reset 清偏好**（出片确定性：
   渲染式截帧走 gotoStep，折叠态可重放）。
2. **非替换**：任务上下文（4 步标题）永远可见；验收回读行（验收/值/公式）在
   面板外固定保留——三块分区（步骤面板 / 回读 / guide 卡）各司其职。
3. **原生 details/summary**：零 JS 折叠逻辑、可访问性内建；toggle 事件写偏好。

## 下游接线

- phase-6 出片画面右栏即本面板（当前步展开入镜，抽帧可核对）；
- phase-7 展示层可复用折叠面板做课程目录交互。
