# phase-3 · task-03 · verify（验证记录）

验证时间：2026-11-08 · 执行者：Claude Code

出片抽帧 `out/sum-basic/qc/`（gitignored）。

## 验证点 1 · 契约校验 + 生成登记

- **命令**：`node scripts/tutorial/check-manifest.mjs` · `node scripts/tutorial/new.mjs --id sum-basic --config courses/sum-basic.json --force`
- **实际输出**：`✓ sum-basic.json｜✓ vlookup-basic.json｜2 份契约，2 通过 / 0 失败`；
  `✓ apps/sum-basic/ 已生成（引擎 handsontable · 主题 kimi · vendor 5 件）`（app 条目自动 upsert）。
- **结论**：**PASS**

## 验证点 2 · 出片 + 质检

- **命令**：`pnpm plan -- --config courses/sum-basic.json --tts edge` · `pnpm video -- --plan out/sum-basic/plan.json` · `pnpm qc -- --plan out/sum-basic/plan.json`
- **实际输出**：时间线 7 段——开篇 12248ms、4 步 3752/12512/4352/4856ms（第 2 步含
  参数逐位口播「参数：B2:B4 是 求和区域：…」，规则 4 复用于第二门课）、收尾 6776ms，
  总 44496ms；成品 44496ms 偏差 **0.0%**；qc 6 抽帧全过，`展示层已登记 demo: sum-basic-video`。
  step-3-mid.png 目检：C2 显示 3600（真算真回读）、参数逐位、格数主题、字幕同步。
- **结论**：**PASS**

## 验证点 3 · 全链回归 + 契约通用性

- **证据**：`pnpm verify` EXIT=0（环境 6/6 + 契约 2/2 + 清单 6 条）；
  新课**零模板/脚本改动**——纯 courses/sum-basic.json 契约驱动出课出片（单源双产物复用全链）。
- **结论**：**PASS**
