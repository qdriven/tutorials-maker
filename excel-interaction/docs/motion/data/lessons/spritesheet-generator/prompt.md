# 精灵图生成器 · 练习 prompt

> 给 Agent 的练习指令。用四要素：产出形态、时长/规模、动效类型、验收标准。

## prompt

用 gorest spritesheet-generator 给一组帧序列生成精灵图并在页面播放。产出形态：1 张精灵图（PNG）+ 1 个 HTML 播放 demo；规模：8–12 帧的帧序列。请让生成器把多帧打包成一张精灵图（注意帧顺序、单元格尺寸与间距规范），再用 CSS/JS 播放该精灵图（steps() 或逐帧切换）。播放要流畅无跳帧。可与像素/2D 动效配合使用。验收标准见 checklist.md。

## 使用方式

1. 装好对应 skill（见课程文档）。
2. 把上面的 prompt 发给 Agent。
3. 按 checklist.md 验收。
