# Issue: edu-course-composer-v1

**Status:** done  
**Mode:** vertical  
**Feature:** course-composer  
**Assignee:** -  
**Branch:** `feature/edu-course-composer-v1-<agent>`  
**Contract:** [spec/contracts/course-manifest.md](../spec/contracts/course-manifest.md)

## 背景

MVP 验收 #2（幻灯片 + 测验 + ≥1 交互场景）与下一 Sprint 目标：Courses 模块从占位升级为可创建课程的向导。当前 `App.tsx` 的 courses 分支仅两张描述卡片。

## 范围

**做：**

- `desktop/src/components/courses/course-list.tsx`：列出本地课程包，新建/打开。
- `desktop/src/components/courses/course-composer.tsx`：分步向导
  1. 元信息（标题/目标人群/时长/来源 PDF）
  2. 大纲 -> 场景序列（slide / interactive / pbl）
  3. 角色编排（复用 role-editor）
  4. 预览 + 导出 manifest 对象
- 打通 OpenMAIC 课程生成 API 最小 happy path（若 baseline 已确认接口；否则先本地构造）。
- 课程包本地存取（store 或 appData 文件，见 course-io 之前可暂用 store）。

**不做：**

- 题库编辑（属 quiz-builder）。
- 打包分发（属 course-import-export）。
- PBL 全量（spec 非目标）。

## 可改动的路径

- `desktop/src/components/courses/course-list.tsx`、`course-composer.tsx`
- `desktop/src/App.tsx`（courses 分支）
- `desktop/src/lib/course-store.ts`（本地存取）

**禁止改动：**

- manifest schema（改 edu-course-manifest）。
- Rust 运行时命令。

## 验收标准

- [ ] 可从零创建一个含 ≥2 场景的课程并保存到本地。
- [ ] 重新打开应用后课程仍在列表中。
- [ ] 导出的 manifest 对象能过 `validateCoursePackage()`。
- [ ] 接 OpenMAIC 生成 API 时有明确 happy path 或 documented fallback。

## 依赖

- 阻塞：edu-course-manifest、edu-roles-config
- 流水线上游：edu-baseline-openmaic（生成 API 实况）

## 关联 Agent

| Agent | 子任务 | 状态 |
|---|---|---|

## 过程日志

[`tasks/issues/edu-course-composer-v1.md`](../tasks/issues/edu-course-composer-v1.md)
