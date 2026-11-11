# 桌面录屏 / Excel 实机操作类开源 SKILL 调研（Top 10）

> 调研时间：2026-11-04。所有条目的仓库存在性、Star 数、许可证、平台均通过 GitHub API 逐条核验，非二手资料。

## 结论先行

**这个需求可以用 SKILL 完成，但没有任何现成 SKILL 能直接满足。** 现有生态分三类，各缺一块：

| 类别 | 代表 | 能做 | 缺什么 |
|---|---|---|---|
| 录屏→技能（反向） | microsoft/skill-recorder | 录下操作，反推成 SKILL.md | 方向相反；它不驱动 Excel，也不产视频 |
| 桌面自动化（正向） | microsoft/UFO、naturo、pywinauto | 驱动真实应用做操作 | 不录屏、不出片 |
| 录屏工具（管道） | dsh-recorder、control-your-capture | 抓屏存 mp4 | 不理解 Excel 语义，不会"做操作" |

**缺的正是"中间层"**：把一份结构化课程内容翻译成真实表格操作序列，并让录屏与操作严格同步。本仓库新建的 `skill/excel-desktop-recorder/` 补的就是这一层，并且已在本机跑通出片。

## Top 10 清单

### 1. microsoft/skill-recorder — 录屏反推技能

| | |
|---|---|
| 仓库 | https://github.com/microsoft/skill-recorder |
| Star / Fork | 5,677 / 649 |
| 许可证 | MIT |
| 技术栈 | Electron + React 19 + TypeScript |
| 平台 | macOS 优先，Windows 11（x64/ARM64）部分支持 |

录制你的屏幕操作 → 交给 GitHub Copilot 分析 → 生成可复用的 `SKILL.md` 或 Automation。四步：Record → Control（可开语音旁白，本地 Whisper）→ Analyze（Copilot 重构为"意图 + 有序步骤"）→ Create。

**设计亮点**：生成的技能优先使用 agent 的原生工具（如 `gh` CLI、`web_fetch`）而非回放 UI 点击，所以能泛化到同类任务，而不是死抠像素。

**对本需求的价值**：它的"录屏 → 语义化步骤"思路值得借鉴，但**方向是反的**——它是先有人操作、再推导技能；我们要的是"先有课程内容、再驱动操作"。而且它锁定 Copilot，产出是 SKILL.md 不是视频。

**硬伤**：Analyze 阶段截图要上传云端，敏感数据需评估；Windows 支持是"部分"。

---

### 2. microsoft/UFO — Windows 桌面 GUI 代理

| | |
|---|---|
| 仓库 | https://github.com/microsoft/UFO |
| Star / Fork | 10,170 / 1,083 |
| 许可证 | MIT |
| 技术栈 | Python + pywinauto |
| 平台 | Windows |

UFO³ 的多应用桌面代理框架，用 Appium/pywinauto 抽象 Windows GUI，支持跨应用协同（Excel ↔ 浏览器 ↔ 文件管理器）。

**对本需求的价值**：它是**微软官方、Star 数最高**的 Windows 桌面自动化基座，架构（App 抽象层 + 任务分解 + 执行）可以直接借鉴。

**硬伤**：它是"让 agent 自己想办法操作"，不产出视频；且要跑起来需要模型服务，不是开箱即用的 SKILL。

---

### 3. microsoft/cua_skill — 技能库驱动的 GUI 代理

| | |
|---|---|
| 仓库 | https://github.com/microsoft/cua_skill |
| Star / Fork | 51 / 6 |
| 许可证 | MIT |
| 技术栈 | Python + UI-TARS 视觉定位 |
| 平台 | Windows（17+ 应用） |

两种模式：**Replay Agent**（执行预录的动作图）和 **RAG Agent**（LLM 规划 + BM25/语义混合检索，从技能库里挑技能）。核心洞察：很多桌面任务共享相同动作模式，索引成可复用技能后靠组合而非试错完成。

**对本需求的价值**："**预录动作序列 + 检索复用**"正是 RecorderPlan 的思路——我们的计划就是一份预录动作序列。而且它自带 `user_task_generation/`（合成任务）和 WindowsAgentArena 评测。

**硬伤**：需要 Azure OpenAI / 本地 Qwen 等模型服务；动作库是针对它自己的任务合成的，不是任意课程内容。

---

### 4. haris-musa/excel-mcp-server — Excel 专项 MCP

