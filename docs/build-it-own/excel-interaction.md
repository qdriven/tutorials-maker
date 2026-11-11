# excel-interaction · 我是怎么把 Excel 教程做成一条流水线的

> 第一视角制作复盘。原始证据都在项目里：
> 执行流水 [index-log](../../excel-interaction/docs/projects/index-log.md)（52 条，2026-11-08 → 11-10）、
> 方法论 [build-method](../../excel-interaction/docs/build-method.md)、
> 流水线构成 [pipeline](../../excel-interaction/docs/pipeline.md)。
> 配套展示：[时间线页面](excel-interaction-timeline.html) · [演示幻灯片](excel-interaction-slides.html)

---

## 一、为了什么

起因很简单：**Excel 教程看一遍记不住，敲一遍才学得会**。市面上的教程要么是截图长文，
要么是纯视频——看的时候懂了，打开表格还是不会写公式。

我想要的教程长这样：

1. **它是实机**：表格是真的，公式真算、真回读，我能在里面练习并被验收；
2. **它无废话**：每个函数一节课，30 秒动画讲清楚，不铺垫、不凑时长；
3. **它可批量**：我不想做一门课就手工录制一次——我要的是**一条流水线**，
   写一份课程配置，动画课和讲解视频一起出来。

所以这个项目的定位从第一天就定死了：**契约驱动的实机教程工厂**。
一份 `courses/<id>.json` 是唯一事实源，同时派生两个产物：

```
courses/<id>.json ──► apps/<id>/（交互动画课）──► out/<id>/<id>.mp4（30s 讲解视频）──► showcase 登记
```

我还给自己加了一条约束：**从零新做，不搬旧实现**（旧域 excel-animation 只作为参考资产），
并且**全程文档化**——过程本身也是交付物。

## 二、怎么做的（过程）

### 方法论先行（还没写一行功能代码之前）

我把「怎么干活」先写进了 [build-method.md](../../excel-interaction/docs/build-method.md)，
三条纪律，后面 52 条执行流水全部照它走：

1. **任务分解**：项目 → phase（对齐 build-checklist 的 9 个阶段）→ task（半天内可完成的最小交付）；
   每个 task 三件套——`task.md`（计划，验证点先于动手）、`verify.md`（证据，逐验证点记命令+输出+结论）、`output.md`（交接）。
2. **记录保存**：`index-log.md` append-only，按实践顺序记，错了补更正条目、不删旧条。
3. **验证保存**：数字说话（版本号、路径、退出码），**FAIL 也记**——坑位清单就是从失败记录里长出来的。

### 时间线（三天，52 条流水）

**2026-11-08 · 打地基 → 试点出课**

- 环境探测拿到一手数据（node v24.15.0 / pnpm 12.14.0 / ffmpeg 8.0 / edge-tts 7.3.1 / LibreOffice 不在 PATH），
  顺手修掉 3 个 Windows 坑（`.cmd` 垫片 spawn EINVAL、商店执行别名假阴性、探针不查退出码）。
- 连跑 phase-0 → phase-8：环境 → 目录骨架 → 技能层（skill + 引擎模板）→ 契约层 → 流水线脚本 →
  试点出课 → 出片（TTS + 渲染）→ 展示层 showcase → 记录收尾。**每阶段 task 全过才进下一阶段**。
- 穿插 12 个「用户反馈闭环」task：Excel 级交互增强、中文 IME 全角公式自动转换、
  公式参数逐位说明 `formulaArgs`、验收框逐步展示/全步折叠、练习态防剧透、一句话总结……
  ——这些全部改**契约和共享 lesson.js**，不改单课代码。

**2026-11-09 · 扩展引擎与收口**

- 补齐三引擎模板：handsontable（基础档，默认）/ univer（多表档，跨表真算）/
  onlyoffice（全档，FILTER/XLOOKUP/透视/图表唯一选择）——新引擎 = 只写一个 `engine.js`，
  实现 `mount / setFormula / readValue / focusCell` 最小 API。
- 出片三路径同 plan 互为校验：渲染式（默认，确定性最好）、录屏式（观感）、抓窗式（真 LibreOffice 实机真值）。
- 遗留项全部 issue 化（#14–#20），分支收口合并 main（PR #13），standalone 展示层先行。

**2026-11-10 · L2 复合课 + 批量铺量 + 站点化**

- L2 冲刺：N 步契约地基 → 9 门复合/压轴课（RFM、零售运营、投资组合仪表盘……）→
  跨表引擎 → 合集页 → P3 三问走查通过后才解锁批量。
- A 类 7 场景程序化批量（`aclass-gen.mjs`）、抓窗式 10 门真机出片（`batch-capture.mjs`）。
- 站点统一：三页互达、卡片墙、共享资产去重（`apps/_shared`）、90 秒有声全站导览视频。

## 三、结果

| 维度 | 数字 |
| --- | --- |
| 课程契约 | **44 门** `courses/*.json`（基础函数 → 图表 → 复合实战 → 压轴案例） |
| 交互动画课 | **44 个** `apps/<id>/`，三引擎可选，练习态真算真验收 |
| 成品讲解视频 | **47 支** mp4（含全站导览），单支 ≤30s 有声，QC 抽帧全过 |
| 执行流水 | **52 条** index-log（2026-11-08 → 11-10，三天） |
| 验证 | task 三件套齐全，全量回归 **36/36**（真浏览器跑） |
| 遗留跟踪 | GitHub issues #14–#20，deferred.md 销账制 |

