# Remotion / Hyperframes 系 Agent Skill Top 10（2026-11 核验）

> 针对"把 Excel 教程做成程序化视频"这一任务，调研 Remotion 与 Hyperframes 两条技术路线的可用 Agent Skill（SKILL.md 形态）。条目均在 GitHub API / 官方文档层面核验过存在性；安装命令以各仓库当前文档为准。

## 调研范围与方法

- 两条路线：**Remotion**（React 组件即帧，`npx remotion render`）与 **Hyperframes**（HTML + CSS + GSAP 时间轴，无头 Chrome 逐帧捕获 → FFmpeg 出片）。
- 核验方式：`gh api repos/<owner>/<repo>/contents` 查实际目录与 skill 清单；Star / 许可数为 2026-11-04 快照。
- 筛选标准：能给"课程配置 → 讲解视频"这条管线提供**确定性渲染、时间轴控制、字幕/配音、质检**之一。

## Top 10 清单

| # | Skill | 仓库 / 来源 | 类型 | 提供什么 | 安装 | 对 Excel 课任务的适配度 |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Hyperframes | [heygen-com/hyperframes](https://github.com/heygen-com/hyperframes)（78.6K★，Apache-2.0） | HTML→视频框架 + 9 个 skill | HTML 即视频：`data-start`/`data-duration` 标注剪辑，GSAP 时间轴，确定性逐帧渲染；skills 含 `hyperframes`、`hyperframes-cli`、`slideshow`、`media-use`、`remotion-to-hyperframes`、`reverse-any-video`、`style-sampling`、`figma`、`hyperframes-registry` | 仓库 skills/ 或 `hermes skills install official/creative/hyperframes` | ★★★ 最高——现有动画课是纯 HTML，几乎零改造 |
| 2 | Remotion 官方 skills | [remotion-dev/skills](https://github.com/remotion-dev/skills)（官方 13 件套） | 官方 skill 集 | `best-practices`（伞）/`create`/`markup`/`render`/`captions`/`studio`/`docs`/`interactivity`/`maps`/`multimedia`/`saas`/`license`/`upgrade` | `npx skills add remotion-dev/skills` | ★★ Remotion 路线基础设施 |
| 3 | anim-map | Hyperframes 伴生工具 | 动画质检 | 输出 `animation-map.json`：逐 tween 摘要、ASCII 甘特、stagger 检测、死区/撞车/离屏标记 | 随 Hyperframes | ★★★ 对齐"单步 ≤1.2s、无死区"动效规则 |
| 4 | video-shotcraft | [Vincentwei1021/video-shotcraft](https://github.com/Vincentwei1021/video-shotcraft) | 产品宣传片 skill | 真实页面截图 → 150 镜头配方 → Remotion 动画成片 → 剪辑/音效/逐帧质检 | `npx skills add Vincentwei1021/video-shotcraft` | ★★ 镜头语言参考 |
| 5 | anything2explainer | [Vincentwei1021/anything2explainer](https://github.com/Vincentwei1021/anything2explainer) | 讲解视频 skill | 主题 → 调研 → 旁白 → 分镜 → Remotion 渲染 → 多智能体 QC | 同上 | ★★ 流程最接近"课程→讲解视频" |
| 6 | remotion-video | [SkillMD · thatrebeccarae](https://skillmd.com) | 社区配方 | spring 预设、插值（镜头推拉/视差）、SVG 描线、`TransitionSeries`、图表动画、音画同步、渲染配置 | `npx skillmds add thatrebeccarae/remotion-video` | ★★ 配方库 |
| 7 | remotion-video-production | [SkillMD.ai](https://skillmd.ai) | 生产管线 | YAML 视频规格（受众/时长/比例/语气/配音）+ Hook/Problem/Solution 分镜模板 + 校验闸门 | SkillMD 安装 | ★★ "课程配置 → 视频规格"中间层 |
| 8 | video-talkcraft | [Vincentwei1021/video-talkcraft](https://github.com/Vincentwei1021/video-talkcraft) | 口播视频 skill | 人像 + TTS + 字幕的讲解视频 | 仓库 | ★ 无真人出镜需求 |
| 9 | motion-video-kit | [echris6/motion-video-kit](https://github.com/echris6/motion-video-kit) | 商业视频 skill | 商业成片模板与节奏 | 仓库 | ★ 偏营销 |
| 10 | motion-skills | [iart-ai/motion-skills](https://github.com/iart-ai/motion-skills) | 50 skills 合集 | kinetic typography / data-viz / explainers / Manim 等 14 个可装包 | 仓库 | ★ 数据可视化讲解参考 |

## 关键结论

1. **Hyperframes 比 Remotion 更贴合现有资产**：`src/standalone/public/showcase/animation/index.html`、`themes/*.html`、`lesson.js` 已是 HTML + CSS + GSAP；Hyperframes 的模型就是"HTML 即视频"，用 `data-*` 标注剪辑，无需把 React 课程组件重写成 Remotion composition。
2. **确定性规则两边一致且必须遵守**：禁 `Math.random()` / `Date.now()` / `setInterval` / 无限 `repeat:-1`；时间轴 `paused:true` 注册、渲染器逐帧 seek。现有 `demo-*` 7 秒无限循环动画上视频前必须改成有限次或单次。
3. **配音可复用现有 provider**：Hyperframes CLI 自带 media/TTS/beats 工具，但本仓库的 `tts.mjs`（sapi / edge）与"语音时长驱动节奏"机制可以保持不变——把 Hyperframes 当作 recorder 的**第三种渲染引擎**（与 libreoffice / excel / wps / hot 并列）。
4. **落地顺序建议**：装 Hyperframes → 用现有 `showcase/animation/index.html` 跑通 30 秒样片 → 与 LibreOffice 渲染式对比画质/成本 → 决定是否接入 `excel-desktop-recorder`。

## 实测记录（2026-11-04，本机）

环境：Node 24.15、`npx hyperframes@0.9.11`、ffmpeg（chocolatey）。

1. **工具链**：`hyperframes init hf-demo --example blank --non-interactive --skip-skills` → `npm run render` 成功，10s/300 帧/1920×1080，screenshot capture + 硬件 GPU，18.8s 出片。
2. **现有资产直接渲染**：把 `src/standalone/public/showcase/animation/index.html` 复制为 composition，仅在 `<body>` 注入 `data-composition-id/start/duration/width/height` 后 `npm run render` 成功——10s/262KB，抽帧确认中文、表格布局、主题配色全部正常。**现有 HTML 动画资产零改造即可上 Hyperframes。**
3. **当前局限**：原页面是交互演示（点击「生成图表」才播放），静态渲染只能拍到首屏；要出教学视频还差三步——① 注入自动播放脚本（按时间轴触发各模块按钮/滚动）② 注册 `window.__timelines` 的 paused GSAP 时间轴保证可 seek ③ 加 `data-duration` 与配音/字幕。这三步正是 `/hyperframes` 技能契约覆盖的内容。

## 未核验 / 谨慎项

- Remotion v4.0+ 的 WebMCP Studio 工具目前仅 Codex 支持，属于进行中方向，不作为选型依据。
- 社区 skill（#6/#7）的安装命令以 SkillMD 页面当前说明为准，未逐条执行验证。
- Hyperframes 的 21 个 skill 说法来自第三方评测，GitHub 仓库 `skills/` 目录实际可见 9 个；以仓库为准。

## 总结

- **首选 Hyperframes**：HTML 资产可直接复用，确定性渲染满足录制替代需求；配套 `anim-map` 可做动效质检。
- **Remotion 适合新制作**：若未来要做营销片/讲解片而非"真实表格操作"，官方 13 件套 + anything2explainer 的流程更成熟。
- **两者都可挂进 recorder 的引擎抽象**：渲染层可替换，课程配置、TTS provider、清单登记三件基础设施不变。
