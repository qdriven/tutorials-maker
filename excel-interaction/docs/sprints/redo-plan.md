# 重做 Excel 教程：计划、Skill 使用记录与目录重定义

> 基于本仓已实测跑通的 skill 组合（excel-tutorial-maker / excel-desktop-recorder / TTS provider / Hyperframes / OpenScreen），给出「重新做 Excel 教程」的执行计划、skill 使用记录方法、以及全部重做时的目录重定义方案。实测证据见 [skill-log/](skill-log/) 与 [skill-fit-analysis.md](skill-fit-analysis.md)。

## 一、总体思路：契约先行，一份配置双产物

这类任务的正确形态是**契约驱动的实机演示**（见 [skill-fit-analysis.md](skill-fit-analysis.md) 的七条画像）。重新做时不要"先写教程再想视频"，而是：

```
一份 CourseConfig（课的唯一事实源）
  ├─→ excel-tutorial-maker   → 交互动画课（可练习、可验收）→ showcase 登记
  └─→ excel-desktop-recorder → 无废话讲解 mp4（TTS 配音，语音驱动节奏）
```

文字、画面、配音从同一份契约派生，天然同步。先定两个口径：

| 口径 | 选项 | 建议 |
| --- | --- | --- |
| **重做范围** | A. 内容沿用 18 课、只换新一代产物；B. 内容也推倒重写 | **先 A**——18 课内容已验收，重做成本主要在产物端；B 等 A 验收后按需挑课 |
| **批量节奏** | 一次全量 vs 试点先行 | **试点 1 课端到端 → 核心课 → 全量**。单课质量验收标准立住了再铺开 |

## 二、分阶段计划

> 从空目录逐步执行的完整命令版见 [build-checklist.md](build-checklist.md)（8 阶段每步一验）。

### 阶段 0 · 开工前修缮（约半天，与选题并行）

批量生产前先清掉会"每课都交税"的遗留项：

- **P0**：`excel-desktop-recorder/SKILL.md`（44.5K）拆 `references/`，避免每次触发全量进上下文
- **P1**：`narrationText` / 排期 / provider 参数补单测（现在零测试，改脚本无保护）

### 阶段 1 · 定契约（每课的单一事实源）

- 从 18 课知识体系挑课（建议先挑 3–5 门核心课：函数计算 / 图表 / 查找 / 透视）
- 写 `course.<id>.json`：**4 步指南**每步固定「单元格地址 + 菜单路径 + 公式原文 + 验收结果」——这直接决定字幕、TTS、步骤高亮三处
- 引擎按能力矩阵选，别硬上：
  - 纯公式/汇总/图表 → **Handsontable + HyperFormula**（默认、零依赖）
  - 动态数组/多表 → **Univer**
  - FILTER/XLOOKUP/原生透视表 → **OnlyOffice**（Handsontable 不支持，已知边界）
- ⚠️ 边界：跨表 SUM 那课保持冻结不动；"execl" 等既有拼写不改；kimi-excel 残留（`samples/kimi-excel` 路径、`.kimi-excel-root` 作用域类）是刻意保留的

### 阶段 2 · 交互动画课（excel-tutorial-maker）

```bash
cd domains/excel-animation
node scripts/excel-tutorial/new.mjs --id <id> \
  --config skill/excel-tutorial-maker/course.<id>.json --port <端口>
pnpm verify:manifest   # 自动登记 tutorials.json 后校验
```

主题二选一（kimi 编辑风 / Excel 绿）。验收：4 步指南与画面对齐、公式真算真回读、动效完整。

### 阶段 3 · 无废话讲解视频（excel-desktop-recorder + TTS）

```bash
cd skill/excel-desktop-recorder
# 1) 同一份 course.config → 录制计划
node --experimental-strip-types scripts/build-plan.mjs \
  --config ../../apps/<id>/src/course.config.ts --out out/plan.json
# 2) 出片（渲染式默认，锁屏/CI 也能跑；TTS 语音驱动每步停留）
node scripts/render-video.mjs --plan out/plan.json --out out/<id>.mp4 --tts edge
```

- **TTS**：`edge`（神经语音）首选，`sapi` 离线兜底；默认"无废话修剪"已内建（公式行不念、只取第一子句、42 字截断），实测 223.7s → 147.8s
- **模式**：默认渲染式；要真实鼠标轨迹——会话解锁用 `record.mjs` 抓窗式，锁屏用 `--engine hot` 浏览器录屏
- **质检**：逐帧核对 + 验收清单（画像七条硬性之一）

### 阶段 4 · 登记与收尾

视频放入 `src/standalone/public/showcase/`，`tutorials.json` 加条目，`pnpm verify:manifest` 校验——showcase 页零改动自动展示。本次 skill 使用补一条 [skill-log](skill-log/) 记录。

### 排期估算

