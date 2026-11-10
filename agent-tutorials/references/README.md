# References · 三个参考源的统一目录

本目录集中管理项目的三个参考源，全部为**可更新**结构：git 仓库用 `git pull`，静态快照按说明重抓。
每个源与本项目的对应关系见下表；许可约束见文末（**重要**）。

```
references/
├── hello-agents/    → 内容源：课程正文（sparse clone，仅 Markdown，图片未检出）
│   └── docs/          chapter1-16/*.md（中英双语 38 个 .md）、_sidebar.md、前言.md
├── agentway/        → 设计源：视觉体系参考
│   ├── DESIGN-TOKENS.md   ★ 提炼层：tokens/动效/模式（改版时对照更新这份）
│   └── site-snapshot/     agentway.dev 的 Next.js 静态抓取副本（zh/ + pricing/）
├── aihero/          → 形式源：AI Hero 开源课程材料（Matt Pocock）
│   ├── courses/         课程内容（md + 示例）
│   ├── articles/        免费教程文章
│   └── examples/        代码示例
├── cs329z-chinese/  → 题材源：斯坦福 CS329Z《Engineering AI Agents》中文版
│   ├── 01–19 讲 .md     19 讲完整中文教程（根目录直读）
│   ├── exercises/       4 项实践：HW1 从零搭 Agent Harness / HW2 评测 Agent / 论文复现 / 学期项目
│   ├── docs/            编辑注记与进度
│   └── tools/           其 md→HTML 阅读器构建脚本（排版参考）
└── awesome-workbuddy/ → 工具源：WorkBuddy 官方用例库（EvoLinkAI，MIT）
    ├── README.zh-CN.md    230+ 案例，按 30 种职业 + 7 类任务组织
    ├── usecases.md        100 案例任务类型详解
    └── use-cases/whitepaper/  OpenClaw 100 案例白皮书

workbuddy-guide/   → 教材源：WorkBuddy 实战蓝皮书（AlephAITech，MIT，3.8k★）
    └── docs/bluebook/      四篇 25+ 章系统教程（sparse，仅 Markdown，55 个 .md）
        ├── 第一篇 使用手册   安装 → 界面 → 第一个任务 → Skill → 专家团 → 连接器 → 飞书/API → 自动化
        ├── 第二篇 案例篇     Office 三件套 / 文件整理 / 远程控制 / 资讯整合 / 会议 / 投资分析…
        ├── 第三篇 进阶篇     打造 Skill / 多 Agent 系统设计 / 自动化可靠性
        └── 第四篇 岗位与行业落地

doubao-work-guide/ → 教材源：豆包工作系统化中文实践指南（AlephAITech，MIT，238★）
    └── site/content/site-content.json   58 节课程树（飞书导出 JSON，非 Markdown）
        ├── 使用篇｜先把豆包工作用起来   安装 → 界面 → 第一个任务 → Skill → 连接器 → 定时任务 → 多 Agent 小队 → 指令模板
        ├── 入门篇｜从一些小事开始       Word/Excel/PPT · 整理桌面 · 生活琐事
        └── 场景篇｜放进真实工作         个人提效 / 自媒体 / 知识管理 / 电商 / 金融

nami-agent/        → 构建线主教材：NamiAgent 最小 Agent 实现（aa1143，代码 MIT / 文档 CC BY-NC 4.0）
    ├── lessons/lesson-01…11   每课一个可运行快照：100 行最小循环 → 工具 → 权限 → 上下文 → Skills → MCP → 子Agent → 计划 → 记忆
    ├── docs/01–15             课程文档 + 主流 Agent 拆解（Claude Code / Codex / pi / Grok Bot）
    ├── web/                   本地网页端：左看思考与工具调用，右看完整上下文
    └── all-tutorials.md       全部教程合集单文件（278KB）

agency-agents-zh/  → 生态素材：277 个即插即用 AI 专家角色（jnMetaCode，MIT，22k★）
    ├── README/AGENT-LIST/CATALOG  角色总目录（20 部门 × 277 角色，含 64 个中国市场原创：小红书/抖音/微信/飞书…）
    ├── engineering/design/finance…  按部门分目录的角色 Prompt
    └── 用途：案例区「按职业」维度扩充、路线图职业化规划参考、MCP/Skills 生态教学素材

aiolaola-course/   → 规划参考：aiolaola《AI Agent 实战》课程页镜像（Next.js SSR 快照）
    ├── course-ai-agency.html   课程落地页（58KB，含渲染内容）
    └── assets/                 页面 CSS
    用途：课程商品化结构（大纲/定价/人群话术）参考，用于路线图与案例区的营销层规划
```

