# 可执行操作清单

**输入：** [`SUMMARY.md`](./SUMMARY.md)（结论）· [`ANALYSIS.md`](./ANALYSIS.md)（差距分析）
**用途：** 把调研结论转成**本仓可开工的动作**。每条动作都给出落点、依赖、验收标准。
**落地方式：** 按 [`AGENTS.md`](../../AGENTS.md) 四件套执行 —— 建 `docs/project/issues/<id>.md` → 在 `feature/<issue>-<agent>` 分支实现 → 追加 `docs/project/tasks/issues/<id>.md` → PR 合并。

**排序原则：** 先决策、后契约、再代码，最后内容与运营。**A 类未做完不要开 B 类的实现类动作** —— 否则会在没有用户定义的情况下把错误做进代码。

---

## 总览

| 组 | 目标 | 条目 | 阻塞关系 |
|---|---|---|---|
| **A 决策** | 把"做什么、为谁做"钉死 | 4 条 | 阻塞 B 组全部 |
| **B 契约与代码** | 把决策变成可校验的契约与实现 | 5 条 | 依赖 A1/A2 |
| **C 内容与运营** | 产出第一批内容与社区规则 | 3 条 | 依赖 A2/B3 |
| **D 调研补验** | 补上调研未闭合的问题 | 4 条 | 可并行 |
| **E 明确不做** | 防范围蔓延 | 5 条 | 约束 A–D |

---

## A. 决策类（P0，先于任何代码）

### A1 · 定位决策：产品是"社区基础设施"还是"独立产品"

| 项 | 内容 |
|---|---|
| **依据** | [`ANALYSIS.md` §1](./ANALYSIS.md)（调研命题是"非产品/非 SaaS"，本仓在做产品，二者不是同一问题） |
| **落点** | `docs/project/spec/architecture.md` 增加 ADR 段落；`docs/project/overview.md` 更新"一句话" |
| **依赖** | 无（第一件事） |
| **验收** | 明确写出选 A / B / C 三者之一及理由；`overview.md` 的一句话描述与该选择一致；`docs/project/index.md` 依赖主线图同步更新 |
| **工作量** | S（文档决策，半天） |
| **备注** | 建议选 A（产品即社区基础设施）。选 B 则调研的 15 章降级为背景存档，须在 README 注明"调研与本仓无关" |

### A2 · 定义目标用户与首个垂类场景

| 项 | 内容 |
|---|---|
| **依据** | [`ANALYSIS.md` §3](./ANALYSIS.md)；`SUMMARY.md` C2（唯一被验证的需求位置 = 亲子共学 × 具体学科；用户单元 = 家庭） |
| **落点** | 新建 `docs/project/issues/edu-target-audience.md`；结论写进 `docs/project/overview.md` 与 `spec/contracts/course-manifest.md`（`meta.audience` 的取值域） |
| **依赖** | A1 |
| **验收** | 写明：(a) 首个场景的具体学科方向（如"AI 辅助数学思维"，而非"AI 素养"）；(b) 用户单元（家庭/成人个人）；(c) 是否含家长端内容及形态；(d) `meta.audience` 的受控取值域落进契约 |
| **工作量** | S（决策）+ S（契约字段） |
| **反模式** | ❌ 用"AI 素养课程"或"全年龄"当答案 —— 调研里 KidsAiTools 已证明这条不规模化 |

### A3 · 定义"作品物"格式（成果可见性）

| 项 | 内容 |
|---|---|
| **依据** | [`ANALYSIS.md` §4](./ANALYSIS.md)；`SUMMARY.md` C3（"阶段性可见成果"是留存引擎的第一半）；调研 §8.3 阶段一退出标准"至少 5 个家庭分享了项目成果" |
| **落点** | 新建 `docs/project/spec/contracts/portfolio-artifact.md`；`spec/architecture.md` 补落点 |
| **依赖** | A2 |
| **验收** | 契约能表达：一个可导出的成果物（含产出物本体 + 产生它的 course/scene 引用 + 作者单元 + 分享所需的最小元信息）；明确"不引入账号系统"；`scenes[]` 与成果物的关系写清 |
| **工作量** | M |
| **备注** | 这是本仓**当前完全缺失**的一块。没有它，C3 的"可见成果"无处落地，调研的阶段一退出标准无法被度量 |

### A4 · 推理分层策略：要不要引入端侧推理

| 项 | 内容 |
|---|---|
| **依据** | [`ANALYSIS.md` §2](./ANALYSIS.md)；`SUMMARY.md` C1（端侧 ≤8B 可用）；`technical-overview.md` §7（"免 Node"方案仍待定） |
| **落点** | `docs/project/issues/edu-inference-tiering.md` |
| **依赖** | A1 |
| **验收** | 明确：(a) 哪些任务属于端侧（分类、判分前置、提示生成）；(b) 哪些必须服务端（长程 Agent、多角色 PBL、复杂 RAG）；(c) 端侧不可行时是否接受"必须装 Node"的现状并写进 spec 风险项 |
| **工作量** | S（决策） |
| **备注** | **可以先只做决策不做实现。** 这一条的价值是把调研的技术基座结论接进架构讨论，避免"零服务器"被误读成"必须浏览器端" |

