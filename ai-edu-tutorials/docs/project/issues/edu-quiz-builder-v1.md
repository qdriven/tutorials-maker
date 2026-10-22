# Issue: edu-quiz-builder-v1

**Status:** done  
**Mode:** vertical  
**Feature:** quiz-builder  
**Assignee:** -  
**Branch:** `feature/edu-quiz-builder-v1-<agent>`  
**Contract:** [spec/contracts/course-manifest.md](../spec/contracts/course-manifest.md)

## 背景

MVP 验收 #2 的「测验」与下一 Sprint「评分闭环」。每场景需可配题，并接 OpenMAIC 评分接口形成反馈。

## 范围

**做：**

- manifest 内 `Quiz` / `Question` 类型：choice / open / task，含正确答案、评分规则、通过阈值。
- `desktop/src/components/courses/quiz-builder.tsx`：按场景配题、设规则与阈值。
- 评分闭环：答题 -> 调 OpenMAIC 评分 API（或本地规则）-> 反馈 + 落盘结果。
- 掌握度检查点（mastery checkpoint）挂到场景或课程末。

**不做：**

- 全量 PBL 任务评分（spec 非目标）。
- 题库跨课程共享（后置）。

## 可改动的路径

- `desktop/src/lib/course-manifest.ts`（Quiz/Question 部分）
- `desktop/src/components/courses/quiz-builder.tsx`
- `desktop/src/lib/scoring.ts`（评分逻辑封装）

**禁止改动：**

- composer 的场景结构（改 edu-course-composer-v1）。

## 验收标准

- [ ] 可为某场景添加 choice + open 各 1 题。
- [ ] 模拟答题后能给出是否通过阈值的结果。
- [ ] 评分结果写入课程进度（store）。
- [ ] 接 OpenMAIC 评分 API 时有 happy path 或 documented fallback。

## 依赖

- 阻塞：edu-course-manifest
- 流水线上游：edu-baseline-openmaic（评分接口实况）

## 关联 Agent

| Agent | 子任务 | 状态 |
|---|---|---|

## 过程日志

[`tasks/issues/edu-quiz-builder-v1.md`](../tasks/issues/edu-quiz-builder-v1.md)
