# task-11 · verify（验证记录）

验证时间：2026-11-08 · 执行者：Claude Code

取证工具：[drive-11.py](drive-11.py)；截图 [shots/](shots/)；[result.json](result.json)；
出片抽帧 `out/vlookup-basic/qc/`（intro-mid / step-N-mid / outro-mid，gitignored）。

## 验证点 1 · 课内开篇拍 + 动画结束再总结

- **证据**：reset 空闲态——`idle_has_oneliner=true`、`idle_has_explain_sql=true`
  （面板「一句话/解释」框含 SQL 等价式）、`idle_caption` = 一句话｜解释 全文；
  `Lesson.play()` 后 800ms `step_during_intro_beat=0`（开篇拍 4s 驻留生效，未直接进步）；
  走完 4 步 finish()——`done_has_outro=true`（面板「总结」框）、
  `done_caption_has_outro=true`、`done_verified_ok=true`（✓ 验收通过 + 总结同屏）。
  shots/summary-idle.png · summary-step2.png · summary-done.png 目检。
- **结论**：**PASS**

## 验证点 2 · 常驻 + 回归

- **证据**：`intro_persistent_at_step2=true`（动画中一句话框可回读）；
  `folds_auto_step2=[f,t,f,f]`（当前步展开语义不变）；`folds_practice=[f,f,f,f]`
  （练习态防剧透不变）。
- **结论**：**PASS**

## 验证点 3 · 出片首尾段（契约双产物）

- **证据**：`pnpm plan` 时间线 6 段——开篇 15104ms（口播 一句话+解释）、
  4 步 3704/4808/4232/4808ms、收尾 8480ms（口播 总结），总 41136ms 整轨精确对齐；
  `pnpm video` 成品 41136ms vs ΣholdMs 41136ms（偏差 **0.0%**）；
  `pnpm qc` 抽帧 6 张全过；intro-mid.png（开篇框+开篇字幕入镜）、
  outro-mid.png（✓ 验收 + 总结框 + 总结字幕入镜）目检。
- **结论**：**PASS**

## 验证点 4 · 回归

- **证据**：`pnpm verify` EXIT=0（环境 6/6 + 契约 1/1）；确定性 grep 干净；
  `console_errors: []`。
- **结论**：**PASS**

## 过程记录（两处取证修正，均非产品缺陷）

1. **开篇拍探针首跑无效**：`page.evaluate("Lesson.play()")` 会 await play() 返回的
   Promise——整场播完才返回，800ms 观测读到 step=5。改为丢弃返回值
   （`() => { Lesson.play(); return null; }`）复验 step=0。
2. **收尾帧首跑 ✗**：驱动只 gotoStep(2) 就 finish()——第 3 步未写公式，E2 空、
   字幕「✗ 验收未通过」入镜。补走完 4 步再 finish() 复验 ✓（done_verified_ok=true）。
