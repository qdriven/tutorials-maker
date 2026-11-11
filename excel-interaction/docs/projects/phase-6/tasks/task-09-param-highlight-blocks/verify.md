# phase-6 · task-09 · verify（验证记录）

日期：2026-11-09。口径：命令 + 实际输出 + 结论，FAIL 也记。

## 验证点 1 · paramBlocks 分布（Σ块 = holdMs）

```
$ node -e "const p=require('./out/vlookup-basic/plan.json'); console.log(p.segments.find(s=>s.n===2).paramBlocks)"
  [{i:0,ms:969},{i:1,ms:1291},{i:2,ms:969},{i:3,ms:1291}]   （holdMs 4520，Σ=4520 ✓）
```

权重核对：formulaArgs 标签「查找值/查找区域/列序数/匹配方式」= 3:4:3:4 字符，
4520ms 按占比切 969/1291/969/1291（末块吃余数）——分布正确。

## 验证点 2 · 出片帧逐块高亮推进（抽帧取证）

渲染式 fps=8：第 2 步 36 帧 = 8/10/8/10（`round(ms×fps/1000)` 逐块）。
帧→块映射：000-007=参数1、008-017=参数2、018-025=参数3、026-035=参数4。

- `shots/shot-param1-focus.png`（seg-2-004）：步骤卡「参数1 D2 查找值：…」行金底加粗 ✓
- `shots/shot-param4-focus.png`（seg-2-030）：「参数4 0 匹配方式：…」行金底加粗 ✓

中间帧抽查（seg-2-010）：「参数2 A2:B5 查找区域」行金底——块间切换按序推进，
画面随口播从参数1 走到参数4，达成「拆段驻留」目标。

## 验证点 3 · 总时长不变（拆段只切驻留）

```
$ node scripts/recorder/render-video.mjs --plan out/vlookup-basic/plan.json
  步骤卡 4 张｜时长 19728ms vs ΣholdMs 19728ms（偏差 0.0%，<5% ✓）
```

对照 task-07 基线（同 plan）：19728ms 一字不差——拆段零时长代价。

## 验证点 4 · 回归

`pnpm verify` 全绿（收尾批次复跑；lesson.js 共享源 focusParam 改动无回归）。

## 结论

1/2/3/4 全过。逐参数高亮在 DOM（`.sd-arg.is-focus`）与 ASS（块内行加粗金）双实现，
交互课与视频同步受益；总时长不变。
