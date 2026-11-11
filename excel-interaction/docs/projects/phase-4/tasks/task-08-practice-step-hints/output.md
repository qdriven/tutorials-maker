# task-08 · output（产出交接）

## 什么功能完成了

**手动练习步骤提示**（用户反馈「在验收框展示步骤提示，手工练习更清楚」）：
练习态验收框展示 4 步指南全清单（cell·menu 标题 + 公式 + 参数逐位 + 预期）+
目标/操作提示行。内容结构（sd-step 分组、参数行复用 task-06 逐位样式）定型于此。

## 产出清单

| 文件 | 作用 |
| --- | --- |
| `templates/handsontable/lesson.js` | practice 分支逐步提示（stepHintRows 结构） |
| `templates/handsontable/theme.css` | 步骤分组样式（编号圆点/缩进/参数行） |
| `docs/.../task-08/drive-hints.py` | 验收驱动 + shots/ 2 张 + result.json |

## 要点（hand-off 给下游）

1. **提示形态**：练习态=全步清单静态提示（不随操作推进）；参数逐位在每个公式步
   下逐条挂（与 guide 卡同构，用户贴出的形态）。
2. **展示被 task-09 细化**：同轮用户澄清「全步都要展示，只是折叠不是替换」——
   渲染层改为折叠面板（task-09），本 task 的内容结构（步骤分组/参数/预期行）沿用。
3. **驱动教训**：gotoStep 不切 mode——验 auto 态视图要重载页面（mode 初始 auto），
   否则截到的还是练习视图（本次踩过）。

## 下游接线

- task-09 折叠面板（最终展示形态）；phase-6 出片的画面右栏即此面板（逐步展开入镜）。
