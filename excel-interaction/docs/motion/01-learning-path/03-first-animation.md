# 03 · 第一个动画：从 prompt 到可验收的成片

> 装好 skill 之后，最容易翻车的是 prompt 写得太含糊。本课用一个最小闭环（选 skill → 写 prompt → 验收）跑通第一个动画。

| 字段 | 值 |
| --- | --- |
| ID | `first-animation` |
| 顺序 | 3 |
| 短标题 | 第一个动画 |
| 分类 | 学习路径 |
| 级别 | 入门 |
| 时长 | 15 分钟 |
| 数据类型 | 教学模型 |
| 来源 | [Vincentwei1021/video-shotcraft](https://github.com/Vincentwei1021/video-shotcraft)、[oil-oil/oil-motion](https://github.com/oil-oil/oil-motion) |

**故事**：你装了 oil-motion，对 Agent 说"做个动画"。Agent 反问你"什么动画？给谁看？多长？"——这不是 Agent 笨，是 prompt 缺了验收口径。一个好 prompt 要写清"产出形态、时长、动效类型、验收标准"。

**学习目标**：学完能写一个可验收的动画 prompt，并跑通"装 skill → 生成 → 验收"的最小闭环。

**技能**：prompt 四要素（产出形态、时长、动效类型、验收标准）、最小闭环、验收清单

**摘要**：一个好 prompt = 产出形态 + 时长 + 动效类型 + 验收标准。跑通最小闭环后，再逐步加复杂。

## 🎯 本课重点

- **重点用什么**：prompt 四要素；最小闭环（装 skill → 生成 → 验收）。
- **完成什么**：写出一个可验收的 prompt，让 Agent 产出第一个动画并按清单验收。

## 📦 配套数据

| 数据 | 文件 | 用途 |
| --- | --- | --- |
| 练习 prompt | [../data/lessons/first-animation/prompt.md](../data/lessons/first-animation/prompt.md) | 可直接复制的 prompt 模板 |
| 验收清单 | [../data/lessons/first-animation/checklist.md](../data/lessons/first-animation/checklist.md) | 逐条核对产出 |

## 🧱 基础操作

1. **产出形态**：先说清要网页还是视频。网页 → 指定浏览器可交互；视频 → 指定 MP4/分辨率。
2. **时长**：给一个明确数字（如"3 秒"或"15 秒"）。没有时长，Agent 无法定节奏。
3. **动效类型**：说清动效类型（淡入、滚动驱动、弹跳、转场…）。不确定时给 2-3 个备选。
4. **验收标准**：说清"做完后怎么算对"（如"循环播放无跳帧""支持 `prefers-reduced-motion`"）。

## 🛠 实战操作

### 写一个可验收的 prompt

```text
用 oil-motion 做一个滚动驱动的 Hero 动效：
- 产出：单个 HTML 文件，浏览器打开即可交互
- 时长：滚动一屏内完成
- 动效：标题文字逐字淡入 + 背景色随滚动从 #0f172a 过渡到 #1e293b
- 验收：滚动到 50% 时文字全部可见；系统开启"减少动态效果"时动画即时呈现
```

### 跑最小闭环

1. **装 skill**：见 [02-install.md](02-install.md)。
2. **发 prompt**：把上面那段发给 Agent。
3. **验收**：打开产出的 HTML，对照 [checklist.md](../data/lessons/first-animation/checklist.md) 逐条核对。
4. **迭代**：验收不过的条目，追加到 prompt 末尾（如"背景色过渡改为 600ms ease-out"）。

### 常见坑

- **prompt 太短**："做个动画"→ Agent 只能反问。至少给四要素。
- **验收标准缺失**：没有验收，Agent 不知道自己做完了。
- **装错 skill**：做网页动效却装了 video-shotcraft → Agent 试图渲染 MP4。回到 [01-choose.md](01-choose.md) 重新选型。

## ✅ 总结

- 一个好 prompt = 产出形态 + 时长 + 动效类型 + 验收标准，四要素缺一不可。
- 最小闭环：装 skill → 发 prompt → 验收 → 迭代。先跑通闭环，再逐步加复杂。
- 验收不过时，把不通过的条目追加到 prompt 末尾，而不是重开新对话。
- 下一步：进入 [02-principles/](../02-principles/) 学动画原则，再进 [04-workspace-lessons/](../04-workspace-lessons/) 做逐仓库实验。
