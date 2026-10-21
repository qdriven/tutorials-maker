# LWB Player · learn-workbuddy 互动课件播放器

把 [learn-workbuddy](../learn-workbuddy)（《从 0 手搓桌面 AI 助手》24 课，MIT）变成
**交互式教学模式**：中央 Slidev 课件 + 右侧本课要点 + 底部 AI 助教，三区联动。

```
┌────────────────────────────────────────────────┬──────────────┐
│  learn-workbuddy · 互动课件   [s01 ▾] [‹][›]     │  s01 要点      │
│                                                │  · 前置知识    │
│           Slidev 课件（16:9 等比居中）            │  · 本课机制    │
│           页码 ↔ 父页面双向同步                   │  · 常见误区    │
│                                                │  · 检查点      │
├────────────────────────────────────────────────┤  (PROGRESSION) │
│  💬 AI 助教 · 已注入本课 README + code.py 全文    │              │
│  「为什么 tool_result 要喂回去？」→ 跳到相关页      │              │
└────────────────────────────────────────────────┴──────────────┘
```

## 快速开始

```bash
pnpm install

# 1. 生成课程内容（同级 ../learn-workbuddy → src/content/lessons.json）
pnpm content:build

# 2. 构建 Slidev 课件（s01/s02 → public/slides/，dev 会按需自动补齐）
pnpm slides:build

# 3. 启动（:4013）
pnpm dev
```

课程源默认取同级目录 `../learn-workbuddy`，可用 `LWB_SOURCE` 环境变量或
`content:build -- <path>` 覆盖。

### 依赖说明

UI 基座 `@innate/ui` 通过 `file:` 指向 innate-fe monorepo：

```
file:../../../framework/innate-fe/packages/ui
```

即 `D:\innate-workspace\framework\innate-fe\packages\ui`（源码直出，
`next.config.js` 里 `transpilePackages` 负责转译）。monorepo 位置变动时只需
改 `package.json` 里这一行。

### 启用 AI 助教（可选）

不配置 key 也能完整使用（离线助教做本地关键词检索）。要启用 AI 助教：

```bash
cp .env.example .env
# 填任意 Anthropic 兼容 Provider（与教程本体同一套 provider 模型）：
#   Anthropic  claude-sonnet-4-6   （默认）
#   GLM        glm-5               https://api.z.ai/api/anthropic
#   DeepSeek   deepseek-v4-pro     https://api.deepseek.com/anthropic
#   Kimi       kimi-k2.5           https://platform.moonshot.ai/anthropic
```

`.env` 里只需 `ANTHROPIC_API_KEY` + `MODEL_ID`（+ 可选 `ANTHROPIC_BASE_URL`）。

## 三区如何联动

| 区域 | 实现 | 数据源 |
|------|------|--------|
| 中央课件 | Slidev 静态 SPA，16:9 等比盒 + 同源 iframe | `slides/*.md`（手工精编，逐课补充） |
| 右侧要点 | 服务端渲染的结构化卡片 | `lessons.json`（README 小节 + code.py `PROGRESSION`） |
| 底部助教 | CopilotKit（live）/ 本地检索（offline） | 同一份 `lessons.json`，`useCopilotReadable` 按课注入 |

联动点：

- **翻页 → 助教**：Slidev 用 `#/N` hash 路由，父页面轮询同源 iframe 的 hash，
  当前页码/标题通过 `useCopilotReadable` 注入对话上下文（AI 始终知道你看到哪页）。
- **助教 → 翻页**：`go_to_slide` action（`useCopilotAction`）让 AI 能把课件跳到相关页。
- **换课 → 全部重置**：PlayerShell 以 `lesson.id` 为 key 重建课件与对话线程。

## 结构

```
lwb-player/
├── slides/               # Slidev 课件源（每课一份，文件名 = 课程 id）
├── scripts/
│   ├── build-content.ts  # ../learn-workbuddy → src/content/lessons.json
│   └── build-slides.mjs  # 课件 → public/slides/<id>/ + slides-manifest.json
├── src/
│   ├── app/
│   │   ├── lessons/[id]/page.tsx      # 三区播放器页（静态参数 = 24 课）
│   │   └── api/copilotkit/route.ts    # CopilotKit Runtime（Anthropic 兼容多 Provider）
│   ├── components/player/             # shell / slides-pane / points-sidebar / chat-dock / offline
│   ├── lib/parse-lesson.ts            # 课程解析（纯函数，vitest 覆盖）
│   └── content/                       # 生成物（lessons.json / slides-manifest.json）
└── plugin.json           # innate web-plugin 元数据（:4013，webshell 可嵌）
```

## 扩展新课件的两种方式

1. **精编**（推荐）：仿照 `slides/s01.md` 写 `slides/s03.md`，`v-click` / 代码点击高亮 /
   mermaid 均可用；`slides:build` 后自动进入播放器。
2. **占位**：没有课件的课仍可打开 —— 右侧要点与底部助教照常工作，中央显示构建指引。

## 归属

课程内容（README / code.py / 架构图思路）来自
[adongwanai/learn-workbuddy](https://github.com/adongwanai/learn-workbuddy)（MIT），
源仓库在本目录同级 `../learn-workbuddy`。课件为原创编写。
