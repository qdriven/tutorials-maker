# phase-6 · task-08 · verify（验证记录）

日期：2026-11-09。口径：命令 + 实际输出 + 结论，FAIL 也记。
取证跑（c3 系列）与 task-10 鼠标编排同车——段派发是节奏底座，鼠标是其上的装饰。

## 验证点 1 · 段派发全量 + 首尾段定格画面

```
$ node scripts/recorder/record.mjs --config courses/vlookup-basic.json --capture ...
  （uno-driver --pace 输出）
  paced: [intro, step1..step4, outro] 全量 6 段，逐段驻留 = holdMs
  paceStartMs: <开步墙钟>（前摇对齐钩子，task-10 消费）
```

抽帧核对（`shots/`，抓窗式实拍 2560×1494）：

- `shots/shot-intro-a1.png`（t=2.5s，intro 段内）：复位空闲态定格，选中 **A1**
  （首格 = intro 目标）——开篇总结口播期间画面不再抢跑进第 1 步；
- `shots/shot-outro-e2.png`（t=17.5s，outro 段内）：完成态定格，**E2 显示 王五**、
  编辑栏 =VLOOKUP(D2,A2:B5,2,0)、验收格选中——收尾口播期间画面稳在验收结果。

t=2.5 落在 intro holdMs（5576ms）内、t=17.5 落在 outro 段起点（15592ms→19728ms）内，
与 plan 时间轴一致，首尾口播音画同拍。

## 验证点 2 · 音画对齐（漂移 <5%）

抓窗式合成（record.mjs mux）：整片时长 = ΣholdMs 19728ms，漂移 0.0%（<5% ✓）。
首尾段定格参与 pacing 后，不再出现「口播还在念总结、画面已进第 1 步」的抢跑。

## 验证点 3 · 录屏式 intro 吞时长 bug 闭环（验证中发现，FAIL→修复→复测）

```
（修复前）浏览器录屏式实测 15960ms vs ΣholdMs 19728ms —— 漂移 19% ✗
  根因：hot-driver 实时路径 intro 分支无 remain 等待，复位完直接进步 1，
  intro holdMs 5576ms 整段被吞
（修复后，else-branch 补剩余等待）复测 0.0% 漂移 ✓
```

## 结论

1/2/3 全过。抓窗式与渲染式/录屏式同吃 `plan.segments` 全量；`paceStartMs` 钩子
留给 task-10 前摇裁剪。录屏式 intro bug 为验证中发现的同类问题，一并闭环。