## 各源 → 本项目的映射

| 源 | 用在哪 | 具体对应 |
|---|---|---|
| hello-agents | 内容管线输入 | §内容管线：md → AST → slide-schema / playground 资产 / notebook；16 章映射表见 `../PLAN.md` §3；POC 各视图文案、Notebook 的 mini ReAct 代码均取材于 `docs/chapter4|chapter7` |
| agentway | 设计系统 | `poc/index.html` 的全部 CSS 变量、字体栈、动效曲线（`cubic-bezier(.22,1,.36,1)`）、terminal 组件样式；路线图视图的信息结构；提炼层为 `agentway/DESIGN-TOKENS.md` |
| aihero | 教学形式参考 | 「按目标选路线」的交互地图（POC 路线图的路线路 chips）；课程组织方式（课程→练习→项目）；邮件课/关卡式推进的产品思路（M2 关卡式 Notebook 的参照） |
| cs329z-chinese | 内容题材（第二内容源） | 与 hello-agents 互补：**评测工程**（10/13/14 讲）支撑 POC 第 12 章评估 Dashboard；**数据/安全/主动式 Agent/编程 Agent**（11/12/15/17/18 讲）是 hello-agents 没有的增量题材，适合做成路线图「专题」节点（对标 agentway 的 Specials）；`exercises/HW1` 与第 7 章自研框架高度契合，是关卡式练习的任务设计参考；同一主题的双源讲法（如 RAG：03 讲 vs 第 8 章）可供 slides 压缩时对照取优 |
| awesome-workbuddy | 工具线教材 + 案例区 WorkBuddy 侧素材 | 路线图 Stage 00·T3「WorkBuddy」的直接教材（230+ 即用场景模板：财务对账/简历筛选/合同审查/税务速报等 30 职业分类）；案例 Use-Case 视图的 WorkBuddy 官方面板；白皮书可提炼「按任务类型」的案例组织法 |
| workbuddy-guide | T3 主教材 + 工具线课程结构范本 | 蓝皮书四篇 = 「使用手册 → 案例篇 → 进阶篇 → 岗位落地」，与我们的工具线教学法（先会用→案例→进阶→按岗位）完全同构，可直接作为 T3 课程的章节骨架；第 24 章「多 Agent 系统设计」、第 25 章「自动化可靠性」可衔接 CS329Z L08/L10；「每完成一章至少留下一个可复用提示词/模板」的学习法值得沿用到全部工具课 |
| doubao-work-guide | T1 主教材（豆包工作） | 与 workbuddy-guide 同一团队（AlephAITech）、同一教学结构（使用篇→入门篇→场景篇）；58 节含连接器/定时任务/多 Agent 小队/指令模板——「指令模板随手复制」一节可直接变成课程随堂练习；**内容是飞书导出 JSON**（site/content/site-content.json，按 parentToken 树组织），管线需先写 JSON→md 展平脚本（~50 行） |
| nami-agent | **构建线核心教材**（第 7 章自研框架 / Notebook 关卡的代码基座） | 11 课递进（最小循环→工具→权限→上下文→Skills→MCP→子Agent→计划→记忆），每课可运行快照 + 相邻课 diff，正是 M2「关卡式 Notebook」的实现范本；只用 openai 一个包 + 假模型测试（免 Key）↔ 我们 Notebook 视图同一哲学；`web/` 网页端「左侧思考/工具调用、右侧完整上下文」与 Playground 事件流渲染器同理念，是正式版上下文可视化面板的参照；docs 12–15 拆解 Claude Code/Codex/pi/Grok Bot → 工具线 T5 的原理章节素材；姊妹项目 NamiGPT（讲模型本身）可按需补入 |

