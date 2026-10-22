# Issue: edu-doc-reconcile

**Status:** done  
**Mode:** vertical  
**Feature:** -  
**Assignee:** claude-code  
**Branch:** `feature/edu-doc-reconcile-claude`  
**Contract:** -

## 背景

`docs/project/`（AGENTS 指定唯一事实源）落后于实际代码与 `course-sprint/`：ADR 仍写「opener 外开」，index 仍标 spike `in_progress`、baselines `todo`，features 表为空，`course-sprint/` 自称「MVP 已完成」与实况矛盾。多 Agent 协作前必须对齐。

## 范围

**做：**

- 改写 ADR `openmaic-embed.md` 为「子 Webview 内嵌 + bundled runtime」，外开降级为兜底。
- 更新 `index.md`：Phase 0-2 看板、依赖主线、归档指引。
- 更新 `overview.md`：阶段、已落地/待落地、里程碑。
- 登记 `features/README.md`、`issues/README.md`、`contracts/README.md` 索引。
- `course-sprint/*.md` 加归档头，指向 `docs/project/`。

**不做：**

- 改 spec 非目标（`spec/README.md`）。
- 删除 `course-sprint/`（保留历史）。
- 实际跑 baselines（属 edu-baseline-*）。

## 可改动的路径

- `docs/project/index.md`、`overview.md`、`features/README.md`、`issues/README.md`
- `docs/project/spec/contracts/openmaic-embed.md`、`contracts/README.md`
- `course-sprint/*.md`（仅加头）

**禁止改动：**

- `spec/README.md`、`spec/architecture.md`、`spec/conventions.md`
- 任何 `desktop/` 源码

## 验收标准

- [ ] ADR 反映 `classroom-embed.tsx` + `lib.rs` 现状，无「opener 外开为 MVP」表述。
- [ ] index/overview/issues/features/contracts 五处索引自洽无矛盾。
- [ ] `course-sprint/` 顶部有归档指向。
- [ ] 后续 Agent 读 index 即可知道下一步，无需读 `course-sprint/`。

## 依赖

- 阻塞：无
- 流水线上游：建议先于 `edu-git-baseline` 首提交完成

## 关联 Agent

| Agent | 子任务 | 状态 |
|---|---|---|
| claude-code | 改写 5 文档 + 归档 2 文件 | in_progress |

## 过程日志

[`tasks/issues/edu-doc-reconcile.md`](../tasks/issues/edu-doc-reconcile.md)
