# 02 · 抽象化：从 cs-systems-design 到可复用的教程模型

> 本文不讨论「怎么把 cs-systems-design 的页面做得更像」，而是回答：
> **哪些结构可以脱离「计算机系统设计」这个题材，变成 tutorials-maker 的通用资产？**

## 1. 抽象的目标

tutorials-maker 要做的不是「一个系统设计站点」，而是「多个教育主题的内容聚合 + 可交互教程」。因此需要一套模型，满足：

1. **题材无关**：前端动画、后端流程、数据库、操作系统都能用同一套结构描述；
2. **渲染可换**：同一份内容可以用等距图、2D 流程图、代码 diff、文字动画来呈现；
3. **可验证**：内容错误、图形语义错误、动画状态错误都能在构建期被发现；
4. **可增量生产**：人和 Agent 都能写内容，写完就能校验；
5. **静态优先**：不依赖后端，能部署到任何静态托管。

cs-systems-design 已经把这五件事的 80% 做出来了，只是它把「系统设计」写死在了字段名、节点数、正则和文案里。下面逐层拆开。

## 2. 五层模型

```
┌─────────────────────────────────────────────────────────┐
│ 5. Verifier      内容契约 / 渲染回归 / 运动回归 / 事实核查 │
├─────────────────────────────────────────────────────────┤
│ 4. Playback      播放状态机：preview / playing / paused / ended │
├─────────────────────────────────────────────────────────┤
│ 3. Renderer      渲染器适配层：等距 / 2D / 代码 / 文字动画 │
├─────────────────────────────────────────────────────────┤
│ 2. Narrative     Scenario + Step：谁在什么时候做了什么     │
├─────────────────────────────────────────────────────────┤
│ 1. Content       LessonSpec：主题、概念、来源、评估、关联  │
└─────────────────────────────────────────────────────────┘
```

- **Content** 回答「这节课讲什么、依据是什么」；
- **Narrative** 回答「按什么顺序讲、每一步发生什么」；
- **Renderer** 回答「这一步长什么样」；
- **Playback** 回答「用户怎么前进、暂停、重播」；
- **Verifier** 回答「怎么知道它是对的」。

cs-systems-design 的五层是耦合的（`app.js` 同时管播放、渲染、详情、知识图），但分层已经隐约存在。tutorials-maker 应该把它们显式拆开。

## 3. Content：LessonSpec v0.1

### 3.1 设计原则

- **用稳定 id，不用数组下标。** cs-systems-design 的 `from/to` 是节点索引，一旦重排节点就会静默错位；新模型用节点 id。
- **场景自带节点。** 故障场景可能需要不同角色（例如 MVCC 的写偏斜需要两个事务），所以 `nodes` 放在 `Scenario` 里，而不是 `Lesson` 里。
- **显式声明图形类型。** 不靠中文正则猜 `illustrationFor`。
- **代码块带行号锚点。** 教程里的代码必须能回溯到真实文件与行号。
- **来源分级。** 区分课程背景、官方文档、原始论文、具体机制资料，避免把二手资料当权威。

### 3.2 TypeScript 定义

