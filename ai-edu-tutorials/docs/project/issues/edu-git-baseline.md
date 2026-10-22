# Issue: edu-git-baseline

**Status:** done  
**Mode:** -  
**Feature:** -  
**Assignee:** -  
**Branch:** `main` (initial), then `feature/<id>-<agent>`  
**Contract:** -

## 背景

仓内 0 commit，全部文件 untracked，AGENTS.md 约定的分支/PR 流无法运转。需先建立 git 基线。

## 范围

**做：**

- 确认 `.gitignore` 覆盖 `node_modules/`、`dist/`、`desktop/src-tauri/target/`、`desktop/src-tauri/resources/openmaic-runtime/`、`.mimocode/`（若为本地缓存）。
- 首次提交全部源码与文档。
- 在 README/AGENTS 明确分支命名约定已生效。

**不做：**

- 配置 remote / push（用户要求再做）。
- 引入 CI。

## 可改动的路径

- `.gitignore`
- 根目录、`desktop/`、`docs/`、`notes/`

**禁止改动：**

- `desktop/src-tauri/target/`、`desktop/node_modules/`（应被忽略）。

## 验收标准

- [ ] `git log` 至少 1 条提交。
- [ ] `git status` 无 `node_modules` / `target` 噪声。
- [ ] `.gitignore` 含 `resources/openmaic-runtime/`。

## 依赖

- 阻塞：无
- 流水线上游：无

## 关联 Agent

| Agent | 子任务 | 状态 |
|---|---|---|

## 过程日志

[`tasks/issues/edu-git-baseline.md`](../tasks/issues/edu-git-baseline.md)
