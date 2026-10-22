# Agent 入口 - AI Edu Tutorials

**Updated:** 2026-07-10

## 当前焦点

Phase 0 文档对齐 + Phase 1/2 代码层已落地（初始提交 `f1d8168`）。**剩余为环境门控项**：需开发机 + 外部仓实跑。

- ✅ 已完成（代码可校验）：doc-reconcile、course-manifest、roles-config、course-composer-v1、quiz-builder-v1、agent-sop-pdf2stage、course-import-export、runtime-observability、git-baseline。
- 🟡 代码就绪，验收含环境门控：deeptutor-hook（待 baseline-deeptutor 跑通复现）、sample-course（待 runtime 可播放）。
- ⏳ 环境门控（runbook 已就绪，待实跑）：baseline-openmaic、baseline-deeptutor、bundled-runtime-verify。

## Issue 看板

| Issue | Phase | Mode | 状态 | 说明 |
|---|---|---|---|---|
| [edu-git-baseline](./issues/edu-git-baseline.md) | 0 | - | done | 初始提交 f1d8168 + .gitignore |
| [edu-doc-reconcile](./issues/edu-doc-reconcile.md) | 0 | vertical | done | ADR/index/overview/features/contracts 对齐；course-sprint 归档 |
| [edu-baseline-openmaic](./issues/edu-baseline-openmaic.md) | 0 | pipeline | todo | runbook 就绪，待实跑（环境门控） |
| [edu-baseline-deeptutor](./issues/edu-baseline-deeptutor.md) | 0 | pipeline | todo | runbook 就绪，待实跑（环境门控） |
| [edu-course-manifest](./issues/edu-course-manifest.md) | 1 | pipeline | done | contract + TS schema + sample，过校验 |
| [edu-roles-config](./issues/edu-roles-config.md) | 1 | vertical | done | Role 类型 + role-editor |
| [edu-course-composer-v1](./issues/edu-course-composer-v1.md) | 1 | vertical | done | composer 向导 + store + list，已接 App |
| [edu-quiz-builder-v1](./issues/edu-quiz-builder-v1.md) | 1 | vertical | done | quiz-builder + Question 类型 |
| [edu-agent-sop-pdf2stage](./issues/edu-agent-sop-pdf2stage.md) | 1 | pipeline | done | SOP 文档 + 校验点 |
| [edu-sample-course](./issues/edu-sample-course.md) | 1 | pipeline | in_progress | sample-course.ts 已过校验；端到端播放待 runtime |
| [edu-bundled-runtime-verify](./issues/edu-bundled-runtime-verify.md) | 2 | vertical | in_progress | boot 端到端验证通过（2026-07-13 修 3 根因：package.json/hoist 路径/externalBin）；装机验证 + 免 Node 待做 |
| [edu-runtime-observability](./issues/edu-runtime-observability.md) | 2 | vertical | done | 错误 banner + log::error! + 恢复按钮 |
| [edu-deeptutor-hook](./issues/edu-deeptutor-hook.md) | 2 | vertical | in_progress | Rust + TS + 面板就绪；复现待 baseline-deeptutor |
| [edu-course-import-export](./issues/edu-course-import-export.md) | 2 | horizontal | done | Rust 命令 + course-io + UI 按钮 |

## 四件套

1. 本文件  
2. `issues/<id>.md`  
3. `tasks/issues/<id>.md` 最后一条  
4. 本轮 ≤3 条子任务  

## 依赖主线

```text
git-baseline -> doc-reconcile
baseline-openmaic / baseline-deeptutor  (并行)
course-manifest (contract) -> roles-config -> composer-v1
                          \-> quiz-builder-v1 / agent-sop-pdf2stage -> sample-course
bundled-runtime-verify -> runtime-observability
course-manifest -> course-import-export ; baseline-deeptutor -> deeptutor-hook
```

## 相关

- [technical-overview.md](./technical-overview.md) - 技术/架构/模块横切总结
- [overview.md](./overview.md)
- [spec/architecture.md](./spec/architecture.md)
- [spec/sop/pdf-to-stage.md](./spec/sop/pdf-to-stage.md)
- 集成调研：[`docs/together-learning/`](../together-learning/)（OpenMAIC + DeepTutor 组合架构推荐，代码级）
- 归档规划：[`course-sprint/`](../../course-sprint/)（已被 docs/project 取代，仅留历史）
- 社区/教程模式调研：[`research/ai-edu-community/`](../../research/ai-edu-community/README.md)（结论提炼 · 差距分析 · 可执行操作）
