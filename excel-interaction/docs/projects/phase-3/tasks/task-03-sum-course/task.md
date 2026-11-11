# phase-3 · task-03 · 第二门课 SUM（契约通用性验证）

对应执行清单可选项「第二门课 SUM」；deferred.md #5 销账。

## 做什么

1. **seed**：`courses/seeds/sum-basic.md`（SUM 求和教程原文，体裁同试点 seed）。
2. **契约**：`courses/sum-basic.json`——月度数据（1200/1500/900），4 步指南
   （选中 C2 → 输入 =SUM(B2:B4) → 回车 3600 → 查看编辑栏）、formulaArgs 单参数
   （B2:B4 求和区域）、summary 三句（一句话/SQL 解释/收尾总结）、checks 真算 3600。
3. **全链跑通**（契约通用性证明）：manifest 校验 → 生成（自动登记 app）→ plan
   （参数口播规则 4 挂第 2 步）→ video/qc（0.0% 漂移、6 抽帧）→ showcase 登记。

## 验证点

1. `check-manifest` 2 契约 2 通过；`pnpm verify` 全绿（含清单 6 条）。
2. 出片 44496ms 0.0% 漂移、qc 6 抽帧目检（step-3 帧：C2 显示 3600、参数逐位、格数主题）。
3. 新课零模板/脚本改动——纯契约驱动（单源双产物复用全链）。
