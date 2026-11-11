---
schemaVersion: 1.0.0
id: sprint-kimi-excel-interactive-lessons
title: kimi-excel 交互教程 Sprint 1
createdAt: 2026-11-02T00:00:00.000Z
updatedAt: 2026-11-02T00:00:00.000Z
status: planned
branch: feat/kimi-excel-interactive-lessons
repository: qdriven/agent-learning-workbench
sourceKind: local
sourcePath: docs/excel/09-interactive-lessons-plan.md
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

# kimi-excel 交互教程 Sprint 1

> 上游计划：`docs/excel/09-interactive-lessons-plan.md`（计划已落地，文件已移除）
> 周期：2026-11-03 – 2026-11-21（3 周，含验收与缓冲）
> 形态：Standalone Vite（4024），不接 webshell
> 目标：把 LessonConfig / LessonRunner 骨架落地，并完成 3 个代表性 lesson 的端到端切片。

## 1. Sprint 目标

Sprint 1 结束时，kimi-excel 的 standalone 版本应能：

1. 不经过 webshell、不跑 `pnpm gen`，独立启动和构建。
2. 用同一份 `LessonConfig` 驱动表格、动画、任务校验和引导页预览。
3. 完成 3 个 lesson 的端到端操作：
   - `alex-lookup`：查找与缺失值；
   - `dave-clean`：清洗与跨表查找；
   - `customer-rfm`：多步骤 RFM。
4. 在引导页显示 3 个只读 Excel 预览卡片。
5. 通过 typecheck、单元测试、E2E 冒烟测试和 `build:standalone`。

Sprint 1 不接 OnlyOffice，不处理第 11、12 课，不合并三个引擎 app。

## 2. Sprint 范围

### 包含

- standalone 运行与构建基线。
- `LessonConfig`、`WorkbookSeed`、任务类型。
- Handsontable engine adapter。
- task evaluator 和 animation controller。
- `LessonRunner` 与现有 `workspace` 页面的集成。
- 两套主题 token（kimi / excel-green）与不丢状态的切换。
- 3 个 lesson 的迁移。
- 引导页 3 个只读预览。
- 静态资源与部署路径的最小闭环。
- 测试、文档、演示脚本。

### 不包含

- 其余 15 个 lesson。
- 第 11、12 课的 Univer/OnlyOffice 方案。
- OnlyOffice Document Server、Docker、桌面版。
- Excel 导出、fill、choice、chart 任务的完整 UI。
- 三个引擎 app 的合并。
- `domains/excel-animation` 迁移到 `apps/kimi-excel`。
- skill v2 的完整实现（只在 Sprint 末尾记录 schema 反馈）。

## 3. Task Board

| ID | Task | 主要产出 | 估算 | 依赖 | 状态 |
|---|---|---|---|---|---|
| T1 | Standalone 基线 | `dev:standalone` / `build:standalone` 可独立运行；根脚本建议 | 1.5d | — | todo |
| T2 | LessonConfig 与 WorkbookSeed | `lesson-types.ts`、`render` / `category` / `requires`、任务类型、预览类型 | 1d | T1 | todo |
| T3 | Handsontable adapter | 加载快照、读写、切表、格式、选区、能力声明 | 1.5d | T2 | todo |
| T4 | Task evaluator 与动画控制 | formula/text/choice 校验；逐行写入、闪格、滚动 | 1.5d | T2, T3 | todo |
| T5 | LessonRunner 集成 | 左指南右表格、进度、重置、移动端、两套 token 切换 | 2d | T3, T4 | todo |
| T6 | 迁移 alex-lookup | VLOOKUP/XLOOKUP、缺失值、测试 | 1d | T5 | todo |
| T7 | 迁移 dave-clean | TRIM＋CLEAN、COUNTIF、XLOOKUP、测试 | 1d | T5 | todo |
| T8 | 迁移 customer-rfm | MAXIFS/COUNTIFS/SUMIFS/AND、多步骤、测试 | 1.5d | T5 | todo |
| T9 | 引导页 Excel 预览 | `ExcelPreview` 组件、3 个预览卡片 | 1d | T2, T6–T8 | todo |
| T10 | 静态资源与部署 | samples 同源方案、BASE_PATH、子路径构建 | 1d | T1, T9 | todo |
| T11 | QA 与演示 | E2E、typecheck/build、演示脚本、文档 | 1d | T6–T10 | todo |

