# 动画制作 GitHub 全生态地图（2026-11-05 核验）

> 针对「把 Excel 教程做成动画 / 程序化视频」这一任务，系统调研制作这类动画的 GitHub 仓库生态。7 个方向、45 个去重仓库 + 5 个补漏仓库，全部经 GitHub API / 仓库页逐仓核验存在性；Star、许可、活跃度为 2026-11-05 快照。本文是全生态地图，选型结论见 [remotion-hyperframes-top10.md](remotion-hyperframes-top10.md)。

## 调研缘起与关键词澄清

用户点名的几个关键词先做映射：

| 关键词 | 实际对应 | 结论 |
| --- | --- | --- |
| **hyperframes** | [heygen-com/hyperframes](https://github.com/heygen-com/hyperframes) | HeyGen 官方开源框架：纯 HTML/CSS + 暂停的 GSAP 时间线 → 确定性逐帧渲染 MP4；~79k★，Apache-2.0 |
| **html-to-videos** | 无同名仓库 | 实际是「HTML→视频 / 程序化视频」赛道：HyperFrames、Remotion、nexu-io/html-video、Revideo、Motion Canvas 等 |
| **match edu** | 无此仓库 | 字面搜索只找到 [dssg/match.edu](https://github.com/dssg/match.edu)（2013 年教育数据科学项目，19★，零动画）；应理解为 **math edu（数学教育）**，对应 Manim 生态 |
| **1b3b** | 应为 **3b1b**（3Blue1Brown） | [3b1b/manim](https://github.com/3b1b/manim)（ManimGL）~96k★，MIT |

调研方法：WebSearch 中英文多组关键词 + 逐仓 WebFetch 打开 GitHub 仓库页 / raw README / GitHub API 交叉核对；star 与许可取自 API 当日快照；无法核实的字段标注「未核实」。分 7 路并行检索后去重，再逐仓核验元数据，最后做完整性批判补漏。

## 一、七个方向 · 45 个仓库总览

### A. HyperFrames / HTML→MP4（与本项目最相关）

| 仓库 | Stars | 许可 | 要点 |
| --- | --- | --- | --- |
| **heygen-com/hyperframes** | ~79k | Apache-2.0 | 合成=HTML；`data-composition-id/data-start/data-duration` 声明时间轴；`gsap.timeline({paused:true})` 注册到 `window.__timelines`，渲染器逐帧 seek + CDP 截图 + FFmpeg 编码。支持 GSAP/CSS animations/Anime.js/Lottie/Three.js/WAAPI/TypeGPU；提供 lint/check/preview/render CLI 与 9 个 agent skill |
| heygen-com/hyperframes-launches | 655 | Apache-2.0 | 官方 20 个发布视频的 composition 源码，可当模板库 |
| heygen-com/hyperframes-community-skills | 250 | Apache-2.0 | 社区 8 个技能（3D 字幕、day-in-my-life 等） |
| nexu-io/html-video | 4.8k | Apache-2.0 | HyperFrames 之上的 agent 编排层：prompt/文章/仓库 → 分镜 → 逐帧 HTML → HyperFrames → MP4；版本锁 hyperframes ^0.4.0，代码活跃度偏低 |
| remotion-dev/remotion | 70.8k | **自定义双层许可**（≤3 人公司免费，超过需付费） | React 组件即帧的纯函数，生态最成熟、模板/生产历史最多；需 React 重写 |
| motion-canvas/motion-canvas | 19.7k | MIT | TS generator 编程矢量动画 + 实时编辑器；发布停滞（最后提交 2026-07） |
| midrender/revideo（原 redotvideo） | 4.2k | MIT | Motion Canvas fork：去编辑器、加 headless 渲染与音频 |
| mifi/editly | 5.6k | MIT | 声明式 JSON 剪辑（转场/字幕/配乐/多轨拼接），不渲染 HTML |
| tungs/timecut | 655 | BSD-3 | 虚拟时钟截图早期范式；**README 明确警告纯 CSS animations/transitions 不可靠**，已停更 |
| ffmpegwasm/ffmpeg.wasm | 18k | MIT（包装层） | 浏览器内编码/转码，适合最终封装 |

### B. 数学 / 教育解释动画（Manim 生态）

| 仓库 | Stars | 许可 | 要点 |
| --- | --- | --- | --- |
| **3b1b/manim**（ManimGL） | ~96k | MIT | 3Blue1Brown 原版：Python 场景类 + OpenGL 渲染，LaTeX/3D/相机能力强 |
| **ManimCommunity/manim**（ManimCE） | 42.3k | MIT | 社区版，文档/测试更完善，v0.22.1（2026-10-27），推荐新手使用 |
| 3b1b/videos | 11.5k | **CC BY-NC-SA 4.0**（非商用） | 3b1b 视频场景源码，可学习组织方式，不可商用 |
| maloyan/manim-web | 511 | MIT | TypeScript 重实现、浏览器直接运行 Manim，KaTeX/Typst，声称覆盖 ManimCE 0.22 全部可行 API |
| academa-labs/manimgx | 2.5k | MIT（含 x264 的 wheel 为 GPL） | 面向 Agent 的数学/3D 引擎：ManimCE 兼容 API，Rust+wgpu 渲染，pip/npm 安装 |
| HarleyCoops/Math-To-Manim | 2.8k | MIT | 多智能体流水线：论述 → 分镜 → Manim 场景 → 渲染帧检查，含 CLI + MCP server |
| edu-ai-builders/math-viz-kit | 90 | 未声明 | 中文单文件 HTML 数学可视化工具集 + `/数学可视化` skill，已停滞 |
| ManimCommunity/awesome-manim | 546 | 未声明 | 106 位 Manim 创作者目录 |

### C. Agent 动画技能与 AI 动效工具

| 仓库 | Stars | 许可 | 要点 |
| --- | --- | --- | --- |
| **greensock/gsap-skills** | 17.9k | MIT | GSAP 官方 8 个技能（core/timeline/scrolltrigger/plugins/react/performance…），纯 HTML/GSAP 栈最直接可用 |
| **LottieFiles/motion-design-skill** | 2.8k | MIT | 通用动效设计技能：8 步检查清单、4 种动效人格、时长/缓动表、迪士尼 12 原则 |
| remotion-dev/skills | 6.4k | **无 LICENSE 文件** | 13 个技能（best-practices/create/studio/render/captions…），商用需评估 Remotion 许可 |
| Vincentwei1021/video-shotcraft | 17k | Apache-2.0 | 电影感产品宣传片技能：三模式 + 八阶段流水线 + 独立终检 |
| zhuyansen/awesome-claude-video-skills | 1.6k | CC0 | 419 个 agent 可运行视频仓库目录（Explainers 75 个），逐仓库安全分级 |
| vercel-labs/skills | 38.1k | MIT | skills.sh 官方 CLI：`npx skills add/find/list/check`，SKILL.md 安装的事实标准 |
| abhiemj/manim-mcp-server | 656 | MIT | Manim 的 MCP 薄封装，2025-05 后未更新 |
| alchaincyf/huashu-art-motion | 6.3k | MIT | 中文技能：JSON spec 驱动 8 段解说动画 + 9 种解说语法（含 3Blue1Brown 风格），Playwright+ffmpeg |
| lemomo-ai/lemo-opuscar | 12.3k | MIT | Claude Code 插件：66 种「用代码拍电影」风格，STYLE.md 分层可作风格库范本 |
| wwwzhouhui/in_animation | 94 | README 称 MIT 但无 LICENSE 文件 | **唯一直接命中「LLM→GSAP+HTML5 教学动画→MP4/GIF」的开源实现**（FastAPI+SSE+Playwright+FFmpeg），过于早期 |
| anthropics/skills | 187.5k | — | SKILL.md 规范与示例（含 slack-gif-creator 帧合成），技能封装底座 |

### D. 前端动效基础库

| 仓库 | Stars | 许可 | 要点 |
| --- | --- | --- | --- |
| **greensock/GSAP** | 30.2k | 自定义「No Charge」许可（非 MIT，商业免费但保留限制） | 时间线模型最成熟，`timeline.seek` 对逐帧渲染最友好 |
| **juliangarnier/anime** | 74.3k | MIT | v4 ESM，`seek(毫秒)+autoplay:false`，逐帧友好度仅次于 GSAP |
| motiondivision/motion | 34.9k | MIT | 原 Framer Motion，声明式/手势/布局/弹簧动画 |
| theatre-js/theatre | 12.9k | Apache-2.0（studio 为 AGPL） | 可视化编排时间线，但公开仓 2024-08 后停更（开发转私有） |
| airbnb/lottie-web | 32.4k | MIT | After Effects JSON 矢量动画，`goToAndStop` 按帧 |
| LottieFiles/dotlottie-web | 938 | MIT | Rust+WASM 播放器，`setFrame`，状态机 |
| rive-app/rive-react | 1.2k | MIT | 交互式状态机动画；**状态机不可 seek**，不适合逐帧导出 |
| swup/swup | 5.3k | MIT | 页面过渡库，可选 View Transitions API（原 WICG explainer 仓已归档） |
| animate-css/animate.css（补漏） | 83k | MIT | 最广为人知的纯 CSS keyframes 库，内置 reduced-motion |
| mojs/mojs（补漏） | 18.9k | MIT | 声明式 motion graphics（Shape/Burst/Stagger） |
| spite/ccapture.js（补漏） | 3.8k | MIT | canvas 定帧捕获经典库（虚拟时钟），只适合 canvas 动画 |
| sergey-pimenov/awesome-web-animation（补漏） | 1.6k | — | Web 动画资源大全（SVG/JS/CSS/Canvas/滚动/视频） |

### E. 表格 / 数据 / Excel 动画（本项目直接领域）

| 仓库 | Stars | 许可 | 要点 |
| --- | --- | --- | --- |
| **dream-num/univer** | 22.9k | Apache-2.0 | Canvas 全栈 Office SDK，README 现定位「The Office Harness for AI Agents」，活跃维护 |
| handsontable/handsontable | 22.1k | 双许可（商业需付费） | 数据网格 + HyperFormula；官方 `afterChange + CSS @keyframes` 单元格闪烁 recipe 正是本仓 handsontable-excel 在用的方案 |
| d3/d3-transition | 226 | ISC | 选择集过渡/插值，数据动画底层 |
| vizzuhq/vizzu-lib | 2k | Apache-2.0 | 图表间连续 morph（C++/WASM），数据故事动画最强 |
| microsoft/SandDance | 7.2k | MIT | 单元可视化：每行数据→一个标记，切换视图平滑保持上下文 |
| Jannchie/Historical-ranking… | 4.6k | GPL-3.0 | D3 条形竞速动画（已停更） |
| SjoerdTilmans/sjvisualizer | 242 | MIT | pandas/Excel → 24 种动画图表 → mp4 |
| thomasp85/gganimate | 2k | MIT | R/ggplot2 动画图形语法 |

**关键结论：GitHub 上不存在专门做「Excel 教程动画」的开源仓库。** 生态只有三层——可编程表格引擎（Univer/Handsontable）、过渡叙事层（d3-transition/Vizzu/SandDance）、数据→视频层（sjvisualizer）。本项目在这个细分既没有直接竞品，也没有可抄的完整方案。

### F. 目录、awesome 列表与视频生成管线（方向 7 补充）

| 仓库 | Stars | 许可 | 要点 |
| --- | --- | --- | --- |
| nexu-io/html-video | 4.8k | Apache-2.0 | agent 元层：prompt/文章/仓库 → 内容图分镜 → 逐帧 HTML → HyperFrames → MP4；最该补的一环 |
| zhuyansen/awesome-claude-video-skills | 1.6k | CC0 | 419 个 agent 可运行视频仓库目录，每 8 小时刷新，兜底遗漏首选 |
| alchaincyf/huashu-art-motion | 6.3k | MIT | JSON spec 驱动 8 段解说动画 + 9 种解说语法，含 `qa.py` 与 `film_gate.py` 反 PPT 门禁 |
| lemomo-ai/lemo-opuscar | 12.3k | MIT | 66 种代码电影风格库；canvas/WebGL 渲染，非 HTML/CSS |
| wwwzhouhui/in_animation | 94 | 未声明 | 唯一「LLM→GSAP+HTML5 教学动画→MP4/GIF」实现，早期项目 |
| heygen-com/hyperframes | ~79k | Apache-2.0 | 锚点，不重复列入 |

## 二、关键分析与洞察

1. **HyperFrames 与本项目架构几乎同构，是最值得先做视频导出 PoC 的**。现有资产已经是「HTML/CSS keyframes + 暂停时间线 + JSON 清单」，只差三样：给场景补 `data-composition-id/data-start/data-duration`、把时间线注册到 `window.__timelines`、满足确定性契约（禁 `Date.now`/rAF/未播种随机/无限 repeat/渲染中 fetch）。之后 `npx hyperframes lint/check/render` 即可导出 MP4；批量用 `--batch --variables`，云端再用 Lambda。既有实测见 [remotion-hyperframes-top10.md](remotion-hyperframes-top10.md) 的「实测记录」。

2. **纯 CSS keyframes 转视频的历史坑已被验证**：timecut 明确不支持 CSS animations；ccapture.js 只捕 canvas；puppeteer-screen-recorder 是实时 screencast（不确定、丢帧）。确定性导出的可行路线只有三条：HyperFrames 的 CSS/GSAP adapter seek、GSAP `timeline.seek`、WAAPI 暂停后按帧 seek。现有 `demo-*` 7s infinite 循环上视频前必须改成有限时长 + 可 seek。

3. **Agent 技能生态已经成型且标准化**：skills.sh CLI（`npx skills add`）+ SKILL.md 契约是事实标准。GSAP 官方 `gsap-skills`、LottieFiles `motion-design-skill`、HyperFrames 的 9 个 skill 值得直接安装试用；本仓 `excel-tutorial-maker` 的 SKILL.md 已是同一范式，补齐「导出视频」一节即可对齐生态。

4. **Manim 生态的启示**：声明式场景（Scene/play/Transform）与我们的 JSON 清单本质相同，但渲染层不可复用（Python/LaTeX/FFmpeg vs DOM/合成器）。新一代 agent 向引擎（manimgx 的 ManimCE 兼容 API、manim-web 的浏览器运行、Math-To-Manim 的多智能体分镜）值得跟踪；对 Excel 教程而言 LaTeX 能力不是核心，**借鉴的是「分镜 → 场景 → 渲染帧检查」的验收流水线**。

5. **数据动画可直接借用的两个思想**：Vizzu 的图表状态 morph（同一份数据在柱/线/散点之间连续变形）和 SandDance 的「每行数据一个标记」单元可视化——都可嫁接进 Excel 图表课的动画层。

## 三、落地建议（按优先级）

1. **HyperFrames PoC（1-2 天）**：先拿 showcase 的一个 CSS 循环场景改造成 composition，验证 `lint → preview → render` 帧一致性；通过后再批量改造清单。参考官方 `hyperframes-launches` 的 20 个真实 composition。
2. **安装三个技能试跑**：`npx skills add heygen-com/hyperframes`、`npx skills add greensock/gsap-skills`、`npx skills add LottieFiles/motion-design-skill`，对比它们对「动画工作流 + 验收清单」的写法，反哺本仓 SKILL.md 的导出章节。
3. **数据动画增强**：Excel 图表课引入 Vizzu 式 morph 或 d3-transition 作为「图表切换」的教学动画；单元格动画继续沿用 Handsontable 官方 afterChange + flash recipe（已在用）。
4. **避开三个坑**：Remotion 的许可（>3 人公司需付费）、GSAP 非 MIT（商业免费但有限制，要 OSI 许可选 anime.js）、`remotion-dev/skills` 无 LICENSE 文件。

## 四、核验说明

- 全部 star/许可/活跃度取自 2026-11-05 GitHub API 快照；渲染机制等细节来自仓库 README/docs 原文；第三方评测中未能打开原文的数字已标注「未核实」。
- 45 个仓库全部核验存在；补漏阶段另核实 5 个（animate.css、anthropics/skills、mojs、ccapture.js、awesome-web-animation），未发现幽灵仓库。
- 字面搜索 `match-edu` / `match edu` 无数学动画仓库；`1b3b` 无同名仓库，按 `3b1b` 理解。

## 五、来源链接

- HyperFrames 系：[heygen-com/hyperframes](https://github.com/heygen-com/hyperframes) · [hyperframes-launches](https://github.com/heygen-com/hyperframes-launches) · [hyperframes-community-skills](https://github.com/heygen-com/hyperframes-community-skills)
- HTML→视频：[nexu-io/html-video](https://github.com/nexu-io/html-video) · [remotion-dev/remotion](https://github.com/remotion-dev/remotion) · [midrender/revideo](https://github.com/midrender/revideo) · [motion-canvas/motion-canvas](https://github.com/motion-canvas/motion-canvas) · [mifi/editly](https://github.com/mifi/editly) · [tungs/timecut](https://github.com/tungs/timecut) · [ffmpeg.wasm](https://github.com/ffmpegwasm/ffmpeg.wasm)
- Manim 生态：[3b1b/manim](https://github.com/3b1b/manim) · [ManimCommunity/manim](https://github.com/ManimCommunity/manim) · [3b1b/videos](https://github.com/3b1b/videos) · [maloyan/manim-web](https://github.com/maloyan/manim-web) · [academa-labs/manimgx](https://github.com/academa-labs/manimgx) · [HarleyCoops/Math-To-Manim](https://github.com/HarleyCoops/Math-To-Manim) · [awesome-manim](https://github.com/ManimCommunity/awesome-manim) · [dssg/match.edu](https://github.com/dssg/match.edu)
- Agent 技能：[greensock/gsap-skills](https://github.com/greensock/gsap-skills) · [LottieFiles/motion-design-skill](https://github.com/LottieFiles/motion-design-skill) · [remotion-dev/skills](https://github.com/remotion-dev/skills) · [video-shotcraft](https://github.com/Vincentwei1021/video-shotcraft) · [awesome-claude-video-skills](https://github.com/zhuyansen/awesome-claude-video-skills) · [vercel-labs/skills](https://github.com/vercel-labs/skills) · [anthropics/skills](https://github.com/anthropics/skills) · [huashu-art-motion](https://github.com/alchaincyf/huashu-art-motion) · [lemo-opuscar](https://github.com/lemomo-ai/lemo-opuscar) · [in_animation](https://github.com/wwwzhouhui/in_animation)
- 动效库：[greensock/GSAP](https://github.com/greensock/GSAP) · [anime.js](https://github.com/juliangarnier/anime) · [motiondivision/motion](https://github.com/motiondivision/motion) · [Theatre.js](https://github.com/theatre-js/theatre) · [lottie-web](https://github.com/airbnb/lottie-web) · [dotlottie-web](https://github.com/LottieFiles/dotlottie-web) · [rive-react](https://github.com/rive-app/rive-react) · [swup](https://github.com/swup/swup) · [animate.css](https://github.com/animate-css/animate.css) · [mojs](https://github.com/mojs/mojs) · [ccapture.js](https://github.com/spite/ccapture.js) · [awesome-web-animation](https://github.com/sergey-pimenov/awesome-web-animation)
- 表格/数据动画：[dream-num/univer](https://github.com/dream-num/univer) · [handsontable](https://github.com/handsontable/handsontable) · [d3-transition](https://github.com/d3/d3-transition) · [vizzu-lib](https://github.com/vizzuhq/vizzu-lib) · [SandDance](https://github.com/microsoft/SandDance) · [bar-chart-race](https://github.com/Jannchie/Historical-ranking-data-visualization-based-on-d3.js) · [sjvisualizer](https://github.com/SjoerdTilmans/sjvisualizer) · [gganimate](https://github.com/thomasp85/gganimate)

## 总结

- **最贴合现有资产**：HyperFrames——HTML 即视频，现有 CSS/GSAP 动画零改造即可上渲染管线。
- **Agent 技能首选**：gsap-skills、motion-design-skill、hyperframes 自带 skills；用 skills.sh 统一安装。
- **教育动画借鉴**：Manim 系的「分镜 → 场景 → 渲染帧检查」流水线；不引入其 Python 渲染栈。
- **数据动画借鉴**：Vizzu 的 morph 与 SandDance 的单元可视化；Excel 细分没有现成竞品。
