# task-12 · output（产出交接）

## 什么功能完成了

**UI 主题改格数同款**（用户反馈：「当前 UI themes 还不是很满意，期望变成 kimi 的格数的
样式」）——kimi 主题从「纸白/墨黑/橙红编辑风」重做为格数/kimi-excel 的 Handsontable
教程视觉：**cream 纸面 + 墨线小圆角、金作填充（表头带/步码/总结框）、蓝作强调
（选区/链接/当前步）、无阴影无渐变**，墨底纸字字幕条。

## 产出清单

| 文件 | 作用 |
| --- | --- |
| `templates/handsontable/theme.css` | kimi=格数 token 全套（cream/ink/gold/blue + sheet/band/line/code/formula/edit 辅助 token + 小圆角）；green 补齐同套辅助 token（双主题契约不破）；组件层对齐（金步码方章/总结框金左条/fx 墨线方框/▶ 墨底主按钮/弹层墨线无阴影） |
| `templates/handsontable/theme.css`（HT 映射） | `--ht-*` 全量映射打在 `[data-theme] .ht-theme-main` 本体（表头灰带/active 墨·金/选区蓝/编辑底/radius 0） |
| `templates/handsontable/engine.js` | renderer 给 data 第 1 行打 `.cell-head`（金底表头带/墨字/加粗/居中） |
| `templates/handsontable/lesson.js` | 顺手修：reset() 置 `mode="auto"`（重置回空闲态，出片确定性） |
| `references/contract-schema.md` + `templates/README.md` + `SKILL.md` | theme token 表改格数值、口径「格数同款」、data 第 1 行表头行约定、HT 映射落点说明 |

## 要点（hand-off 给下游）

1. **token 契约扩充**：`--bg/--panel/--sheet/--band/--fg/--soft/--line/--accent(+strong/soft)/
   --gold(+soft)/--code-bg·fg/--formula-bg·fg/--edit-bg/--radius/--radius-control`——
   kimi 色值取自格数 theme-kimi.css / kimi.png token 条；green 用同结构绿系值。
2. **`--ht-*` 映射落点**：必须打在 `.ht-theme-main` 本体（vendor 主题把变量声明在该根，
   祖先层映射会被盖掉）——后续新引擎模板照此办理，改完跑计算样式探针而非只目检。
3. **表头行约定**：契约 data 第 1 行 = 表头行（金底表头带）；查找/数据范围从第 2 行起。
4. **reset 语义**：reset() = 回空闲态（清 mode/foldState）——出片空闲帧、UI「↺ 重置」共用。

## 下游接线

- phase-7 展示层沿用格数视觉语汇做课程卡片；
- 新课契约按 contract-schema 写 summary 三句 + 第 1 行表头；
- 出片帧已带新主题（out/vlookup-basic/ 重出片 0.0% 漂移）。
