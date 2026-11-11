---
schemaVersion: 1.0.0
id: sprint-l2-composite-lessons
title: L2 复合场景课 Sprint（待后续内容总盘点）
createdAt: 2026-11-10T00:00:00.000Z
updatedAt: 2026-11-10T00:00:00.000Z
status: done
branch: main
repository: qdriven/agent-learning-workbench
sourceKind: local
sourcePath: domains/excel-interaction/docs/sprints/sprint-l2-composite-lessons.md
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

# L2 复合场景课 Sprint（待后续内容总盘点）

> 背景：excel-interaction 单函数 recipe 三轮量产收官（27 门在架、27 支视频、
> 8 分类目录、真浏览器 27/27 回归）。本文档盘点**之后所有待做内容**，
> 给出难点分析与逐场景解决方案，作为后续执行的任务底稿。
> 上游素材：`excel-animation/docs/excel/05-workspace-lessons/`(18 用例)、
> `06-real-cases/`(2 真实案例)、GitHub issues #14/#16/#17。

## 1. 待后续内容总清单

| # | 事项 | 状态 | 归属 |
| --- | --- | --- | --- |
| P1 | **L2 复合场景课**（18 实验台 + 2 真实案例） | 未开始，本文档第 4 节逐场景方案 | 本 Sprint 主体 |
| P2 | **抓窗式出片**（真 LibreOffice 窗口 + 真鼠标录屏） | 方案定稿未实施（uno-driver 需加 chart/区域动作） | 独立工作包 |
| P3 | **走查验证**（效果判定：3 次点击找到怎么做、30 秒看懂、愿意练习） | 内容就绪，待真人走查 | 决策门 |
| P4 | onlyoffice docserver 实测（四 API 动作层） | [#14](https://github.com/qdriven/agent-learning-workbench/issues/14) | 引擎能力 |
| P5 | renderPivot / renderChart 扩展位 | [#17](https://github.com/qdriven/agent-learning-workbench/issues/17)（renderChart 已由 A+C 方案缓行） | 引擎能力 |
| P6 | univer 金底表头带 | [#16](https://github.com/qdriven/agent-learning-workbench/issues/16) | 视觉统一 |
| P7 | **引擎函数边界**：TEXT / TEXTJOIN / AVERAGEIFS / IFS / RANK / DATEVALUE / SUMPRODUCT 不支持 | 占位卡已标 blocked；解锁依赖 #14 | 引擎能力 |
| P8 | **跨表引用**：engine.js 只挂 sheets[0] | 未开 issue，P1 阶段 2 一并解决 | 引擎能力 |
| P9 | **动效进阶**（数字滚动/图表生长等） | 备选，见第 6 节 GSAP 对比 | 可选优化 |
| P10 | 旧域在飞改动处置 | [#19](https://github.com/qdriven/agent-learning-workbench/issues/19)（归属用户） | 仓库事务 |

## 2. 难点分析（为什么 L2 不是"再跑一轮批量脚本"）

单函数 recipe 之所以能程序化量产，是因为它满足三个条件：**单公式、单格验收、4 步定长**。
L2 复合场景课逐条打破这些条件，难点按工程影响排序：

### 难点 1（核心）：契约"4 步单公式"刚性 —— N 步化改造面大

现有管线多处硬编码 4 步单公式假设：

| 位置 | 硬编码 | 复合课需要 |
| --- | --- | --- |
| `check-manifest.mjs` | `guide.length !== 4` 直接 FAIL | N 步（10+ 步常见） |
| `lesson.js` `play()` | `[1,2,3,4].forEach` 固定链 | 1..N 循环 |
| `lesson.js` `foldState` / `finish()` | `checks[0]` 单点验收 | 顺序 checks，逐步放行 |
| `lesson.js` `practice()` | `onChange` 只盯 `checks[0].cell` | 练习状态机：做对第 k 步才提示第 k+1 步 |
| `build-plan.mjs` | 按 4 步派生口播/停留 | N 步派生（结构同构，改动小） |

**方案**：契约 `guide` 放开为 N≥4（向后兼容——4 步课零迁移），checks 数组
按序验收；lesson.js 状态机 N 步化。这是本 Sprint 的**地基工作包**，估 1 天，
完成后 4 步课回归必须 27/27 保持全绿。

### 难点 2：练习验收的单点监听 → 顺序状态机

原子课练习 = "在一个格输公式，回车即验"。复合课练习 = "先清洗、再查找、
再汇总"，每步产出是下一步的输入——**必须按步序推进**，否则用户跳步会得到
满屏错误值，教学节奏崩坏。
**方案**：练习态挂 N 步状态（当前步 k → 只监听 checks[k-1].cell → 通过后
亮出下一步提示 + 展开对应步骤面板）。与难点 1 同一个工作包。

### 难点 3：跨表引用引擎缺口

`engine.js mount()` 只挂 `sheets[0]`，而 portfolio-dashboard / luke-charts /
free-excel 都要跨表公式（`=SUM(明细!B2:B4)`）。
**方案**：HyperFormula 本身多表支持（univer 模板 SMOKE 已证跨表真算
`→3600`），handsontable 侧只需：① `mount` 传全部 sheets 建多表；
② HT 加表 tab 切换（或演示时隐藏非活动表）。估 0.5 天，**阶段 2 单独做**，
不阻塞单表复合课。

### 难点 4：视频时长形态决策

原子课 20-25 秒/支。复合课文档时长 15-25 分钟——**直接转视频不成立**。
三选一（需走查后定）：

| 形态 | 时长 | 适用 |
| --- | --- | --- |
| A. 长视频分段 | 3-6 分钟（保留关键步骤，跳过重复操作） | 演示"完整流程长什么样" |
| B. 多集原子化 | 每步一集 30 秒（= 现有原子课，只补"串场"） | 复用全部现有管线，零新机器 |
| C. 只做交互不出片 | 课页可练，视频列"待产" | 快速铺内容 |

**倾向 B**：复合课的每一步本质是已有原子函数的组合——把每步拍成原子级
片段 + 步骤间桥接卡，等于"合集播放列表"，与 landing 页的合集能力天然契合。

### 难点 5：引擎函数边界（内容侧硬约束）

| 场景 | 卡住的函数 | 解法 |
| --- | --- | --- |
| text-date | TEXT（月份格式化） | 拆两半：LEFT/MID/RIGHT/FIND 部分成课；TEXT 段记 blocked 或用 `YEAR&"-"&MONTH` 拼接绕过 |
| dynamic-arrays | FILTER/UNIQUE/SORT 溢出 | 记 blocked → #14 解锁后补 |
| 任意场景 | AVERAGEIFS/IFS/RANK/DATEVALUE/SUMPRODUCT | 占位卡 blocked 已公示；转写时改写为等价单函数组合（如 AVERAGEIFS → SUMIFS/COUNTIFS）或记边界 |

### 难点 6：转写质量 —— 不适合纯脚本

单函数课转写 = "公式+数据+预期"三件套照抄（程序化可行）。复合课文档 10K
markdown/篇，**哪些步骤是教学本体、哪些可省、口径怎么提炼，需要人工判断**。
**方案**：脚本只做"数据 CSV → 契约 data 块"的机械部分；guide/summary 人工
转写（每门 30-60 分钟），保留"批量脚本 + 人工精修"的混合模式。

### 难点 7：真实数据规模

retail-operations 用 20000 行 UCI 样本——handsontable 动画课上既卡又读不清。
**方案**：数据子集化（仓库已有 500 行精简样本），契约只装子集，文档口径
注明"教学用子集，全量见原样本"。

## 3. 阶段划分（执行顺序）

| 阶段 | 内容 | 依赖 | 估时 |
| --- | --- | --- | --- |
| **阶段 1 · 地基** | N 步契约（check-manifest / lesson.js / build-plan 三处 N 步化，向后兼容）+ 27 门回归全绿 | 无 | 1 天 |
| **阶段 2 · 单表复合课** | 按第 4 节 A 类逐门转写（试点 dave-clean）+ 顺序练习验收 | 阶段 1 | 每门 0.5-1h |
| **阶段 3 · 跨表引擎** | engine.js 多表 mount + 表 tab；portfolio-dashboard / luke-charts 落地 | 阶段 1 | 0.5-1 天 |
| **阶段 4 · 图表/数据复合** | maf-charts（chart-layer 已支持）、retail 子集策略 | 阶段 1 | 0.5 天 |
| **阶段 5 · 收口** | blocked 清单移交 #14/#17、走查验证（P3）、视频形态定稿 | 阶段 2 | 0.5 天 |

抓窗式出片（P2）与本 Sprint 并行不阻塞：它是"出片质量升级"（真软件界面），
不是"内容缺口"。

## 4. 逐场景解决方案（18 实验台 + 2 真实案例）

分类口径：**A=单表多公式**（N 步契约直接覆盖）｜**B=跨表**（需阶段 3）｜
**C=图表复合**（chart-layer 已支持）｜**D=引擎边界**（记 blocked/绕过）｜
**E=已被原子课覆盖**（不做新课，做合集页）。

| # | 场景 | 类型 | 难点 | 解决方案 |
| --- | --- | --- | --- | --- |
| 1 | free-excel 六步实战 | A+B+C+D | 全类型叠加：跨表 SUM + 图表 + TEXT + 6 步链 | **压轴课，最后做**：N 步契约（阶段 1 后）+ 阶段 3 跨表 + chart-line 折线图复用；TEXT 段拼接绕过；6 步压缩为 8-10 个 guide 步 |
| 2 | luke-charts 月度趋势 | B+C | 跨表 SUM + 折线图 | 阶段 3 跨表 + chart-layer 折线（已支持）；数据单表化可先做"无跨表版" |
| 3 | alex-lookup 查找实验 | E | VLOOKUP/XLOOKUP/IFERROR 已有 3 门原子课 | **不新做**——landing 加"查找实验"合集卡，串 3 门原子课 + 桥接卡（向右查/向左查/缺失值三题） |
| 4 | dave-clean 订单清洗 | A | 清洗→查重复核两段依赖 | **阶段 2 试点课**：N 步契约（TRIM+CLEAN → COUNTIF 查重 → XLOOKUP 复核，3 公式 8 步）；数据 dave-clean/orders.csv 现成 |
| 5 | rohan-questions 条件汇总 | E+A | SUMIFS/COUNTIFS/IFERROR 已有原子课 | 主体走合集页；若要"业务问题倒推"叙事 → N 步课（3 题 9 步）作为阶段 2 第二门 |
| 6 | maf-charts 市场结构 | C | 排序+条形图 | chart-layer bar ✅ 已支持；**排序在契约 data 里预排序**（教学点是"先排序再画"，用步骤提示表达）；阶段 4 |
| 7 | power-query 合并 | A | XLOOKUP 合并键 + 计算列 + IF+OR | N 步契约：XLOOKUP 合并（第 2 列）→ `=C2*D2` 计算列 → IF+OR 判有效行；3 公式 9 步 |
| 8 | eda-outliers 探索 | A | AVERAGE/MAX/COUNTBLANK/IF | 全部探针 ✅；N 步契约 4 公式 12 步；"异常复核"用 IF 标记步表达 |
| 9 | plans 套餐比较 | A | MAX(0,..) 嵌套 + MIN + INDEX+MATCH | 探针 ✅（MAX/MIN/INDEX-MATCH 均过）；N 步契约 3 公式 9 步；`MAX(0,x)` 超额用量是教学亮点，保留在 formulaArgs |
| 10 | portfolio-dashboard 看板 | B+A | 跨表引用 + 利润率 + IF+ABS 平衡校验 | **阶段 3 旗舰课**：多表 mount 后做；利润率 `=利润表!B3/利润表!B2` 是跨表除法教学本体 |
| 11 | two-way-lookup 双向 | A | INDEX+MATCH+MATCH 双向定位 | 公式探针过（INDEX/MATCH 已验）；N 步契约：向右查 → 向左查 → 双向矩阵，3 公式 9 步；比原子 index-match 课深一层 |
| 12 | dynamic-arrays 动态数组 | D | FILTER/UNIQUE/SORT 溢出展示 | **记 blocked**（单值形态教了失真）→ 占位卡已有；#14 onlyoffice 解锁后补真溢出课 |
| 13 | text-date 文本日期 | A+D | TEXT 月份格式化不支持 | 拆分：LEFT/MID/RIGHT/FIND 拆字段部分 → N 步课（`FIND` 定位 + `MID` 截取，探针 ✅）；TEXT 月份段记 blocked（可选绕过：`YEAR(A2)&"-"&MONTH(A2)`——MONTH 对真日期值可用，对文本日期不可用，契约里日期存真日期值即可绕过） |
| 14 | kpi-format KPI 分层 | E | IF/AND/IFERROR 已有原子课 | 合集页："KPI 判定三件套"串 IF+AND+IFERROR；若要分层预警叙事 → N 步课（嵌套 IF 分层是新知识点，值得做） |
| 15 | dirty-data 脏数据 | A | TRIM/SUBSTITUTE/VALUE/DATE/IF | 全部探针 ✅；N 步契约 5 公式 12-15 步；与 trim-clean 原子课的关系 = "单点→流程"，是 L2 的代表作 |
| 16 | inventory-reorder 库存补货 | A | 补货点模型公式 | MAX/IF ✅；N 步契约：日均销量 → 补货点 `=日均*(周期+安全天)` → IF 判是否补货；模型公式进 formulaArgs |
| 17 | supply-quality 供应链质量 | A | 加权成本 SUMIFS+AVERAGE 对照 | 全部探针 ✅；N 步契约：单位成本 `=SUM(金额)/SUM(数量)` → AVERAGE 对照 → SUMIFS 分组；3 公式 9 步 |
| 18 | customer-rfm 客户 RFM | A | MAXIFS/COUNTIFS/SUMIFS/AND 三维度 | 全部探针 ✅；N 步契约：R 分(MAXIFS) → F 分(COUNTIFS) → M 分(SUMIFS) → AND 合成标签，4 公式 12 步；**L2 最佳展示课**（三维度逐步成型） |
| 19 | retail-operations UCI 零售 | A+难点7 | 20000 行数据规模 | **数据子集化**（用 500 行精简样本）+ N 步契约（六步清洗链）；全量数据只在文档口径说明；或降级 C 形态（只做交互） |
| 20 | apple-finance Apple 三表 | B | 三表勾稽 + 跨表公式 | 阶段 3 后做；教学本体是"三表怎么勾稽"（跨表引用 + 比率校验），子集化取季度数据；**真实案例的叙事价值最高，放最后压轴** |

### 场景优先级建议（走查 P3 通过后）

1. **阶段 2 首发**（单表、纯 A 类、地基验证）：#4 dave-clean（试点）→ #15 dirty-data → #18 customer-rfm
2. **阶段 3**（跨表解锁）：#10 portfolio-dashboard → #2 luke-charts
3. **阶段 4**（图表/数据）：#6 maf-charts → #19 retail（子集）
4. **压轴**：#1 free-excel（全类型）→ #20 apple-finance
5. **合集页优先**（零新课成本，先出效果）：#3 alex-lookup、#5 rohan-questions、#14 kpi-format —— 走查时可先用合集形态验证"组合学习"的需求真伪

## 5. 走查验证口径（P3，阶段 5 执行）

内容侧已就绪（27 门），效果判定标准（PoC 原始约定）：

1. 找一个"不会 VLOOKUP"的人 → 从 home 页 **3 次点击内**看到"怎么做"；
2. 30 秒视频看完**能明白**；
3. **愿意点练习**动手。

判定分支：✅ 通过 → 按第 3 节阶段推进 L2；❌ 不通过 → 先调形态（目录结构/
卡片信息量/视频长度），L2 延后——**L2 是内容扩容，形态验证不通过时扩容无意义**。

## 6. 动效技术附录：现状与 GSAP 对比

### 6.1 本项目动画技术栈（motion-spec 确定性约束下）

| 层 | 技术 | 用在哪 |
| --- | --- | --- |
| 1 | CSS keyframes（有限次入场） | 单元格聚焦/结果闪烁/面板入场/打字光标 |
| 2 | JS 状态机 + setTimeout 链 | 4 步（→N 步）自动播放/步进/重置，clearTimers 可打断 |
| 3 | 逐字打字机 | 公式输入（35ms/字，上限 1.2s） |
| 4 | Canvas 2D 确定性绘制 | 图表课五种图（无动画循环，数据进像素出） |
| 5 | 视频层编排 | DOM 重演截帧 + ASS 字幕 + TTS 语音驱动停留 + 页内光标滑行 |

**硬约束**：禁随机、禁无限循环、禁墙钟依赖——同一契约每一帧可复现，
这是 qc 抽帧断言与渲染式出片的地基。

### 6.2 GSAP（GreenSock Animation Platform）对比

> 用户口述的"grasp 技术"即 **GSAP**——业界标准的 JS 动画引擎，
> 核心卖点正是"平台无关（framework-agnostic）"。

```js
gsap.to(".box", { x: 300, rotation: 180, duration: 1, ease: "power2.out" });
const tl = gsap.timeline();
tl.to("#a", { opacity: 1 }).to("#b", { y: -20 }, "+=0.3");
```

| 维度 | 本项目（CSS+状态机） | GSAP |
| --- | --- | --- |
| 依赖 | 零依赖（出片引擎不进 pnpm-lock，仓库纪律） | +~70KB 库 |
| 帧确定性 | ✅ 天然——CSS 可定格、状态机可重放 | ⚠️ 默认 rAF 时钟驱动，直接截帧是任意中间态；**需 paused+seek(t) 模式**才能进截帧管线 |
| 能力上限 | 简单入场/闪烁/打字 | Timeline 编排、弹性物理、路径变形、逐字文本、滚动驱动 |
| 动画对象 | CSS 属性 + Canvas 手绘 | DOM/SVG/Canvas/WebGL/**任意 JS 对象数字属性** |
| 平台 | 浏览器 | 浏览器/RN/Node(canvas)/小程序 同一套 API |
| 适用判断 | 当前动效词汇恰到好处 | 两个未来场景才需要：①高级动效（数字滚动/图表生长/弹性转场）②动画参数可编辑化（Timeline 数据结构天然适合） |

**结论**：现在不引入（零依赖+确定性是设计初衷且够用）；若做 P9 动效进阶，
标准姿势是 `gsap.timeline({paused:true}).seek(帧时间)`——时间轴可寻址，
与现有"状态重放截帧"管线同构，很多视频生成引擎（Remotion 生态）即此模式。

## 7. 验收口径（本 Sprint）

1. 阶段 1 完成定义：N 步契约落地，**27 门存量课回归 27/27 全绿**（向后兼容硬指标）；
2. 阶段 2 每门课：契约校验过 + 真浏览器 N 步走完验收通过 + qc 抽帧；
3. blocked 场景（#12 dynamic-arrays、TEXT 相关）不硬做，占位卡 note 保持诚实；
4. 走查（第 5 节）通过后才进入阶段 2 批量转写；
5. 本文档随执行进度更新 status（planned → in-progress → done）。

## 8. 执行进度（2026-11-10 更新，**全部完成**）

| 阶段/事项 | 状态 | 证据 |
| --- | --- | --- |
| 阶段 1 · N 步契约地基 | ✅ 完成 | `lesson.js` 块位映射 `(n-1)%4` + N 步状态机 + 复合 finish/practice；`check-manifest` 改 4 倍数校验；存量 27 门回归 **27/27 全绿**（向后兼容达标） |
| 阶段 2 · 单表复合课（3 门） | ✅ 完成 | **dave-clean**(12 步 3 公式 3/3 逐块验收+顺序练习) + **dirty-data**(16 步 4 公式含 F2 链式依赖) + **customer-rfm**(16 步 RFM 三维度+AND 合成标签)——自动播放/练习/出片/qc 全过 |
| 阶段 3 · 跨表引擎 + 2 门 | ✅ 完成 | engine.js 多表挂载（HT 初始化后挂副表；中文表名单引号 `='利润表'!B2` 实测口径）+ lesson.js 参考表渲染 + chart-layer `表名!区域` 语法；**portfolio-dashboard**(3/3 跨表直引/区域SUM/链式IF) + **luke-charts**(跨表 SUM+跨表图表 drawn=[980..2190])；练习态 3/3 顺序放行 + 公式全过自动出图 |
| 阶段 4 · 图表/数据复合（2 门） | ✅ 完成 | **maf-charts**(SUM+条形图，C2=6690+排名 drawn) + **retail-ops**(UCI 真实数据 10 行子集 4/4：IF+AND 判有效/UPPER+TRIM 洗码/SUMIFS 按标记汇总/COUNTIFS 同口径计数) |
| 压轴 · 全类型/真实财报（2 门） | ✅ 完成 | **free-excel**(4 块 16 步全类型：清洗+判断+条件汇总+**跨表图表**，TEXT 环节按记档绕过) + **apple-finance**(三表勾稽 3/3：毛利 195201/三表差 0/IF+ABS 判平衡，2 张参考表) |
| 合集页（E 类零成本） | ✅ 完成 | 3 合集 9 成员课（查找实验三题/条件汇总三件套/KPI 判定三件套），home 页合集卡+成员 chips 直链；check-recipes 加合集引用完整性校验（成员必须在架） |
| P3 走查（三问） | ✅ **通过** | ①搜索 vlookup 命中 1 卡 ②3 次点击内：▶ 视频 20s 播放中（≤35s 达标）→ ✋ 练习 ③练习态输入公式验收通过（E2=王五）。**判定分支：走查通过 → L2 批量转写解锁（已执行）** |
| **视频形态定稿（难点 4 三选一）** | ✅ **选 B** | **原子分段 + 桥接卡**：复合课按 4 步块出片（L2 实测 12-16 步 = 34-62s/支，与原子课同量级），块间串场由步骤卡/字幕承担——复用全部现有管线（build-plan/render-video/qc 零改动）。A 长视频分段、C 只交互不出片均不采用 |
| 阶段 5 · blocked 移交 | ✅ 完成 | [#14 留言](https://github.com/qdriven/agent-learning-workbench/issues/14#issuecomment-6749509659)：TEXT/TEXTJOIN/AVERAGEIFS/IFS/RANK/DATEVALUE/SUMPRODUCT/FILTER 溢出 8 项边界 + 本 Sprint 已解锁 16 项函数清单 + 跨表引擎落地，正式移交 |
| 全量回归 | ✅ **43/43** | 真浏览器逐课自动播放（自适应等待按 N 步计）：step=N+1、验收 ✓、console 零错误 |
| verify | ✅ 四段全绿 | 43 契约 / 88 清单条目 / recipes 新鲜度+合集引用 |
| 目录终态 | ✅ | **43 门在架 · 43 支视频 ▶ 全亮 · 3 合集 · 占位 2（TEXT/TEXTJOIN blocked）**；9 分类（"场景实战"15 门 L2 课） |
| **A 类 7 场景批量（阶段 2 收尾）** | ✅ **完成** | `aclass-gen.mjs` 程序化 7 门：power-query(跨表合并) / eda-outliers(探索四查) / plans(套餐建模) / two-way-lookup(二维查找) / inventory-reorder(补货模型) / supply-quality(加权口径) / text-date(文本拆分，TEXT 环节 blocked 记档)——探针 25 项先行全过（修正：XLOOKUP 嵌套需 3 参 INDEX）；出片 50-76s/支 qc 全过 |
| **engine.js 空值语义修复** | ✅ | buildMatrix 缺失格 `""`→`null`——HyperFormula 里 `""` 不算 blank（COUNTBLANK 实测 0），null 才是真空格；修复后 43/43 回归零破坏 |
| **P2 抓窗式 LibreOffice 出片** | ✅ **完成** | uno-driver 三能力探针实证（区域选择 `controller.select(range)` / `addNewByName` 插图 / `setDiagram` 改类型，Line/Bar/Pie/XY/Area 全过）+ **探针4 双图对照截帧实证 BarDiagram `Vertical=True→横条、False→竖柱`**（与直觉相反）→ 图型/方向按 guide 菜单文本定（簇状柱形/条形/堆积/直方区分，契约 type 都是 bar 不可靠）；多表铺数（跨表课真机）+ `to_uno_formula` 表分隔 `!`→`.` + `norm_formula` 跨表引用归一（UNO 回读剥引号，探针定位）+ 锚点 checks 跳公式比对；**10 门抓窗式出片全过**（sum-basic 回归 + portfolio-dashboard 跨表 + 8 门图表课，各自 `<id>-capture.mp4` qc 抽帧验方向：横条 ✓ 竖柱 ✓）；`batch-capture.mjs` 批量驱动 |
| **#14 · onlyoffice docserver 四 API 实测** | ✅ **完成** | `drive-oo.py` **8/8 连跑两轮**（seed→setFormula 真算 3600→getValue→getFormula→focus→练习态 500ms 轮询验收→console 零错误）；实测钉死 8 条边界并回写模板：**callCommand 并发争用**（diag-burst 1/6 实证）→ send 串行队列、插件 ready 竞态→15s 等就绪、Docker localhost→`?fileOrigin=host.docker.internal`（document.url）+ 页 origin（pluginsData 浏览器抓）、跨域 config→静态服务 CORS、blank.xlsx 预置表按索引改名复用、reset 等新 ready、translations 404→补两个 JSON、unmount 清缓存→轮询双读；测试课 oo-test 出片 ▶；README 验证状态 ⚠️→✅ |

### 剩余待办（均不阻塞，见第 1 节 P 清单跟踪）

- ~~阶段 2 A 类其余场景~~ → ✅ **已全部完成**（2026-11-10，`aclass-gen.mjs` 7 门，见上表）；
- ~~P2 抓窗式 LibreOffice 出片~~ → ✅ **已完成**（2026-11-10，见上表 P2 行）；
- ~~P4（#14 onlyoffice 四 API）~~ → ✅ **已完成**（2026-11-10，8/8 实测，见上表 #14 行）；
- ~~P6（#16 univer 表头带）~~ → ✅ **已关闭**（2026-11-10，金底表头带 SMOKE PASS）；
- P5（#17 univer 画布其余主题）——引擎能力，随 univer 模板后续迭代；
- P9 GSAP 动效进阶（可选）——paused+seek 接入姿势已记档（第 6 节）。