```ts
export type RelationKind =
  // 来自 cs-systems-design 的 8 种基础关系
  | 'request' | 'data' | 'control' | 'check'
  | 'reject' | 'lost' | 'local' | 'compare'
  // 前端/渲染题材的扩展
  | 'event' | 'state' | 'render' | 'paint' | 'measure' | 'handoff'
  // 文字动画题材的扩展
  | 'reveal' | 'type' | 'highlight' | 'transform' | 'stagger';

export interface LessonSpec {
  schemaVersion: '0.1';
  id: string;                       // 稳定 slug，例如 "css-scroll-timeline"
  title: string;
  subtitle?: string;
  summary: string;                  // 一句话：这节课解决什么问题
  domain: string;                   // "frontend-animation" | "backend" | ...
  difficulty: 'intro' | 'core' | 'advanced';
  audience: string[];               // ["vibe-coder", "designer", ...]
  prerequisites?: string[];         // lesson id 列表；只做提示，不做硬门禁

  concepts: ConceptSpec[];          // 这节课必须建立的 3–8 个概念
  scenarios: {
    normal: ScenarioSpec;
    fault?: ScenarioSpec;           // 故障/边界场景；没有就写 faultExemptReason
  };
  faultExemptReason?: string;       // 为什么没有故障场景

  sources: SourceSpec[];
  related: string[];                // 无向关联，不是前置依赖
  assessment?: QuizSpec[];
  meta: LessonMeta;
}

export interface ConceptSpec {
  id: string;
  term: string;
  plain: string;                    // 给非技术读者的解释
  misconception?: string;           // 常见误解
}

export interface ScenarioSpec {
  id: string;                       // "normal" | "fault" | "slow-network" ...
  name: string;                     // 展示给读者的名字
  nodes: NodeSpec[];
  steps: StepSpec[];
  code?: CodeBlockSpec[];
  initialState?: string;            // 第 0 步之前的状态
}

export interface NodeSpec {
  id: string;                       // 稳定 id，例如 "browser-main"
  label: string;
  kind: 'actor' | 'store' | 'queue' | 'control' | 'record'
      | 'dom' | 'layer' | 'thread' | 'custom';
  x?: number;                       // 可选手工布局
  y?: number;
  meta?: Record<string, unknown>;
}

export interface StepSpec {
  id: string;
  label: string;                    // "发出读取"
  from?: string;                    // node id；local/state/render 可为空或相同
  to?: string;
  event: string;                    // "LOAD A"
  explanation: string;              // 为什么发生、省略了什么
  state: string;                    // 执行后的状态观察，必须非空
  relation: RelationKind;
  codeLine?: number;                // 对应 code 块的行号
  sourceRefs?: string[];            // 这一步的依据
  motion?: MotionSpec;              // 这一步的动画意图
}

export interface MotionSpec {
  kind: 'travel' | 'reveal' | 'transform' | 'highlight' | 'type' | 'stagger' | 'none';
  durationMs: number;
  delayMs?: number;
  easing?: string;                  // 例如 "cubic-bezier(0.16, 1, 0.3, 1)"
  reducedMotion: 'skip' | 'instant' | 'static';
}

export interface CodeBlockSpec {
  language: string;
  file?: string;                    // 真实文件路径
  startLine?: number;
  lines: string[];
  caption?: string;
}

export interface SourceSpec {
  id: string;
  name: string;
  url: string;
  kind: 'course' | 'official-doc' | 'paper' | 'manual' | 'article';
  note: string;
  accessedAt?: string;              // ISO 日期，便于复审
}

export interface QuizSpec {
  id: string;
  question: string;
  options: { id: string; text: string }[];
  answerId: string;
  explanation: string;
  kind: 'recall' | 'application' | 'debug';
}

export interface LessonMeta {
  version: string;
  authors: string[];
  reviewedAt: string;               // ISO 日期
  license: string;
  changeNote?: string;
}
```

### 3.3 与 cs-systems-design 的字段映射

| cs-systems-design | 新模型 | 变化 |
|---|---|---|
| `LESSONS.group` | `LessonSpec.domain` + `meta` | 分组不再写死 3 个 |
| `LESSONS.nodes` | `ScenarioSpec.nodes` | 每个场景独立；节点有稳定 id 和显式 kind |
| `LESSONS.steps[i][0..6]` | `StepSpec` | 7 元组变成命名字段；索引变成 node id |
| `LESSONS.fault` | `scenarios.fault` | 保持「完整独立场景」语义 |
| `LESSONS.code` | `ScenarioSpec.code` | 支持多代码块、文件路径、行号 |
| `LESSONS.principle/tradeoff/pitfall` | `ConceptSpec` + 讲解区块 | 概念可复用、可检索 |
| `MECHANISM_DETAILS.sections` | `LessonSpec` 的讲解区块 | 与时间轴解耦 |
| `SOURCES` | `SourceSpec` | 增加 `accessedAt`，便于时效复审 |
| `related` | `related` | 保持无向关联 |
| `completed` / `dark` | `LearnerState` | 独立于内容 |

## 4. Narrative：关系词汇表

### 4.1 为什么关系类型是最值得抽象的东西

在 cs-systems-design 里，`relationKind` 同时决定三件事：

1. 内容的语义（这是请求、数据、控制、拒绝、丢失、内部操作还是对照）；
2. 图形的语法（实线/虚线、箭头/叉、整程/半程、有无移动点）；
3. 测试的断言（`local` 不能有箭头、`lost` 只能半程、`compare` 不能有箭头）。

这比「给每一步写一段 CSS 类名」强得多。tutorials-maker 应该为每个题材定义一套**小而完整**的关系词汇表，并把它写进 schema。

### 4.2 基础关系（可直接复用）