| 项 | 工作量 |
| --- | --- |
| 阶段 0 修缮 | ~0.5 天 |
| 试点课端到端（1 课全链路） | ~1 天 |
| 批量每课增量 | 动画课 1–2h + 视频 0.5–1h |
| 3–5 门核心课 | 再 +2–3 天 |
| 18 课全量 | 核心课验收后约 2–3 天批量 |

总计：**试点到核心课约 3–4 天，全量铺完约 1 周内**。

## 三、Skill 使用记录方法（可行办法）

重做过程涉及大量 skill 的分析、验证、生产——需要能**完整、可追溯**地记录每次使用。办法：仓库内 **`docs/skill-log/` 过程记录目录**，约定先行、量大再脚本化：

1. **一次使用一条记录**：`YYYY-MM-DD-<skill>-<slug>.md`，frontmatter 四字段（date / skill / kind / status）+ 固定小节（目标 / 做法 / 结果 / 结论与坑 / 关联）。「做法」写可复制重跑的命令，失败的尝试也留一行。
2. **数字说话**：「结果」只记实测数据（时长、体积、帧数、成功率）与产物路径（写明是否入库）。
3. **索引**：[skill-log/INDEX.md](skill-log/INDEX.md) 一行一条时间线；README 是格式约定与模板。
4. **失败也记**：`status: fail/partial` 的记录价值往往更高——坑位清单就是这么攒出来的。
5. **分工**：skill-log 记「过程」（一次使用一条），`docs/research/` 记「结论」（一个主题一篇，引用 skill-log 做证据），个人 memory 只放跨会话机器向事实。
6. **可选自动化**：条目多起来后加 `check-skill-log.mjs` 校验 frontmatter 齐全、INDEX 与文件一一对应（挂进 `pnpm verify`）。

完整格式、模板与维护约定见 [skill-log/README.md](skill-log/README.md)；已回填 3 条本次探索的真实记录（Hyperframes / OpenScreen / TTS provider）作为格式验证。

## 四、全部重做时的目录重定义分析

### 现状盘点（六个问题）

当前 `domains/excel-animation/` 是一路整合长出来的，重做前值得重新定义：

1. **apps/ 混三种角色**：生成课（`excel-tutorial-retail-ops` / `lookup-lab`）、引擎模板与手工课（`univer-excel` v1 模板 / `handsontable-excel` / `onlyoffice-excel`）同级混放——生成产物与手写源不分，重做时容易误改生成物。
2. **课程契约散落三处**：生成课的 `apps/*/source/*.json`、模板课的 `src/course.config.ts`、skill 里的 `course.*.example.json`——没有统一的契约层。
3. **产物没有统一层**：`apps/*/dist/`、`skill/*/out/`、视频/配音将要产出的媒体，各自为政，gitignore 逐条打补丁。
4. **docs/ 三类混杂**：内容资产（`excel/` 18 课、`motion/`）、方法论（`recording-method.md`、`skill-fit-analysis.md`、`overview.md`）、调研（`research/`、`motion/05-research/`）、项目管理（`sprints/`）。
5. **展示层藏得深**：静态演示/快照在 `src/standalone/public/showcase/`，而 `src/` 本身还承担壳内 domain 组件职责。
6. **scripts/ 四组工具各说各话**：`excel-docs` / `motion-docs`（文档构建）、`excel-tutorial`（流水线）、`onlyoffice`（服务），SKILL.md 里的相对路径各自约定。

### 目标分层（五层模型）

| 层 | 目录 | 职责 | 修改纪律 |
| --- | --- | --- | --- |
| **L1 契约** | `courses/` | 内容唯一事实源（CourseConfig + 原始教程文本） | 唯一手改的内容 |
| **L2 技能** | `skill/` | 生产工具（SKILL.md + scripts + 引擎模板） | 手改，带测试 |
| **L3 流水线** | `scripts/` | 编排 CLI（生成、校验、文档构建、服务） | 手改 |
| **L4 产物** | `apps/` + `out/` | 生成的教程应用、视频、配音、帧 | **不手改**，重生成覆盖 |
| **L5 记录** | `docs/` | 方法论、调研、skill-log | 手改，追加为主 |
| （展示层） | `src/` | standalone web（showcase 页 + 静态演示） | 保持不动（壳契约） |

### 目标结构与迁移映射

```
domains/excel-animation/
├── courses/                      # L1 契约（新）
│   ├── <id>.json                 #    每课一份 CourseConfig
│   └── seeds/                    #    原始教程文本（Markdown 输入）
├── skill/                        # L2 技能
│   ├── excel-tutorial-maker/
│   │   ├── SKILL.md              #    ≤5K 入口，细节进 references/
│   │   ├── references/           #    能力矩阵、引擎对照、动效规格
│   │   └── templates/            #    引擎模板 ← apps/{univer,handsontable,onlyoffice}-excel
│   └── excel-desktop-recorder/
│       ├── SKILL.md / references/ / scripts/
├── scripts/                      # L3 流水线
│   ├── tutorial/                 #    new.mjs / check-manifest.mjs ← excel-tutorial/
│   ├── docs/                     #    文档构建 ← excel-docs/ + motion-docs/
│   └── serve/                    #    onlyoffice/server.mjs
├── apps/                         # L4 生成产物（new.mjs 输出，不手改）
├── out/                          # L4 媒体产物（视频/配音/帧）→ .gitignore
├── docs/                         # L5 文档
│   ├── excel/  motion/           #    内容资产：URL 稳定，不搬家（见下）
│   ├── method/                   #    recording-method / skill-fit-analysis / redo-plan ← docs/ 根
│   ├── research/  sprints/
│   └── skill-log/                #    使用记录（本方案已建）
└── src/                          # 展示层：保持不动（壳 domain 契约 + vite 中间件）
```

