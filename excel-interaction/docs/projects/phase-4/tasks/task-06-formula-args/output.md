# task-06 · output（产出交接）

## 什么功能完成了

**公式参数逐位说明（formulaArgs）**（用户反馈「公式函数每一个位置给的参数没有
说明」）：契约级参数说明字段 + 生成课三处同源渲染（guide 卡片 / 字幕 / 手动练习
提示）+ 清单一致性校验。VLOOKUP 四参数（查找值/查找区域/列序数/匹配方式）现在
逐位显示在教程文字里。

## 产出清单

| 文件 | 作用 |
| --- | --- |
| `skill/excel-tutorial-maker/references/contract-schema.md` | formulaArgs 字段定义（part/meaning、顺序=参数顺序、part 须在公式原文中） |
| `courses/vlookup-basic.json` / `examples/course.example.json` | 契约回填（VLOOKUP 4 条 / SUM 1 条） |
| `templates/handsontable/lesson.js` | 三处渲染：guide 卡片参数行、caption 字幕「｜参数 …」、练习/✗ 提示 |
| `templates/handsontable/theme.css` | .formula-args 样式（part 强调色、11px 参考字号） |
| `scripts/tutorial/check-manifest.mjs` | formulaArgs 校验（part/meaning 齐全、part 在公式原文中） |
| `skill/excel-tutorial-maker/SKILL.md` | 契约摘要 + 验收清单增参数说明项（3.1K，仍 ≤5K） |
| `docs/.../task-06/drive-args.py` | 验收驱动 + shots/ 3 张 + result.json |

## 要点（hand-off 给下游）

1. **单源三渲染**：参数说明只写在契约 formulaArgs，卡片/字幕/练习提示都从它派生
   ——改一处全生效；展示仅对 formula 以 `=` 开头的 guide 步生效（定位步不渲染）。
2. **人工提炼、不查表**：meaning 由教程正文提炼（干什么 + 注意点），schema 明示
   不做函数文档自动生成——保持契约手改属性。
3. **验收链新规则**：check-manifest 拒绝 part 不在公式原文中的契约（反例实测
   EXIT=1）；`pnpm verify` 已含此校验。
4. **录像出片口径**：phase-6 recorder 的参数口播从同一字段派生（tts 无废话修剪
   照旧）——契约里没有的参数说明，视频里也不会有。

## 下游接线

- phase-6 出片：narration 派生时参数说明可作第一子句素材（契约单源）。
- 新课生成：写契约时按 contract-schema.md 的 formulaArgs 节补参数逐位说明
  （SKILL.md 验收清单已列项）。