| 关系 | 语义 | 视觉 | 不变量 |
|---|---|---|---|
| `request` | 发起请求 | 实线箭头 + 移动点 | `from !== to` |
| `data` | 传递数据 | 实线箭头 + 移动点 | `from !== to` |
| `control` | 控制/依赖 | 虚线 | `from !== to` |
| `check` | 条件校验 | 虚线 + 校验标记 | `from !== to` |
| `reject` | 被拒绝 | 终点 X，无箭头 | `from !== to` |
| `lost` | 传递中断 | 半程路线 + 红色断点 | `from !== to`，接收方不高亮 |
| `local` | 内部操作 | 无连线 | `from === to` 或省略 |
| `compare` | 方案对照 | 无箭头 | `from !== to` |

### 4.3 前端/动画题材的扩展

| 关系 | 语义 | 视觉建议 | 不变量 |
|---|---|---|---|
| `event` | 用户/系统事件 | 闪电/波纹标记 | `from` 是事件源 |
| `state` | 状态更新 | 节点内高亮 + 状态徽章 | 必须给出 `state` |
| `render` | 渲染函数执行 | 虚线箭头到渲染节点 | 可 `from === to` |
| `paint` | 绘制/合成 | 渐变箭头 | 只从 render 到 paint |
| `measure` | 布局测量 | 双向虚线 | 必须标注测量结果 |
| `handoff` | 线程/进程交接 | 双线箭头 | 两端节点类型必须兼容 |

### 4.4 文字动画题材的扩展

| 关系 | 语义 | 视觉建议 | 不变量 |
|---|---|---|---|
| `reveal` | 内容揭示 | 遮罩/裁剪动画 | 必须有 `reducedMotion` 回退 |
| `type` | 逐字输入 | 字符级进度 | 不要用逐字符 opacity 模拟打字 |
| `highlight` | 高亮/聚焦 | 背景扫过 | 高亮期间文本必须可读 |
| `transform` | 形变/位移 | 位置/形状插值 | 只能动 `transform`/`opacity` |
| `stagger` | 错峰出现 | 子元素依次进入 | 总时长要可配置 |

### 4.5 关系校验器

```ts
const RULES: Record<RelationKind, (s: StepSpec) => string | null> = {
  local: s => (s.from && s.to && s.from !== s.to)
    ? 'local 操作不能连接两个不同节点' : null,
  lost: s => (!s.from || !s.to)
    ? 'lost 必须有发送方和接收方' : null,
  compare: s => (s.from === s.to)
    ? 'compare 必须比较两个不同对象' : null,
  type: s => (s.motion?.kind !== 'type')
    ? 'type 关系必须声明 type 动效' : null,
  // ...
};
```

## 5. Playback：可复用的状态机

### 5.1 状态与事件

```ts
type PlaybackState = 'preview' | 'playing' | 'paused' | 'ended';

type PlaybackEvent =
  | { type: 'SELECT'; lessonId: string }
  | { type: 'PLAY' }
  | { type: 'PAUSE' }
  | { type: 'TICK' }
  | { type: 'STEP'; index: number }
  | { type: 'RESET' }
  | { type: 'SPEED'; value: number }
  | { type: 'HIDDEN' }
  | { type: 'VISIBLE' };
```

### 5.2 迁移表

| 当前状态 | 事件 | 下一状态 | 副作用 |
|---|---|---|---|
| `preview` | `PLAY` | `playing` | 启动 interval；`motion.play()` |
| `playing` | `PAUSE` | `paused` | 清 interval；`motion.pause()` |
| `playing` | `TICK`（非末帧） | `playing` | `step++`；重绘 |
| `playing` | `TICK`（末帧后一个间隔） | `ended` | `stop()`；`finish()`；标记完成 |
| `paused` | `PLAY` | `playing` | 从当前位置继续 |
| `ended` | `PLAY` | `playing` | `step = 0`；重新播放 |
| 任意 | `STEP(n)` | `paused` | 停止播放；跳到 n；触发一次预览动画 |
| 任意 | `RESET` | `preview` | `step = 0`；清除动画 |
| 任意 | `HIDDEN` | `paused` | 页面不可见时暂停 |
| 任意 | `SELECT` | `preview` | 切换主题；重置所有状态 |

### 5.3 不变量

