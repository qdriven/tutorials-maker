# Auto-Research Skill × Tutorials-Maker 调研报告

> 来源：Google AI Mode 对话《AI auto research skill》（2026-10 获取）+ 三路并行开源调研。
> 服务目标：为 tutorials-maker（AI 教育互动教程生成器）提炼 ① 可用 SKILL ② 教学方法论 ③ 图文并茂教程制作方案 ④ GitHub Top 20。

---

## 第一部分：对话内容总结（AI Mode: "AI auto research skill"）

对话为单轮问答，核心内容如下。

### 1. 什么是 AI Auto-Research Skill

- 据对话称：2026 年 3 月由 Andrej Karpathy 开源（`karpathy/autoresearch`），本质是 **AI Agent 自主迭代与实验优化模式**。
- 核心概念：**「修改 → 验证 → 保留/丢弃 → 无限循环」**。
- 最初用途：让 AI 在夜间自主调整超参数与模型架构以优化 LLM 训练；后被社区泛化为 Claude Code 等现代 AI 开发工具中最强大的核心技能（Skill）之一。
- ⚠️ 注：对话中提到的具体仓库名（karpathy/autoresearch、uditgoenka/autoresearch、wjgoarxiv/autoresearch-skill 等）需要事实核查，见第二部分核查表。

### 2. 核心工作原理（Karpathy 循环）

不同于传统 one-shot 生成，Auto-Research 表现为一个**全自动的科学家/工程师**：

1. **定义目标与指标**：给 AI 一个明确且可度量的量化指标（准确率、延迟、模型损失、页面转化率……）。
2. **环境隔离**：独立 Git 分支或 Worktree，实验不污染主代码。
3. **自主实验循环**：
   - **修改**：生成新假设，修改代码或提示词；
   - **运行**：自主运行脚本（如训练 5 分钟或跑基准测试）；
   - **度量**：对结果做盲审或自动化量化打分；
   - **决策**：指标提升 → 合并保留；失败 → 回滚（revert）并记日志。
4. **重复迭代**：直到达到目标或预算耗尽。

### 3. 三大应用方向（对话表格）

| 方向 | 对话提到的代表项目 | 场景 |
| --- | --- | --- |
| 机器学习自主优化 | karpathy/autoresearch、NVIDIA NeMo RL / Gym | 自动微调、超参寻优、架构搜索（例：Qwen3-VL 特定任务准确率 25% → 96.8%） |
| 通用代码与系统工程 | uditgoenka/autoresearch（Claude Code 插件）、wjgoarxiv/autoresearch-skill | 算法性能调优、自主 Debug（/autoresearch:debug）、安全审计、发布 |
| 提示词与业务技能进化 | MindStudio Agent Skills 等社群框架 | 优化 AI 自身 Prompt；提升冷邮件回复率、落地页转化率、newsletter 点击率 |

### 4. 使用边界与最佳实践

- **必须有可测量指标**：严禁用于没有对错、无法量化的单次任务（如"写情书"）。
- **设置显式预算**：自主循环快速消耗 Token / 算力，必须设最大迭代次数或成本上限。
- **保持人类护栏**：长途运行易产生上下文漂移（Context Drift），需持久化记忆（Durable Memory）+ 人类定期审查（Human-in-the-loop）纠偏。

---

## 第二部分：事实核查与真实生态

### 2.1 事实核查表（对话声称 → 逐条验证，2026-10-22 GitHub API 实测）

| 声称 | 结论 | 证据 |
| --- | --- | --- |
| Karpathy 2026-03 开源 `karpathy/autoresearch` | ✅ **真实存在** | github.com/karpathy/autoresearch — created 2026-03-06，**98,335 stars**，"AI agents running research on single-GPU nanochat training automatically"，MIT |
| 核心循环「修改→验证→保留/丢弃→无限循环」 | ✅ 真实 | README 证实：agent 只改 `train.py`，跑固定 5 分钟训练（一夜约 100 次），比较 val_bpb，改善则保留否则丢弃；**人类只迭代 `program.md`**（轻量 skill 文件） |
| "最初用于超参数调优" | 🟡 基本属实（范围更宽） | agent 可改 train.py 任何内容（含架构），指标为 val_bpb |
| "泛化为 Claude Code skills" | ✅ 真实 | 大量衍生品均标注 "inspired by Karpathy's autoresearch"（2026-03/04 创建） |
| `uditgoenka/autoresearch`（Claude Code 插件） | ✅ 真实 | 6,714 stars，MIT，14 个命令（/autoresearch:plan、:debug、:ship 等）+ orchestrator 模式，含 git 回滚护栏 |
| `wjgoarxiv/autoresearch-skill` | ✅ 真实（很小） | 40 stars，MIT，写 `research.md` 定义目标，纯 Python stdlib |
| NVIDIA NeMo RL / Gym | ✅ 真实 | NVIDIA-NeMo/RL（2,077 stars，Apache-2.0）；Gym 正确路径是 **NVIDIA-NeMo/Gym**（NVIDIA/NeMo-Gym 为 404） |
| MindStudio Agent Skills | 🟡 部分属实 | 是商业插件产品（140+ 集成），非开放研究循环框架 |
| 综述 "AI for Auto-Research: A Survey" | 🟡 存在但标题有出入 | 实际为 **"AI for Auto-Research: Roadmap & User Guide"**（arXiv:2605.18661）；结论：全自动系统约 $15/篇产论文，但会捏造结果、无法判断新颖度；配套仓库 worldbench/awesome-ai-auto-research（561 stars） |

