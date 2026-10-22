# Issue: edu-runtime-observability

**Status:** done  
**Mode:** vertical  
**Feature:** runtime-observability  
**Assignee:** -  
**Branch:** `feature/edu-runtime-observability-<agent>`  
**Contract:** [spec/contracts/openmaic-embed.md](../spec/contracts/openmaic-embed.md)

## 背景

bundled runtime 不可用时，当前仅一行 status 文本，用户无操作指引（closeout 风险 #3）。需明确错误提示、日志落盘、恢复路径。

## 范围

**做：**

- Runtime 模块错误态 UI：区分「bundled 未构建」「端口未就绪」「dev runtime 未起」并给可操作建议（跑哪个脚本/点哪个按钮）。
- 失败经 `tauri-plugin-log` 落盘（已有 log plugin，补 Rust 侧 `log::error!` 与前端 `attachConsole` 之外的落盘确认）。
- 恢复路径：一键重试 `ensure_openmaic_runtime_ready`、一键起 dev runtime。

**不做：**

- 自动重启 sidecar（后置）。
- 远程 telemetry。

## 可改动的路径

- `desktop/src/App.tsx`（runtime 分支错误态）
- `desktop/src/components/`（可拆 runtime-status 组件）
- `desktop/src-tauri/src/lib.rs`（补 `log::` 调用）

**禁止改动：**

- manifest；课程模块。

## 验收标准

- [ ] bundled 未构建时 UI 明确提示「跑 build-openmaic-runtime.ps1」。
- [ ] 端口未就绪时提示「Start local dev runtime」并可点。
- [ ] 关键失败有 `log::error!` 且能在日志目录查到。
- [ ] 重试按钮可恢复到就绪态（当环境可用时）。

## 依赖

- 阻塞：edu-bundled-runtime-verify（错误态需对照真实失败）
- 流水线上游：无

## 关联 Agent

| Agent | 子任务 | 状态 |
|---|---|---|

## 过程日志

[`tasks/issues/edu-runtime-observability.md`](../tasks/issues/edu-runtime-observability.md)
