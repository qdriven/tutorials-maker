# task-11 · output（产出交接）

## 什么功能完成了

**一句话总结 + 解释 + 收尾总结**（用户反馈：用最简单的话说明 VLOOKUP 作用、然后解释、
动画结束后再总结，要简短；SQL 方式说明更方便）——教学结构定型为
**一句话 → 解释 → 4 步动画 → 结束再总结**，契约 `summary` 单源双产物：

- **oneLiner**：VLOOKUP：拿一个值，去一个范围里查它在哪一行，取回那一行的另一列。
- **explain**（SQL 视角）：就像写 SQL：SELECT 姓名 FROM 员工表 WHERE 工号 = 1003，按工号查姓名。
- **outro**（用户说法整理）：总结：用关键字段的值，在范围里找到匹配的那一行，取回那一行的其他字段。

## 产出清单

| 文件 | 作用 |
| --- | --- |
| `courses/vlookup-basic.json` + `examples/course.example.json` | `summary` 字段（oneLiner/explain/outro） |
| `skill/.../references/contract-schema.md` | summary 字段定义（可选；缺省退回纯 4 步） |
| `skill/.../SKILL.md` | 契约摘要 + 验收清单补项 |
| `templates/handsontable/lesson.js` | 开篇拍（play 驻留 4s）+ summary 框常驻 + done 总结框 + 字幕接线 |
| `templates/handsontable/theme.css` | `.sd-sum`/`.sd-outro` 总结框样式 |
| `scripts/recorder/build-plan.mjs` | 时间线 segments（intro→4 步→outro）+ 首尾段 TTS |
| `scripts/recorder/{hot-driver.py,render-video.mjs,qc.mjs,record.mjs}` | 按 segments 时间线派发/合成/质检 |

## 要点（hand-off 给下游）

1. **summary 契约字段**：三句作者定稿（oneLiner 最简单的话 / explain SQL 等价式 /
   outro 收尾总结），口播原文不走无废话修剪；整块可选，缺省出片退回纯 4 步时间线。
2. **plan.segments 时间线**：`intro → step1..4 → outro`（kind 字段派发）；
   `plan.steps` 保留 4 步本体——uno-driver（抓窗式）按步消费不受影响。
   **已知边界**：抓窗式/手动档只重演 4 步，intro/outro 口播段不参与 UNO 节奏
   （生产出片一律渲染式，pitfalls #6）。
3. **取证坑（驱动层）**：`evaluate("Lesson.play()")` 会 await 其返回 Promise——观测
   过程态须丢弃返回值；finish() 前必须先走完第 3 步（公式写入）否则验收 ✗ 入镜。

## 下游接线

- phase-7 展示层可直接读 `summary` 字段做课程卡片的「一句话」摘要；
- 后续新课契约按 SKILL.md 验收清单写 summary 三句。
