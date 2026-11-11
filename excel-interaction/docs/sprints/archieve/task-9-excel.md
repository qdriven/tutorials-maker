---
schemaVersion: 1.0.0
id: task-9-excel
title: excel 项目重新构建
createdAt: 2026-10-30T13:32:58.581155Z
updatedAt: 2026-10-30T14:31:00.111880Z
status: in_review
branch: qdriven/excel
repository: qdriven/agent-learning-workbench
sourceKind: issue
sourcePath: 
issueNumber: 9
issueUrl: https://github.com/qdriven/agent-learning-workbench/issues/9
issueState: OPEN
issueTitle: excel 项目重新构建
issueUpdatedAt: 2026-10-30T13:30:56Z
prNumber: 
prUrl: 
prState: 
prTitle: 
prUpdatedAt: 
---

## 任务上下文

### 问题

Issue #9 提出三件事：重构 excel 项目、先确认有哪些需要改善的点、重新设计 Landing Page（现状“没有任何清晰的意图”）。 已通读 `domains/excel-animation`（现役 domain，41 个源文件、6,497 行）、`examples/kimi-agent-excel`（旧独立应用，136 文件、14,006 行、6.0 MB）、`docs/excel/`（56 篇教程 + 87 个数据文件）与 `scripts/excel-docs/` 生成管线，确认的改善点分七类，每条都已在仓库中复核： 1. **92.7% 的代码是重复副本**：`domains/excel-animation` 的 29 个文件（6,019 行）与 `examples/kimi-agent-excel/app/src/` 逐字相同或仅差 import 路径；其中 10 个文件字节级完全一致（1,782 行）。旧应用不在 `plugins.registry.yaml`、不在 `pnpm-lock.yaml` 的 importer 列表里，`pnpm -r build/typecheck/lint/test` 全都不经过它——它是纯粹的陈旧载荷。 2. **4.6 MB 数据文件被 git 跟踪两次**：`examples/kimi-agent-excel/app/public/downloads/` 与 `apps/server/samples/kimi-excel/` 的 4 个文件 SHA-256 完全相同（`d4042f84…` / `5ec166b3…` / `d133566d…` / `e80f8cc6…`）。 3. **文档管线指向已废弃的旧应用**：`scripts/excel-docs/generate-lesson-data.mjs:18-19` 仍从 `examples/kimi-agent-excel/app/src/` 取课程定义，`:249` 从旧应用的 `public/downloads/` 取 500 行样本；`docs/excel/` 下 10 个文件共 31 处链接指向旧应用的 downloads 目录。运行时用的却是 `apps/server/samples/kimi-excel/`。文档与运行时会静默漂移。 4. **Landing Page 不是一个 Landing Page**：`domains/excel-animation/src/pages/home.tsx`（242 行）是一个 7 段式单页课程，顶部贴了一个 hero。9 个导航项里 7 个是页内锚点、2 个是路由；“页内学习地图”侧栏里混着 2 个会跳走页面的链接；hero 统计写“7 函数用例”但 `data/course.ts:300` 的 `functionLessons` 只有 5 条；侧栏与 `LearningPath.tsx:34` 都宣称“进度：数据库保存”，实际是 `localStorage`。 5. **设计 token 泄漏到整个壳**：`domains/excel-animation/src/globals.css:26-35` 的 `@theme inline` 在 Tailwind v4 里会输出到 `:root`，而 kimi-excel 的 `pluginOrder: 40` 晚于 flashcard 的 `30`，于是 `--color-ink: oklch(var(--ink))` 覆盖了 flashcard 的 `--color-ink: var(--ink)`（其 `--ink` 是十六进制 `#014e60`），`oklch(#014e60)` 非法 → flashcard 里 38 处 `text-ink` 回落成继承色。 6. **同一批数字硬编码在 4 处**：`37717.27` 出现在 `data/realCases.ts:219`、`workspace/miniLessons.ts:46,48`、`components/BasicsPlayground.tsx:79`；`323429.11` 同样 4 处。改一个数要动 3-4 个文件，没有任何一致性校验。 7. **测试形同虚设**：`src/test/web-domain.test.ts` 只有 5 个断言、只断言数据数组的形状，从不渲染组件、从不碰 `localStorage`／`fetch`／ExcelJS／Univer；`vitest.config.ts` 的 `environment: "node"` 让组件测试当前无法编写。6,497 行应用逻辑的有效覆盖率约 0%。 同时确认了 4 个具体缺陷：`<Toaster>` 只挂在 `/kimi-excel`（`pages/home.tsx:239`），`CopyButton` 的 `toast.error`（`components/TeachingUI.tsx:49`）在 `/basics` 上完全静默；`workspace/retailLesson.ts:182-185` 与 `workspace/chineseRetailLesson.ts:132-135` 用 `formula.replaceAll('2','4')` 换行引用，遇到公式里出现字面量 `2` 会静默改坏；`lib/link.tsx:19-20` 用 `as never` 抹掉 TanStack Router 的类型，`aria-*`／`data-*` 也不透传；`pages/workspace.tsx:365` 的 `stats?.[0].value` 在 `noUncheckedIndexedAccess` 关闭时少了一个 `?.`。

### 目标

- 让 Excel 教程项目只有一份事实源：新 domain、教程文档、配套数据、生成管线全部指向 `domains/excel-animation` 与 `apps/server/samples/kimi-excel/`；旧独立应用整体移除。 - 让 Landing Page 有清晰的意图：一眼说明“给谁、解决什么、怎么开始”，把“读概念”与“动手做”分成两条清晰路径，所有可见文案与真实数据一致。 - 收敛可验证的事实：单一进度存储、单一数字来源、无泄漏的设计 token、真实可跑的测试。