---

## B. 契约与代码类（P1）

### B1 · `CoursePackage` 增加合规字段

| 项 | 内容 |
|---|---|
| **依据** | [`ANALYSIS.md` §6](./ANALYSIS.md)；调研 §8.5.3（内容形态须避开"面向 K12 的学科培训"） |
| **落点** | `docs/project/spec/contracts/course-manifest.md` → `desktop/src/lib/course-manifest.ts`（类型 + 手写校验器） |
| **依赖** | A2 |
| **验收** | `meta` 新增 `license`（如 `CC-BY-SA`）与 `contentClass`（受控枚举，如 `family-project` / `open-resource` / `subject-training`）；校验器对 `contentClass=subject-training` 给出**明确警告**；校验器仍保持"聚合全部错误、不短路"语义；`sample-course.ts` 同步更新并过校验 |
| **工作量** | S |
| **备注** | 现有 `sourcePdf?` 与 `version` 已留挂载点，改动面小。这是投入产出比最高的一条 |

### B2 · `quiz` 的 `task` 类型打通"同伴互评"

| 项 | 内容 |
|---|---|
| **依据** | [`ANALYSIS.md` §4](./ANALYSIS.md)；`SUMMARY.md` C3（同伴问责是留存的核心杠杆，完成率 50–100% vs 9–46%） |
| **落点** | `docs/project/spec/contracts/course-manifest.md` → `desktop/src/lib/course-manifest.ts` → `components/courses/` |
| **依赖** | A2；建议与 B3 同批 |
| **验收** | `Question` 的 `task` 分支能表达"由某角色/某人对某份提交按 rubric 反馈"；`rubric` / `gradingNotes` 语义扩展为可同时服务 AI 判分与人工互评；校验器不破坏既有 `choice`/`open` 分支；有一条样例题覆盖新路径 |
| **工作量** | M |
| **备注** | **这是零账号系统成本拿到"真人在环"的最短路径。** 不做账号、不做社区版，先让课程包本身支持"人对人按评分点反馈"的语义 |

### B3 · 作品物导出链路

| 项 | 内容 |
|---|---|
| **依据** | [`ANALYSIS.md` §4](./ANALYSIS.md)；调研 §8.3 阶段一退出标准 |
| **落点** | `desktop/src/lib/course-io.ts`（复用现有 import/export 的 Rust 命令通道） |
| **依赖** | A3 |
| **验收** | 能从一次课程运行中导出一个符合 A3 契约的作品物；导出走现有 `export_course` 同一套路径，不新增第二套 IO 机制；导出产物可被重新导入或被分享 |
| **工作量** | M |

### B4 · 贡献者指南 + AIGC 使用规范

| 项 | 内容 |
|---|---|
| **依据** | [`ANALYSIS.md` §5](./ANALYSIS.md)；`SUMMARY.md` C4（规范要在第一个内容发布时就立好，不是等 UGC 来了再补） |
| **落点** | 新建 `docs/project/spec/contribution-guide.md`；AIGC 标注规则并入 `spec/contracts/course-manifest.md` |
| **依赖** | B1 |
| **验收** | 写明：内容贡献流程、许可与署名、AIGC 允许范围与**必须标注**的情形、UGC 的三维评估口径（准确性 / 趣味性 / 家庭友好性）、违规处理 |
| **工作量** | S |
| **备注** | 纯文档，无代码依赖，越早越便宜 |

### B5 · UGC 接入闸门（**先不做**）

| 项 | 内容 |
|---|---|
| **依据** | [`ANALYSIS.md` §5](./ANALYSIS.md)（本仓已具备"大量 UGC 涌入"的技术前提，却无质量机制 —— 这两条能力同时存在是危险的） |
| **落点** | `docs/project/issues/edu-ugc-gate.md` |
| **依赖** | B4 + A3 + B3 |
| **验收** | 导入路径上增加 UGC 通道与 PGC 通道的区分；未过三维评估的内容不进入公开列表 |
| **工作量** | M |
| **状态** | **本期不开工。** 仅登记 Issue 留待 PGC 内容跑通后再启动 |

---

## C. 内容与运营类（P1–P2）

### C1 · 首批 PGC 家庭项目样例

| 项 | 内容 |
|---|---|
| **依据** | `SUMMARY.md` C4（创始人须亲自生产前 30–50% 内容）；调研 §8.3 阶段一（10–15 个"家庭 AI 项目"教程） |
| **落点** | `desktop/src/lib/sample-course.ts` 扩展 + `docs/project/spec/sop/` 增补项目模板 |
| **依赖** | A2、B1、B3 |
| **验收** | 至少 3 个完整"家庭项目"样例课程（含角色分工、场景、测评、成果物），每个符合 A2 的场景与 A3 的成果物契约，且过 `validateCoursePackage()` |
| **工作量** | M |
| **备注** | 3 个是**验证用最小集**，不是调研里的 15 个。先验证"能不能跑通家庭项目全链路"，再谈数量 |

