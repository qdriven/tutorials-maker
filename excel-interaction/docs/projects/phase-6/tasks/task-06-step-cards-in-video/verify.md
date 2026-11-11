# phase-6 · task-06 · verify（验证记录）

日期：2026-11-08。口径：命令 + 实际输出 + 结论，FAIL 也记。

## 验证点 1 · 步骤卡入片 + 时长/漂移不变

```
$ node scripts/recorder/render-video.mjs --plan out/vlookup-basic/plan.json
  流 video/h264 + audio/aac｜画幅 1280x800｜步骤卡 4 张
  时长 27500ms vs 计划 ΣholdMs 27456ms（偏差 0.2%，<5% ✓）
$ node scripts/recorder/render-video.mjs --plan out/sum-basic/plan.json
  流 video/h264 + audio/aac｜画幅 1280x800｜步骤卡 4 张
  时长 25104ms vs 计划 ΣholdMs 25104ms（偏差 0.0%，<5% ✓）
```

抽帧目检 `shots/card-step2.png`（vlookup t=12.4s）：右侧留白区悬浮步骤卡——
金色表头「第 2 步 · E2 · 输入框输入公式」+ `=VLOOKUP(D2,A2:B5,2,0)` +
参数1 D2 查找值：… / 参数2 A2:B5 查找区域：… / 参数3 2 列序数：… / 参数4 0 匹配方式：… +
预期行；与左侧验收框内容一致，不遮操作区/字幕条。

**结论：PASS**——分步讲解已入片；时长 <30s 不变（卡随段常驻，不占新时间）。

## 验证点 2 · 展示层去分步讲解

```
$ python docs/projects/phase-7/tasks/task-02-showcase-sidebar/drive-02.py
  {"点": "文章五节顺序（分步讲解已移除）", "值": ["sec-overview","sec-video","sec-practice","sec-summary","sec-build"]}
  {"点": "分步讲解节不存在", "值": true}
  {"点": "本课目录条目数", "值": 5}
  {"点": "切课后标题", "值": "SUM 求和：把一片区域加总"}
  console: 0 条
```

**结论：PASS**——五节固定（如何构建仍收尾），步骤内容只在视频里。

## 验证点 3 · 视频有声

```
$ ffmpeg -i out/vlookup-basic/vlookup-basic.mp4 -af volumedetect -f null NUL
  Stream #0:1: Audio: aac (LC), 22050 Hz, mono
  mean_volume: -20.6 dB    max_volume: -3.1 dB        ← mp4 音轨有声
$ python drive-02.py
  {"点": "视频有声播放（muted+paused）", "值": {"muted": false, "paused": false, "dur": 28}}
```

**结论：PASS**——文件有声 + 页面有声自动播（muted:false）。
根因留档：mp4 一直有声，「没声音」是展示页 `autoplay muted` 起播后未解除静音；
修复 = `playing` 事件即 `muted = false`（静音仅用于过 autoplay 策略）。

## 验证点 4 · pnpm verify 全绿

```
$ pnpm verify
  ✓ sum-basic.json ✓ vlookup-basic.json —— 2 份契约，2 通过 / 0 失败
  ✓ 清单校验通过：6 条（app/demo/doc）
```

**结论：PASS**。

## FAIL 记录（修复闭环）

1. **步骤卡墨底墨字不可见**：ASS `BorderStyle=3` 盒色取 `OutlineColour`（此 libass 实现；
   VSFilter 取 `BackColour`）——初版盒=墨、字=墨 → 只见黑块不见字。
   **修复**：Primary/Outline/Back 三色兼容设法——字奶油、盒两处都给墨（任一实现都可读），
   表头行金色 `{\c&H34CAFF&}`。
2. **右对齐盒子锯齿**：Alignment=6 逐行盒右缘齐、左缘参差（阶梯状）。
   **修复**：改 Alignment=4 左对齐（齐左、右侧自然参差）→ 成套步骤条观感。
3. **盘符冒号转义坑（潜在）**：`-vf ass=D:/…` 的 `:` 会被滤镜参数解析吃掉——
   **修复**：合成步 `cwd=workDir` + `ass=subs.ass` 相对路径，绕开转义。