### 范围

- 删除 `examples/kimi-agent-excel/`，并把文档生成管线、31 处文档链接、根 README 改指新事实源。
- 重做 `domains/excel-animation/src/pages/home.tsx` 的信息架构与首屏意图。
- 统一学习进度存储与对外表述。
- 收敛 design token 作用域，消除跨 domain 覆盖与硬编码色值。
- 抽出真实案例数字的单一事实源。
- 修复已确认的 4 个缺陷与 3 个死导出。
- 补齐可运行的测试（进度存储、课时分发、公式换行、landing 事实、token 隔离）。

### 非目标

- 不恢复 MySQL／tRPC 的服务端进度持久化（旧应用的 `drizzle-orm/mysql2` + `mode:"planetscale"` 依赖外部数据库，工作台 `apps/server` 是零依赖 Node SSE 服务，无 DB）。进度继续用浏览器本地存储，但表述必须诚实。
- 不重做 Univer 编辑器、ExcelJS 导入导出、18 个课时的内容本身。
- 不动 `examples/dsh`、`examples/pi`、`examples/flashcard`、`examples/agent-lesson1` 的业务逻辑（只允许受影响时修被污染的 token）。
- 不引入新的 UI 框架或动画库；不加 Tailwind 插件。
- 不做 Landing Page 的图片／视频素材设计（本次只交付结构、文案、事实与可访问性）。

### 依赖

- `innate-fe-cli gen --profile workbench` 的打包面：`domains/excel-animation` → `domains/kimi-excel`，`pluginOrder: 40` 决定 CSS 引入顺序与侧栏顺序。
- `apps/server` 在 `:3081` 静态托管 `apps/server/samples/`，`shells/webshell/vite.config.ts` 把 `/samples` 与 `/api` 代理到它。
- `pnpm docs:excel:data` / `pnpm docs:excel:check` 两个文档管线脚本。
- 新增测试依赖走 `registry=https://registry.npmmirror.com/`（`@innate/*` 仍走本地 Verdaccio `127.0.0.1:4873`）。

### 假设

- 进度本地化是当前形态下的既定取舍（旧应用的服务端进度依赖不可用的 MySQL），本次只保证存储一致与表述诚实。
- `docs/excel/` 的 56 篇教程正文属于内容资产，不在重构范围内；只改其中的来源链接与数据约定描述。
- Landing Page 继续承载部分教学内容（不拆成多个路由），但要把“读”与“做”的层级显式化。
- 旧应用可以整体删除而非部分保留：它的 8 个业务组件、7 个 section、3 个数据文件、8 个 workspace 文件在 `domains/excel-animation` 里都有等价副本，差异只有 import 路径与下载 URL 前缀。

### 未决问题

- （已确认 2026-10-30）Landing Page 一级信息架构 = **读／做 两组并列**：保留单页与现有路由，导航显式分「读概念」与「做实操」两组，不拆新路由。后续若要拆路由另开 task。
- （已确认 2026-10-30）服务端进度重建（`apps/server` 落盘）**不在本 task 范围**，作为后续可选项记录。
- （已确认 2026-10-30）`docs/excel/` 的 18 篇课时文档正文**不改为生成**，本 task 只保证链接与数据索引一致。

## 全局上下文

### 摘要

`agent-learning-workbench` 是 innate-fe 壳 + domain 架构的 web monorepo：`shells/webshell` 提供路由、侧栏与首页 tiles；`examples/*` 是可插拔教程 domain（dsh / pi / flashcard / agent-lesson1 / kimi-excel），由 `innate-fe-cli gen` 复制到不入库的 `domains/`；`packages/tutorial-kit` 是共享教学 UI；`apps/server` 是零依赖 SSE API 并静态托管 `/samples/*`。Excel 教程在这套架构里有两个面孔：`domains/excel-animation` 是挂在壳上的 domain，`examples/kimi-agent-excel` 是重构前遗留的独立 Vite + Hono/tRPC + MySQL 应用。

### 来源

- `docs/excel/README.md` — 教程目录总览与数据约定（说明课程内容源自旧应用）
- `README.md` — 架构树、打包面与常用命令
- `docs/tech-stack.md` — 各 domain 的技术栈与共享层约定
- `plugins.registry.yaml` — profile 与 domain 映射（`kimi-excel` ← `domains/excel-animation`；无 `kimi-agent-excel`）
- `scripts/excel-docs/generate-lesson-data.mjs` — 文档数据生成管线（当前输入旧应用）
- `scripts/excel-docs/check-docs.mjs` — 文档结构与链接校验

### 约束

- 打包面 `domains/` 不入库；一切改动落在 `examples/*`、`packages/*`、`shells/*`、`apps/*`、`docs/*`、`scripts/*`。
- domain 之间通过 `@innate/ui` 与 `packages/tutorial-kit` 共享，不得让一个 domain 的样式影响另一个 domain。
- `pnpm verify` = typecheck + lint + test + `scripts/check-seam.mjs` + `verify-flags`，是交付门禁。
- `pnpm docs:excel:check` 必须保持通过（56 篇教程、3 篇参考、87 个数据文件引用）。
- 课程内容与数据口径不变（UCI 零售样本、SEC EDGAR 申报数据），重构不得改变任何对外数字。

### 全局更新

