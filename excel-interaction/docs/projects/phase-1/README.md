# Phase 1 · 目录骨架

## 这个 phase 做什么

建立项目五层目录骨架：契约（`courses/` + `courses/seeds/`）、技能（`skill/`）、
流水线（`scripts/tutorial|docs|serve`）、产物（`apps/` + `out/`）、展示（`src/`）；
gitignore 收敛为 `out/` 一条产物规则；最小 workspace 可装依赖。

对齐 [build-checklist 阶段 1 · 目录骨架](../../../../excel-animation/docs/build-checklist.md)。

## tasks/ 任务清单

| task | 做什么 | 状态 |
| --- | --- | --- |
| [task-01-layer-skeleton](tasks/task-01-layer-skeleton/) | 五层目录骨架落位 + 各模块 README | ✅ |
| [task-02-workspace](tasks/task-02-workspace/) | 最小 workspace（package.json + 依赖通道） | ✅ |
| [task-03-artifact-rules](tasks/task-03-artifact-rules/) | 产物规则（out/ gitignore）与 git 归属核对 | ✅ |

每个 task 目录内：`task.md`（做什么/功能/验证点）、`verify.md`（验证记录）、`output.md`（交接）。
