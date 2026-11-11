# task-08 · verify（验证记录）

验证时间：2026-11-08 · 执行者：Claude Code

取证工具：[drive-hints.py](drive-hints.py)；截图 [shots/](shots/)；[result.json](result.json)。

## 验证点 1 · 练习态逐步提示

- **证据**：practice() 后验收框含 目标（E2 显示 王五）+ 4 步提示
  （`hint_step_titles` = 选中 E2 / 输入框输入公式 / 回车确认 / 选中 E2 查看编辑栏）、
  公式行 + 参数 1..4 逐位（`hint_arg_rows`=12，公式步逐条挂）、4 条预期行
  （`hint_soft_expect`）+ 操作提示；shots/practice-step-hints.png 目检清晰。
- **结论**：**PASS**

## 验证点 2 · 回归

- **证据**：练习真算验收 `✓ 验收通过：E2 显示 王五`；确定性 grep 干净；
  `console_errors: []`。自动播放态回归首跑取证无效（practice 后 mode 未回 auto，
  截到练习视图——gotoStep 不切 mode）→ 驱动改重载页面回 auto 态复验：
  step2 细读视图原样（FAIL→修复→复验 PASS）。
- **结论**：**PASS**

## 后续细化（同轮用户澄清）

用户澄清「每一个步骤都需要在验收框展示，只是折叠的问题，不是替换」→
本 task 的全清单提示形态被 [task-09](../task-09-step-accordion/) 细化为
**全步折叠面板**（练习态仍全展开=提示形态，内容结构本 task 定型）。
