---
date: 2026-11-04
skill: excel-desktop-recorder
kind: verify
status: pass
---

# TTS provider 抽象接入渲染管线（sapi / edge）与语音驱动节奏验证

## 目标

验证「文字→语音→无废话讲解视频」整条链：TTS 做成 provider 抽象接入
`render-video.mjs`，让每步画面停留到它的解说说完为止（语音时长驱动节奏）。

## 做法

```bash
cd skill/excel-desktop-recorder
# 单句合成（provider 抽象）
node scripts/tts.mjs --provider sapi --text "…": --out out/tts/seg.wav
node scripts/tts.mjs --provider edge --voice zh-CN-YunxiNeural --text "…" --out out/tts/seg.wav
# 整片：解说词由 4 步指南派生，逐段合成 + adelay/amix 混音
node scripts/render-video.mjs --plan out/plan.json --out out/demo-vo.mp4 --tts edge
node scripts/render-video.mjs --plan out/plan.json --out out/demo-vo.mp4 --tts sapi
```

## 结果

| 项 | 实测 |
| --- | --- |
| sapi | 离线可用（Microsoft Huihui Desktop，22050Hz mono wav） |
| edge | 神经语音可用（zh-CN-YunxiNeural，mp3→wav 转码） |
| 节奏 | 逐字念 223.7s → 无废话修剪 **147.8s**（19 步，≈7s/步） |
| 同步 | 每帧停留 = max(基础停留, 语音时长+gap)，解说与画面逐步对齐 |

## 结论与坑

- **结论**：无废话节奏成立；provider 抽象（`PROVIDERS = ["off","sapi","edge"]`）加
  新声源只需实现 `speakSegment()`，排期/混音逻辑不动。edge 首选，sapi 离线兜底。
- **坑**：① ffmpeg 不在 PATH 时要显式 `--ffmpeg` 指到
  `C:/ProgramData/chocolatey/lib/ffmpeg-full/tools/ffmpeg/bin/ffmpeg.exe`；
  ② 逐字念会把公式读出来——`narrationText()` 默认跳 `=` 开头的行、只取第一子句、
  42 字截断，逐字用 `--tts-full`；③ edge 需 `pip install edge-tts`，属新增依赖。

## 关联

- 用法与参数：`../../skill/excel-desktop-recorder/SKILL.md`（TTS 配音章节）
- 方法论：`../recording-method.md`（TTS 解说 · 无废话系列）
