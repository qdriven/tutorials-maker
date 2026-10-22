# Issue: edu-roles-config

**Status:** done  
**Mode:** vertical  
**Feature:** roles-config  
**Assignee:** -  
**Branch:** `feature/edu-roles-config-<agent>`  
**Contract:** [spec/contracts/course-manifest.md](../spec/contracts/course-manifest.md)

## 背景

MVP 验收 #3：教师 + 至少 1 同学（peer）角色可对话。需在 manifest 内定义角色，并让课堂运行时能读取/配置。

## 范围

**做：**

- 在 manifest 内定 `Role` 类型：id、name、kind（teacher/peer/ta）、persona、voice（可选）、开场白。
- `desktop/src/components/courses/role-editor.tsx`：增删改角色，编辑 persona。
- 衔接 `edu-baseline-openmaic` 记录的 OpenMAIC 角色配置方式（笔记为准）。

**不做：**

- TTS/ASR（spec 非目标）。
- 角色 LLM 后端逻辑（由 OpenMAIC 运行时承担）。

## 可改动的路径

- `desktop/src/lib/course-manifest.ts`（Role 部分）
- `desktop/src/components/courses/role-editor.tsx`

**禁止改动：**

- 其它 issue 的 UI 模块。

## 验收标准

- [ ] manifest sample 含 1 teacher + 1 peer。
- [ ] role-editor 可增删改并回写 manifest 对象。
- [ ] 角色字段与 baseline 笔记里 OpenMAIC 实际可配置项对齐。

## 依赖

- 阻塞：edu-course-manifest
- 流水线上游：edu-baseline-openmaic（角色实际可配置性）

## 关联 Agent

| Agent | 子任务 | 状态 |
|---|---|---|

## 过程日志

[`tasks/issues/edu-roles-config.md`](../tasks/issues/edu-roles-config.md)
