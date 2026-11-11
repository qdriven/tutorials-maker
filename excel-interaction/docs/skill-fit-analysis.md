# 分析：什么样的 Skill 适合做 Excel 操作演示视频与动手教程

> 针对「Excel 操作演示视频 + 动手教程」这一复合任务，从任务特征出发推导 Skill 能力要求，用本仓库的实测证据评估六类现有 Skill 形态，给出选型画像、决策树与补齐清单。结论基于 2026-11-04 在本机的实际验证（非纸面推演）。

## 一、这个任务与其他视频任务的本质区别

| 特征 | 说明 | 对 Skill 的约束 |
| --- | --- | --- |
| **教学真实性** | 单元格地址、公式原文、计算结果必须与 Excel 一致——"看着像"不行 | 必须真实引擎执行并回读结果 |
| **双产物同源** | 同一份内容要出两种形态：单向视频（mp4）+ 交互教程（可练习、可验收） | 内容必须结构化（LessonSpec/CourseConfig），不能只有视频分镜 |
| **强步骤性** | 每步固定：单元格地址 + 菜单路径 + 公式 + 验收结果，恰好 4 步 | 文字、画面、配音必须逐步对齐 |
| **无废话节奏** | 每步画面停留到它的解说说完为止 | 节奏由语音/步骤时长驱动，不是固定帧率 |
| **中文优先** | 中文讲解、中文字幕、中文配音 | 中文字体渲染与 TTS 是硬需求 |
| **可持续添加** | 新课程源源不断，不能每课手工做视频 | 生成器化：一份配置 → 视频 + 教程 + 展示登记 |

## 二、能力要求矩阵（硬性 vs 加分）

| # | 能力 | 硬性/加分 | 理由 |
| --- | --- | --- | --- |
| 1 | 真实表格引擎执行（公式真算、结果回读） | **硬性** | 教学真实性来源 |
| 2 | 契约驱动：一份配置 → 视频 + 教程双输出 | **硬性** | 双产物同源 |
| 3 | 确定性渲染（禁随机/无限循环、可重放） | **硬性** | 同一课要能反复出片、可校验 |
| 4 | 文字-画面-配音同源同步 | **硬性** | 4 步指南驱动字幕/TTS/步骤高亮 |
| 5 | 渲染引擎可替换（录制式 / HTML 渲染式 / 真机录屏式） | **硬性** | 锁屏/CI/真实鼠标场景各异 |
| 6 | 中文 TTS + 字幕 | **硬性** | 无废话系列的"说" |
| 7 | 质检内建（动效规则 + 逐帧 + 验收清单） | 加分 | 单步 ≤1.2s、无死区等规则要可机器检查 |
| 8 | 清单登记 + 一键展示 | 加分 | 可持续添加的最后一公里 |
| 9 | 镜头语言（推拉、转场） | 加分 | 营销片需要，教学片克制用 |

## 三、六类 Skill 形态评估（基于实测与调研）

### A. 真机执行 + 渲染式录制类（本仓 excel-desktop-recorder / OpenScreen 系）★★★ 首选

**实测证据**（2026-11-04，本机）：

- LibreOffice/COM/Playwright 驱动执行 RecorderPlan → 逐帧导出 → 合成画布帧 → mp4，19 步咖啡店课程出片成功（154.7s，h264+aac）
- TTS provider 抽象（sapi 离线 / edge 神经语音）接入成功，**语音时长驱动每帧停留**：逐字念 223.7s → 无废话修剪 147.8s
- OpenScreen（Windows Graphics Capture）实测：录制 33s + JSON 后期缩放/注解 + TTS 混音成片；但自带导出器的文字注解 schema 不兼容（黑块），最终用 ffmpeg drawtext 补完
- 渲染式不依赖桌面可见（锁屏/CI 可出片）；抓窗式能录真实鼠标但需解锁会话

**结论**：满足硬性 1–5 全部。是「Excel 操作演示 + 动手教程」的正确主干。

### B. HTML→视频类（Hyperframes）★★☆ 次选/补充

**实测证据**：`hyperframes@0.9.11` 渲染现有 `showcase/animation/index.html` 成功（10s/1920×1080/262KB，中文与布局正常），仅注入 4 个 data 属性；空白模板 300 帧 18.8s 出片。差距：交互页需自动播放脚本 + `window.__timelines` 可 seek 时间轴 + 时长/配音三步。

**结论**：现有 HTML 动画资产零改造上视频的最短路径；确定性规则（禁 `Math.random`/无限 repeat）与本仓动效规则一致。适合把「动画演示」快速补成视频，但**动手教程（交互练习+验收）它不管**——需与 A 组合。

