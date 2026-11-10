# Hello-Agents 交互式学习平台 — 方案三 + 方案四融合 · 总体方案与实施计划

> 目标：把 [datawhalechina/hello-agents](https://github.com/datawhalechina/hello-agents)（docsify 纯文档教程，16 章，CC BY-NC-SA 4.0）
> 改造为「效果好、动画化、高交互」的学习产品。
> 内容策略：**文字多的内容用动画 Slides 讲解，交互多的内容用 Playground/Notebook 实时互动**。
> 视觉基准：[agentway.dev](https://agentway.dev) 的 zen 设计体系（zinc 单色 + terminal 元数据美学），但动效强度显著增强。
> 交付物：本文档（方案/计划/架构） + `poc/index.html`（可运行 demo POC）。

---

## 1. 现状与约束（调研结论）

| 事实 | 影响 |
|---|---|
| 原站为 docsify（`index.html` + `_sidebar.md`，运行时渲染 Markdown），16 章双语文档，单章 55–100KB | 内容是纯 Markdown，机器可解析，管线改造成本低 |
| 代码全部为 Python：`hello_agents`（课程自研包，纯 Python）、`openai`、`pydantic`、`dotenv` | 实践环节绕不开 LLM API Key 与运行时问题 |
| 协议 **CC BY-NC-SA 4.0** | 改造版必须：署名 + 非商业 + 相同方式共享。禁止商业化售卖课程内容本身（可对工具/托管收费，需法务确认边界） |
| agentway.dev 设计体系（已提取完整 tokens）：zinc 单色（dark: bg `#09090b` / surface `#18181b` / border `#27272a` / fg `#fafafa`）、Inter + JetBrains Mono + PingFang SC、success `#4ade80`、terminal 打字机 + `mks-step-in` 交错入场（`cubic-bezier(.22,1,.36,1)`）、caret 闪烁 | POC 与正式版直接继承这套 token，动效在其基础上增强（流光、循环图动画、打字机、粒子、滑片转场） |

## 2. 产品形态：一课三段式

每一课由三段构成，按内容形态自动路由：

```
┌─────────────────────────────────────────────────────────┐
│  ① 讲解 Slides（文字多 → 动画演示）                        │
│     每章长文压缩为 5–8 页：概念卡、时间线、范式循环图、      │
│     对比图、公式动画。键盘/手势翻页，元素交错入场。          │
├─────────────────────────────────────────────────────────┤
│  ② 互动 Playground（交互多 → 实时互动，方案三）             │
│     范式可视化（ReAct 循环实时点亮）、在线编辑器（Monaco）、  │
│     代码提交到服务端沙箱真实执行，thought/action/observation │
│     以 SSE 事件流回放，agent "动起来"。                    │
├─────────────────────────────────────────────────────────┤
│  ③ 实验 Notebook（方案四，轻量练习）                       │
│     JupyterLite 内核（Pyodide/WASM）静态托管，免后端；      │
│     适合纯 Python、无重依赖的练习与"逐行拆解"式教学。        │
└─────────────────────────────────────────────────────────┘
```

- **讲解层零后端**：Slides 是静态产物，动画纯 CSS/SVG。
- **方案三与方案四互补**：重依赖（langchain、真实 LLM、长任务）走方案三沙箱；轻量自研代码（第 7 章自建框架恰好是纯 Python）走方案四浏览器内核，零成本、零延迟、可离线。
- **LLM 接入统一走代理**：FastAPI（或 Edge Function）持有 Key，SSE 流式转发，前端永不接触 Key；POC 中用脚本模拟 LLM 保证无 Key 可运行。

## 3. 16 章内容 → 形态映射（内容管线输入）

| 章 | 主题 | 讲解 Slides | 互动 Playground | Notebook | 说明 |
|---|---|:-:|:-:|:-:|---|
| 1 | 初识智能体 | ●● | ● | ● | 定义/构成动画 + mini agent |
| 2 | 发展史 | ●●● | | | 时间线动画（重文字） |
| 3 | LLM 基础 | ●● | ● | ●● | API 调用/参数对比 demo |
| 4 | 经典范式构建 | ●● | ●●● | ● | **核心章**：ReAct/Plan/Reflex 循环可视化对比 runner |
| 5 | 低代码平台 | ● | ○(外链) | | 平台无法沙箱化，外嵌指引 |
| 6 | 框架开发实践 | ● | ●●● | ● | 真实框架跑在方案三沙箱 |
| 7 | 自研 Agent 框架 | ●● | ●● | ●●● | **核心章**：纯 Python，Notebook 关卡式逐层构建 + 沙箱验收；代码基座参考 `references/nami-agent`（11 课递进快照，最小循环→工具→权限→上下文→Skills→MCP→子Agent→计划→记忆） |
| 8 | 记忆与检索 | ● | ●●● | ● | 记忆面板可视化（写入/检索命中动画） |
| 9 | 上下文工程 | ●● | ● | ● | token 窗口动画 |
| 10 | 通信协议 | ● | ●● | | MCP/A2A 消息流动画 |
| 11 | Agentic-RL | ●●● | | | 重文字，Slides + 图表动画 |
| 12 | 性能评估 | ● | ●●● | ● | 评估 dashboard 实时渲染 |
| 13–15 | 综合案例 | ● | ●●● | ● | 关卡式项目（旅行/DeepResearch/小镇） |
| 16 | 毕业设计 | | ●●● | | 自由项目 + 保存/分享 |

## 3.5 双受众 · CS329Z 整合 · 工具融合路线（v3 增补）

**受众分层**（不只有小白，也有开发者和想学的人）——每个课程节点打受众标签，按线选路：

| 线 | 受众 | 形态 |
|---|---|---|
| 🧰 工具线 | 全员 / 小白起步 | 零代码，用现成 Agent 产品完成真实任务 |
| 🔍 原理线 | 想学的人 | 动画 Slides 讲概念 |
| 🛠 构建线 | 开发者 | Notebook / 沙箱 / 自研框架 |
| 🚀 应用线 | 全员 | 案例 Use-Case 复刻 |

### CS329Z（19 讲）↔ Hello-Agents（16 章）整合映射

| CS329Z | 主题 | hello-agents 对应 | 整合策略 |
|---|---|---|---|
| L01 | Agent 基础与全景 | 第 1/2 章 | 合并为讲解 Slides（双源取优） |
| L02 | 面向构建者的 LLM | 第 3 章 | 同主题双源 |
| L03 | RAG | 第 8 章 | HA 为主线，CS 补工程细节 |
| L04 | 工具使用与函数调用 | 第 4 章 | 合并 |
| L05 | 框架与持久编排 | 第 6 章 | 双源对照 |
| L06 | 设计模式与上下文管理 | 第 4/9 章 | 合并 |
| L07 | Agent 记忆架构 | 第 8 章 | 合并 |
| L08 | 多 Agent 系统 | 第 15 章 | CS 理论 + HA 赛博小镇实践 |
| L09 | 系统优化 | 第 12 章（部分） | 并入评估线 |
| **L10** | Terminal-Bench 与评测工程 | 第 12 章 | **增补深度**（HA 无基准工程） |
| **L11/12** | Agent 数据 / 数据质量 | 无 | **增量专题** |
| **L13/14** | 评测基准 / LLM 裁判 | 第 12 章 | **增补深度** |
| **L15** | 安全与防护 | 无 | **增量专题** |
| L16 | 客座讲座 | — | 洞察区外链 |
| **L17** | 编程与软件 Agent | 无 | **增量专题** + 工具线理论支撑 |
| **L18** | 主动式 Agent | 无 | **增量专题** |
| L19 | 前沿与开放问题 | 第 11/16 章 | 洞察区 |

**增量专题**（HA 没有的）= 评测工程（L10/13/14）· 数据工程（L11/12）· 安全（L15）· 编程 Agent（L17）· 主动式 Agent（L18）→ 组成路线图「专题」区（对标 agentway Specials），也是洞察区的内容池。

### 工具融合：用产品讲原理（每个概念配一个"人人可试"的对照）

| 原理概念 | 工具对照 | 教学形式 |
|---|---|---|
| 任务拆解 · 自主执行 | **豆包工作**（"你说豆包干"，操作电脑交付结果） | 零代码实操（录屏 + 交互模拟）；主教材 = `references/doubao-work-guide`（58 节 JSON 课程树，使用/入门/场景三篇） |
| 深度推理 · 调研 | **DeepSeek**（深度思考模式） | 零代码对照实验 |
| 多 Agent 并行 · 交付 | **WorkBuddy**（腾讯，文档/表格/PPT 交付） | 零代码实操；主教材 = `references/workbuddy-guide` 蓝皮书（四篇 25+ 章），案例侧 = `references/awesome-workbuddy`（230+ 场景模板） |
| Agent 运行时 / harness | **DeepSeek Harness**（开源 MIT，Cordis 插件系统，兼容 40 家模型） | 小白看演示 / 开发者读源码 |
| 编程 Agent | **ZCode / mcode（MiniMax Code CLI）** | CLI 实操（开发者），零基础看演示 |
| 工具生态 | **MCP**（给豆包/WorkBuddy/ZCode 配第一个 MCP server） | 分层实操 |
| 记忆 · 知识库 | 豆包团队版 × 飞书知识库 ↔ 向量库原理 | 对照实验 |
| 评估 | Terminal-Bench 思路（CS329Z L10）评自己的 Agent | 动手小实验 |

### 三区展示（借鉴 agentway：学习路线 / 案例 / 洞察）

- **学习路线 Roadmap**：整合版 7 阶段主线（见下）；商品化结构参考 `references/aiolaola-course`（课程落地页快照）
- **案例 Use-Case**：按场景组织（办公效率 / 研究调研 / 软件开发 / 生活与账务）。素材源 = `agent-usecase/`（[agentusecases.ai](https://agentusecases.ai) 静态镜像，**1,910 个真实用例**，YAML front matter 含分类/Agent/来源，正文含 What they did / How it went / Prompt，`update.py` 可增量同步）+ `references/agency-agents-zh`（22k★ MIT，**277 个职业专家角色**含 64 个中国市场原创，支撑「按职业」维度与 MCP/Skills 生态教学）。每张案例卡五要素：场景分类 · 工具对照（豆包工作/DeepSeek/WorkBuddy/ZCode/MCP…）· 难度（零代码/轻代码/开发者）· 背后原理卡（跳课程）· 原文链接。POC 已精选 16 例上线
- **洞察 Insights**：CS329Z L19 前沿、L18 主动式 Agent、产品事件解读（豆包工作发布、DSH 开源、CodeBuddy/WorkBuddy 生态）

### 整合 Roadmap（7 阶段）

| 阶段 | 内容 | 来源 | 受众 |
|---|---|---|---|
| **S0 工具觉醒** | 豆包工作 → DeepSeek → WorkBuddy → DeepSeek Harness → ZCode/mcode+MCP | 新增 | 全员·零代码 |
| S1 原理奠基 | 初识智能体 / 发展史 / LLM 基础 | HA1-3 + CS01-02 | 全员 |
| S2 范式与框架 | 经典范式 / 低代码 / 框架实践 / 自研框架 | HA4-7 + CS04-06 | 想学的+开发者 |
| S3 高级工程 | 记忆检索 / 上下文 / 协议 / RL / 评估 | HA8-12 + CS03/07/08/09 | 进阶 |
| S4 进阶专题 | 评测工程 / 数据 / 安全 / 编程 Agent / 主动式 Agent | CS10-15/17/18 | 开发者向 |
| S5 综合案例 | 旅行助手 / DeepResearch / 赛博小镇 + Use-Case 库 | HA13-15 | 全员 |
| S6 毕业设计 | 自选课题完整交付 | HA16 + CS19 | 全员 |

POC 路线图视图已同步：新增 Stage 00 工具线 + 「🧰 工具线 · 零代码」选线 chip。

## 4. 系统架构

```
┌────────────── 前端（Vite + React/Vue + TS）───────────────┐
│ Slides 引擎: 自研 slide schema → 动画渲染器                │
│   （CSS keyframes + SVG + Web Animations API，          │
│     不用 reveal.js：转场/元素级动效需要完全掌控）           │
│ Playground: Monaco 编辑器 + 事件时间线视图 + SSE 客户端     │
│ Notebook: 嵌入 JupyterLite iframe 或直接用 Pyodide 内核    │
│ 设计系统: zen tokens（继承 agentway）+ motion 规范         │
└──────────────┬──────────────────────────┬───────────────┘
               │ SSE (事件流)              │ WASM (本地)
┌──────────────▼─────────────┐  ┌─────────▼───────────────┐
│ 方案三 · 执行服务            │  │ 方案四 · JupyterLite     │
│ FastAPI 网关                │  │ 静态托管 (GitHub Pages)  │
│  ├ LLM 代理（持Key, SSE）    │  │ Pyodide 内核 in-browser │
│  ├ 沙箱池: Docker per-run   │  │ 免后端 · 免Key场景       │
│  │   (E2B/Firecracker 可选) │  │ 纯Python练习/自研框架    │
│  ├ 预装 hello_agents 镜像    │  └─────────────────────────┘
│  ├ 事件采集器: 把 agent 运行 │
│  │   的 thought/tool/obs    │
│  │   包装为 SSE 事件协议     │
│  └ 配额/防滥用 (rate limit) │
└─────────────────────────────┘
```

**SSE 事件协议（Playground 实时感的核心）**：

```jsonc
// POST /runs  →  GET /runs/{id}/events (text/event-stream)
{"t":"run_start","run_id":"...","goal":"..."}
{"t":"phase","phase":"reason"}                       // 驱动循环图点亮
{"t":"thought","text":"…","stream":true}             // 打字机逐字
{"t":"action","tool":"weather.get","args":{…}}       // 工具卡弹入
{"t":"observation","content":"…"}                    // 结果卡弹入
{"t":"phase","phase":"done"}
{"t":"answer","text":"…"}
{"t":"run_end","usage":{"tokens":1234}}
```

前端所有可视化（循环图、时间线、终端）都是该事件流的**纯渲染器**——同一份代码既能回放（POC 的模拟模式），也能直播（真实沙箱）。

**内容管线（一次性 + 增量）**：
0. **双内容源**：主线 = `references/hello-agents/docs/`（16 章）；题材补充 = `references/cs329z-chinese/`（斯坦福 CS329Z 中文版 19 讲，提供评测工程/数据/安全/主动式 Agent 等增量专题与同主题对照讲法），来源与许可见 `references/README.md`；
1. `md → AST（remark）` 解析原章节；
2. 规则 + LLM 辅助：长段落压缩为 slide 元数据（标题/要点/图示类型），代码块提取为 playground/notebook 资产；
3. 人工审校 slide schema（YAML）→ 构建期渲染为静态 JSON；
4. 原 md 全文保留在"原文"抽屉中（协议要求保留署名与内容完整性，且利于 SEO/对照）。

## 5. 设计系统与动效规范（继承 agentway zen + 增强）

| 层 | 规范 |
|---|---|
| 色彩 | zinc 单色体系（见 §1 tokens），唯一功能色 `#4ade80`（agent 活动态/成功），错误 `#f87171`，思考态 `#fbbf24` |
| 字体 | Inter（UI）/ JetBrains Mono（代码·终端）/ PingFang SC（中文） |
| 动效 | 入场交错：`cubic-bezier(.22,1,.36,1)` 450–550ms，子元素 60–90ms 级联；打字机 + caret `step-end` 闪烁；循环图：路径流光 `stroke-dashoffset` + 活动节点 glow（`drop-shadow`）；滑片转场：fade + translateX 40px；全程尊重 `prefers-reduced-motion` |
| 布局 | 三视图壳（讲解/互动/实验），桌面双栏（图左终端右），<900px 纵向堆叠 |

## 6. 实施计划（4 个里程碑）

| 里程碑 | 周期 | 交付 |
|---|---|---|
| **M0 · POC（本次）** | 已完成 | `poc/index.html`：三视图壳 + 动画 Slides（第 1 章浓缩）+ ReAct 实时可视化（脚本模拟 LLM）+ Pyodide Notebook（免 Key 真实执行）。验证：动效质量、事件流渲染器可行性、WASM 执行可行性 |
| **M1 · 内容管线 + Slides 引擎** | 第 1–2 周 | md→slide-schema 脚本 + LLM 压缩流水线；第 1–4 章上线；Vite 工程 + zen 设计系统组件库 |
| **M2 · 方案四上线** | 第 3 周 | JupyterLite 静态站 + 第 7 章「自研框架」关卡式 notebook（每关可运行、自动校验）；LLM BYOK（localStorage Key）可选接入真实 API |
| **M3 · 方案三上线** | 第 4–6 周 | FastAPI 网关 + Docker 沙箱池 + hello_agents 镜像 + SSE 事件协议 + Monaco Playground；第 4/6/8 章互动化；配额与防滥用 |
| **M4 · 全量内容 + 打磨** | 第 7–8 周 | 16 章全映射完成；进度保存（localStorage/登录可选）；发布 + 协议署名页 |

**人力估算**：1–2 名全栈 + 1 名设计（兼職可）。单人全职约 6–8 周。
**运行成本**（M3 后）：沙箱容器 ~¥200–400/月（4C8G 单机池，课程规模足够）+ LLM token 按量（BYOK 可转嫁）。

## 7. 风险与对策

| 风险 | 对策 |
|---|---|
| Pyodide 无法运行 openai SDK 等重依赖 | 已在架构上规避：重依赖一律走方案三沙箱；Notebook 仅承接纯 Python（课程第 7 章自研框架已验证可行） |
| LLM Key 泄露 | 前端零 Key；代理层持有；BYOK 明确提示仅存 localStorage |
| 沙箱滥用/费用失控 | 速率限制 + 单 run 超时(≤60s) + 匿名配额 + BYOK 用户放宽 |
| CC BY-NC-SA 合规 | 每页页脚署名 + 协议链接 + 原文入口；不商业化内容本身 |
| Slides 压缩失真 | LLM 初稿 + 人工审校 schema；原文抽屉兜底 |

## 8. 导航与索引设计（v2 增补：roadmap + dictionary）

参考 [agentway.dev/zh/curriculum](https://agentway.dev/zh/curriculum) 与 [AI Hero](https://www.aihero.dev) 后，POC 新增两个全局视图，学习动线升级为：**路线图 → 单课三段式 → 词典回查**。

| 视图 | 借鉴 | 设计要点 |
|---|---|---|
| 🗺 学习路线 Roadmap（默认落地页） | agentway curriculum | 5 阶段分组 + 纵向节点连线；节点含编号/标题/一句话摘要/形态徽章(📖⚡🧪)/时长/进度状态(✓ 已完成 · ◎ 进行中)；顶部统计摘要行（5 部分 · 16 章 · 9 Playground · 8 Notebook · 4 项目）；正式版登录后进度持久化（M4） |
| └ 按目标选线 | AI Hero「Learn 导航地图」 | 3 条目标路线 chips：原理线 / 构建线 / 应用线 —— 选中后非本线路节点变暗（dim），按需聚焦 |
| 📚 术语词典 AI Dictionary | 词典式索引 | 16 个关键术语卡（中英对照 + 一句话定义），关键字即时过滤 + 7 个分类 chips；每张卡的「第 N 章 →」按钮直接跳转该章对应模块视图，形成"读到不懂→查→跳回去动手"的闭环 |

正式版中词典由内容管线自动生成：术语表来自各章 LLM 抽取 + 人工审校，跳转锚点由章节映射表驱动。

## 9. POC（`poc/index.html`）覆盖的验证点

1. **zen 视觉体系 + 增强动效**：滑片转场/交错入场/打字机/循环图流光是否达到"效果好"标准；
2. **事件流渲染器**：模拟 SSE 脚本驱动终端与循环图联动——与正式版同一渲染契约；
3. **方案四可行性**：Pyodide 在浏览器真实执行 Python mini-agent，stdout 实时流式回显；
4. **三段式一课的信息架构**是否成立（Slides → Playground → Notebook 的学习动线）。

运行方式：`cd poc && python3 -m http.server 4173` → 打开 `http://localhost:4173`（Pyodide 需联网加载 CDN，其余全部离线可用）。
