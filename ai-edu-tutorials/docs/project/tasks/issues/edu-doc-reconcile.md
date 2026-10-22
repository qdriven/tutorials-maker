# Task log: edu-doc-reconcile

Issue：[`issues/edu-doc-reconcile.md`](../../issues/edu-doc-reconcile.md)

---

## 2026-07-10 - claude-code - in_progress

**做了：**  
- 改写 ADR `openmaic-embed.md`（子 Webview 内嵌 + bundled runtime，外开降级兜底）。  
- 重写 `index.md`（Phase 0-2 看板 + 依赖主线 + 归档指引）。  
- 重写 `overview.md`（已落地/待落地 + 里程碑）。  
- 登记 `features/README.md`、`issues/README.md`、`contracts/README.md`。  
- `course-sprint/*.md` 加归档头。  

**证据：** 5 份文档 + 2 份归档头的 diff。  
**未做：** Phase 1/2 的 12 个 issue 文件（属本 issue 范围外的子任务，由本轮一并落地）。  
**给下一 Agent：** 文档已对齐；下一步跑 baselines 或开 `edu-course-manifest`。  
**状态：** in_progress

---

## 2026-07-10 - claude-code - done

**做了：** 改写 ADR openmaic-embed；重写 index/overview；登记 features/issues/contracts 索引；course-sprint/* 加归档头。
**证据：** commit f1d8168；bun run typecheck + cargo check 均 clean。
**给下一 Agent：** 文档已对齐；下一步跑 baselines（环境门控）。
**状态：** done