### C. Remotion 系（官方 13 件套 / video-shotcraft / anything2explainer）★★ 适合讲解片

制作质量与镜头语言最强（150 镜头配方、多智能体 QC、YAML 视频规格），但要把 React 课程组件重写成 composition，且**同样不产出动手教程**。适合未来做营销/概念讲解片，不适合「真实 Excel 操作」主线。

### D. 动效配方类（remotion-video / motion-design-skill / iart motion-skills）★ 局部借用

spring 预设、SVG 描线、stagger 配方可校准 `demo-*` 动效质量；但只是"怎么做动画"，不含任务主干。

### E. 录屏反推/自动化类（microsoft/skill-recorder / cli-anything-openscreen）★ 辅助

能把操作录制反推为步骤 skill——适合沉淀"操作序列"素材，但产出是 skill/automation 不是教学视频。

### F. 讲解视频类（anything2explainer / video-talkcraft）★ 方法论借用

旁白 → 分镜 → 渲染 → 多智能体 QC 的流程可借鉴到「课程 → 解说词 → 出片」管线；但模板偏人像/口播。

## 四、结论：适配 Skill 画像（七条硬性特征）

**适合做「Excel 操作演示视频 + 动手教程」的 Skill 应该是「契约驱动的实机演示技能」**，具备：

1. **契约驱动**：LessonSpec/CourseConfig 单一事实源，一次生成视频 + 教程 + 展示登记
2. **真实引擎执行**：公式真写真算、结果回读（Univer / Handsontable+HyperFormula / OnlyOffice 任一）
3. **确定性可重放**：禁随机、有限循环、时间轴可 seek，同一课可反复出片
4. **文字-画面-配音同源同步**：guide 4 步文本同时驱动字幕、TTS、步骤高亮
5. **双产物输出**：mp4（无废话系列）+ 交互工作台（练习 + 验收校验）
6. **渲染引擎可替换**：录制式（默认）/ HTML 渲染式（Hyperframes）/ 真机录屏式（抓窗/hot），通过引擎抽象切换
7. **质检内建**：动效规则机器检查（anim-map/单步时长）、逐帧核对、验收清单 + verify 钩子

**现状对照**：本仓 `excel-tutorial-maker` + `excel-desktop-recorder` 已实现 1–5 与 7 的主体，6 已有 LibreOffice/COM/Playwright 三引擎 + TTS 双 provider；Hyperframes 实测可作为第四种渲染引擎接入。

## 五、选型决策树（新需求进来时怎么选）

```
新任务
 ├─ 需要「真实 Excel 操作 + 动手练习」？
 │   ├─ 是 → excel-desktop-recorder（渲染式默认）
 │   │        ├─ 需要真实鼠标轨迹？→ 会话解锁用抓窗式，锁屏用 hot 浏览器录屏
 │   │        ├─ 已有 HTML 动画要补视频？→ Hyperframes 渲染式（零改造）
 │   │        └─ 要配音？→ tts.mjs provider（edge 首选，sapi 离线兜底）
 │   └─ 只讲概念/宣传/讲解？
 │        ├─ 要镜头语言与转场 → Remotion 系（shotcraft/explainer）
 │        ├─ 要 HTML 动效成片 → Hyperframes
 │        └─ 只要微动效质量 → 动效配方类借用
 └─ 需要把操作沉淀为可复用步骤？→ skill-recorder 类辅助
```

## 六、当前差距与补齐清单

| 差距 | 影响 | 补齐 |
| --- | --- | --- |
| SKILL.md 体积超限（44.5K） | 触发即全量进上下文 | progressive disclosure 拆 references/ |
| 契约与脚本无一致性校验 | 文档漂移 | `--help` + check-skill-docs verify |
| skill scripts 零测试 | 改动无保护 | narrationText/排期/provider 参数单测 |
| Hyperframes 自动播放未接入 | HTML 动画需手工触发 | 注入自动播放脚本 + `__timelines` 时间轴 |
| 文字注解 schema 不兼容（OpenScreen） | 后期文字靠 ffmpeg 补 | 统一 drawtext/ass 渲染文字层 |

## 总结

- **主干**：契约驱动的实机演示技能（excel-tutorial-maker + excel-desktop-recorder）——真实性、双产物、可重放是硬需求，录制类是唯一满足的教学形态。
- **补充**：Hyperframes 把已有 HTML 动画资产零改造变视频，是成本最低的第四引擎；Remotion 系留给未来的营销/讲解片。
- **方法论**：先定契约（配置）再选引擎，文字/配音/画面同源同步；任何新 skill 想接管这条任务，必须先过「能力要求矩阵」的 6 条硬性项。
