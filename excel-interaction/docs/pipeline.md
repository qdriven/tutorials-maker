# pipeline.md · 流水线构成（契约单源，三产物）

> 2026-11-09 review 落档：整条流水线如何构成的总览——契约单源派生
> **可交互动画课 + 30 秒无废话讲解视频 + showcase 展示登记**三产物。
> 各环节细节链接到 task 三件套；本文件是构成图，不是操作手册（操作见
> [../scripts/README.md](../scripts/README.md) 与各 skill README）。

## 总览

```
courses/<id>.json（唯一事实源：数据 + 4 步指南 + 口播 + 参数 + 验收）
   │
   ├─【生成层】new.mjs + templates/<engine>/ ──→ apps/<id>/（可交互动画课）
   │                                              └─ tutorials.json 登记 ──→ showcase 教程页
   │
   └─【出片层】build-plan.mjs (+tts.mjs) ──→ plan.json + narration.wav
          ├─ render-video.mjs（渲染式，默认）──┐
          ├─ record.mjs --browser（录屏式）────┼─→ out/<id>/<id>.mp4（<30s 有声）
          └─ record.mjs --capture（抓窗式）──┘        │
          qc.mjs 质检（流断言/漂移<5%/抽帧）           └─ cpSync + 登记 ──→ showcase 视频预览
```

## 1. 契约层（单源）

`courses/<id>.json` 一份契约承载全部课程语义：

| 字段块 | 内容 | 消费方 |
| --- | --- | --- |
| `data.sheets[]` | 样例数据（多表可跨表引用） | 生成层铺格 / 出片层 UNO 铺数 |
| `guide`（4 步） | cell / menu / action / detail / expect / formula | 交互课步骤卡 + 视频步骤卡 |
| `formulaArgs[]` | 参数逐位 part / label / meaning | **三处渲染**：卡片行、口播（`参数：<标签>、…`）、逐参数高亮 |
| `summary` | 一句话 / 解释 / 收尾总结 | 交互课总结框 + 视频 intro/outro 口播 |
| `narration.gapMs` 等 | 节奏参数 | build-plan holdMs 计算 |
| `checks` | 验收条件 | 练习态判定 + 出片 outro 定格 |
| `engine` / `theme` | 引擎选型 / 主题 | 生成层选模板 / theme.css |

`check-manifest.mjs` 校验契约合法性。**改课程只改契约，不动代码**——这是整个流水线的核心约束。

## 2. 生成层（交互动画课）

`scripts/tutorial/new.mjs`：契约 + `skill/excel-tutorial-maker/templates/<engine>/` → `apps/<id>/`。
模板分两层：**根层三件**（index.html / lesson.js / theme.css——lesson.js 是共享源，三引擎同一份）
+ **引擎层**（engine.js 等 + vendor/ 预构建包）。引擎只实现最小 API
`mount / setFormula / readValue / focusCell`（+ getFormula / getContent / onChange / onSelection），
新引擎 = 只写一个 engine.js：

| 引擎 | 定位 | 依赖形态 | 关键口径 |
| --- | --- | --- | --- |
| handsontable | 基础档（默认） | vendor 从 node_modules 拷入 | 同步算、有单元格 DOM（flash / 页内鼠标可用） |
| univer | 多表档 | 预构建 kit（dist/，构建源见 issue #15） | 跨表真算；**异步落值**（null-guard + 延迟重读兜底）；画布无单元格 DOM |
| onlyoffice | 全档（FILTER/XLOOKUP/透视/图表唯一选择） | docserver + 插件桥 | 四 API 动作层待实测（issue #14）；onChange = 500ms 值差轮询 |

运行时能力全在共享 lesson.js：自动播放 / 手动练习 / 重置、逐步展示 + 全步 accordion、
参数逐位高亮（`focusParam`）、公式栏联动、练习态防剧透、`Lesson.mouse` 页内光标层。

## 3. 出片层（讲解视频）

- **build-plan.mjs**：契约 → `plan.json`。节奏模型——**口播是节奏下限**：
  `holdMs = max(minHoldMs, speechMs + gapMs)`，想砍时长先砍字数。
  segments 全量 = intro + N 步 + outro；公式步驻留按参数标签字数切 `paramBlocks`
  （逐参数高亮推进，总时长不变）；brief 口播「动作名 / 参数清单」制（细节交给烧进画面的步骤卡）。
