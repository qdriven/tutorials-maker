# 给 AI 一个目标，让 AI 自己试路——excel-interaction 的实践做法

> 用 excel-interaction 三天 52 条流水的真实过程，说明「**给 AI 一个目标 → 让 AI 尝试不同方式 → 用证据收口**」
> 这套流程具体怎么落地。案例本体见 [excel-interaction/](excel-interaction/README.md)，
> 方法论原文见 [build-method.md](../../excel-interaction/docs/build-method.md)。

## 一、这套做法是什么

一句话：**目标锁死、验收锁死，中间路径放开**。

- ❌ 不是「帮我写个 Excel 教程网站」——目标模糊，AI 会自作主张走到底；
- ❌ 也不是「每一步都由我指挥」——那 AI 只是个打字员，试错成本全在我这；
- ✅ 而是：我把**做什么**和**做到什么算完成**写死，**怎么做**让 AI 多路去试，
  每条路留下证据，我只在分叉点拍板、在成品上反馈。

excel-interaction 三天产出 44 门课 + 47 支视频，靠的就是这个循环跑了 52 次。

## 二、六步实践流程（每步都有项目里的实物）

### Step 0 · 目标与规则先落档（还没写功能代码之前）

第一件事不是让 AI 动手，而是让它先写 `build-method.md`：**任务怎么分解、记录怎么记、验证怎么记**。
三条纪律：

1. 项目 → phase → task 三层分解，task 半天粒度、可独立执行；
2. index-log append-only，按实践顺序记，错了补更正不删旧条；
3. verify.md 逐验证点记「命令 + 实际输出 + 结论」，**数字说话，FAIL 也记**。

**为什么这步关键**：目标是「做教程流水线」这种大目标，直接放 AI 进去会发散。
规则先落档 = 先把「游戏规则」写进仓库，后面 52 次执行都在规则内自治。

### Step 1 · 把目标拆成带验证点的 task（验收合同前置）

每个 task 动手前先写 `task.md`，核心是**验证点先于实现**。真实样例
（[phase-4/task-01](../../excel-interaction/docs/projects/phase-4/tasks/task-01-pipeline-scripts/task.md)）：

```markdown
## 验证点
1. check-manifest.mjs 对现有 1 份契约跑通（exit 0）；构造坏契约时 exit 1 且指出问题。
2. new.mjs 生成 apps/vlookup-basic/ 目录结构齐全。
3. serve.mjs 起服务后 curl 到 index.html 与 course.config.json（200）。

## 范围外
- 模板实现内容（task-02）；浏览器验收四点（task-03）……
```

三个细节决定了 AI 不跑偏：

- **验证点可执行**：`exit 0`、`curl 200`——AI 自己就能判定过没过，不需要我主观打分；
- **范围外显式声明**：防止 AI「顺手」改别的模块（这是最常见的失控点）；
- **前置显式声明**：依赖哪个 task 写明，能并行的不设依赖。

### Step 2 · 放开路径，让 AI 多路尝试（这是「效果还不错」的核心）

验收锁死后，**实现路径给 AI 自由**，而且鼓励它并行试几条：

| 分叉点 | AI 试了哪几条 | 怎么收口 |
| --- | --- | --- |
| 出片方式 | 渲染式（截帧合成）/ 录屏式（Playwright）/ 抓窗式（真 LibreOffice + gdigrab）**三条并行** | 同一份 plan 互为校验，生产默认渲染式，真机质感走抓窗式 |
| 表格引擎 | handsontable（默认）/ univer（跨表）/ onlyoffice（全档）**三引擎** | 统一最小 API（mount/setFormula/readValue/focusCell），新引擎只写一个 engine.js |
| 交互课结构 | phase-4+5 合并里程碑中 **方案 A/B/C 由用户拍板** | 分叉点交人，其余 AI 自治 |
| 真机图表方向 | UNO `BarDiagram Vertical=True` 到底是横条还是竖柱？ | **探针先行**：写 probe 脚本实证 → 再批量出片 |

**关键手法是「探针」**：不确定的路径先花 10 分钟写个最小探针（uno-chart-probe、
25 项 A 类探针），拿真实输出说话，而不是让 AI 猜着写完 7 门课再推倒。
探针 = 把「尝试不同方式」的成本压到最低的工具。

### Step 3 · 证据收口（FAIL 也记）

