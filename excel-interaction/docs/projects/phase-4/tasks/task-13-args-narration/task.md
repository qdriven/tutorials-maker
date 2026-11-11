# task-13 · 公式参数逐位进口播（formulaArgs 口播，欠账清偿）

## 背景（task-06 承诺欠账）

task-06 已把 `formulaArgs` 参数逐位说明接进课内（验收框折叠面板/字幕/练习提示），
但出片口播没消费它——字幕念不出来的参数说明只在画面里。task-06 output 明言
「录像出片的参数口播——narration 派生规则归 recorder 技能」，本任务清账。

## 做什么

1. **口播派生规则 4**（excel-desktop-recorder/references/tts.md）：契约 formulaArgs
   挂在首个 `formula` 以 `=` 开头的步骤（公式首次写入那一步，其余步不重复念），
   派生文 `参数：<part> 是 <meaning>；…` 追加在修剪结果后；参数段是这一步的教学点，
   不走规则 2–3（仍走规则 1 剔公式片段）；步骤自带 narration（作者定稿）不追加。
2. **build-plan.mjs**：`narrationForStep(g, full, argNote)` 增 argNote 追加；
   `argsNoteFor(course)` 从 formulaArgs 单源派生并锁定挂步。
3. **文档**：contract-schema formulaArgs 节把「口播从同一字段派生」落到具体规则。

## 验证点

1. 派生断言（node -e）：argsNoteFor 挂 step 2、4 参数全量入文；step 3/4 口播不变；
   作者 narration 覆盖时不追加。
2. `pnpm plan`：第 2 步口播含「参数：D2 是查找值…」4 条，其余段不变；时长重排。
3. 出片重跑：`pnpm video` 漂移 <5%、`pnpm qc` 6 抽帧目检；`pnpm verify` EXIT=0。
