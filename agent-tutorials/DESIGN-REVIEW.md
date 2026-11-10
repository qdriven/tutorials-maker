# Hello-Agents Playground · 总体设计审查与风格规划

> 依据 ui-ux-pro-max 规则体系（79 styles / 192 palettes / 74 font pairings / 119 UX guidelines）生成。
> 审查对象：`poc/index.html`（7 视图 POC）· 生成工具：`ui-ux-pro-max --design-system`（3 组候选）。
> 日期：2026-11-10

> ## ✅ 已采纳：Option A · Zen Terminal 演进版（2026-11-10 用户选定）
> 设计系统 Master 已固化：`design-system/ha-playground/MASTER.md`（ui-ux-pro-max `--persist` 层级检索格式）。
> 页面级覆盖放 `design-system/ha-playground/pages/<page>.md`（存在则优先于 Master）。
> 双 accent 语义为 Master 之上的项目级增补：`--accent-green #16a34a`（Agent 运行/成功态）+ `--accent-violet #7C3AED`（课程/学习态）。

---

## 一、现状审查（按优先级 P1→P10）

### 🔴 P1 无障碍（Critical）
| 问题 | 违反规则 | 位置 | 修复 |
|---|---|---|---|
| **Emoji 当结构图标**（📖⚡🧪🗺📚🎓🗂💭🔧👁） | `no-emoji-icons` | 全局导航/路线图/课时/词典 | 全量替换 Lucide SVG（正式版必须；字体依赖、跨平台不一致、无法走 token） |
| 强调色小字号文本对比不足 | `color-contrast` 4.5:1 | `#16a34a` 用于 11px mono 文本（rn-go/tc）≈3.9:1 | 小字号场景改用 `#15803d`（≈4.7:1），或字号升至 12px+ |
| 页面无 h1 | `heading-hierarchy` | 路线图等视图以 eyebrow+h2 开头 | 每视图主标题升 h1（或加视觉隐藏 h1） |
| 路线图节点不可键盘达 | `keyboard-nav` | `.rn` 是 div+click | 改 `<button>`（或 role=tabindex+Enter 处理） |
| 无 skip-link、无 focus-visible 定制 | `focus-states` | 全局 | 加 `:focus-visible` 环（2px accent）+ 视图切换 skip |

### 🟠 P2 触达与交互（Critical）
| 问题 | 规则 | 位置 | 修复 |
|---|---|---|---|
| 圆点导航 8×8px、Tab 高 ~36px | `touch-target-size` ≥44px（触屏） | slides dots / tabs / snav | 扩大点击热区（视觉不变、padding 扩），≤1024 touch 断点生效 |

### 🟡 P3 性能（High）
- Pyodide 按需加载 + 进度反馈 ✓；字体 preconnect + display=swap ✓
- 单文件 65KB 内联（POC 可接受）；**正式版必须**拆分 CSS/JS + 路由级 code-split（`bundle-splitting`）
- Pyodide 加载无 skeleton 占位（`progressive-loading`）→ 输出区加 shimmer

### 🟠 P4 风格体系（High）
- **Accent 未系统化**：emerald(全局成功态) + 紫(课程视图) + 蓝(行动态) 并存，缺 token 化规则 → 需在选项中明确「双 accent 语义」
- 锌中性阶一致 ✓；阴影/圆角有层级 ✓

### 🟠 P5 布局响应（High）
- 仅 1 个断点 980px；未测 375px（6 个 Tab 会折 3 行）→ 采用系统断点 **375/768/1024/1440**
- 字号低于 11px 地板：`.sk` 10px、`.ls-i-b` 9.5px ❌ → 全部 ≥11px，正文 ≥14px（移动 16px）
- 深度验证过 816px；375px 待修

### 🟡 P6 排版（Medium）
- 字号即兴值过多（10/10.5/11/11.5/12/12.5/13/13.5/14/14.5/15.5…）→ 收敛 token 阶：12/13/14/16/20/28/40
- Inter + JetBrains Mono + PingFang SC 配对 ✓（skill 检索亦推荐 Inter）

### 🟢 P7 动效（Medium）
- 全局 `prefers-reduced-motion` ✓、打字机 reduced 跳过 ✓、缓动统一 `(.22,1,.36,1)` ✓、交错 60-90ms ✓
- 循环动画（轨道光点/chip 轮播/呼吸点）为环境装饰，需在正式版提供「减弱动效」开关（`auto-rotation-controls`）

### 🟢 P8 表单反馈（Medium）
- 练习判分 aria-live ✓、提交禁用 ✓；词典搜索 0 结果无友好空态 → 加「没有找到…试试 X」空态
- 词典输入仅 placeholder+aria-label → 正式版加可见 label

