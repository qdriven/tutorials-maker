# DeepTutor 模块分析

**源码路径:** `D:\copy-modify\ai-edu\DeepTutor`
**版本:** 1.5.0 | **License:** Apache-2.0
**论文:** arXiv:2604.26962
**技术栈:** Python 3.11+ / FastAPI 后端 + Next.js 16 / React 19 前端

---

## 一句话定位

**Agent-native 终身个性化辅导系统。** 基于多引擎 RAG 知识库，通过对话式 Agent 交互，提供自适应学习路径、掌握度追踪、Living Book、协作写作等全方位学习支持。

---

## 模块总览

| 模块 | 路径 | 核心职责 |
|---|---|---|
| 核心 Agent 引擎 | `deeptutor/core/` | 标签驱动迭代调度、流式事件总线、统一上下文 |
| Runtime 编排 | `deeptutor/runtime/` | ChatOrchestrator、启动器、注册表、引导 |
| 应用门面 | `deeptutor/app/` | CLI/SDK 的稳定 API 门面 |
| Agents | `deeptutor/agents/` | 7 个能力特定 Agent（chat/research/visualize/question/math_animator/vision_solver/notebook）|
| Capabilities 插件 | `deeptutor/capabilities/` | 插件系统：mastery/solve/obsidian/subagent/explore_context |
| Tools 工具 | `deeptutor/tools/` | 20+ 工具（RAG/Web搜索/Web抓取/论文搜索/推理/头脑风暴/代码执行等）|
| Services 服务层 | `deeptutor/services/` | 30 个子服务（RAG/LLM/Memory/Session/Sandbox 等）|
| Knowledge 知识库 | `deeptutor/knowledge/` | KB 管理（创建/添加文档/搜索/删除）|
| Living Book | `deeptutor/book/` | 交互式阅读环境（19 种 Block 类型）|
| Learning 学习 | `deeptutor/learning/` | 掌握度评分、评分、间隔重复 |
| Co-Writer | `deeptutor/co_writer/` | 选中文本感知的 Markdown 协作编辑 |
| Partners IM | `deeptutor/partners/` | 18 个 IM 渠道适配器 + Partner 生命周期 |
| Multi-User | `deeptutor/multi_user/` | 认证、授权、per-user 隔离 |
| Skills | `deeptutor/skills/` | 内置技能（docx/pdf/pptx/xlsx）+ 技能创建器 |
| API 层 | `deeptutor/api/` | FastAPI HTTP/WS 服务器，30 个路由 |
| Frontend | `web/` | Next.js 16 前端（React 19, Tailwind）|
| CLI | `deeptutor_cli/` | Typer CLI 入口 |

---

## 详细模块分析

### 1. 核心 Agent 引擎 (`deeptutor/core/`)

**核心文件:** `agentic/loop.py`（标签驱动迭代调度器）

**架构:** 每轮对话 = 一次 LLM 调用 → 文本流式输出 → 工具调用分发 → 结果追加 → 重复直到终态标签

**标签词汇:**
- `THINK` — 思考中
- `TOOL` — 调用工具
- `FINISH` — 回答完成
- `PAUSE` — 等待用户输入

**关键组件:**
| 组件 | 职责 |
|---|---|
| `agentic/loop.py` | 核心循环：LLM 调用 → 工具分发 → 终态判断 |
| `agentic/tool_dispatch.py` | 工具调用分发与结果收集 |
| `agentic/client.py` | LLM 客户端抽象 |
| `context.py` | `UnifiedContext` — 统一轮次上下文 |
| `stream.py` / `stream_bus.py` | 流式事件总线（进程内 pub/sub）|
| `capability_protocol.py` / `tool_protocol.py` | 协议定义 |

### 2. Runtime 编排 (`deeptutor/runtime/`)

**ChatOrchestrator** — 统一入口，将 `UnifiedContext` 路由到能力模块，通过 `StreamBus` 发送事件。

| 组件 | 职责 |
|---|---|
| `orchestrator.py` | ChatOrchestrator：统一路由 |
| `launcher.py` | `deeptutor start`：同时启动后端 + 前端 |
| `registry/tool_registry.py` | 工具注册表（名称→处理器）|
| `registry/capability_registry.py` | 能力注册表（名称→清单）|
| `bootstrap/builtin_capabilities.py` | 启动时注册内置能力 |

### 3. Agents 能力特定实现 (`deeptutor/agents/`)

| Agent | 路径 | 职责 |
|---|---|---|
| **Chat** | `agents/chat/` | 主对话循环；工具调用轮次 + narration/finish 模式 |
| **Research** | `agents/research/` | 引用报告生成（深度研究）|
| **Visualize** | `agents/visualize/` | Chart.js/SVG/Mermaid 图表生成（子 Agent：分析→代码生成→审查）|
| **Question** | `agents/question/` | 测验题生成 |
| **Math Animator** | `agents/math_animator/` | Manim 数学动画视频生成 |
| **Vision Solver** | `agents/vision_solver/` | 多模态图像问题解答 |
| **Notebook** | `agents/notebook/` | 笔记分析与摘要 |

