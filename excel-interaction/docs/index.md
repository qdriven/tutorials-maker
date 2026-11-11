# index · 文档索引

> Excel Interaction 全部文档的清单。组织约定见 [README.md](README.md)；
> 执行流水见 [projects/index-log.md](projects/index-log.md)。

## 项目级

| 文档 | 说明 |
| --- | --- |
| [../README.md](../README.md) | 项目说明：做什么、怎么做的总览（项目根） |
| [README.md](README.md) | 文档组织说明：projects/ 与 modules/ 的分工与约定 |
| [build-method.md](build-method.md) | 整体构建方式：任务分解模式 / 记录保存方式 / 验证保存方式 |
| [pipeline.md](pipeline.md) | 流水线构成：契约单源三产物总览（生成 / 出片 / 展示 / 质量）+ 遗留跟踪 |
| [sprints/sprint-l2-composite-lessons.md](sprints/sprint-l2-composite-lessons.md) | L2 复合场景课 Sprint：待后续内容总盘点（P1-P10）+ 难点分析 + 20 场景逐个方案 + 走查口径 + GSAP 动效对比 |
| [sprints/sprint-sql-workbench.md](sprints/sprint-sql-workbench.md) | SQL × Excel 对照工作台 Sprint（planned）：可行性分析（35/44 课 SQL 类比存量证据 + sql.js 技术选型）+ WBS + 4 阶段闸门计划 |

## 模块功能描述（modules/）

| 文档 | 说明 |
| --- | --- |
| [modules/scripts.md](modules/scripts.md) | 初始化脚本模块（check / install）的功能描述；用法手册在 [../scripts/README.md](../scripts/README.md) |
| [modules/skill.md](modules/skill.md) | 技能层模块（教程生成 / 录屏出片两套技能）的功能描述；技能本体在 [../skill/](../skill/) |

## 项目执行过程（projects/）

| 文档 | 说明 |
| --- | --- |
| [projects/index-log.md](projects/index-log.md) | 执行流水（append-only，按实践顺序） |

### Phase 0 · 环境配置（已执行）

| 文档 | 说明 |
| --- | --- |
| [projects/phase-0/README.md](projects/phase-0/README.md) | phase-0 做什么 |
| [projects/phase-0/tasks/task-01-init-scripts/](projects/phase-0/tasks/task-01-init-scripts/) | 初始化脚本（check / install）与用法文档 |
| [projects/phase-0/tasks/task-02-runtime-baseline/](projects/phase-0/tasks/task-02-runtime-baseline/) | 运行时基线：Node ≥ 20 + pnpm（+ bun 可选） |
| [projects/phase-0/tasks/task-03-python/](projects/phase-0/tasks/task-03-python/) | Python 3（驱动脚本运行时） |
| [projects/phase-0/tasks/task-04-media-pipeline/](projects/phase-0/tasks/task-04-media-pipeline/) | 媒体工具链：ffmpeg + ffprobe |
| [projects/phase-0/tasks/task-05-table-engine/](projects/phase-0/tasks/task-05-table-engine/) | 表格引擎：LibreOffice / Excel / WPS 任一 |
| [projects/phase-0/tasks/task-06-tts/](projects/phase-0/tasks/task-06-tts/) | 语音合成：edge-tts 首选 / sapi 离线兜底 |
| [projects/phase-0/tasks/task-07-optional-stack/](projects/phase-0/tasks/task-07-optional-stack/) | 可选组件：Playwright / Hyperframes / OpenScreen |

每个 task 目录内含三件套：`task.md`（做什么/功能/验证点）、`verify.md`（验证记录）、`output.md`（交接文档）。

### Phase 1 · 目录骨架（已执行）

| 文档 | 说明 |
| --- | --- |
| [projects/phase-1/README.md](projects/phase-1/README.md) | phase-1 做什么 |
| [projects/phase-1/tasks/task-01-layer-skeleton/](projects/phase-1/tasks/task-01-layer-skeleton/) | 五层目录骨架落位 + 各模块 README |
| [projects/phase-1/tasks/task-02-workspace/](projects/phase-1/tasks/task-02-workspace/) | 最小 workspace（package.json + 依赖通道） |
| [projects/phase-1/tasks/task-03-artifact-rules/](projects/phase-1/tasks/task-03-artifact-rules/) | 产物规则（out/ gitignore）与 git 归属核对 |

