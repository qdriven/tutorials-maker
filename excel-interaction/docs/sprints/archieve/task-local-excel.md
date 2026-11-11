---
schemaVersion: 1.0.0
id: task-local-excel
title: Excel 课程定位评审
createdAt: 2026-10-30T17:12:29.965116Z
updatedAt: 2026-10-30T17:13:06.538108Z
status: in_review
branch: qdriven/excel
repository: 
sourceKind: local
sourcePath: 
issueNumber: 
issueUrl: 
issueState: 
issueTitle: 
issueUpdatedAt: 
prNumber: 
prUrl: 
prState: 
prTitle: 
prUpdatedAt: 
---

## 任务上下文

### 问题

使用者反馈：`domains/excel-animation` 的课程「不是在叫 Excel，是在叫解决问题的思路」，方向似乎不对，要求就此提出建议并写入 `docs/review/excel`。 复核后确认反馈成立，且比表面更值得处理：课程内容与课时分类 100% 是 Excel（29 个函数 / 8 类图表 / 18 个课时 / 机器判定的任务），但对外叙事（首屏口号、第一个 section、六步路径命名、品牌副标、离线文档目录名）100% 是方法论，两者对不上。

### 目标

产出一份可执行的定位评审：给出诊断、证据、定位选项与推荐、逐句改写方案、改进清单、落地路线与验收清单，让后续实施有明确依据。

### 范围

- 诊断「内容是 Excel、叙事是方法论」这一错位，并给出可核查的证据
- 给出一句话定位的候选与推荐
- 给出首屏文案、导航与 section 命名、品牌、离线文档的具体改写方案
- 给出改进清单（优先级 / 影响面 / 工作量）、落地路线、验收清单与风险

### 非目标

- 本文只提建议，不实施定位改动（实施另开 task）
- 不改 18 个课时的内容与任务判定（`expected` / `tolerance` 是项目最硬的资产）
- 不删除六步分析路径（降级为「一条主线」，不删除）

### 依赖

- `domains/excel-animation` 的当前实现（`src/landing.ts`、`src/sections/*`、`src/data/course.ts`、`src/workspace/*`）
- `docs/excel/` 的 57 篇离线文档
- 已完成的重构 task：`docs/sprints/task-9-excel.md`（本次反馈正是针对它交付的首屏改版）

### 假设

- 使用者的反馈指向产品身份与叙事，不是指课程内容质量
- 定位改动属于内容与文案层，可以在不动课时内容的前提下完成

### 未决问题

- 评审文档最终放 `docs/review/` 还是与仓库里已有的 `docs/reviews/`（4 篇未入库的评审稿）合并成一个目录：本次按使用者给的路径放 `docs/review/excel.md`，合并与否待定

## 全局上下文

### 摘要

`domains/excel-animation` 是挂在 `@innate/webshell` 上的 Excel 数据分析课程 domain，18 个实验台课时跑在 Univer 真实工作表上，任务用 `expected` / `tolerance` 机器判定，可导出 .xlsx。壳内的 tile 与侧栏文案一直是「Excel 数据分析」，错位只发生在 domain 内部的 Landing 与离线文档。

### 来源

- `domains/excel-animation/src/landing.ts`（首屏文案与统计的事实层）
- `domains/excel-animation/src/sections/*.tsx`（7 个教学 section 的标题与叙述）
- `domains/excel-animation/src/data/course.ts`（六步路径的 id / shortTitle / title）
- `domains/excel-animation/src/workspace/{miniLessons,extraLessons,catalog}.ts`（18 个课时的分类与元数据）
- `docs/excel/**`（57 篇离线文档）

### 约束

- 课时内容与任务判定不改
- 六步路径保留，只降级定位
- 评审结论要能被 grep / 测试核查，不能只停留在形容词

### 全局更新

- 需要：否
- 计划：无需更新全局 Context；本文自身即为该领域的决策文档

## 设计影响

### 是否受影响

否（本文只产出建议，不改实现；建议里的设计变更归入后续实施 task）

> 写评审这一动作本身不改变任何运行时行为或视觉。文中 §5 给出的定位与命名变更属于**待批准的提案**，实施时再走一个 task。

### 现状行为

Landing 首屏主张「别背功能。解决一个问题。」，第一个 section 讲「通用逻辑只有六步」，六步路径的动词全是方法论动词，调研综述占着一个教学 section 位，离线文档第一篇目录叫「六步通用分析路径」，品牌副标 EXCEL FIELD GUIDE 是旅行手册隐喻；而 18 个课时的分类（查找函数 / 数据清洗 / 条件汇总 / 动态函数 / 文本与日期 / 条件格式与判断 …）与 29 个 Excel 函数完全是 Excel 身份。

