# 家长自建教程 + 轻量级 RAG 方案

**日期:** 2026-07-13
**场景:** 家长把自己的教材/资料变成孩子能用的互动教程

---

## 1. 家长场景分析

### 家长是谁

不是教师，不是开发者。是一个**有教材但没时间备课的普通人**。

```
典型家长画像:
├─ 有孩子的课本/辅导书 PDF（也许还有自己的笔记）
├─ 想让孩子「自己学」但又不放心效果
├─ 不会写代码，不会配服务器
├─ 愿意花 5 分钟操作，不愿意花 50 分钟折腾
└─ 对「AI」有基本认知，但不理解 RAG/向量/嵌入
```

### 家长想做的事

| # | 需求 | 复杂度期望 |
|---|---|---|
| 1 | 把 PDF 变成孩子能看的互动课 | 拖进去就行 |
| 2 | 孩子能对着课问问题 | 自动的 |
| 3 | 知道孩子学了什么、哪里不会 | 自动的 |
| 4 | 能自己加一些讲解/注释 | 像编辑 Word 一样简单 |
| 5 | 多个孩子/多个科目 | 管理界面清晰 |

### 家长不想做的事

- 配置 LLM API key（「什么是 API key？我只有微信」）
- 安装 Python / Node / Docker
- 等 10 分钟建索引
- 理解什么是「向量数据库」
- 手动管理知识库

---

## 2. 极简 UX 设计

### 2.1 一键导入

```
家长打开 App
  ↓
拖入一个 PDF 文件
  ↓
App 自动:
  1. 解析 PDF（文本提取）
  2. 分章节/知识点
  3. 生成互动课堂（OpenMAIC 两阶段管线）
  4. 构建本地 RAG 索引（后台静默完成）
  5. 完成！显示「三年级数学第5章 已就绪」
```

**家长感知:** 拖进去 → 等 30 秒 → 可以用了
**技术真相:** PDF 解析 → 章节切分 → OpenMAIC 生成课堂 + 本地 RAG 索引（并行）

### 2.2 孩子使用

```
孩子打开课程
  ↓
┌─────────────────────────────────────────┐
│  📖 三年级数学 · 第5章 · 分数             │
│                                         │
│  [幻灯片 1/12]                          │
│  ┌─────────────────────────────────┐    │
│  │  什么是分数？                     │    │
│  │                                 │    │
│  │  把一个整体平均分成几份，         │    │
│  │  其中的一份就叫做分数。           │    │
│  │                                 │    │
│  │  例：把一个披萨切成4份，          │    │
│  │  每份就是 1/4                    │    │
│  └─────────────────────────────────┘    │
│                                         │
│  🎤 老师正在讲解...                      │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │ 💬 不明白？问我！                  │    │
│  │                                 │    │
│  │ [输入框: 为什么分数要叫1/4呢？]   │    │
│  └─────────────────────────────────┘    │
│                                         │
│  [上一页] [下一页] [📝 做个小测验]        │
└─────────────────────────────────────────┘

孩子问: 「为什么分数要叫1/4呢？」
  ↓
RAG 从本地索引检索相关知识点
  ↓
AI 回答:「因为'分母'4表示把整体分成了4等份，
        '分子'1表示取了其中1份。
        就像你和3个朋友分一个蛋糕，
        4个人每人得到 1/4。」
```

### 2.3 家长看报告

```
家长打开「学习报告」
  ↓
┌─────────────────────────────────────────┐
│  📊 小明的学习报告                        │
│                                         │
│  三年级数学 · 第5章 · 分数                │
│                                         │
│  学习进度: ██████████░░ 80%              │
│  掌握程度: ███████░░░░ 65%              │
│                                         │
│  ✅ 已掌握:                              │
│     · 分数的基本概念                      │
│     · 真分数与假分数                      │
│                                         │
│  ⚠️ 需要加强:                            │
│     · 分数加减法（正确率 40%）            │
│     · 通分（正确率 35%）                  │
│                                         │
│  📅 建议复习时间: 2天后                   │
│                                         │
│  [查看错题] [生成针对性练习]               │
└─────────────────────────────────────────┘
```

---

## 3. 轻量级 RAG 方案对比

**核心问题:** 家长场景下，RAG 需要多复杂？

### 3.1 方案对比

