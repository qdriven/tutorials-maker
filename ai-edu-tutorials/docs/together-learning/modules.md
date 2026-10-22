# 模块拆解: Innate Edu

> 续 [architecture.md](./architecture.md)。每个模块给：职责、接口、源码映射（既有/新增）、归属层。原则：**不改 OpenMAIC/DeepTutor 主干**，新增只走既有扩展点。

## 模块总览

| ID | 模块 | 层 | 状态 | 归属 |
|---|---|---|---|---|
| M1 | runtime-supervisor | L1 | 既有 + 扩展 | Tauri `desktop/src-tauri/src/lib.rs` |
| M2 | course-bus | L1 | 既有 + 扩展 | Tauri `lib.rs` + `desktop/src/lib/course-io.ts` |
| M3 | learning-bridge | L1 | **新增** | Tauri `lib.rs` |
| M4 | deeptutor-proxy | L1 | **新增** | Tauri `lib.rs`（或 OpenMAIC server route）|
| M5 | course-manifest v2 | L4 | 既有 + 扩展 | `desktop/src/lib/course-manifest.ts` |
| M6 | deeptutor-provider | L2 | **新增** | OpenMAIC `lib/knowledge/deeptutor-provider.ts` |
| M7 | query_knowledge_base tool | L2 | **新增** | OpenMAIC `lib/agent/tools/` |
| M8 | classroom-event-emitter | L2 | **新增** | OpenMAIC `lib/quiz/` + `lib/playback/` hooks |
| M9 | living-book-embed | L2 | **新增** | OpenMAIC `InteractiveContent` 场景配置 |
| M10 | DeepTutor sidecar | L3 | 既有 + 1 薄路由 | DeepTutor `deeptutor serve` + `api/routers/knowledge.py` |
| M11 | Learning dashboard UI | L5 | 既有 + 改造 | `desktop/src/components/`（Baselines -> Learning）|

---

## L1 桌面编排层（Tauri/Rust）

### M1 runtime-supervisor（既有 + 扩展）
- **职责：** 启停 + 健康检查 OpenMAIC（`:3230` 常驻）与 DeepTutor（`:8001` 按需，5min idle stop）。
- **既有：** `start_openmaic_bundled` / `ensure_openmaic_runtime_ready` / `wait_for_port`（`lib.rs`）。
- **新增：**
  - `start_deeptutor_sidecar()` - spawn `deeptutor serve --port 8001`（或 `python -m uvicorn deeptutor.api.main:app --port 8001`），env 设轻量 profile。
  - `ensure_deeptutor_ready()` - 探活 `:8001`（复用 `wait_for_port`），不通则起 sidecar，60s 超时。
  - `stop_deeptutor()` + 空闲计时器（Tauri sidecar 管理 / `tauri-plugin-shell` Sidecar API）。
- **接口：** Tauri commands（见 [contracts.md](./contracts.md) §Rust 命令）。

### M2 course-bus（既有 + 扩展）
- **职责：** 课程包导入导出 + PDF 双通道分发 + KB 关联回写。
- **既有：** `export_course` / `import_course`（`lib.rs`）；前端 `course-io.ts` / `course-store.ts`。
- **新增：**
  - `create_kb_from_pdf(pdf_path, kb_name)` - 调 DeepTutor `POST /api/v1/knowledge/create` + `/{kb}/upload`，返回 `kb_name`。
  - `link_course_kb(course_id, kb_name)` - 把 `kb_name` 写入 `CoursePackage.meta.deeptutor_kb_id` 并存 store。
- **数据流：** 上传 PDF -> 并行触发 OpenMAIC 课堂生成（M6/既有）+ DeepTutor KB 创建 -> 汇合写 CoursePackage v2。