| | |
|---|---|
| 仓库 | https://github.com/haris-musa/excel-mcp-server |
| Star / Fork | 4,275 / 480 |
| 许可证 | MIT |
| 技术栈 | Python + openpyxl |
| 平台 | 跨平台（**不需要装 Excel**） |

让 Claude / Cursor / Codex 创建和编辑 xlsx，支持图表、数据透视表、切片器、公式。

**对本需求的价值**：这是 Excel 自动化方向**最成熟、社区最大**的项目。它的公式/透视表/图表 API 可以直接借鉴。

**硬伤**：它**不开 Excel、不渲染界面、不录屏**，产物是文件不是视频。而且它绕开了真实 Excel 引擎，公式兼容性靠自己实现。

---

### 5. AcePeak/naturo — 多框架识别的桌面自动化引擎

| | |
|---|---|
| 仓库 | https://github.com/AcePeak/naturo |
| Star / Fork | 10 / 8 |
| 许可证 | MIT |
| 技术栈 | Python + C++ 原生核心 |
| 平台 | Windows（macOS 开发中） |

UIA + MSAA/IA2 + Java Access Bridge + Electron/CDP + 视觉融合的级联识别，自带 MCP server。

**对本需求的价值**：**明确支持 WPS 和中国桌面应用**（钉钉 / 飞书 / 企业微信 / 同花顺 / WPS），有专门的 `docs/CJK_COVERAGE.md`；还提供"用 naturo 自动化 Excel"的教程（走 Excel COM 接口读写单元格、插图表）。这是最贴近"WPS 上做 Excel 操作"的开源方案。

**硬伤**：Star 数少（10），项目很新（2026-03 创建），成熟度存疑；依然不录屏。

---

### 6. aloth/PowerSkills — PowerShell 工具集

| | |
|---|---|
| 仓库 | https://github.com/aloth/PowerSkills |
| Star / Fork | 48 / 11 |
| 许可证 | MIT |
| 技术栈 | PowerShell |
| 平台 | Windows |

真正的 **SKILL.md 目录结构**：`skills/desktop`、`skills/browser`、`skills/outlook`、`skills/system`、`skills/workiq`。desktop 子技能做全屏/窗口截图、窗口列举与聚焦、按键投递、应用启动，全部返回结构化 JSON。

**对本需求的价值**：这是**最标准的"Agent Skill"形态参考**——一个仓库多个 SKILL.md 子技能，每个对应一类桌面能力。目录组织方式值得直接照搬。

**硬伤**：只提供原子能力（截图、按键），不负责编排与出片；PowerShell 限定 Windows。

---

### 7. screenpipe/screenpipe — 持续录屏与工作流挖掘

| | |
|---|---|
| 仓库 | https://github.com/screenpipe/screenpipe |
| Star / Fork | 22,230 / 2,267 |
| 许可证 | NOASSERTION（**非标准开源许可，需自行确认**） |
| 技术栈 | Rust |
| 平台 | 桌面端（macOS 为主） |

持续录屏 + 音频转写 + 视觉索引，产出可搜索的时间线和"值得自动化的工作"。

**对本需求的价值**：证明了"录屏即数据"的架构——录屏不只当交付物，还当 agent 的记忆与上下文来源。

**硬伤**：许可证不是标准 OSI 许可，商用需确认；平台偏 macOS；它是"录下来再分析"，不是"照着计划做"。

---

### 8. OpenAdaptAI/OpenAdapt — 演示即程序

| | |
|---|---|
| 仓库 | https://github.com/OpenAdaptAI/OpenAdapt |
| Star / Fork | 1,864 / 280 |
| 许可证 | MIT |
| 技术栈 | Python |
| 平台 | 桌面端 |

人或 agent 演示一遍任务 → 编译成本地可重复执行的程序，**每次保存都校验**，不匹配就停。支持断点续跑。

**对本需求的价值**："**录制 → 回放 → 校验**"的闭环设计成熟，且强调"效果验证"——这正是我们让每帧与讲解严格对应的思路。

**硬伤**：面向 EHR / 支付门户这类固定流程；要"人先演示"，不能直接吃课程配置。

---

### 9. HaoyanZhang123/dsh-plugin-control-your-capture — 物理像素截屏/录屏插件

| | |
|---|---|
| 仓库 | https://github.com/HaoyanZhang123/dsh-plugin-control-your-capture |
| Star / Fork | 5 / 0 |
| 许可证 | MIT |
| 技术栈 | JavaScript + 原生 Windows helper |
| 平台 | Windows 单显示器控制台会话 |