| 方案 | 依赖 | RAM | 索引速度 | 检索质量 | 适合 |
|---|---|---|---|---|---|
| **A. 纯 BM25 关键词** | 零（纯 Rust） | ~0 | 秒级 | 中 | ✅ 教材（结构化文本）|
| **B. SQLite FTS5** | 零（嵌入式） | ~0 | 秒级 | 中 | ✅ 教材 |
| **C. ChromaDB 本地** | Python | ~100MB | 分钟级 | 高 | 需要语义理解 |
| **D. LanceDB 嵌入** | Rust 原生 | ~50MB | 分钟级 | 高 | ✅ 最佳平衡 |
| **E. 云端 API** | 网络 | 0 | 秒级 | 高 | 需要网络 |

### 3.2 推荐方案: BM25 + 轻量语义（混合）

**教材场景的特殊性:**

```
教材 vs 开放域 Web 的区别:
├─ 教材文本是结构化的（章节/段落/例题/定义）
├─ 问题是精确的（「什么是分数？」而不是「聊聊天」）
├─ 答案就在文本中（不需要推理/创造）
├─ 词汇量有限（一个年级的教材用词范围小）
└─ 不存在「幻觉」问题（RAG 只需要找到原文）

→ BM25 关键词检索在教材场景下已经够用 80%
→ 加一层轻量语义提升到 90%+
→ 不需要重型向量数据库
```

### 3.3 具体实现: Tauri Rust 壳内嵌 RAG

**方案: SQLite FTS5 + TF-IDF（纯 Rust，零外部依赖）**

```rust
// lib.rs 中新增命令

use rusqlite::Connection;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
struct KBChunk {
    id: i64,
    chapter: String,
    section: String,
    content: String,
    tokens: Vec<String>,  // 分词结果
}

#[derive(Serialize, Deserialize)]
struct SearchResult {
    chunk: KBChunk,
    score: f64,
    highlight: String,  // 高亮匹配片段
}

#[tauri::command]
async fn build_kb_from_pdf(pdf_path: String, kb_name: String) -> Result<(), String> {
    // 1. 解析 PDF（用 pdf-extract crate，纯 Rust）
    let text = pdf_extract::extract_text(&pdf_path)
        .map_err(|e| e.to_string())?;

    // 2. 章节切分（正则匹配：第X章/第X节/数字编号）
    let chunks = split_into_chapters(&text);

    // 3. 写入 SQLite + FTS5 索引
    let db_path = kb_store_path(&kb_name);
    let conn = Connection::open(&db_path).map_err(|e| e.to_string())?;

    conn.execute_batch("
        CREATE TABLE IF NOT EXISTS chunks (
            id INTEGER PRIMARY KEY,
            chapter TEXT,
            section TEXT,
            content TEXT
        );
        CREATE VIRTUAL TABLE IF NOT EXISTS chunks_fts USING fts5(
            chapter, section, content,
            content=chunks,
            content_rowid=id
        );
    ").map_err(|e| e.to_string())?;

    for chunk in &chunks {
        conn.execute(
            "INSERT INTO chunks (chapter, section, content) VALUES (?1, ?2, ?3)",
            (&chunk.chapter, &chunk.section, &chunk.content),
        ).map_err(|e| e.to_string())?;
    }

    // 4. 构建 FTS 索引
    conn.execute(
        "INSERT INTO chunks_fts(chunks_fts) VALUES('rebuild')",
        [],
    ).map_err(|e| e.to_string())?;

    Ok(())
}

#[tauri::command]
async fn search_kb(kb_name: String, query: String) -> Result<Vec<SearchResult>, String> {
    let db_path = kb_store_path(&kb_name);
    let conn = Connection::open(&db_path).map_err(|e| e.to_string())?;

    // FTS5 检索（支持中文分词 + 模糊匹配）
    let mut stmt = conn.prepare(
        "SELECT c.id, c.chapter, c.section, c.content,
                highlight(chunks_fts, 2, '<b>', '</b>') as highlight,
                rank
         FROM chunks_fts
         JOIN chunks c ON chunks_fts.rowid = c.id
         WHERE chunks_fts MATCH ?1
         ORDER BY rank
         LIMIT 5"
    ).map_err(|e| e.to_string())?;

    let results = stmt.query_map([&query], |row| {
        Ok(SearchResult {
            chunk: KBChunk {
                id: row.get(0)?,
                chapter: row.get(1)?,
                section: row.get(2)?,
                content: row.get(3)?,
                tokens: vec![],
            },
            score: row.get::<_, f64>(5)?,
            highlight: row.get(4)?,
        })
    }).map_err(|e| e.to_string())?
      .filter_map(|r| r.ok())
      .collect();

    Ok(results)
}
```