```ts
invariant('timer 只在 playing 时存在', state =>
  (state.timer !== null) === (state.playback === 'playing'));

invariant('step 始终在范围内', state =>
  state.step >= 0 && state.step < state.frames.length);

invariant('ended 只能由末帧产生', state =>
  state.playback !== 'ended' || state.step === state.frames.length - 1);

invariant('reduced-motion 下不启动移动动画', state =>
  !state.reducedMotion || state.motion === 'static');
```

### 5.4 为什么不用 CSS 动画驱动步骤

- CSS 动画无法精确报告进度给右侧轨迹表；
- 暂停/恢复需要记录真实时间位置；
- 速度变化需要保持当前位置，而不是重启动画；
- 测试无法在 Node 里用假时钟验证 CSS 动画。

cs-systems-design 用 `createPointMotion` 解决了这些问题。tutorials-maker 应该把它抽成 `packages/player` 里的独立模块，渲染器只负责「把位置画出来」。

## 6. Renderer：渲染器适配层

### 6.1 接口

```ts
export interface LessonRenderer {
  readonly type: string;                       // "isometric" | "flow" | "text"
  mount(host: HTMLElement, ctx: RenderContext): void;
  render(frame: RenderFrame): void;
  destroy(): void;
}

export interface RenderContext {
  theme: 'light' | 'dark';
  reducedMotion: boolean;
  locale: string;
}

export interface RenderFrame {
  lesson: LessonSpec;
  scenario: ScenarioSpec;
  step: StepSpec;
  index: number;
  total: number;
  progress: number;        // 0–1，当前步骤内的动画进度
  motion: MotionState;     // playing / paused / preview / ended
}
```

宿主应用只依赖这个接口，不依赖 React、IsoKit 或任何具体库。cs-systems-design 的 `window.SystemsDiagram.render(props)` 是这个接口的雏形；新模型把它正式化为可注册的适配器：

```ts
const renderers = new Map<string, () => LessonRenderer>();
export function registerRenderer(type: string, factory: () => LessonRenderer) {
  renderers.set(type, factory);
}
```

### 6.2 候选渲染器

| 渲染器 | 适合的题材 | 技术 | 复用 cs-systems-design 的部分 |
|---|---|---|---|
| `isometric` | 系统、协议、状态机 | react-isokit / 原生 SVG | 节点、路由、语义边、移动点 |
| `flow` | 请求链路、数据流、CI/CD | 原生 SVG + DOM | `routeBetween`、`truncateRoute` |
| `code` | 代码逐行讲解 | 代码高亮 + 行锚点 | 7 元组、`state` 快照、来源 |
| `text` | 文字动画、排版解释 | Web Animations API / GSAP / CSS | `MotionSpec`、播放状态机 |
| `diff` | 重构、bug 修复 | 双栏 diff | 步骤 + 高亮 |
| `timeline` | 历史、版本演进 | 水平时间轴 | `compare`、`related` |

### 6.3 渲染器契约测试

每个渲染器都应该通过同一组契约：

- 给定 3–5 个代表性步骤，能渲染出非空 SVG/DOM；
- `local` 不产生连线；
- `lost` 不激活接收方；
- `reducedMotion = true` 时不产生持续动画；
- `theme = dark` 时颜色对比度达标；
- 所有文本可被屏幕阅读器读取（或提供 `aria-label`）。

这样新增渲染器不会破坏内容语义。

## 7. Verifier：验证金字塔

cs-systems-design 的三层检查可以扩展成七层：

| 层 | 检查 | 工具 | 何时跑 | 失败意味着 |
|---|---|---|---|---|
| 1 | Schema | Zod / TypeBox / JSON Schema | 每次保存 | 内容结构不合法 |
| 2 | 引用完整性 | 自定义脚本 | 构建前 | 节点/来源/关联 id 不存在 |
| 3 | 语义不变量 | 自定义规则 | 构建前 | 关系类型与 from/to/motion 矛盾 |
| 4 | 领域回归 | 自定义断言 | 构建前 | 曾经讲错的知识点又错了 |
| 5 | 渲染快照 | Playwright / 静态渲染 | CI | 某一步渲染失败或语义标记错误 |
| 6 | 运动回归 | 假时钟单元测试 | CI | 暂停/恢复/速度/清理有 bug |
| 7 | 事实与来源 | 人工 + LLM + 链接检查 | 发布前 | 代码引用/来源/说法不可靠 |

### 7.1 第 1–3 层：内容契约

