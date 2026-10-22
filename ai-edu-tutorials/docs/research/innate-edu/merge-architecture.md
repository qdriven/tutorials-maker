# 合并架构：云 RAG + 本地记忆 + 共享 Living Book

**日期:** 2026-07-13
**核心洞察:** RAG 上云、记忆留本地、Living Book 可共享 — 这是一个社区产品的骨架

---

## 1. 用户洞察的拆解

你说的三件事其实是三个不同的架构决策:

| 决策 | 你的判断 | 技术含义 |
|---|---|---|
| RAG 可以云端 | 教程内容是共享的，不需要每人一份索引 | Heavy compute 上云，客户端变薄 |
| 记忆要本地 | 学习偏好/进度是私人的 | Per-user state 留在 Tauri 本地 |
| Living Book 可共享 | 读完的笔记/标注可以分享 | Content = 可序列化的 JSON，天然可分享 |

这三个决策组合起来，指向一个清晰的架构:

```
┌──────────────────────────────────────────────────────────────┐
│  云端（共享）                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │ Cloud RAG    │  │ Living Book  │  │ 课程内容库    │       │
│  │ (多引擎检索)  │  │  Registry    │  │ (Stage/Scene)│       │
│  │              │  │ (共享/订阅)   │  │              │       │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘       │
│         └─────────────────┼─────────────────┘               │
│                           │ API                              │
└───────────────────────────┼──────────────────────────────────┘
                            │
┌───────────────────────────┼──────────────────────────────────┐
│  本地（Tauri Desktop）      │                                  │
│  ┌────────────────────────▼────────────────────────────┐     │
│  │  Tauri Shell                                         │     │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────────────┐  │     │
│  │  │ OpenMAIC │  │ 本地记忆  │  │ Living Book      │  │     │
│  │  │ 课堂播放  │  │ L1/L2/L3 │  │ (本地副本+同步)  │  │     │
│  │  └──────────┘  └──────────┘  └──────────────────┘  │     │
│  └─────────────────────────────────────────────────────┘     │
└──────────────────────────────────────────────────────────────┘
```

---

## 2. 三个层次的具体合并方案

### 2.1 RAG 上云：DeepTutor 后端 → 云服务

**当前:** DeepTutor 本地跑 Python 后端 + embedding + FAISS 索引
**目标:** RAG 检索变成 API 调用，客户端零依赖

```
本地（当前）:
  deeptutor kb search "量子纠缠" --kb physics
  → 本地 Python 进程 → 本地 FAISS 索引 → 返回结果
  → 占 RAM 500MB+

云端（目标）:
  POST https://api.innate-edu.com/v1/rag/search
  { "query": "量子纠缠", "kb_id": "physics", "user_token": "xxx" }
  → 云端 Python 服务 → 云端索引 → 返回结果
  → 客户端 0MB
```

**云端 RAG 服务的技术选型:**

| 组件 | 方案 | 说明 |
|---|---|---|
| Embedding | OpenAI `text-embedding-3-small` | 云端 API，零本地依赖 |
| 向量存储 | Qdrant Cloud / Weaviate Cloud | 托管向量数据库 |
| 检索引擎 | LlamaIndex（默认）| 向量 + BM25 混合 |
| API 框架 | FastAPI（复用 DeepTutor 代码）| 直接迁移 |
| 部署 | Fly.io / Railway / Vercel | 低成本部署 |

**客户端调用（Tauri Rust 壳）:**
```rust
#[tauri::command]
async fn search_knowledge_base(
    kb_id: String,
    query: String,
    api_token: String,
) -> Result<KBSearchResult, String> {
    let client = reqwest::Client::new();
    let resp = client
        .post("https://api.innate-edu.com/v1/rag/search")
        .json(&serde_json::json!({
            "kb_id": kb_id,
            "query": query,
        }))
        .bearer_auth(&api_token)
        .send()
        .await
        .map_err(|e| e.to_string())?;

    resp.json::<KBSearchResult>()
        .await
        .map_err(|e| e.to_string())
}
```

**优势:**
- 客户端零 Python 依赖
- 共享索引（同一份 PDF 的 KB 只建一次）
- 多用户共享知识库
- 无需本地 GPU/CPU 做 embedding

### 2.2 记忆留本地：三层记忆 → Tauri 本地存储

**当前:** DeepTutor 的 L1/L2/L3 记忆在本地 Python 服务中
**目标:** 记忆留在 Tauri 本地，不上传云端

```
L1 Traces（原始事件）:
  → Tauri LocalStorage / SQLite
  → JSONL append-only（与 DeepTutor 格式兼容）
  → 按 surface（chat/quiz/book）分文件

L2 Facts（整理后的事实）:
  → Tauri LocalStorage
  → Markdown 文件（与 DeepTutor 格式兼容）
  → 本地 LLM 整合（可选：用 OpenAI API 做 L1→L2）

L3 Synthesis（跨 surface 综合）:
  → Tauri LocalStorage
  → Profile / Recent / Scope / Preferences
  → 本地 LLM 整合
```

