# task-11 · 一句话总结 + 解释 + 收尾总结（summary）

## 背景（用户反馈）

用户原话：「需要一句话总结 vlookup 作用是什么，用最简单的话说明，然后解释，然后最后
动画结束后再总结，vlookup就是通过一个关键字段的值去查找在一个范围内匹配的关键字值的
那一行的其他字段……总之要简短，实际上这个东西如果使用 SQL 方式会更方便说明」。

要求解读：教学结构 = **一句话总结（最简单的话）→ 解释（SQL 视角）→ 4 步动画 →
结束再总结**；文案要短；收尾总结用「关键字段的值→范围内匹配那一行→取回其他字段」
的说法（或近似说法）。

## 做什么

1. **契约 `summary` 字段**（单源双产物）：`oneLiner`（一句话）/ `explain`（解释，
   SQL 视角）/ `outro`（收尾总结）——作者定稿短句，contract-schema.md 补定义。
2. **课内渲染**（handsontable 模板）：
   - 开篇拍：play() 先驻留 INTRO_MS（一句话+解释入眼入字幕），再进 4 步；
   - 面板常驻 intro 框（自动播放态顶部，动画中可回读）；
   - done 态追加「总结」框（动画结束后再总结）。
3. **出片接线**（契约双产物）：build-plan 时间线加 intro/outro 口播段（TTS+holdMs
   并入 narration 整轨）；hot-driver 按段派发截帧（intro=空闲态、outro=finish 态）；
   render-video/qc/record 按 segments 时间线走。

## 文案（简短）

- oneLiner：VLOOKUP：拿一个值，去一个范围里查它在哪一行，取回那一行的另一列。
- explain：就像写 SQL：SELECT 姓名 FROM 员工表 WHERE 工号 = 1003，按工号查姓名。
- outro：总结：用关键字段的值，在范围里找到匹配的那一行，取回那一行的其他字段。

## 验证点

1. 课内：reset 空闲态——面板 intro 框（一句话+解释）+ 字幕开篇文；play() 开篇拍
   期间 step 仍为 0（驻留生效）；finish() 后面板「总结」框 + 字幕 ✓+总结。
2. 常驻/回归：gotoStep(2) intro 框仍在、folds=[f,t,f,f]；练习态不剧透语义不变。
3. 出片：`pnpm plan` 时间线 6 段（intro+4 步+outro）口播整轨对齐；`pnpm video`
   漂移 <5%；`pnpm qc` 抽帧 6 张（intro-mid/step-n-mid/outro-mid）目检开篇/收尾入片。
4. 回归：确定性 grep、`pnpm verify` EXIT=0、console 零报错。