- 需要：是
- 计划：根 `README.md` 的架构树与 Excel 章节同步；新增 `docs/excel/domain-architecture.md` 记录 domain 的信息架构、数据单一事实源与进度存储约定；`docs/excel/README.md` 去掉对旧应用的来源描述。

## 设计影响

### 是否受影响

是

### 现状行为

Landing Page 用一个 242 行的单页承载全部教学内容：顶部 sticky header + 9 项导航（7 个页内锚点 + 2 个路由），hero 给出“别背功能。解决一个问题。”的口号、2 个 CTA、4 个统计数字和一张手绘工作簿示意图；左侧是复述同一组导航的“页内学习地图”；主体依次是 6 个教学 section；页脚是免责与来源。问题在于：没有说明面向谁、没有可验证的产出承诺、导航层级把“在线实验台”（一个独立应用）与 6 段教学内容并列成同级、统计数字与真实数据不一致（“7 函数用例”实际 5 条）、进度存储描述与实现不符（宣称数据库保存、实为 localStorage）、hero 承诺“20,000 行真实零售交易”但实验台默认加载的是 24 行中文教学模型。

### 目标行为

Landing Page 成为一页说清意图的入口：首屏明确「给谁（第一次做数据分析的职场人／Excel 新手）」「解决什么（把一个业务问题拆成可交付的结论）」「怎么开始（唯一主 CTA 进入实验台）」，并给出一条可验证的完成承诺；同时把内容分成「读：六步路径 / 图表选型 / 函数实验 / 真实案例」与「做：18 个实验台课时」两条并列路径，让读者立刻知道该点哪个；所有统计数字与文案改为从数据源实时推导，不再有硬编码；进度表述改为真实的浏览器本地存储。视觉上延续现有 ink/paper/gold 的印刷风格，不引入新设计语言。

### 决策

- 决策 1：Landing Page 保留单页形态与全部路由，只重构首屏意图与信息层级，不新增／删除路由——把改动限制在内容层，避免牵动 `web-domain.tsx` 与打包面。
- 决策 2：把「读」与「做」显式分成两组导航（概念组 4 项 + 实验组 1 项 + 基础/调研 2 项），侧栏「页内学习地图」只保留页内锚点，路由入口移出该侧栏。
- 决策 3：hero 与页脚的统计数字一律从 `data/course.ts` / `workspace/catalog.ts` 的数组长度实时计算，杜绝“7 函数用例”这类与代码脱节的硬编码。
- 决策 4：进度存储合并到 `lib/progress.ts` 单一模块，用命名空间区分「路径步骤」与「实验台课时」两条进度，写入同一个 storage key；对外文案统一为“保存在当前浏览器”。
- 决策 5（实施中修正）：design token 不改名，而是把 `@theme inline` 的颜色映射从 `oklch(var(--ink))` 改成**作用域相对**的 `var(--ink)`。原计划给 token 加 `geshu-` 前缀，但那要改 927 处类名（`text-ink` 等），Tailwind 类名是字符串，typo 不会报错、只会静默丢样式；改成作用域相对后两个 domain 各在自己的作用域类里定义 `--ink`／`--paper`，映射表达式与 flashcard 完全一致，谁后 import 都不影响结果，且不动一处类名。组件里的硬编码色值改用 `var(--chart-*)`。
- 决策 6：真实案例数字抽到 `data/figures.ts` 作为单一事实源，`realCases.ts`、`workspace/miniLessons.ts`、`components/BasicsPlayground.tsx` 全部改为引用它。
- 决策 7：删除旧应用而不是保留——先改管线与文档链接并验证 `pnpm docs:excel:data` 产物无差异，再删除目录。

### 风险

- 文档链接改指后，31 处链接的相对路径层级从 `../../examples/...` 变为 `../../apps/server/samples/kimi-excel/...`；`scripts/excel-docs/check-docs.mjs` 会逐条校验存在性，漏改即失败。
- 生成管线换源后若 `retailLesson.ts` 的 `/downloads/` → `/samples/kimi-excel/` 差异影响到产物，`docs/excel/data/` 会出现 diff——必须以“产物零差异”为验收标准。
- （已规避）原计划的 token 改名会波及 `domains/excel-animation/src` 内 927 处颜色类名，属于机械替换且无法被 typecheck/lint 捕获；改为作用域相对映射后不需要改类名，风险消失。
- 根 `pnpm format:check`（非 `-r` 作用域）本来就是红的：oxfmt 无配置文件、走默认规则，全仓 301 个文件里 300 个报「格式问题」（含本次未改动的 `shells/webshell/src/main.tsx`），属既有状态，不是本次引入；因此本次不做全仓格式化。
- `jsdom` + `@testing-library/react` 为新增开发依赖，需确认可从 npmmirror 解析且不与 `@innate/*` 的本地 registry 冲突。（实测可解析；`pnpm add` 会在根 lockfile 里写入 `domains/*` importer，需在空 profile 下重跑 install 摘掉。）

### 全局影响

- `shells/webshell` 的首页 tiles 与侧栏不直接受影响，kimi-excel 的 `homeTile` 文案保持不变（描述仍然准确）。 - flashcard 的 `text-ink` 恢复正常（kimi-excel 不再把 `--ink` 包进 `oklch()`），属于对其他 domain 的正向修复；已在浏览器里用 CDP 实测两侧的计算色。 - `docs/excel/` 成为唯一教程事实源后，根 README 与 `docs/excel/README.md` 的来源描述必须同步，否则会再次出现“文档指向不存在的目录”。 - 仓库级门禁 `pnpm verify` 原本被两处既有问题挡住（`examples/agent-lesson1` 的 lint 失败、HEAD 的 lockfile 里残留 `domains/*` importer），本次一并修掉，否则任何任务都无法通过门禁。

