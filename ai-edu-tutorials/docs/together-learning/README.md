# Together Learning: OpenMAIC + DeepTutor 集成架构

**日期:** 2026-07-13
**范围:** 基于代码级分析，给出把 OpenMAIC（课堂呈现）与 DeepTutor（学习引擎）组合为 **Innate Edu** 桌面教育应用的推荐架构与模块拆解。
**输入:** `docs/research/innate-edu/`（策略级研究）+ 两个项目源码（`D:\copy-modify\ai-edu\OpenMAIC`、`D:\copy-modify\ai-edu\DeepTutor`）。

> 本目录是**代码级、面向实施**的架构推荐，补充 `docs/research/innate-edu/` 的策略级分析。事实以源码为准。

---

## 文档索引

| 文件 | 内容 |
|---|---|
| [README.md](./README.md) | 本文件：一页摘要 + 关键决策 |
| [architecture.md](./architecture.md) | 目标架构：分层、生成/运行时数据流、传输方式、部署与资源画像、端口图 |
| [modules.md](./modules.md) | 模块拆解：每个模块的职责、接口、源码映射、新增 vs 既有 |
| [contracts.md](./contracts.md) | 集成契约：CoursePackage v2、Rust 编排命令、DeepTutor HTTP/WS 面、OpenMAIC provider/tool 接口、learning-bridge 事件 schema |
| [roadmap.md](./roadmap.md) | 分阶段实施计划（映射到具体文件/issue）+ 风险 + 资源门控现实 |

---

## 一句话定位

> **OpenMAIC = 课堂呈现层（怎么教）；DeepTutor = 学习引擎层（怎么学）；Tauri = 桌面编排层（在哪用、怎么连）。** 三者通过 CoursePackage 数据契约 + Rust 编排中枢组合，DeepTutor 以 HTTP/WS sidecar 按需接入。

---

## 关键决策（3 条，决定了整个架构）

### 决策 1：传输方式 = DeepTutor HTTP/WS sidecar（弃用 CLI 子进程与 MCP）

| 方案 | 结论 | 依据（代码级）|
|---|---|---|
| **HTTP/WS sidecar** ✅ | 采用 | DeepTutor FastAPI 后端（`:8001`）暴露 ~27 个 router，**其自带前端就走这条路**；流式、成熟、支持 KB CRUD + mastery + agent turn |
| CLI 子进程（当前 `run_deeptutor_chat`）| 降级为 spike/hook | 每次调用 2-3s 启动开销、无流式；**mastery 进度无 CLI 命令**（仅 HTTP `/api/v1/learning/*` 或 REPL）|
| MCP | 不采用 | DeepTutor 是 MCP **client-only**（全仓 0 处 `FastMCP`/`@mcp.tool`）；OpenMAIC 的 `@modelcontextprotocol/sdk` 声明但未用。双向都要新写 server，不值得 |

**形态：** `deeptutor serve`（FastAPI on `:8001`），**忽略其前端 `:3782`**（OpenMAIC 是前端），轻量 profile（仅 LlamaIndex + API embedding，不加载 partners/multi-user），按需启动 + 5 分钟空闲停止。

### 决策 2：掌握度真相源 = DeepTutor（服务端 SQLite），非 OpenMAIC（客户端 IndexedDB）

- DeepTutor `learning/` 是**确定性教学引擎**：`compute_mastery`（时间加权准确率）、per-type 门控、`SpacedRepetitionScheduler`、7-stage 学习环、`LearningService.grade_and_record` 单一真相源。服务端 SQLite，可跨设备/跨课程。
- OpenMAIC 的 quiz/mastery 数据在**浏览器 IndexedDB**（`MAIC-Database`，13 表），`lib/quiz/persistence.ts` 浏览器专用；PBL v2 proficiency（`lib/pbl/v2/operations/proficiency.ts`，EWMA + 滞回）是**场景内**自适应，纯代码、快。
- **同步方向：** OpenMAIC 课堂 quiz 结果 → DeepTutor `grade_and_record`（写真相）；DeepTutor mastery/记忆 → OpenMAIC 作为 `ProficiencySignal` 注入 PBL 引擎 + agent 上下文。

### 决策 3：数据契约 = CoursePackage v2（关联 `deeptutor_kb_id`）

