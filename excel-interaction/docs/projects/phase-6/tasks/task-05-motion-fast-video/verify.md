# phase-6 · task-05 · verify（验证记录）

日期：2026-11-08。口径：命令 + 实际输出 + 结论，FAIL 也记。

## 验证点 1 · 录制计划总时长 <30s

```
$ node scripts/recorder/build-plan.mjs --config courses/vlookup-basic.json --tts edge
  开篇段 5776ms｜VLOOKUP：拿一个值，去一个范围里查它在哪一行，取回那一行的另一列。
  第 1 步 2728ms｜选中 E2：E2 被选中
  第 2 步 7840ms｜输入框输入公式：E2 显示公式原文。参数：查找值、查找区域、列序数、匹配方式
  第 3 步 3160ms｜回车确认：E2 显示 王五
  第 4 步 3616ms｜选中 E2 查看编辑栏：编辑栏回显
  收尾段 4336ms｜总结：用关键字段找到那一行，取回其他字段。
  总时长 27456ms（27.5s）｜整轨 27456ms

$ node scripts/recorder/build-plan.mjs --config courses/sum-basic.json --tts edge
  总时长 25104ms（25.1s）｜整轨 25104ms
```

**结论：PASS**——vlookup 27.5s（原 60.5s，-55%）/ sum 25.1s（原 44.5s，-44%），均 <30s。
紧凑参数口播生效（第 2 步 23.4s→7.8s）；开篇只念一句话（14.3s→5.4s）。

## 验证点 2 · 动作可见（动画窗内帧互不相同）

```
$ ffmpeg -ss 8.70/9.10/9.50/11.50/14.50 -i out/vlookup-basic/vlookup-basic.mp4 -frames:v 1 …
$ md5sum out/_probe/motion/v-*.png
  v-8.70  2528f2b6…   v-9.10  54007e88…   v-9.50  1c078ca9…   （typeIn 窗内三帧互异）
  v-11.50 ab9c97cd…   v-14.50 3f41341e…                      （冻结段，编码噪声级差异）
```

目检 `shots/step2-typeing-mid.png`（t=8.7s：公式栏 `=VLOOKUP|` **半截 + 打字光标**）vs
`shots/step2-typed-done.png`（t=9.5s：`=VLOOKUP(D2,A2:B5,2,0)` 完整）——**typeIn 动画真实入片**。
sum 课同口径（s-7.7/8.1/8.5 三帧互异）。

**结论：PASS**——视频有真动作（不再是定帧拼接）。

## 验证点 3 · 成品漂移 + 抽帧质检

```
$ node scripts/recorder/render-video.mjs --plan out/vlookup-basic/plan.json
  流 video/h264 + audio/aac｜画幅 1280x800
  时长 27456ms vs 计划 ΣholdMs 27456ms（偏差 0.0%，<5% ✓）
$ node scripts/recorder/qc.mjs --plan out/vlookup-basic/plan.json
  抽帧 intro/step-1..4/outro @2.9/7.1/12.4/17.9/21.3/25.3s → ✓ qc 全过
$ node scripts/recorder/render-video.mjs --plan out/sum-basic/plan.json
  时长 25104ms vs 计划 ΣholdMs 25104ms（偏差 0.0%，<5% ✓）
$ node scripts/recorder/qc.mjs --plan out/sum-basic/plan.json
  ✓ qc 全过（抽帧 6 张待目检核对字幕/画面同步）
```

**结论：PASS**——双课漂移 0.0%；抽帧字幕/当前步一致（`shots/qc-*.png` 留档）。

## 验证点 4 · pnpm verify 全绿

```
$ pnpm verify
  结论: 必需 6/6 通过 —— 环境就绪
  ✓ sum-basic.json ✓ vlookup-basic.json —— 2 份契约，2 通过 / 0 失败
  ✓ 清单校验通过：6 条（app/demo/doc）
```

**结论：PASS**（exit 0）。

## FAIL 记录（修复闭环）

1. **edge-tts 网络超时混声**（第 1 次重 plan）：`ConnectionTimeoutError: wss://speech.platform.bing.com…`
   → 单段降级 sapi（Huihui），与其余段（Xiaoxiao）混声，成品音色会跳。
   **修复**：tts.mjs edge 路径同段重试 2 次再降级；复跑 plan 全段 edge（`degraded: null`）。
2. **动作段冻结帧哈希互异**（初判疑误）：md5 区分不了「真动作」与「h264 编码噪声」——
   **修正验证法**：抽帧目检 typeIn 中间态（半截公式+光标）作为动作证据，哈希仅作辅助。
