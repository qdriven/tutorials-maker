# task-04 · 媒体工具链：ffmpeg + ffprobe

## 做什么

确认视频合成与流信息读取的工具链就绪：**ffmpeg**（合成、抽帧、drawtext 文字层）
与 **ffprobe**（时长/编码流信息）。

## 功能定义

- ffmpeg 可执行，支持 h264/aac 编码与 drawtext/ass 文字滤镜（后排出片文字层依赖）。
- ffprobe 可执行，能读 mp4 的时长与流信息（出片质检依赖）。

## 验证点

1. `ffmpeg -version` / `ffprobe -version` 可执行且退出码 0，check.mjs 双双 PASS。
2. （功能面）ffmpeg 支持 drawtext 滤镜：`ffmpeg -filters | grep drawtext` 有输出。

## 前置与依赖

- 无。

## 范围外

- 具体发行版（gyan.dev full build / 系统包管理器版均可）；只要滤镜与编码器齐。