**本地存储结构:**
```
~/.innate-edu/
├── memory/
│   ├── L1/
│   │   ├── chat/2026-07-13.jsonl
│   │   ├── quiz/2026-07-13.jsonl
│   │   └── book/2026-07-13.jsonl
│   ├── L2/
│   │   ├── chat.md
│   │   ├── quiz.md
│   │   └── book.md
│   └── L3/
│       ├── profile.md
│       ├── recent.md
│       ├── scope.md
│       └── preferences.md
├── learning/
│   ├── mastery.json        # 各知识点掌握度
│   ├── attempts.json       # 测验历史
│   └── schedule.json       # 间隔重复调度
└── books/
    ├── physics-101/         # Living Book 本地副本
    │   ├── book.json
    │   └── pages/
    └── math-201/
        ├── book.json
        └── pages/
```

**隐私保证:**
- 记忆数据**永远不离开本地**
- 云端 RAG 只收到查询，不知道是谁在查
- 本地可以用 Ollama 做 L1→L2 整合（完全离线）

### 2.3 Living Book 共享：个人副本 + 云端注册表

**当前:** DeepTutor 的 Living Book 在本地 Python 服务中生成和存储
**目标:** 本地持有副本，云端注册表管理共享/订阅

```
Living Book 生命周期:

1. 生成（本地）:
   用户在课堂中点击「生成 Living Book」
   → 本地调用云端 RAG 检索相关内容
   → 本地调用云端 LLM 生成 Book 结构
   → 保存到本地 ~/.innate-edu/books/

2. 分享（上传到注册表）:
   用户选择「分享此 Book」
   → 上传 book.json 到云端 Registry
   → 其他用户可以搜索/订阅/复用

3. 订阅（下载到本地）:
   用户搜索「量子力学入门 Book」
   → 从云端 Registry 下载 book.json
   → 保存到本地 ~/.innate-edu/books/
   → 可以基于自己的 KB 做个性化调整
```

**云端 Living Book Registry:**
```typescript
// 数据模型
interface BookRegistryEntry {
  id: string;
  title: string;
  description: string;
  author: string;
  source_kbs: string[];      // 关联的 KB ID
  tags: string[];
  blocks: Block[];            // 19 种 Block 类型
  version: number;
  created_at: string;
  downloads: number;
  rating: number;
  // 共享 metadata（不含用户私人标注）
}

// API
GET  /api/v1/books/search?q=量子力学&tags=physics
POST /api/v1/books/publish          // 作者分享
GET  /api/v1/books/:id             // 获取 Book 元数据
POST /api/v1/books/:id/subscribe   // 订阅到本地
```

**本地与云端同步:**
```
本地 Book 副本（~/.innate-edu/books/physics-101/book.json）
  │
  ├─ 个人标注/笔记 → 仅本地（不上传）
  │
  └─ Book 结构/内容 → 可选上传到 Registry
       → 其他用户可以订阅
       → 作者更新时推送新版本
```

---

## 3. 社区/小组使用场景

你说的「几个人合起来用」指向一个社区产品形态:

### 3.1 场景: 教师 + 学生小组

```
教师（Author）:
  上传 PDF → 云端 RAG 建索引
  → 生成 Living Book → 发布到 Registry
  → 学生订阅后，各自在本地播放课堂 + 阅读 Book

学生（Learner）:
  订阅教师的 Living Book
  → 本地播放课堂（OpenMAIC）
  → 遇到问题 → 云端 RAG 检索（共享 KB）
  → 记录学习进度（本地记忆）
  → 在 Book 上做标注（本地私人）
  → 完成 Quiz → 成绩存本地
```

### 3.2 场景: 学习小组

```
3-5 人组成学习小组:
  共享同一份 KB（云端，教师建的）
  各自播放课堂（本地 OpenMAIC）
  各自做 Living Book 标注（本地私人）
  小组共享: Book 结构 + Quiz 成绩统计
  不共享: 个人记忆 + 标注 + 掌握度细节
```

### 3.3 场景: 开放课程社区

```
课程创作者:
  上传 PDF/内容 → 云端建 KB
  → 生成 Living Book → 发布到公开 Registry
  → 全球用户可以订阅

学习者:
  搜索公开 Living Book
  → 订阅到本地
  → 本地播放课堂 + 阅读 Book
  → 个人学习数据完全本地
```

---

## 4. 最终架构图

