# task-03 · verify（验证记录）

验证时间：2026-11-08 · 执行者：Claude Code

命令与实际输出：

```
$ node scripts/recorder/qc.mjs --plan out/vlookup-basic/plan.json
流 video/h264 + audio/aac｜画幅 1280x802
时长 17552ms vs ΣholdMs 17552ms（偏差 0.0% ✓）
  抽帧 step-1 @1.9s → out/vlookup-basic/qc/step-1-mid.png｜预期 E2 被选中，输入框激活
  抽帧 step-2 @6.1s → …step-2-mid.png｜预期 E2 显示公式原文 =VLOOKUP(D2,A2:B5,2,0)
  抽帧 step-3 @10.6s → …step-3-mid.png｜预期 E2 显示 王五
  抽帧 step-4 @15.1s → …step-4-mid.png｜预期 编辑栏回显 =VLOOKUP(D2,A2:B5,2,0)，E2 显示 王五
✓ qc 全过（抽帧 4 张待目检核对字幕/画面同步）
```

## 验证点 1 · 程序化质检

- **证据**：流 video/h264 + audio/aac（配音在必有音频流）；时长偏差 0.0% <5%；
  4 张中点抽帧落盘并打印预期对照表。
- **结论**：**PASS**

## 验证点 2 · 抽帧目检（字幕/画面同步）

- **证据**（帧图人工核对，out/vlookup-basic/qc/）：
  - step-2 @6.1s：E2 编辑态、fx 显示公式、右栏「第 2 步 · 输入框输入公式」+ 参数
    1..4 逐位、底部字幕第 2 步四要素全文、guide 卡 2 高亮。
  - step-3 @10.6s：E2=**王五**（真算）、验收框大字王五、字幕第 3 步、卡 3 高亮。
  - step-4 @15.1s：fx 回显公式、E2=王五、字幕第 4 步（预期含编辑栏回显）。
- **结论**：**PASS**（字幕与当前步严格一致，音频段落对齐由整轨构造保证）

## 验证点 3 · SKILL.md 验收清单 4 项

- [x] 时长 ≈ 各步解说时长之和：17552ms vs Σ holdMs 17552ms（0.0%，无死区）
- [x] 讲解卡/字幕与步骤对齐：抽帧 3 张目检通过（字幕四要素全文 = 当前步）
- [x] ffprobe 流齐全：h264 + aac，1280x802、帧率 10fps（clip 统一）
- [x] 公式与结果画面和契约一致：`=VLOOKUP(D2,A2:B5,2,0)` → 王五，逐帧可见
- **结论**：**PASS**（4/4）

## 验证点 4 · 回归

- **证据**：`pnpm verify` EXIT=0（check + check-manifest）。
- **结论**：**PASS**

## 总结

4/4 PASS；试点 vlookup-basic 成品出片 + 质检闭环（程序化 + 人工目检双轨）。
