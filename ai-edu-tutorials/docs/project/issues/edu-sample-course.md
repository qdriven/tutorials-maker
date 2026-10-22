# Issue: edu-sample-course

**Status:** in_progress  
**Mode:** pipeline  
**Feature:** -  
**Assignee:** -  
**Branch:** `feature/edu-sample-course-<agent>`  
**Contract:** [spec/contracts/course-manifest.md](../spec/contracts/course-manifest.md)

## 背景

MVP 验收 #1/#2：1 节 STEM 短课（PDF ≤30 页），含幻灯片 + 测验 + ≥1 交互场景。这是 manifest/composer/quiz/roles/sop 的集成验收。

## 范围

**做：**

- 选 1 个 STEM 短课 PDF（≤30 页，可公开/本地）。
- 按 SOP 生成场景序列；配 ≥1 choice + ≥1 open 题；≥1 交互场景；1 teacher + 1 peer。
- 产出可导入的样例 course 包（JSON），放入 `desktop/src/lib/sample-course.ts` 或 `samples/`。
- 在壳内打开样例课可播放（依赖 bundled/dev runtime 可用）。

**不做：**

- 多门课程（1 门即可）。
- 完整 TTS。

## 可改动的路径

- `samples/`（新建）或 `desktop/src/lib/sample-course.ts`
- `notes/baselines/`（记录样例课来源）

**禁止改动：**

- manifest schema；composer/quiz 实现（如需调整走各自 issue）。

## 验收标准

- [ ] 样例包过 `validateCoursePackage()`。
- [ ] 含 slide + quiz + interactive 三类场景。
- [ ] 壳内可打开并播放到结尾。
- [ ] 笔记记录 PDF 来源与 provider。

## 依赖

- 阻塞：edu-course-manifest、edu-roles-config、edu-course-composer-v1、edu-quiz-builder-v1、edu-agent-sop-pdf2stage
- 流水线上游：edu-baseline-openmaic（runtime 可播放）

## 关联 Agent

| Agent | 子任务 | 状态 |
|---|---|---|

## 过程日志

[`tasks/issues/edu-sample-course.md`](../tasks/issues/edu-sample-course.md)
