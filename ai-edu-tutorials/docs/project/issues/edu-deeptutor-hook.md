# Issue: edu-deeptutor-hook

**Status:** in_progress  
**Mode:** vertical  
**Feature:** deeptutor-hook  
**Assignee:** -  
**Branch:** `feature/edu-deeptutor-hook-<agent>`  
**Contract:** -

## 背景

README 把 DeepTutor 定为 Phase 1 知识 hook（CLI/API）。当前仅一个 settings 字段。需让课程内可触发 KB 查询/掌握度。

## 范围

**做：**

- Rust `run_deeptutor_chat(kb, question)` 命令：包装 `deeptutor` CLI（`D:\copy-modify\ai-edu\DeepTutor`），返回结果。
- `desktop/src/lib/deeptutor.ts`：invoke 封装。
- 课程内一个「问 DeepTutor」面板：选 KB、提问、看回答。
- 与 quiz-builder 的掌握度检查点衔接（可选）。

**不做：**

- 嵌入 DeepTutor Web UI 进 Tauri（spec 非目标）。
- 自建 KB 后端（用 DeepTutor 现有）。

## 可改动的路径

- `desktop/src-tauri/src/lib.rs`、`capabilities/default.json`
- `desktop/src/lib/deeptutor.ts`
- `desktop/src/components/`（deeptutor 面板）
- `desktop/src/lib/settings.ts`（已有 deeptutorRepo）

**禁止改动：**

- DeepTutor 仓源码。

## 验收标准

- [ ] `run_deeptutor_chat` 可复现（对照 baseline-deeptutor）。
- [ ] 面板可提问并显示回答。
- [ ] CLI 不可用时给明确错误（路径未配 / 命令不存在）。

## 依赖

- 阻塞：edu-baseline-deeptutor（确认 CLI 实际命令）
- 流水线上游：无

## 关联 Agent

| Agent | 子任务 | 状态 |
|---|---|---|

## 过程日志

[`tasks/issues/edu-deeptutor-hook.md`](../tasks/issues/edu-deeptutor-hook.md)
