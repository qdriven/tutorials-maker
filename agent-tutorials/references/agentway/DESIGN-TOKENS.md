# agentway.dev 设计体系提炼（Design Tokens）

> 来源：`site-snapshot/_next/static/chunks/1_xswnqr7neus.css`（编译产物直接解析）
> 用途：POC 与正式版视觉实现的设计基准。agentway.dev 无公开源码仓库，此文档是可维护的提炼层——
> 站点改版时重新抓取快照并对照更新本文件即可（更新方式见 `../README.md`）。

## 1. 亮色主题（:root，我们当前采用）

| Token | 值 | 用途 |
|---|---|---|
| `--zen-bg` | `#fff` | 页面底色 |
| `--zen-bg-subtle` | `#f9f9f9` | 次级底色 |
| `--zen-bg-muted` | `#f4f4f5` | 内嵌底色（代码块、head 条） |
| `--zen-surface` | `#fff` | 卡片/面板 |
| `--zen-fg` | `#18181b` | 主文字 |
| `--zen-fg-secondary` | `#52525b` | 次级文字 |
| `--zen-fg-muted` | `#71717a` | 弱化文字 |
| `--zen-fg-faint` | `#a1a1aa` | 最弱文字 |
| `--zen-fg-body` | `#3f3f46` | 正文长文 |
| `--zen-border` | `#e4e4e7` | 常规边框 |
| `--zen-border-subtle` | `#f4f4f5` | 弱边框 |
| `--zen-border-strong` | `#d4d4d8` | 强边框（输入框/hover） |
| `--zen-primary` | `#18181b` | 主按钮底 |
| `--zen-primary-hover` | `#3f3f46` | 主按钮悬停 |
| `--zen-primary-fg` | `#fff` | 主按钮文字 |
| `--zen-success` | `#15803d` | 成功/agent 活动态 |
| `--zen-success-subtle` | `#f0fdf4` | 成功底 |
| `--zen-warning` | `#f59e0b` / strong `#b45309` | 思考态 |
| `--zen-error` | `#dc2626` | 错误 |

## 2. 暗色主题（`.dark`，备选，双主题切换用）

| Token | 值 |
|---|---|
| bg / surface | `#09090b` / `#18181b` |
| fg / fg-secondary / fg-muted | `#fafafa` / `#a1a1aa` / `#7c7c85` |
| border / border-strong | `#27272a` / `#3f3f46` |
| primary | `#fafafa`（文字反转为黑 `#18181b`） |
| success | `#4ade80`（subtle `#052e16`） |
| warning strong | `#fbbf24`；error `#f87171` |

## 3. 字体

```
sans: "Inter", -apple-system, …, "PingFang SC","Hiragino Sans GB","Noto Sans SC","Microsoft YaHei"
mono: "JetBrains Mono", ui-monospace, "SF Mono", Menlo, Consolas, + CJK 兜底
```

## 4. 尺寸体系

- 字号：xs `.75rem` → 4xl `2.25rem`；正文 base `.875rem`(14px)
- 间距：space-1 `.25rem` … space-16 `4rem`
- 圆角：sm `.25rem` / md `.375rem` / lg `.5rem` / xl `.75rem` / full
- 阴影：sm `0 1px 2px #0000000d`；md/lg 带轻微扩散
- 布局：nav 260px、content 720px、marketing 1080px、header 高 48px

## 5. 动效规范（POC 已继承）

- 过渡：fast `.15s ease` / base `.2s ease` / slow `.3s ease`
- **交错入场**：`mks-step-in` → `.45s cubic-bezier(.22,1,.36,1) forwards`（POC 的 `.rv` 级联即此曲线）
- 打字机光标：`mks-caret` → `1.1s step-end infinite`
- 呼吸/脉冲：`zen-breathe` / `zen-pulse`；骨架屏 `zen-skeleton-pulse 1.5s ease-in-out infinite`
- 入场类：`zen-fade-in` / `zen-slide-up`（base `.2s ease-out`）/ 完成面板 `zen-complete-sheet-in .22s`
- 关键帧清单：confetti-burst, fadeInOut, mks-caret, mks-step-in, pulse, spin, zen-breathe,
  zen-complete-sheet-in, zen-fade-in, zen-notification-pulse, zen-pulse, zen-skeleton-pulse,
  zen-slide-up, zen-spin, zen-suggested-slide-in, zen-typing-bounce, zen-upgrade-in

## 6. 内容/页面模式（对信息架构的参考）

- Curriculum：阶段分组 + 编号课程节点（P0–P18）+ 时长 + 徽章（练习/完整版/毕业项目）+ 阶段锚点导航
- 终端演示组件：模拟 agent 运行（"Thinking · …" + `TOOL glob → 128 files`）
- 免费层数据外露：hero 标注 "Stages 0 and 1 free · no card required"
