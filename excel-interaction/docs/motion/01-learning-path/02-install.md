# 02 · 安装与加载

> 动画 Skill 大多用 `SKILL.md` 格式（[agentskills.io](https://agentskills.io)），一行命令就能装进 Agent。装错方式是最常见坑——本课讲清三种安装方式与装后验证。

| 字段 | 值 |
| --- | --- |
| ID | `install` |
| 顺序 | 2 |
| 短标题 | 安装与加载 |
| 分类 | 学习路径 |
| 级别 | 入门 |
| 时长 | 10 分钟 |
| 数据类型 | 教学模型 |
| 来源 | [greensock/gsap-skills](https://github.com/greensock/gsap-skills)、[oil-oil/oil-motion](https://github.com/oil-oil/oil-motion) |

**故事**：你装了一个 skill，Agent 却说"我不知道这个 skill"。多半是没走对安装通道——有的 skill 要 `npx skills add`，有的要把仓库地址直接交给 Agent，有的是 Claude Code 插件市场。

**学习目标**：学完能按仓库 README 的安装段选对安装方式，并在 Agent 里验证 skill 已加载。

**技能**：`npx skills add`、仓库地址安装、插件市场安装、`/skills` 或 `/plugin` 验证

**摘要**：三种安装方式：命令行 `npx skills add`、把仓库地址交给 Agent、插件市场。装完用 Agent 的 skills 列表验证。

## 🎯 本课重点

- **重点用什么**：三种安装方式与各自适用的仓库；装后验证步骤。
- **完成什么**：装好一个 skill 并在 Agent 里确认它能被识别。

## 📦 配套数据

| 数据 | 文件 | 用途 |
| --- | --- | --- |
| 练习 prompt | [../data/lessons/install/prompt.md](../data/lessons/install/prompt.md) | 给 Agent 的安装指令模板 |

## 🧱 基础操作

1. **看安装段**：每个仓库 README 都有 `## Install` 段。三种典型写法：
   - `npx skills add <owner>/<repo>` —— 命令行安装，最通用。
   - "把仓库地址交给 Agent：帮我安装 https://github.com/... 这个 Skill" —— Agent 自己克隆并读取。
   - `/plugin marketplace add <owner>/<repo>` —— Claude Code 插件市场。
2. **确认 Agent 兼容**：`SKILL.md` 格式兼容 Claude Code、Codex、Cursor、Windsurf、Copilot 等。若你的 Agent 不在此列，先看仓库 README 是否提供替代格式。
3. **装后验证**：在 Agent 里输入 `/skills`（或对应命令）查看已加载的 skill 列表；或直接问 Agent"你现在能用 <skill 名> 做什么"。

## 🛠 实战操作

### 方式一：命令行安装（最通用）

```bash
npx skills add greensock/gsap-skills
npx skills add oil-oil/oil-motion
npx skills add LottieFiles/motion-design-skill
```

装完让 Agent 重新加载 skill（有的命令需要 `--reload` 或重启 Agent）。

### 方式二：把仓库地址交给 Agent

```text
帮我安装 https://github.com/Vincentwei1021/video-shotcraft 这个 Skill。
```

Agent 会克隆仓库、读取 `SKILL.md` 并注册。适合不走 npm 的仓库。

### 方式三：Claude Code 插件市场

```text
/plugin marketplace add freshtechbro/claudedesignskills
```

然后在插件市场里启用对应 skill/plugin。

### 验证

1. 装完后在 Agent 输入：`/skills`（或你的 Agent 的 skill 列表命令）。
2. 确认列表里有刚装的 skill 名。
3. 问一句："用 <skill 名> 做一个 3 秒的淡入动画。"——Agent 能正确响应即装好。

## ✅ 总结

- 三种安装方式：`npx skills add`（命令行）、仓库地址交给 Agent、插件市场。
- 装之前看 README 的安装段，装之后用 `/skills` 验证。
- `SKILL.md` 格式兼容 40+ Agent；不兼容时先看 README 替代方案。
- 下一步：[03-first-animation.md](03-first-animation.md) 讲怎么用装好的 skill 跑出第一个动画。