### 🟠 P9 导航（High）
- **无 deep-linking**：视图切换不进 URL → 加 hash 路由 `#/lesson/2`（分享/回退/刷新保位）
- 6 Tab 移动端溢出 → ≤768px 折叠为底部导航（≤5 项 + 更多）或抽屉
- 课程页有面包屑，其他视图无 → 统一「路线图 / 章节」面包屑规范

### ✅ P10 图表
- ReAct 循环 SVG 有 `role=img` + aria-label ✓；图例文字化 ✓

**审查结论**：骨架健康（信息架构、事件流渲染、动效规范达标），主要欠账集中在 **①图标体系、②token 化（色/字阶/间距）、③无障碍细节、④响应式断点、⑤路由**。这些都不是风格问题，而是任何选项下都要做的"工程化清账"。

---

## 二、风格选项（ui-ux-pro-max --design-system 生成 ×3）

### Option A · Zen Terminal 演进版（沿用现方向 + 清账）｜推荐
- **生成参数**：variance 4 / motion 5 / density 6
- **Skill 匹配风格**：AI-Native UI（chatbot/agentic/streaming-text 家族）——与我们"看 agent 每一步"的产品理念同族
- **色彩**：亮色 zinc 基底（#fff/#f4f4f5/#18181b）不变；**双 accent 语义系统化**：`--accent-green #16a34a`=Agent 成功/运行态，`--accent-violet #7C3AED`=课程/学习态（ lesson 视图的紫升格为全局学习语义）
- **字体**：Inter + JetBrains Mono（不变）
- **动效**：现有打字机/流光/交错全保留（AI-Native 效应清单：typing indicators、streaming text、smooth reveals——我们已实现 90%）
- **工作量**：小（清账为主）· **风险**：最低 · **与 agentway 参考**：最贴

### Option B · AI-Native 双主题（ skill 首推方案全面化）
- **生成参数**：variance 7 / motion 7 / density 5
- **Skill 输出**：Primary `#7C3AED` 紫 / Accent `#0891B2` 青 / 底 `#FAF5FF` 淡紫 / 文字 `#1E1B4B`；**亮暗双主题成对设计**
- **气质**：从"开发者文档"转向"AI 学伴"——淡紫氛围 + 青色行动点，对小白第一印象最亲和
- **代价**：全量重刷 token（与 agentway zinc 参考偏离）；暗色对比需单独校准（skill 明确要求 dark 单测）
- **工作量**：中 · **风险**：中 · **差异化**：强

### Option C · Dark IDE Academy（开发者沉浸向）
- **生成参数**：variance 5 / motion 6 / density 7
- **Skill 输出**：Dark OLED——底 `#0F172A` 深蓝黑 / Accent `#22C55E` 终端绿 / 标题 **JetBrains Mono** + 正文 IBM Plex Sans
- **气质**：整个产品像一台 IDE/终端——terminal、playground、循环图元素会极其出彩；"看得见 agent 每一步"的理念最大化
- **代价**：小白受众的亲和度下降；全站对比度重校；正文换字体需重排
- **工作量**：中大 · **风险**：中高 · **差异化**：最强

### 对比速览
| | A Zen Terminal 演进 | B AI-Native 双主题 | C Dark IDE |
|---|---|---|---|
| 小白亲和 | ●●● | ●●●● | ●● |
| 开发者气质 | ●●●● | ●●● | ●●●●● |
| agentway 契合 | ●●●●● | ●● | ●●● |
| 动效契合（AI-Native） | ●●●● | ●●●● | ●●●● |
| 工作量 | 小 | 中 | 中大 |
| 风险 | 低 | 中 | 中高 |

### 推荐
**Option A 起步 + 吸收 B 的双主题能力**：先按 A 清账（图标/token/无障碍/断点/路由），把双主题开关（B 的亮暗成对能力）作为第二个迭代——两者不冲突，token 架构下只是换一套变量值。

---

## 三、清账清单（无论选哪个都要做）
1. Lucide SVG 全量替换 emoji 图标（nav/roadmap/lesson/dict/terminal 步骤标签）
2. Token 化：色（语义 accent 体系）· 字阶（12/13/14/16/20/28/40）· 间距（4/8 栅格）· z-index 表
3. 无障碍包：focus-visible 环 / .rn 与路线图节点 button 化 / 每视图 h1 / 小字号对比修复 / dots 热区 ≥24px / skip-link
4. 断点体系 375/768/1024/1440 + 移动端 Tab→底部导航
5. Hash 路由 deep-linking（`#/roadmap`、`#/lesson/2`）
6. 词典/案例空态、Pyodide shimmer、正式版 code-split
