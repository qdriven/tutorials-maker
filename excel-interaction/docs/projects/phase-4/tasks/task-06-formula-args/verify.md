# task-06 · verify（验证记录）

验证时间：2026-11-08 · 执行者：Claude Code

取证：check-manifest 正/反例 + [drive-args.py](drive-args.py)（Playwright）；
截图 [shots/](shots/)；机器可读结果 [result.json](result.json)。全绿 JSON（要点摘录）：

```json
{"args_cards": [{"step": "1", "args": null},
  {"step": "2", "args": "参数：D2 查找值：要找的工号（在 D2） · A2:B5 查找区域：首列是工号，第二列是姓名 · 2 列序数：返回查找区域的第 2 列（姓名） · 0 匹配方式：0=精确匹配（必须写）"},
  {"step": "3", "args": "…（同上）"}, {"step": "4", "args": "…（同上）"}],
 "caption_step2": "第 2 步 · 输入框输入公式｜单元格 E2｜公式 =VLOOKUP(D2,A2:B5,2,0)｜参数 D2=查找值：…、0=匹配方式：0=精确匹配（必须写）｜预期 E2 显示公式原文…",
 "practice_caption": "手动练习：…参考公式：=VLOOKUP(D2,A2:B5,2,0)｜参数 D2=查找值：…",
 "finish_caption": "✓ 验收通过：E2 显示 王五…", "state": {"step": 5, "mode": "auto"},
 "console_errors": []}
```

## 验证点 1 · 契约校验正/反例

- **命令**：`node scripts/tutorial/check-manifest.mjs`（正例）；反例契约
  formulaArgs.part=`C9:Z9`（不在公式中）再跑一次。
- **实际输出**：正例 `✓ vlookup-basic.json … 1 通过 / 0 失败` EXIT=0；反例
  `✗ _tmp-bad-args.json - formulaArgs[0].part 不在公式原文中：C9:Z9` EXIT=1
  （临时契约已删）。
- **结论**：**PASS**（一致性校验两向都灵）

## 验证点 2 · guide 卡片参数逐位说明（浏览器实见）

- **证据**：公式步（2/3/4）卡片公式行下方渲染 4 条 `part=meaning`（D2/A2:B5/2/0
  逐位，part 橙红高亮）；非公式步（step 1）不渲染（args=null）。
  shots/guide-args.png 画面确认可读。
- **结论**：**PASS**

## 验证点 3 · 字幕与验收提示

- **证据**：gotoStep(2) 字幕含 `｜参数 D2=查找值：…`；手动练习引导语含
  `参考公式：=VLOOKUP(D2,A2:B5,2,0)｜参数 …`（shots/caption-args.png）。
- **结论**：**PASS**（教程文字 + 验收提示两处都有参数提示）

## 验证点 4 · 回归

- **证据**：自动播放四步 → `state={"step":5,"mode":"auto"}`、`✓ 验收通过：E2 显示 王五`；
  `console_errors: []`；确定性 grep 干净；`pnpm verify` EXIT=0。
- **结论**：**PASS**

## 过程记录

实现一次成型，正/反例 + 浏览器 4 项首跑全绿（无 FAIL 记录）。