**总结论：对话内容基本属实**（罕见的非幻觉 AI 回答）。

### 2.2 自主研究循环类真实项目（stars 为当日实测）

**Karpathy 系**

| 项目 | Stars | 说明 |
| --- | --- | --- |
| [karpathy/autoresearch](https://github.com/karpathy/autoresearch) | 98,335 | 循环范式母体：单一可变文件 + 机械指标 + 定长验证 + 保留/回滚 + 人在 Markdown 层迭代 |
| [karpathy/nanochat](https://github.com/karpathy/nanochat) | 58,834 | autoresearch 的母体项目（完整训练流水线） |

**Claude Code auto-research skill 赛道**（对本仓最直接相关）

| 项目 | Stars | 说明 |
| --- | --- | --- |
| [wanshuiyin/Auto-claude-code-research-in-sleep（ARIS）](https://github.com/wanshuiyin/Auto-claude-code-research-in-sleep) | **17,860** | "Auto-Research-In-Sleep"，**纯 Markdown skills**，跨模型评审循环+想法发现+实验自动化，赛道最大仓 |
| [uditgoenka/autoresearch](https://github.com/uditgoenka/autoresearch) | 6,714 | 14 命令插件，git 回滚护栏 |
| [alchaincyf/darwin-skill](https://github.com/alchaincyf/darwin-skill) | 6,504 | 中文"达尔文.skill"：评估→改进→测试→保留或回滚，**让 Skill 本身无限进化** |
| [leo-lilinxiao/codex-autoresearch](https://github.com/leo-lilinxiao/codex-autoresearch) | 2,993 | Codex 版自主迭代系统 |
| [olelehmann1337/autoresearch-skill](https://github.com/olelehmann1337/autoresearch-skill) | 980 | — |

**深度研究 / 报告生成**（教程选题调研用）

| 项目 | Stars | 核心循环 | License |
| --- | --- | --- | --- |
| [stanford-oval/storm](https://github.com/stanford-oval/storm) | 31,681 | 研究→多视角提问→大纲→带引用全文 | MIT |
| [assafelovic/gpt-researcher](https://github.com/assafelovic/gpt-researcher) | 30,231 | 计划→搜索→抓取→综合报告 | Apache-2.0 |
| [dzhng/deep-research](https://github.com/dzhng/deep-research) | 19,812 | 迭代 搜索→读页→推理→补洞（带 token 预算） | MIT |

**自动优化框架**（教程 prompt / 示例代码自动改进用）

| 项目 | Stars | 用途 |
| --- | --- | --- |
| [stanfordnlp/dspy](https://github.com/stanfordnlp/dspy) | 38,725 | "编程而非提示"，内置优化器循环 |
| [algorithmicsuperintelligence/openevolve](https://github.com/algorithmicsuperintelligence/openevolve) | 7,618 | AlphaEvolve 开源复现：演化→评估→保留（MAP-Elites 岛） |
| [gepa-ai/gepa](https://github.com/gepa-ai/gepa) | 7,094 | 反思式优化 prompt/代码（遗传帕累托） |
| [SakanaAI/AI-Scientist](https://github.com/SakanaAI/AI-Scientist) | 14,769 | 产生想法→实验→写论文→自动审稿 |

### 2.3 Agent Skills 生态基础设施

- [anthropics/skills](https://github.com/anthropics/skills) — **182,811 stars**。官方仓库：Agent Skills 规范（spec/）+ 模板 + 文档类 skill（docx/pdf/pptx/xlsx）。**本仓 skills 的规范来源**。
- [agentskills.io](https://agentskills.io) 开放标准（Anthropic 开放，多家客户端采用）。
- 精选清单：[ComposioHQ/awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills)（77.6k）、[sickn33/agentic-awesome-skills](https://github.com/sickn33/agentic-awesome-skills)（48.3k）、[VoltAgent/awesome-agent-skills](https://github.com/VoltAgent/awesome-agent-skills)（36.1k，跨端）、[libukai/awesome-agent-skills](https://github.com/libukai/awesome-agent-skills)（5.2k，**中英双语**）。
- 与教程直接相关的小众 skill：Terryc21/tutorial-creator（从代码库生成个性化编程课）、codejagaban/dev-tutorial-skill、samlaying/tutorial-writing（中文 9 阶段教程写作工作流）。

---

## 第三部分：tutorials-maker 可用的 SKILL 提炼

基于对话的 Auto-Research 模式 + 本工作区已有积累（frontend-slides、deck.md 生成器、vivid-dsh 交互教程、flashcard MVP、slides-tool 自我修正循环），教程生产线可拆成以下 SKILL：

### 3.1 从对话直接映射的 SKILL

| SKILL | 对应对话概念 | 在教程生产中的用法 |
| --- | --- | --- |
| `tutorial-autoresearch` | Karpathy 循环整体 | 夜间自主迭代教程质量：改写一节课 → 渲染 → 量化评分 → 保留/回滚，git worktree 隔离 |
| `rubric-scoring` | "度量：盲审或自动化量化打分" | 教程评分卡（清晰度、图文配比、交互完整性、理解门槛）→ 输出可比较分数，作为循环的指标函数 |
| `budget-guard` | "设置显式预算" | 最大迭代数 / Token 成本上限 / 时间窗控制，循环的硬护栏 |
| `durable-memory` | "持久化记忆 + 人类审查" | 跨迭代记录：哪些改写有效、读者卡点、A/B 结论，防上下文漂移 |

### 3.2 教程生产线全链路 SKILL（结合本仓现状）

| 阶段 | SKILL | 输入 → 输出 | 已有基础 |
| --- | --- | --- | --- |
| 选题调研 | `deep-research` | 题目 → 结构化研究笔记（多源、带引用） | slides-tool 的 LLM harness |
| 课程设计 | `curriculum-design` | 研究笔记 → 课程大纲（学习目标 × 诊断 × 活动，逆向设计） | 待建 |
| 单课撰写 | `lesson-writing` | 大纲 + 教学法规则 → lesson 纯数据文件（vivid-dsh 格式：steps/diagram/quiz/code） | vivid-dsh 的数据驱动格式 |
| 图示生成 | `diagram-as-code` | 文字 → Mermaid/Excalidraw DSL → 渲染图 | StageDiagram 网格坐标经验 |
| 交互组件 | `interactive-widgets` | 代码示例 → 可运行组件（sandbox/练习） | flashcard MVP |
| 质量循环 | `tutorial-autoresearch`（3.1） | lesson 文件 → 评分 → 自动改写迭代 | slides-tool 自我修正循环 |
| 视觉验收 | `visual-qa` | 渲染页面 → Playwright 截图 → 视觉判分 | slides-tool live preview |

**关键洞见**：对话的最大启发不是某个具体工具，而是把「教程质量」变成**可度量指标 + 自动改写循环**——即 slides-tool 已有的 self-correction loop 升级为带 git 隔离、量化评分、预算护栏的完整 autoresearch 回路。

---

## 第四部分：教学方法论提炼（10 个框架 + 6 项推荐组合）

### 4.1 方法论提炼表（框架 → 核心原则 → 对「AI 生成图文教程」的可执行规则）

| # | 框架 | 核心原则 | 可编码为生成规则的要点 | 来源 |
| --- | --- | --- | --- | --- |
| 1 | **Diátaxis**（Django 文档作者 Procida 提出，Canonical/Python 采纳） | 文档四象限：Tutorial（学习导向）/ How-to（任务导向）/ Reference（事实）/ Explanation（为什么），不可混杂 | ① 每个知识单元先打内容类型标签，路由到不同页面模板；② Tutorial 页强制"保证成功结果"：开头展示成品图、每步有可见产出；③ Tutorial 无情压缩解释，解释分流到 Explanation 附页 | [diataxis.fr](https://diataxis.fr) |
| 2 | **认知负荷理论**（Sweller：工作样例效应、分割注意效应） | 工作记忆有限；新手样例学习优于做题；图文分离造成外在负荷 | ① 标注直接嵌入图内，禁止"见图3"；代码与输出紧邻；② 新手页样例优先（完整 worked example 带逐段标注）；③ 每页新概念 ≤3–5 个组块；同一信息勿三重冗余 | [Chandler & Sweller 1992](https://bpspsychub.onlinelibrary.wiley.com/doi/pdf/10.1111/j.2044-8279.1992.tb01017.x) |
| 3 | **Bloom 修订版 + 掌握学习**（Khan Academy 规模化实现） | 目标分层（记忆→创造）；达标 80–90% 才推进；掌握等级 Attempted→Familiar→Proficient→Mastered | ① 目标语句用 Bloom 动词显式声明；② 测验按层级配比（如 60% 应用/25% 分析/15% 创造）；③ 掌握门控：未达标生成变式补救题 | [Khan 掌握学习](https://www.cultofpedagogy.com/khan-mastery-learning) |
| 4 | **UbD 逆向设计**（Wiggins & McTighe） | ①定预期成果 → ②先设计评估证据 → ③再设计活动 | **生成顺序硬约束：目标→测验→内容**（防 LLM 先写文章后凑习题）；每章产出"基本问题 + Bloom 目标 + 达标测验"三件套 | [ASCD UbD 白皮书](https://files.ascd.org/staticfiles/ascd/pdf/siteASCD/publications/UbD_WhitePaper0312.pdf) |
| 5 | **费曼技巧 / protégé effect / 自我解释** | 向他人讲解迫使自我解释、暴露缺口 | ① 章末"向 AI 小白解释"练习（AI 追问为什么）；② 预置"卡壳检查点"通俗类比卡；③ 生成自我解释提示（"这行为什么乘 Q？"） | [fs.blog](https://fs.blog/feynman-learning-technique) |
| 6 | **Gagné 九事件 + Merrill 首要原则**（软件教程界实际最常用组合） | 引起注意→告知目标→唤起先备→呈现→指导→表现→反馈→评估→迁移；Merrill：真实任务为中心 | 页面骨架 = 钩子（惊艳成品演示）→ 目标 → 前测 → 图文讲解 → 引导练习 → 即时反馈 → 小结迁移；每课绑定一个真实可运行任务 | [Gagné 清单](https://students.tippie.uiowa.edu/tippie-resources/technology/instructional-design/models/gagne) |
| 7 | **间隔重复 + 提取练习**（FSRS 算法，已内置于 Anki） | 提取练习优于重读；FSRS 排复习时机；**有 ts-fsrs（MIT）TS 实现可直接嵌桌面 App** | ① 每章自动生成 3–5 张复习卡，ts-fsrs 排期跨章插入；② 练习默认"先回忆再看答案"（答案折叠） | [fsrs4anki](https://github.com/open-spaced-repetition/fsrs4anki) / [ts-fsrs](https://github.com/open-spaced-repetition/ts-fsrs) |
| 8 | **PRIMM + Parsons 问题 + 子目标标签**（CS 教育专用） | Predict→Run→Investigate→Modify→Make，先读代码后写；打乱排序题认知负荷低；子目标标签显著提升成绩 | ① 代码页五段模板：先预测输出（交互）→展示真实运行→改参数观察→独立 Make；② 自动产 Parsons 拖拽题 + 子目标标签（"# 步骤2：归一化注意力分数"） | [PRIMM](https://computingeducationresearch.org/projects/primm) / [ACM 子目标研究](https://dl.acm.org/doi/10.1145/2839509.2844617) |
| 9 | **ZPD / 脚手架渐撤** | 任务落在最近发展区；脚手架随能力渐撤（fading） | ① 练习阶梯 = 完整样例→填空补全→独立→迁移新场景；② AI 提示分级：方向→子目标→具体操作 | [ZPD 综述](https://www.simplypsychology.org/zone-of-proximal-development.html) |
| 10 | **AI 导师护栏**（2024–2026 硬证据） | **Kestin（哈佛, Sci Reports 2025）**：教学法封装进 prompt 的 AI 导师效果是主动学习课堂 2 倍；**Bastani（PNAS 2025, ~1000 人 RCT）**：无护栏 GPT-4 使移除后成绩**降 17%**（拐杖效应），带护栏导师消除负面影响 | 助教提示词硬编码：**不给最终答案、逐级提示、一次一问、先诊断误解、苏格拉底式**；答案模式默认关闭，提交后才展开详解。⚠️ 核实：`khanacademy/khanmigo-concepts` **不存在**（404）；开源替代 = [microsoft/prompts-for-edu](https://github.com/microsoft/prompts-for-edu)（MIT, 1.9k） | [Kestin](https://www.nature.com/articles/s41598-024-81749-1) / [Bastani](https://www.pnas.org/doi/10.1073/pnas.2422633122) |

### 4.2 最佳开源教程/课程平台对照（stars 为 2026-10-22 实测）

| Repo | Stars | 教学法特征 | 可借鉴点 |
| --- | --- | --- | --- |
| [freeCodeCamp](https://github.com/freeCodeCamp/freecodecamp) | ~458k | 项目制 + 浏览器内即改即测 | 课程 JSON schema（挑战→测试断言→提示）；每步自动判分 |
| [developer-roadmap](https://github.com/kamranahmedse/developer-roadmap) | ~370k | 可视化学习路径 DAG | 课程"地图页"与前置依赖可视化 |
| [OSSU/computer-science](https://github.com/OSSU/computer-science) | ~210k | 精选资源 + 严格先修 + 学时估算 | 课程元数据格式（资源清单+先修图+学时） |
| [rust-lang/rustlings](https://github.com/rust-lang/rustlings) | ~64k | 报错→修复→自动验证→解锁 | **"编译/测试即批改"练习运行时；习题即文件、渐进解锁** |
| [TheOdinProject/curriculum](https://github.com/TheOdinProject/curriculum) | ~13k | 全开源 Markdown 课程 | lesson→project→knowledge check 分层模板 |
| [exercism/exercism](https://github.com/exercism/exercism) | ~7.6k | 练习+导师制、概念解锁 | 概念→练习→解锁图谱；自动反馈器架构 |
| [openedx/edx-platform](https://github.com/openedx/edx-platform) | ~8.2k | MOOC 组件模型 | XBlock 内容组件模型；Studio 可视化编辑器 |
| [moodle/moodle](https://github.com/moodle/moodle) | ~7.5k | 全功能 LMS | 班级/作业/成绩簿数据模型；测验题型体系 |
| [Mr.-Ranedeer-AI-Tutor](https://github.com/JushBJJ/Mr.-Ranedeer-AI-Tutor) | ~29.5k | 参数化 GPT 导师提示词 | JSON 配置（深度 1–5 级）驱动导师行为 |
| [killercoda/scenario-examples](https://github.com/killercoda/scenario-examples) | ~140 | 真实终端环境分步教程 | "步骤+自动验证+提示"场景 schema |
| [p2pu/course-in-a-box](https://github.com/p2pu/course-in-a-box) | ~110 | 课程即代码 | Markdown+目录约定整包导入导出 |

### 4.3 推荐的教程生成方法论组合（四层六项）

按「宏观课程 → 中观章节 → 微观页面 → 运行时」分层，各层一个主框架，互不冲突：

1. **UbD 逆向设计**（课程层·生成顺序）：目标 → 评估证据 → 内容。唯一规定"生成顺序"的框架。
2. **Diátaxis**（内容类型路由）：先定型 tutorial/how-to/reference/explanation，决定模板与语气。
3. **Gagné 精简 7 步骨架 + Merrill 任务中心**（页面骨架）：钩子→目标→回忆→图文讲解→引导练习→反馈→小结迁移。
4. **认知负荷 + worked example + 子目标标签**（微观图文排版硬规则）：标注嵌入图内、代码紧邻输出、每页新概念 ≤5、样例→填空→独立三级练习（= fading/ZPD）。
5. **PRIMM + 提取练习/FSRS**（练习与复习调度）：预测交互 + ts-fsrs 排期复习卡。
6. **AI 导师护栏**（运行时行为规范）：不给答案、逐级提示、先诊断误解（Kestin/Bastani 证据 + prompts-for-edu）。

> 未入选：4MAT（学习风格缺乏实证）、ADDIE（人类团队流程，非内容结构）。

---

## 第五部分：图文并茂教程制作方案（工具链 + 推荐管线）

### 5.1 分类工具对照（评级指"嵌入 AI 自动生成管线"的适合度）

**① 文档/教程站点框架（内容渲染层）**

| Repo | Stars | License | 要点 | 评级 |
| --- | --- | --- | --- | --- |
| [mdx-js/mdx](https://github.com/mdx-js/mdx) | 19.8k | MIT | **不是站点而是编译器**：`evaluate()` 可运行时编译 LLM 生成的 MDX 字符串→直接渲染交互组件，AI 管线核心（需组件注册表+变量白名单沙箱） | ⭐⭐ 管线核心 |
| [facebook/docusaurus](https://github.com/facebook/docusaurus) | 66.6k | MIT | 生态最大、MDX 原生、版本化/i18n，静态可离线 | ⭐ |
| [withastro/starlight](https://github.com/withastro/starlight) | 9.4k | MIT | 公认最美开源文档主题，导出站首选 | ⭐ |
| [vuejs/vitepress](https://github.com/vuejs/vitepress) | 18.4k | MIT | 极轻量纯静态，Tauri 离线渲染友好 | ⭐ |
| [web-infra-dev/rspress](https://github.com/web-infra-dev/rspress) | 2.4k | MIT | Rspack 构建极快，适合 App 内"一键导出"，中文社区维护 | ⭐ 黑马 |
| [shuding/nextra](https://github.com/shuding/nextra) | 13.9k | MIT | Next.js 绑定，嵌入桌面笨重；单维护者曾停滞 | 可用 |

**② Diagram-as-code（AI 生成图表的关键层）**

| Repo | Stars | License | 要点 | 评级 |
| --- | --- | --- | --- | --- |
| [mermaid-js/mermaid](https://github.com/mermaid-js/mermaid) | 90.8k | MIT | **LLM 训练语料最多的图表 DSL，生成可靠性第一**；浏览器端 `mermaid.render()` 离线渲染 SVG；需自定义主题 + 生成后校验 | ⭐⭐ 主力 |
| [d2lang/d2](https://github.com/d2lang/d2) | 25.7k | MPL-2.0 | DSL 语义最清晰、默认渲染质量最高（含 sketch 手绘模式）；Go 二进制需 Tauri sidecar | ⭐ 精修 |
| [excalidraw/excalidraw](https://github.com/excalidraw/excalidraw) | 134.3k | MIT | 手绘风颜值担当；npm React 组件可嵌入；AI 生成走 [mermaid-to-excalidraw](https://github.com/excalidraw/mermaid-to-excalidraw)（904★，官方桥，覆盖子集） | ⭐ 美化层 |
| [plantuml](https://github.com/plantuml/plantuml) | 13.4k | LGPL | Java sidecar、布局丑 | 可用 |
| [jgraph/drawio](https://github.com/jgraph/drawio) | 8.9k | Apache-2.0 | 手动修图之王，LLM 生成 XML 不可靠 | 人工修图用 |
| [yuzutech/kroki](https://github.com/yuzutech/kroki) | 4.4k | MIT | Docker 服务统一渲染 20+ 种 DSL | ⭐ 构建期批量 |
| [tldraw/tldraw](https://github.com/tldraw/tldraw) | 51k | **非开源** | SDK 4.0 起商用 $6,000/年/团队 | ❌ license 红线 |

**③ 插图/截图/动画自动化**

| Repo | Stars | License | 要点 | 评级 |
| --- | --- | --- | --- | --- |
| [microsoft/playwright](https://github.com/microsoft/playwright) | 98.2k | Apache-2.0 | UI 教程截图脚本化标准（也是 visual-QA 的工具） | ⭐ |
| [charmbracelet/vhs](https://github.com/charmbracelet/vhs) | 21.2k | MIT | **终端 GIF 神器**：.tape 脚本 DSL，LLM 可直接写 | ⭐ |
| [asciinema-player](https://github.com/asciinema/asciinema-player) | 2.9k | Apache-2.0 | 真实终端会话交互回放（比 GIF 更教程感） | ⭐ |
| [motion-canvas](https://github.com/motion-canvas/motion-canvas) | 19.4k | MIT | TypeScript 代码驱动讲解动画（代码版 AE），AI 可生成 | ⭐ 动画首选 |
| [3b1b/manim](https://github.com/3b1b/manim) | 95.5k | MIT | 数学动画天花板；但 Python 重、AI 生成容错低 | 可用 |
| [remotion](https://github.com/remotion-dev/remotion) | 66.1k | **非开源** | ≥4 人公司付费 | ❌ 商用红线 |
| [carbon](https://github.com/carbon-app/carbon) | 36.1k | MIT | 代码→美图；无官方 CLI，用 Playwright 自渲染替代 | 可用 |

**④ 交互式代码组件（教程"动手"层）**

| Repo | Stars | License | 要点 | 评级 |
| --- | --- | --- | --- | --- |
| [pyodide](https://github.com/pyodide/pyodide) | 14.9k | MPL-2.0 | **浏览器内完整 CPython（含 numpy/pandas），WASM 全离线**，Python 教程交互完美方案（包 10–200MB） | ⭐⭐ |
| [codemirror/codemirror](https://github.com/codemirror/codemirror) | （已迁 Forgejo） | MIT | 最佳内嵌编辑器：模块化、无 iframe；npm 分发正常 | ⭐ |
| [FormidableLabs/react-live](https://github.com/FormidableLabs/react-live) | 4.6k | MIT | 轻量 live React playground | ⭐ |
| [codesandbox/sandpack](https://github.com/codesandbox/sandpack) | 6.3k | Apache-2.0 | **官方已宣布弃用、2026-04 关闭服务**；可 fork 自维护但不建议新项目押注 | ❌ 弃用 |
| StackBlitz WebContainers | 4.6k | 仓库 MIT、**运行时专有** | 商用生产需购买授权 | ❌ license 红线 |
| [jupyterlite](https://github.com/jupyterlite/jupyterlite) | 4.9k | BSD | 纯静态 WASM Jupyter（内核=pyodide），内嵌 Notebook | ⭐ 可选 |
| [engineer-man/piston](https://github.com/engineer-man/piston) | 2.8k | MIT | 自托管 60+ 语言执行 API（在线判题可用） | 可用 |
| [judge0](https://github.com/judge0/judge0) | 4.5k | GPL-3.0 | GPL 传染 + 服务端重 | ❌ |

**⑤ 内容生成管线（校验/风格/导出）**

| Repo | Stars | License | 要点 | 评级 |
| --- | --- | --- | --- | --- |
| [markdoc](https://github.com/markdoc/markdoc)（Stripe） | 8.5k | MIT | Markdown 超集 + **tags schema 校验**：天然适合校验 LLM 生成的结构化教程（自定义 `<Quiz>` `<Exercise>` 并验证属性） | ⭐ 校验层 |
| [vale](https://github.com/vale-cli/vale) | 6.3k | MIT | **风格 lint 引擎**（Google/Microsoft 规则包可机执行），生成文案质量门禁；中文规则弱 | ⭐ |
| [quarto-cli](https://github.com/quarto-dev/quarto-cli) | 6.1k | MIT | Markdown→HTML/PDF/EPUB/幻灯/网站，mermaid 原生支持 | ⭐ 导出层 |
| [jgm/pandoc](https://github.com/jgm/pandoc) | 46.7k | GPL-2.0 | 万能转换器；GPL 外部进程调用不传染 | ⭐ 底座 |
| [shikijs/shiki](https://github.com/shikijs/shiki) | ~14k | MIT | VS Code 级代码高亮，"文"的质感来源 | ⭐ |

**⑥ AI 配图（第二优先级）**：ComfyUI（141.7k，GPL，外部服务调用无碍）+ FLUX.1-schnell（权重 Apache-2.0 可商用）仅做封面/氛围图；**技术示意图必须走 diagram-as-code**（术语准确性）。

**⑦ 写作风格规范（喂给 LLM 的规则）**：Google Technical Writing（developers.google.com/tech-writing）、[Microsoft Style Guide](https://learn.microsoft.com/en-us/style-guide/welcome)（CC-BY）+ [vale-cli/Microsoft](https://github.com/vale-cli/Microsoft)（MIT）、[sparanoid/chinese-copywriting-guidelines](https://github.com/sparanoid/chinese-copywriting-guidelines)（15.8k，中英混排）、[yikeke/zh-style-guide](https://github.com/yikeke/zh-style-guide)（中文技术文档规范）。

### 5.2 推荐管线（完整开源组合）

```
LLM 生成内容（MDX + frontmatter，骨架=第四部分方法论模板）
  → 结构校验（markdoc/zod schema）→ 风格 lint（Vale + 中文规范）
  → 图表层：mermaid（主力，浏览器渲染）/ D2（精修 sidecar）/ mermaid→excalidraw（手绘风）
  → 代码层：shiki 高亮 + CodeMirror 6 编辑器 + react-live（React 示例）
            + pyodide（Python 离线运行）+ rustlings 式本地练习校验
  → 插图层：Playwright（UI 截图）+ vhs（终端 GIF）+ ComfyUI（封面，可选）
  → 渲染：Tauri 内 @mdx-js/mdx evaluate() 动态渲染
          （组件注册表：Quiz / TerminalPlayer / PyPlayground / Callout / Flashcard）
  → 导出：Starlight / Rspress 静态站 + Quarto（PDF/EPUB）
  → 质量循环：autoresearch 回路（指标 = rubric 评分 + 示例代码测试通过率 + 截图视觉判分）
```

**核心决策理由**：
1. **App 内动态渲染与静态框架解耦**：`@mdx-js/mdx` 的 `evaluate()` 在 Tauri WebView 里运行时编译 LLM 产出的 MDX，组件注册表映射到本地 React 组件——完全离线、即改即见（需变量白名单沙箱）。
2. **图表 mermaid 单主力 + D2 精修**：mermaid 是 LLM 生成成功率最高的 DSL（MIT、浏览器端）；颜值敏感章节走 mermaid-to-excalidraw 或 D2 sketch 模式。
3. **自研轻量 runner 取代 Sandpack**（已弃用；WebContainers 商用收费）：react-live + pyodide + esbuild-wasm 沙箱。
4. **License 红线全部规避**（已核实）：tldraw（$6k/年）、Remotion（≥4 人公司付费）、WebContainers（商用授权）、Sandpack（弃用）、judge0（GPL 服务）、A1111（AGPL）。**推荐核心栈全 MIT/Apache/BSD/MPL，桌面 App 可闭源商用。**

---

## 第六部分：GitHub Top 20 推荐（按对 tutorials-maker 的价值排序，stars 为 2026-10-22 实测）

### Tier A — 范式与生态基石（方法论怎么落地）

| # | Repo | Stars | 一句话理由 |
| --- | --- | --- | --- |
| 1 | [anthropics/skills](https://github.com/anthropics/skills) | 182.8k | Agent Skills 官方规范 + 模板 + 文档类 skill——本仓 SKILL.md 体系的权威来源 |
| 2 | [karpathy/autoresearch](https://github.com/karpathy/autoresearch) | 98.3k | 对话主角：修改→验证→保留/回滚 循环范式；人类只迭代 program.md 的设计直接可抄到教程质量循环 |
| 3 | [wanshuiyin/Auto-claude-code-research-in-sleep (ARIS)](https://github.com/wanshuiyin/Auto-claude-code-research-in-sleep) | 17.9k | **纯 Markdown 实现的 auto-research skill**（赛道最大）——证明该范式无需框架即可移植进本仓 |
| 4 | [freeCodeCamp/freecodecamp](https://github.com/freeCodeCamp/freecodecamp) | 458k | 项目制互动课程标杆：挑战→测试断言→提示 的内容 schema + 每步自动判分 |
| 5 | [rust-lang/rustlings](https://github.com/rust-lang/rustlings) | 64.4k | 练习-校验-解锁 循环的范式模板，课堂运行时"练习即文件"可直接复刻 |
| 6 | [kamranahmedse/developer-roadmap](https://github.com/kamranahmedse/developer-roadmap) | 370k | 可视化学习路径 DAG——课程地图页与前置依赖可视化的样板 |
| 7 | [alchaincyf/darwin-skill](https://github.com/alchaincyf/darwin-skill) | 6.5k | 中文"达尔文.skill"：让 Skill 本身无限进化——教程生成 skill 的自我进化参考 |

### Tier B — 生产管线核心（图文并茂怎么生成）

| # | Repo | Stars | 一句话理由 |
| --- | --- | --- | --- |
| 8 | [mermaid-js/mermaid](https://github.com/mermaid-js/mermaid) | 90.8k | LLM 生成可靠性最高的图表 DSL，浏览器离线渲染——图表层基石 |
| 9 | [mdx-js/mdx](https://github.com/mdx-js/mdx) | 19.8k | `evaluate()` 运行时编译 LLM 输出——App 内动态渲染交互教程的核心引擎 |
| 10 | [excalidraw/excalidraw](https://github.com/excalidraw/excalidraw) | 134.3k | 手绘风颜值担当 + 可嵌入编辑器；配 mermaid-to-excalidraw 桥 |
| 11 | [pyodide/pyodide](https://github.com/pyodide/pyodide) | 14.9k | 浏览器内全离线 CPython——Python 交互教程最大差异化能力 |
| 12 | [codemirror/codemirror](https://github.com/codemirror/codemirror) | — | 最佳内嵌代码编辑器（已迁 Forgejo 托管，npm 正常） |
| 13 | [microsoft/playwright](https://github.com/microsoft/playwright) | 98.2k | UI 截图自动化 + visual-QA 截图判分，一鱼两吃 |
| 14 | [charmbracelet/vhs](https://github.com/charmbracelet/vhs) | 21.2k | 终端操作 GIF：.tape 脚本 LLM 可直接写 |
| 15 | [shikijs/shiki](https://github.com/shikijs/shiki) | ~14k | VS Code 级代码高亮——"文"的质感来源 |
| 16 | [withastro/starlight](https://github.com/withastro/starlight) | 9.4k | 最美开源文档主题，教程导出站首选 |

### Tier C — 研究与质量循环（内容从哪来、怎么越做越好）

| # | Repo | Stars | 一句话理由 |
| --- | --- | --- | --- |
| 17 | [stanford-oval/storm](https://github.com/stanford-oval/storm) | 31.7k | 研究→多视角提问→大纲→带引用全文——教程选题调研与初稿生成直接可用 |
| 18 | [assafelovic/gpt-researcher](https://github.com/assafelovic/gpt-researcher) | 30.2k | 计划→搜索→抓取→综合报告——素材调研层 |
| 19 | [dzhng/deep-research](https://github.com/dzhng/deep-research) | 19.8k | 带 token 预算的补洞式深研——与 autoresearch 预算护栏理念一致 |
| 20 | [open-spaced-repetition/ts-fsrs](https://github.com/open-spaced-repetition/ts-fsrs) | ~830 | FSRS 间隔重复算法 TS 实现（MIT）——课堂运行时复习调度直接嵌入 |

**候补**（进不了 Top 20 但值得收藏）：
[dzhng 系之外的优化循环] [stanfordnlp/dspy](https://github.com/stanfordnlp/dspy)（38.7k，prompt 自动优化）、[openevolve](https://github.com/algorithmicsuperintelligence/openevolve)（7.6k，代码演化）、[gepa](https://github.com/gepa-ai/gepa)（7.1k）；[校验与导出] [markdoc](https://github.com/markdoc/markdoc)（8.5k）、[vale](https://github.com/vale-cli/vale)（6.3k）、[quarto-cli](https://github.com/quarto-dev/quarto-cli)（6.1k）、[rspress](https://github.com/web-infra-dev/rspress)、[vitepress](https://github.com/vuejs/vitepress)、[docusaurus](https://github.com/facebook/docusaurus)；[教学法] [microsoft/prompts-for-edu](https://github.com/microsoft/prompts-for-edu)（1.9k，MIT 教育提示词库）、[Mr.-Ranedeer](https://github.com/JushBJJ/Mr.-Ranedeer-AI-Tutor)（29.5k）、[TheOdinProject/curriculum](https://github.com/TheOdinProject/curriculum)、[exercism](https://github.com/exercism/exercism)；[动画] [motion-canvas](https://github.com/motion-canvas/motion-canvas)（19.4k）、[manim](https://github.com/ManimCommunity/manim)（41.8k）；[中文规范] [sparanoid/chinese-copywriting-guidelines](https://github.com/sparanoid/chinese-copywriting-guidelines)（15.8k）、[yikeke/zh-style-guide](https://github.com/yikeke/zh-style-guide)。

---

## 附：License 红线速查（已核实，2026-10）

| 工具 | 问题 | 结论 |
| --- | --- | --- |
| tldraw SDK ≥4.0 | 商用 $6,000/年/团队 | ❌ 规避 |
| Remotion | ≥4 人公司需付费 | ❌ 商用规避 |
| StackBlitz WebContainers | 运行时专有，商用生产需授权 | ❌ 规避 |
| CodeSandbox Sandpack | 官方弃用，2026-04 关闭服务 | ❌ 用 react-live 自研替代 |
| judge0 | GPL-3.0 服务端 | ❌ 嵌入规避 |
| pandoc / vhs / ComfyUI | GPL/MIT 但为外部进程 | ✅ sidecar 调用无碍 |
| mermaid / mdx / pyodide / excalidraw / starlight / shiki / CodeMirror | MIT / MPL-2.0 | ✅ 核心栈全绿，可闭源商用 |
