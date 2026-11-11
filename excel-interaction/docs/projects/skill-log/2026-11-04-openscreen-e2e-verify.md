---
date: 2026-11-04
skill: openscreen
kind: verify
status: partial
---

# OpenScreen 端到端：录制 + JSON 后期缩放/注解 + TTS 混音

## 目标

验证「自动运行教程 → 自动录制 → 自动后期加字」的 Plan B：OpenScreen（Windows
Graphics Capture）录制真实窗口，用 JSON 编辑器做缩放/文字注解后处理，再混 TTS
出片，评估它在录制式管线里的位置。

## 做法

```bash
openscreen record --window "<Chrome 窗口标题>" --duration 33 \
  --project tutorial.openscreen --json
# 编辑 .openscreen(JSON)：注入 editor.zoomRegions[]（startMs/endMs/depth/focus）
# 与 annotationRegions[]（type:"text", textContent, position…）
openscreen export --audio …        # 导出 mp4
# 文字层最终用 ffmpeg drawtext 补烧（见「坑」）
ffmpeg -i in.mp4 -vf "drawtext=fontfile=C:/Windows/Fonts/msyhbd.ttc:…" out.mp4
```

TTS 混音走本仓 `tts.mjs`（见 [tts-provider-verify](2026-11-04-tts-provider-verify.md)）。

## 结果

| 项 | 实测 |
| --- | --- |
| 录制 | 33s，WGC 硬件编码，窗口内容完整 |
| zoom 注入 | 生效，导出视频缩放正确 |
| annotation 注入 | **导出为黑块**——自带导出器不渲染 harness 文字 schema |
| 最终成片 | ffmpeg drawtext 烧字幕补完，tutorial-subtitled.mp4 验帧通过 |

产物：`workspace/openscreen-demo/`（tutorial.openscreen、tutorial-final.mp4 19.6MB、
tutorial-subtitled.mp4、tts/narration.wav；gitignore，不入库）。

## 结论与坑

- **结论**：抓窗式录制 + JSON 后期可行，但**文字层别依赖它的注解**，统一走
  ffmpeg drawtext/ass 渲染。真实鼠标轨迹是它相对渲染式的唯一增量价值。
- **坑**：① 首次启动的对话框会让 `openscreen sources` 看不到 Chrome 窗口——带
  `--no-first-run --no-default-browser-check` 重启浏览器即可；② 注解 schema 与
  导出器不兼容（黑块）；③ 需要真实桌面会话，锁屏不可用。

## 关联

- 方法论：`../recording-method.md`（抓窗式模式）
- 选型分析：`../skill-fit-analysis.md`（E 类录屏反推/自动化，★ 辅助）
