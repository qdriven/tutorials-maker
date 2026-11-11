# phase-6 · task-05 · output（产出交接）

## 什么功能完成了

**动作出片 + <30s 收紧**（用户 task-16 反馈闭环）——讲解视频从「定帧拼接 60s」变成
「有真动画的 <30s 无废话讲解」：

| 课 | 原时长 | 新时长 | 动作 |
| --- | --- | --- | --- |
| vlookup-basic | 60.5s | **27.5s** | typeIn/flash/panelStep 入片（8fps 连拍） |
| sum-basic | 44.5s | **25.1s** | 同上 |

## 产出清单

| 文件 | 作用 |
| --- | --- |
| `scripts/recorder/tts.mjs` | `--rate` 语速（默认 +25%）+ edge 瞬时失败重试 2 次再降级 |
| `scripts/recorder/build-plan.mjs` | `--rate` 接线；规则 4 紧凑式口播；规则 5 开篇只念一句话 |
| `scripts/recorder/hot-driver.py` | 渲染式多帧捕获（不 await 触发 + `--fps` 8 连拍） |
| `scripts/recorder/render-video.mjs` | 帧序列 clip + `tpad` 冻结补满 holdMs |
| `skill/excel-desktop-recorder/references/tts.md` | 规则 4 紧凑式 / 规则 5 / `--rate` 口径 |
| `courses/*.json` | `gapMs: 400`；vlookup 收尾总结收短 |

## 要点（hand-off 给下游）

1. **动作从哪来**：hot-driver 动作段触发**不 await**（`page.evaluate("() => { Lesson.gotoStep(n); return null; }")`）
   + 窗口 `min(holdMs, 2400ms)` 内 8fps 连拍；render-video 按 fps 重放、`tpad=stop_mode=clone`
   冻结到 holdMs——出片确定性不变（同 plan 复跑同帧）。
2. **<30s 的四把刀**：语速 +25%（默认，`--rate "+0%"` 还原）/ 参数口播紧凑式（`参数：查找值、…`）/
   开篇只念一句话（SQL 解释上屏不念，`--full` 全念）/ gapMs 800→400。
   换语速/换音色必须重合成重测（节奏由语音驱动）。
3. **edge 混声坑**：edge-tts 偶发网络超时会单段降级 sapi——音色跳变比慢更伤；已加重试，
   复跑 plan 看 `degraded: null` 才算干净。
4. 应用侧动画本来就自动播放（lesson.js boot `play()`，先看动画→手动练习）——用户看到的
   「没动作」是旧出片定帧问题，非应用问题。

## 下游接线

- 展示层 `src/standalone/public/showcase/*.mp4` 已覆盖为新片（render-video 自动登记 demo）；
- 新课出片照旧四步（README 一图流），动作/节奏开箱即得；
- 进阶欠账见 deferred #1/#2/#4（抓窗式节奏、鼠标编排、逐参数高亮）。
