# task-07 · verify（验证记录）

验证时间：2026-11-08 · 执行者：Claude Code

取证工具：[drive-steps.py](drive-steps.py)（Playwright）；截图 [shots/](shots/)；
机器可读结果 [result.json](result.json)。全绿 JSON（要点摘录）：

```json
{"steps_detail": {"step1": "第 1 步 · 选中 E2 单元格E2 公式定位查询结果单元格 预期E2 被选中，输入框激活",
  "step2": "第 2 步 · 输入框输入公式 …公式=VLOOKUP(D2,A2:B5,2,0) 参数1D2 查找值：要找的工号（在 D2） 参数2A2:B5 查找区域：… 参数32 列序数：… 参数40 匹配方式：0=精确匹配（必须写） 预期…",
  "step3": "…（四要素+参数逐位）", "step4": "…（四要素+参数逐位）"},
 "practice_detail": "✍ 手动练习 目标E2 显示 王五 公式=VLOOKUP(D2,A2:B5,2,0) 参数1..4 … 提示输入公式后回车自动验收",
 "done_detail": "✓ 演示完成 下方为验收回读（值 + 公式）",
 "done_caption": "✓ 验收通过：E2 显示 王五｜公式 =VLOOKUP(D2,A2:B5,2,0)（与契约一致，公式真算真回读）",
 "state": {"step": 5, "mode": "auto"}, "green_detail_has_args": 4, "console_errors": []}
```

## 验证点 1 · 逐步展示（验收框）

- **证据**：gotoStep(1..4) 逐步回读 `#step-detail`——每步标题（第 N 步 · menu）、
  单元格、公式、预期齐全；公式步（2/3/4）含参数 1..4 逐位（D2/A2:B5/2/0，
  part 橙红高亮）；定位步（1）不渲染参数行（口径正确）。
  shots/step-detail-step2.png 画面确认大字号逐条清楚。
- **结论**：**PASS**

## 验证点 2 · 手动练习

- **证据**：practice() 后 `#step-detail` = 目标（E2 显示 王五）/参考公式/参数 1..4/
  提示（回车自动验收）（shots/step-detail-practice.png）。
- **结论**：**PASS**

## 验证点 3 · 完成态 + 回归

- **证据**：play() 全程 → step=5、`✓ 演示完成…`、caption `✓ 验收通过：E2 显示 王五`；
  `console_errors: []`；确定性 grep 干净；`pnpm verify` EXIT=0。
- **结论**：**PASS**

## 验证点 4 · 双主题

- **证据**：`?theme=green` 下 gotoStep(2) → `#step-detail .sd-arg` = 4 行
  （shots/step-detail-green.png），样式随主题 token。
- **结论**：**PASS**

## 过程记录

实现一次成型，4 项验证首跑全绿（无 FAIL 记录）。
