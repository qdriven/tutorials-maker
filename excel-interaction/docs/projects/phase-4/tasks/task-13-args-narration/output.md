# task-13 · output（产出交接）

## 什么功能完成了

**公式参数逐位进口播**（task-06 承诺欠账清偿）——契约 `formulaArgs` 的参数说明
从「只进字幕」补到「也进口播」：出片时首个公式步的解说词追加
`参数：<part> 是 <meaning>；…` 逐条，参数段不走无废话修剪 2–3（这一步的教学点
就是参数），仍剔公式片段；其余步骤不重复念。

## 产出清单

| 文件 | 作用 |
| --- | --- |
| `scripts/recorder/build-plan.mjs` | `argsNoteFor(course)`（formulaArgs 单源派生 + 锁定挂步）+ `narrationForStep(g, full, argNote)` 追加段；import 不触发 CLI 的执行守卫 |
| `skill/excel-desktop-recorder/references/tts.md` | 无废话规则 4：参数逐位口播（挂步约定/不走 2–3/作者定稿不追加） |
| `skill/excel-tutorial-maker/references/contract-schema.md` | formulaArgs 节口播派生落到具体规则 |

## 要点（hand-off 给下游）

1. **挂步约定**：参数口播挂**首个 `formula` 以 `=` 开头的步骤**（公式首次写入那一步），
   其余步骤不重复念；步骤自带 `narration`（作者定稿）时不追加。
2. **派生文**：`参数：<part> 是 <meaning>；…`——meaning 原文照用（教程提炼人工写入）；
   嫌长收短 = 改契约 meaning 文案（与 summary 文案微调同法），不改派生规则。
3. **时长影响**：vlookup-basic 第 2 步 +19.3s（口播 23.4s），总 41.1s→60.5s——
   参数是 VLOOKUP 课的教学核心，全量保留。
4. build-plan.mjs 导出 `narrationForStep`/`argsNoteFor` 可直测（import 不跑 CLI）。

## 下游接线

- 新课契约：formulaArgs 写全 4 要素（part/meaning），口播自动派生；
- phase-8 遗留清单挂「逐参数高亮动画（拆段驻留）」——参数口播段的进阶节奏。