每个 task 完成必须写 `verify.md`。真实样例
（[phase-6/task-04](../../excel-interaction/docs/projects/phase-6/tasks/task-04-record-and-drivers/verify.md)）
记录了抓窗式录制过程中 **FAIL→修复→复验 PASS 的 4 个 bug**：

```
1. uno 桥 30s 未就绪：profile 相对路径拼出非法 file URI → 改 Path.resolve() 绝对路径
2. gdigrab 窗口标题 GBK 乱码 → 强制 UTF-8 输出编码
3. 探到启动中心窗（匹配到恰为 "LibreOffice" 的标题）→ 过滤词收窄
```

**为什么 FAIL 也要记**：失败记录是「坑位清单」的原材料——批量铺量时这些坑会 ×N 收税，
先记下来、批量前清掉（redo-plan 的原话：清掉「每课都交税」的遗留项）。

### Step 4 · 人只当体验者，反馈直接变 task

我（人）在循环里的角色不是盯代码，而是**打开成品玩**：

```
打开试点课 → 练习态输公式 → 发现全角输入判错 → 开一个 task
                                        ↓
            task-05「公式输入全角自动转换（中文 IME 防错）」→ 验证点 → AI 执行 → verify
```

index-log 里 **12 个「用户反馈闭环」task** 全是这么来的：IME 转换、参数逐位说明、
防剧透、验收框折叠、主题改格数……每条都是「体验 → 反馈 → task 三件套 → 修复」。
反馈针对的是**体验**，不是实现——所以不会把 AI 的架构搅乱。

### Step 5 · 验收闸门 → 批量铺量

单条路验证过了，才解锁批量（[redo-plan](../../excel-interaction/docs/sprints/redo-plan.md) 的节奏）：

```
试点 1 课端到端 → 核心课验收 → 批量铺量
```

- L2 冲刺的批量闸门是 **P3 三问走查**：3 次点击内能看片？练习态输入能验收通过？
  走查通过 → 才解锁 A 类 7 场景批量转写；
- 批量的完成判据和单课一样四关全绿：契约校验过 → 生成过 → 出片 QC 过 →
  真浏览器回归 **36/36**；
- 遗留项不悬空：全部 issue 化（#14–#20）+ deferred.md 销账制，防止 AI 每轮「顺手处理」。

## 三、什么必须锁死，什么可以放开

| 锁死（我写） | 放开（AI 试） |
| --- | --- |
| 目标与验收标准（验证点） | 实现路径（几条并行试） |
| 契约格式（courses/*.json 字段块） | 契约里的场景内容 |
| 记录纪律（index-log / verify 格式） | 用什么脚本、什么库达成 |
| 范围外清单（防跑偏） | task 内部的技术方案 |
| 分叉点拍板（方案选择、走查放行） | 其余一切自治 |

**边界感就是效率**：锁死的越精确，AI 放开得越安全。验证点写成 `exit 0 / curl 200`
这种可执行判据，AI 才能自我闭环，人才能只在分叉点出现。

## 四、可直接复用的目标陈述模板

给 AI 下目标时，照这个结构写（对应 Step 0/1）：

```markdown
## 目标
<一句话说清做什么，以及「不做什么」>

## 交付方式
先写 <方法论/规则文件>，再按 项目 → phase → task 分解；
每个 task 先写 task.md（验证点 + 范围外），执行后补 verify.md（命令+输出+结论）。

## 验收
<3-5 条可执行判据：命令、exit code、URL、数字>
<批量/放行闸门：什么条件下才能铺量>

## 尝试方式
不确定的路径先写最小探针拿真实输出；可以并行试多条方案，
在 <分叉点> 列出来由我拍板，其余自治。

## 纪律
FAIL 也记入 verify；遗留项进 deferred/issue，不顺手扩 scope；
每完成一个 task 追加一条 index-log。
```

## 五、一句话总结

excel-interaction 验证的不是「AI 能不能自己做项目」，而是：
**人把模糊目标翻译成可执行验收合同，AI 在合同内多路试错、留证据，
人只管体验成品和分叉拍板——试错成本被探针和 task 粒度切碎之后，
「让 AI 尝试不同方式」才从赌博变成工程。**

---

相关：[excel-interaction 制作复盘](excel-interaction/README.md) ·
[时间线](excel-interaction/timeline.html) ·
[build-method 原文](../../excel-interaction/docs/build-method.md) ·
[pipeline 流水线构成](../../excel-interaction/docs/pipeline.md)
