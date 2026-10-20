# Generative UI / Interactive UI 在 EDU 教程场景的调研

> 对应 Issue: [#2](https://github.com/qdriven/tutorials-maker/issues/2)
> 调研日期:2026-10-20(stars 数据当日经 GitHub API 核实)

## 1. 概念界定

**Generative UI(Gen UI)**:LLM 的输出不是纯文本,而是**结构化的 UI 描述**(组件树/JSON/DSL),由前端运行时渲染成真实可交互的界面——卡片、表单、图表、仿真实验、slides。与之互补的 **Interactive UI** 泛指分步导览(tour)、可操作演示等交互模式,两者结合即是"AI 生成的交互式教学内容"。

技术路线分三层(2026 年业界共识是**栈式组合而非三选一**):

| 层 | 职责 | 代表 |
|---|---|---|
| 协议/传输层 | 流式 tool-call / data-stream 协议 | Vercel AI SDK、AG-UI、OpenUI 标准 |
| 渲染层 | 组件原语 + 动态组件挂载 | assistant-ui、json-render、tambo |
| 应用集成层 | agent 读写宿主应用状态、渲染 UI | CopilotKit |

## 2. EDU 场景的应用形态

1. **多 agent 交互课堂**——AI 老师/助教/同学多角色授课,场景化课件(自述 slides + 白板 + 自动判分 quiz + 交互仿真 + PBL 角色扮演)
2. **零代码交互课件生成**——从教材 PDF/PPT 直接生成可编辑的交互式课件(仿真实验、可操作图示)
3. **AI 学习工作台**——对话中直接渲染练习、图表、知识图谱、掌握度路径
4. **动态分步导览**——LLM 按学习者水平实时生成 tour 步骤,页面元素级引导(边做边学)
5. **agent 生成 slides**——coding agent 直接产出网页版幻灯片(与本项目 Slidev 路线同构)

## 3. Top GitHub 开源仓库盘点(核心交付物)

### 3.1 EDU 应用层(与本课题直接相关)

| 仓库 | Stars | 许可 | 定位 |
|---|---|---|---|
| [THU-MAIC/OpenMAIC](https://github.com/THU-MAIC/OpenMAIC) | **41.1k** | MIT ✅ | 清华开源多 agent 交互课堂:4 类场景(slides/quiz/交互仿真/PBL)、28+ 动作类型(白板/激光笔/聚光灯)、播放引擎、多 LLM 后端;清华 700+ 学生 2 年课堂验证;自带 `skills/openmaic/` 可接入 Claude Code 类 agent |
| [HKUDS/DeepTutor](https://github.com/HKUDS/DeepTutor) | **41.9k** | Apache-2.0 ✅ | 港大开源 AI 学习工作台:Chat/Solve/Deep Research/Visualize/Quiz/Mastery Path 六模式,记忆图谱,支持 Claude Code/Codex 作为 Partner |
| [THU-MAIC/MAIC-UI](https://github.com/THU-MAIC/MAIC-UI) | 179 | ⚠️ 无 LICENSE | 论文 [MAIC-UI](https://arxiv.org/html/2604.25806v1) 代码:PDF→交互课件,两阶段 generate-verify-optimize、Click-to-Locate 增量编辑(diff patch,10 秒内);高中 3 个月实测平均 +9.21 分。只读参考 |
| [Open-TutorAi/open-tutor-ai-CE](https://github.com/Open-TutorAi/open-tutor-ai-CE) | 111 | BSD-3 | 基于 OpenWebUI 的个性化学习平台(3D 头像多模态),偏研究 |
| [zarazhangrui/frontend-slides](https://github.com/zarazhangrui/frontend-slides) | **31.0k** | MIT ✅ | coding agent 用前端技能生成网页 slides——与本项目 Slidev 方案同赛道,可作为"教程 slide 层"的替代/参考 |

**结论:EDU × Gen UI 交叉赛道已被充分验证**——OpenMAIC 和 DeepTutor 双双 40k+ stars,均为 2026 年现象级开源项目,且都是 MIT/Apache 宽松许可,可自由复用。

### 3.2 框架/标准层

| 仓库 | Stars | 许可 | 定位 |
|---|---|---|---|
| [CopilotKit/CopilotKit](https://github.com/CopilotKit/CopilotKit) | 38.1k | MIT | 前端 agent 集成层 + AG-UI 协议(被微软 Agent Framework 采纳);generative UI 文档完善 |
| [vercel/ai](https://github.com/vercel/ai) | 27.4k | MIT 系 | AI SDK:`useChat`/`streamObject`/data-stream 协议,事实上的传输标准 |
| [vercel-labs/json-render](https://github.com/vercel-labs/json-render) | 18.7k | — | "The Generative UI framework":流式 JSON→受控组件树渲染 |
| [assistant-ui/assistant-ui](https://github.com/assistant-ui/assistant-ui) | 12.6k | MIT | React 聊天原语层,Gen UI via RSC,可挂 AI SDK runtime |
| [thesysdev/openui](https://github.com/thesysdev/openui) | 12.4k | — | Gen UI 开放标准(Thesys 主导,C1 API 的开源标准面) |
| [tambo-ai/tambo](https://github.com/tambo-ai/tambo) | 11.2k | — | React 的 Gen UI SDK |
| [miurla/morphic](https://github.com/miurla/morphic) | 9.2k | — | AI 搜索 + Gen UI 的参考应用 |
| [microsoft/TypeAgent](https://github.com/microsoft/TypeAgent) | 748 | MIT | 微软研究院样例:LLM→类型化 Action/Memory/Plan 的 agent 架构,含 UI agent 思路 |

### 3.3 交互导览层(教程 walkthrough 的执行层)

| 仓库 | Stars | 许可 | 定位 |
|---|---|---|---|
| [nilbuild/driver.js](https://github.com/nilbuild/driver.js) | 26.9k | MIT | tour 引擎:`waitForElement`/`advanceOnClick`/异步步骤/跨页 tour,API 天然适合 LLM 动态生成步骤 |
| [gilbarbara/react-joyride](https://github.com/gilbarbara/react-joyride) | 7.9k | MIT | React guided tours |

**空白点:检索未发现任何"LLM 动态生成 driver.js/react-joyride 步骤"的成熟开源项目**——即"AI 实时编排页面级交互导览"仍是无主之地。

### 3.4 商业闭源参考(不可复用,做对标)

- **Thesys C1**:Gen UI API 公司(OpenUI 标准背后),托管服务
- **Khanmigo**(Khan Academy)、**Socratic**(Google):AI 辅导产品形态参照

## 4. 可行性分析:与 tutorials-maker 的结合

Gen UI 与本项目(Issue #1 定案的 `tutorial.md → 拍摄引擎 → 成片` 流水线)**不是两条赛道,而是上下游**:

```
tutorial.md(单一源)
   ├─→ 路线A:录制引擎(agentic-recorder)→ 教程视频 + 图文版   ← Issue #1
   └─→ 路线B:Gen UI 课件化(OpenMAIC 场景 / frontend-slides)→ 交互式教程页面
```

具体结合点:

1. **Gen UI 课件 = 更高级的录制素材**:交互式课件(仿真、quiz)本身是网页,可直接喂给 Issue #1 的拍摄引擎录成视频——"先做成交互课件,再录成视频"比"直接录屏"画质与节奏更可控
2. **frontend-slides(31k,MIT)是 Slidev 的强力对照**:coding agent 生成网页 slides 已被验证有巨大需求,`tutorial.md` 的 slide 段可双渲染(Slidev 或 frontend-slides)
3. **MAIC-UI 的两个机制值得移植**:两阶段 generate-verify-optimize(生成课件后先验证再交付,对应我们的"排练→正式录制")和 Click-to-Locate 增量编辑(diff patch,10 秒内完成局部修改——对教程迭代极有价值)
4. **driver.js + LLM 是可独占的空白**:tutorial.md 的 `<!-- exec: browser -->` 段落可编译成 driver.js tour,学习者端是交互导览、录制端自动播放——"同一份教程源,既是视频又是交互页面"
5. **AG-UI / OpenUI 标准是协议保险层**:若 tutorials-maker 未来要做"AI 助手在教程页面里实时答疑",接 AG-UI 可同时兼容 CopilotKit 和微软 Agent Framework 生态

**风险与限制**:OpenMAIC 体量大(全栈课堂系统),只宜借鉴场景设计而非整体依赖;MAIC-UI 无 LICENSE,代码只读不抄;Thesys C1 为闭源托管,协议锁定风险。

## 5. 结论

- **有 Top 仓库,且赛道已被验证**:EDU × Gen UI 的头部是 OpenMAIC(41.1k,MIT)与 DeepTutor(41.9k,Apache-2.0),框架层是 CopilotKit / AI SDK / json-render / OpenUI 标准
- **对本项目最有价值的三个**:OpenMAIC(场景设计参照)、frontend-slides(slide 层平替)、driver.js(交互导览执行层,LLM 编排步骤是空白)
- **建议定位**:tutorials-maker 的 `tutorial.md` 作为单一源,同时产出**视频教程**(Issue #1 路线)与**交互式教程页面**(Gen UI 路线),后者用 driver.js 编排 + agentic 拍摄引擎复用

## 6. 参考链接

- OpenMAIC: <https://github.com/THU-MAIC/OpenMAIC>(官网 <https://open.maic.chat>)
- MAIC-UI 论文: <https://arxiv.org/html/2604.25806v1>(代码 <https://github.com/THU-MAIC/MAIC-UI>)
- DeepTutor: <https://github.com/HKUDS/DeepTutor>
- frontend-slides: <https://github.com/zarazhangrui/frontend-slides>
- CopilotKit Generative UI: <https://docs.copilotkit.ai/generative-ui>
- Vercel AI SDK: <https://github.com/vercel/ai>
- json-render: <https://github.com/vercel-labs/json-render>
- assistant-ui: <https://github.com/assistant-ui/assistant-ui>
- OpenUI 标准: <https://www.openui.com> / <https://github.com/thesysdev/openui>
- tambo: <https://github.com/tambo-ai/tambo>
- TypeAgent: <https://github.com/microsoft/TypeAgent>
- driver.js: <https://driverjs.com>(repo <https://github.com/nilbuild/driver.js>)
- react-joyride: <https://github.com/gilbarbara/react-joyride>
- Open TutorAI: <https://github.com/Open-TutorAi/open-tutor-ai-CE>(论文 <https://arxiv.org/html/2602.07176v1>)
- Thesys C1: <https://www.thesys.dev>
- 框架分层对比: <https://dreaming.press/posts/copilotkit-vs-assistant-ui-vs-vercel-ai-sdk.md>
- Magentic-UI(微软人本 web agent): <https://www.microsoft.com/en-us/research/blog/magentic-ui-an-experimental-human-centered-web-agent/>