总估算约 14 人日；按 1 人开发预留 3 周，包含评审和缓冲。

## 4. Task 详情

### T1 · Standalone 基线

**目标**

确认 kimi-excel 可以完全脱离 webshell 运行，并把 standalone 作为本期唯一入口。

**产出**

- 验证 `pnpm --filter @innate/domain-excel-animation dev:standalone`。
- 验证 `pnpm --filter @innate/domain-excel-animation build:standalone`。
- 确认产物在 `domains/excel-animation/dist-standalone/`。
- 在根 `package.json` 增加或规划统一别名：
  - `dev:excel`
  - `build:excel`
- 在 README 或计划中记录端口 `4024`、入口 `BASE_PATH`。

**验收**

- 不运行 `pnpm gen`，不依赖 `@innate/webshell`，页面可打开。
- `build:standalone` 成功。
- 文档中不再把 4020 作为本期入口。

**验证命令**

```bash
pnpm --filter @innate/domain-excel-animation dev:standalone
pnpm --filter @innate/domain-excel-animation build:standalone
```

### T2 · LessonConfig 与 WorkbookSeed

**目标**

把 lesson 内容从 Univer 的 `IWorkbookData` 和 `createSnapshot()` 中解耦，形成可序列化配置。

**产出**

- `src/lesson/lesson-types.ts`
- `WorkbookSeed` / `SheetSeed`
- `LessonConfig`、`LessonStep`、`LessonTask`
- `render`：`engine` / `theme` / `template` / `motion`
- `category` 与 `requires`（能力声明）
- 任务类型：formula、text、choice；为 fill/chart/export 预留类型
- `preview` 数据类型
- 至少一个演示 lesson 的配置样例

**验收**

- 配置文件不 import Univer / Handsontable / OnlyOffice 类型。
- 配置可 JSON 序列化。
- `theme` / `template` / `motion` 的取值受 schema 校验，非法值直接报错。
- 类型检查通过。
- 现有 lesson 数据可以映射到新结构，不要求本轮全部迁移。

### T3 · Handsontable Adapter

**目标**

用 Handsontable + HyperFormula 实现统一 `LessonEngine` 接口。

**产出**

- `src/lesson/engines/handsontable.ts`
- 加载 `WorkbookSeed` 到多个 sheet
- `readValue` / `readFormula`
- `writeRows` / `writeMatrix`
- `switchSheet`
- `selectRange`
- `setNumberFormat` / `setCellClass`
- `capabilities()` 能力声明
- 切表时清理 cell meta

**验收**

- 至少 2 个 sheet 可切换。
- 公式写入后能读回计算值。
- 切换 sheet 后数字格式和单元格样式不串表。
- 不出现 `getSourceData()` 用法。

**参考**

- `apps/handsontable-excel/src/sheet.ts`
- `apps/handsontable-excel/README.md`

### T4 · Task Evaluator 与动画控制

**目标**

让 lesson 任务可以被机器判定，并让写入过程可见。

**产出**

- `src/lesson/task-evaluator.ts`
- formula 任务：公式原文 + 计算值 + tolerance
- text 任务：关键词/精确匹配
- choice 任务：答案匹配
- `src/lesson/animation.ts`
- 逐行写入、闪格、自动滚动、步骤切换

**验收**

- 正确输入通过，错误输入有明确提示。
- 硬编码结果不通过（必须检查公式原文）。
- 重置后状态干净。
- 动画不阻塞校验。

### T5 · LessonRunner 集成

**目标**

把现有 `workspace` 页面改为通用 lesson runner，而不是绑定 Univer 编辑器。

**产出**