### M3 learning-bridge（新增）
- **职责：** 把 OpenMAIC 课堂事件桥接到 DeepTutor mastery（真相源）。
- **触发：** OpenMAIC 经 `__TAURI__.invoke`（嵌入态）或 fetch（独立态）发事件。
- **事件处理：**
  - `record_quiz_attempt(course_id, quiz_id, question_results)` -> DeepTutor `LearningService.grade_and_record`（经 `/api/v1/learning` 或新增 record 路由）。
  - `record_scene_view(course_id, scene_id)` -> DeepTutor L1 trace。
  - `get_mastery_state(course_id)` -> DeepTutor `/api/v1/learning/progress/{book_id}` + `/map`。
  - `get_learner_memory(scope)` -> DeepTutor `/api/v1/memory`（L3）。
- **映射：** `CoursePackage.quizzes[].id` -> DeepTutor `LearningModule`/`KnowledgePoint`（经 `scene.deeptutor_concepts[]` 映射知识点）。
- **接口：** Tauri commands（[contracts.md](./contracts.md) §Rust 命令）。

### M4 deeptutor-proxy（新增，可选）
- **职责：** OpenMAIC 子 Webview 跨域调 DeepTutor `:8001` 的代理（WebView2 同源限制）。
- **实现选择：**
  - (a) Rust 起 `localhost:1420/api/deeptutor/*` 反向代理 -> `:8001`（Tauri 侧 axum/reqwest）。
  - (b) OpenMAIC Next.js server route `/api/deeptutor/*` 代理（OpenMAIC server 直连 `:8001`，无跨域）。
  - **推荐 (b)**：OpenMAIC 本就是 Next.js server，加一个 catch-all route 即可，且 OpenMAIC 已有 SSRF guard（`lib/server/ssrf-guard.ts`）。
- **接口：** `POST /api/deeptutor/knowledge/{kb}/search` 等（透传）。

---

## L2 课堂呈现层（OpenMAIC）

> 走 OpenMAIC 既有 provider registry 扩展范式（document/web-search/LLM/TTS/ASR/storage 同构）。

### M6 deeptutor-provider（新增）
- **职责：** 把 DeepTutor KB 检索注册为 OpenMAIC 的"web-search-style" provider，用于生成期注入 researchContext。
- **扩展点：** `lib/web-search/index.ts:12-40`（`WebSearchProviderId` + `searchWithX()`）。**零改动 orchestration/agent 层**。
- **实现：** 新增 `searchWithDeepTutor(query, kb)` -> `POST /api/deeptutor/knowledge/{kb}/search`（经 M4 代理）-> 返回 `researchContext` 片段。
- **接入：** `app/generation-preview/page.tsx:397-442` 的 web-search 步骤可选切到 deeptutor provider。

### M7 query_knowledge_base tool（新增）
- **职责：** 运行时让 agent（editor + chat）实时检索 KB。
- **扩展点（editor）：** `lib/agent/tools/registry.ts:28` `buildToolset()` + `V0_ALLOWLIST`（`registry.ts:38-43`）。加 `makeQueryKnowledgeBaseTool()` + 放宽 allowlist。
- **扩展点（chat）：** `lib/orchestration/tool-schemas.ts` + `prompt-builder.ts` - LangGraph path 需把检索结果注入 `buildStructuredPrompt`（stateless chat 每请求带全状态，可前缀预取注入）。
- **注意：** OpenMAIC 有**两套 agent 系统**（LangGraph chat + pi-agent-core editor），tool 要分别接线。

### M8 classroom-event-emitter（新增）
- **职责：** 在 quiz 完成 / 场景切换 / 课堂结束时发事件给 learning-bridge。
- **hook 点：**
  - `lib/quiz/grading.ts`（选择题本地判分后）+ `/api/quiz-grade`（简答判分后）。
  - `lib/playback/engine.ts`（场景切换、课堂结束）。
- **传输：** 嵌入态用 `__TAURI__.invoke('record_quiz_attempt', ...)`；独立态 fetch Tauri 或直连 DeepTutor（经 M4）。
- **去重/幂等：** 事件带 `course_id + quiz_id + attempt_id`，DeepTutor 侧 SHA-256 去重（`add_documents.py` 已有同款模式）。

