# task-01 · output（产出交接）

## 什么功能完成了

**录制计划与配音**（出片第一步）：课程契约 → `out/<id>/plan.json`（4 步序列 +
无废话解说词 + 语音驱动时长）+ 逐段 wav + 整轨 narration.wav。总时长 17.6s
（vlookup-basic，brief 模式）。

## 产出清单

| 文件 | 作用 |
| --- | --- |
| `scripts/recorder/bin.mjs` | 外部工具解析（ffmpeg/ffprobe/python；.cmd 垫片不 spawn、choco 兜底） |
| `scripts/recorder/tts.mjs` | provider 抽象：speakSegment/buildNarration；edge/sapi/off；22050Hz mono wav；edge 失败自动降级 sapi |
| `scripts/recorder/build-plan.mjs` | 契约 → 录制计划：解说词三规则修剪、先 TTS 后定时长、整轨对齐 |
| `out/<id>/plan.json` + `out/<id>/tts/` | 中间产物（不手改、不入库） |

## 要点（hand-off 给下游）

1. **解说词派生**：title=menu、detail=expect（剔公式片段），brief=「title：第一子句」
   （`，/。/；` 切、42 字截断）；`--full` 跳过 2-3 逐字；步骤自带 `narration` 是作者
   定稿直接用（仅剔公式）。修剪只作用语音——画面/字幕仍四要素全文。
2. **节奏算式**：`holdMs = max(minHoldMs=1200, speechMs + gapMs=800)`；off 时
   speechMs 用估读 `min(6000, max(1500, 字数×220))`。整轨 = 每段按 holdMs 补静音
   拼接，**总长 = Σ holdMs = 画面总长**（音频不串步）。
3. **编码坑**：PowerShell 5.1 读 .ps1 无 BOM 按 ANSI——tts.mjs 的 sapi 脚本写
   UTF-8 BOM；文本走临时文件避开 GBK 控制台；edge mp3 统一转 22050Hz mono wav。
4. **换音色必须重测时长**（tts.md）：节奏由语音驱动，plan.json 是按 voice 实测的。

## 下游接线

- task-02 render-video 消费 plan.json + narration.wav 合成 mp4。
- 录像出片（本 phase 后续）：`node scripts/recorder/build-plan.mjs --config courses/<id>.json`。
