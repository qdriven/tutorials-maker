# 代码仓库分析 · 从 cs-systems-design 到 tutorials-maker

- 调研日期：2026-11-05
- 对应 issue：[qdriven/tutorials-maker#7](https://github.com/qdriven/tutorials-maker/issues/7)
- 参考仓库：`references/cs-systems-design`（[kejun/cs-systems-design](https://github.com/kejun/cs-systems-design)）
- 目录：`docs/research/repo-analysis/`
- 读者：要做「代码仓库 → 教程 / 可交互学习页」的产品、设计、前端与 Agent Skill 作者

## 先看结论

1. **cs-systems-design 的核心不是 UI，而是四件套：内容契约、语义图元、播放状态机、构建期验证。** 页面只是这套东西的结果。它的 27 个主题、54 个场景、216 个阶段全部由数据驱动，页面代码只有 17.9 KB。
2. **它可以被抽象成五层：LessonSpec（内容）→ Scenario/Step（叙事）→ Renderer（可视化）→ Playback（交互）→ Verifier（验证）。** 换一个学科、换一种渲染器，这五层仍然成立。
3. **它最强的三个技术特点是：正常/故障双场景、7 元组步骤契约、渲染/运动/内容三层回归测试。** 这三点比等距插画本身更值得借鉴。
4. **「代码仓库 → 课程」这一类 Skill 里，最接近 tutorials-maker 的目标的是 codebase-to-course、teachable-code、explain-this 和 archify。** 但它们各有明显缺口：许可、验证、文字动画能力，没有任何一个同时拿满。
5. **「文字动画」不是 repo→course 类 Skill 的强项。** 真正擅长滚动叙事、逐字动画、动力学排版的是 scroll-craft、Remotion motion graphics、huashu-design、taste-skill 这类输出型 Skill。可行路线是「repo 理解 Skill + 动效 Skill」组合，而不是找一个全能 Skill。
6. **对 tutorials-maker 的建议：做内容和渲染的分离层，先定 LessonSpec，再做 2–3 个渲染器（流程、状态、文字动画），把验证做成 CI。** 不要直接复刻 cs-systems-design 的等距图，也不要直接搬某个 Skill 的代码；先借它的「契约 + 验证」，再借动效 Skill 的「时间轴 + 降级」。

## 文档导航

| 文件 | 内容 | 什么时候读 |
|---|---|---|
| [01-implementation.md](01-implementation.md) | cs-systems-design 的实现原理：文件分层、内容模型、播放状态机、等距渲染、知识地图、构建与三层验证、技术特点与局限 | 要理解参考仓库「到底怎么做的」时 |
| [02-abstraction.md](02-abstraction.md) | 如何把参考仓库抽象成可复用的 LessonSpec / Step / Relation / Renderer / Verifier，以及文字动画扩展 | 要设计 tutorials-maker 的内容模型和运行时架构时 |
| [03-top10-skills.md](03-top10-skills.md) | Top 10「简单代码仓库 → 学习产物」Skill 调研、评分、逐项拆解、动效加成 Skill 与选型建议 | 要决定用哪个 Skill、或自研 Skill 该抄哪些机制时 |
| [04-recommendations.md](04-recommendations.md) | 把三条线合成一条落地路线：MVP 范围、目录结构、验收标准、风险清单 | 要排期、拆任务、做技术决策时 |

### 三条 issue 要求分别落在哪

| issue 要求 | 对应文档 |
|---|---|
| 1. 地址 `references/cs-systems-design` | [01-implementation.md](01-implementation.md) 全文 |
| 2. 分析实现原理、如何抽象化、技术特点 | [01-implementation.md](01-implementation.md) 第 4–11 节；[02-abstraction.md](02-abstraction.md) 全文 |
| 3. Top 10 简单代码仓库 SKILL 调研 | [03-top10-skills.md](03-top10-skills.md)；[04-recommendations.md](04-recommendations.md) 第 9 节选型 |

## 调研方法

- **精读源码**：逐个阅读 `dist/index.html`、`dist/data.js`（结构抽样）、`dist/app.js`、`src/isokit-*.{jsx,mjs}`、`scripts/build.mjs`、三个 `check-*.cjs` 与 `docs/*.md`。
- **实际运行**：在本地执行 `node check-content.cjs`，确认内容契约通过（27 lessons / 54 scenarios / 216 typed stages）。完整的 `npm run check` 需要先 `npm ci`，本次未安装依赖，因此渲染与运动检查以阅读代码和仓库自带证据为准。
- **Skill 调研**：用 GitHub Search 与 GitHub API 检索 `codebase-to-course`、`explain codebase`、`agent skill`、`scrollytelling`、`kinetic typography` 等关键词，逐个阅读 README 与 `SKILL.md`，记录 star、许可、最近推送时间与输出形态（均为 2026-11-05 快照）。
- **评分方式**：见 [03-top10-skills.md](03-top10-skills.md)。评分是面向 tutorials-maker 目标的判断，不是客观基准；star 只作采用度信号，不作质量证明。

## 一句话术语约定

本文把「简单代码仓库 SKILL」理解为：

> **输入是一个小型 Web 应用代码仓库，输出是可学习、可交互、可验证的教程/解释产物的 Agent Skill。**

不是指「Skill 仓库本身的代码量很小」。如果你的原意是后者，这份文档里的 Skill 拆解仍然可用，但排名标准需要换。

另外，issue 第 2 点「分析当前代码仓库的实现原理」按上下文理解为第 1 点给出的 `references/cs-systems-design`：tutorials-maker 本仓库当前几乎没有实现代码，只有 README、研究文档和少量参考产物，不足以做实现原理分析。

## 不在本次范围

- 逐页截图与像素级视觉评审；
- 对所有 Top 10 Skill 做实际安装、跑通、对比同一仓库的输出（成本高，且多数 Skill 需要交互式 Agent 会话）；
- 具体课程内容的教学设计；
- 后端 CMS、账号体系、多租户；
- 版权与商用许可的法律意见（文中只标注许可证现状与风险）。

## 相关文档

- 站点 UI 方向调研（issue #6，在 `main` 分支）：<https://github.com/qdriven/tutorials-maker/tree/main/docs/research/ui-resarch>
- 参考仓库本体：`references/cs-systems-design/`（本地参考克隆，未纳入本仓库版本控制）
- 其他参考：`references/teachable-code/`、`references/teachable-figures/`、`skills/cadidates/`（同为本地参考）