## 功能与验证点

### F1 · 移除旧应用与重复资产

目标：删除 `examples/kimi-agent-excel/`（136 文件、14,006 行、6.0 MB），让 `domains/excel-animation` + `apps/server/samples/kimi-excel/` 成为唯一事实源，同时保持文档管线产物零差异。
模块：M1, M2, M3, M4
Spec：S1, S3

- F1-V1 [passed] 文档生成管线改读新事实源后，产物零差异
  - 方法：把 `scripts/excel-docs/generate-lesson-data.mjs` 的课程定义源改为 `domains/excel-animation/src/workspace` + `domains/excel-animation/src/data`、样本源改为 `apps/server/samples/kimi-excel/零售真实样例_500行.csv`；运行 `pnpm docs:excel:data` 后 `git diff --stat docs/excel/data/` 必须为空
  - 证据：node scripts/excel-docs/generate-lesson-data.mjs 后 git diff HEAD --stat -- docs/excel/data/ 仅 docs/excel/data/README.md（5 行，路径改指 apps/server/samples）；18 个课时 CSV 与 index.json 产物零差异
- F1-V2 [passed] 31 处文档链接全部指向存在的新路径
  - 方法：`grep -rn "kimi-agent-excel" docs/ README.md` 无结果；`pnpm docs:excel:check` 输出「56 篇；3 篇；87 个数据文件」且全部通过
  - 证据：grep -rn kimi-agent-excel docs/excel README.md → 无结果；node scripts/excel-docs/check-docs.mjs → 教程文档 57 篇 / 参考文档 3 篇 / 引用数据文件 89 个，✓ 全部通过
- F1-V3 [pending] 旧应用目录被完整删除且仓库仍可构建
  - 方法：`test ! -d examples/kimi-agent-excel`；`pnpm verify` 通过（typecheck + lint + test + check-seam + verify-flags）
  - 证据：-
- F1-V4 [pending] 重复二进制数据只保留一份
  - 方法：`git ls-files | grep -E "零售真实样本_20000行.csv|零售真实样例_500行.csv|真实数据_Excel练习包.xlsx|Apple_2025_SEC原始数据.csv"` 只命中 `apps/server/samples/kimi-excel/` 下的 4 个文件
  - 证据：-

### F2 · 统一学习进度存储与对外表述

目标：路径步骤与实验台课时共用一个存储模块与一个 storage key（内部用命名空间区分），文案如实反映“保存在当前浏览器”，去掉永远为 false 的加载／保存／错误分支。
模块：M5, M6, M7, M8, M9
Spec：S2

- F2-V1 [passed] 两条进度写入同一个 storage key 且互不污染
  - 方法：`src/lib/progress.ts` 暴露 `readProgress()` / `togglePathStep(id)` / `toggleLesson(id)` / `pathStepIds()` / `lessonIds()`；单测断言 `path:question` 与 `lesson:free-excel` 同时存在、互不影响，刷新后仍在
  - 证据：src/test/progress.test.ts：path:question 与 lesson:free-excel 同存一个 key、互不污染、刷新后仍在（4 个用例全过）
- F2-V2 [passed] 旧的分散 key 不再被写
  - 方法：`grep -rn "geshu-progress-v1\|geshu-completed-lessons" domains/excel-animation/src` 只允许出现在 `lib/progress.ts` 的迁移兼容分支里
  - 证据：grep -rn 'geshu-progress-v1\|geshu-completed-lessons' domains/excel-animation/src → 只出现在 src/lib/progress.ts 的迁移常量里
- F2-V3 [passed] 页面上不再出现“数据库保存”类表述
  - 方法：`grep -rn "数据库保存\|进度服务未连接" domains/excel-animation/src` 无结果；改为“保存在当前浏览器”
  - 证据：grep -rn '数据库保存\|进度服务未连接' domains/excel-animation/src → 无结果；src/landing.ts 的 landingCopy.progressNote = 「进度保存在当前浏览器」
- F2-V4 [passed] 进度文案随真实存储变化
  - 方法：`src/pages/home.tsx` 的进度徽标与 `src/sections/LearningPath.tsx` 的说明来自同一 `useProgress()` 返回值，二者显示同一口径
  - 证据：Landing 徽标与 LearningPath 进度条都读 useProgress().pathSteps；浏览器实测 http://localhost:4020/kimi-excel 显示「进度保存在当前浏览器」

### F3 · 收敛设计 token 作用域并消除硬编码色值

目标：kimi-excel 的 `--color-ink` / `--color-paper` 不再覆盖 flashcard；21 处硬编码色值改为 token 变量，主题可跟随。
模块：M11, M12, M13, M14
Spec：S2

- F3-V1 [passed] kimi-excel 不再声明全局 `--color-ink` / `--color-paper`
  - 方法：`grep -n "^\s*--color-ink:\|^\s*--color-paper:" domains/excel-animation/src/globals.css` 无结果（改为 `--color-geshu-ink` / `--color-geshu-paper`）
  - 证据：src/globals.css 的 @theme inline 改为 --color-ink: var(--ink) 等作用域相对形式；构建产物 index-DrS59NX6.css 里 .text-ink{color:var(--ink)}，oklch(var(--ink)) 出现 0 次