### Phase 2 · 技能层（已执行）

| 文档 | 说明 |
| --- | --- |
| [projects/phase-2/README.md](projects/phase-2/README.md) | phase-2 做什么 |
| [projects/phase-2/tasks/task-01-tutorial-maker/](projects/phase-2/tasks/task-01-tutorial-maker/) | 教程生成技能（SKILL.md + references + 示例契约） |
| [projects/phase-2/tasks/task-02-recorder/](projects/phase-2/tasks/task-02-recorder/) | 录屏出片技能（SKILL.md + 模式/TTS/坑位 references） |
| [projects/phase-2/tasks/task-03-templates/](projects/phase-2/tasks/task-03-templates/) | 引擎模板规格（模板契约 + 三引擎 README） |

### Phase 3 · 契约层（已执行）

| 文档 | 说明 |
| --- | --- |
| [projects/phase-3/README.md](projects/phase-3/README.md) | phase-3 做什么 |
| [projects/phase-3/tasks/task-01-pilot-seed/](projects/phase-3/tasks/task-01-pilot-seed/) | 试点课选定（VLOOKUP 查找课）+ seed 入库 |
| [projects/phase-3/tasks/task-02-pilot-contract/](projects/phase-3/tasks/task-02-pilot-contract/) | 试点契约 courses/vlookup-basic.json + 登记 |
| [projects/phase-3/tasks/task-03-sum-course/](projects/phase-3/tasks/task-03-sum-course/) | 第二门课 SUM（契约通用性验证） |

### Phase 4+5 · 流水线层 + 生成动画课（合并里程碑，已执行）

用户选定方案 C（4+5 合并一次到位），任务三件套在 phase-4 目录：

| 文档 | 说明 |
| --- | --- |
| [projects/phase-4/README.md](projects/phase-4/README.md) | 合并里程碑说明与任务清单 |
| [projects/phase-4/tasks/task-01-pipeline-scripts/](projects/phase-4/tasks/task-01-pipeline-scripts/) | 流水线三脚本（new / check-manifest / serve） |
| [projects/phase-4/tasks/task-02-handsontable-template/](projects/phase-4/tasks/task-02-handsontable-template/) | handsontable 模板实现（真引擎/双主题/动效） |
| [projects/phase-4/tasks/task-03-pilot-app-verify/](projects/phase-4/tasks/task-03-pilot-app-verify/) | 试点出课 vlookup-basic + 浏览器验收四点 |
| [projects/phase-4/tasks/task-04-handsontable-interactions/](projects/phase-4/tasks/task-04-handsontable-interactions/) | Excel 级编辑交互四件（用户反馈增强） |
| [projects/phase-4/tasks/task-05-formula-ime-normalize/](projects/phase-4/tasks/task-05-formula-ime-normalize/) | 公式输入全角自动转换（中文 IME 防错） |
| [projects/phase-4/tasks/task-06-formula-args/](projects/phase-4/tasks/task-06-formula-args/) | 公式参数逐位说明 formulaArgs（用户反馈增强） |
| [projects/phase-4/tasks/task-07-step-detail/](projects/phase-4/tasks/task-07-step-detail/) | 验收框逐步展示（用户反馈增强） |
| [projects/phase-4/tasks/task-08-practice-step-hints/](projects/phase-4/tasks/task-08-practice-step-hints/) | 手动练习步骤提示（用户反馈增强） |
| [projects/phase-4/tasks/task-09-step-accordion/](projects/phase-4/tasks/task-09-step-accordion/) | 验收框全步折叠展示（用户澄清：折叠非替换） |
| [projects/phase-4/tasks/task-10-practice-anti-spoiler/](projects/phase-4/tasks/task-10-practice-anti-spoiler/) | 练习态防剧透 + 布局换边 + 删指南卡（用户反馈增强） |
| [projects/phase-4/tasks/task-11-summary-intro-outro/](projects/phase-4/tasks/task-11-summary-intro-outro/) | 一句话总结/解释/收尾总结（用户反馈增强） |
| [projects/phase-4/tasks/task-12-theme-kimi-grid/](projects/phase-4/tasks/task-12-theme-kimi-grid/) | UI 主题改格数同款（用户反馈增强） |
| [projects/phase-4/tasks/task-13-args-narration/](projects/phase-4/tasks/task-13-args-narration/) | 公式参数逐位进口播（欠账清偿） |
| [projects/phase-4/tasks/task-14-univer-onlyoffice-templates/](projects/phase-4/tasks/task-14-univer-onlyoffice-templates/) | univer / onlyoffice 引擎模板（遗留 #3 清账） |
| [projects/phase-5/README.md](projects/phase-5/README.md) | phase-5 併入说明（验收四点在 task-03） |

