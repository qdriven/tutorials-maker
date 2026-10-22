# 集成契约

> 续 [modules.md](./modules.md)。给可落地的接口契约：CoursePackage v2 schema、Rust 编排命令、DeepTutor HTTP/WS 面、OpenMAIC provider/tool 接口、learning-bridge 事件 schema。

## 1. CoursePackage v2（数据契约）

扩展 `desktop/src/lib/course-manifest.ts`。v2 向后兼容 v1（`schemaVersion` 判别）。

### 1.1 新增/扩展类型

```typescript
// meta 扩展
export type CourseMeta = {
  id: string
  title: string
  description: string
  audience: string
  durationMinutes: number
  sourcePdf?: string          // 既有（v1 已有）
  version: string
  deeptutorKbId?: string      // 新增：关联 DeepTutor KB name
}

// 学习配置（新增，DeepTutor 侧消费）
export type LearningConfig = {
  spacedRepetition: boolean   // 默认 true
  masteryThreshold: number    // 默认 0.8（DeepTutor per-type gate 已有 0.9 for MEMORY/PROCEDURE）
  feynmanRetry: boolean       // 默认 true
}

// scene 扩展（新增知识点引用，用于 mastery 映射）
export type Scene = {
  // ...既有字段
  deeptutorConcepts?: string[]  // 知识点 id，映射到 DeepTutor KnowledgePoint
}

// 顶层
export type CoursePackage = {
  schemaVersion: 1 | 2         // 判别
  meta: CourseMeta
  roles: Role[]
  scenes: Scene[]
  quizzes: Quiz[]
  mastery: MasteryCheckpoint[]
  learningConfig?: LearningConfig  // 新增（v2）
}
```

### 1.2 校验器扩展（`validateCoursePackage`）

- `schemaVersion: 2` 时要求 `meta.deeptutorKbId` 非空（若 `learningConfig` 启用）。
- `scene.deeptutorConcepts[]` 若存在，需在课程级知识点表内（可加 `CoursePackage.concepts?: KnowledgePoint[]` 顶层表，可选）。
- `learningConfig.masteryThreshold ∈ [0,1]`。
- v1 包继续通过校验（`schemaVersion: 1`，新字段全可选）。

### 1.3 双方消费

| 字段 | OpenMAIC 消费 | DeepTutor 消费 |
|---|---|---|
| `scenes[]` | 播放、生成 | - |
| `quizzes[]` | 渲染、本地判选择题 | `LearningService.grade_and_record`（经 M3 桥）|
| `mastery[]` | - | mastery gate 检查点 |
| `meta.deeptutorKbId` | - | KB 检索绑定 |
| `meta.sourcePdf` | 生成期溯源 | KB 重建 |
| `learningConfig` | - | spaced repetition / threshold / feynman |
| `scene.deeptutorConcepts` | - | quiz 结果 -> 知识点 mastery 映射 |

---

## 2. Rust 编排命令（Tauri `lib.rs`）

### 2.1 既有（保留）

| 命令 | 签名 | 说明 |
|---|---|---|
| `start_openmaic_bundled` | `(app) -> Result<String,String>` | 起 OpenMAIC `:3230` |
| `ensure_openmaic_runtime_ready` | `(app) -> Result<String,String>` | 探活 + 自起，返回 URL |
| `export_course` | `(payload, path) -> Result<()>` | 写 JSON |
| `import_course` | `(path) -> Result<String>` | 读 JSON |
| `run_deeptutor_chat` | `(repo, kb, question) -> Result<DeepTutorReply,String>` | CLI hook（**降级为 spike**，产品路径走 M3/M4）|

### 2.2 新增

```rust
// M1: DeepTutor sidecar 生命周期
#[tauri::command]
fn ensure_deeptutor_ready(app: AppHandle) -> Result<String, String>
// 探活 :8001（wait_for_port）-> 不通则 spawn `deeptutor serve --port 8001`
//   env: DEEPTUTOR_PROFILE=light, AUTH_ENABLED=false
// -> 60s 超时 -> 返回 "http://127.0.0.1:8001"

#[tauri::command]
fn stop_deeptutor() -> Result<(), String>
// 释放 sidecar；5min idle 计时器自动调

#[tauri::command]
fn deeptutor_status() -> Result<SidecarStatus, String>
// { running: bool, url: Option<String>, pid: Option<u32> }

// M2: course-bus KB 关联
#[tauri::command]
fn create_kb_from_pdf(pdf_path: String, kb_name: String) -> Result<String, String>
// -> DeepTutor POST /api/v1/knowledge/create (multipart) + /{kb}/upload
// -> 返回 kb_name；异步，进度经 event

#[tauri::command]
fn link_course_kb(course_id: String, kb_name: String) -> Result<(), String>
// 读 CoursePackage -> 写 meta.deeptutorKbId -> 存 store

// M3: learning-bridge
#[tauri::command]
fn record_quiz_attempt(course_id: String, quiz_id: String,
                       results: Vec<QuestionResult>) -> Result<MasteryUpdate, String>
// -> DeepTutor LearningService.grade_and_record（经 HTTP）
// -> 返回 { mastery: float, gate_passed: bool, next_review: Option<DateTime> }

#[tauri::command]
fn get_mastery_state(course_id: String) -> Result<MasteryState, String>
// -> DeepTutor GET /api/v1/learning/progress/{book_id} + /map

#[tauri::command]
fn get_learner_memory(scope: String) -> Result<MemorySnapshot, String>
// -> DeepTutor GET /api/v1/memory (L3 profile/recent/scope)

// M4: deeptutor-proxy（若选 Rust 侧代理；否则由 OpenMAIC server route 承担）
#[tauri::command]
fn deeptutor_search(kb: String, query: String) -> Result<SearchResult, String>
// -> DeepTutor POST /api/v1/knowledge/{kb}/search
```

