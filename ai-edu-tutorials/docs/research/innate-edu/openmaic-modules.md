# OpenMAIC 模块分析

**源码路径:** `D:\copy-modify\ai-edu\OpenMAIC`
**版本:** 0.3.0 | **License:** MIT
**技术栈:** Next.js 16, React 19, TypeScript 5, LangGraph 1.1, Tailwind CSS 4, Zustand, Vercel AI SDK 6

---

## 一句话定位

**AI 驱动的互动课堂生成与播放系统。** 用户输入主题 + PDF，自动产出多角色、多场景的可播课堂。

---

## 模块总览

| 模块 | 路径 | 核心职责 |
|---|---|---|
| 生成管线 | `lib/generation/` | 两阶段课堂生成：Outline → Scene |
| 多 Agent 编排 | `lib/orchestration/` | LangGraph Director 驱动教师/助教/学生角色对话 |
| 播放引擎 | `lib/playback/` | 状态机驱动课堂播放（idle→playing→paused + live 讨论） |
| Action 引擎 | `lib/action/` | 28+ 种动作执行：speech、白板、聚光灯、激光、视频播放等 |
| AI Provider | `lib/ai/` | 15+ LLM 提供商统一抽象 |
| 音频系统 | `lib/audio/` | TTS（10 提供商）+ ASR（4 提供商）|
| PDF 处理 | `lib/pdf/` | unpdf（免费内置）+ MinerU（高级：表格/公式/OCR）|
| 媒体生成 | `lib/media/` | 13 个图像/视频提供商适配器 |
| 导出系统 | `lib/export/` | PPTX、HTML、ZIP 离线包导出 |
| PBL 项目制学习 | `lib/pbl/` | v2 多 Agent 项目制学习（规划/指导/评估/模拟）|
| 白板 | `components/whiteboard/` | SVG 实时白板：文字、形状、图表、LaTeX、代码 |
| Chat 对话 | `lib/chat/` | 前端驱动的多 Agent 循环对话 |
| 课程 DSL | `packages/@openmaic/dsl/` | Stage/Scene/Slide/Action 类型定义 |
| 前端 UI | `components/` | 幻灯片渲染器、场景渲染器、设置面板、Agent 配置 |
| API 层 | `app/api/` | 20+ API 路由（生成、TTS、ASR、搜索、Quiz 等）|
| Store 状态 | `lib/store/` | Zustand 全局状态管理 |
| i18n | `lib/i18n/` | 8 种语言 |

---

## 详细模块分析

### 1. 生成管线 (`lib/generation/`)

**核心文件:** `outline-generator.ts`, `scene-generator.ts`（2007 行，最大文件）, `pipeline-runner.ts`

**两阶段流程:**
```
用户输入（文本 + PDF）
    ↓
Stage 1: Outline Generator → 结构化场景大纲
    ↓
Stage 2: Scene Generator → 完整场景内容
    ├── slide（幻灯片：文字、图片、形状、表格、图表）
    ├── quiz（测验题：选择题、评分 rubric）
    ├── interactive（HTML iframe 交互：3D/仿真/游戏/思维导图/编程）
    └── pbl（项目制学习配置）
```

**每个场景附带 Actions:**
- `speech` — TTS 朗读
- `whiteboard draw` — 白板绘制（text/shape/chart/latex/table/line/code）
- `spotlight` / `laser` — 视觉引导
- `play_video` — 视频播放
- `widget_*` — 交互组件控制

**关键特点:**
- 支持增量生成（中断后续传）
- JSON 修复容错（`json-repair.ts`）
- 交互式场景后处理（`interactive-post-processor.ts`）

### 2. 多 Agent 编排 (`lib/orchestration/`)

**核心文件:** `director-graph.ts`（LangGraph StateGraph）, `prompt-builder.ts`, `tool-schemas.ts`

**三种角色:**

| 角色 | 职责 | 权限 |
|---|---|---|
| **Teacher** | 控制课堂节奏、讲解概念、提问 | 全部动作（白板/聚光灯/激光/TTS）|
| **Assistant** | 补充支持、重新表述 | 有限白板 |
| **Student** | 参与讨论、提问 | 仅受邀时使用白板，回答简短（1-2 句）|

**编排架构:**
```
START → Director → (end) → END
         Director → (next) → Agent_Generate → END
```
- 单 Agent：纯代码逻辑
- 多 Agent：LLM 决定谁发言

**Agent 由 `/api/generate/agent-profiles/` 动态生成**，包含：id、name、role、priority、persona、avatar、color。

### 3. 播放引擎 (`lib/playback/`)

**核心文件:** `engine.ts`（757 行）

**状态机:**
```
idle → playing → paused → playing（循环）
               ↓
            live（实时讨论模式）
```

**功能:**
- 逐场景逐 action 播放
- 支持暂停/恢复
- Live 模式：教师主动发起讨论，圆桌辩论
- 用户打断处理（`handleUserInterrupt`）
- 讨论确认（`confirmDiscussion`）

### 4. Action 引擎 (`lib/action/engine.ts`)

**720 行，统一执行层。** 28+ 种动作类型:

