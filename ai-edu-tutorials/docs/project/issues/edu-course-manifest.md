# Issue: edu-course-manifest

**Status:** done  
**Mode:** pipeline  
**Feature:** course-manifest  
**Assignee:** -  
**Branch:** `feature/edu-course-manifest-<agent>`  
**Contract:** [spec/contracts/course-manifest.md](../spec/contracts/course-manifest.md)

## 背景

课程内容闭环的根基：composer / quiz-builder / import-export / runtime 播放都依赖统一的课程包格式。需先定 contract 并产出 schema + sample，下游才能并行。

## 范围

**做：**

- 定 `CoursePackage` 数据模型：元信息、角色、场景序列（幻灯片/交互/PBL）、每场景题目与评分、掌握度检查点。
- 产出 `docs/project/spec/contracts/course-manifest.md`（双方契约 + JSON 示例 + 变更记录）。
- 产出 `desktop/src/lib/course-manifest.ts`：TS 类型 + `validateCoursePackage()` 校验器（无 zod 依赖）。
- 产出 `desktop/src/lib/sample-course.ts`：一个合法样例包。

**不做：**

- UI（属 composer/quiz issue）。
- OpenMAIC 课程生成 API 对接（属 composer）。
- 导入/导出文件 IO（属 course-import-export）。

## 可改动的路径

- `docs/project/spec/contracts/course-manifest.md`
- `desktop/src/lib/course-manifest.ts`、`desktop/src/lib/sample-course.ts`

**禁止改动：**

- spec 非目标；其它 issue 的 UI/Rust 代码。

## 验收标准

- [ ] `validateCoursePackage(sample)` 通过。
- [ ] 故意破坏字段时校验器返回明确错误路径。
- [ ] contract 文档含 composer/quiz/io 三方如何消费各字段。
- [ ] manifest 版本字段 `schemaVersion` 存在，便于后续迁移。

## 依赖

- 阻塞：无
- 流水线上游：无（本 issue 是 Phase 1 上游）

## 关联 Agent

| Agent | 子任务 | 状态 |
|---|---|---|

## 过程日志

[`tasks/issues/edu-course-manifest.md`](../tasks/issues/edu-course-manifest.md)
