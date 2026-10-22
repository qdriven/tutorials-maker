# Technical Overview: AI Edu Tutorials

**Slug:** `ai-edu-tutorials`
**Updated:** 2026-07-13
**Scope:** 技术、架构、模块的横切总结。事实以 `spec/`（架构/规范/契约/SOP）为准，本文只做索引与串联，不另立规范。

> 一句话：**Tauri 2 + Rust 桌面壳**，内嵌 **OpenMAIC** 互动课堂运行时，外挂 **DeepTutor** 知识引擎，做可对话、多角色的交互式教程应用。

---

## 1. 技术栈

| 层 | 选型 | 落点 |
|---|---|---|
| 桌面壳 | **Tauri 2 + Rust**（edition 2021） | `desktop/src-tauri/` |
| 前端框架 | **Vite 8 + React 19 + TypeScript** | `desktop/src/` |
| UI 体系 | **shadcn (`base-nova`) + `@base-ui/react` + Tailwind 4**；图标 `lucide-react` | `desktop/src/components/ui/` |
| 状态/存储 | `tauri-plugin-store`（`LazyStore`，`settings.json` / `courses.json`） | `desktop/src/lib/*-store.ts`、`settings.ts` |
| Tauri 插件 | `opener`、`log`、`shell`、`dialog`、`store` + 自研 `external-navigation` | `desktop/src-tauri/src/lib.rs` |
| 课堂运行时 | **OpenMAIC**（外部仓，Next.js，`next build` standalone 产物打包进 resources） | `desktop/src-tauri/resources/openmaic-runtime/` |
| 知识引擎 | **DeepTutor**（外部仓，CLI） | Rust `run_deeptutor_chat` 壳调用 |
| 包管理 | `desktop/` 用 **bun**（与 create-tauri-ui 一致）；Rust 用 cargo | `desktop/package.json`、`Cargo.toml` |
| 路径别名 | `@/` → `desktop/src/` | `tsconfig` / Vite |
| 任务编排 | [go-task](https://taskfile.dev) `Taskfile.yml` + `start.sh` | 仓库根 |

**刻意不引入：** zod（课程包校验手写，保持零依赖、可读）、第二套 UI 体系、Electron `OpenMAIC-Project`、OpenMAIC/DeepTutor 源码 vendoring。

---

## 2. 系统架构

### 2.1 目标形态

```text
┌──────────────────────────────────────────────────────┐
│  Tauri 2 Shell (desktop/)                            │
│  React + shadcn/base-ui · 课程库 UI · 4 模块侧栏     │
│  store / dialog / shell / log / opener 插件          │
│  + 自研 external-navigation（外链走系统浏览器）      │
└───────────┬──────────────────────────┬───────────────┘
            │ child Webview (localhost)│ sidecar / cmd spawn
┌───────────▼──────────────┐  ┌────────▼─────────────┐
│ OpenMAIC（外部，未 fork） │  │ DeepTutor（外部 CLI）│
│ 课堂：bundled :3230       │  │ KB / mastery 问答    │
│        / dev :3000(:3230) │  │                      │
└──────────────────────────┘  └──────────────────────┘
```

### 2.2 端口地图

| 端口 | 用途 |
|---|---|
| `1420` | Vite dev server（`tauri dev` 的 `devUrl`，壳自身前端） |
| `3230` | OpenMAIC **bundled runtime** 健康检查目标；`settings.openmaicUrl` 默认值；代码中唯一硬编码端口 |
| `3000` | OpenMAIC 仓原生 `pnpm dev` 默认端口（dev 回退路径，可改指 :3230） |

### 2.3 课堂嵌入策略（ADR：embed + bundle）

详见 [`spec/contracts/openmaic-embed.md`](./spec/contracts/openmaic-embed.md)。要点：

- **默认路径**：壳内以子 `Webview`（label `openmaic-classroom`）嵌入 `http://127.0.0.1:3230`；壳自行启动并健康检查 bundled runtime，用户不离 App。
- **bounds 同步**：`classroom-embed.tsx` 用 `ResizeObserver` + 窗口 `onResized` 把子 webview 的 position/size 钉在容器 div 上。
- **外链拦截**：`external-navigation` 插件只放行 `tauri`/`localhost`/`127.0.0.1`/`::1`/`tauri.localhost`；`http(s)/mailto/tel` 转交 `tauri-plugin-opener` 开系统浏览器。
- **回退（已降级到 "Advanced"）**：① dev runtime（用户在 OpenMAIC 仓跑 `pnpm dev`，壳嵌保存的 URL）；② 纯外链打开（2026-07-09 初稿，仅作最后逃生口）。
- **外部运行时策略**：OpenMAIC / DeepTutor **不 vendoring、不 fork**，仅用绝对路径/环境变量配置；OpenMAIC 只把 `next build` standalone 输出拷进 Tauri resources。

---

## 3. 代码结构与模块

### 3.1 目录总览

```text
ai-edu-tutorials/
  desktop/                         # 主产品：Tauri + Vite
    src/                           # 前端（React）
      App.tsx                      # 壳：侧栏 4 模块 + runtime 启动编排
      components/
        classroom-embed.tsx        # 子 Webview 嵌入 + bounds 同步
        courses/                   # 课程模块 UI（见 3.3）
        deeptutor-panel.tsx        # DeepTutor 问答面板
        debug-panel.tsx            # invoke/event/log 可观测面板
        external-link-guard.tsx    # 外链护栏
        theme-provider.tsx
        ui/                        # shadcn/base-ui 基元
      lib/                         # 前端业务逻辑（见 3.4）
    src-tauri/
      src/lib.rs                   # Rust 命令 + 插件装配（见 3.2）
      src/main.rs                  # 入口（调 lib::run）
      capabilities/                # webview 权限声明
      resources/openmaic-runtime/  # 打包进 bundle 的 OpenMAIC standalone（.gitignore）
      binaries/                    # sidecar exe（openmaic-server，.gitignore）
      tauri.conf.json              # 打包/窗口/资源/externalBin 配置
      Cargo.toml
  docs/project/                    # ★ 事实来源（spec/issues/tasks）
  notes/baselines/                 # OpenMAIC / DeepTutor 基线实跑笔记
  build-openmaic-runtime.ps1       # 构建 bundled runtime
  start.sh / Taskfile.yml                # 一键启动与任务
  AGENTS.md / README.md
```

### 3.2 Rust 层（`desktop/src-tauri/src/lib.rs`）

所有命令集中在单文件（后续可拆模块，见 conventions）。注册于 `tauri::generate_handler!`：

| 命令 | 职责 |
|---|---|
| `greet` | 脚手架遗留示例 |
| `start_openmaic_dev(repo_path)` | 在 OpenMAIC 仓目录 `pnpm dev`（Win: `cmd /C`，其它: `sh -lc`） |
| `start_openmaic_bundled(app)` | 启动 bundled runtime：优先 sidecar exe（`PORT=3230`），否则 `resources/openmaic-runtime/start-openmaic-runtime.cmd`（Win）/ `node server.js`（其它） |
| `ensure_openmaic_runtime_ready(app)` | 3230 端口探活（1s）→ 不通则拉起 bundled → 再等 60s；返回 `http://127.0.0.1:3230` |
| `export_course(payload, path)` | `serde_json` pretty 写盘 |
| `import_course(path)` | 读文件返回原始 JSON 字符串（校验留给前端） |
| `run_deeptutor_chat(repo, kb, question)` | 壳调 `deeptutor run chat <q> --kb <kb>`，返回 `{answer, raw}` |

辅助：`wait_for_port`（TCP 探活）、`resource_runtime_root`（resource_dir → dev fallback `CARGO_MANIFEST_DIR/resources`）、`find_sidecar_path`（按 Tauri sidecar 命名约定查找 exe）、`external_navigation_plugin`（导航拦截）。

插件装配：`store` + `dialog` + `shell` + `log`（Stdout/LogDir/Webview 三目标）+ `opener` + `external-navigation`；`on_page_load` 在 main webview 加载完成后 `show()`（配合 `visible:false` 启动闪屏抑制）。

### 3.3 前端模块（侧栏 4 模块）

`App.tsx` 持久侧栏（可折叠）切换四个视图：

| 模块 | 视图 | 说明 |
|---|---|---|
| **Runtime** | `App.tsx` 内联 | 启动时 `ensureBundledOpenMaicReady()` 自举；嵌入 `ClassroomEmbed`；失败时出红色 banner + 重试/启动 dev runtime；"Advanced" 手填 URL/仓路径 |
| **Courses** | `components/courses/courses-view.tsx` | 课程库 list + composer 向导 + import/export 按钮；编排 `course-store` / `course-io` / `course-composer` / `quiz-builder` / `role-editor` / `scenes-editor` |
| **Baselines** | `App.tsx` 内联 + `deeptutor-panel.tsx` | 指向 `notes/baselines/`；内嵌 DeepTutor 问答面板 |
| **Settings** | `App.tsx` 内联 | 说明设置在 Runtime 编辑、Save 持久化 |

### 3.4 前端 lib 模块

| 文件 | 职责 |
|---|---|
| `course-manifest.ts` | 课程包类型 + **手写校验器** `validateCoursePackage()`（不短路，聚合全部错误）+ `createEmptyCourse` / `newId` |
| `course-store.ts` | `courses.json` 内课程 CRUD（`listCourses/saveCourse/deleteCourse`） |
| `course-io.ts` | import/export：dialog 选文件 → Rust 读写 → 前端校验（导入）/ Rust 序列化（导出） |
| `sample-course.ts` | 已过校验的样例课（F=ma），供 Courses 模块预填与 SOP 示例对齐 |
| `settings.ts` | `settings.json` 读写 + `startOpenMaicDev` / `ensureBundledOpenMaicReady` 的 invoke 封装 |
| `deeptutor.ts` | `runDeepTutorChat` invoke 封装 |
| `tauri.ts` / `debug-events.ts` | `trackedInvoke` 可观测封装 + 事件/日志面板数据 |
| `utils.ts` | `cn`（clsx + tailwind-merge）等 |

### 3.5 课程包数据模型（`CoursePackage`，schemaVersion 1）

契约：[`spec/contracts/course-manifest.md`](./spec/contracts/course-manifest.md)。结构概览：

```text
CoursePackage
├─ meta          id/title/description/audience/durationMinutes/sourcePdf?/version
├─ roles[]       Role { id, name, kind: teacher|peer|ta, persona, openingLine? }
│                约束：≥1 teacher + ≥1 peer，id 唯一
├─ scenes[]      Scene { id, title, kind: slide|interactive|pbl, roleIds[], slide?/interactive?/pbl?, quizId? }
│                约束：roleIds 引用已定义角色；kind 与 content 字段一致
├─ quizzes[]     Quiz { id, sceneId?, title, passThresholdPct(0..100), questions[] }
│                Question = choice | open | task（判分点 rubric / gradingNotes + roleIds）
└─ mastery[]     MasteryCheckpoint { id, label, quizIds[], requiredPct(0..100) }
                 约束：quizIds 引用已定义 quiz
```

校验器语义：返回 `{ ok, errors[] | value }`，**不短路**，一次性暴露全部字段级错误（导入路径据此给用户逐条反馈）。

---

## 4. 运行时启动流程（Runtime 模块自举）

```text
App mount
  └─ loadSettings()                         # settings.json → openmaicUrl/repo
  └─ ensureBundledOpenMaicReady()           # invoke → Rust
       ├─ wait_for_port(3230, 1s)  ──ok──▶ 返回 http://127.0.0.1:3230
       └─ 不通 ▶ start_openmaic_bundled()
            ├─ sidecar exe? (openmaic-server)  ▶ spawn (PORT=3230)
            └─ 否则 resources/openmaic-runtime/start-openmaic-runtime.cmd
            └─ wait_for_port(3230, 60s) ──ok──▶ 返回 URL
                                └─ 超时 ▶ log::error! + 抛错 → 前端红色 banner
  └─ setClassroomUrl(url) → ClassroomEmbed 子 Webview 嵌入
```

失败恢复：banner 内 "Retry bundled runtime" 重跑自举；"Start local dev runtime" 走 `start_openmaic_dev`（dev 路径）。

---

## 5. 构建与开发工具

| 入口 | 作用 |
|---|---|
| `start.sh`（Git Bash） | 一键起 OpenMAIC dev + Tauri 壳，两种终端模式（`MODE=inline`） |
| `Taskfile.yml` | `task dev:all` / `task check`（typecheck + cargo check）/ `task --list` |
| `build-openmaic-runtime.ps1` | 从 OpenMAIC 仓 `next build` → 拷 standalone 到 `resources/openmaic-runtime/`（可选 `$UsePkg` 产 sidecar exe） |
| `tauri.conf.json` | `resources: ["resources/openmaic-runtime"]`、`externalBin: ["binaries/openmaic-server"]`、`beforeDevCommand: bun run dev`、`devUrl: :1420`、`withGlobalTauri: true`、窗口 `visible:false`（加载后 show） |
| `capabilities/` | webview create/show/hide/position/size/close 权限 |

开发速查（PowerShell）：`cd desktop && bun install && bun run tauri dev`；纯前端：`bun run dev`。

---

## 6. 文档体系（事实来源）

`docs/project/` 是唯一事实树（AGENTS.md 入口），其它路径不作数：

```text
docs/project/
  index.md            # Agent 入口 + Issue 看板 + 依赖主线
  overview.md         # 项目状态/阶段/约束摘要
  spec/
    README.md         # 目标 + MVP 验收 + 非目标
    architecture.md   # 目标形态 + 嵌入策略 + 代码落点
    conventions.md    # 包/工具/别名/git/外部运行时约定
    contracts/        # course-manifest / openmaic-embed 契约
    sop/pdf-to-stage.md   # PDF→可校验 Stage 的 pipeline
  issues/<id>.md      # 各 issue 的范围/验收
  tasks/issues/<id>.md  # 交付记录（追加式）
```

> `course-sprint/` 已被 `docs/project/` 取代，仅留历史，不作当前事实。

---

## 7. 当前状态与环境门控

详见 [`index.md`](./index.md)。代码层 Phase 0–2 已落地（`bun run typecheck` + `cargo check` 通过）。

**bundled runtime 已可 boot（2026-07-13 验证）**：`build-openmaic-runtime.ps1` 直跑产出的 `resources/openmaic-runtime/` 实测 `node server.js` -> Next.js 16.1.2 Ready 775ms -> `curl http://127.0.0.1:3230/` HTTP 200 `<title>OpenMAIC</title>`。本轮修复了三个 boot 阻塞：① runtime 根缺 `package.json`（ESM 作用域泄漏）；② `Hoist-PnpmSiblings` 路径 bug（传 runtime 根而非 `node_modules`，自 7月10 起从未生效，`styled-jsx` 未 hoist）；③ `tauri.conf.json` 的 `externalBin` 引用永不产出的 sidecar exe 致 `tauri build` 阻塞。详见 [`tasks/issues/edu-bundled-runtime-verify.md`](./tasks/issues/edu-bundled-runtime-verify.md) 2026-07-13 条。

**仍 env-gated / 待决策：**

- 🟡 `deeptutor-hook`（待 baseline-deeptutor 复现）、`sample-course` 端到端播放（runtime 已解锁，待实跑记录）。
- ⏳ `baseline-openmaic` / `baseline-deeptutor` runbook 实跑记录；`tauri build` 出安装包 + 全新机器装机免配置验证。
- ⚠️ **免 Node 方案待定**：`node server.js` 路径要求目标机装 Node；sidecar/nexe 未走通（target 不匹配），备选 `@vercel/ncc` 或内置 `node.exe`。

外部仓本地路径：OpenMAIC `D:\copy-modify\ai-edu\OpenMAIC`、DeepTutor `D:\copy-modify\ai-edu\DeepTutor`。

---

## 8. 工作区说明（非本产品的目录）

仓库根下存在若干**未跟踪**目录：`ai-math-tutor/`、`DeepScaleR_Powered_Apps/`、`Math_Mentor_AI/`、`neuclid/`、`pocket-tts/`、`SmartSum-AI-backend/`。它们是各自独立的参考/灵感项目（多为 Python），**未被 `desktop/` 或 `docs/` 任何代码引用，不参与构建**，仅作为参考资料暂存于工作区。需要时可单独 gitignore 或迁出。

---

## 相关

- [index.md](./index.md) — Agent 入口与 Issue 看板
- [overview.md](./overview.md) — 项目状态摘要
- [spec/architecture.md](./spec/architecture.md) — 架构规范
- [spec/contracts/openmaic-embed.md](./spec/contracts/openmaic-embed.md) — 嵌入策略 ADR
- [spec/contracts/course-manifest.md](./spec/contracts/course-manifest.md) — 课程包契约
- [spec/sop/pdf-to-stage.md](./spec/sop/pdf-to-stage.md) — PDF→Stage SOP
