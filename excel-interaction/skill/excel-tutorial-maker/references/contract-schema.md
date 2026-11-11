# 课程契约 schema（course contract）

`courses/<id>.json` 是唯一事实源：教程生成技能写它，生成器读它出动画课，
录屏出片技能读它出讲解视频。**任何单产物专属配置都不得进入契约**。

## 顶层结构

```jsonc
{
  "id": "sum-basic",              // 短横线小写；即目录名 apps/<id>/ 与 out/<id>/ 的 <id>
  "title": "SUM 汇总：三个月销售求和",
  "level": "初级",                 // 初级 | 中级 | 高级
  "durationMin": 5,                // 预估学习时长（分钟）
  "theme": "green",                // kimi（格数同款）| green（Excel 绿）
  "engine": "handsontable",        // handsontable | univer | onlyoffice
  "seed": "seeds/sum-basic.md",    // 原始教程文本相对路径（courses/ 下）
  "data": { ... },                 // 样例数据（见下）
  "guide": [ ... ],                // 4 步指南（见下）
  "formulaArgs": [ ... ],          // 公式参数逐位说明（见下，公式课必写）
  "summary": { ... },              // 一句话总结/解释/收尾总结（见下）
  "checks": [ ... ],               // 验收（见下）
  "narration": { ... }             // 解说节奏（见下）
}
```

## data —— 样例数据

```jsonc
"data": {
  "sheets": [
    {
      "name": "月度数据",
      "cells": {
        "A1": "月份", "B1": "销售额",
        "A2": "1月", "B2": 1200,
        "A3": "2月", "B3": 1500,
        "A4": "3月", "B4": 900
      }
    }
  ]
}
```

- 单元格 key 是 A1 记法；值为字符串时按文本，数字直接写数字。
- **第 1 行约定为表头行**（渲染为金底表头带，格数样式；查找范围从第 2 行起）。
- 公式不放 data，放 guide/checks——数据与计算分离。

## guide —— 4 步指南（核心）

每步**四要素**，缺一不可：

| 字段 | 含义 | 示例 |
| --- | --- | --- |
| `cell` | 单元格地址 | `"B5"` |
| `menu` | 菜单路径/操作入口 | `"选中 B5"` / `"公式 → 自动求和"` |
| `formula` | 公式原文（无公式步写动作描述） | `"=SUM(B2:B4)"` |
| `expect` | 验收结果（回读口径） | `"B5 显示 3600"` |

```jsonc
"guide": [
  { "step": 1, "cell": "B5", "menu": "选中 B5", "formula": "定位汇总单元格", "expect": "B5 被选中，输入框激活" },
  { "step": 2, "cell": "B5", "menu": "输入框输入公式", "formula": "=SUM(B2:B4)", "expect": "B5 显示公式原文" },
  { "step": 3, "cell": "B5", "menu": "回车确认", "formula": "=SUM(B2:B4)", "expect": "B5 显示 3600" },
  { "step": 4, "cell": "B5", "menu": "双击查看公式", "formula": "=SUM(B2:B4)", "expect": "单元格回显 =SUM(B2:B4)" }
]
```

规则：

- 固定 **4 步**（选中 → 输入 → 确认 → 复核）；教程步骤多于 4 步时归并，不足时补复核步。
- `expect` 必须是**可回读**的验收（"显示 3600"），不是主观描述（"看起来对了"）。
- `narration`（可选）：该步解说词；不写则按无废话规则从四要素派生。

## formulaArgs —— 公式参数逐位说明

公式每个位置的参数是什么，教程必须说明（用户反馈项）。参数说明进契约单源，
动画课的验收框折叠面板/字幕、手动练习提示都从这里渲染：

```jsonc
"formulaArgs": [
  { "part": "D2", "meaning": "查找值：要找的工号（在 D2）" },
  { "part": "A2:B5", "meaning": "查找区域：首列是工号，第二列是姓名" },
  { "part": "2", "meaning": "列序数：返回查找区域的第 2 列（姓名）" },
  { "part": "0", "meaning": "匹配方式：0=精确匹配（必须写）" }
]
```

- 数组顺序 = 参数在公式中从左到右的出现顺序。
- `part` 必须是 guide 公式原文里出现的参数片段（check-manifest 校验）。
- `meaning` 一句话（这个位置放什么 + 关键注意点）；教程提炼人工写入，不查表自动生成。
- 录像出片的参数口播从同一字段派生：挂在首个 `formula` 以 `=` 开头的步骤，
  `参数：<part> 是 <meaning>；…` 追加进口播（不走无废话修剪 2–3，规则 4 归
  [tts.md](../../excel-desktop-recorder/references/tts.md)）。

## summary —— 一句话总结 / 解释 / 收尾总结

教学结构 = **一句话总结 → 解释 → 4 步动画 → 结束再总结**（用户反馈项）。
三个作者定稿短句进契约单源，动画课开篇拍/面板/收尾与出片口播首尾段都从这里渲染：

```jsonc
"summary": {
  "oneLiner": "VLOOKUP：拿一个值，去一个范围里查它在哪一行，取回那一行的另一列。",
  "explain": "就像写 SQL：SELECT 姓名 FROM 员工表 WHERE 工号 = 1003，按工号查姓名。",
  "outro": "总结：用关键字段的值，在范围里找到匹配的那一行，取回那一行的其他字段。"
}
```

- `oneLiner` 一句话说清作用，用最简单的话（忌术语堆叠）；`explain` 解释它
  （SQL 等价式最方便说明）；`outro` 动画结束后的收尾总结，与 oneLiner 呼应、同样短。
- 整块可选：不写则课无开篇/收尾拍，出片时间线退回纯 4 步。
- 口播采用原文（作者定稿，不走无废话修剪）；`explain` 若含 SQL/公式式片段，
  按 [tts.md](../../excel-desktop-recorder/references/tts.md) 口径仍照念——
  作者自会把句子写成可读可念。

## checks —— 验收

```jsonc
"checks": [
  { "cell": "B5", "formula": "=SUM(B2:B4)", "value": 3600 }
]
```

- `formula` 与 `value` 二者至少其一；与 guide 的公式/expect 必须一致。
- 生成器据此做自动化断言（写公式 → 回读值比对）。

## narration —— 解说节奏

```jsonc
"narration": {
  "style": "brief",   // brief（默认，无废话）| full（逐字）
  "gapMs": 800        // 步间静默
}
```

无废话修剪规则归录屏出片技能所有（[tts.md](../../excel-desktop-recorder/references/tts.md)），
契约只声明风格与节奏参数。

## theme token（两套）

| token | `kimi` 格数同款 | `green` Excel 绿 |
| --- | --- | --- |
| 背景/卡片/表格纸面 | cream 纸面（#f8f8ea / #fcfcf2 / #fefdf6） | 浅灰白 / 白 / 白 |
| 主文字 | 墨 #363e40 | 深灰 |
| 强调（选区/链接/当前步） | 蓝 #48699b | 品牌绿 #217346 |
| 填充（表头带/步码/总结框） | 金 #ffca34 | 赭金 #c8862a |
| 字体气质 | Avenir Next+苹方+等宽公式 | 系统 UI |

`kimi` 仅是内部 token 代号——风格本身是**格数同款**（cream 纸面 + 墨线小圆角 +
金作填充 + 蓝作强调，无阴影无渐变）。具体 CSS 变量实现随模板，契约只引用主题名。
