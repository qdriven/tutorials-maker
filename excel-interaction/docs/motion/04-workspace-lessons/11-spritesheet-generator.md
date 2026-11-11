# 11 · 精灵图生成器

> 这个仓库是像素/2D 动画的"帧序列打包器"：把多帧动画导出为精灵图（spritesheet），让像素动画在游戏与网页里高效播放——1,501 颗星说明它是像素动效生态的基础设施。

| 字段 | 值 |
| --- | --- |
| ID | `spritesheet-generator` |
| 顺序 | 11 |
| 短标题 | 精灵图生成器 |
| 分类 | 实战课 |
| 级别 | 进阶 |
| 时长 | 30 分钟 |
| 数据类型 | 教学模型 |
| 来源 | [NO6KIKO/gorest-2d-animation-spritesheet-generator](https://github.com/NO6KIKO/gorest-2d-animation-spritesheet-generator) |

**故事**：像素动画一帧一张图，直接按文件加载会卡成幻灯片。这个 skill 干的是"打包"：把帧序列按顺序拼进一张大图，声明行列、尺寸、间距与播放参数，让游戏引擎或前端代码都能按帧率播放。它不做动画本身，而是让像素动画"可被消费"的关键一环。

**学习目标**：学完能把一组帧序列打包成规范精灵图，并在网页里按目标帧率循环播放、验收不跳帧。

**技能**：精灵图打包，帧序列规范，逐帧播放，像素动画，帧率控制

**摘要**：精灵图是像素/2D 动画的交付格式：帧序正确、尺寸间距规范、播放无跳帧，本课把这三点做成验收线。

## 🎯 本课重点

- **重点用什么**：帧序列 → 精灵图的打包规则（行列、帧宽高、间距）与网页端逐帧播放的帧率控制。
- **完成什么**：一张可直接使用的精灵图 + 一个浏览器中循环播放它的 HTML 页面。

## 📦 配套数据

| 数据 | 文件 | 用途 |
| --- | --- | --- |
| 练习 prompt | [../data/lessons/spritesheet-generator/prompt.md](../data/lessons/spritesheet-generator/prompt.md) | 给 Agent 的练习 prompt |
| 验收清单 | [../data/lessons/spritesheet-generator/checklist.md](../data/lessons/spritesheet-generator/checklist.md) | 验收清单 |

## 🧱 基础操作

1. **装 skill**：`npx skills add NO6KIKO/gorest-2d-animation-spritesheet-generator`（或该仓库的实际安装方式）。
2. **读 skill 文档**：装完后让 Agent 读该 skill 的 SKILL.md，理解它约束了什么（帧序、帧尺寸、间距、输出格式）。
3. **发第一条 prompt**：用四要素（产出形态、时长/规模、动效类型、验收标准）。

## 🛠 实战操作

### 打包帧序列并在页面播放

1. **准备帧序列**：准备 8–12 帧等尺寸 PNG（如 64×64），按 `frame_00.png`、`frame_01.png` 顺序编号。
2. **生成精灵图**：让 Agent 按 skill 规范拼成一张精灵图，声明帧排列（如 4 列 × 2 行、帧宽高 64px、帧间距 0），并输出配套的尺寸说明。
3. **写播放页面**：用 `background-position` 关键帧逐帧切换，`steps(1)` 保证不插值，`animation-duration` 按目标帧率换算（如 8fps → 每帧 125ms）。

```css
.sprite {
  width: 64px;
  height: 64px;
  background: url('spritesheet.png') no-repeat;
  animation: play 1000ms steps(1) infinite; /* 8 帧、8fps */
}
@keyframes play {
  0%   { background-position: 0 0; }
  100% { background-position: -512px 0; } /* 8 帧 × 64px，横向排列 */
}
```

### 验收

1. 精灵图帧顺序与源帧一致，逐帧比对无错位、无缺帧、无重复帧。
2. 尺寸/间距规范：帧宽高一致、行列与声明一致、无多余透明边框。
3. 页面循环播放无跳帧、无拖影（`steps(1)` 生效），播放帧率与设定一致。

## ✅ 总结

- 精灵图的价值是"格式契约"：帧序、尺寸、间距三要素写清楚，下游引擎才能正确消费。
- 网页端用 `steps(1)` + `background-position` 关键帧是像素动画的标准写法，帧率换算别搞反。
- 下一步：[12-motion-video-kit.md](12-motion-video-kit.md)