```ts
const LessonSchema = z.object({
  schemaVersion: z.literal('0.1'),
  id: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(1),
  summary: z.string().min(10),
  domain: z.string().min(1),
  scenarios: z.object({
    normal: ScenarioSchema,
    fault: ScenarioSchema.optional(),
  }),
  faultExemptReason: z.string().optional(),
  sources: z.array(SourceSchema).min(1),
  meta: z.object({
    reviewedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    license: z.string(),
  }),
}).refine(
  l => l.scenarios.fault || l.faultExemptReason,
  '没有故障场景时必须说明原因'
);
```

### 7.2 第 4 层：领域回归

把「曾经讲错的知识点」固化成断言，是 cs-systems-design 最值得学的工程习惯。下面是伪代码（示意断言 DSL，不是现有 API）：

```ts
// 例：滚动动画教程里，requestAnimationFrame 的调用顺序不能画反
assert.step('raf-before-paint')
  .relation('render')
  .from('main-thread')
  .to('compositor')
  .note('rAF 回调在样式计算/布局之前，绘制在之后');
```

领域回归不需要多，10–30 条就能挡住大部分「内容改着改着就错了」的问题。

### 7.3 第 5–6 层：渲染与运动

- **渲染快照**：对每个场景的每一步渲染一次，断言：
  - 节点数量正确；
  - 关系语义标记正确（箭头/叉/半程/无连线）；
  - `reducedMotion` 变体不包含动画元素；
  - 深色/浅色都能渲染；
  - 标签不超出行数限制。
- **运动回归**：用假时钟测试：
  - 真实经过时间推进；
  - 暂停位置 = 停止时刻位置；
  - 恢复不跳变；
  - 变速保持当前位置；
  - 完成后无残留定时器/帧回调；
  - 末帧完整停留。

### 7.4 第 7 层：事实与来源

- 每个代码引用必须能定位到 `file:line`；
- 每个来源 URL 必须可访问（允许 3xx，记录 404/410）；
- 每个「事实性断言」必须绑定 `sourceRefs`；
- 发布前跑一次链接检查和人工复审；
- 记录 `reviewedAt`，超过 6 个月的内容标记「待复审」。

## 8. 文字动画扩展

### 8.1 cs-systems-design 的空白

它的动效只有：

- 一个沿路径移动的圆点；
- 少量 CSS `transition`（按钮、进度条、toast）；
- `prefers-reduced-motion` 降级。

没有逐字、逐行、滚动叙事、代码高亮扫过这类「文字动画」。如果 tutorials-maker 的目标包含「文字动画比较多的 Web 应用」，这部分需要独立设计。

### 8.2 把文字动画纳入 Step 模型

不要为文字动画另起一套内容格式。仍然用 `StepSpec`，只是把 `motion` 写清楚：

```yaml
- id: split-headline
  label: 标题拆分入场
  relation: reveal
  event: splitText
  explanation: 把标题拆成字符/单词，按 40ms 错峰进入
  state: 标题完全可见，可被屏幕阅读器一次读出
  motion:
    kind: reveal
    durationMs: 600
    delayMs: 0
    easing: cubic-bezier(0.16, 1, 0.3, 1)
    reducedMotion: static
```

### 8.3 文字动画原语

| 原语 | 适用 | 实现建议 | 降级 |
|---|---|---|---|
| `split-reveal` | 标题、关键词 | 按字符/单词拆 DOM，`translateY + opacity` | 直接显示最终状态 |
| `typewriter` | 代码、终端、对话 | 字符串切片，不用逐字 opacity | 直接显示全文 |
| `highlight-sweep` | 代码行、术语 | `clip-path` 或背景渐变 | 静态高亮 |
| `morph` | 概念对比、形状变化 | FLIP / SVG path 插值 | 两帧切换 |
| `stagger` | 列表、卡片 | 子元素延迟 | 同时出现 |
| `counter` | 数字、性能指标 | `requestAnimationFrame` + 格式化 | 直接显示终值 |
| `code-diff` | 重构、bug 修复 | 双栏 + 行级高亮 | 静态 diff |

### 8.4 三条硬规则

1. **动画不能是理解的前提。** `reducedMotion: static` 时必须直接呈现最终状态，而不是「没有内容」。
2. **文本在动画过程中必须可读。** 不要用长时间的逐字 opacity 让读者等；打字机只用于短句/代码。
3. **只动合成友好的属性。** `transform`、`opacity`、`filter`、`clip-path`；避免动画 `width/height/top/left`。动画结束后清理 `will-change`。

### 8.5 与播放状态机的关系

