# task-02 · output（产出交接）

## 什么功能完成了

**渲染式出片**（默认模式，锁屏/CI 可跑）：录制计划 → hot 引擎 DOM 重演逐帧截图 →
ffmpeg 合成 mp4（h264+aac，语音驱动节奏）。vlookup-basic 成品 17.6s、时长偏差
0.0%。

## 产出清单

| 文件 | 作用 |
| --- | --- |
| `scripts/recorder/hot-driver.py` | hot 引擎（web 课程页）逐帧驱动：Lesson.gotoStep 逐拍重演 + 全页截图 |
| `scripts/recorder/render-video.mjs` | 渲染式管线：起 serve→驱动截帧→逐段定长 clip→concat→挂 TTS 音轨→成品 + 数字自检 |

## 要点（hand-off 给下游）

1. **截全页而非视口**：字幕/讲解卡/验收框都在画面内——不需要外挂字幕层
   （pitfall #1 的 drawtext/ass 对应场景是真机录制；`--ass` 保留口播叠加选项）。
2. **帧高 > 视口高**（802 vs 800）：逐段 encode 时统一 `scale=W:偶数高`，保证
   concat `-c copy` 参数一致（尾帧坑对策：显式清单 + 尾段重复 + 每段 ±0.15s 断言）。
3. **确定性重演**：hot-driver 先 `Lesson.reset()` 停掉自动播放，再 1→4 顺序
   gotoStep（状态累积：commit/readback 依赖前序步），每步截 settle 帧。
4. **服务探活**：win32 curl 空设备用 `NUL`（原生 curl 对 `/dev/null` 写错误
   exit 23，响应码仍输出——判定只看响应码）。

## 下游接线

- task-03 qc.mjs 吃 plan + 成品做质检（流/时长/抽帧）。
- task-04 record.mjs（抓窗式/浏览器录屏式）与驱动层同目录落位。
- 出片命令链：`pnpm plan -- --config courses/<id>.json` → `pnpm video -- --plan out/<id>/plan.json` → `pnpm qc -- --plan out/<id>/plan.json`。