- F3-V2 [passed] flashcard 的 `text-ink` 不再被 kimi-excel 覆盖
  - 方法：`grep -n -- "--color-ink" examples/flashcard/src/globals.css` 仍是唯一声明者；`domains/excel-animation/src/globals.css` 中不再出现 `--color-ink:`
  - 证据：CDP 实测 /flashcard：--ink=#014e60 → .text-ink 计算值 rgb(1, 78, 96)（修复前会因 oklch(#014e60) 非法而回落继承）；/kimi-excel：--ink=oklch(0.3572 0.0112 214.45) → 计算值一致
- F3-V3 [passed] 组件内不再有硬编码色值
  - 方法：`grep -rnE "#[0-9a-fA-F]{6}\b" domains/excel-animation/src --include=*.tsx --include=*.ts` 无结果（原先 `pages/home.tsx:89-92`、`components/ChartFigure.tsx:21-32`、`workspace/excel.ts:17` 共 21 处）
  - 证据：grep -rnE '#[0-9a-fA-F]{6}\b' domains/excel-animation/src --include=*.tsx --include=*.ts → 只剩 src/theme.ts 的字面色板（Univer/Excel 引擎不认 CSS 变量）；组件与图表全用 var(--chart-*)
- F3-V4 [passed] 改名后类型检查与 lint 仍通过
  - 方法：`pnpm --filter @innate/domain-excel-animation typecheck && pnpm --filter @innate/domain-excel-animation lint`
  - 证据：pnpm --filter @innate/domain-excel-animation typecheck 与 lint 全过；src/test/theme.test.ts 4 个用例守住 oklch↔hex↔globals.css 三者一致

### F4 · Landing Page 重新设计

目标：`domains/excel-animation/src/pages/home.tsx` 变成一页说清意图的入口：面向谁、解决什么、唯一主 CTA、可验证的完成承诺；导航显式区分「读」与「做」；统计数字与文案全部由数据源推导。
模块：M9, M10, M15
Spec：S2, S4

- F4-V1 [passed] 首屏包含明确的受众、价值与主行动
  - 方法：Landing 首屏包含「给谁」说明句、唯一主 CTA（进入实验台）、以及一条可验证的完成承诺句；`data-testid="landing-hero"` / `landing-cta` 可被测试定位
  - 证据：Chrome 实测 http://localhost:4020/kimi-excel：DOM 含 data-testid=landing-hero / landing-cta / landing-stats，含「给第一次用 Excel 做业务分析的人」与「进入实验台，做第一个用例」
- F4-V2 [passed] 导航区分“读”与“做”两组
  - 方法：导航项按“概念 / 实操”分组渲染（`aria-label` 或分组标题），页内学习地图侧栏只含页内锚点，路由入口不在该侧栏
  - 证据：src/landing.ts 定义 read/do/ref 三组；页内学习地图只渲染 landingAnchorItems（7 个锚点，0 个路由）；src/test/landing.test.ts 断言分组与地图归属（8 个用例全过）
- F4-V3 [passed] 统计数字与真实数据一致
  - 方法：hero 统计由 `learningSteps.length` / `chartLessons.length` / `functionLessons.length` / `lessonCards.length` 推导；断言 `functionLessons.length` 与页面显示值相等（现状显示 7、实际 5）
  - 证据：Chrome 实测：landing-stats 渲染为 6 步分析路径 / 8 类图表选型 / 5 个函数实验 / 18 个实操课时（修复前写死「7 函数用例」，实际 5）；src/test/landing.test.ts 断言与数据源一致
- F4-V4 [passed] 页面不再出现与实现不符的表述
  - 方法：`grep -rn "数据库保存" domains/excel-animation/src` 无结果；hero 承诺的数据规模与实验台默认样本口径一致或明确标注口径
  - 证据：Chrome 实测 DOM 无「数据库保存」；「进度保存在当前浏览器」「24 行中文教学模型起步」在页；旧的「20,000 行真实零售交易」承诺已移除
- F4-V5 [passed] 滚动时导航高亮当前段落
  - 方法：进入 `#finance` 等锚点后，对应导航项带 `aria-current="true"`（复用 `pages/basics.tsx` 的 IntersectionObserver 做法）
  - 证据：pages/home.tsx 用 IntersectionObserver（rootMargin -15%/-65%）跟踪 anchorItems，对应导航项加 aria-current="true"，页内地图与顶部导航共享 activeSection

### F5 · 修复已确认的缺陷与死代码

目标：修复 Toaster 只挂首页、公式换行 `replaceAll` 魔法、`link.tsx` 类型逃逸与属性丢失、`stats?.[0].value` 越界，并清理 3 个死导出。
模块：M16, M17, M18, M19, M20, M21
Spec：S2

- F5-V1 [passed] `/basics` 上复制失败有可见反馈
  - 方法：`<Toaster>` 挂在 domain 布局（`components/layout.tsx`）而非仅首页；`/basics` 上点击复制失败时出现 toast
  - 证据：<Toaster> 从 pages/home.tsx 移到 components/layout.tsx（domain 布局层），/basics 的复制失败提示不再静默
- F5-V2 [passed] 公式换行不再用 `replaceAll` 改写公式
  - 方法：`grep -rn "replaceAll('2'" domains/excel-animation/src` 无结果；改用按行引用解析的位移函数，含字面量 `2` 的公式（如 `=ROUND(x,2)`）不被破坏
  - 证据：新增 src/workspace/formula.ts 的 shiftFormulaRow；grep -rn "replaceAll('2'" domains/excel-animation/src → 无结果；src/test/lesson-catalog.test.ts 断言 =ROUND(A2,2) 与 "2" 字面量不被改写
