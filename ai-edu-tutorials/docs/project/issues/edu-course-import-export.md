# Issue: edu-course-import-export

**Status:** done  
**Mode:** horizontal  
**Feature:** course-io  
**Assignee:** -  
**Branch:** `feature/edu-course-import-export-<agent>`  
**Contract:** [spec/contracts/course-manifest.md](../spec/contracts/course-manifest.md)

## 背景

课程包需可本地导入/导出用于复用与分享（下一 Sprint 目标）。依赖 manifest 格式稳定。

## 范围

**做：**

- Rust `export_course(package, path)` / `import_course(path)` 命令：写/读 JSON 文件（`tauri-plugin-dialog` 选路径）。
- Courses 模块 UI：导出当前课程、导入外部包并校验。
- 导入时跑 `validateCoursePackage()`，失败给明确错误。

**不做：**

- 远程分享/市场（后置）。
- 打包 PDF 等资源进包（后置，先纯 manifest）。

## 可改动的路径

- `desktop/src-tauri/src/lib.rs`、`capabilities/default.json`（dialog/fs 权限）
- `desktop/src/lib/course-store.ts`、`desktop/src/lib/course-manifest.ts`（校验复用）
- `desktop/src/components/courses/`（导入导出按钮）

**禁止改动：**

- manifest schema。

## 验收标准

- [ ] 导出自建课程 -> 删本地 -> 导入 -> 列表恢复且可播放。
- [ ] 导入非法 JSON 时 UI 报具体校验错误。
- [ ] 文件扩展名约定（`.edu-course.json`）一致。

## 依赖

- 阻塞：edu-course-manifest
- 流水线上游：edu-course-composer-v1（有课程可导出）

## 关联 Agent

| Agent | 子任务 | 状态 |
|---|---|---|

## 过程日志

[`tasks/issues/edu-course-import-export.md`](../tasks/issues/edu-course-import-export.md)
