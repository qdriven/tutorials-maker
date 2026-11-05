# 03 · Top 10「简单代码仓库 → 学习产物」Skill 调研

> 调研日期：2026-11-05
> 数据来源：GitHub Search、GitHub API、各仓库 README / `SKILL.md` / `references/`。
> **没有实际安装并跑完所有 Skill**；本文评价基于仓库文档、脚本、示例与输出形态。star 数是当日快照，只作采用度信号，不作质量证明。

## 1. 范围：什么叫「简单代码仓库 SKILL」

本文把目标 Skill 限定为：

> **输入是一个小型 Web 应用代码仓库，输出是可学习、可交互、可验证的教程/解释产物。**

因此排除三类：

- **通用代码助手**（只回答代码问题，不产出学习产物）；
- **大型系统/研究仓库专用**（输入是训练框架、编译器、分布式系统，不是简单 Web 应用）；
- **纯文档生成器**（只输出 Markdown，不面向学习者）。

「简单」不是指代码行数少，而是指：

- 单一 Web 应用，有清晰的入口、页面/组件、状态和样式；
- 没有复杂的基础设施（K8s、训练集群、数据库集群）；
- 适合用一页或一组页面讲清楚；
- 最好包含动画/交互，因为这是「文字动画比较多」的目标场景。

## 2. 评分维度

每个 Skill 按 5 个维度打 0–5 分。评分是面向 tutorials-maker 的判断，不是客观基准。

| 维度 | 含义 | 为什么重要 |
|---|---|---|
| **A. 仓库理解 / 证据** | 是否真的读代码、能否定位到 `file:line`、是否有事实核查 | 教育内容最怕「看起来对」 |
| **B. 教学表达 / 受众适配** | 是否区分读者水平、是否有叙事、类比、练习、测验 | tutorials-maker 面向非专家 |
| **C. 动效 / 文字动画** | 是否支持步骤动画、滚动叙事、逐字/逐行、可降级 | 目标场景是动画多的 Web 应用 |
| **D. 验证 / 质量门** | schema、渲染回归、事实核查、链接检查、浏览器检查 | 决定内容能不能规模化 |
| **E. 可采用性** | 许可证、安装成本、依赖、输出可移植性、维护状态 | 决定能不能放进产品 |

**加权匹配度**（用于排序）：

```
匹配度 = B×0.40 + A×0.20 + C×0.20 + D×0.10 + E×0.10
```

教学表达权重最高，因为 tutorials-maker 的核心价值是「让人学会」，不是「画得好看」。仓库证据和动效次之；验证和采用成本权重较低，但它们决定长期成本。

## 3. Top 10 总表

