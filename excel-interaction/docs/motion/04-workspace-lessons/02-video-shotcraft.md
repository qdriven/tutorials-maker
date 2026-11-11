# 02 · 产品宣传片 skill

> 用 Remotion 把产品截图与文案变成有镜头语言的 30 秒产品宣传片（15,871⭐）。

| 字段 | 值 |
| --- | --- |
| ID | `video-shotcraft` |
| 顺序 | 02 |
| 短标题 | 产品宣传片 skill |
| 分类 | 实战课 |
| 级别 | 进阶 |
| 时长 | 30 分钟 |
| 数据类型 | 教学模型 |
| 来源 | [Vincentwei1021/video-shotcraft](https://github.com/Vincentwei1021/video-shotcraft) |

**故事**：video-shotcraft 把产品宣传片拆成镜头语言：动线、转场、节奏卡点。每个镜头必须有生长过程，拒绝静态整屏切换。Agent 拿到截图与文案，按镜头序列表渲染成片。

**学习目标**：学完能给一个产品页写出镜头序列表并生成 30 秒宣传片。

**技能**：Remotion、镜头动线、转场叙事、节奏卡点、反 PPT 镜头

**摘要**：宣传片 = 镜头序列。动线讲清产品，转场服务叙事，每个镜头有生长过程，拒绝 PPT 式整屏切换。

## 🎯 本课重点

- **重点用什么**：镜头语言（动线、转场、节奏卡点）。
- **完成什么**：给一个产品页写 30 秒宣传片 prompt，含镜头序列表。

## 📦 配套数据

| 数据 | 文件 | 用途 |
| --- | --- | --- |
| 练习 prompt | [../data/lessons/video-shotcraft/prompt.md](../data/lessons/video-shotcraft/prompt.md) | 给 Agent 的练习 prompt |
| 验收清单 | [../data/lessons/video-shotcraft/checklist.md](../data/lessons/video-shotcraft/checklist.md) | 验收清单 |

## 🧱 基础操作

1. **装 skill**：`npx skills add Vincentwei1021/video-shotcraft`。
2. **读 skill 文档**：装完后让 Agent 读该 skill 的 SKILL.md，理解它约束了什么。
3. **发第一条 prompt**：用四要素（产出形态、时长/规模、动效类型、验收标准）。

## 🛠 实战操作

### 给产品页写 30 秒宣传片

1. **备素材**：准备产品页截图 2–3 张与一句核心文案。
2. **列镜头序列表**：给 Agent 的 prompt 里写清镜头：序号、时长、画面、动线、转场、文案。
3. **卡节奏**：让每个镜头时长与文案/音乐节奏对齐（节奏卡点）。
4. **看产出**：Agent 用 Remotion 渲染成片，播放检查。

### 验收

1. 每个镜头有明确动线（从哪进入、从哪离开）。
2. 转场服务叙事（如用缩放表现"进入下一层"），不是为炫技。
3. 无静态整屏切换——每个镜头有生长过程。

## ✅ 总结

- 宣传片的灵魂是镜头语言：动线、转场、节奏卡点。
- 反 PPT 的关键：每个镜头有生长过程，拒绝整屏切换。
- 下一步：[03-transitions-dev.md](03-transitions-dev.md)
