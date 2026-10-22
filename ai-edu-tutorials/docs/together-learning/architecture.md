# 架构: Innate Edu 目标形态

> 续 [README.md](./README.md) 的三条决策。本文给分层、数据流、传输、部署与端口。

## 1. 分层

| 层 | 实现 | 进程 | 端口 | 生命周期 |
|---|---|---|---|---|
| **L1 桌面编排层** | Tauri 2 + Rust（`desktop/src-tauri`）| Rust + WebView | - | 常驻 |
| **L2 课堂呈现层** | OpenMAIC Next.js standalone（`D:\copy-modify\ai-edu\OpenMAIC`）| Node.js | `3230` | 常驻 |
| **L3 学习引擎层** | DeepTutor FastAPI（`D:\copy-modify\ai-edu\DeepTutor`）| Python (uvicorn) | `8001` | **按需** |
| **L4 数据契约层** | CoursePackage v2（JSON 文件）| - | - | 文件 |
| **L5 前端 UI 层** | Tauri React 壳 + OpenMAIC 内嵌（子 Webview）| WebView | `1420`（dev）| 常驻 |

> DeepTutor 自带 Next.js 前端（`:3782`）**不启用**——OpenMAIC 是唯一前端。`deeptutor serve` 仅起 FastAPI `:8001`。

## 2. 端口与地址图

```
Tauri 壳 (Rust)
  ├─ Vite dev              :1420  (仅 dev)
  ├─ OpenMAIC 子 Webview    http://127.0.0.1:3230   (bundled, 常驻)
  └─ DeepTutor sidecar     http://127.0.0.1:8001   (按需, FastAPI)
       └─ /api/v1/*        (REST + WS)

外部 LLM/embedding provider: 云 API（OpenAI/Anthropic/...），不占本地端口
```

- OpenMAIC `:3230` = 壳 `ensure_openmaic_runtime_ready` 健康检查目标（已实现）。
- DeepTutor `:8001` = `deeptutor serve` 默认后端端口（`deeptutor/api/run_server.py:30`，`get_backend_port()` 默认 8001）。
- 壳通过 `tauri-plugin-opener` + `external-navigation` 拦截：仅 `localhost/127.0.0.1/tauri.localhost` 留在 App 内。

## 3. 数据流 A：课堂生成（PDF -> 课堂 + KB，双通道）

```
用户在 Tauri 壳 Courses 模块上传 PDF
  │
  ├─[通道 1: 课堂]──────────────────────────────────────────
  │  Tauri: course-bus 把 PDF 路径传给 OpenMAIC
  │  OpenMAIC: /api/extract-document (lib/document/extract.ts)
  │    -> DocumentArtifact (text + images)
  │  -> /api/generate/scene-outlines-stream (SSE)
  │  -> /api/generate/scene-content + scene-actions
  │  -> Stage (DSL) 持久化（IndexedDB + 服务端 JSON）
  │  -> CoursePackage v2（含 meta.sourcePdf）
  │
  ├─[通道 2: 知识]──────────────────────────────────────────
  │  Tauri: course-bus 调 DeepTutor sidecar
  │  DeepTutor: POST /api/v1/knowledge/create (multipart)
  │           POST /api/v1/knowledge/{kb}/upload
  │           -> LlamaIndex 索引（BM25 + 向量，FAISS/SimpleVectorStore）
  │           -> 返回 kb_name
  │  Tauri: 把 kb_name 写回 CoursePackage.meta.deeptutor_kb_id
  │
  └─[生成期检索（可选）]────────────────────────────────────
     OpenMAIC 生成 outline 时，lib/knowledge/deeptutor-provider.ts
       调 DeepTutor POST /api/v1/knowledge/{kb}/search (新增薄路由)
       -> 检索片段作为 researchContext 注入 outline 生成
```

**关键：** PDF 双通道**异步并行**，进度分别反馈。`meta.sourcePdf` 是两通道的关联键；`meta.deeptutor_kb_id` 把 KB 绑回课程包。

## 4. 数据流 B：课堂运行时（播放 + 掌握度回写）

```
Tauri 壳 -> 子 Webview 加载 OpenMAIC /classroom/[id]（:3230）
  │
  OpenMAIC 播放引擎（lib/playback/engine.ts）逐场景播放
  │
  ├─[Quiz 场景完成]────────────────────────────────────────
  │  OpenMAIC: lib/quiz/grading.ts 本地判选择题；/api/quiz-grade 判简答
  │  -> 课堂事件 emitter（新）通过 __TAURI__.invoke('record_quiz_attempt', {...})
  │  Tauri learning-bridge: POST DeepTutor /api/v1/learning/.../record
  │     （映射到 LearningService.grade_and_record：判分 -> 记 attempt ->
  │       重算 mastery -> 推进 spaced repetition -> 重建 review queue）
  │
  ├─[场景切换 / 课堂结束]──────────────────────────────────
  │  emitter -> learning-bridge -> DeepTutor L1 trace（学习事件）
  │  课堂结束 -> check_mastery_gate -> 未达标 -> 推荐 Living Book 补充
  │
  ├─[学生提问（多角色对话）]──────────────────────────────
  │  OpenMAIC LangGraph director（lib/orchestration/director-graph.ts）
  │  Teacher agent 回答前可选 consult DeepTutor：
  │    - lib/agent/tools/query_knowledge_base.ts（新，editor agent）
  │      或 prompt-builder 注入 DeepTutor 检索片段（chat path）
  │    - GET DeepTutor /api/v1/memory (L3 profile/recent/scope) 注入上下文
  │  回答后 -> DeepTutor L1 trace 追加交互事件
  │
  └─[Living Book 深入]────────────────────────────────────
     OpenMAIC InteractiveContent 场景（iframe）嵌入 DeepTutor Living Book
     （DeepTutor web 路由 /book，ALLOWED_FRAME_ANCESTORS 放行 127.0.0.1）
     widget_* action 经 postMessage 交互
```

