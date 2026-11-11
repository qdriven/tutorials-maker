# 格数 Excel domain 架构约定

> `domains/excel-animation` 是挂在 `@innate/webshell` 上的 Excel 数据分析课程 domain（domain id：`excel-animation`）。
> 本文记录它与仓库其它部分的边界约定：信息架构、数据单一事实源、进度存储、设计 token 槽位。
> 改这些约定时，先改本文，再改代码。

## 🎯 本课重点

- **重点用什么**：一条信息架构（读／做／备查）、一个进度存储模型、一套 design token 槽位规则、一份数据单一事实源。
- **完成什么**：新增内容时知道该放哪、该引用哪个常量、哪些 CSS 变量名不能占用。

## 📦 配套数据

| 位置 | 内容 |
| --- | --- |
| [`domains/excel-animation/src/data/figures.ts`](../../../../domains/excel-animation/src/data/figures.ts) | 真实案例数字与教学模型的单一事实源 |
| [`domains/excel-animation/src/lib/progress.ts`](../../../../domains/excel-animation/src/lib/progress.ts) | 学习进度的读写实现 |
| [`domains/excel-animation/src/globals.css`](../../../../domains/excel-animation/src/globals.css) | 色板与 design token 槽位规则 |
| [`data/`](data/) | 每课练习数据（由课程定义导出） |

## 模块边界

| 目录 | 职责 | 不该出现的东西 |
| --- | --- | --- |
| `src/data/` | 课程内容与数据常量（纯数据，无 UI 依赖） | React 组件、DOM API |
| `src/data/figures.ts` | 真实案例数字与教学模型的**单一事实源** | 与其它文件重复的字面量 |
| `src/workspace/` | 实验台课时定义、工作簿快照、导入导出 | 展示层文案 |
| `src/components/` | 可复用展示组件 | 业务数据字面量 |
| `src/sections/` | Landing 页的 7 段教学内容 | 跨页状态 |
| `src/pages/` | 三个路由页（Landing / 基础八章 / 实验台） | 与其它页共享的状态 |
| `src/lib/` | 路由包装、进度存储、基路径 | 课程内容 |
| `src/landing.ts` | Landing 的「事实层」：导航分组、统计数字、首屏承诺 | JSX |
| `src/theme.ts` | 必须写字面色的场景（Univer / Excel 导出） | CSS 变量字符串 |

`scripts/excel-docs/generate-lesson-data.mjs` 会把 `src/data/*.ts` 与 `src/workspace/*.ts` 复制到临时目录里
用 `node --experimental-strip-types` 独立加载，用来导出 `docs/excel/data/` 里的 CSV。
**这些文件必须保持「无 UI 依赖、可独立加载」**，跨目录 import 需要写成 `../data/xxx` 形式
（生成脚本会把它摊平到同一目录）。

## 信息架构：读 / 做 / 备查

Landing 页的导航分三组，定义在 `src/landing.ts`：

| 组 | 含义 | 成员 |
| --- | --- | --- |
| 读 | 概念与真实案例，页内锚点 | 六步路径、图表对比、函数实验、综合用例、运营分析、财务三表 |
| 做 | 动手实操，独立路由 | 在线实验台 |
| 备查 | 基础说明与调研依据 | 基础八章（路由）、调研依据（锚点） |

规则：

1. 「页内学习地图」侧栏**只收页内锚点**。路由入口放进页内地图会出现「点了却跳走」的层级矛盾。
2. 首屏统计数字一律从 `src/landing.ts` 的 `landingStats` 取（由 `learningSteps` / `chartLessons` /
   `functionLessons` / `lessonCards` 的长度推导），页面里不写死数字。
3. 首屏必须说清三件事：**给谁**（受众）、**解决什么**（价值）、**做出什么**（可验证的完成承诺）。
   承诺要与实现一致——不写「数据库保存」这类实现里没有的存储方式。
4. 页面承诺的数据口径要与实验台默认样本一致（默认是中文教学模型，不是 20,000 行真实样本）。

## 学习进度：浏览器本地存储

进度只有一份，落在 `localStorage` 的 `geshu-progress-v2`：

- `path:<stepId>` —— 六步路径的步骤；
- `lesson:<lessonId>` —— 实验台课时。

存储实现在 `src/lib/progress.ts`，React 状态在 `src/lib/use-progress.ts`。
旧的 `geshu-progress-v1`（路径步骤）与 `geshu-completed-lessons`（课时）只在首次读取时迁移一次。

要点：

- 本地存储是**同步**的，没有「加载中／保存中／服务未连接」这类分支，不要为了兼容旧接口把它们加回来。
- 旧版的两个 key 互不同步，导致「实验台做完了、Landing 仍显示 0／6」。现在两条进度共用一个 key。
- 若将来要恢复服务端进度，先改 `src/lib/progress.ts` 的读写实现，页面不需要跟着改。

## 真实案例数字：单一事实源

`src/data/figures.ts` 拥有全部被多处引用的数字：

- `retailMonths` / `retailMarkets` —— UCI Online Retail 样本的可复现汇总；
- `appleFY2025` —— Apple FY2025 Form 10-K 申报值（单位 USD millions）；
- `teachingProducts` / `teachingOrders` —— 教学模型（刻意保留空格与重复订单）。

`src/data/realCases.ts` 只做展示层的字段改名；`src/workspace/miniLessons.ts`、
`src/components/BasicsPlayground.tsx`、`src/data/course.ts` 全部引用 `figures.ts`。
改一个数字只需要改一处，`src/test/theme.test.ts` 与 `src/test/web-domain.test.ts` 会守住这条。

## 设计 token：作用域相对

`--ink` / `--paper` 是**多 domain 共用的 CSS 变量槽位名**：
本 domain 在 `.kimi-excel-root` 里定义，flashcard 在 `.flashcard-root` 里定义。

规则：

1. `@theme inline` 的颜色映射必须写成**作用域相对**的 `var(--x)`，
   不能写成 `oklch(var(--x))` 这类把颜色函数写死的表达式。
   写死颜色函数时，flashcard 作用域里的 `--ink: #014e60` 会变成非法的 `oklch(#014e60)`，
   整条 `color` 声明被丢弃，它的 `text-ink` 全部失效。
2. 本 domain 不要声明会覆盖其它 domain 的通用槽位（`--color-ink` / `--color-paper`）。
3. 未使用的 `@theme` 扩展（radius / shadow / animation）不要留着——它们会全局改写壳与其它 domain 的取值。
4. 组件里不写十六进制色值。SVG 与 Recharts 都能解析 `var(--chart-*)`
   （Chrome 已验证 presentation attribute 里的 `var()` 能解析）。
   只有引擎层不接受 CSS 变量的地方（Univer 工作簿、.xlsx 导出）才写字面值，
   并且集中在 `src/theme.ts`，由 `src/test/theme.test.ts` 换算比对，防止与 CSS 色板漂移。

## ✅ 总结

- 内容进 `src/data/`，展示进 `src/components/` 与 `src/sections/`，实验台进 `src/workspace/`。
- 数字只定义一次：改 `src/data/figures.ts`。
- 进度只有一份：`src/lib/progress.ts`。
- 颜色只写变量：`var(--x)`，作用域相对。
- 改完跑 `pnpm --filter @innate/domain-excel-animation test`（33 个用例）与 `pnpm docs:excel:check`。
