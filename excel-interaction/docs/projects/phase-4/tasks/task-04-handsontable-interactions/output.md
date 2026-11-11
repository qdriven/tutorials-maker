# task-04 · output（产出交接）

## 什么功能完成了

**handsontable 模板四项 Excel 级交互落地**（用户反馈「公式不能自动跳出、不能像 Excel
选范围操作」的路线 A）：公式栏随选中联动、拖选/填充柄、编辑公式点选/拖选插引用、
函数建议弹层。试点课 vlookup-basic 直接受益，约八成 Excel 仿真度。

## 产出清单

| 文件 | 作用 |
| --- | --- |
| `templates/handsontable/formula-assist.js` | 新组件：point mode（点选/拖选插引用）+ 函数建议弹层（前缀过滤/↑↓/Tab 插入/Esc 关） |
| `templates/handsontable/engine.js` | onSelection（跨重挂载存活）/ getContent / getSelection / fillHandle；assist 装配 |
| `templates/handsontable/lesson.js` | 公式栏联动（onSelection → #formula-echo，动画 typeIn 期间不打断） |
| `templates/handsontable/theme.css` | .point-range 高亮 + #formula-suggest 弹层样式（主题 token 联动） |
| `templates/handsontable/index.html` | 挂 formula-assist.js；vendor 加 hyperformula-enGB.js（函数表数据源） |
| `scripts/tutorial/new.mjs` | 引擎目录复制通用化（除根层三件+README 全拷）；vendor 清单 +5 件 |

## 要点（hand-off 给下游）

1. **HT 生命周期坑**（写交互必读）：`afterSelectionEnd` 去选以 (-1,-1) 触发须防空；
   **无 `afterFinishEditing` 钩子**，编辑态用 `getActiveEditor().isOpened()`；
   编辑器 textarea 跨编辑复用（监听只绑一次）。
2. **HF 函数表**：`getRegisteredFunctionNames('enGB')` 传语言码；HT 插件已注册过
   enGB → 先直接取、取不到再 registerLanguage（顺序反了必空表）；语言包
   `hyperformula/dist/languages/enGB.js` 必须 vendor（挂 HyperFormula.languages）。
3. **测试钩子扩充**：`Engine.onSelection/getSelection/getContent`、
   `FormulaAssist._debug`（函数表状态）——出片/回归驱动可复用。
4. **未做**（写进 task 范围外）：名称框、右键菜单、条件格式等全量周边；
   要完整 Excel 交互走 univer/onlyoffice 引擎课（引擎矩阵路线）。

## 下游接线

- phase-6 出片：渲染式录制的编辑画面现在有真实公式交互（点选插引用可入镜）。
- 后续引擎课：univer/onlyoffice 模板实现时对齐本表交互口径（point mode/建议弹层语义）。
