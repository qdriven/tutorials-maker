# Issue: edu-agent-sop-pdf2stage

**Status:** done  
**Mode:** pipeline  
**Feature:** pdf2stage-sop  
**Assignee:** -  
**Branch:** `feature/edu-agent-sop-pdf2stage-<agent>`  
**Contract:** [spec/contracts/course-manifest.md](../spec/contracts/course-manifest.md)

## 背景

MVP 验收 #5：Agent SOP 可从 PDF 生成**可校验**的 Stage。需要一个稳定、可复现的工序文档，让任意 Agent 按 SOP 把 PDF 变成能过 `validateCoursePackage()` 的场景序列。

## 范围

**做：**

- 产出 `docs/project/spec/sop/pdf-to-stage.md`：步骤、输入输出、校验点、失败处理。
- 定义 Stage 生成中间结构（对齐 manifest 的 Scene）。
- （可选）`desktop/src/lib/pdf2stage.ts` 骨架：从文本大纲 -> Scene[] 的纯函数转换，便于校验。

**不做：**

- PDF 解析实现（用 OpenMAIC 现有 provider：unpdf / MinerU）。
- LLM 调用细节（由执行 Agent 现场决定）。

## 可改动的路径

- `docs/project/spec/sop/pdf-to-stage.md`
- `desktop/src/lib/pdf2stage.ts`（可选骨架）

**禁止改动：**

- manifest schema。

## 验收标准

- [ ] SOP 文档含 ≥1 端到端示例（输入 PDF 段落 -> 输出 Scene[]）。
- [ ] 输出能过 `validateCoursePackage()`。
- [ ] SOP 列出明确校验点（字段必填、场景类型合法、角色存在）。

## 依赖

- 阻塞：edu-course-manifest
- 流水线上游：edu-baseline-openmaic（PDF provider 实况）

## 关联 Agent

| Agent | 子任务 | 状态 |
|---|---|---|

## 过程日志

[`tasks/issues/edu-agent-sop-pdf2stage.md`](../tasks/issues/edu-agent-sop-pdf2stage.md)