**每个 Agent 包含:**
- Prompt YAML（en/zh）
- Pipeline 流水线
- 模型配置

### 4. Capabilities 插件系统 (`deeptutor/capabilities/`)

**协议:** `LoopCapability` — 每轮对话可扩展的能力插件

| 能力 | 路径 | 职责 |
|---|---|---|
| **Mastery Path** | `capabilities/mastery/` | 自适应学习路径 + 掌握度门控 |
| **Deep Solve** | `capabilities/solve/` | 分步推理（worked-step reasoning）|
| **Obsidian** | `capabilities/obsidian/` | Obsidian vault 链接作为知识源 |
| **Subagent Consult** | `capabilities/subagent/` | 中途咨询 Claude Code / Codex / Partners |
| **Explore Context** | `capabilities/explore_context/` | 循环前上下文探索 |

### 5. Tools 工具层 (`deeptutor/tools/`)

20+ 工具供 Agent 循环调用:

| 工具 | 职责 |
|---|---|
| `rag_tool.py` | RAG 知识库检索 |
| `web_search.py` | Web 搜索（DuckDuckGo / SearXNG）|
| `web_fetch.py` | 网页抓取与提取 |
| `paper_search_tool.py` | arXiv 论文搜索 |
| `reason.py` | 扩展推理 |
| `brainstorm.py` | 头脑风暴 |
| `ask_user.py` | 暂停等待用户结构化输入 |
| `exec_tool.py` | 代码执行（沙箱）|
| `solve_tool.py` | 数学/问题解答 |
| `write_note.py` / `list_notebook.py` | 笔记 CRUD |
| `github_query.py` | GitHub API 查询 |
| `media_gen_tool.py` | 图像/视频生成 |
| `mastery_tool.py` | 掌握度路径工具 |
| `cron_tool.py` | 定时任务 |
| `vision/` | 视觉/图像工具 |

### 6. Services 服务层 (`deeptutor/services/`)

30 个子服务，核心 6 个:

#### 6a. RAG 服务 (`services/rag/`)
**多引擎检索架构。** 每个 KB 绑定一个检索引擎:

| 引擎 | 说明 |
|---|---|
| **LlamaIndex**（默认）| 本地向量 + BM25 + FAISS |
| **GraphRAG** | Microsoft 知识图谱检索 |
| **LightRAG** | HKUDS 知识图谱 + RAG-Anything |
| **LightRAG Server** | 外部 LightRAG HTTP 实例 |
| **PageIndex** | 托管推理检索，页面级引用 |

**关键组件:**
- `smart_retriever.py` — 智能检索器
- `index_versioning.py` — 版本化索引目录
- `embedding_signature.py` — 嵌入模型不匹配检测
- `preflight.py` — 检索前验证

#### 6b. LLM 服务 (`services/llm/`)
**提供商注册 + 工厂 + OpenAI/Anthropic SDK。** 云/本地路由、上下文窗口管理、推理参数。

#### 6c. Memory 三层记忆系统 (`services/memory/`)

| 层 | 用途 | 存储 |
|---|---|---|
| **L1 — Traces** | 原始事件捕获（JSONL append-only，按 surface/日期）| `trace/<surface>/<date>.jsonl` |
| **L2 — Surface Facts** | 按 surface 整理的事实，含 L1 引用 | `L2/<surface>.md` |
| **L3 — Cross-Surface Synthesis** | 跨 surface 综合：profile/recent/scope/preferences | `L3/<slot>.md` |

**7 个 Surface:** chat, notebook, quiz, kb, book, partner, cowriter

**关键组件:**
- `trace.py` — L1 写入（asyncio 锁）
- `document.py` — L2/L3 Markdown 解析/序列化
- `consolidator/` — LLM 驱动的 L1→L2 和 L2→L3 整合

#### 6d. Session 服务 (`services/session/`)
会话持久化（SQLite / PocketBase）、上下文构建器、轮次运行时。

#### 6e. Parsing 服务 (`services/parsing/`)
5 种文档解析引擎: text_only, MinerU, Docling, markitdown, PyMuPDF4LLM

#### 6f. Sandbox 服务 (`services/sandbox/`)
代码执行沙箱：Docker sidecar runner + 配额管理 + 产物收集

### 7. Living Book 引擎 (`deeptutor/book/`)

**交互式阅读环境，19 种 Block 类型:**

| Block | 说明 |
|---|---|
| `text` | 文本块 |
| `quiz` | 测验题 |
| `flash_cards` | 闪卡 |
| `timeline` | 时间线 |
| `code` | 代码块 |
| `callout` | 提示框 |
| `figure` | 图表 |
| `interactive` | 交互式组件 |
| `animation` | Manim 动画 |
| `concept_graph` | 概念图 |
| `deep_dive` | 深入探讨 |
| `section` | 章节 |
| `user_note` | 用户笔记 |