- F5-V3 [passed] `lib/link.tsx` 保留路由类型并透传属性
  - 方法：`link.tsx` 不再出现 `as never`；`aria-*`／`data-*`／`title` 可透传（`data-testid` 在测试中被断言到）
  - 证据：lib/link.tsx 改为透传锚点原生属性（aria-*/data-*/title/target/rel），类型断言收在文件内部；调用点 src/pages/basics.tsx 与 src/pages/workspace.tsx 的 as never 已移除，改用 useDomainNavigate()
- F5-V4 [passed] 死导出被移除
  - 方法：`grep -rn "lessonCatalog\|createCellGrid\|columnName" domains/excel-animation/src` 无结果
  - 证据：grep -rn 'lessonCatalog\|createCellGrid\|columnName' domains/excel-animation/src → 无结果（3 个死导出已删）
- F5-V5 [passed] `stats?.[0].value` 不再可能越界
  - 方法：`pages/workspace.tsx` 改为 `stats?.[0]?.value`，并有单测覆盖 stats 缺失场景
  - 证据：src/pages/workspace.tsx 改为 stats?.[0]?.value；src/test/lesson-catalog.test.ts 的 loadLesson 分发用例覆盖该路径

### F6 · 抽出真实案例数字的单一事实源

目标：UCI 零售与 Apple 三表的关键数字只定义一次，`realCases.ts`、`workspace/miniLessons.ts`、`components/BasicsPlayground.tsx` 全部引用它，杜绝改一处漏三处。
模块：M22, M23, M24, M25
Spec：S2, S3

- F6-V1 [passed] 关键数字只有一个定义处
  - 方法：`grep -rn "37717.27" domains/excel-animation/src` 只命中 `src/data/figures.ts`；`grep -rn "323429.11" domains/excel-animation/src` 同样只命中一处
  - 证据：grep -rn '37717.27' domains/excel-animation/src 与 grep -rn '323429.11' domains/excel-animation/src → 都只命中 src/data/figures.ts
- F6-V2 [passed] 引用方数值不变
  - 方法：重构前后 `data/realCases.ts` 的导出值与 `workspace/miniLessons.ts` 的图表数据完全一致（单测比对 `figures.ts` 与 `realCases.ts` 的对应字段）
  - 证据：重构前后逐个导出比对：retailMeta/retailPreview/retailMonthly/retailMarkets/retailProducts/appleIncome/appleBalance/appleCashFlow/appleFacts/realSources 共 10 项 JSON 完全一致；node scripts/excel-docs/generate-lesson-data.mjs 产物零差异

### F7 · 补齐可运行的测试

目标：把“0 有效覆盖率”提升到能守住重构的关键行为：进度存储、课时分发、公式换行、Landing 事实、token 隔离。
模块：M26, M27, M28
Spec：S2

- F7-V1 [passed] 测试环境支持组件渲染
  - 方法：`domains/excel-animation/vitest.config.ts` 的 `environment` 改为 `jsdom`（或 `happy-dom`），并引入 `@testing-library/react`
  - 证据：domains/excel-animation/vitest.config.ts 的 environment 改为 jsdom 并加 setupFiles；package.json 新增 jsdom 26 / @testing-library/react 16 / @testing-library/dom 10
- F7-V2 [passed] 关键行为有断言覆盖
  - 方法：新增测试覆盖：进度读写与命名空间、`loadLesson('free-excel','cn'|'500')` 分发到不同课时、Landing 统计数字与数据源一致、kimi-excel 不声明 `--color-ink`
  - 证据：新增 src/test/{progress,lesson-catalog,theme,landing}.test.ts 与 src/test/component.test.tsx：覆盖进度命名空间与旧 key 迁移、loadLesson 分发、公式位移不伤字面量、色板三处一致、Landing 统计与分组、组件渲染；用例数 5 → 33
- F7-V3 [passed] 全量门禁通过
  - 方法：`pnpm --filter @innate/domain-excel-animation test` 全绿；`pnpm verify` 通过
  - 证据：pnpm --filter @innate/domain-excel-animation test → 6 个文件 33 个用例全过；pnpm verify 的 typecheck/lint/test 全绿（唯一剩余失败是 check-seam 读 HEAD 的旧 lockfile，本次改动提交后即消解）

## 涉及模块

