# task-02 · verify（验证记录）

验证时间：2026-11-08 · 执行者：Claude Code

命令与实际输出：

```
$ node scripts/recorder/render-video.mjs --plan out/vlookup-basic/plan.json
✓ 成品 out/vlookup-basic/vlookup-basic.mp4
  流 video/h264 + audio/aac｜画幅 1280x802
  时长 17552ms vs 计划 ΣholdMs 17552ms（偏差 0.0%，<5% ✓）
```

## 验证点 1 · 渲染式逐帧重演

- **证据**：hot-driver.py 载入课程页（Lesson 复位停表→gotoStep(1..4) 逐拍推进、
  状态累积）截全页帧 4 张（out/vlookup-basic/frames/step-1..4.png，1280x802）。
- **结论**：**PASS**（3/4 步依赖前序写入，状态累积口径正确）

## 验证点 2 · ffmpeg 合成 + 时长

- **证据**：逐段 clip 定长（脚本内每段 ±0.15s 断言过）→ concat（显式清单+尾段
  重复，pitfall #4）→ 挂 narration.wav → h264+aac；成品 17552ms = Σ holdMs
  17552ms，**偏差 0.0%**。
- **结论**：**PASS**

## 验证点 3 · 画幅与文字层

- **证据**：截全页（字幕/讲解卡在画面内，无需外挂字幕）→ 统一缩放 1280x偶数高
  （802）；`--ass` 可选口播叠加层（默认关）。
- **结论**：**PASS**

## 过程中发现并修复 1 个 bug

1. **服务探活误判**：Windows 原生 curl 不认 `/dev/null`（`-o /dev/null` 写错误
   exit 23，但响应码 200 已打印）→ 探活 20s 超时误报"服务未就绪"。改为平台空设备
   （win32 `NUL`）+ 只看响应码（FAIL→修复→复验 PASS）。

## 总结

3/3 PASS（1 FAIL→修复→复验）；渲染式全链（截帧→合成→成品）首跑即成。