**关键：** OpenMAIC 的 quiz/mastery 数据默认在浏览器 IndexedDB；本方案把**判分与掌握度计算下沉到 DeepTutor 服务端**（SQLite），OpenMAIC IndexedDB 仅留 UI 级缓存。DeepTutor 成为跨课程学习者模型真相源。

## 5. 传输方式（HTTP/WS，弃 CLI/MCP 的依据）

| 用途 | DeepTutor 端点 | 协议 | 调用方 |
|---|---|---|---|
| KB 创建/上传/列表/删除 | `/api/v1/knowledge/*` | REST multipart | Tauri course-bus |
| KB 检索（纯检索，无 agent）| `/api/v1/knowledge/{kb}/search` **（新增薄路由）** | REST | OpenMAIC deeptutor-provider |
| Agent turn（KB 扎根对话/mastery_path/deep_question）| `/api/v1/ws` | WS（流式 StreamEvent）| OpenMAIC chat 或 Tauri 直接 |
| Mastery 进度/地图 | `/api/v1/learning/*` | REST | Tauri learning-bridge + 壳 UI |
| Quiz 判分（简答，多模态）| `/api/v1/question/judge` | WS | OpenMAIC /api/quiz-grade 可改走此 |
| 记忆 L1/L2/L3 | `/api/v1/memory` | REST | OpenMAIC agent 上下文注入 |

**为什么新增 `/api/v1/knowledge/{kb}/search` 薄路由：** DeepTutor 现状**无 REST 检索端点**——KB 查询经 agent turn WS（`/api/v1/ws`）驱动，纯检索只能 in-process `RAGService.search()`（`services/rag/service.py:84`）。该 service 已返回可序列化 dict，包一层 router 即可，**低工作量**。OpenMAIC 生成期检索不该每次起一个 agent turn（重），所以加这条 REST。

**为什么不走 MCP：** DeepTutor 全仓 0 处 MCP server（`FastMCP`/`@mcp.tool` 均无），是 MCP **client**（`deeptutor/services/mcp/manager.py` 连外部 server）。OpenMAIC 的 `@modelcontextprotocol/sdk` 声明但未 import。双向都要新写 server，ROI 低。

**为什么升级掉 CLI hook：** 现有 `run_deeptutor_chat`（Rust `lib.rs`）每次 `deeptutor run chat` 子进程启动 2-3s、无流式、**访问不到 mastery**（mastery 仅 HTTP/REPL）。保留作 spike，产品路径用 sidecar。

## 6. 部署与资源画像

继承 `docs/research/innate-edu/resource-analysis.md` 的轻量化结论，落到代码级 profile：

| 组件 | 进程 | RAM（典型/峰值）| 启动 | 磁盘 |
|---|---|---|---|---|
| Tauri 壳 | Rust + WebView | 80 / 120MB | 即时 | ~80MB |
| OpenMAIC runtime | Node.js standalone | 200 / 400MB | ~1s | ~230MB（bundled）|
| DeepTutor sidecar（轻量）| Python uvicorn | 150 / 300MB | 2-3s | ~500MB（含 LlamaIndex/FAISS）|
| **常驻小计** | Tauri + OpenMAIC | **280 / 520MB** | ~1s | ~310MB |
| **DeepTutor 按需叠加** | + Python | +150 / +300MB | +2-3s | +500MB |

**DeepTutor 轻量 profile（`deeptutor[cli,server]`，不带 partners/matrix/math-animator/graphrag/lightrag）：**
- 仅 LlamaIndex 引擎（`DEFAULT_PROVIDER="llamaindex"`，`services/rag/factory.py:27`）
- embedding 走 API（`openai_compat` adapter），不加载本地 sentence-transformers（省 ~500MB）
- 不启前端 `:3782`（`deeptutor serve` 仅 backend）
- `AUTH_ENABLED=false`（本地单用户，`auth.py:42` 默认）
- 不加载 partners/multi_user

**生命周期（Tauri runtime-supervisor）：**
```
App 启动 -> 起 OpenMAIC（常驻）+ DeepTutor STOPPED
用户点「问 DeepTutor」/「学习报告」/ 课堂 quiz 完成 ->
  ensure_deeptutor_ready() -> 启 :8001（2-3s）-> 健康检查 -> 执行
  5 分钟无活动 -> stop_deeptutor()（释放 ~150MB）
```

> DeepTutor 首次 KB 索引仍需联网（embedding API）+ 磁盘 I/O；进度经 `/api/v1/knowledge/{kb}/progress` WS 反馈。

## 7. 与现状的差异（最小改动原则）

| 现状 | 目标 | 改动量 |
|---|---|---|
| OpenMAIC bundled runtime boot（已修）| 不变 | 0 |
| `run_deeptutor_chat` CLI hook | 升级为 `ensure_deeptutor_ready` + HTTP proxy | 中（Rust）|
| CoursePackage v1 | v2（+`deeptutor_kb_id`/`learning_config`/`scene.deeptutor_concepts`）| 小（TS schema + 校验器）|
| OpenMAIC 无 KB 集成 | 新增 `lib/knowledge/deeptutor-provider.ts` + agent tool | 中（走既有 registry 扩展点）|
| DeepTutor 无 REST 检索 | 新增 `/api/v1/knowledge/{kb}/search` 薄路由 | 小（包 `RAGService.search()`）|
| 壳 4 模块侧栏 | Baselines -> Learning（mastery 看板 + review queue）| 小（React）|

详见 [modules.md](./modules.md)（模块）与 [roadmap.md](./roadmap.md)（实施）。
