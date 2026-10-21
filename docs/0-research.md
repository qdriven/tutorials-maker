# vivid-dsh 交互技术分析 与 Markdown Flashcard 平台改造调研

> 对应 `tasks/dogic/README.md` 任务 2。
> 分析对象：`tutorials/dsh-tutorials/vivid-dsh`（即 learn-deepseek-harness）。

---

## 第一部分：vivid-dsh 使用的交互技术

### 1.1 技术栈总览

| 层 | 选型 | 用途 |
| --- | --- | --- |
| 框架 | React 19 + TypeScript | 单页应用，无路由库 |
| 构建 | Vite 8 + `@tailwindcss/vite` | 零配置开发/构建 |
| 样式 | Tailwind CSS 4 + CSS 自定义属性（`--ink`/`--teal` 等主题变量） | 明暗双主题，`document.documentElement.dataset.theme` 切换 |
| 动画 | framer-motion 13 | 几乎所有交互反馈（页面切换、步骤帧、抽屉、进度条弹簧动画） |
| 图标 | `@phosphor-icons/react` | 统一线性图标 |
| 路由 | 无库，`location.hash` + `hashchange` 事件 | 每节课一个 hash，可刷新可分享 |
| 持久化 | `localStorage`（进度 `dsh-course-progress-v3`、主题 `dsh-theme`） | 无后端 |
| 内容源 | `src/lessons/*.ts` 纯数据文件（20 节课） | **数据驱动**：新增一节课 = 新增一个数据文件，不写新组件 |

核心设计思想写在 `src/tutorial/types.ts` 开头：**每节课都是一份纯数据，由同一套工作台渲染**。这是整个项目最重要的架构决策，也是后续改造的立足点。

### 1.2 交互机制逐项拆解

#### （1）分步演示引擎（核心交互）

一节课的主干是 `steps: LessonStep[]`，每步携带：标题、解说文字、要点亮的图节点/边、运行日志行、可选代码块。

- `LessonView.tsx` 把 steps 展开成 **teachingFrames**：每步按数据流分组拆成多个「拍」（beat），末尾追加一帧「完整链路总览」。
- `useLessonPlayer.ts` 是一个精简的播放器状态机：`idle / playing / paused / complete` 四态，提供 next / previous / goTo / reset / togglePlaying，自动播放间隔 2600ms。
- 键盘控制：← / → 翻步，空格播放/暂停；在输入框内或带修饰键时不拦截。
- 帧切换用 `AnimatePresence mode="wait"` 做淡入+位移过渡。

#### （2）StageDiagram —— 数据驱动的 SVG 架构图

- 节点用网格坐标（`col`/`row`）声明，组件内换算成 SVG 坐标（`NODE_W=152, GAP_X=72` 等常量）。
- 节点四种 `kind`（core / plugin / external / data）对应四套 CSS 变量配色。
- 响应式方案值得注意：**窄屏不等比缩小**，而是（a）数据里预填 `mobileCol/mobileRow` 重排成竖版，或（b）保底 `min-w-[800px]` 允许图内横滚——「宁可横滚也不缩到看不清」。
- `diagramFrames.ts` 按当前帧计算节点的 `revealed / entering / current` 状态，边同理，配合 framer-motion 做点亮动画。

#### （3）RunLog —— 同步滚动的运行记录

随步骤推进逐行显示日志（`event / call / state / io / ok / warn` 六种行类型），日志内容来自真实可跑的 `demo/mini-harness`，逐行可核对。

#### （4）代码抽屉（CodePanel + Drawer）

- 「看这一步的代码」从右侧滑出抽屉（`motion.aside` 弹簧动画），遮罩点击或 ESC 关闭。
- 完整的焦点管理：打开时焦点进抽屉、Tab 循环、关闭后焦点还给触发按钮。
- 抽屉内按「步」而不是按「帧」翻页（代码注释里专门记录了为什么）。

#### （5）Quiz —— 即时反馈测验

- 每题答错时显示**针对该选项的专属反驳**（`wrongExplains`，下标与选项对齐），而不是通用提示。
- 全部答对才触发 `onPass`，写入 localStorage，并弹出「下一课」奖励卡（注释：刚答对的那一秒是读者最愿意继续的时候）。

#### （6）课程目录与进度（App.tsx Sidebar）

- 阶段分组折叠目录：默认只展开当前阶段；每组带迷你进度条。
- 总进度条用弹簧动画（`stiffness: 160, damping: 24`）。
- `scrollIntoView({ block: "nearest" })` 保证当前项可见但不乱跳。

#### （7）数据体检脚本（scripts/check-lessons.ts）

`npm run check` 校验类型系统管不到的东西：动画引用的节点/边是否真实存在、quiz 答案下标越界、图布局超出网格、标签文字宽度是否画得下（中文按整宽、其余按 0.56 宽估算）。**课程内容即数据，因此可以被自动化校验**——这是数据驱动架构的直接红利。

