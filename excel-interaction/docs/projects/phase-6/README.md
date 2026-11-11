# Phase 6 · 出片（视频 + TTS）

## 这个 phase 做什么

同一份课程契约出片：录制计划（build-plan）→ 渲染式执行 → mp4 + TTS 配音
（edge 首选 / sapi 兜底，语音时长驱动节奏，无废话修剪默认）；质检（ffprobe 流信息 +
抽帧核对字幕/画面同步）。

对齐 [build-checklist 阶段 6 · 出片](../../../../excel-animation/docs/build-checklist.md)；
工具链前置见 [phase-0 task-04/05/06](../phase-0/tasks/)。

## tasks/

| task | 做什么 | 状态 |
| --- | --- | --- |
| [task-01-plan-and-tts](tasks/task-01-plan-and-tts/) | 录制计划 + TTS 三 provider + narration 拼接（语音驱动节奏） | ✅ |
| [task-02-render-video](tasks/task-02-render-video/) | 渲染式出片（截帧→定长片段→concat→混 narration） | ✅ |
| [task-03-qc-pilot](tasks/task-03-qc-pilot/) | 抽帧质检 qc.mjs（流断言/漂移<5%/逐步抽帧比对） | ✅ |
| [task-04-record-and-drivers](tasks/task-04-record-and-drivers/) | 录屏式 + 抓窗式（hot-driver / uno-driver / record.mjs） | ✅ |
| [task-05-motion-fast-video](tasks/task-05-motion-fast-video/) | 动作出片 + <30s 收紧（多帧捕获 / 语速 / 紧凑口播，task-16） | ✅ |
| [task-06-step-cards-in-video](tasks/task-06-step-cards-in-video/) | 步骤讲解入片 + 视频有声（task-18，展示层去分步配合） | ✅ |
| [task-07-snappier-steps](tasks/task-07-snappier-steps/) | 每步节奏收紧 -2s（动作名/参数清单口播 + gapMs 200，task-20） | ✅ |
| [task-08-uno-segment-dispatch](tasks/task-08-uno-segment-dispatch/) | 抓窗式 intro/outro 段派发（遗留 #1，paceStartMs 钩子） | ✅ |
| [task-09-param-highlight-blocks](tasks/task-09-param-highlight-blocks/) | 逐参数高亮拆段（遗留 #4，画面随口播推进、时长不变） | ✅ |
| [task-10-mouse-choreography](tasks/task-10-mouse-choreography/) | 鼠标编排（遗留 #2，真实 OS 光标 + 页内光标 + 前摇裁剪） | ✅ |

每个 task 目录三件套：`task.md`（做什么/功能/验证点）、`verify.md`（验证记录）、`output.md`（交接）。
构建方式见 [build-method.md](../../build-method.md)。

出片命令链（实现在 `scripts/recorder/`，产物在 `out/<id>/`，gitignored）：

```bash
pnpm plan -- --config courses/<id>.json    # 录制计划 + TTS → out/<id>/plan.json + narration.wav
pnpm video -- --plan out/<id>/plan.json    # 渲染式出片 → out/<id>/<id>.mp4（0.0% 漂移）
pnpm qc -- --plan out/<id>/plan.json       # 抽帧质检 → out/<id>/qc/
```

试点课 vlookup-basic 三式出片全过（渲染式 0.0% / 浏览器录屏式 0.6% / 抓窗式 0.0%）。