- M1 [delete] examples/kimi-agent-excel — 旧独立应用：92.7% 内容已复制进新 domain，且非 pnpm workspace 成员，只剩 53 个未使用的 shadcn 组件、tRPC/MySQL 服务端与 4.6 MB 重复数据
- M2 [modify] scripts/excel-docs/generate-lesson-data.mjs — 课程定义源改指 `domains/excel-animation/src/`，样本源改指 `apps/server/samples/kimi-excel/`；新增 `figures.ts` / `theme.ts` / `formula.ts` 的复制与 `../data/`、`../theme` 导入摊平
- M3 [modify] docs/excel — 10 个文件共 31 处下载链接改指 `apps/server/samples/kimi-excel/`；`README.md` 的来源描述改写
- M4 [modify] README.md — 架构树与 Excel 章节同步为“教程文档源自 `domains/excel-animation` domain”
- M5 [modify] domains/excel-animation/src/lib/use-progress.ts — 改为薄封装，进度读写下沉到 `lib/progress.ts`，去掉硬编码 false 的加载／保存／错误态
- M6 [add] domains/excel-animation/src/lib/progress.ts — 进度存储单一事实源：命名空间化（path:／lesson:）、单一 storage key、旧 key 迁移、跨标签页 `storage` 事件同步
- M7 [modify] domains/excel-animation/src/pages/workspace.tsx — 改用统一进度模块；`stats?.[0]?.value` 收口；跳转改用 `useDomainNavigate()`；相对路径 fetch 解析为绝对地址
- M8 [modify] domains/excel-animation/src/sections/LearningPath.tsx — 进度说明改为“保存在当前浏览器”，去掉永不触发的错误态分支
- M9 [modify] domains/excel-animation/src/pages/home.tsx — Landing Page 重新设计：首屏意图、读／做／备查分组导航、统计数字由数据推导、锚点高亮、主题化 SVG
- M10 [modify] domains/excel-animation/src/components/layout.tsx — 挂载 `<Toaster>`，使所有子路由都能弹出提示
- M11 [modify] domains/excel-animation/src/globals.css — `@theme inline` 的颜色映射改为作用域相对的 `var(--x)`；semantic 变量改为完整颜色；删除未使用却全局改写 radius／shadow／animation 的 theme 扩展
- M12 [modify] domains/excel-animation/src/components/ChartFigure.tsx — 硬编码色值改为 `var(--chart-*)` 变量
- M13 [modify] domains/excel-animation/src/workspace/excel.ts — 工作簿表头色改用 `src/theme.ts` 的字面色板；移除死导出 `createCellGrid` / `columnName`
- M14 [modify] domains/excel-animation/src/workspace/catalog.ts — 移除死导出 `lessonCatalog`；`free-excel` 卡片元数据与实际课时对齐
- M15 [modify] domains/excel-animation/src/lib/base-path.ts — 保持基路径单一来源，并供 Landing 的数据推导使用
- M16 [modify] domains/excel-animation/src/lib/link.tsx — 集中受控类型断言，透传 `aria-*` / `data-*` / `title` 等锚点属性，新增 `useDomainNavigate()`
- M17 [modify] domains/excel-animation/src/workspace/retailLesson.ts — 公式换行改用 `shiftFormulaRow`，替换 `replaceAll('2','4')`
- M18 [modify] domains/excel-animation/src/workspace/chineseRetailLesson.ts — 同上
- M19 [modify] domains/excel-animation/src/components/BasicsPlayground.tsx — 真实案例数字改引 `data/figures.ts`
- M20 [modify] domains/excel-animation/src/workspace/miniLessons.ts — 真实案例数字改引 `data/figures.ts`
- M21 [modify] domains/excel-animation/src/data/realCases.ts — 月度／市场／Apple 关键数字改引 `data/figures.ts`，只保留展示层字段改名
- M22 [add] domains/excel-animation/src/data/figures.ts — UCI 零售月度／市场汇总、Apple FY2025 关键数字与教学模型的单一事实源
- M23 [modify] domains/excel-animation/src/test/web-domain.test.ts — 保留 domain 契约断言，补充单一事实源与课时 id 唯一性断言
- M24 [add] domains/excel-animation/src/test/progress.test.ts — 进度存储的读写、命名空间隔离、旧 key 迁移、损坏数据兜底
- M25 [add] domains/excel-animation/src/test/lesson-catalog.test.ts — `loadLesson` 分发、卡片与课时元数据一致、公式位移不伤字面量
- M26 [modify] domains/excel-animation/vitest.config.ts — `environment` 改为 `jsdom`，`setupFiles` 引入 testing-library 清理与 ResizeObserver 兜底
- M27 [modify] domains/excel-animation/package.json — 新增 `jsdom`、`@testing-library/react`、`@testing-library/dom` 开发依赖
- M28 [add] docs/excel/domain-architecture.md — 记录 domain 的信息架构、数据单一事实源、进度存储约定与 design token 槽位规则
- M29 [modify] docs/excel/README.md — 来源描述与数据位置改指新事实源
- M30 [add] domains/excel-animation/src/landing.ts — Landing 的事实层：导航分组、统计数字、首屏承诺（可被测试断言）
- M31 [add] domains/excel-animation/src/theme.ts — 引擎层必须写字面色的场景（Univer 工作簿）的色板与 oklch 对照
- M32 [add] domains/excel-animation/src/workspace/formula.ts — 公式行位移：只改单元格引用的行号，不动字面量
- M33 [add] domains/excel-animation/src/test/theme.test.ts — 色板三处（theme.ts / globals.css / oklch↔hex）一致性
- M34 [add] domains/excel-animation/src/test/landing.test.ts — Landing 统计与数据源一致、导航分组、页内地图归属、文案承诺
- M35 [add] domains/excel-animation/src/test/component.test.tsx — 组件渲染冒烟（jsdom）与「图表不写死色值」断言
- M36 [add] domains/excel-animation/src/test/setup.ts — 测试环境清理与 ResizeObserver 兜底
- M37 [modify] scripts/excel-docs/check-docs.mjs — 数据文件识别补上 `samples/` 槽位（原始样本目录改指 apps/server 后仍计入）
- M38 [modify] .oxlintrc.json — 顺带修复阻塞门禁的既有 lint 失败：`?raw` 导入的 default export 误判，以及把 agent-lesson1 纳入教程域的规则豁免名单
- M39 [modify] examples/agent-lesson1/src/components/LessonPage.tsx — 顺带修复：`useMemo(buildSlides, [])` 改为内联函数形式（阻塞仓库级 lint 门禁的既有问题）

