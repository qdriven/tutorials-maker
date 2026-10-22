# 资源消耗分析与轻量化方案

**日期:** 2026-07-13
**核心问题:** 同时运行 OpenMAIC + DeepTutor 对个人用户是否可行？

---

## 1. 全量方案资源消耗（不现实）

### 各组件 RAM 占用

| 组件 | 进程 | RAM（典型） | RAM（峰值） | 说明 |
|---|---|---|---|---|
| Tauri Shell | Rust + WebView | ~80MB | ~120MB | 壳本身 + React UI |
| OpenMAIC Runtime | Node.js (server.js) | ~200MB | ~400MB | Next.js 16 standalone |
| DeepTutor Backend | Python (uvicorn) | ~300MB | ~800MB | FastAPI + 加载模型 |
| DeepTutor Frontend | Node.js (Next.js) | ~150MB | ~300MB | Next.js 16 前端 |
| RAG Embedding | 首次加载 | ~500MB | ~1.5GB | sentence-transformers / FAISS |
| LLM 调用 | 网络 I/O | ~0 | ~0 | API 调用，不占本地 RAM |

**全量总计: ~1.2GB（空闲）→ ~3GB（峰值）**

### 其他资源

| 资源 | 全量方案 |
|---|---|
| 磁盘 | OpenMAIC 230MB + DeepTutor ~500MB + 依赖 ~1GB ≈ **1.7GB+** |
| CPU | Node.js + Python 同时运行，启动时竞争 |
| 网络 | LLM API 调用（每次对话都需网络）|
| 启动时间 | OpenMAIC ~1s + DeepTutor ~5-10s（加载 embedding）≈ **6-11s** |
| 端口 | 3230 (OpenMAIC) + 3782 (DeepTutor) + 1420 (Vite dev) |

### 结论

**全量方案对个人用户不可行。** 一台 8GB RAM 的普通笔记本跑不动。即使 16GB 也会卡顿。

---

## 2. 核心矛盾

```
用户想要的：           系统需要的：
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
课堂播放（看）          OpenMAIC Runtime（Node.js ~200MB）
对话问答（问）          DeepTutor Backend（Python ~300MB + RAG ~500MB）
掌握度追踪（学）        DeepTutor Learning（Python ~100MB）
桌面应用（用）          Tauri Shell（Rust ~80MB）

用户实际需要的：        最小可行消耗：
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
大部分时间只是播放       只需要 OpenMAIC（~200MB）
偶尔问个问题            按需启动 DeepTutor
不太需要 Living Book    延迟加载或降级
```

---

## 3. 轻量化策略：按需加载 + 分层降级

### 3.1 架构重构：从"同时运行"到"按需启动"

```
┌─────────────────────────────────────────────────────────┐
│  Tauri Shell（常驻，~80MB）                               │
│  React UI · 课程库 · 设置                                │
└────────┬──────────────────────┬─────────────────────────┘
         │ 常驻                  │ 按需
┌────────▼──────────┐  ┌───────▼────────────────────┐
│  OpenMAIC Runtime  │  │  DeepTutor Engine           │
│  （常驻，~200MB）   │  │  （按需启动，~300MB）         │
│  课堂播放 · 角色    │  │  KB 问答 · 掌握度 · 记忆      │
│  白板 · TTS · PBL  │  │                               │
└────────────────────┘  └────────────────────────────┘
         │                        │
         └────────┬───────────────┘
                  │ 共享：课程包（JSON 文件）
```

**关键变化:**
- OpenMAIC 常驻（课堂播放是主路径）
- DeepTutor **按需启动**（仅在用户主动查询/需要掌握度时启动）
- 两者不同时运行在内存中（时间错开）

### 3.2 DeepTutor 轻量化：砍掉不需要的