### 2.3 事件（Tauri event）

| 事件名 | 方向 | payload |
|---|---|---|
| `deeptutor://kb-progress` | Rust -> UI | `{ kb_name, stage, percent }` |
| `deeptutor://sidecar-state` | Rust -> UI | `{ running, url }` |
| `deeptutor://mastery-update` | Rust -> UI | `{ course_id, mastery, gate_passed }` |

---

## 3. DeepTutor HTTP/WS 面（sidecar `:8001`）

### 3.1 既有端点（直接用）

| 方法 | 路径 | 用途 | 调用方 |
|---|---|---|---|
| POST | `/api/v1/knowledge/create` | 创建 KB（multipart）| M2 |
| POST | `/api/v1/knowledge/{kb}/upload` | 上传文档 | M2 |
| GET | `/api/v1/knowledge/list` | KB 列表 | M2/UI |
| DELETE | `/api/v1/knowledge/{kb}` | 删 KB | M2 |
| WS | `/api/v1/knowledge/{kb}/progress/ws` | 索引进度 | M2/UI |
| GET | `/api/v1/learning/progress/{book_id}` | mastery 进度 | M3 |
| GET | `/api/v1/learning/progress/{book_id}/map` | mastery 地图（gate-decided next）| M3/UI |
| POST | `/api/v1/learning/progress/{book_id}/init-modules` | 初始化学习模块 | M3 |
| WS | `/api/v1/ws` | 统一 agent turn（KB 扎根对话/mastery_path）| M7/UI |
| WS | `/api/v1/question/judge` | 简答判分（多模态）| M8（可选替代 /api/quiz-grade）|
| GET | `/api/v1/memory` | L1/L2/L3 记忆 | M3/M7 |

> 路由前缀 `/api/v1`，auth-gated（`AUTH_ENABLED=false` 时本地免鉴权，`auth.py:42`）。

### 3.2 新增薄路由（M10）

```python
# deeptutor/api/routers/knowledge.py 追加
@router.post("/{kb_name}/search")
async def search_kb(kb_name: str, body: SearchRequest, ...):
    """纯检索（无 agent turn），包 RAGService.search()。"""
    svc = RAGService(kb_base_dir=...)
    result = await svc.search(query=body.query, kb_name=kb_name, top_k=body.top_k or 5)
    return result  # {query, answer, content, sources, provider}
```

- 依据：`RAGService.search()`（`services/rag/service.py:84`）已返回可序列化 dict。
- 用途：OpenMAIC 生成期检索（M6）+ agent tool（M7）不想每次起 agent turn。
- `SearchRequest = { query: str, top_k?: int, mode?: "hybrid"|"vector"|"bm25" }`。

### 3.3 不用的端点
- `/api/v1/partners/*`、`/api/v1/multi-user/*`、`/api/v1/co_writer/*`、`/api/v1/book/*`（Living Book 经 web 前端 `/book` 路由嵌入，不走 API）- 轻量 profile 不加载。

---

## 4. OpenMAIC provider/tool 接口（L2 扩展点）

### 4.1 M6 deeptutor-provider（web-search-style）

```typescript
// lib/web-search/index.ts 扩展
export type WebSearchProviderId = "baidu" | "bocha" | "brave" | ... | "deeptutor"

async function searchWithDeepTutor(query: string, opts: { kb: string }): Promise<ResearchContext> {
  const res = await fetch("/api/deeptutor/knowledge/" + opts.kb + "/search", {
    method: "POST", body: JSON.stringify({ query, top_k: 5 }),
  })
  const { content, sources } = await res.json()
  return { query, snippets: [{ content, source: sources }] }
}
```

- 接入：`app/generation-preview/page.tsx:397-442` web-search 步骤（providerId 选 `deeptutor` 时用 KB 而非 web）。
- 代理：`/api/deeptutor/*` 由 OpenMAIC server route（M4 选项 b）透传到 `:8001`。