`CoursePackage`（`desktop/src/lib/course-manifest.ts`）是连接两个系统的**唯一数据契约**。v2 扩展：
- `meta.deeptutor_kb_id` — 关联的 DeepTutor KB
- `meta.sourcePdf` — 已有，双通道 PDF 处理的关联键
- `learning_config` — spaced_repetition / mastery_threshold / feynman_retry
- `scene.deeptutor_concepts[]` — 知识点引用，用于 mastery 映射

OpenMAIC 消费 `scenes[]`；DeepTutor 消费 `deeptutor_kb_id` + `learning_config` + `quizzes` + `mastery`。

---

## 推荐架构（一页图）

```
┌─────────────────────────────────────────────────────────────────┐
│  Tauri 2 Shell (desktop/)  · Rust 编排中枢                       │
│  ┌──────────────┬──────────────┬──────────────┬───────────────┐  │
│  │ runtime-     │ course-bus   │ learning-    │ deeptutor-     │  │
│  │ supervisor   │ (导入导出+   │ bridge       │ proxy          │  │
│  │ (双 runtime  │  KB 关联)    │ (quiz→mastery│                │  │
│  │  生命周期)   │              │  事件桥)     │                │  │
│  └──────┬───────┴──────┬───────┴──────┬───────┴───────────────┘  │
│         │ 子 Webview    │             │ HTTP/WS                  │
└─────────┼───────────────┼─────────────┼──────────────────────────┘
          │              │             │
┌─────────▼─────────┐   │  ┌──────────▼──────────────────────────┐
│ OpenMAIC Runtime  │   │  │ DeepTutor Sidecar（按需，:8001）     │
│ :3230 常驻         │   │  │ ─ KB CRUD   /api/v1/knowledge/*     │
│ ─ 课堂生成/播放    │   │  │ ─ 检索(新增) /api/v1/knowledge/{kb}/ │
│ ─ 多角色对话       │   │  │              search                 │
│ ─ 白板/TTS/PBL    │   │  │ ─ Mastery   /api/v1/learning/*       │
│ ─ 导出            │   │  │ ─ Agent turn /api/v1/ws (WS)         │
│ + deeptutor       │   │  │ ─ Quiz judge /api/v1/question/judge  │
│   provider(新)    │   │  │ 轻量 profile：LlamaIndex + API emb   │
│ + query_kb tool(新)│  │  │ 不启前端 :3782                       │
└───────────────────┘   │  └─────────────────────────────────────┘
          │              │             │
          └──────────────▼─────────────┘
            ┌──────────────────────────┐
            │ CoursePackage v2 (JSON)  │
            │ meta / roles / scenes /  │
            │ quizzes / mastery /      │
            │ deeptutor_kb_id /        │
            │ learning_config          │
            └──────────────────────────┘
```

---

## 与现状的对齐

当前 `ai-edu-tutorials` 已实现（见 [docs/project/index.md](../../docs/project/index.md)）：
- ✅ Tauri 壳 + OpenMAIC bundled runtime 嵌入（`:3230` boot 已验证 HTTP 200，2026-07-13）
- 🔧 DeepTutor CLI hook（`run_deeptutor_chat`）— 代码就绪，**本方案建议升级为 HTTP/WS sidecar**
- ⏳ CoursePackage v1（`schemaVersion: 1`）— **本方案定义 v2 扩展**

本方案不推翻现状，而是：把 CLI hook 升级为 sidecar、扩展课程包 schema、在 Rust 壳补 learning-bridge、在 OpenMAIC 补 provider+tool。详见 [roadmap.md](./roadmap.md)。

---

## 核心约束（继承自研究文档）

- **不合并源码**（AGENTS.md）：两个仓保持独立，通过 HTTP/WS + JSON 契约互通。Tauri 壳是胶水层。
- **资源是硬约束**：个人 8GB 笔记本不能同时常驻全量。OpenMAIC 常驻（~280MB），DeepTutor 按需 sidecar（轻量 ~150MB），5 分钟空闲停止。详见 [architecture.md](./architecture.md) §部署与资源。
- **不改 OpenMAIC/DeepTutor 主干**：新增只走既有扩展点（OpenMAIC provider registry、DeepTutor router）。