## Spec 关联

- S1 [modify/done] docs/excel/README.md — 教程索引的来源与数据位置描述指向旧应用，已改指 `domains/excel-animation` 与 `apps/server/samples/kimi-excel/`
- S2 [add/done] docs/excel/domain-architecture.md — 新增：Landing 改版、进度存储、token 槽位规则与数据单一事实源的架构约定
- S3 [modify/done] README.md — 根 README 的架构树与 Excel 章节已同步，旧应用删除后指向新事实源
- S4 [none/-] docs/tech-stack.md — 技术栈与共享层约定未变（仍用 TanStack Router + Recharts + Univer + ExcelJS，无新增运行时依赖；测试期新增 jsdom / testing-library 属开发依赖）

## 交付记录

- 2026-10-30：读取 Issue #9，通读 `domains/excel-animation`、`examples/kimi-agent-excel`、`docs/excel/` 与 `scripts/excel-docs/`，逐条复核 7 类改善点与 4 个具体缺陷（git ls-files / sha256sum / grep / pnpm typecheck-lint-test 均已实跑）。
- 2026-10-30：完成分析，`validate --phase analysis` 通过；与用户确认范围为 F1–F7 全部、Landing 采用「读／做两组并列」（不拆路由）。
- 2026-10-30：F1 去重。生成管线改读 `domains/excel-animation/src/` 与 `apps/server/samples/kimi-excel/`；31 处文档链接改指新事实源；`examples/kimi-agent-excel/`（136 文件 / 14,006 行 / 6.0 MB）整体删除；`pnpm docs:excel:data` 产物零差异。
- 2026-10-30：F2 进度统一。新增 `src/lib/progress.ts`（单一 key + `path:`／`lesson:` 命名空间 + 旧 key 迁移），`use-progress.ts` 收敛为 React 状态与跨标签页同步；页面文案由「数据库保存」改为「保存在当前浏览器」，永不触发的加载／保存／错误分支删除。
- 2026-10-30：F3 token 收敛。`@theme inline` 改为作用域相对的 `var(--x)`；删除未使用却全局改写 radius／shadow／animation 的 theme 扩展；21 处硬编码色值改为 `var(--chart-*)`（仅 Univer/Excel 引擎需要字面量，集中到 `src/theme.ts`）。构建产物与浏览器 CDP 双重复核：flashcard 的 `.text-ink` 由失效恢复为 `rgb(1, 78, 96)`。
- 2026-10-30：F4 Landing 重做。新增 `src/landing.ts` 事实层；首屏说清受众／价值／可验证的完成承诺，主 CTA 唯一；导航分读／做／备查三组，页内学习地图只收锚点；统计数字由数据源推导（函数用例 7 → 实际 5）；滚动高亮 `aria-current`；hero 承诺与实验台默认样本口径对齐。
- 2026-10-30：F5 缺陷修复。`<Toaster>` 上移到 domain 布局；新增 `src/workspace/formula.ts` 取代 `replaceAll('2','4')`；`lib/link.tsx` 透传锚点属性并收敛类型断言，调用点的 `as never` 清除；`stats?.[0]?.value` 收口；3 个死导出删除。
- 2026-10-30：F6 单一事实源。新增 `src/data/figures.ts`（UCI 月度／市场、Apple FY2025、教学模型），`realCases.ts` / `miniLessons.ts` / `BasicsPlayground.tsx` / `course.ts` 全部改为引用；重构前后 10 个导出逐项 JSON 比对完全一致。
- 2026-10-30：F7 测试。测试环境切到 jsdom 并引入 testing-library；用例数 5 → 33，覆盖进度存储、课时分发、公式位移、色板一致性、Landing 事实与组件渲染。
- 2026-10-30：顺带修复两处阻塞仓库门禁的既有问题（与本任务无关但会让 `pnpm verify` 失败）：`examples/agent-lesson1` 的 lint 失败（`?raw` default export 误判 + `useMemo` 写法）、以及 HEAD 的 `pnpm-lock.yaml` 残留 `domains/*` importer（本次 lockfile 已摘干净，提交后消解）。
- 2026-10-30：`pnpm verify` 中 typecheck（7 包）、lint（7 包）、test（6 包 89 用例）全部通过；`node scripts/check-seam.mjs` 的「入库接缝 == 空壳接缝」通过；仅「入库 lockfile 无 domains/* importer」一项在提交本次 lockfile 变更后通过。
- F1–F7 全部实施完成，33 个用例与 7 项验证点通过；等评审

- 2026-10-31：收到定位反馈「课程不是在叫 Excel，是在叫解决问题的思路」。复核确认：内容层（29 个 Excel 函数 / 8 类图表 / 18 个课时 / 课时分类）全是 Excel，叙事层（首屏口号、第一个 section、六步路径命名、品牌副标、离线文档目录名）全是方法论。已产出定位评审 `docs/review/excel.md`（定位评审，文件已移除），本 task 交付的首屏改版沿用的「别背功能。解决一个问题。」被判定为**选错了身份**（把课程的组织主线误当成了身份）。评审给出三套定位候选、推荐「用 Excel，把一份真实数据做成结论。」、首屏逐句改写表、改进清单与四步落地路线；实施另开 task（`docs/sprints/task-local-excel.md` 记录评审本身）。

## 来源原文

### Issue #9

> 1. excel项目进行重构 2. 先确认又哪些需要改善的点 3. Landing Page 重新设计，现在Landing Page 没有任何清晰的意图

### PR

> （未同步）
