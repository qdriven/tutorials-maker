# Overview: AI Edu Tutorials

**Slug:** `ai-edu-tutorials`  
**Repo:** `D:\innate-works\projects\ai-edu-tutorials`  
**Stage:** building  
**Updated:** 2026-07-10  
**From idea:** `ideas/exploring/ai-edu-interactive-tutorials`

## 一句话

Tauri Desktop 壳 + OpenMAIC 互动课堂 + DeepTutor 知识引擎，做可对话、多角色的交互式教程应用。

## 当前阶段

| 项 | 状态 |
|---|---|
| 版本 | 0.1.0（壳 + 内嵌课堂 + bundled runtime 代码就绪） |
| 里程碑 | Phase 0 对齐/基线 → Phase 1 课程内容闭环 → Phase 2 运行时交付 |
| 下一步 | 见 [index.md](./index.md) |

## 已落地（代码为准）

- 桌面壳：侧栏 4 模块（Runtime / Courses / Baselines / Settings），可折叠。
- 课堂内嵌：子 `Webview` + bounds 同步（`classroom-embed.tsx`），外链走系统浏览器。
- 运行时管理：`start_openmaic_dev` / `start_openmaic_bundled` / `ensure_openmaic_runtime_ready`（3230 健康检查）。
- 持久化：`tauri-plugin-store`（URL + 仓库路径）。
- 脚本：`start.sh`、`build-openmaic-runtime.ps1`（一键启动统一走 `start.sh` / `Taskfile.yml`）。
- 调试：`debug-panel.tsx` + `trackedInvoke` 可观测 invoke/event/log。

## 待落地（按 Phase）

- **Phase 0**：文档漂移修复（进行中）；OpenMAIC / DeepTutor 基线实跑。
- **Phase 1**：课程包格式、角色配置、课程向导、测评向导、PDF->Stage SOP、样例课。
- **Phase 2**：bundled runtime 全链路验证、可观测性、DeepTutor hook、导入导出。

## 关键约束

- Desktop 壳 = **Tauri 2 + Rust**（已定）
- UI = **shadcn/ui `base-nova` + `@base-ui/react`**（已脚手架）
- 课堂运行时 = **OpenMAIC**（外部仓，组合不合并）
- 知识 = **DeepTutor**（外部仓，CLI/API 挂钩）
- 包管理：`desktop/` 用 **bun**（与 create-tauri-ui 一致）

## 禁止事项

- 不 fork Electron `OpenMAIC-Project` 当主壳
- 不把 OpenMAIC / DeepTutor 整仓拷进本仓
- 不引入第二套 UI 体系（保持 shadcn + base-ui）
- 不创建 `.agents/` 平行文档树

## 技术栈（摘要）

| 层 | 技术 |
|---|---|
| Shell | Tauri 2 + Rust |
| Frontend | Vite 8 + React 19 + TypeScript |
| UI | shadcn (`base-nova`) + `@base-ui/react` + Tailwind 4 |
| Plugins | opener, log, shell, dialog, store |
| Classroom | OpenMAIC (Next, localhost:3230 bundled / :3000 dev) |
| Knowledge | DeepTutor CLI |

## 参考仓

| 路径 | 用途 |
|---|---|
| `desktop-apps/tauri-ui` | create-tauri-ui 脚手架 |
| `innate-executable/playground/apps/desktop` | Tauri + 教程型 Desktop UX |
| `ai-edu/excaliapp` | 另一套 Tauri 2 工程参考 |
| `ai-edu/OpenMAIC` | 课堂 |
| `ai-edu/DeepTutor` | KB / mastery |

## 里程碑

| 日期 | 事件 |
|---|---|
| 2026-07-09 | 初始化仓 + Tauri/shadcn/base-ui 脚手架 + docs/project |
| 2026-07-09 | 内嵌课堂（子 Webview）+ bundled runtime Rust 代码 + 打包脚本 |
| 2026-07-10 | 文档对齐：ADR/index/overview 改写；Phase 0-2 issue 拆分 |
