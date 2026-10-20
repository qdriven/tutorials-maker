# Tutorials Maker(Computer Use)调研与可行性分析

> 对应 Issue: [#1 — tutorials maker computer use](https://github.com/qdriven/tutorials-maker/issues/1)
> 调研日期:2026-10-20

## 1. 目标拆解

Issue 设想的产品形态是三段式流水线:

```
① 操作指南编写(LLM 生成教程脚本)
        ↓
② Computer Use 自动执行操作 + 录屏(OpenScreen / Recordly 类工具)
        ↓
③ 自动剪辑(自动 zoom、剪除停顿、配字幕/旁白)→ 产出成品教程视频/图文
```

对标商业产品:**Scribe / Tango**(录制操作 → 自动生成图文 SOP)、**Screen Studio / Loom**(录制 → 自动美化)、**DemoBites**(agent 录 demo → 自动剪辑配音)。我们要做的是把这三类能力用开源 + Claude 串起来。

---

## 2. 生态调研

### 2.1 开源录屏 + 自动剪辑(对应 ②③)

| 项目 | 地址 | 关键能力 | 自动化接口 | 状态/许可 |
|---|---|---|---|---|
| **OpenScreen** | [siddharthvaddem/openscreen](https://github.com/siddharthvaddem/openscreen) | 自动 zoom(基于光标速度+点击事件)、合成光标、motion blur、标注、多平台 | ❌ 无 CLI/API | **2026-10-17 已归档**,39.9k stars,社区 fork: getopenscreen/openscreen,MIT |
| **Recordly / recordly-ai** | [gokulmc/recordly-ai](https://github.com/gokulmc/recordly-ai)(官网 [recordly.dev](https://recordly.dev)) | auto-zoom、光标平滑/点击弹跳、时间线剪辑、`.recordlyai` 工程文件、扩展市场 | 有 **Extensions 系统(render hooks)**,但无 CLI | 早期,AGPL-3.0,Win/Linux 有构建包 |
| **Cap** | [CapSoftware/Cap](https://github.com/CapSoftware/Cap)([cap.so](https://cap.so)) | 点击驱动的自动 zoom、光标平滑、字幕、4K/60fps | ✅ **官方 CLI + 本地 MCP server**,专为 agent 设计,可装成 Claude Code skill | 活跃,AGPL-3.0(核心 capture 库 MIT),可自托管 |
| **auto-editor** | [WyattBlue/auto-editor](https://github.com/WyattBlue/auto-editor) | 按音频响度/画面运动自动剪掉静默与无操作片段,`--edit` 可组合规则 | ✅ 纯 CLI,天然适合脚本编排 | 成熟,MIT |

**关键洞察:事件级录制是自动剪辑的核心。** OpenScreen / Recordly / Cap 之所以能做 auto-zoom,是因为它们把 *光标轨迹 + 点击事件* 与视频分开录制,剪辑时再叠加合成光标和 zoom 关键帧。而 computer-use 驱动恰好天然产生这份"事件流"(每一次 click/type/scroll 都是 API 调用)——**agent 驱动 + 事件日志 ≈ 免费的剪辑元数据**,这是整个方案最顺的一点。

### 2.2 Computer Use 驱动能力(对应 ②)

| 方案 | 说明 | 适用范围 |
|---|---|---|
| **Anthropic Computer Use API**(beta `computer-use-2025-11-24`) | screenshot / click / type / scroll / drag / zoom 等原语,官方提供 Docker 参考实现与 agent loop | 桌面级,跨任意应用 |
| **Claude Code + Bash** | 不走 computer-use API,直接用 shell 驱动(Playwright、CLI 工具) | 命令行/浏览器内,最简单可靠 |
| **agent.exe**([corbt/agent.exe](https://github.com/corbt/agent.exe)) | Electron 应用,Claude 直接控制真实电脑(截图→动作循环) | 参考 PoC,验证桌面级可行性 |
| **Claude 官方 "record a skill"**(Claude for Mac / Cowork) | 录屏+语音 → Claude 蒸馏成 skill,反向印证了这个方向 | 产品参考 |
| **Tango + Claude Cowork 集成** | Tango 录制生成 SOP(Markdown/PDF)→ Claude 转成浏览器自动化回放 | 商业闭环参考 |

### 2.3 相关 Claude Skill(对应 ①②③ 的"轮子")

| Skill | 安装/来源 | 与本项目的关系 |
|---|---|---|
| **demobites/agentic-recorder** | Claude Code 插件:`/plugin marketplace add demobites/agentic-recorder`,或 `npx demobite@latest` | **最接近目标形态的现成品**:agent 描述流程 → 确认 storyboard → Playwright 驱动真实浏览器录制 → 上传云端 Studio 自动剪辑(TTS 旁白、zoom、字幕)→ 导出 MP4。MIT(本地部分),云端服务免费档 |
| **feature-video**(everyinc/compound-engineering-plugin) | `npx skills add https://github.com/everyinc/compound-engineering-plugin --skill feature-video` | 录制浏览器操作 → ffmpeg 拼成 MP4 → 上传 GitHub 嵌入 PR。纯本地,依赖 `agent-browser` + ffmpeg + gh |
| **ui-demo-recorder**(affaan-m) | `npx skills add affaan-m/ecc/ui-demo` | Playwright 三阶段(探索→排练→录制)录 UI 演示,带光标叠加,输出 WebM |
| **Cap 官方 agent skill** | `cap agents install --target claude` | CLI + MCP,agent 可以发起录制、读转录文本、管理库;支持 headless CI |
| **recordly skill**(社区) | claudskills.com 收录 | 包装 Recordly 的安装/启动/导出 |
| **anthropics/skills** 官方库 | [anthropics/skills](https://github.com/anthropics/skills/tree/main/skills) | 无直接对口 skill;`skill-creator` 用于造我们自己的 skill,`webapp-testing` 可复用其浏览器驱动模式 |
| **michel-ui-demo-recorder**(packmind) | verified-skill.com | Playwright MCP 录 HD WebM,带章节标记+光标+字幕条,产出交付级视频 |

### 2.4 图文指南生成(对应 ①)

- **Tango / Scribe** 证明了"录制 → 自动截图 + 红框标注 + 分步文案"的产品价值(输出 Markdown/PDF/HTML)。
- Claude 官方 record-a-skill 的做法值得借鉴:**只保留截图序列**(不留视频),由 LLM 从截图+操作事件流生成分步指南。
- 在我们的流水线里,computer-use 的事件流(click 坐标、type 内容、截图)直接喂给 Claude 即可生成图文教程——不需要额外录制。

---

## 3. 可行性分析

### 结论:可行,且已有多个可复用的先例。建议分三档落地。

#### 路线 A:浏览器内教程(推荐 MVP 起点)— 可行性:★★★★★

**做法**:Claude Code + Playwright(或现成的 agentic-recorder / feature-video / ui-demo-recorder skill)驱动浏览器执行教程步骤,Playwright 原生录视频 + 每步截图;截图+事件流喂给 Claude 生成图文指南;ffmpeg/auto-editor 做剪辑。

- ✅ 全链路纯本地、纯开源、已有成熟 skill,一两周可出 MVP
- ✅ Playwright 录制稳定、可重放、可 headless
- ⚠️ 局限:只能覆盖 Web 应用教程(但这是教程内容的大头)

#### 路线 B:桌面级 Computer Use 录制 — 可行性:★★★☆☆

**做法**:Anthropic computer-use API(或 agent.exe 模式)驱动真实/虚拟桌面执行操作;同时用 Cap CLI(或 OpenScreen fork)外挂录屏;用事件流驱动剪辑。

- ✅ 覆盖任意桌面软件教程,是产品差异点
- ⚠️ 挑战:
  1. **同步问题**——computer-use agent 与外部录屏器是两个进程,需要事件时间戳对齐(方案:agent loop 自己记录每次 tool call 的时间戳与坐标,作为剪辑元数据);
  2. **驱动可靠性**——computer-use 对复杂 UI 仍会失误,教程类操作对准确性要求高,需要"排练→重试→确认"循环(ui-demo-recorder 的三阶段模式可直接借鉴);
  3. **OpenScreen 已归档**、Recordly 无 CLI——桌面录制侧的自动化接口最薄弱,可能需要给 fork 提 PR 或直接用 Cap。
- 💡 折中:**用 computer-use API 的 screenshot 流自己拼视频**(参考 feature-video 的 ffmpeg 逐帧拼法),跳过外部录屏器,事件流天然对齐。

#### 路线 C:直接复用/集成现成品 — 可行性:★★★★☆(最快出效果)

- **DemoBites agentic-recorder**:装上插件,今天的 Claude Code 就能"一句话 → 成品带旁白的教程视频"(云端剪辑)。适合先验证工作流价值,再决定自研深度。
- **recordly-ai 的 "Auto Demo"**:从 GitHub repo + URL 出发,Claude 自己爬应用、写脚本、录 walkthrough——与 Issue 设想几乎逐字相同,可读其源码(AGPL)借鉴架构。

### 主要风险

| 风险 | 影响 | 缓解 |
|---|---|---|
| Computer-use 操作失误导致教程内容错误 | 高 | 三阶段(探索/排练/正式录制)+ 每步断言 + 失败重录 |
| 桌面录屏工具缺少自动化 API(OpenScreen 归档、Recordly 无 CLI) | 中 | 首选 Cap(CLI+MCP);或用截图流自拼 |
| 敏感信息入镜(密码、通知弹窗) | 中 | 独立干净的用户 profile + 事件流标记 + 录后打码(Recordly/Cap 支持模糊区域) |
| AGPL 许可(Recordly、Cap 主仓) | 低(仅集成/调用不修改则无传染风险,深度改动需注意) | 优先 CLI/进程级集成,不修改其源码 |
| 中文教程的旁白/字幕 | 低 | Cap 本地字幕支持 19 语言;TTS 可用开源方案替换 DemoBites |

---

## 4. 建议路线图

1. **Phase 0(1 天)**:在 Claude Code 里装 agentic-recorder / feature-video skill,录一个真实教程demo,验证端到端体验,明确自研缺口。
2. **Phase 1(MVP,浏览器内)**:自建 `tutorials-maker` skill——输入"教程主题 + 目标 URL"→ Claude 生成操作脚本(①)→ Playwright 三阶段执行并录制+截图(②)→ 事件流驱动 ffmpeg 剪辑(去停顿、按点击 zoom)+ Claude 生成图文版(③)。产出:MP4 + Markdown 图文。
3. **Phase 2(桌面级)**:引入 computer-use API 驱动真实桌面,Cap CLI 录屏,事件时间戳对齐做 auto-zoom 剪辑。
4. **Phase 3(打磨)**:TTS 旁白、字幕、模板化片头片尾(Remotion 可选)、CI 批量生成(界面改动→自动重录,Cap 支持 headless)。

## 5. 参考链接汇总

- Anthropic Computer Use 文档: <https://docs.anthropic.com/en/docs/agents-and-tools/tool-use/computer-use-tool>
- anthropics/skills: <https://github.com/anthropics/skills>
- DemoBites agentic-recorder: <https://github.com/demobites/agentic-recorder> / <https://agentic-recorder.com>
- Cap for Agents(CLI/MCP): <https://cap.so/agents> / <https://github.com/CapSoftware/Cap>
- OpenScreen(归档): <https://github.com/siddharthvaddem/openscreen>(fork: getopenscreen/openscreen)
- Recordly: <https://recordly.dev> / recordly-ai: <https://github.com/gokulmc/recordly-ai>
- auto-editor: <https://github.com/WyattBlue/auto-editor> / <https://auto-editor.com>
- feature-video skill: <https://github.com/everyinc/compound-engineering-plugin>
- ui-demo-recorder skill: <https://www.getclaudeskills.com/skills/ui-demo-recorder-affaan-m>
- agent.exe: <https://github.com/corbt/agent.exe>
- Tango × Claude Cowork: <https://www.tango.ai/blog/how-to-use-claude-cowork-and-tango>
- Claude 自定义 skill(含录屏蒸馏 skill): <https://support.claude.com/en/articles/12512198-how-to-create-custom-skills>
