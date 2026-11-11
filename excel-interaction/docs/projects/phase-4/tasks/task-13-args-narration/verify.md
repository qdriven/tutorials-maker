# task-13 · verify（验证记录）

验证时间：2026-11-08 · 执行者：Claude Code

取证：node 派生断言（build-plan.mjs 导出函数直测）+ plan/video/qc 输出留档；
出片抽帧 `out/vlookup-basic/qc/`（gitignored）。

## 验证点 1 · 派生断言（argsNoteFor / narrationForStep）

- **命令**：`node --input-type=module -e "…argsNoteFor(course)/narrationForStep…"`
- **实际输出**：
  - `note.step = 2`、`note.text = 参数：D2 是 查找值：…；A2:B5 是 查找区域：…；2 是 列序数：…；0 是 匹配方式：…`（4 条全量）；
  - `step1 = 选中 E2：E2 被选中`、`step3 = 回车确认：E2 显示 王五`、`step4 = 选中 E2 查看编辑栏：编辑栏回显`（非挂步不变）；
  - `step2 = 输入框输入公式：E2 显示公式原文。参数：…`（修剪结果后追加）；
  - `author-wins = 作者定稿`（自带 narration 不追加）；
  - `full-step2 = …参数：…`（--full 同样追加）；`no-args-course = null`（无 formulaArgs 不挂）。
- **结论**：**PASS**

## 验证点 2 · plan 时间线

- **命令**：`pnpm plan -- --config courses/vlookup-basic.json --tts edge`
- **实际输出**：第 2 步 24176ms（speech 23376ms，口播含参数逐位 4 条）；第 1/3/4 步
  3704/4232/4808ms 不变；开篇 15104ms / 收尾 8480ms 不变；总 60504ms 整轨对齐。
- **结论**：**PASS**

## 验证点 3 · 出片重跑 + 回归

- **命令**：`pnpm video -- --plan out/vlookup-basic/plan.json` · `pnpm qc …` · `pnpm verify`
- **实际输出**：成品 60504ms vs ΣholdMs 60504ms（偏差 **0.0%**）；qc 6 抽帧全过
  （step-2-mid @30.9s 落在参数口播段中点，字幕与步一致）；`pnpm verify` EXIT=0
  （契约 1/1）。
- **结论**：**PASS**

## 过程记录（一处小修）

**import 触发 CLI**：build-plan.mjs 结尾裸 `main()`——导出函数被 node -e import 时
也跑主流程打 usage 退出。补「直接执行才跑」守卫
（`import.meta.url === pathToFileURL(process.argv[1]).href`），导出可测。

## 已知取舍

参数逐位 4 条口播使第 2 步驻留 +19.3s（总 41.1s→60.5s）——参数是本课教学核心，
全量保留；嫌长时作者改契约 meaning 文案即可收短（与 summary 文案微调同法）。
逐参数高亮动画（拆段驻留）记入 phase-8 遗留清单。
