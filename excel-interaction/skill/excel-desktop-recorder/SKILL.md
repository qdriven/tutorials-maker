---
name: excel-desktop-recorder
description: 把课程契约在真实表格里重做一遍并录成带讲解配音的视频：课程契约 → 录制计划 → 真机执行 → 逐帧渲染 → mp4。支持 LibreOffice/Excel/WPS/hot 四引擎与渲染式/抓窗式/浏览器录屏式三模式，TTS（edge/sapi）语音时长驱动节奏。当用户要求"把这课录成视频""出一个无废话讲解 mp4""录屏出片"时使用。
---

# excel-desktop-recorder：课程契约 → 无废话讲解视频

## 输入与输出

- **输入**：`courses/<id>.json`——与 [excel-tutorial-maker](../excel-tutorial-maker/SKILL.md)
  **同一份契约**（唯一事实源）。视频专属参数（模式/引擎/画幅）走命令行或录制计划，
  不进契约。
- **输出**：`out/<id>/` —— `<id>.mp4`（成品）+ 录制计划 JSON + 配音/帧中间产物（不入库）。

## 三种模式（速查）

| 模式 | 录到什么 | 前置条件 |
| --- | --- | --- |
| **渲染式**（默认） | 真实表格渲染图 + 讲解卡（DOM 重演） | 任一引擎可用；锁屏/CI 可跑 |
| **抓窗式** | 真实应用窗口 + 鼠标轨迹 | 解锁会话 + Excel/WPS/LibreOffice 之一 |
| **浏览器录屏式** | 真实页面 + 点击回放 | Playwright 浏览器 |

模式 × 引擎矩阵、选择顺序（excel > wps > libreoffice > hot 自动探测）见
[references/modes.md](references/modes.md)。

## 无废话节奏（出片核心）

- 解说词从 4 步指南派生：**公式行不念**、只取第一子句、42 字截断（`--full` 才逐字）。
- 每步画面停留 = max(基础停留, 语音时长 + gap)——**语音驱动节奏**，无死区。
- TTS provider：`edge`（神经语音，首选）/ `sapi`（离线兜底）/ `off`（纯字幕）。
  细节与修剪规则见 [references/tts.md](references/tts.md)。

## 工作流程（4 步）

1. **生成录制计划**：契约 → 步骤序列 + 解说词（build-plan，脚本随 phase-6 交付）。
2. **定引擎与模式**：默认渲染式；要"真实鼠标"才上抓窗式。
3. **执行 + 出片**：逐帧渲染/真机录制 → ffmpeg 合成 mp4 + 配音。
4. **质检**：ffprobe 流信息 + 抽帧 3–5 张核对字幕/画面同步。

## 验收清单

- [ ] 时长 ≈ 各步解说时长之和（无死区、无超长静止）
- [ ] 讲解卡/字幕与步骤对齐（抽帧核对）
- [ ] ffprobe 显示视频流 + 音频流齐全，分辨率/帧率符合预期
- [ ] 公式与结果画面和契约一致

## 参考

- 模式与引擎：[references/modes.md](references/modes.md)
- TTS 与无废话规则：[references/tts.md](references/tts.md)
- 坑位表：[references/pitfalls.md](references/pitfalls.md)（OpenScreen 注解黑块、GUI 探测挂起、concat 尾帧等）