最能说明「契约单源」成立的证据是 `formulaArgs`（参数逐位说明）：**一处写，三处用**——
交互课卡片行、视频口播（`参数：查找值、查找数组…`）、画面逐参数高亮，三端永远一致。

## 四、怎么尝试

```bash
cd excel-interaction
node scripts/check.mjs          # 环境体检（6 项必需工具）
pnpm verify                     # 全链自检：环境 + 契约 + 展示层清单
pnpm serve                      # 打开任意一门课 → http://localhost:4173/<id>/index.html
pnpm showcase                   # 全站展示层 → http://localhost:4174/src/standalone/index.html
```

想自己做一门新课：

```bash
# ① 写契约：courses/my-lesson.json（照 contract-schema，数据 + 4 步指南 + 口播 + 验收）
# ② 生成动画课
pnpm generate -- --id my-lesson --config courses/my-lesson.json --force
# ③ 录制计划 + TTS → 渲染出片 → 抽帧质检
pnpm plan  -- --config courses/my-lesson.json --tts edge
pnpm video -- --plan out/my-lesson/plan.json
pnpm qc    -- --plan out/my-lesson/plan.json
# ④ 登记进 showcase 清单（自动 upsert）
pnpm verify
```

**改课程只改 JSON，不动代码**——这是整条流水线的核心约束。

## 五、批量流水线（试点跑通之后怎么铺量）

试点阶段我是一门课一门课手工打磨的；质量验收标准立住之后，铺量靠的是**五件事**：

### 1. 程序化生成器（scripts/batch/）

| 生成器 | 干什么 |
| --- | --- |
| `func-batch.mjs` | 函数类课程批量生成（同构 4 步结构套不同函数） |
| `chart-batch.mjs` | 图表类 8 门批量（柱/条/折线/饼/散点/直方/组合/堆积） |
| `l2-gen.mjs` | L2 复合课模板（N 步契约地基，9 门） |
| `capstone-gen.mjs` | 压轴案例课模板 |
| `aclass-gen.mjs` | A 类 7 场景程序化转正（power-query / eda-outliers / plans / two-way-lookup / inventory-reorder / supply-quality / text-date） |

批量的前提是**契约同构**：每门课的语义都装在同一批字段块里
（`data.sheets` / `guide` 4 步 / `formulaArgs` / `summary` / `checks` / `engine`），
生成器只是把场景差异填进模板——所以批量不等于降低质量，`check-manifest.mjs` 对每份契约照样校验。

### 2. 批量出片 + 质检

```bash
pnpm plan → pnpm video → pnpm qc     # 每门课三连
node scripts/recorder/batch-capture.mjs   # 抓窗式批量：真 LibreOffice UNO 重演 + gdigrab 抓窗
```

QC 是流水线的闸门：音视频流断言、片长 vs ΣholdMs 漂移 <5%、逐步抽帧比对——
**过不了 QC 的课不进 showcase**。抓窗式批量最终 10 门全过（横条/竖柱方向逐支抽帧验证）。

### 3. 节奏模型保证「无废话」可批量达标

`holdMs = max(minHoldMs, speechMs + gapMs)`——**口播是节奏下限**，想砍时长先砍字数。
TTS 真实语音时长驱动画面驻留，所以批量出来的每支视频都天然卡在 30 秒口径内（实测 19.7s / 17.3s），
不需要人工逐支调时间轴。

### 4. 回归不破才叫批量完成

每轮批量后 `pnpm verify` + 真浏览器全量回归（**36/36**）。批量的完成判据和单课一样：
契约校验过、生成过、出片 QC 过、回归过，四关全绿。

### 5. 批量的节奏教训

`redo-plan.md` 里我总结过一条：**试点 1 课端到端 → 核心课 → 全量**，
且批量前先清掉「每课都交税」的遗留项（模板缺陷、环境坑），否则返工乘以 N。
L2 冲刺也一样——P3 走查（3 次点击内能看片、练习验收能过）通过后，才解锁阶段 2 批量转写。

## 六、踩过的坑（节选）

- **Windows 坑三连**：`.cmd` 垫片不能直接 spawn（EINVAL）、商店执行别名 `existsSync` 探不到、
  探针不查退出码会假阳性——全部修在 `scripts/check.mjs` 并记进 verify.md。
- **univer 是异步落值**：`readValue` 要 null-guard + 延迟重读兜底，否则跨表课读到旧值。
- **LibreOffice 图表方向反直觉**：`BarDiagram Vertical=True` 是横条、`False` 是竖柱，
  图型按 guide 菜单文本定，契约里的 `type` 不可靠——探针实证后才批量出片。
- **中文 IME**：公式输入全角自动转换，否则练习态输入直接判错。
- **Chromium autoplay 铁律**：解静音只在用户手势后做。

## 七、遗留与下一步

issues #14–#20 跟踪中：onlyoffice 渲染扩展位、univer 构建源收编、PR/分支整理等；
SQL × Excel 对照工作台已做可行性分析入档（planned）。详见
[deferred.md](../../excel-interaction/docs/projects/phase-8/deferred.md) 与
[pipeline.md 附录](../../excel-interaction/docs/pipeline.md)。

---

**导航**：[项目 README](../../excel-interaction/README.md) · [文档中心](../../excel-interaction/docs/README.md) ·
[执行流水](../../excel-interaction/docs/projects/index-log.md) · [scripts 用法](../../excel-interaction/scripts/README.md) ·
[时间线](excel-interaction-timeline.html) · [Slides](excel-interaction-slides.html)
