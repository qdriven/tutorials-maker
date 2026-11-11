# task-02 · 渲染式出片（hot-driver + render-video）

## 做什么

录制计划 → 渲染式执行 → mp4：hot 引擎（web 课程页）逐帧重演截图 → ffmpeg 合成
（逐段定长 clip → concat → 挂 TTS 音轨）。对齐 build-checklist 阶段 6 默认模式
（锁屏/CI 可跑）与 pitfalls #4（concat 尾帧）/#1（字幕不走录屏工具注解）。

## 功能定义

1. **hot-driver.py**：Playwright 驱动 apps/<id> 页面，Lesson.reset 停表 →
   gotoStep(1..4) 逐拍重演（状态累积）→ 每步全页截图（字幕/讲解卡在画面内）。
2. **render-video.mjs**：起 scripts/serve 静态服务（20s 就绪探测）→ 调驱动截帧 →
   逐段 clip（统一缩放到偶数高，每段时长 ±0.15s 断言）→ concat 显式清单+尾段重复
   → narration.wav 挂轨（off 则无音频）→ 成品自检（流信息 + 时长偏差 <5%）。

## 验证点

1. 4 帧截出且状态逐步累积（step-3 帧可见 E2=王五）。
2. 成品 h264+aac、时长 = Σ holdMs（偏差 <5%）。
3. 画幅统一（偶数高）、`--ass` 可选叠加层。

## 前置与依赖

- task-01（plan.json + narration.wav）。

## 范围外

- 质检脚本（task-03）；抓窗式/浏览器录屏式（task-04）。