### Phase 6 · 出片（已执行）

| 文档 | 说明 |
| --- | --- |
| [projects/phase-6/README.md](projects/phase-6/README.md) | phase-6 做什么与任务清单 |
| [projects/phase-6/tasks/task-01-plan-and-tts/](projects/phase-6/tasks/task-01-plan-and-tts/) | 录制计划 + TTS 三 provider（语音驱动节奏） |
| [projects/phase-6/tasks/task-02-render-video/](projects/phase-6/tasks/task-02-render-video/) | 渲染式出片（截帧→定长片段→concat→混 narration） |
| [projects/phase-6/tasks/task-03-qc-pilot/](projects/phase-6/tasks/task-03-qc-pilot/) | 抽帧质检（流断言/漂移/逐步抽帧比对） |
| [projects/phase-6/tasks/task-04-record-and-drivers/](projects/phase-6/tasks/task-04-record-and-drivers/) | 录屏式 + 抓窗式驱动（hot-driver / uno-driver / record.mjs） |
| [projects/phase-6/tasks/task-05-motion-fast-video/](projects/phase-6/tasks/task-05-motion-fast-video/) | 动作出片 + <30s 收紧（多帧捕获 / 语速 / 紧凑口播） |
| [projects/phase-6/tasks/task-06-step-cards-in-video/](projects/phase-6/tasks/task-06-step-cards-in-video/) | 步骤讲解入片 + 视频有声（展示层去分步配合） |
| [projects/phase-6/tasks/task-07-snappier-steps/](projects/phase-6/tasks/task-07-snappier-steps/) | 每步节奏收紧 -2s（动作名/参数清单口播 + gapMs 200） |
| [projects/phase-6/tasks/task-08-uno-segment-dispatch/](projects/phase-6/tasks/task-08-uno-segment-dispatch/) | 抓窗式 intro/outro 段派发（遗留 #1 清账） |
| [projects/phase-6/tasks/task-09-param-highlight-blocks/](projects/phase-6/tasks/task-09-param-highlight-blocks/) | 逐参数高亮拆段（遗留 #4 清账） |
| [projects/phase-6/tasks/task-10-mouse-choreography/](projects/phase-6/tasks/task-10-mouse-choreography/) | 鼠标编排（遗留 #2 清账） |

### Phase 7 · 展示层（已执行）

| 文档 | 说明 |
| --- | --- |
| [projects/phase-7/README.md](projects/phase-7/README.md) | phase-7 做什么与任务清单 |
| [projects/phase-7/tasks/task-01-showcase-registry/](projects/phase-7/tasks/task-01-showcase-registry/) | 展示层：showcase 页 + 清单登记 + 清单校验 |
| [projects/phase-7/tasks/task-02-showcase-sidebar/](projects/phase-7/tasks/task-02-showcase-sidebar/) | sidebar 完整教程 + 「无废话 Excel 教程」品牌 |
| [projects/phase-7/tasks/task-03-no-build-section/](projects/phase-7/tasks/task-03-no-build-section/) | 去「如何构建」——教程页只放教程 |
| [projects/phase-7/tasks/task-04-quick-preview-and-sound/](projects/phase-7/tasks/task-04-quick-preview-and-sound/) | 快速预览组件（md/JSON/视频）+ 视频有声修复 |

### Phase 8 · 记录与收尾（已执行）

| 文档 | 说明 |
| --- | --- |
| [projects/phase-8/README.md](projects/phase-8/README.md) | phase-8 做什么与任务清单 |
| [projects/phase-8/tasks/task-01-closeout/](projects/phase-8/tasks/task-01-closeout/) | 收口：一图流 / 全链自检 / 遗留移交 |
| [projects/phase-8/deferred.md](projects/phase-8/deferred.md) | 遗留清单（移交待办，append-only 销账制） |
