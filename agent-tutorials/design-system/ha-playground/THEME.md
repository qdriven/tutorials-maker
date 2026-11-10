# HA Playground Theme · "Zen Terminal"（v1.0）

> 本站风格的唯一权威定义。配套文件：`theme.css`（可直接 import 的 token 实现）、`MASTER.md`（ui-ux-pro-max 生成基座）、`../../DESIGN-REVIEW.md`（审查依据）。
> 适用范围：正式版全部页面；新页面/组件开发前先读本文件，页面级偏差写 `pages/<page>.md`。

---

## 1. 风格一句话

**Zen Terminal**：zinc 亮色文档底的克制秩序 × Terminal/Mono 的工程质感 × AI-Native 的"agent 在你眼前思考"动效。
关键词：`agentic` `streaming` `minimal chrome` `doc-first` `light-monochrome`。

三个气质支柱（缺一即不成立）：

1. **单色基底 + 语义色点睛**——画面 95% 是白/灰/黑（zinc 阶），色彩只出现在"有意义的状态"上；
2. **Mono 味**——代码、徽章、meta、终端、状态词全部 JetBrains Mono；中文正文 PingFang SC；
3. **过程可见**——打字机、流光、节点点亮、步骤卡弹入：动效全部服务于"让 agent 的思考被看见"，无纯装饰动效。

## 2. 色彩系统（token 一览）

### 2.1 基底（zinc 亮色阶）
| Token | 值 | 用途 |
|---|---|---|
| `--bg / --surface` | `#ffffff` | 页面 / 卡片 |
| `--surface-2` | `#f4f4f5` | 内嵌底：代码块头、工具条、hover |
| `--surface-3` | `#e4e4e7` | 更深内嵌：进度轨道、选中底 |
| `--border / --border-strong` | `#e4e4e7 / #d4d4d8` | 常规 / 可交互 |
| `--fg / --fg-2 / --fg-3 / --fg-faint` | `#18181b / #52525b / #71717a / #a1a1aa` | 四级墨阶 |

### 2.2 语义色（本 Theme 的核心约定：双 Accent + 三状态）
| 语义 | Token | 亮色 | 规则 |
|---|---|---|---|
| **翡翠 · Agent 态** | `--accent` / `--accent-strong` | `#16a34a` / `#15803d` | 运行中、成功、观察结果、互动 Playground 的身份色。**图标/边框/填充用 `--accent`；任何 <16px 文本必须用 `--accent-strong`（4.5:1）** |
| **紫 · 学习态** | `--la` / `--la-strong` | `#7c3aed` / `#6d28d9` | 课程视图身份色：进度条、当前课时、练习卡、选中态。同为 focus 环颜色 |
| **琥珀 · 思考态** | `--think` / `--think-strong` | `#d97706` / `#b45309` | Thought 步骤卡、加载中、内核下载 |
| **蓝 · 行动态** | `--act` / `--act-strong` | `#2563eb` / `#1d4ed8` | Action 工具调用卡、项目徽章；文字一律用 strong（主题审计结论） |
| **红 · 错误** | `--err` | `#dc2626` | 仅错误语义，含文字说明 |
| dim 底色 | `--accent-dim` 等 | 9% 透明 | 徽章/选中底；**dim 底上文字用对应 strong** |

> 冲突规则：一个画面只允许一个主语义。课程页内 Agent 态让位于学习态（紫）；Playground 内反之。
> **审计基线（2026-11-10，15→0）**：状态字/RUNNING 一律 `accent-strong`；ACTION 文字一律 `act-strong`；
> 按钮描边依 WCAG 1.4.11 例外豁免（非唯一识别手段）。审计脚本模式见 `themes-showcase.html` 修复注释。

### 2.3 主 CTA
黑底白字（`#18181b` → hover `#3f3f46`），**不是** accent 色——翡翠/紫留给状态，黑留给"行动"。每屏一个主 CTA。

## 3. 字体与字阶

| 用途 | 字体 |
|---|---|
| UI / 正文 / 标题 | **Inter** + PingFang SC 兜底 |
| 代码 / 徽章 / meta / 终端 / 状态词 | **JetBrains Mono** |