| 现状 | 去向 | 说明 |
| --- | --- | --- |
| `apps/excel-tutorial-*/source/*.json` | `courses/<id>.json` | 契约集中 |
| `apps/univer-excel` 等三个引擎版 | `skill/excel-tutorial-maker/templates/` | 它们是模板不是课；`univer-excel` 保留一个 `apps/` 参考实现亦可 |
| `skill/excel-tutorial-maker/course.*.example.json` | 仍留 skill（示例）+ 课程真身进 `courses/` | 示例与实存分开 |
| `skill/*/out/`、`apps/*/dist/` | 统一 `out/`（dist 随构建忽略） | gitignore 收敛为一条 |
| `scripts/excel-tutorial/` | `scripts/tutorial/` | 命名与职责对齐 |
| `docs/recording-method.md` 等方法论文档 | `docs/method/` | 与内容资产、调研分开 |
| `docs/excel/`、`docs/motion/` | **不搬** | URL（`/docs/excel/...`）与大量内链已固化在 manifest 与文档里，搬家收益不抵成本 |
| `src/` | **不搬** | 壳的 domain 注册（`web-domain.tsx`）与 vite 中间件（`/docs`、`/skill`）依赖此结构 |

### 迁移步骤（每步一验，可分批做）

1. **建 `courses/` 集中契约**：移入各课 CourseConfig → 改 `new.mjs --config` 解析与 SKILL.md 引用 → `pnpm verify:manifest` + 生成一课试跑
2. **引擎模板入 skill**：`apps/{univer,handsontable,onlyoffice}-excel` → `skill/excel-tutorial-maker/templates/` → 改 new.mjs 模板路径 → 重新生成一门课比对
3. **产物统一 `out/`**：改 render-video/record 输出默认路径 → `.gitignore` 收敛 → 跑一次出片
4. **scripts 重排**：`excel-tutorial` → `tutorial` → 改 check-manifest 的 base 常量、SKILL.md/README 内链
5. **docs 方法论归位**：`docs/method/` → 改 `tutorials.json` 路径字段与文档交叉链接
6. 每步收尾：`pnpm verify:manifest` + `pnpm test` + 手开 showcase 页过一遍

### 影响面清单（迁移时逐项核对）

- `src/data/tutorials.json` 的 path/package/script 字段
- `vite.standalone.config.ts` 中间件（`/docs`、`/skill` 直出目录）
- `scripts/tutorial/check-manifest.mjs` 的 base/prefix 常量
- 两个 SKILL.md 与 `docs/` 内所有相对链接
- `new.mjs` 的模板复制路径
- 个人 memory 中记录的路径引用

### 建议的推进方式

- **目录重定义与阶段 0 修缮合并做**（都是"开工前"，一次迁移一次验证）；
- 也可以**先按现状跑试点课**（结构问题不影响 1–2 课的生产），把目录迁移放在核心课批量之前——多一次生成/迁移的返工，但试点压力小。
- 倾向前者：既然明确"全部重新做"，先立结构再生产，避免产物落进将被搬走的目录。

## 五、关键建议（避坑）

1. **别为视频单独写解说脚本**——解说从 4 步指南派生（`narrationText`），否则双产物必然漂移
2. **Hyperframes 不进主线**——只适合"已有 HTML 动画补视频"（零改造实测可行），动手教程它不管
3. **OpenScreen/抓窗式克制用**——只在需要真实鼠标时；文字注解导出有黑块 bug，文字层统一 ffmpeg drawtext
4. **试点课选公式密集型**（如查找函数课）——一次检验引擎边界、TTS 节奏、字幕对轴三个风险点
5. **每次 skill 分析/验证/生产都落一条 [skill-log](skill-log/)**——趁命令与数据还在就写，失败的也写

## 总结

- **计划**：契约先行双产物；阶段 0 修缮 → 试点课 → 核心课 → 全量，约 1 周内铺完 18 课。
- **记录**：`docs/skill-log/` 一次使用一条（目标/做法/结果/结论与坑），INDEX 时间线索引，失败也记；已回填 3 条实测记录验证格式。
- **目录**：五层模型（契约/技能/流水线/产物/记录）；契约集中 `courses/`、模板入 skill、产物统一 `out/`；`docs/excel`、`docs/motion`、`src/` 保持不动；迁移每步一验，影响面六项逐核。