### 目标行为

产品对外以 Excel 能力为主张：首屏出现 Excel、统计如实报出函数与图表数量、教学 section 全部以 Excel 动作命名、调研综述移出教学序列、离线文档按 Excel 能力组织。六步分析路径保留为课程的一条主线。

### 决策

- 决策 1：诊断结论是「叙事层错位、内容层无问题」，因此改法限定在文案与 IA，不重建课程
- 决策 2：推荐定位 A「用 Excel，把一份真实数据做成结论。」；保留 C「别背 Excel 菜单。学会用 Excel 做完一件事。」作为低风险备选
- 决策 3：统计数字必须由课时 `skill` 字段推导（真实值 29），不再写死
- 决策 4：六步路径降级为「一条主线」，不删除；`title` 保留方法论教学语言，只换 `shortTitle` 与可见标签
- 决策 5：调研综述从教学 section 下线
- 决策 6：加一条防回归断言（首屏必须含 Excel、函数数必须等于推导值）

### 风险

- 直接叫「Excel 实战课」可能显得像培训广告：用「真实数据 + 可交付工作簿 + 机器判定」保住差异，不做函数罗列
- 只换口号不改 section 顺序等于没改：验收清单逐条可 grep
- 改动跨 domain 与离线文档两处：集中在 `landing.ts` 一处改文案，每步可独立验证

### 全局影响

实施后 `domains/excel-animation` 的对外身份与壳内 tile／侧栏一致；离线文档 `docs/excel/` 与 domain 措辞对齐；不影响 dsh / pi / flashcard / agent-lesson1 四个 domain。

## 功能与验证点

### F1 · 定位评审文档

目标：产出一份可执行的定位评审，覆盖诊断、证据、方案、清单与验收。
模块：M1
Spec：—

- F1-V1 [passed] 评审文档存在且结构完整
  - 方法：`docs/review/excel.md` 存在，含「结论先行 / 证据 / 建议 / 改进清单 / 落地路线 / 验收清单 / 风险」各节
  - 证据：文件已写入，含 13 条文案证据（N1—N13）、29 个函数的实测统计、18 个课时的真实分类表
- F1-V2 [passed] 结论可核查，不是主观形容
  - 方法：文中每条现状结论都给出 `文件:行号` 或实测数字（29 个函数、8 类图表、18 个课时、分类清单）
  - 证据：§3 证据表逐条列出位置与原文；§2 的函数清单由课时 `skill` 字段 grep 得出
- F1-V3 [passed] 建议可直接落地
  - 方法：首屏逐句改写表、导航与 section 命名改写表、改进清单（含优先级 / 影响面 / 工作量）、四步落地路线、可 grep 的验收清单
  - 证据：§5.2—§5.5 与 §6—§8
- F1-V4 [passed] 不越界：不改课时内容、不删六步路径
  - 方法：§5.6「不要做的」明确这三条；改进清单中所有项均标注为文案 / IA 层
  - 证据：§5.6 与 §6 的影响面列

## 涉及模块

- M1 [add] docs/review/excel.md — 定位评审文档：诊断 + 证据 + 方案 + 改进清单 + 落地路线 + 验收清单
- M2 [add] docs/sprints/task-local-excel.md — 本任务的记录

## Spec 关联

- S1 [none/-] docs/excel/domain-architecture.md — 本文只提建议，未改架构约定；实施时该文档需要同步补「定位与命名」一节

## 交付记录

- 2026-10-31：复核使用者的定位反馈，逐条定位到 `src/landing.ts`、`src/sections/*`、`src/data/course.ts`、`src/workspace/*` 与 `docs/excel/**` 的具体位置（N1—N13）。
- 2026-10-31：实测课程资产：29 个 Excel 函数、8 类图表、18 个课时及其分类全部为 Excel 语义；确认「内容是 Excel、叙事是方法论」的错位。
- 2026-10-31：产出 `docs/review/excel.md`（10 节）：结论先行、证据 A/B、错位成因、三套定位候选与推荐、首屏逐句改写、导航与 section 命名改写、内容层与品牌与文档改写、反向陷阱、改进清单、四步落地路线、验收清单、风险与取舍。
- 定位评审已产出，待使用者决定是否实施

## 来源原文

### Issue

> （未同步）

### PR

> （未同步）