### C2 · 社区规则草案

| 项 | 内容 |
|---|---|
| **依据** | 调研 §8.3 阶段二（明确社区准则）、§8.5.4（防"僵尸化"） |
| **落点** | `docs/project/spec/community-rules.md`（草案） |
| **依赖** | A2 |
| **验收** | 覆盖：鼓励试错、禁止学科焦虑贩卖、尊重家庭节奏、AIGC 内容标注、家庭互评的基本礼仪 |
| **工作量** | S |

### C3 · 成果展示与互评流程（草案）

| 项 | 内容 |
|---|---|
| **依据** | `SUMMARY.md` C3；调研 §8.5.4（每月新项目挑战 + 家庭互评机制） |
| **落点** | `docs/project/spec/community-rules.md` 增节 / `docs/project/issues/` |
| **依赖** | A3、B3、C2 |
| **验收** | 写清流程：谁向谁互评、评审维度如何复用 rubric、争议如何处理、结果如何回流进课程（eg. 把高分互评汇入 `mastery[]`） |
| **工作量** | S |

---

## D. 调研补验类（P2，可与 A/B 并行）

> 调研自身给出的未闭合问题（见 [`SUMMARY.md` 末尾](./SUMMARY.md)）。这些是**调研债**，不阻塞产品开发，但会影响长期方向判断。

| ID | 问题 | 落点 | 验收 |
|---|---|---|---|
| **D1** | 亲子共学场景下端侧 ≤8B 模型的能力边界 | `research/ai-edu-community/sources/` 新增笔记 | 给出"端侧能做什么/不能做什么"的明确清单，并与 A4 决策对齐 |
| **D2** | 免费层 → 付费层的真实转化率基线 | 同上 | 至少有 1 个可引用的行业基线来源；无来源则明确标为"无数据"而非估算 |
| **D3** | 中国 vs 西语/拉美市场的先后判据 | 同上 | 给出可比较的判据（而非"都很大"） |
| **D4** | 第 10–15 章缺少交叉验证 | `sources/cross_verification.md` 增补 | 对西语/全球南方/国考/交互工具 4 章补置信度分级；补不到就降级标注 |

---

## E. 明确不做（防止范围蔓延）

| # | 不做 | 理由 |
|---|---|---|
| 1 | **不做账号系统** | 调研 §8.5 提示家长 AI 素养不足，账号/登录会抬高第一道门槛；先用文件分发（course-io 已具备）验证需求 |
| 2 | **不做云端同步 / 多端课程库** | 与 C1 零服务器基座冲突；先把单机的课程生产-播放闭环跑通 |
| 3 | **不把调研 §8.3 的 18 个月路线图当开发 sprint 用** | 那是**社区运营**路线图（人力 = 运营者），不是产品开发路线图（人力 = 工程师），节奏与验收完全不同 |
| 4 | **不用低置信度数据做决策** | `SUMMARY.md` 已单列 6 条低置信度内容（Pieter Levels 收入、OpenClaw"历史第一"、弹幕游戏成本等） |
| 5 | **不因为"结论很大"就扩仓** | 调研验证的是"方向存在"，不是"这个仓要做社区平台"；A1 的三选一没做完之前，仓的形态不变 |

---

## 建议的 Issue 清单（可直接建）

| Issue ID | 对应动作 | 建议 Phase | 依赖 |
|---|---|---|---|
| `edu-product-positioning` | A1 | 0 | — |
| `edu-target-audience` | A2 | 0 | A1 |
| `edu-inference-tiering` | A4 | 0 | A1 |
| `edu-portfolio-artifact` | A3 | 1 | A2 |
| `edu-manifest-compliance-fields` | B1 | 1 | A2 |
| `edu-peer-review-question` | B2 | 1 | A2 |
| `edu-contribution-guide` | B4 | 1 | B1 |
| `edu-artifact-export` | B3 | 1 | A3 |
| `edu-sample-family-projects` | C1 | 1 | A2, B1, B3 |
| `edu-community-rules` | C2 | 2 | A2 |
| `edu-ugc-gate` | B5 | 2（暂缓） | B4, A3, B3 |

**建议起手顺序：** `edu-product-positioning` → `edu-target-audience` → `edu-portfolio-artifact` → `edu-manifest-compliance-fields` → `edu-peer-review-question`。

理由：A1/A2 是所有后续工作的前提；A3 与 B1 可并行（B1 成本最低）；B2 是把 C3 的留存结论第一次真正落进代码的地方。

---

## 相关

- [`SUMMARY.md`](./SUMMARY.md) — 结论提炼
- [`ANALYSIS.md`](./ANALYSIS.md) — 差距分析（每条动作的依据出处）
- [`report/ai-edu-community-research-report.md`](./report/ai-edu-community-research-report.md) — 完整报告
- [`../../docs/project/index.md`](../../docs/project/index.md) — 本仓 Issue 看板