| 模块 | 全量 | 轻量 | 说明 |
|---|---|---|---|
| `deeptutor/` 后端 | FastAPI 全量 | **CLI-only 模式** | 不启动 Web 服务器 |
| RAG 引擎 | 7 种全加载 | **仅 LlamaIndex**（默认）| 最小依赖 |
| Embedding | sentence-transformers（本地 ~500MB）| **API 模式**（OpenAI embedding）| 零本地 RAM |
| LLM | 本地可能 | **纯 API** | 不加载本地模型 |
| Frontend | Next.js 全量 | **不启动** | 通过 Tauri 壳 UI 替代 |
| Partners/IM | 18 个渠道 | **不加载** | 个人用户不需要 |
| Multi-User | 全量 | **不加载** | 单用户模式 |

**轻量化后 DeepTutor:**
```
全量: Python ~300MB + Embedding ~500MB + Frontend ~150MB = ~950MB
轻量: Python ~150MB（CLI-only）+ Embedding ~0（API）+ Frontend ~0 = ~150MB
```

### 3.3 Tauri 壳内的智能调度

```
App 启动
  ├─ 常驻: Tauri Shell（~80MB）
  ├─ 常驻: OpenMAIC Runtime（~200MB）
  └─ DeepTutor: STOPPED

用户点击「问 DeepTutor」
  ├─ 启动 DeepTutor CLI（~150MB，2-3s）
  ├─ 执行查询
  └─ 5 分钟无活动 → 自动停止（释放 150MB）

用户在课堂中完成 Quiz
  ├─ 成绩暂存本地（JSON）
  ├─ 不立即启动 DeepTutor
  └─ 用户查看「学习报告」时 → 按需启动 → 生成报告 → 停止
```

---

## 4. 三级降级方案

### Level 1: 完整体验（16GB+ RAM）

```
OpenMAIC Runtime（常驻）
+ DeepTutor Backend（按需）
+ DeepTutor RAG（本地 embedding）
+ 全部功能：课堂 + KB 问答 + 掌握度 + Living Book + IM
```

**适合:** 教师备课、机构部署

### Level 2: 标准体验（8GB RAM）— 推荐

```
OpenMAIC Runtime（常驻）
+ DeepTutor CLI-only（按需，API embedding）
+ 功能：课堂 + KB 问答 + 掌握度追踪
- 砍掉：Living Book、IM 渠道、多用户
```

**适合:** 个人学生、自学者

### Level 3: 极简体验（4GB RAM）

```
OpenMAIC Runtime（常驻）
+ DeepTutor: 完全不启动
+ 功能：仅课堂播放（含 Quiz + 白板 + TTS）
- 砍掉：KB 问答、掌握度、Living Book
```

**适合:** 只想看课的学生、资源受限设备

---

## 5. 更激进的方案：纯 OpenMAIC（零 DeepTutor）

如果 DeepTutor 的依赖实在无法接受，可以**完全不集成 DeepTutor**，仅用 OpenMAIC:

### 5.1 OpenMAIC 已有的学习能力

| 能力 | OpenMAIC 支持 | 说明 |
|---|---|---|
| Quiz 测验 | ✅ | 选择题 + AI 评分 |
| PBL 项目制 | ✅ | v2 多 Agent 项目制学习 |
| Agent 对话 | ✅ | Teacher/Assistant/Student 多角色 |
| 交互场景 | ✅ | 3D/仿真/游戏/编程 |
| PDF 处理 | ✅ | unpdf（免费）+ MinerU |

### 5.2 OpenMAIC 缺失但可轻量补充的

| 缺失能力 | 轻量补充方案 | 复杂度 |
|---|---|---|
| 掌握度追踪 | 课程包内嵌 `mastery[]` 字段 + 前端 Zustand 状态 | 低 |
| 知识库检索 | Quiz 分析 → 知识点映射（不需要 RAG）| 低 |
| 学习记忆 | LocalStorage 记录学习历史 | 低 |
| 学习报告 | 基于 Quiz 成绩 + 学习时间的简单统计 | 低 |