## 更新方式

```bash
cd hello-agents-playground/references   # 以下命令均在 references 目录内执行

# 1. hello-agents（sparse 浅克隆，仓库全量 314MB，勿全量拉取）
#    当前模式：仅 Markdown 正文（38 个 .md，含 16 章中英双语）——图片未检出以控制体积
git -C hello-agents pull --depth 1 origin main
#    需要章节配图时按需追加（图片体积大，首次拉取较慢）：
git -C hello-agents sparse-checkout add 'docs/images/**'
#    查看当前模式：git -C hello-agents sparse-checkout list

# 2. aihero
git -C aihero pull

# 3. cs329z-chinese（全量浅克隆，仅 1.7MB）
git -C cs329z-chinese pull

# 4. awesome-workbuddy（全量浅克隆，MIT）
git -C awesome-workbuddy pull

# 5. workbuddy-guide（sparse 浅克隆，仓库全量 160MB，仅取 docs Markdown 55 个 .md）
git -C workbuddy-guide pull --depth 1 origin main
#    需要站点图片时：git -C workbuddy-guide sparse-checkout add 'docs/public/**'

# 6. doubao-work-guide（sparse 浅克隆，仓库全量 413MB，仅取内容 JSON + README）
git -C doubao-work-guide pull --depth 1 origin main
#    内容在 site/content/site-content.json（58 节飞书导出树），管线读取前先跑 JSON→md 展平

# 7. nami-agent（全量浅克隆，2.6MB；代码 MIT / 文档 CC BY-NC 4.0）
git -C nami-agent pull --depth 1 origin main

# 8. agency-agents-zh（全量浅克隆，12MB，MIT）
git -C agency-agents-zh pull --depth 1 origin main

# 9. aiolaola-course（手工快照，无自动更新；需要时重跑抓取命令覆盖 HTML/CSS）

# 10. agentway（无公开源码仓库，快照 + 手工维护提炼层）
#    a) 重新抓取：浏览器另存或 wget 镜像 agentway.dev → 覆盖 site-snapshot/
#    b) 对照新快照更新 DESIGN-TOKENS.md（tokens 变化通常一眼可辨）
```

## 许可约束（重要）

| 源 | 许可 | 对我们的约束 |
|---|---|---|
| hello-agents | **CC BY-NC-SA 4.0** | 改造版必须署名 + 非商业 + 相同方式共享；`poc/index.html` 页脚已含署名 |
| aihero | **CC BY-NC-SA 4.0** | 仅作形式/教学设计参考，**不要复制其课程文本**；借鉴结构不借鉴文字 |
| cs329z-chinese | **未声明许可**（仓库无 LICENSE） | 默认按"保留所有权利"对待：仅内部题材参考与知识点对照，**成稿内容须重写而非摘抄**，不对外分发其原文 |
| awesome-workbuddy | **MIT** | 可自由引用案例模板；对外展示时保留出处链接 |
| workbuddy-guide | **MIT** | 可引用/改编教程内容，保留出处；成稿建议重写为课程语气 |
| doubao-work-guide | **MIT** | 可引用/改编教程内容，保留出处；成稿建议重写为课程语气 |
| nami-agent | 代码 **MIT** / 文档 **CC BY-NC 4.0** | lesson 代码可自由复用（如改造成 Notebook 关卡）；教程文档引用需署名 + 非商业，成稿重写为课程语气 |
| agency-agents-zh | **MIT** | 角色库可自由引用（保留出处）；案例区/职业线索可直接采用 |
| aiolaola-course | 站点快照，版权归 aiolaola | 仅限本地规划参考（课程结构/话术），**不得部署或摘抄文案** |
| agentway 快照 | 站点内容版权归 AgentWay 团队 | 仅限本地设计参考，**不得部署/再分发**快照文件；视觉上做"同体系、非克隆"的差异化 |

## 备注

- `hello-agents/` 是上游仓库的 sparse 浅克隆，**不要在其中提交任何东西**；对内容的改造产物一律放在 `hello-agents-playground/` 项目侧（pipeline 输出目录，见 PLAN.md §4）
- `.gitignore` 已忽略整个 `references/`，外部源不进本项目版本库