### 1.3 页面形态：为什么现在是「长页面」

一节课的 DOM 顺序是：

```
header（编号/分组/时长/标题/一句话）
→ 定位卡 + 类比卡 + 概念表
→ 分步演示面板（步骤条 + 图 + 日志 + 吸底控制条）
→ 容易想错的地方
→ takeaways 折叠区
→ Quiz
→ 下一课引导 + bridge
```

信息全部串行堆叠在一个纵向滚动容器里。读者要反复滚动才能在「图」和「文字」之间来回，移动端尤甚。这正是任务 2 想要改掉的部分。

---

## 第二部分：改造为 Markdown 驱动的 Flashcard 管理平台 —— 可行方法调研

### 2.1 需求拆解

任务 2 的目标形态有三个关键词，拆开看各自的要求：

1. **基于 Markdown 文件**：内容从 `src/lessons/*.ts`（TS 数据文件）迁到 `.md` 文件，非程序员可写，git 友好。
2. **Flashcard 左右滑动**：一节课不再是一条长滚动页，而是一叠卡片；每张卡自包含一屏，左右滑（或 ←/→）切换。
3. **可任意添加不同内容的管理平台**：不只是这一门课，而是能装任意多套内容；内容类型可扩展（纯文卡、图卡、代码卡、测验卡……），与 dogic 的 plugin 理念（菜单插件、工具栏插件、三栏布局）对齐。

### 2.2 关键技术决策点

#### 决策 1：Markdown 如何切成卡片

三种约定，按推荐顺序：

| 方案 | 写法 | 优点 | 缺点 |
| --- | --- | --- | --- |
| **A. frontmatter + `---` 分卡**（推荐） | 每个 deck 一个 `.md`，frontmatter 存元数据，正文用 `---` 水平线分卡 | 约定直观，remark 天然支持 thematicBreak 节点 | 卡内不能再随意用 `---` |
| B. 标题层级分卡 | 每个 `##` 一张卡 | 纯 md 预览也通顺 | 无法表达「卡类型」，嵌套标题冲突 |
| C. 一卡一文件 | 目录即 deck，文件名排序 | 卡片独立可复用 | 小文件爆炸，顺序靠文件名前缀脆弱 |

配套格式约定（方案 A 示例）：

```markdown
---
id: harness-basics
title: 模型只会说话，谁去动手
group: know
minutes: 8
---

# 你说了一句话

你的话不会直接飞到模型那里……

---

# 循环多问了一次

模型每要一次工具就多问一次……

---

:::quiz
question: 模型说「删掉它」的那一刻，文件删了吗？
options: [删了, 没删，harness 才动手, 看模型心情]
answer: 1
:::
```

#### 决策 2：Markdown 渲染与交互块嵌入

纯文本卡片任何 md 渲染器都够；难点在**交互块**（quiz、架构图、代码高亮）怎么进 markdown。三档选择：

| 方案 | 机制 | 表达力 | 迁移成本 |
| --- | --- | --- | --- |
| **remark + remark-directive**（推荐起步） | `:::quiz ... :::` 容器指令 → 自定义 React 组件 | 高：指令可带属性和正文 | 低，remark 生态成熟 |
| MDX | 直接在 md 里写 `<Quiz ... />` | 最高 | 中：作者要懂 JSX，内容不再纯净 |
| 代码块约定 | ` ```quiz ` 围栏代码块内写 JSON/YAML | 中高 | 低，但写起来像配置文件 |

管线建议：`unified` → `remark-parse` → `remark-frontmatter` → `remark-gfm` → `remark-directive` → 自定义 transformer（把 AST 转成 `Card[]` 结构化数据）→ React 渲染。**注意：不要直接 md→HTML，要 md→AST→结构化数据**——这样卡片数据仍然可以被 `check-lessons.ts` 那样的体检脚本校验，保留现有架构红利。

#### 决策 3：左右滑动的实现

| 方案 | 体积 | 手势质量 | 备注 |
| --- | --- | --- | --- |
| **embla-carousel-react**（推荐） | ~5KB | 优秀（原生惯性、循环、对齐吸附） | headless，样式完全自己控制，与现有设计体系不冲突 |
| Swiper | ~35KB | 优秀 | 功能全家桶，但很多用不上；样式体系要覆盖 |
| framer-motion 自制 drag | 0（已有依赖） | 中等，要自己处理吸附/越界回弹 | 项目里已有，但 swipe 手感细节（速度阈值、橡皮筋）要自己调，容易翻车 |

补充要点：

- 保留键盘 ←/→（现有 `useLessonPlayer` 的逻辑可以直接平移到卡片翻页）。
- 移动端 `touch-action: pan-y`，横向滑动归卡片、纵向滚动归页面，避免手势打架。
- 卡片容器高度：一屏一张，内部超出才局部滚动（`thin-scroll` 已有）。

#### 决策 4：内容发现与「任意添加」

| 方案 | 机制 | 适用 |
| --- | --- | --- |
| **Vite `import.meta.glob`**（推荐起步） | `import.meta.glob('./content/**/*.md', { as: 'raw' })` 构建时收集全部 md，自动生成目录 | 纯前端、无后端，内容与代码同仓 |
| 运行时 fetch + 索引文件 | `content/index.json` 登记 deck 列表，运行时拉取 | 内容想脱离发版更新 |
| 后端/文件系统 API | 服务端扫描目录 | dogic 桌面版阶段，届时可换成读本地目录 |

目录结构建议：

```
content/
  <deck-id>/
    deck.md          # 或 index.md，frontmatter 含分组/封面/课时
    assets/          # 图片等
