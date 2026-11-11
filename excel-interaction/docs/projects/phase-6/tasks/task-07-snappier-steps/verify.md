# phase-6 · task-07 · verify（验证记录）

日期：2026-11-09。口径：命令 + 实际输出 + 结论，FAIL 也记。

## 验证点 1 · 每步 -2s、总时长下降、漂移 <5%

```
$ node scripts/recorder/build-plan.mjs --config courses/vlookup-basic.json --tts edge
  开篇段 5576ms｜第 1 步 1520ms｜选中 E2
  第 2 步 4520ms｜参数：查找值、查找区域、列序数、匹配方式
  第 3 步 1544ms｜回车确认｜第 4 步 2432ms｜选中 E2 查看编辑栏
  收尾段 4136ms｜总时长 19728ms（19.7s）
$ node scripts/recorder/build-plan.mjs --config courses/sum-basic.json --tts edge
  第 1 步 1568ms｜选中 C2｜第 2 步 2120ms｜参数：求和区域
  第 3 步 1544ms｜回车确认｜第 4 步 2480ms｜选中 C2 查看编辑栏
  总时长 17232ms（17.2s）
$ node scripts/recorder/render-video.mjs --plan out/vlookup-basic/plan.json
  步骤卡 4 张｜时长 19728ms vs ΣholdMs 19728ms（偏差 0.0%，<5% ✓）
$ node scripts/recorder/render-video.mjs --plan out/sum-basic/plan.json
  步骤卡 4 张｜时长 17300ms vs ΣholdMs 17232ms（偏差 0.4%，<5% ✓）
$ node scripts/recorder/qc.mjs --plan out/<id>/plan.json --shots 4   （双课）
  ✓ qc 全过（各抽帧 6 张）
```

对照基线（task-18 出片）：vlookup 27.5s→**19.7s**（-7.8s，4 步共 -2.0/-2.2/-2.0/-1.2s）；
sum 25.1s→**17.3s**（-7.8s）——每步约 -2s 达成，均 <30s。

抽帧目检（qc/step-2-mid.png、step-3-mid.png）：步骤卡正常（金头/公式/参数/预期），
SUM 第 3 步卡不重复参数行（参数只挂首个公式步）。

**结论：PASS**。

## 验证点 2 · 口播内容改制

plan.json 逐步 narration：`选中 E2` / `参数：查找值、查找区域、列序数、匹配方式` /
`回车确认` / `选中 E2 查看编辑栏`（公式步动作名已被参数清单替代）；
开篇/收尾不变（oneLiner / outro 照念）。

**结论：PASS**。

## 验证点 3 · 页面验收 + 全量校验

```
$ python docs/projects/phase-7/tasks/task-02-showcase-sidebar/drive-02.py
  文章四节顺序 [sec-overview, sec-video, sec-practice, sec-summary] ✓
  分步/构建节不存在 ✓ · 页面无构建命令文本 ✓ · 目录 4 条 ✓
  视频有声播放 {"muted": false, "paused": false, "dur": 20} ✓ · console 0 条
$ pnpm verify
  必需 6/6 通过 · 2 份契约 2 通过 / 0 失败 · 清单 6 条通过
```

**结论：PASS**。

## FAIL/自查记录

1. **`--full` 参数口播被早返回丢弃（自查拦截，未出片）**：改写 narrationForStep 时
   full 分支提前 return，argNote 没接上——与 tts.md 规则 4「--full 逐字式含参数」相悖。
   **修复**：full 分支 `body + "。" + argNote` 拼接后才返回；随后才重跑出片链。
