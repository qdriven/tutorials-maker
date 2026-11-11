# task-01 · 录制计划与配音（build-plan + tts）

## 做什么

phase-6 出片第一步：同一份课程契约 `courses/<id>.json` → 录制计划 `out/<id>/plan.json`
（步骤序列 + 无废话解说词 + 语音驱动时长）+ TTS 配音产物（逐段 wav + 整轨）。
对齐 build-checklist 阶段 6 与 [tts.md](../../../../../skill/excel-desktop-recorder/references/tts.md)。

## 功能定义

1. **tts.mjs（provider 抽象）**：`speakSegment({provider, voice, text, out}) → {file, durationMs}`、
   `buildNarration({segments, workDir, out}) → 整轨 wav`；provider `edge`（神经语音首选，
   默认 zh-CN-XiaoxiaoNeural）/ `sapi`（Windows 离线兜底，Microsoft Huihui Desktop）/
   `off`（纯字幕）；输出统一 22050Hz 单声道 pcm_s16le wav；时长 ffprobe 实测。
   edge 失败（无网）→ 自动降级 sapi 并告警（phase-0 口径）。
2. **build-plan.mjs（契约 → 录制计划）**：解说词派生（title=menu、detail=expect 剔公式
   片段，brief=第一子句 + 42 字截断，`--full` 逐字）；步骤自定义 `narration` 直接采用
   （作者定稿不再修剪）；**先 TTS 拿真实时长再定 holdMs**：
   `holdMs = max(minHoldMs, speechMs + gapMs)`（minHoldMs 默认 1200、gapMs 契约
   narration.gapMs 默认 800）；off 时 speechMs 用估读时长
   `min(6000, max(1500, 字数×220ms))`；产物 `out/<id>/plan.json` + `out/<id>/tts/`。
3. **整轨对齐**：`buildNarration` 把每段语音按 holdMs 补静音后拼接——
   音轨总长 = Σ holdMs = 画面总长（死区为零、音频不串步）。

## 验证点

1. vlookup-basic 出 plan.json：4 步解说词符合修剪三规则（公式行不念/第一子句/42 字），
   数字说话（逐段 speechMs/holdMs/总时长）。
2. TTS 实物：edge（或降级 sapi）逐段 wav + narration.wav 存在，ffprobe 时长与
   plan 数字一致（偏差 <5%）。
3. 管线顺序正确：plan.json 的 holdMs 由 speechMs 推出（改文本→时长联动，非拍脑袋）。
4. 回归：`pnpm verify` EXIT=0；provider=off 出纯字幕计划（无音频文件）。

## 前置与依赖

- phase-0 task-04（ffmpeg/ffprobe）、task-06（edge-tts/sapi）。

## 范围外

- 帧捕获与合成（task-02 render-video）；质检（task-03）；抓窗式/浏览器录屏式（task-04）。