### 4.2 M7 query_knowledge_base agent tool

```typescript
// lib/agent/tools/query-knowledge-base.ts（新）
export function makeQueryKnowledgeBaseTool(kb: string): AgentTool<never, never> {
  return {
    name: "query_knowledge_base",
    description: "Query the DeepTutor knowledge base for the current course.",
    schema: { query: z.string() },  // 注：OpenMAIC 主干无 zod，按其 tool schema 约定
    execute: async ({ query }) => {
      const r = await fetch("/api/deeptutor/knowledge/" + kb + "/search", ...)
      return { content: (await r.json()).content }
    },
  }
}
// registry.ts V0_ALLOWLIST 追加 "query_knowledge_base"
```

- editor agent（pi-agent-core）：`lib/agent/tools/registry.ts:28` `buildToolset()` 注入。
- chat agent（LangGraph）：`lib/orchestration/tool-schemas.ts` + `prompt-builder.ts` 注入（stateless，预取注入）。

### 4.3 M8 classroom-event-emitter

```typescript
// lib/learning/event-emitter.ts（新）
export async function emitQuizAttempt(courseId: string, quizId: string, results: QuestionResult[]) {
  if (isTauri()) {
    await (window as any).__TAURI__?.core?.invoke("record_quiz_attempt",
      { courseId, quizId, results })
  } else {
    await fetch("/api/deeptutor/learning/record", { method: "POST", body: ... })  // 经代理
  }
}
// hook: lib/quiz/grading.ts 判分后 + lib/playback/engine.ts 场景切换/结束
```

### 4.4 M9 living-book-embed

```typescript
// InteractiveContent 场景配置（既有 lib/types/stage.ts:60-68）
{
  kind: "interactive",
  interactive: {
    prompt: "深入了解该知识点",
    interactionType: "sandbox",
    // iframe 指向 DeepTutor book 页（需 DeepTutor web 放行 frame-ancestors 127.0.0.1）
    html: undefined,  // 或运行时注入 url
  }
}
// DeepTutor web next.config 需加 ALLOWED_FRAME_ANCESTORS=http://127.0.0.1:3230
```

---

## 5. learning-bridge 事件 schema

### 5.1 `record_quiz_attempt` 请求

```typescript
type QuestionResult = {
  questionId: string          // CoursePackage.quizzes[].questions[].id
  kind: "choice" | "open" | "task"
  correct: boolean            // 选择题本地判；简答 AI 判
  score: number               // 0..1
  deeptutorConcepts?: string[]// 该题关联的知识点（映射 mastery）
  response: string            // 学生作答
  explanation?: string
}

type RecordQuizAttemptReq = {
  course_id: string           // CoursePackage.meta.id（映射 DeepTutor book_id）
  quiz_id: string
  results: QuestionResult[]
}
```

### 5.2 `record_quiz_attempt` 响应（DeepTutor 回算）

```typescript
type MasteryUpdate = {
  course_id: string
  mastery: number             // 0..1（recency-weighted accuracy）
  gate_passed: boolean        // per-type gate（MEMORY/PROCEDURE >=0.9, CONCEPT/DESIGN pass flag）
  next_review?: string        // ISO datetime（spaced repetition）
  weak_concepts: string[]     // 掌握度低的知识点，供推荐 Living Book
}
```

### 5.3 映射约定

| CoursePackage | DeepTutor |
|---|---|
| `meta.id` | `book_id`（mastery progress key）|
| `scene.deeptutorConcepts[]` | `KnowledgePoint` id（`learning/models.py:80`）|
| `quizzes[].id` | `LearningModule`（`learning/models.py:89`）/ `QuizAttempt`（`:107`）|
| `learningConfig.masteryThreshold` | gate 阈值覆盖（默认 0.8；DeepTutor per-type 0.9 优先）|
| `learningConfig.spacedRepetition` | `SpacedRepetitionScheduler` 启停（`learning/scheduler.py:28`）|

### 5.4 `get_mastery_state` 响应

```typescript
type MasteryState = {
  course_id: string
  overall: number
  per_concept: { concept: string, mastery: number, gate_passed: boolean }[]
  next_step?: { type: "review" | "quiz" | "feynman", target: string }
  review_queue: { concept: string, due: string }[]
}
```

---

## 6. 版本与兼容

- CoursePackage `schemaVersion: 2` 对 v1 向后兼容（新字段全可选）。
- DeepTutor sidecar 版本锁定（`deeptutor[cli,server]==1.5.0`），契约测试覆盖 `/api/v1/knowledge/{kb}/search` + `/api/v1/learning/*`。
- OpenMAIC provider/tool 走 registry 扩展点，OpenMAIC 升级时仅需保持 `WebSearchProviderId` + `AgentTool` 接口稳定。
- Rust 命令新增不破坏既有（`invoke_handler` 追加）。