- `src/lesson/lesson-runner.tsx`
- 左侧步骤/指南，右侧表格
- 任务进度、完成状态、重置
- 移动端 guide / sheet 切换
- `data-theme` 切换与 `theme-kimi.css` / `theme-green.css` 两套 token
- 复用现有 `LessonIntro`、`LessonCatalogDrawer`、`useProgress`
- `workspace.tsx` 作为路由壳，不承载引擎细节

**验收**

- 一个 lesson 可以从第一步走到完成。
- 进度保存后刷新仍存在。
- 切换 lesson 不残留上一条任务状态。
- 切换主题不重置 lesson 状态，指南/公式/结果保持一致。
- 页面无控制台错误。

### T6 · 迁移 alex-lookup

**目标**

把“商品主数据：VLOOKUP 与 XLOOKUP”迁移到 runner。

**产出**

- `lessons/alex-lookup.lesson.ts`
- 商品表 + 查询练习表
- XLOOKUP、VLOOKUP、缺失值三个任务
- VLOOKUP 精确匹配使用 `0`，不使用裸 `FALSE`
- 单元测试 + E2E

**验收**

- P-103 返回咖啡豆。
- P-104 单价返回 150。
- P-999 返回“未匹配”。
- 用户改查找值后结果更新。

### T7 · 迁移 dave-clean

**目标**

把“订单清洗：空格、重复与查找”迁移到 runner。

**产出**

- `lessons/dave-clean.lesson.ts`
- 订单表 + 清洗任务表
- TRIM＋CLEAN、COUNTIF、XLOOKUP 三个任务
- 单元测试 + E2E

**验收**

- “ 华东 ” 清洗为“华东”。
- 重复订单判断返回 TRUE。
- SO-1003 销售额返回 800。
- 不改变原始订单表。

### T8 · 迁移 customer-rfm

**目标**

把“客户 RFM”迁移到 runner，验证多步骤、多任务和跨表公式。

**产出**

- `lessons/customer-rfm.lesson.ts`
- 客户订单表 + 客户汇总表
- MAXIFS、COUNTIFS、SUMIFS、IF＋AND 任务
- 单元测试 + E2E

**验收**

- 张三：5 天、3 次、1000 元、重要价值客户。
- 李四：182 天、2 次、300 元、一般维护客户。
- 多任务可逐步完成。
- 修改订单数据后重新校验能反映变化。

### T9 · 引导页 Excel 预览

**目标**

在 kimi-excel 引导页展示真实 lesson 数据的只读 Excel 预览，而不是静态假表格。

**产出**

- `src/lesson/preview/excel-preview.tsx`
- 使用 `LessonConfig.preview` 渲染 HTML/CSS 迷你表格
- 3 个预览卡片：alex-lookup、dave-clean、customer-rfm
- 点击卡片进入对应 lesson
- 不加载 Handsontable/OnlyOffice live 实例

**验收**

- 预览数据与 lesson 配置一致。
- 首屏不因预览增加多个引擎实例。
- 移动端布局正常。
- 预览可访问性：表格有 caption/aria-label。

### T10 · 静态资源与部署

**目标**

让 standalone 产物可以纯静态部署，不依赖开发期 proxy。

**产出**

- 处理 `/samples`、`/downloads`：
  - 将必要文件复制到 `public/` 或构建输出；或
  - 明确改为同源静态资源。
- 对齐 `BASE_PATH` 与 Vite `base`。
- 验证 `dist-standalone/` 在子路径下可打开。
- 记录 GitHub Pages 部署步骤。

**验收**

- 断开 `apps/server` 后，练习文件链接仍可下载（或明确标注为外部资源）。
- 子路径部署无 404。
- `build:standalone` 无报错。

### T11 · QA 与演示

**目标**

对 Sprint 1 的 3 个 lesson 做完整验收，并留下可复现的演示脚本。

**产出**

- E2E 脚本：3 个 lesson 的加载、运行、改错、改对、完成。
- `pnpm typecheck`、`pnpm lint`、相关测试通过。
- 演示脚本：启动命令、打开 URL、3 个 lesson 的操作路径。
- 更新计划/README 中的 Sprint 1 完成状态。
- 记录未解决问题，转入 Sprint 2 backlog。

