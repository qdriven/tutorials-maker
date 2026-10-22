# Issue: edu-bundled-runtime-verify

**Status:** in_progress  
**Mode:** vertical  
**Feature:** runtime-mgmt  
**Assignee:** -  
**Branch:** `feature/edu-bundled-runtime-verify-<agent>`  
**Contract:** [spec/contracts/openmaic-embed.md](../spec/contracts/openmaic-embed.md)

## 背景

`build-openmaic-runtime.ps1` 与 Rust bundled 启动代码已就绪，但 `resources/openmaic-runtime/` 从未实际生成；dev 下走回退。MVP 验收 #4 要求安装后免配置即可进课堂。

## 范围

**做：**

- 在开发机实跑 `build-openmaic-runtime.ps1`，修子包构建（`rm -rf` 兼容等）问题。
- 确认 `resources/openmaic-runtime/` 生成且含 `server.js` + `.next/static` + `public` + 启动器。
- `bun run tauri build` 出安装包；安装后启动自动起 3230 并内嵌。
- 记录构建耗时、体积、失败点。

**不做：**

- CI 自动化（后置）。
- 跨平台打包（先 Windows）。

## 可改动的路径

- `build-openmaic-runtime.ps1`
- `desktop/src-tauri/src/lib.rs`（runtime 启动/健康检查，按需）
- `desktop/src-tauri/tauri.conf.json`（resources 配置，按需）
- `notes/baselines/openmaic.md`（构建记录）

**禁止改动：**

- 外部 OpenMAIC 仓源码（用绝对路径配置，不 vendoring）。

## 验收标准

- [ ] `resources/openmaic-runtime/server.js` 存在。
- [ ] 全新机器装包 -> 开应用 -> 自动进课堂，无需手填 URL。
- [ ] 健康检查 60s 内通过。
- [ ] 笔记含构建命令、耗时、体积、已知失败点。

## 依赖

- 阻塞：无
- 流水线上游：edu-baseline-openmaic（确认 runtime 本身可跑）

## 关联 Agent

| Agent | 子任务 | 状态 |
|---|---|---|

## 过程日志

[`tasks/issues/edu-bundled-runtime-verify.md`](../tasks/issues/edu-bundled-runtime-verify.md)