**编排 Agent:**
- `ideation_agent` — 主题构思
- `source_explorer` — 源材料探索
- `spine_synthesizer` — 大纲合成
- `page_planner` — 页面规划

**流程:** `create_book → confirm_proposal → confirm_spine → compile_page`

### 8. Learning 学习系统 (`deeptutor/learning/`)

| 组件 | 职责 |
|---|---|
| `mastery.py` | `compute_mastery()` — 时间加权准确率（0..1），含置信度上限 |
| `grading.py` | 答案评分 + 错误分类 |
| `scheduler.py` | `SpacedRepetitionScheduler` — 间隔重复调度 |
| `service.py` | `LearningService` — 模块初始化、掌握度计算、测验尝试、Feynman 重试 |
| `storage.py` | `LearningStore` 持久化 |

### 9. Co-Writer 协作写作 (`deeptutor/co_writer/`)

| 组件 | 职责 |
|---|---|
| `edit_agent.py` | 选中文本感知的外科手术式 Markdown 编辑（accept/reject diffs）|
| `storage.py` | 文档持久化 |

### 10. Partners IM 渠道 (`deeptutor/partners/`)

**18 个 IM 渠道适配器:**

飞书、Telegram、Slack、Discord、钉钉、QQ、企业微信、WhatsApp、Zulip、Mattermost、Matrix、MoChat、MS Teams、NapCat（OneBot v11）、Email、微信

**功能:** Partner 生命周期管理（start/stop/auto-start）、消息总线、语音转写。

### 11. Multi-User 多用户 (`deeptutor/multi_user/`)

完整的多用户支持：
- 身份管理（JWT + bcrypt）
- Per-user 授权（模型/KB/技能/工具/Partner 访问控制）
- 审计追踪
- 工作空间隔离

### 12. CLI (`deeptutor_cli/`)

**关键命令:**
```bash
deeptutor init              # 首次设置向导
deeptutor start             # 启动后端 + 前端
deeptutor chat              # 交互式 REPL
deeptutor run <capability>  # 单轮执行（chat/deep_solve/deep_question/deep_research/visualize/math_animator/mastery_path）
deeptutor kb list/create/search  # 知识库管理
deeptutor partner list/create    # Partner 管理
deeptutor memory show/clear      # 记忆检查
deeptutor notebook list/create   # 笔记管理
```

### 13. API 层 (`deeptutor/api/`)

**FastAPI + 30 个路由:**
chat, knowledge, settings, memory, book, co_writer, notebook, sessions, question, mastery_path, partners, skills, personas, subagents, voice, tools, plugins, system, attachments, imports, dashboard, agent_config, capabilities_settings, mcp_settings, auth, unified_ws, quiz_judge

### 14. Frontend (`web/`)

**路由结构:**
```
(workspace)/
  ├── home/          # Chat 工作区（默认）
  ├── book/          # Living Books
  ├── co-writer/     # 协作写作
  ├── partners/      # Partner 伙伴
  └── playground/    # Playground
(admin)/admin/        # 管理面板
(auth)/login/register # 认证
```

**22 个组件目录:** chat, knowledge, settings, partners, memory, notebook, research, quiz, visualize, math-animator, space, agents, auth, sidebar, common, ui, access...

---

## DeepTutor 的核心优势

1. **多引擎 RAG 知识库** — 7 种检索引擎，按需绑定，支持知识图谱
2. **三层记忆系统** — L1 traces → L2 facts → L3 synthesis，持久化跨会话
3. **掌握度追踪** — 时间加权准确率 + 间隔重复 + Feynman 重试
4. **Living Book** — 19 种 Block 类型的交互式阅读环境
5. **Co-Writer** — 选中文本感知的协作写作
6. **18 个 IM 渠道** — 飞书/Telegram/Slack/Discord 等全覆盖
7. **多用户隔离** — 完整的认证、授权、审计
8. **CLI + API 双入口** — 既可独立运行，也可作为服务调用
9. **MCP 集成** — Model Context Protocol 支持

## DeepTutor 的不足（相对于 OpenMAIC）

1. **无课堂生成** — 不会自动生成多场景课堂内容
2. **无白板系统** — 没有实时白板绘制能力
3. **无幻灯片渲染** — 没有 slide/canvas 渲染器
4. **无多角色对话** — 没有教师/助教/学生自动生成与编排
5. **无 PBL 项目制学习** — 缺乏项目制教学支持
6. **无 TTS/ASR 深度集成** — 无 Agent 语音朗读/听讲
7. **无视觉引导** — 没有聚光灯/激光等视觉教学工具
8. **无导出能力** — 不能导出为 PPTX/HTML/ZIP