```

#### 决策 5：平台化——卡片渲染器注册表

「可任意添加不同内容」的工程落点是把「卡片类型 → 渲染组件」做成注册表，而不是 if-else：

```ts
// 伪代码
registry.register("text",     TextCard);
registry.register("quiz",     QuizCard);
registry.register("diagram",  DiagramCard);   // 现有 StageDiagram 包一层
registry.register("code",     CodeCard);      // 现有 CodePanel 包一层
registry.register("markdown", MarkdownCard);  // 默认兜底
```

- transformer 把每张卡的 md AST 归一成 `{ type, props }`，渲染层查表。
- 新增一种内容 = 写一个 transformer 分支 + 一个组件 + 一行注册。这与 dogic README 里「plugin 模式，菜单插件、工具栏插件」的总思路同构，未来可以把注册表挂到 dogic 的插件体系下。

#### 决策 6：现有资产如何映射（不是推倒重来）

| 现有结构 | Flashcard 形态下的去处 |
| --- | --- |
| `concepts` 概念表 | 拆成「概念卡」，一卡一词，或保留为可横向滑的卡组 |
| `stage` + `steps` 分步演示 | **一步一卡**：图 + 该步解说 + 该步日志放在同一张卡内，滑动即推进演示——这是改造后体验提升最大的一点，图和解说永远同屏 |
| `step.code` | 卡内「看代码」按钮，抽屉逻辑原样保留 |
| `misconceptions` | 「以为/其实」正是一张天然的双面卡（正面以为、翻面其实） |
| `quiz` | 测验卡组，答错反驳逻辑原样复用 |
| `takeaways` | deck 末尾的速查卡 |
| 进度系统 | 粒度从「课」细化到「课 × 卡」，localStorage 结构版本号 +1 迁移 |
| `check-lessons.ts` | 改造为校验 md transformer 的产出，校验项不变 |

### 2.3 风险与代价

1. **表达力落差**：现有 `Lesson` 是纯结构化数据（图的坐标、边的走向、节拍分组），纯 markdown 表达不了。对策：交互块用 directive 携带 YAML/JSON 参数（如 `:::diagram` 内嵌节点边定义），或少数复杂课保留 TS 数据文件、md 与 ts 两种 deck 源共存于注册表。
2. **长文 vs 卡片**：有些内容天然是长文（bridge、类比）。对策：卡片高度内允许局部滚动；或定义「文章卡」类型整卡滚动——flashcard 是默认形态不是唯一形态。
3. **作者门槛**：directive 语法对非技术作者不友好。对策：先内部使用，后续在 dogic 里做可视编辑插件（这正是「管理平台」的远期形态）。
4. **体检脚本要同步改**：数据入口从 TS import 变成 md 文件扫描后，`check-lessons.ts` 的加载层要重写，校验逻辑可保留。

### 2.4 推荐路线（渐进式）

- **阶段 1 — 最小可用**：`content/*.md` + frontmatter/`---` 分卡 + remark transformer + embla 滑动 + 文卡/quiz 卡两种渲染器。一门课端到端跑通。
- **阶段 2 — 交互块迁移**：`:::diagram` / `:::code` directive，把 StageDiagram、CodePanel、RunLog 包成卡片渲染器；一步一卡改造分步演示。
- **阶段 3 — 平台化**：渲染器注册表、`import.meta.glob` 内容发现、deck 分组/进度聚合，挂入 dogic 三栏布局（左：deck 目录；中：卡片区；右：进度/笔记），注册表对 dogic 插件开放。

### 2.5 结论

可行，且不需要推翻 vivid-dsh 的现有架构。它的「内容即纯数据 + 同一套工作台渲染 + 数据可体检」三个决策，恰好是改造成 markdown 驱动平台的地基：只是数据的来源从 TS 文件换成 markdown AST 变换的产出，渲染层从「长页面串行」换成「卡注册表 + 滑动容器」。推荐管线：**remark（frontmatter + directive）→ Card[] 结构化数据 → 渲染器注册表 → embla 滑动容器**。
