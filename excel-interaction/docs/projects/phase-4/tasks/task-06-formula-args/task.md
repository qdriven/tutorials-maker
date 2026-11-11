# task-06 · 公式参数逐位说明（formulaArgs）

## 做什么

用户反馈：教程里公式函数（如 `=VLOOKUP(D2,A2:B5,2,0)`）**每一个位置的参数没有说明**，
学员看公式不知道每段是什么。要求在教程/文字里，或在验收里加上参数提示。
做契约级 `formulaArgs`（公式参数逐位说明）字段 + 生成课界面显示 + 验收提示。

## 功能定义

1. **契约字段 `formulaArgs`**（顶层，可选但公式课必填）：参数出现顺序的数组，
   每项 `{ "part": "D2", "meaning": "查找值：要找的工号" }`——`part` 是公式原文里的
   参数片段，`meaning` 是一句话说明。与 guide 的公式同源（只描述真实公式步）。
2. **教程文字显示**（lesson.js render）：guide 卡片中公式行（formula 以 `=` 开头的步）
   下方渲染参数说明行（`part` 高亮 + meaning），caption 字幕在公式步追加
   `｜参数 D2=查找值、…`。
3. **验收提示**（手动练习）：practice 引导语在参考公式后附参数说明；✗ 提示同口径。
4. **一致性校验**（check-manifest.mjs）：formulaArgs 若存在——非空、每项含
   part/meaning、part 必须出现在 guide 某条以 `=` 开头的公式原文中。

## 验证点

1. 契约含 formulaArgs 且校验过：`node scripts/tutorial/check-manifest.mjs` EXIT=0；
   反例（part 不在公式中）被拒。
2. 浏览器实见：guide 卡片显示 4 条参数说明（D2/A2:B5/2/0 逐位），截图取证。
3. caption 公式步带参数说明；手动练习引导语带参数说明。
4. 回归：自动播放四步动效正常、验收 ✓、console 零报错、确定性 grep 干净、
   `pnpm verify` EXIT=0。

## 前置与依赖

- task-02（模板 lesson.js/check-manifest 为挂载点）、task-03（试点契约内容）。

## 范围外

- 函数语法/参数文档的自动生成（参数说明由教程提炼人工写入契约，不做查表）。
- 录像出片（phase-6）的参数口播——narration 派生规则归 recorder 技能。
