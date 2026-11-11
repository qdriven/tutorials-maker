# phase-8 · task-01 · output（产出交接）

## 什么功能完成了

**记录与收尾**——项目全链（phase-0~8）收口：根 README「一图流」（契约 → 生成 →
出片 → 登记 四步命令）、全链自检口径落定、遗留清单移交、执行流水终条目。

## 产出清单

| 文件 | 作用 |
| --- | --- |
| `README.md` | 一图流节 + 快速开始补全 + Phase 总览 7/8 收口 |
| `docs/projects/phase-8/deferred.md` | 遗留清单（功能欠账 6 项 + 仓库事务 2 项，append-only 销账制） |
| `docs/projects/phase-8/tasks/task-01-closeout/` | 本三件套（收口记录） |

## 要点（hand-off 给下一批次）

1. **一图流即标准流**：契约（courses/<id>.json）→ 生成（pnpm generate，自动登记 app）
   → 出片（plan/video/qc，自动落 showcase + 登记 demo）→ 登记（pnpm verify + showcase）。
2. **全链自检三件**：`pnpm verify` EXIT=0 · showcase URL 200 · 成片 ffprobe 流/时长对账。
3. **遗留按清单销账**：deferred.md 新增/销账都走该文件（销账标 ✅ + index-log 号）；
   下一批次优先候选：逐参数高亮动画（#4）、SUM 第二门课（#5）。
4. **仓库事务待用户定夺**：PR/分支整理、旧域在飞改动归属（deferred.md #7/#8）。

## 下游接线

- 新批次按 build-method 从 deferred.md 取项立 task 三件套；
- 新人复现：根 README 快速开始 + 一图流即完整路径。