三个工具：`capture_screenshot`、`capture_probe`、`capture_recording`。按物理像素截图（不缩放，避免高 DPI 下文字发虚），支持把显示器或区域录成 MP4（FFmpeg + `ddagrab` + `libx264`）。停止时用 FFprobe 做质量判定与完整解码校验。

**对本需求的价值**：**工程细节最贴近我们的真实需求**——"录制区域而非整屏"、"不覆盖已有文件"、"孤儿 FFmpeg 进程清理"、"交付前解码校验"，这些坑它都踩过了。

**硬伤**：仅 Windows 单显示器控制台会话，无音频、无多显示器、无窗口级录制（GPU 合成窗口可能返回空白图）。

---

### 10. Bomx/super-video-maker-skill — 视频制作综合技能

| | |
|---|---|
| 仓库 | https://github.com/Bomx/super-video-maker-skill |
| Star / Fork | 331 / 45 |
| 许可证 | **未声明**（`license: null`，需确认） |
| 技术栈 | Python |
| 平台 | 跨平台 |

AI 视频制作技能集合：HeyGen 数字人、Seedance 生成镜头、OpenAI 图像、Remotion、屏幕录制、FFmpeg 字幕与质检。

**对本需求的价值**：覆盖了"录屏 → 字幕 → 成片"的完整后处理链，是**唯一同时包含 screen recording 和 FFmpeg captions 的 SKILL**。

**硬伤**：许可证未声明；依赖多个付费 API；它是"做视频"，不驱动 Excel 业务语义。

---

## 补充观察（不计入 Top 10）

- **pywinauto**（BSD-3-Clause，6,371 Star）：Windows GUI 自动化的事实标准库，UFO 等项目的底座。
- **iflytek/skillhub**（Apache-2.0，5,377 Star）：企业级 SKILL.md 注册中心，带 RBAC 与审计日志——如果技能要多人协作分发，这是对的载体。
- **ComposioHQ/awesome-claude-skills**（78,698 Star）：SKILL 生态索引，可用于二次检索。
- **ComeOnOliver/skillshub**（MIT，65 Star）：5,000+ 技能的注册表，带 token 友好的技能检索。
- **qufei1993/skills-hub**（MIT，1,855 Star）：Tauri 桌面应用，管理并同步多工具的技能目录。

## 选型建议

针对"参考 Excel 动画课内容 → 在 Excel/WPS 上完成操作 → 录屏 → 导出录屏文件"：

**直接可用**：无。

**推荐组合**：

| 需求 | 采纳 |
|---|---|
| 课程内容 → 操作序列 | 本仓库 `excel-desktop-recorder` 的 RecorderPlan（已实现） |
| 驱动真实 Excel / WPS | Excel/WPS 的 COM 接口（`Excel.Application` / `KET.Application`），思路参考 naturo 的 Excel 教程 |
| 录屏 | ffmpeg gdigrab；工程细节参考 dsh-plugin-control-your-capture |
| 出片与字幕 | ffmpeg + libass，布局参考本仓库 `compose-frames.py` |
| 技能分发 | 本仓库已有 `skill/` 目录约定，多人协作时考虑 iflytek/skillhub |

**为什么不用 skill-recorder**：它解决的是"从演示反推技能"，而我们要的是"从课程正推操作"。而且它锁定 Copilot、产出 SKILL.md 而非视频。

**为什么不用 screenpipe / OpenAdapt**：它们都要求"先有人操作一遍"。我们的输入是已有的结构化课程配置，应该直接正推，不需要人先演示。

## 本仓库的落地

`domains/excel-animation/skill/excel-desktop-recorder/` 已实现并实跑验证：

```
course.config.ts + course-logic.ts
        ↓  build-plan.mjs（复用课程逻辑，公式与网页课一致）
    RecorderPlan（4 模块 / 324 条动作）
        ↓  uno-driver.py（真实表格执行 + 逐帧渲染）
    PNG 帧（19 帧 ↔ 19 个讲解步骤，一一对应）
        ↓  compose-frames.py + ffmpeg
    excel-desktop-demo.mp4（h264 / 1600x1000）
```

详见 [`skill/excel-desktop-recorder/SKILL.md`](../../skill/excel-desktop-recorder/SKILL.md)。