**优势:**
- **零外部依赖** — 纯 Rust，不需要 Python/Node/embedding 模型
- **零额外 RAM** — SQLite 嵌入式，不启动服务器
- **秒级建索引** — 一份教材（50 页 PDF）< 1 秒
- **支持中文** — FTS5 + jieba 分词（Rust 实现）
- **Tauri 自包含** — 打包进安装包，用户无感

### 3.4 如果需要更强的语义: LanceDB Embedded

**当 BM25 不够用时（比如孩子问的问题和教材措辞不同），升级到 LanceDB:**

```toml
# Cargo.toml
[dependencies]
lancedb = "0.15"  # Rust 原生嵌入式向量数据库
arrow-array = "53"
```

```rust
use lancedb::connection::Connection;
use lancedb::query::ExecutableQuery;

#[tauri::command]
async fn build_semantic_kb(pdf_path: String, kb_name: String) -> Result<(), String> {
    let text = pdf_extract::extract_text(&pdf_path).map_err(|e| e.to_string())?;
    let chunks = split_into_chunks(&text, 512);  // 512 token 一块

    // 本地 embedding（用 fastembed-rs，纯 Rust，~30MB 模型）
    let embedder = fastembed::TextEmbedding::try_new(
        fastembed::TextEmbeddingParameters::new("BAAI/bge-small-zh-v1.5")
    ).map_err(|e| e.to_string())?;

    let embeddings: Vec<Vec<f32>> = chunks.iter()
        .map(|c| embedder.embed(&[c.content.as_str()]).unwrap()[0].clone())
        .collect();

    // LanceDB 嵌入式（文件存储，不启动服务器）
    let db_dir = kb_store_path(&kb_name);
    let db = lancedb::connect(&db_dir)
        .execute()
        .await
        .map_err(|e| e.to_string())?;

    let table = db.create_table(&kb_name, Box::new(record_batch))
        .execute()
        .await
        .map_err(|e| e.to_string())?;

    // 向量索引
    table.create_index(&["vector"])
        .execute()
        .await
        .map_err(|e| e.to_string())?;

    Ok(())
}

#[tauri::command]
async fn semantic_search(kb_name: String, query: String) -> Result<Vec<SearchResult>, String> {
    let db_dir = kb_store_path(&kb_name);
    let db = lancedb::connect(&db_dir).execute().await.map_err(|e| e.to_string())?;
    let table = db.open_table(&kb_name).execute().await.map_err(|e| e.to_string())?;

    // 本地 embedding 查询
    let embedder = fastembed::TextEmbedding::try_new(
        fastembed::TextEmbeddingParameters::new("BAAI/bge-small-zh-v1.5")
    ).map_err(|e| e.to_string())?;
    let query_vec = embedder.embed(&[&query]).unwrap()[0].clone();

    // 向量检索
    let results = table
        .vector_search(&query_vec)
        .limit(5)
        .execute()
        .await
        .map_err(|e| e.to_string())?;

    // ... 转换为 SearchResult
    Ok(results)
}
```

**LanceDB 优势:**
- **Rust 原生** — 不需要 Python
- **嵌入式** — 不启动服务器，文件级存储
- **~30MB 模型** — `bge-small-zh` 中文语义模型，比 `text-embedding-3` 的云端调用更离线友好
- **混合检索** — 向量 + 关键词可以组合

---

## 4. 家长流程: 从 PDF 到互动课

### 4.1 完整流程

```
步骤 1: 打开 App
  └─ Tauri 启动（~1s，~280MB）

步骤 2: 拖入 PDF
  └─ 文件选择器 / 拖拽区

步骤 3: 选择年级和科目（可选，自动检测也行）
  └─ 下拉框: 「三年级 · 数学」

步骤 4: 点击「开始」
  └─ 后台并行执行:
     ├─ PDF 解析（~2s）
     ├─ 章节切分（~0.5s）
     ├─ OpenMAIC 课堂生成（~30-60s，需网络调 LLM）
     ├─ 本地 RAG 索引构建（~1s，FTS5）
     └─ 完成！

步骤 5: 预览课堂
  └─ 家长可以浏览生成的幻灯片/Quiz

步骤 6: 孩子使用
  └─ 打开课程 → 看课 → 问问题 → 做测验

步骤 7: 家长查看报告
  └─ 学习进度 + 掌握程度 + 建议
```