- **tts.mjs**：edge 首选 / sapi 兜底，真实语音时长驱动 holdMs，整轨 `narration.wav` 按段拼接。
- **三条执行路径，同一份 plan**（互为校验）：
  | 路径 | 驱动 | 适用 |
  | --- | --- | --- |
  | 渲染式 `render-video.mjs` | hot-driver 截帧（fps 分帧、paramBlocks 块内连拍）→ 定长片段 concat → 混 narration + ASS 步骤卡/字幕 | 生产默认，确定性最好 |
  | 录屏式 `record.mjs --browser` | Playwright 实时录像（动画实时走，页内光标 `--mouse`） | 观感进阶 |
  | 抓窗式 `record.mjs --capture` | uno-driver 在真 LibreOffice UNO 重演（真实 OS 光标 `--mouse`，DPI 物理 px），gdigrab 抓窗 + `paceStartMs→leadMs` 前摇裁剪 | 实机真值 |
- **qc.mjs**：流断言（音视频流）+ 片长 vs ΣholdMs 漂移 <5% + 逐步抽帧比对。

## 4. 展示层

`tutorials.json` 清单（`check-tutorials.mjs` 校验）→ showcase / standalone：
品牌「无废话 Excel 教程」、sidebar 完整教程（一句话 / 解释 / 4 步 / 总结四节纯教程）、
内容页内快速预览（md / JSON 折叠树 / 视频内嵌）、声音手势门控解静音
（Chromium autoplay 铁律：解静音只在用户手势后做）。

## 5. 质量与文档层

- `pnpm verify` 三连 = check.mjs（工具链 6 必需）+ check-manifest（契约）+ check-tutorials（清单）。
- 文档纪律 = [build-method.md](build-method.md)：task 三件套 + index-log append-only +
  phase 状态行 + deferred.md 销账制；取证驱动（drive-*.py 检查点、shots 入 task 目录）。

## 6. 命令速查（package.json）

| 命令 | 作用 |
| --- | --- |
| `pnpm check:env` / `pnpm install:env` | 工具链体检 / 安装 |
| `pnpm generate` | 契约 + 模板 → apps/<id>/ |
| `pnpm plan` / `pnpm video` / `pnpm qc` | 录制计划 / 渲染出片 / 抽帧质检 |
| `pnpm verify` | 全量自检（环境 + 契约 + 清单） |
| `pnpm serve` / `pnpm showcase` | 静态服务（apps/ 4173·目录可调）/ showcase 全域 4174 |

## 7. 口径与边界

**稳的**：契约单源真正做到了一份 JSON 派生课 + 视频双产物（formulaArgs 同时进口播 /
卡片 / 高亮是最好例证）；三出片路径同 plan 互为备份；30s 无废话口径已达标
（19.7s / 17.3s，上限不是目标）。

**脆的 / 待办**：onlyoffice 动作层未实测、univer 构建源等持久物暂住 gitignored out/
（待收编）、univer 表头带、透视/图表扩展位、PR 整理、旧域在飞——全部进
「附：遗留跟踪」。

**冻结事项（不碰）**：拼写 "execl" 不改；kimi-excel 残留保留；handsontable 跨表 SUM
先停止修改；产品视频保持无鼠标基线（`--mouse` 仅 opt-in）。

## 附：遗留跟踪（GitHub issues，2026-11-09 建立）

| issue | 内容 | 来源 |
| --- | --- | --- |
| [#14](https://github.com/qdriven/agent-learning-workbench/issues/14) | onlyoffice 四 API 动作层 docserver 实测 + drive 验收 | deferred #3 残留（task-14 诚实记档） |
| [#15](https://github.com/qdriven/agent-learning-workbench/issues/15) | out/ 参照物入库（univer-kit 构建源 / smoke 工具 / 校准工具） | out/ 盘点发现 |
| [#16](https://github.com/qdriven/agent-learning-workbench/issues/16) | univer 金底表头带自绘主题 | univer README 记档 |
| [#17](https://github.com/qdriven/agent-learning-workbench/issues/17) | onlyoffice renderPivot / renderChart 扩展位 | onlyoffice README 记档 |
| [#18](https://github.com/qdriven/agent-learning-workbench/issues/18) | PR / 分支整理（待用户定夺） | = deferred #7 |
| [#19](https://github.com/qdriven/agent-learning-workbench/issues/19) | 旧域在飞改动处置（归属用户） | = deferred #8 |

out/ 盘点与清理记录（试验删 / 结果留，235M→17M）见 [../out/README.md](../out/README.md)。