### M9 living-book-embed（新增）
- **职责：** 把 DeepTutor Living Book 作为 OpenMAIC `InteractiveContent` 场景嵌入。
- **扩展点：** `lib/types/stage.ts:60-68` `InteractiveContent`（iframe URL）。OpenMAIC 已支持 iframe 嵌入（`next.config.ts` `ALLOWED_FRAME_ANCESTORS`）+ `widget_*` action（postMessage）。
- **实现：** 配一个 `InteractiveContent` 指向 DeepTutor book URL（需 DeepTutor web 放行 `127.0.0.1` frame-ancestors）。
- **限制：** 无共享状态/mastery，仅 postMessage 交互（适合"深入了解"补充场景）。

---

## L3 学习引擎层（DeepTutor）

### M10 DeepTutor sidecar（既有 + 1 薄路由）
- **运行形态：** `deeptutor serve --port 8001`（FastAPI uvicorn），**不启前端**。轻量 extras：`deeptutor[cli,server]`。
- **既有可用端点：**
  - `/api/v1/knowledge/*` - KB CRUD + 进度 WS（`api/routers/knowledge.py`）
  - `/api/v1/learning/*` - mastery 进度/地图/init/import（`api/routers/mastery_path.py`）
  - `/api/v1/ws` - 统一 agent turn（KB 扎根对话、mastery_path、deep_question）
  - `/api/v1/question/judge` - WS 简答判分（多模态）
  - `/api/v1/memory` - L1/L2/L3 记忆
- **新增薄路由：** `POST /api/v1/knowledge/{kb}/search` - 包 `RAGService.search()`（`services/rag/service.py:84`，已返回 dict），供 OpenMAIC 生成期纯检索（不起 agent turn）。
- **不改：** mastery 引擎（`learning/`）、RAG 引擎、记忆系统保持主干。

---

## L4 数据契约层

### M5 course-manifest v2（既有 + 扩展）
- **既有：** `desktop/src/lib/course-manifest.ts`（`CoursePackage` v1，手写校验器）。
- **扩展（schemaVersion 2）：** 见 [contracts.md](./contracts.md) §CoursePackage v2。
  - `meta.deeptutor_kb_id?: string`
  - `meta.sourcePdf?: string`（已有）
  - `learning_config?: { spaced_repetition, mastery_threshold, feynman_retry }`
  - `scene.deeptutor_concepts?: string[]`（知识点引用，映射 mastery）
- **校验器：** 扩展 `validateCoursePackage()`，v1/v2 向后兼容（`schemaVersion` 判别）。

---

## L5 前端 UI 层（Tauri React）

### M11 Learning dashboard UI（既有 + 改造）
- **现状：** 侧栏 4 模块（Runtime / Courses / Baselines / Settings），`App.tsx`。
- **改造：** Baselines 模块 -> **Learning** 模块：
  - mastery 看板（调 M3 `get_mastery_state`）- per-知识点掌握度 + next step（DeepTutor `/learning/.../map` 的 gate-decided next）。
  - review queue（spaced repetition 到期）。
  - Living Book 启动器（M9）。
  - DeepTutor sidecar 状态指示（running/idle/stopped）+ 手动启停。
- **Courses 模块：** PDF 上传触发双通道（M2），显示课堂生成 + KB 索引双进度。

---

## 模块依赖图

```
M11 UI ──> M3 learning-bridge ──> M10 DeepTutor sidecar
  │           │
  │           └──> M5 course-manifest v2
  │
  ├─> M2 course-bus ──> M10 (KB 创建)
  │      │
  │      └──> M5
  │
  └─> M1 runtime-supervisor ──> M10 (生命周期)

OpenMAIC (L2):
  M6 deeptutor-provider ──> M4 deeptutor-proxy ──> M10 (search)
  M7 query_kb tool ───────> M4 ──────────────────> M10 (search)
  M8 event-emitter ───────> M3 (invoke) ─────────> M10 (mastery/memory)
  M9 living-book-embed ──────────────────────────> M10 (web /book)
```

**关键解耦：** M3（learning-bridge）是 OpenMAIC 与 DeepTutor mastery 之间的**唯一写路径**；M6/M7 是**读路径**（检索）。OpenMAIC 主干（生成/播放/编排）不感知 DeepTutor，只通过 provider/tool/emitter 三个扩展点接入。