### 4.2 技术栈（家长视角）

| 家长看到的 | 技术实现 |
|---|---|
| 「拖入 PDF」 | Tauri file dialog + drag-drop |
| 「正在生成...」 | OpenMAIC generation pipeline |
| 「可以用了」 | 本地 FTS5 索引就绪 |
| 「孩子问问题」 | 本地 FTS5 检索 + LLM 回答 |
| 「查看报告」 | 本地 JSON 统计 + 简单图表 |

### 4.3 零配置保证

```
家长不需要知道的:
├─ 什么是 LLM（但需要一个 API key，首次设置时引导）
├─ 什么是 RAG（App 后台自动处理）
├─ 什么是向量数据库（用 FTS5 就够）
├─ 怎么安装 Python/Node（Tauri 自包含）
├─ 怎么建索引（拖入 PDF 自动建）
└─ 怎么管理知识库（App 界面管理）

家长只需要知道的:
├─ 拖入 PDF → 等一会儿 → 可以用了
├─ 孩子可以对着课问问题
├─ 我能看到孩子的学习情况
└─ （可选）填一个 API key 用于 AI 回答
```

---

## 5. RAG 轻量化的三层策略

### Level 1: 纯关键词（零依赖，秒级）

```
技术: SQLite FTS5 + BM25
依赖: 纯 Rust（rusqlite + jieba）
RAM: ~0（嵌入式）
索引: <1s（50 页 PDF）
质量: 80%（教材场景够用）
```

**适合:** 大多数教材（结构化文本，问题和答案措辞接近）

### Level 2: 关键词 + 轻量语义（~30MB 模型）

```
技术: FTS5 + fastembed（bge-small-zh）
依赖: Rust 原生 embedding
RAM: ~100MB（加载模型时）
索引: ~5s（50 页 PDF）
质量: 90%（能处理措辞不同的问题）
```

**适合:** 需要更好语义理解的场景（孩子问的问题和教材措辞差异大）

### Level 3: 完整向量检索（可选升级）

```
技术: LanceDB + embedding
依赖: Rust 原生
RAM: ~150MB
索引: ~10s
质量: 95%
```

**适合:** 高级用户、机构场景

### 降级策略

```
App 启动时检测:
├─ 有 GPU? → Level 2/3（如果需要）
├─ RAM < 4GB? → Level 1（纯 FTS5）
├─ 首次使用? → Level 1（秒级可用）
└─ 用户手动切换? → 设置中选择 RAG 级别
```

---

## 6. 对比: 家长方案 vs 全量方案

| 维度 | 全量方案 | 家长方案 |
|---|---|---|
| **安装包大小** | 1.7GB+ | **~310MB** |
| **启动时间** | 6-11s | **~1s** |
| **RAM 占用** | 1.2-3GB | **~280MB** |
| **需要 Python** | 是 | **否** |
| **需要配置** | 多项 | **仅 API key** |
| **建索引时间** | 分钟级 | **秒级** |
| **RAG 质量** | 95% | **80-90%**（教材够用）|
| **离线能力** | 完全 | **部分**（课堂播放离线）|
| **适合** | 机构/教师 | **家长/个人** |

---

## 7. 实现路径

### MVP（当前可做）

```
1. Tauri 壳 + OpenMAIC（已有）
2. 添加 PDF 拖入 → 自动触发 OpenMAIC 生成
3. FTS5 索引构建（Rust crate: rusqlite）
4. 「问问题」面板 → FTS5 检索 + LLM 回答
5. 简单学习报告（JSON 统计）
```

**工作量估计:** 2-3 周（在现有基础上）

### Phase 2

```
1. LanceDB 嵌入（可选升级）
2. 章节自动检测优化
3. Quiz 自动生成（从 RAG 结果提取知识点）
4. 间隔重复调度
```

### Phase 3

```
1. Living Book 生成（从课堂内容自动编排）
2. 多孩子管理
3. 云端同步（可选，家庭内共享）
```

---

## 8. 一句话

**家长场景的核心是「拖进去就能用」。FTS5 做 RAG 够用（教材是结构化文本），LanceDB 做升级路径（需要语义时），两者都是 Rust 原生嵌入式，不需要 Python，不需要服务器。**