```
┌─────────────────────────────────────────────────────────────────────┐
│                        云端（共享服务）                               │
│                                                                     │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐     │
│  │  Cloud RAG      │  │  Book Registry  │  │  Course Content  │     │
│  │  ─ 多引擎检索    │  │  ─ 共享 Book    │  │  ─ Stage/Scene   │     │
│  │  ─ KB 索引管理   │  │  ─ 搜索/订阅    │  │  ─ 课堂模板      │     │
│  │  ─ 向量存储      │  │  ─ 版本管理     │  │  ─ 导出包        │     │
│  └────────┬────────┘  └────────┬────────┘  └────────┬────────┘     │
│           └────────────────────┼────────────────────┘               │
│                                │ REST API                           │
└────────────────────────────────┼────────────────────────────────────┘
                                 │
┌────────────────────────────────┼────────────────────────────────────┐
│                                │                                    │
│  ┌─────────────────────────────▼─────────────────────────────┐     │
│  │  Tauri 2 Desktop Shell                                     │     │
│  │                                                            │     │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │     │
│  │  │ OpenMAIC     │  │ 本地记忆      │  │ Living Book  │    │     │
│  │  │ ─ 课堂播放    │  │ ─ L1 Traces  │  │ ─ 本地副本    │    │     │
│  │  │ ─ 多角色对话  │  │ ─ L2 Facts   │  │ ─ 个人标注    │    │     │
│  │  │ ─ 白板/TTS   │  │ ─ L3 Profile │  │ ─ 可选同步    │    │     │
│  │  │ ─ Quiz/PBL   │  │ ─ 掌握度      │  │ ─ 共享订阅    │    │     │
│  │  │ ─ 导出        │  │ ─ 间隔重复    │  │              │    │     │
│  │  └──────────────┘  └──────────────┘  └──────────────┘    │     │
│  │                                                            │     │
│  │  ┌──────────────────────────────────────────────────┐     │     │
│  │  │ 课程库（本地 JSON + 云端同步）                       │     │     │
│  │  ─ CoursePackage[]（含 mastery + deeptutor_kb_id）    │     │     │
│  └──┴──────────────────────────────────────────────────┴─────┘     │
└─────────────────────────────────────────────────────────────────────┘

RAM: ~280MB（常驻）+ 云 API 调用（按需）
启动: ~1s
磁盘: ~310MB（Tauri + OpenMAIC）
依赖: 无 Python，无本地 embedding
```

---

## 5. 资源对比（更新）

| 指标 | 全量本地 | 云 RAG 方案 | 极简 |
|---|---|---|---|
| **客户端 RAM** | 1.2-3GB | **~280MB** | ~280MB |
| **客户端磁盘** | 1.7GB+ | **~310MB** | ~310MB |
| **客户端依赖** | Python + Node | **零**（Tauri 自包含）| 零 |
| **启动时间** | 6-11s | **~1s** | ~1s |
| **云端依赖** | 无 | API 网络 | API 网络 |
| **离线能力** | 完全离线 | 部分（课堂播放离线）| 部分 |
| **多用户** | 不支持 | **支持**（共享 KB/Book）| 不支持 |
| **适合** | 机构/实验室 | **个人/社区** | 受限设备 |

---

## 6. 实现优先级

### Phase 1: 本地 MVP（当前 → 近期）

**不做云端，先用 OpenMAIC 做到完整课堂体验。**

```
Tauri + OpenMAIC（~280MB）
├─ 课堂播放（slide/quiz/interactive/pbl）
├─ 多角色对话
├─ 白板/TTS
├─ Quiz 成绩本地追踪（JSON）
├─ 课程包内嵌 mastery[]（零额外进程）
└─ 导出（PPTX/HTML/ZIP）
```

### Phase 2: 云 RAG + 本地记忆（中期）

**接入云端 RAG，本地记忆系统落地。**

```
新增:
├─ Cloud RAG API（复用 DeepTutor 代码部署）
├─ Tauri Rust 壳调用 RAG API
├─ 本地 L1/L2/L3 记忆（SQLite / JSONL）
├─ 课程包关联 deeptutor_kb_id
└─ Quiz 成绩 → 本地掌握度追踪
```

### Phase 3: Living Book 共享 + 社区（远期）

**Living Book 注册表上线，支持共享/订阅。**

```
新增:
├─ Book Registry（云端）
├─ Book 发布/搜索/订阅 API
├─ 本地 Book 副本 + 个人标注
├─ 小组共享 KB
└─ 开放课程社区
```

---

## 7. 技术决策总结

| 问题 | 决策 | 理由 |
|---|---|---|
| RAG 在哪跑？ | **云端** | 共享索引，客户端零依赖 |
| 记忆在哪存？ | **本地** | 隐私，个人数据不上传 |
| Living Book 在哪？ | **本地副本 + 云端注册表** | 可共享，但个人标注私有 |
| Embedding 在哪算？ | **云端** | 不需要本地 GPU/CPU |
| LLM 在哪调？ | **云端 API** | 个人设备算力不足 |
| 课堂在哪播？ | **本地 OpenMAIC** | 离线可用，性能好 |
| 课程数据格式？ | **CoursePackage JSON** | 两个系统共享的数据契约 |

---

## 8. 一句话

**云 RAG 做知识共享的基础设设施，本地记忆做隐私保障，Living Book 做社区内容的载体。这不是两个系统的简单合并，而是一个分层架构：云端负责重计算和共享，本地负责体验和隐私。**
