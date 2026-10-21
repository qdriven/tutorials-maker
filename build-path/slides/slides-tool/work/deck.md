---
title: Tutorials Maker — 从操作指南到自动成片
segments: VISION, PROOF, INSIGHT, ENGINE, ARCH, REC, PIPE, ROAD
storyboard_note: 一份文档就是一条时间线
---

<!-- slide: title seg=0 deco=glitch -->
kicker: RESEARCH BULLETIN / 调研报告 — NO.01
# Tutorials Maker
## 自动教程生成
sub: 当 **Computer Use** 遇上教程制作:一份操作指南,如何自动**录制**成视频、自动**剪辑**成片。
note: 三个开源项目的源码级验证 · ISSUE #01 · 2026.10

<!-- slide: steps seg=0 top="01 / VISION — 设想" -->
kicker: ISSUE #1 / 三段式流水线
# 教程 · 素材 · 成片
- i. 写指南 :: LLM 生成操作教程,一份 Markdown 就是单一源
- ii. 自动录制 :: Computer Use 驱动操作,录屏工具捕捉画面
- iii. 自动剪辑 :: auto-zoom、去停顿、字幕旁白,直接出片

<!-- slide: index seg=1 top="02 / PROOF — 先例" deco=qr -->
kicker: 先例已在 / 这条路已被走通
# 不是空想
- 01 :: **Scribe / Tango** — 录制操作,自动生成图文 SOP :: GUIDE
- 02 :: **Screen Studio / Cap** — 录制,自动 zoom 与光标美化 :: RECORD
- 03 :: **DemoBites** — agent 自动录 demo,云端自动剪辑配音 :: AGENT
- 04 :: **recordly-ai "Auto Demo"** — Claude 爬应用、写脚本、录 walkthrough :: AUTO

<!-- slide: quote seg=2 top="03 / INSIGHT — 洞察" -->
驱动操作时产生的**事件流**,
就是剪辑需要的**全部元数据**。
> 每次 click / type / scroll 都带时间戳与坐标 ——
> auto-zoom、合成光标、去停顿,全都从这份"免费"的事件流里长出来。

<!-- slide: index seg=3 top="04 / ENGINE — 轮子·之一" -->
kicker: 拍摄引擎 / MIT · 代码可直接复用
# agentic-recorder
- ✓ :: storyboard 驱动 Playwright 拍摄,真实 Chrome · 1920×1080 :: RECORD
- ✓ :: manifest 记录时间轴 + 光标事件 + 镜头路径(camera path) :: META
- ✓ :: 合成人手节奏光标、点击脉冲、平滑滚动 :: POLISH
- ! :: **唯一缺口:zoom 与光标渲染留在云端 —— 这正是我们要补的一层** :: GAP

<!-- slide: index seg=4 top="05 / ARCHITECTURE — 轮子·之二" -->
kicker: 架构教科书 / AGPL · 只学架构,不抄代码
# recordly-ai
- ✓ :: Auto Demo 六阶段:ingest → understand → crawl → script → record → render :: PIPELINE
- ✓ :: **Live Catalog**:带认证爬真实页面,元素编目后再写脚本 —— live-grounded :: RELIABLE
- ✓ :: 光标由 pipeline 自己的 sidecar 渲染,录屏器只当"相机" :: CURSOR
- ✓ :: ADR 设计决策文档完整,是最好的架构参考 :: ADR

<!-- slide: index seg=5 top="06 / RECORDER — 轮子·之三" -->
kicker: 录制层 / AGPL 核心 · CLI 进程级集成无传染
# Cap
- ✓ :: 官方 CLI + 本地 MCP,全命令 JSON 输出 —— 按"给 agent 用"设计 :: CLI
- ✓ :: cap targets 枚举窗体 → cap record start --detach 后台录制 :: WINDOW
- ✓ :: .cap 工程可脚本化配置 zoom / 光标,再 export 成片 :: RENDER
- ✓ :: 桌面级录制(方案 A)首选;Playwright 路线的备选渲染层 :: PLAN A

<!-- slide: pipe seg=6 top="07 / PIPELINE — 定案架构" -->
kicker: 单一源 / tutorial.md 就是分镜表
# tutorial.md 单一源流水线
- tutorial.md :: SLIDEV + EXEC :: c1
- storyboard :: 同构转换 :: c2
- 拍摄引擎 :: AGENTIC-RECORDER :: c3
- 渲染层 :: ZOOM·光标·字幕 :: c4
- MP4 + 图文 :: EXPORT :: c5
sub: 高亮两端是**自研**,中间两段**复用开源** —— 渲染层是全链路唯一的技术空白,也是本项目的价值所在。

<!-- slide: roadmap seg=7 top="08 / ROADMAP — 路线图" -->
- PHASE_0 :: 装上现成 skill,录一个真实教程,验证端到端 —— 1 天
- PHASE_1 :: 浏览器内 MVP:markdown → storyboard → 拍摄 → 剪辑
- PHASE_2 :: 桌面级:computer use + Cap 录窗体
- PHASE_3 :: 打磨:TTS 旁白、模板、CI 批量生成
end: Let's ship it_