字阶（地板 11px）：`11 徽章·meta → 12 小注 → 13 辅助正文 → 14 正文 → 15 强调 → 20 小标题 → 28 视图标题 → 40 Hero`。
行高：正文 1.75，卡片描述 1.6，mono 步骤 1.75。

## 4. 形 / 阴影 / 动效

- **圆角**：控件 7–10px、卡片 14px、大面板/弹层 16px、胶囊 999px
- **阴影**：只有两档 `shadow-sm`（卡片 hover）/ `shadow-md`（弹层、主面板）；发光只给"点亮态"（循环图节点 `accent-glow`、状态点）
- **动效**（全站唯一曲线 `cubic-bezier(.22,1,.36,1)`）：
  | 模式 | 规格 |
  |---|---|
  | 入场交错 | 450–550ms，子元素 60ms 级联 |
  | 打字机 | 30–34 字/秒 + caret `step-end` 1.1s 闪烁 |
  | 循环流光 | `stroke-dasharray` 匀速 1s + `animateMotion` 巡航 9s |
  | 步骤卡弹入 | translateY(14px)+scale(.98) → none，450ms |
  | 交互反馈 | hover 只变色/描边（**禁止位移**，防点击等待抖动）；按压下压 1px |
  | 无障碍 | `prefers-reduced-motion` 全局降级；循环装饰动画可关 |

## 5. 图标（硬性规范）

**Lucide SVG only，全站禁 emoji 图标**（教程正文内容里的 emoji 不受限）。尺寸 token：`14 / 16 / 22 / 26px`；同层级同粗细（默认 stroke 2）；装饰图标 `aria-hidden="true"`；可点图标必须有 accessible name。

## 6. 组件契约（六件套）

| 组件 | 规格 |
|---|---|
| 路线图节点 | 白卡 + 左缘连线 + 状态点（翡翠实心=完成/空心环=进行中/灰=未开始）；hover 翡翠描边+shadow；整卡可点+键盘可达 |
| 终端步骤卡 | 左色条 3px 语义色 + mono 标签行 + 打字机正文；FINAL ANSWER 翡翠 dim 底高亮 |
| 循环图 | SVG：轨道 `#e4e4e7`、节点白底灰边、点亮=翡翠描边+dim 填充+glow；中心双语状态词 |
| 微课播放器 | 深紫辉光面板（唯一深色区块，学习态身份）+ 白色大播放钮 + 紫进度条 |
| 徽章 | mono 11px 胶囊；语义=dim 底+strong 字；FREE 描边款 / PRO 黑底款 |
| Onboarding | 16px 圆角白卡 + 蒙层 blur；4 画像卡 2×2，hover 翡翠描边 |

## 7. 布局

- 容器 1200px / 卡片内边距 20–24px / 4·8 栅格
- 断点：375 / 768（tabs 横滑）/ 980（双栏→单栏）/ 1280
- 双栏标准：内容 1fr + 侧栏 320–380px sticky top 72px
- 页面骨架：skip-link → sticky header（48px blur）→ 视图 → 署名 footer

## 8. 暗色主题（第二迭代，预留）

结构已备（CSS variables 一换即达）。暗色采用 agentway `.dark` 组：
`bg #09090b / surface #18181b / border #27272a / fg #fafafa`；语义色换亮变体：
`accent #4ade80 / think #fbbf24 / act #60a5fa / err #f87171`，`--la → #a78bfa`。
硬性要求：暗色对比度独立校准（normal text 仍 4.5:1），dim 透明度需重调（暗底下 9% 几乎不可见 → 提至 ~14%）。

## 9. 落地清单

- [x] `theme.css`（本目录，含全部 token + 组件契约注释）
- [x] POC 已按本 Theme 实现并清账（图标/对比度/字阶/焦点/热区/路由）
- [ ] Sprint 1：`app/src/styles/tokens.css` 直接引入 theme.css + Tailwind 映射
- [ ] 第二迭代：`.dark` 覆盖组 + 双主题切换按钮 + 对比度报告