**验收**

- 3 个 lesson 全部完成。
- 控制台无错误、无失败请求。
- 移动端可用。
- `build:standalone` 通过。
- 文档记录与实现一致。

## 5. Sprint 完成定义

Sprint 1 完成必须同时满足：

- [ ] `dev:standalone` / `build:standalone` 不依赖 webshell、`pnpm gen`、`domains/`。
- [ ] 3 个 lesson 可在 runner 中完成，并保存进度。
- [ ] 公式任务校验“公式原文 + 计算值”，不是只看结果。
- [ ] 引导页有 3 个只读 Excel 预览，且不加载 live 引擎。
- [ ] `kimi` / `excel-green` 两套主题可切换，lesson 状态不丢。
- [ ] `dist-standalone/` 在目标路径下可运行。
- [ ] typecheck、lint、相关测试通过。
- [ ] 未新增 app、未新增 lesson 专属 HTML。
- [ ] 未引入 OnlyOffice/Docker 运行时依赖。
- [ ] 文档、演示脚本、风险清单更新。

## 6. 验收演示脚本

```bash
# 1. 安装与启动
pnpm install
pnpm --filter @innate/domain-excel-animation dev:standalone

# 2. 打开
# http://localhost:4024/kimi-excel

# 3. 依次验证
# - 首页：3 个 Excel 预览卡片
# - alex-lookup：P-103 → 咖啡豆；P-104 → 150；P-999 → 未匹配
# - dave-clean：清理“ 华东 ”；重复订单 → TRUE；SO-1003 → 800
# - customer-rfm：张三 → 5 天 / 3 次 / 1000 / 重要价值客户
# - 修改一个输入，确认结果和校验同步更新
# - 刷新页面，确认进度仍存在
# - 切换 kimi / excel-green，确认公式、步骤、进度不变

# 4. 构建
pnpm --filter @innate/domain-excel-animation build:standalone
```

## 7. Backlog（Sprint 2+）

| ID | Task | 说明 |
|---|---|---|
| B1 | L1 剩余 7 个 lesson | rohan-questions、eda-outliers、plans、text-date、dirty-data、inventory-reorder、supply-quality |
| B2 | L2 六个 lesson | free-excel、luke-charts、maf-charts、power-query、portfolio-dashboard、kpi-format |
| B3 | L3 两个 lesson | two-way-lookup、dynamic-arrays；Univer/静态模拟/OnlyOffice 决策 |
| B4 | 导出 XLSX、fill、choice、chart 任务 | 支撑 L2 |
| B5 | 引擎实验台合并 | 三个 engine app → `apps/excel-engine-lab` |
| B6 | skill v2 | 基于稳定的 LessonConfig 更新 `excel-tutorial-maker` |
| B7 | 产品目录迁移 | `domains/excel-animation` → `apps/kimi-excel` |

## 8. 风险与阻塞

| 风险 | 影响 | 应对 | Owner |
|---|---|---|---|
| HyperFormula 公式行为与 Univer 不一致 | 迁移任务失败 | 先做 T3/T4 探针；公式差异写入测试 | 引擎 |
| `workspace.tsx` 体量大，集成风险高 | T5 延期 | 先加 runner 壳，不一次性删除 Univer 代码 | 前端 |
| samples 依赖 `apps/server` proxy | 静态部署失败 | T10 提前处理，优先同源静态文件 | 前端/部署 |
| 3 个 lesson 数据结构差异大 | schema 反复 | T2 以 3 个 lesson 为样本设计，不追求一次覆盖全部 | 架构 |
| 目录迁移与运行时改造同时进行 | 范围失控 | Sprint 1 不迁移目录，只做 standalone | 全员 |

## 9. 变更记录

- 2026-11-02：创建 Sprint 1，基于 `09-interactive-lessons-plan.md` 的 Phase 0–1 与 standalone-first 范围。