文字动画也应该由 `createPointMotion` 同款「真实时间控制器」驱动，而不是 CSS `animation`：

- 暂停时保留当前位置；
- 恢复时从当前位置继续；
- 变速时保持进度；
- 末帧完整停留；
- 可被假时钟测试。

这正是 cs-systems-design 的 `point-motion.mjs` 可以复用的地方：把「路径上的点」换成「时间轴上的进度」，`paint(progress)` 交给文字动画渲染器。

## 9. 迁移映射：哪些能直接借，哪些要改写

| cs-systems-design 的做法 | tutorials-maker 的处理 |
|---|---|
| `LESSONS` 数据驱动 | 直接借；改成 YAML/JSON + schema |
| 7 元组 Step | 直接借；改成命名字段 + 稳定 id |
| 正常/故障双场景 | 直接借；故障场景可选但需说明原因 |
| 8 种关系语义 | 直接借；按题材扩展词汇表 |
| 等距 IsoKit 渲染 | 作为可选渲染器之一，不作为默认 |
| `createPointMotion` | 直接借；抽成 `packages/player` |
| 三层检查 | 扩展成七层；保留「领域回归」 |
| 知识地图 | 借「只画直接关联」的理念；布局参数化 |
| 本地 localStorage | 直接借；抽成 `LearnerState` |
| 固定 4 节点 | **不要借**；节点数 2–8 可配 |
| 中文正则推断图形 | **不要借**；Node 显式 `kind` |
| 单文件 `app.js` | **不要借**；拆模块 |
| 无 LICENSE 的代码 | **不要直接复制**；只借模式 |
| 只有圆点的动效 | **不要借**；增加文字动画渲染器 |

## 10. 建议的工程结构

```
tutorials-maker/
  content/
    lessons/
      css-scroll-timeline.yaml
      raf-render-pipeline.yaml
      ...
  packages/
    schema/           # LessonSpec、Zod schema、关系规则
    player/           # 播放状态机、时间控制器、LearnerState
    renderers/
      flow/           # 2D 流程图
      isometric/      # 等距图（可选）
      code/           # 代码高亮 + 行锚点
      text/           # 文字动画
    verifier/         # schema / 引用 / 语义 / 领域回归 / 渲染 / 运动
    site/             # 静态站点壳、路由、主题、可访问性
  scripts/
    build.ts          # 内容校验 + 渲染器打包 + 静态生成
    check-links.ts
  tests/
    content/          # 每条 lesson 的契约测试
    render/           # Playwright 快照
    motion/           # 假时钟单元测试
```

### 10.1 构建管线

```
content/*.yaml
  → schema 校验
  → 引用/语义/领域回归
  → 选择渲染器
  → 静态生成（每步一个可索引的 DOM 状态）
  → Playwright 渲染快照
  → 假时钟运动测试
  → 链接/来源检查
  → dist/
```

### 10.2 运行时

```
index.html
  → 加载 lesson JSON（按需）
  → Player（状态机）
  → Renderer（适配器）
  → Inspector（概念/代码/来源）
  → LearnerState（localStorage）
```

内容和运行时之间只有 `LessonSpec` 一个契约。换渲染器、换站点、换部署方式，内容都不用改。

## 11. 不要照搬的部分

1. **不要照搬视觉。** 等距图是 cs-systems-design 的题材选择，不是教程的通用答案。前端动画教程可能更适合 2D 分层图、时间轴或代码 diff。
2. **不要照搬固定 4 节点。** 参数化布局是必须的。
3. **不要照搬中文正则。** 显式 `kind` 比猜测可靠。
4. **不要照搬单文件应用。** 拆模块，至少把状态机、渲染、存储分开。
5. **不要照搬无许可代码。** 参考仓库没有 LICENSE，直接复制有法律风险；借结构、借方法、自己实现。
6. **不要照搬「只有圆点」的动效。** 如果目标是文字动画，必须新增文字动画渲染器。
7. **不要把知识图做成全量依赖图。** 直接关联 + 图例更可读。

## 12. 小结

抽象后的核心只有一句话：

> **用 `LessonSpec` 描述内容，用 `Scenario/Step` 描述过程，用 `RelationKind` 描述语义，用 `Renderer` 描述外观，用 `Player` 描述时间，用 `Verifier` 描述正确性。**

cs-systems-design 证明了这套结构在一个题材上可以做到 216 个阶段零内容错误；tutorials-maker 要做的是把它从「一个站点的实现」提升为「一个内容平台的协议」。
