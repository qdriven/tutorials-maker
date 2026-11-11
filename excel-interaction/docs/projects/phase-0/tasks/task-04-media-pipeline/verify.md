# verify · task-04 媒体工具链

> 执行环境：Windows 11，2026-11-08。

### 1. ffmpeg / ffprobe 可执行、退出码 0

- 命令：`ffmpeg -version`；`ffprobe -version`
- 实际输出：
  ```
  ffmpeg version 8.0-full_build-www.gyan.dev Copyright (c) 2000-2025 the FFmpeg developers
  ffprobe version 8.0-full_build-www.gyan.dev Copyright (c) 2007-2025 the FFmpeg developers
  ```
  check.mjs 两项均 `[PASS]（必需）`
- 结论：**PASS**

### 2. drawtext 滤镜可用

- 命令：`ffmpeg -filters | grep drawtext`
- 实际输出：`... drawtext ...`（滤镜列表含 drawtext）
- 结论：**PASS**

## 总结

2/2 PASS。ffmpeg 8.0 full build 就绪（gyan.dev 发行版，滤镜/编码器齐全），
媒体工具链满足出片与文字层需求。