### 5.3 最终推荐架构

```
┌─────────────────────────────────────────────────┐
│  Tauri 2 Shell（常驻，~80MB）                     │
│  React + shadcn · 课程库 · 设置                   │
└────────────────┬────────────────────────────────┘
                 │ 子 Webview
┌────────────────▼────────────────────────────────┐
│  OpenMAIC Runtime（常驻，~200MB）                  │
│  ─ 课堂生成与播放                                  │
│  ─ 多角色对话（Teacher/Assistant/Student）         │
│  ─ 白板/幻灯片/交互场景                           │
│  ─ TTS 语音朗读                                   │
│  ─ Quiz 测验 + AI 评分                            │
│  ─ PBL 项目制学习                                 │
│  ─ 导出（PPTX/HTML/ZIP）                          │
│                                                   │
│  + 课程包内置 mastery[]（掌握度检查点）             │
│  + Quiz 成绩 → 本地 JSON 追踪                      │
│  + 简单学习报告（Quiz 统计 + 学习时间）             │
└──────────────────────────────────────────────────┘

总 RAM: ~280MB（空闲）→ ~500MB（峰值）
启动时间: ~1-2s
磁盘: ~230MB（bundled runtime）+ ~80MB（Tauri）= ~310MB
```

**对比:**

| 指标 | 全量方案 | 推荐方案 | 极简方案 |
|---|---|---|---|
| RAM | 1.2-3GB | **280-500MB** | ~280MB |
| 启动 | 6-11s | **1-2s** | ~1s |
| 磁盘 | 1.7GB+ | **310MB** | 310MB |
| 功能 | 全部 | **课堂+Quiz+PBL+掌握度** | 仅课堂 |
| 网络 | 必需（LLM+Embedding）| 必需（LLM）| 必需（LLM）|
| 适合 | 机构 | **个人** | 受限设备 |

---

## 6. DeepTutor 的真正价值点（值得保留的）

如果未来要集成 DeepTutor，**只保留这些高价值模块:**

| 模块 | 价值 | 成本 | 建议 |
|---|---|---|---|
| RAG 知识库 | 高（课后深度学习）| 高（embedding + 索引）| Phase 2+ 按需 |
| 掌握度追踪 | 高（自适应学习）| 中 | 可用课程包内嵌替代 |
| 三层记忆 | 中（个性化）| 高 | Phase 3+ |
| Living Book | 中（交互阅读）| 中 | 可选插件 |
| Co-Writer | 低（写作场景少）| 低 | 不集成 |
| IM 渠道 | 低（个人用户不用）| 中 | 不集成 |
| 多用户 | 低（单用户场景）| 低 | 不集成 |

---

## 7. 结论

### 对个人用户的影响

| 问题 | 回答 |
|---|---|
| 全量方案可行吗？ | **不可行** — 8GB 笔记本会卡 |
| 有可行方案吗？ | **有** — 推荐方案仅 280-500MB |
| 需要 DeepTutor 吗？ | **MVP 阶段不需要** — OpenMAIC 自身能力足够 |
| 什么时候需要？ | **Phase 2+** — 当用户需要 KB 检索和深度追踪时 |
| 最小可行产品？ | **Tauri + OpenMAIC** — 280MB，1s 启动，功能完整 |

### 建议

1. **MVP 聚焦 OpenMAIC** — 课堂播放 + Quiz + PBL + 白板 + TTS，不需要 DeepTutor
2. **掌握度用课程包内嵌** — `mastery[]` 字段 + 前端状态，不依赖 DeepTutor
3. **DeepTutor 作为可选插件** — 用户主动启用时才启动，按需加载
4. **资源消耗是硬约束** — 个人用户的笔记本就是 8GB，不能假设 16GB+

### 一句话

**全量融合是理想，轻量化 MVP 是现实。先用 OpenMAIC 做到 280MB 的完整课堂体验，再按需引入 DeepTutor 的知识引擎能力。**