| 类别 | 动作 |
|---|---|
| 视觉引导 | `spotlight`, `laser` |
| 语音 | `speech`（TTS 流式播放）|
| 白板 | `whiteboard draw text/shape/chart/latex/table/line/code`, `wb_edit_code`, `wb_delete`, `wb_clear` |
| 媒体 | `play_video` |
| 交互 | `widget_highlight`, `widget_set_state`, `widget_annotation`, `widget_reveal` |

**在线（流式）和离线（回放）路径共享同一引擎。**

### 5. AI Provider 系统 (`lib/ai/`)

**核心文件:** `providers.ts`（1717 行）

**支持 15+ 提供商:**
OpenAI, Anthropic, Google, DeepSeek, Qwen, Kimi, MiniMax, GLM, Doubao, OpenRouter, Grok, Tencent, Xiaomi, SiliconFlow, Ollama, Lemonade

**功能:**
- 统一接口抽象
- 模型能力元数据（`model-metadata.ts`）
- 推理模式配置（`thinking-config.ts`）
- Reasoning SSE 处理

### 6. 音频系统 (`lib/audio/`)

**TTS 提供商（10 个）:**
OpenAI, Azure, GLM, Qwen, MiniMax, Doubao, ElevenLabs, VoxCPM2, Lemonade, Browser Native

**ASR 提供商（4 个）:**
OpenAI Whisper, Qwen ASR, Azure STT, Browser Native

**特色:** VoxCPM2 声音克隆、Azure 语音列表管理、浏览器原生 TTS 预览。

### 7. PDF 处理 (`lib/pdf/`)

**两个引擎:**
| 引擎 | 特点 |
|---|---|
| **unpdf** | 免费内置，基础文本提取 |
| **MinerU** | 高级：表格识别、公式解析、OCR、版面分析 |

**流程:** PDF 上传 → 文本 + 图像 → 喂入 Stage 1 Outline Generator

### 8. PBL 项目制学习 (`lib/pbl/`)

**v2 多 Agent 系统:**

| Agent | 职责 |
|---|---|
| `planner` | 项目规划 |
| `instructor` | AI 导师指导 |
| `evaluator` | 评估打分 |
| `simulator` | 模拟执行 |

**支持 MCP（Model Context Protocol）集成。**

### 9. 导出系统 (`lib/export/`)

| 格式 | 说明 |
|---|---|
| **PPTX** | PowerPoint 导出（含 LaTeX→OMML 转换）|
| **HTML** | 交互式 HTML 离线包 |
| **ZIP** | 课堂完整 ZIP（含资源内联）|

### 10. 课程 DSL (`packages/@openmaic/dsl/`)

**类型定义（单一数据源）:**
- `Stage` — 完整课堂
- `Scene` — 场景（slide/quiz/interactive/pbl）
- `Slide` — 幻灯片元素
- `Action` — 动作定义
- `QuizQuestion` — 测验题

**另有:** `@openmaic/importer`（导入/导出）、`@openmaic/renderer`（独立渲染器，已发 npm）

---

## 课堂播放数据流

```
用户输入（文本 + PDF）
    ↓
[PDF Parser] ─ lib/pdf/
    ↓
[Generation Pipeline] ─ lib/generation/
  Stage 1: Outline → Scene Outlines
  Stage 2: Scene  → Full Scenes（含 Actions）
    ↓
[Stage Store] ─ lib/store/stage.ts（Zustand）
    ↓
[Playback Engine] ─ lib/playback/engine.ts（状态机）
    ↓
[Action Engine] ─ lib/action/engine.ts（28+ 动作）
    ↓
[UI Renderers] ─ slide-renderer + scene-renderers + whiteboard
    ↓
[Multi-Agent Chat] ─ lib/orchestration/（LangGraph）+ lib/chat/
    ↓
[Audio] ─ lib/audio/（TTS + ASR）
    ↓
[Export] ─ lib/export/（PPTX / HTML / ZIP）
```

---

## OpenMAIC 的核心优势

1. **课堂生成自动化** — 从 PDF/文本自动生成多场景课堂，无需人工编排
2. **多角色对话** — 教师/助教/学生自动生成，有独立人格和行为模式
3. **丰富的交互场景** — 3D 可视化、仿真、游戏、思维导图、在线编程
4. **白板系统** — Agent 实时在白板上绘制图表、公式、代码
5. **多模态** — TTS 讲课、ASR 听讲、图像/视频生成
6. **完整导出** — PPTX、HTML、ZIP 离线包
7. **PBL 项目制学习** — v2 多 Agent 协作项目制教学

## OpenMAIC 的不足（相对于 DeepTutor）

1. **无知识库/KB 系统** — 课堂是生成式的，不基于持久化知识库检索
2. **无掌握度/学习追踪** — 缺乏 mastery scoring、spaced repetition
3. **无三层记忆系统** — 没有 L1/L2/L3 记忆持久化
4. **无 Living Book** — 没有交互式阅读体验
5. **无 IM 渠道集成** — 不能通过飞书/Telegram/Slack 等触达
6. **无 Co-Writer** — 没有协作写作功能
7. **单次生成** — 生成后课堂内容固定，缺乏基于学习进度的自适应调整
