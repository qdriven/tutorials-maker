# 装 skill · 练习 prompt

> 给 Agent 的练习指令。用四要素：产出形态、时长/规模、动效类型、验收标准。

## prompt

请演示一个动效 skill 的三种安装方式，并逐一验证。方式一：npx skills add，按交互提示选择 skill 并确认安装。方式二：把仓库 URL 直接发给 Agent，由它读取仓库中的 SKILL.md 完成安装。方式三：/plugin marketplace add，从 marketplace 添加 skill。产出形态：三份安装记录，各含所用命令、关键输出摘要和验证结果。时长/规模：每种方式控制在 5 分钟以内，全程约 15 分钟。动效类型：不限，任选一个网页动效 skill 作为安装对象。验收标准：三种方式都能成功装好；每种都有有效验证（/skills 能看到该 skill，或能读到 SKILL.md 头部元数据）；记录安装中遇到的问题与解决办法。

## 使用方式

1. 装好对应 skill（见课程文档）。
2. 把上面的 prompt 发给 Agent。
3. 按 checklist.md 验收。
