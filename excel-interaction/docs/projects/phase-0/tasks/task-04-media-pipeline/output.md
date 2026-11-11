# output · task-04 媒体工具链（hand-off）

## 产出

无新增文件（环境确认类 task）。

## 完成功能

ffmpeg 8.0 + ffprobe 就绪：视频合成、抽帧质检、drawtext/ass 文字层渲染通道全部可用。

## 要点（交接）

1. **版本**：8.0-full_build（gyan.dev）；后出片管线的编码预期 h264 + aac。
2. **文字层策略**：字幕/标注统一 ffmpeg drawtext/ass 烧录——不依赖录屏工具自带的
   注解（旧域实测有黑块坑，见 excel-animation docs/skill-log）。
3. **质检**：ffprobe 读时长/流信息是出片验收的标准动作（phase-6）。
