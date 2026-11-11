# phase-6 · task-05 · task（动作出片 + <30s 收紧，用户 task-16）

## 背景（用户反馈原文）

> 当前视频似乎没有任何动作，节奏太慢了，中间停顿太多了，现在需要的是把动画变成自动播放，
> 然后再重新录制视频……目前 1 分钟视频太长了，需要到小于 30s。

四个问题：① 视频是定帧拼接、没有动作；② 节奏慢、停顿多；③ 时长 60.5s/44.5s 太长（要 <30s）；
④ 动画要自动播放后重新出片。

## 做什么

1. **动作出片（多帧捕获）**：hot-driver.py 渲染式改动作段**不 await 触发 + 帧序列连拍**
   （8fps，窗口 min(holdMs, 2400ms) 覆盖 typeIn+flash）；render-video.mjs 按帧序列
   （`-framerate fps -start_number 0 -i seg-i-%03d.png`）重放 + `tpad=stop_mode=clone`
   冻结补满 holdMs——确定性渲染管线保留，视频里有真动画。
2. **<30s 收紧（无废话节奏）**：
   - TTS `--rate`（默认 `"+25%"`；edge 透传 `--rate`，sapi 折算 `$s.Rate`；重试 2 次再降级防混声）；
   - 规则 4 参数口播 brief 改**紧凑式** `参数：<标签>、<标签>…`（label = meaning 首个：前缀；`--full` 逐字）；
   - 规则 5 开篇口播**只念一句话总结**（SQL 解释上屏不念）；收尾照念；
   - 契约 `narration.gapMs` 800→400；vlookup 收尾总结收短。
3. **两门课重出片**：vlookup-basic / sum-basic 重新 plan→video→qc，成品回写展示层。

## 功能清单

| 文件 | 改动 |
| --- | --- |
| `scripts/recorder/tts.mjs` | `ratePct` 导出；speakSapi/speakEdge/speakSegment 接 `rate`；edge 失败重试 2 次再降级；CLI `--rate` |
| `scripts/recorder/build-plan.mjs` | `--rate`（默认 +25%）；`argsNoteFor(course, full)` 紧凑式；开篇口播 oneLiner-only（`--full` 全念）；估时按速压缩 |
| `scripts/recorder/hot-driver.py` | 渲染式多帧捕获（`--fps` 8 / `--motion-ms` 2400）；非 await 触发；清残留帧；输出 `segments[{files,fps}]` |
| `scripts/recorder/render-video.mjs` | 帧序列 clip（fps 重放 + tpad 冻结 + `-t holdMs`）；单帧段 loop 兼容；旧 `.frames` 归一 |
| `skill/excel-desktop-recorder/references/tts.md` | 规则 4 紧凑式 + 规则 5 开篇只念一句话 + `--rate` 文档 |
| `courses/vlookup-basic.json` / `sum-basic.json` | `gapMs: 400`；vlookup 收尾总结收短 |
| `apps/*/course.config.json` | 契约重新生成落位（gapMs/收尾同源） |

## 验证点

1. 两门课 plan 总时长 **<30s**（数字说话：Σ holdMs）。
2. 成品时长 vs Σ holdMs **偏差 <5%**（qc 流断言）。
3. **动作可见**：step-2 动画窗内抽帧互不相同（typeIn 进行中帧 = 公式半截 + 光标）。
4. 抽帧质检全过（字幕/当前步一致）；`pnpm verify` 全绿。
5. 口播音色统一（无 edge/sapi 混声）。