| # | Skill | 仓库 | Star | 许可 | 最近推送 | 输出 | A | B | C | D | E | 匹配度 |
|---:|---|---|---:|---|---|---:|---:|---:|---:|---:|---:|---:|
| 1 | **teachable-code** | [ywEdAi/teachable-code](https://github.com/ywEdAi/teachable-code) | 10 | 无 | 2026-11-04 | 单页交互课程（2D/3D） | 5 | 5 | 3 | 5 | 2 | **4.3** |
| 2 | **archify** | [tt-a1i/archify](https://github.com/tt-a1i/archify) | 93,669 | Apache-2.0 | 2026-11-05 | 独立 HTML 图/单页解释 | 4 | 4 | 4 | 5 | 5 | **4.2** |
| 3 | **explain-this** | [analyticalmonk/explain-this](https://github.com/analyticalmonk/explain-this) | 22 | MIT | 2026-10-26 | 单文件交互解释页 | 5 | 4 | 3 | 5 | 4 | **4.1** |
| 4 | **codebase-to-course** | [zarazhangrui/codebase-to-course](https://github.com/zarazhangrui/codebase-to-course) | 5,769 | 无 | 2026-03-30 | 滚动式 HTML 课程 | 4 | 5 | 3 | 2 | 2 | **3.8** |
| 5 | **teachable-figures** | [ywEdAi/teachable-figures](https://github.com/ywEdAi/teachable-figures) | 275 | 自定义/未识别 | 2026-11-03 | 交互教学图（2D/3D） | 3 | 4 | 5 | 4 | 2 | **3.8** |
| 6 | **answer-me-with-html** | [QingYunA/answer-me-with-html](https://github.com/QingYunA/answer-me-with-html) | 5,324 | MIT | 2026-11-05 | 单页 HTML 解释 | 3 | 4 | 3 | 4 | 5 | **3.7** |
| 7 | **Understand-Anything** | [Egonex-AI/Understand-Anything](https://github.com/Egonex-AI/Understand-Anything) | 90,808 | MIT | 2026-10-26 | 知识图谱 + 仪表盘 | 4 | 3 | 2 | 3 | 5 | **3.2** |
| 8 | **codebase-to-course-v2** | [agentictaskx/codebase-to-course-v2](https://github.com/agentictaskx/codebase-to-course-v2) | 5 | 无 | 2026-04-13 | schema 驱动的 HTML 课程 | 4 | 3 | 3 | 2 | 2 | **3.0** |
| 9 | **deepwiki-skill** | [natsu1211/deepwiki-skill](https://github.com/natsu1211/deepwiki-skill) | 42 | MIT | 2026-06-24 | Wiki 风格 Markdown + Mermaid | 4 | 2 | 1 | 4 | 4 | **2.6** |
| 10 | **walkthrough** | [alexanderop/walkthrough](https://github.com/alexanderop/walkthrough) | 149 | 无 | 2026-03-23 | 可点击 Mermaid 的 HTML | 3 | 3 | 1 | 1 | 3 | **2.4** |

> 「匹配度」保留一位小数，满分 5。分数只用于排序，不替代逐项判断。

### 最佳单项

| 奖项 | Skill | 理由 |
|---|---|---|
| 最佳课程化 | **codebase-to-course** | 最懂「非技术读者」：代码↔英文对照、滚动模块、测验、50% 视觉占比 |
| 最佳证据链 | **teachable-code** | 固定 commit、`file:line` 引用、真实数据、浏览器检查、诚实标注「没跑什么」 |
| 最佳图形输出 | **archify** | 独立 HTML、深浅色、动效、导出、CLI 校验；93k star 不是偶然 |
| 最佳验证架构 | **explain-this** | 强制 fact-check gate，把「核查」做成阻塞步骤 |
| 最佳单页效率 | **answer-me-with-html** | 只写 Markdown 草稿，CLI 负责布局/颜色/坐标；输出稳定、成本低 |
| 最佳机制动画 | **teachable-figures** | `predict → try → explain`，2D/3D/机械装配都能做 |
| 最佳知识图谱 | **Understand-Anything** | 90k star，多 Skill 插件，图谱/问答/入职/差异全覆盖 |
| 最佳 Wiki 管线 | **deepwiki-skill** | 证据引用 + Mermaid 校验 + 增量同步，适合做参考文档 |
| 最佳轻量上手 | **walkthrough** | 2 分钟心智模型，Mermaid 点击式，生成快 |

## 4. 逐项拆解

### 1) teachable-code

- **仓库**：[ywEdAi/teachable-code](https://github.com/ywEdAi/teachable-code) · 10 star · 无 LICENSE · 2026-11-04 推送
- **它做什么**：把任意代码仓库变成一页交互课程。输出是一个自包含 HTML，画布承载「系统地图 + 当前步骤 + 源码/数据」，文字在侧栏按需出现。
- **四种能力**：理解（understanding）、复现（reproduction）、干预（intervention）、迁移（transfer/discovery）。理解是底线，后三种仍保留全局地图和流程。
- **工作流**：`classify_repo.py` 判断仓库类型 → 询问学习者目标/基础 → 固定 commit、`inventory.py` 扫描 → 尽可能运行真实代码、保存 `runs/*.json` → 写 `graphs/*.js` → `build.py` 校验每个 `file:line` 和边 → `check.py` 用无头浏览器播放每个场景并截图 → 发布。
- **强在哪**：
  - **证据优先**：代码引用在构建时从固定 commit 按行号抽取；数字标注来源（本机运行/仓库结果/测试 mock/模板/合成）。
  - **验证最完整**：构建期校验引用与 id；运行期播放所有场景、截图、检查手机宽度横向溢出。
  - **教学模型成熟**：先问目标和先验知识；页面记录访问/预测/问题，可导出 JSON 供下一轮迭代。
  - **2D/3D 分野清楚**：张量和训练循环用 3D，应用和工具调用用 2D。
- **弱在哪**：
  - 无 LICENSE，不能直接复制代码。
  - 依赖 Python、无头浏览器、可能的 CPU 运行环境；安装和运行成本高。
  - 更偏「研究/系统仓库」，虽然有 AI chatbot、DeepTutor 这类 2D Web 应用示例，但对「纯前端动画仓库」的模板不多。
  - star 少，社区验证不足。
- **最值得借**：`build.py` 的引用校验、`runs/` 证据目录、页面顶部的「我们没跑什么」、四能力路由、学习者档案导出。
- **适配度**：★★★★★（工程质量）/ ★★★☆☆（开箱即用）

### 2) archify

- **仓库**：[tt-a1i/archify](https://github.com/tt-a1i/archify) · 93,669 star · Apache-2.0 · 2026-11-05 推送
- **它做什么**：把想法、计划、代码仓库变成可交互的独立 HTML 图或单页解释器。支持架构、流程、时序、数据流、生命周期/状态、ERD、类图、树、时间线、瀑布图等。
- **输出**：自包含 HTML + SVG；深浅色主题；动效；可导出图片/SVG/WebM；`explainer` 模式输出「结论先行、分面板、原生图/表」的一页解释。
- **工作流**：选择 artifact 类型 → 读仓库证据（`references/repository-authoring.md`）→ 写 `candidate.json` / `candidate.archify.md` → `finalize` 校验、原子交付、artifact 检查 → 可选的视觉复核。
- **强在哪**：
  - **验证最强之一**：`finalize` 把校验、原子交付、artifact 检查做成 CLI 门禁。
  - **输出质量稳定**：有明确的版式与语义模式；如果配合 `diagram-design` 的密度/删除原则，可以进一步收敛视觉噪音。
  - **可采用性最好**：Apache-2.0、安装简单、输出可移植、社区巨大、维护活跃。
  - **仓库证据**：不是只画「想象中的架构」，会追踪真实代码行为。
- **弱在哪**：
  - 它不是课程生成器：没有课程叙事、测验、学习进度、读者分层。
  - 图/解释为主，文字动画与滚动叙事不是重点。
  - 93k star 带来的「万能工具」预期，可能让人误以为它适合所有教学场景。
- **最值得借**：`finalize` 门禁、artifact 类型路由、结论先行的 explainer 结构、仓库证据追踪。
- **适配度**：★★★★★（视觉/图）/ ★★★☆☆（课程）

### 3) explain-this

- **仓库**：[analyticalmonk/explain-this](https://github.com/analyticalmonk/explain-this) · 22 star · MIT · 2026-10-26 推送
- **它做什么**：一个「解释器工厂」Skill 家族：
  - `creating-explainers`：从主题/文档/代码生成单文件交互解释页（HTML 模板、声音与风格、图形原型、颜色、outline → scaffold → prose → figures → polish）；
  - `explaining-codebases`：代码仓库专用 intake、架构图/数据流/执行轨迹/逐行注释；
  - `fact-checking-explainers`：交付前的强制事实核查。
- **输出**：单文件、自包含、可交互的 explainer；图形用 canvas/IIFE，带 DPR 适配和动画循环。
- **强在哪**：
  - **验证架构最值得抄**：`fact-checking-explainers` 是阻塞门禁，代码解释必须逐条对照真实 `path:line`。
  - **分工清楚**：输出格式（creating）与输入类型（codebases）分离，新增题材只需加 intake。
  - **写作流程成熟**：先 outline 并让用户确认，再 scaffold、prose、figures、fact-check、polish。
  - **MIT**，可采用性好。
- **弱在哪**：
  - 社区很小（22 star），文档和示例不如头部项目丰富。
  - 依赖宿主 Agent 的 fact-check 能力；没有像 teachable-code/archify 那样的自动渲染检查脚本。
  - 图形偏 canvas 手写，维护成本高。
- **最值得借**：fact-check gate、intake/creating 分层、outline 确认、代码图形原型分类。
- **适配度**：★★★★☆

### 4) codebase-to-course

- **仓库**：[zarazhangrui/codebase-to-course](https://github.com/zarazhangrui/codebase-to-course) · 5,769 star · 无 LICENSE · 2026-03-30 推送
- **它做什么**：把任意代码仓库变成面向「vibe coder」的交互式 HTML 课程。目标读者是没有 CS 背景、用自然语言指挥 AI 写代码的人。
- **输出**：一个课程目录：预构建的 `styles.css`、`main.js`、每模块 HTML、拼装后的 `index.html`。README 宣传为「single HTML file」，SKILL 描述为目录 + 拼装页，存在表述不一致。
- **教学特点**：
  - 滚动式模块 + 进度 + 键盘导航；
  - 代码 ↔ 平白英文逐行对照；
  - 动画数据流、组件间「群聊」、架构图；
  - 测验考「应用」而非记忆；
  - 术语悬浮解释；
  - 每屏至少 50% 视觉，文本块最多 2–3 句。
- **强在哪**：
  - **最懂非技术读者**：类比优先、零术语、代码原文不改、强调「能读懂并指挥 AI」。
  - **内容哲学清晰**：`references/content-philosophy.md` 的「show, don't tell」可以直接当写作规范。
  - **交互元素库丰富**：17 种元素（代码对照、测验、拖拽匹配、群聊动画、数据流动画、架构图、图层开关、找 bug、场景测验、术语提示、文件树等）。
- **弱在哪**：
  - 无 LICENSE，不能直接复制。
  - 无自动 fact-check / 渲染回归；质量靠 Skill 的写作规范，不靠门禁。
  - 2026-03 后未更新，可能跟不上新的 Agent 能力。
  - 动画是预置 HTML/CSS/JS 模板，不是真正的时间轴引擎；对「文字动画很多」的仓库需要额外扩展。
- **最值得借**：内容哲学、代码↔英文对照、17 种交互元素、测验的「应用型」出题方式、每屏视觉占比规则。
- **适配度**：★★★★★（课程化）/ ★★★☆☆（工程化）

### 5) teachable-figures

- **仓库**：[ywEdAi/teachable-figures](https://github.com/ywEdAi/teachable-figures) · 275 star · 自定义/未识别许可 · 2026-11-03 推送
- **它做什么**：把课程、文章、章节或技术概念变成「可预测 → 可尝试 → 可解释」的交互教学图。支持 2D 控件、等距 SVG 物体、机械装配/剖切、爆炸视图、真正的 3D 旋转模型。
- **输出**：嵌在宿主课程里的教学图组件；保留宿主应用的课程契约与无障碍。
- **强在哪**：
  - **教学法最扎实**：先让学习者预测，再改变原因、观察结果、解释现象；区分教师/家长演示与自学。
  - **动效能力强**：空间运动、机械结构、3D 旋转、剖切、装配顺序。
  - **验证**：有渲染套件、已审阅示例、浏览器检查。
  - **学习档案**：`LESSONS.md` / `LEARNER.md` / `LEARNING-PLAN.md` 工作区。
- **弱在哪**：
  - 不是整仓库课程生成器；它做「一个机制的一张图」。
  - 自定义许可，采用前必须确认。
  - 需要宿主应用配合，独立使用成本高。
- **最值得借**：`predict → try → explain` 交互模型、教师/自学者双模式、学习档案、动效与空间解释的分工。
- **适配度**：★★★★☆（动画/机制）/ ★★☆☆☆（整仓库）

### 6) answer-me-with-html

- **仓库**：[QingYunA/answer-me-with-html](https://github.com/QingYunA/answer-me-with-html) · 5,324 star · MIT · 2026-11-05 推送
- **它做什么**：把答案变成一页可视化 HTML 解释。模型只写扩展 Markdown 草稿，`am` CLI 负责布局、配色、暗色模式、图形坐标；不要手写 HTML/CSS/SVG。
- **输出**：一页 HTML；支持流程图、架构图、对比表、状态机、时间线；也支持解释视频。
- **强在哪**：
  - **输出效率最高**：内容与布局分离，模型不用手搓坐标。
  - **质量稳定**：CLI 统一渲染，避免每次生成风格漂移。
  - **采用性最好**：MIT、安装简单、5.3k star、持续更新。
  - **触发策略成熟**：何时该出页面、何时纯文本，有明确规则。
- **弱在哪**：
  - 不是仓库分析工具：不会自动读代码、定位 `file:line`、做架构抽取。
  - 页面偏「解释一张问题」，不是「课程」；没有学习进度、测验、模块。
  - 动画以图形为主，不是文字动画引擎。
- **最值得借**：Markdown 草稿 + CLI 渲染的分离、触发/跳过规则、一页解释的版式模板。
- **适配度**：★★★★☆（解释页）/ ★★☆☆☆（课程）

### 7) Understand-Anything

- **仓库**：[Egonex-AI/Understand-Anything](https://github.com/Egonex-AI/Understand-Anything) · 90,808 star · MIT · 2026-10-26 推送
- **它做什么**：把代码变成可探索、可搜索、可提问的交互知识图谱。多 Skill 插件：`understand`、`understand-chat`、`understand-dashboard`、`understand-diff`、`understand-domain`、`understand-explain`、`understand-figma`、`understand-knowledge`、`understand-onboard`。
- **输出**：`knowledge-graph.json` + 交互式仪表盘；支持多语言、增量更新、`.understandignore`。
- **强在哪**：
  - **规模与生态**：90k star、多 Skill 组合、MIT、维护活跃。
  - **分析流程完整**：7 个阶段，从预检、文件分析、图谱构建到校验。
  - **多语言**：生成的摘要/描述/标签可选 `zh`、`ja`、`ko` 等。
- **弱在哪**：
  - 输出是「图」，不是「课」；教学叙事、测验、代码↔英文对照都弱。
  - 动效几乎没有（图谱交互除外）。
  - 对「简单动画 Web 应用」的专门支持有限。
- **最值得借**：知识图谱 schema、增量更新、多语言内容、Skill 拆分方式。
- **适配度**：★★★☆☆

### 8) codebase-to-course-v2

- **仓库**：[agentictaskx/codebase-to-course-v2](https://github.com/agentictaskx/codebase-to-course-v2) · 5 star · 无 LICENSE · 2026-04-13 推送
- **它做什么**：codebase-to-course 的 schema 驱动重写，声称比 v1 少 75% token。
- **输出**：交互式 HTML 课程（继承 v1 形态）。
- **强在哪**：
  - **架构值得看**：把「读仓库 → 生成课程」拆成 schema 驱动的管线，减少上下文和重复生成。
  - 直接针对 v1 的成本问题。
- **弱在哪**：
  - 只有 5 star，成熟度低，文档少。
  - 无 LICENSE。
  - 本质是实验性重写，不建议直接依赖。
- **最值得借**：schema 驱动、分阶段生成、token 预算控制。
- **适配度**：★★☆☆☆（参考架构）

### 9) deepwiki-skill

- **仓库**：[natsu1211/deepwiki-skill](https://github.com/natsu1211/deepwiki-skill) · 42 star · MIT · 2026-06-24 推送
- **它做什么**：为任意代码库生成 Wiki 风格 Markdown 文档；6 阶段工作流（repo-scan → toc-design → doc-write → validate-docs → doc-summary → incremental-sync）；支持子 Agent 并行写页、增量更新、Mermaid 校验、证据引用。
- **输出**：`toc.yaml` + 多页 Markdown + `SUMMARY.md`；不是交互页面。
- **强在哪**：
  - **工程管线完整**：TOC 设计、并行写作、校验、增量同步。
  - **证据引用与 Mermaid 策略**：有明确的引用策略和图表校验。
  - **MIT**，适合做后台文档系统。
- **弱在哪**：
  - 面向「文档」而非「学习者」：没有叙事、练习、动效、代码↔英文对照。
  - 输出是 Markdown，不是可交互页面。
- **最值得借**：TOC 设计、增量同步、并行写页、Mermaid 校验。
- **适配度**：★★☆☆☆（参考文档）

### 10) walkthrough

- **仓库**：[alexanderop/walkthrough](https://github.com/alexanderop/walkthrough) · 149 star · 无 LICENSE · 2026-03-23 推送
- **它做什么**：生成一个自包含 HTML，用可点击的 Mermaid 流程图/ER 图解释代码库的功能、流程、架构或数据库 schema；目标是在 2 分钟内建立心智模型。
- **输出**：`walkthrough-*.html`，纯黑背景、白字、紫色强调，始终暗色。
- **强在哪**：
  - **快**：并行 Explore 子 Agent 读代码，输出节点/边/代码片段，然后生成 Mermaid。
  - **轻**：没有复杂运行时，打开即看。
  - **范围明确**：只求「心智模型」，不求完整课程。
- **弱在哪**：
  - Mermaid 限制表达力，几乎没有动效。
  - 无 fact-check / 渲染检查；强制暗色，不适合所有品牌。
  - 无 LICENSE，2026-03 后未更新。
- **最值得借**：并行探索的分工、2 分钟心智模型的目标、节点/边/片段的中间表示。
- **适配度**：★★☆☆☆（快速草稿）

## 5. 横向对比矩阵

| Skill | 输出形态 | 交互 | 动画/文字 | 代码证据 | 自动验证 | 课程/测验 | 许可 | 适合作为 |
|---|---|---|---|---|---|---|---|---|
| teachable-code | 单页 HTML | 强 | 2D/3D 步骤 | `file:line` + 运行数据 | 构建 + 浏览器 | 部分 | 无 | 证据型课程 |
| archify | 独立 HTML | 强 | 图/解释动效 | 仓库证据追踪 | CLI finalize | 弱 | Apache-2.0 | 图形/解释层 |
| explain-this | 单文件 HTML | 强 | canvas 图 | `path:line` + fact-check | 强制核查 | 部分 | MIT | 解释页架构 |
| codebase-to-course | HTML 课程 | 强 | 预置动画 | 代码原文 | 无 | 强 | 无 | 课程模板 |
| teachable-figures | 嵌入图 | 强 | 2D/3D/机械 | 机制级 | 浏览器检查 | 练习 | 自定义 | 机制动画 |
| answer-me-with-html | 单页 HTML | 中 | 图/视频 | 弱 | CLI 渲染 | 弱 | MIT | 单页解释 |
| Understand-Anything | 图谱 + 仪表盘 | 强 | 图谱 | 强 | 图谱校验 | 弱 | MIT | 架构图谱 |
| codebase-to-course-v2 | HTML 课程 | 强 | 继承 v1 | 中 | 弱 | 强 | 无 | 管线参考 |
| deepwiki-skill | Markdown Wiki | 弱 | 无 | 引用 | Mermaid 校验 | 无 | MIT | 参考文档 |
| walkthrough | HTML + Mermaid | 中 | 无 | 读真实文件 | 无 | 无 | 无 | 快速草稿 |

## 6. 按目标选型

### 6.1 如果目标仓库是「文字动画多的 Web 应用」

按「能不能讲清楚动画链路」排序，而不是按 star：

| 适配 | Skill | 能讲什么 | 缺什么 |
|---|---|---|---|
| 高 | **teachable-figures** | 机制、空间运动、因果变化；`predict → try → explain` 非常适合动画原理 | 不是整仓库，需要宿主课程 |
| 高 | **teachable-code** | 2D 应用流程、真实数据、`file:line` 证据；AI chatbot 示例就是 Web 应用 | 文字动画原语少，偏图/步骤 |
| 中高 | **explain-this** | canvas 动画循环、执行轨迹、逐行代码 | 需要自己写图形；社区小 |
| 中高 | **codebase-to-course** | 数据流动画、群聊动画、滚动模块 | 动画是预置模板，不是时间轴引擎 |
| 中 | **archify** | 动画流程图、状态图、单页解释 | 不是课程，文字动画弱 |
| 中 | **answer-me-with-html** | 一页解释、图/表/视频 | 不读仓库，不做代码证据 |
| 低 | **Understand-Anything** | 架构图谱 | 没有动效/文字动画 |
| 低 | **deepwiki-skill / walkthrough** | 结构文档 / Mermaid 图 | 基本没有动画 |

**结论**：如果第一版就锁定「文字动画 Web 应用」，优先组合 `teachable-code`（证据 + 2D 流程）+ `teachable-figures`（机制动画）+ `scroll-craft`/`remotion`（文字动效输出）。`codebase-to-course` 作为教学法参考，`archify` 作为图形/验证层。

### 6.2 按产物类型选型

| 你想要 | 首选 | 备选 | 说明 |
|---|---|---|---|
| 面向非技术读者的完整课程 | codebase-to-course | teachable-code | 前者教学法更贴「vibe coder」；后者证据链更强 |
| 证据可追溯、可验证 | teachable-code | explain-this | 前者有构建/浏览器检查；后者有 fact-check gate |
| 高质量架构图/单页解释 | archify | answer-me-with-html | archify 可验证、可导出；answer-me 更轻 |
| 动画/机制演示 | teachable-figures | teachable-code（2D/3D） | 前者专做 `predict → try → explain` |
| 知识图谱/入职导航 | Understand-Anything | deepwiki-skill | 前者交互图谱，后者 Wiki 文档 |
| 快速草稿/2 分钟心智模型 | walkthrough | codebase-to-course-v2 | 前者最快，后者适合看管线 |
| 文字动画/滚动叙事 | 见下一节的动效 Skill | — | repo→course 类 Skill 普遍弱 |

## 7. 动效与设计加成 Skill（不入 Top 10，但强烈建议组合）

这些 Skill 不分析代码仓库，但能显著提升「动画多的 Web 应用」教程的输出质量。

| Skill | 仓库 | Star | 许可 | 它补什么 |
|---|---|---:|---|---|
| **scroll-craft** | [nateherkai/scroll-craft](https://github.com/nateherkai/scroll-craft) | 4,555 | MIT | 滚动驱动的页面语法、分层 hero、文字与场景动效、移动端/reduced-motion 验证 |
| **taste-skill** | [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) | 110,296 | MIT | 反「AI 味」前端：真实照片/产品 UI、微交互、浏览器检查、版式规则 |
| **diagram-design** | [cathrynlavery/diagram-design](https://github.com/cathrynlavery/diagram-design) | 65,164 | MIT | 45 种编辑级图表、HTML/SVG、动画、Mermaid/drawio/Excalidraw 导入 |
| **huashu-design** | [alchaincyf/huashu-design](https://github.com/alchaincyf/huashu-design) | 28,741 | MIT | HTML 原型/幻灯片/动画/信息图，三个方向初稿 + 设计 lint + 偏好账本 |
| **impeccable** | [pbakaus/impeccable](https://github.com/pbakaus/impeccable) | 103,310 | Apache-2.0 | 设计评审、动效、排版、可访问性、浏览器验证 |
| **remotion-motion-graphics** | [Boriwatopal/agent-skill-remotion-motion-graphics](https://github.com/Boriwatopal/agent-skill-remotion-motion-graphics) | 20 | MIT | 动力学排版/Logo/品牌动效，帧级精确，输出 MP4 |
| **bang-motion** | [bangtutorial/bang-motion](https://github.com/bangtutorial/bang-motion) | 1,086 | MIT | 浏览器动效图形：opener、promo、bumper、动力学排版、五种解释器风格 |
| **motion-skills** | [iart-ai/motion-skills](https://github.com/iart-ai/motion-skills) | 1,227 | MIT | 50 个动效/动画/视频 Skill 的合集，覆盖 kinetic typography、数据可视化、WebGL、Manim |
| **apple-motion** | [IskakovDamir/apple-motion](https://github.com/IskakovDamir/apple-motion) | 21 | MIT | Apple 风格动力学排版回顾，基于帧级测量 |
| **kinetic-typography-skills** | [iart-ai/kinetic-typography-skills](https://github.com/iart-ai/kinetic-typography-skills) | 23 | MIT | 节拍同步的动力学排版，适合社交/标题/歌词视频 |

### 推荐组合

```
repo 理解：teachable-code（证据） + codebase-to-course（教学法）
图形/验证：archify（finalize 门禁） + explain-this（fact-check）
文字动效：scroll-craft（滚动叙事） + remotion（帧级文字动画）
质量兜底：taste-skill / impeccable（反 AI 味 + 浏览器验证）
```

这不是让你同时装 7 个 Skill，而是说明**没有任何一个 Skill 同时覆盖「仓库理解 + 教学法 + 文字动效 + 验证」**。tutorials-maker 应该把它们拆成管线中的不同阶段，而不是找一个全能选手。

## 8. 关键发现

### 8.1 两个家族，别混为一谈

- **repo → 课程/解释**：teachable-code、codebase-to-course、explain-this、answer-me-with-html。强在教学叙事，弱在图形/动效基础设施。
- **repo → 图/图谱**：archify、Understand-Anything、walkthrough、deepwiki。强在结构可视化，弱在教学法与练习。

最佳产品形态通常是「课程骨架（家族 A）+ 图/动效层（家族 B/加成 Skill）」，而不是二选一。

### 8.2 验证是真正的分水岭

- **有自动验证**：teachable-code（构建 + 浏览器）、archify（finalize + 视觉复核）、explain-this（fact-check gate）、deepwiki（Mermaid 校验）。
- **主要靠规范**：codebase-to-course（内容哲学 + gotchas）、answer-me（CLI 渲染但无代码核查）、walkthrough（无检查）。

对 tutorials-maker 来说，**验证能力比生成能力更值得投入**。生成可以换模型，验证不能省。

### 8.3 文字动画是 repo→course 类的空白

Top 10 里没有一个是真正的「文字动画引擎」：

- codebase-to-course 有预置的 CSS/JS 动画模板，但不是时间轴系统；
- teachable-code 动的是图上的点和 3D 模型，不是文字；
- archify 动的是图形；
- teachable-figures 动的是机械/空间对象；
- walkthrough/deepwiki 基本没有动效。

如果目标仓库是「文字动画比较多的 Web 应用」，需要额外引入 scroll-craft / Remotion / huashu 这类输出型 Skill，或者自研 `text` 渲染器（见 [02-abstraction.md](02-abstraction.md) 第 8 节）。

### 8.4 许可证是硬约束

| 许可状态 | Skill | 含义 |
|---|---|---|
| Apache-2.0 | archify、impeccable | 可商用、可修改，需保留声明 |
| MIT | explain-this、answer-me-with-html、Understand-Anything、deepwiki、scroll-craft、taste-skill、diagram-design、huashu、remotion、bang-motion、motion-skills | 可商用、可修改，需保留版权声明 |
| 无 LICENSE | codebase-to-course、teachable-code、walkthrough、codebase-to-course-v2 | 默认「保留所有权利」，**不能直接复制代码**；只能借思路、自己实现 |
| 自定义/未识别 | teachable-figures | 采用前必须读 LICENSE 并确认 |

这条对 tutorials-maker 很关键：**最想抄的两个（codebase-to-course、teachable-code）恰恰没有许可证。** 正确做法是读它们的 `SKILL.md`/`references/` 学习方法论，然后用自己的代码实现，而不是复制仓库。

### 8.5 star 不等于适合

- archify 93k、Understand-Anything 90k，但它们的核心不是课程；
- teachable-code 只有 10 star，却是证据链和验证最完整的；
- codebase-to-course 5.7k，教学法最贴目标读者，但 2026-03 后未更新；
- walkthrough 149 star，快但几乎没有动效和验证。

选型时先问「我要的是课程、图、还是解释页」，再看 star。

## 9. 对 tutorials-maker 的选型建议

### 9.1 如果只选一个作为「课程骨架」

**codebase-to-course**。它的内容哲学、代码↔英文对照、17 种交互元素、应用型测验，最接近「让非技术读者学会一个代码仓库」的目标。但：

- 不要复制代码（无 LICENSE）；
- 补上 fact-check 和渲染回归；
- 把预置动画模板换成可配置的 `MotionSpec`。

### 9.2 如果只选一个作为「工程质量参考」

**teachable-code**。它的固定 commit、`file:line` 引用、`runs/` 证据、构建/浏览器检查、诚实边界，是 tutorials-maker 最该学的工程标准。

### 9.3 如果只选一个作为「图形/验证层」

**archify**。Apache-2.0、CLI 门禁、独立 HTML、可导出、维护活跃。它不适合做课程，但适合做课程里的图和单页解释。

### 9.4 如果只选一个作为「文字动画层」

**scroll-craft**（Web 滚动叙事）或 **remotion-motion-graphics**（帧级文字动画）。前者适合页面内滚动叙事，后者适合导出视频/精确时间轴。两者都是 MIT。

### 9.5 推荐的最小组合

```
content schema + player（自研，参考 02-abstraction）
  + 教学法（参考 codebase-to-course，不复制代码）
  + 证据链（参考 teachable-code）
  + 图/解释（archify 或 answer-me-with-html）
  + 文字动效（scroll-craft / remotion）
  + 验证（自研 content contracts + Playwright + fact-check）
```

## 10. 未验证与限制

- 没有实际安装 Top 10 Skill 并让它们处理同一个动画 Web 应用仓库；因此「输出质量」评分基于文档、脚本和示例，不是实测 A/B。
- star、许可、推送时间都是 2026-11-05 的 GitHub API 快照，之后可能变化。
- 部分 Skill 的 `SKILL.md` 很长，本文只读了主文件与关键 references；可能有未覆盖的能力。
- 「文字动画」能力是按文档和示例判断的，没有逐帧对比。
- 许可状态以 GitHub API 的 `license.spdx_id` 为准；「无 LICENSE」不等于「公有领域」，采用前应咨询法律意见。

## 11. 参考链接

**Top 10**

- <https://github.com/ywEdAi/teachable-code>
- <https://github.com/tt-a1i/archify>
- <https://github.com/analyticalmonk/explain-this>
- <https://github.com/zarazhangrui/codebase-to-course>
- <https://github.com/ywEdAi/teachable-figures>
- <https://github.com/QingYunA/answer-me-with-html>
- <https://github.com/Egonex-AI/Understand-Anything>
- <https://github.com/agentictaskx/codebase-to-course-v2>
- <https://github.com/natsu1211/deepwiki-skill>
- <https://github.com/alexanderop/walkthrough>

**动效/设计加成**

- <https://github.com/nateherkai/scroll-craft>
- <https://github.com/Leonxlnx/taste-skill>
- <https://github.com/cathrynlavery/diagram-design>
- <https://github.com/alchaincyf/huashu-design>
- <https://github.com/pbakaus/impeccable>
- <https://github.com/Boriwatopal/agent-skill-remotion-motion-graphics>
- <https://github.com/bangtutorial/bang-motion>
- <https://github.com/iart-ai/motion-skills>
- <https://github.com/IskakovDamir/apple-motion>
- <https://github.com/iart-ai/kinetic-typography-skills>

**参考仓库**

- <https://github.com/kejun/cs-systems-design>
