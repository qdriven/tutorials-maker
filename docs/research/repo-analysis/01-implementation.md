# 01 · cs-systems-design 实现原理

> 参考仓库：`references/cs-systems-design`（[kejun/cs-systems-design](https://github.com/kejun/cs-systems-design)）
> 本文引用的行号均为该仓库本地副本的行号；`dist/` 是构建产物，但也是实际运行代码。
> 站点：<https://kejun.github.io/cs-systems-design/>

## 1. 一句话概括

**一个手工编写内容、用数据驱动、零后端的静态交互式系统设计教程。**

它把「计算机系统设计」拆成 27 个主题；每个主题有两条完整场景（主流程 + 故障），每条场景 4 个阶段；每个阶段用一个 7 元组描述「谁把什么发给谁、发生了什么、状态变成什么、这是什么关系」。页面根据这些数据播放等距（isometric）示意图、执行轨迹表、机制说明、伪代码和来源。

它不是一个「教程生成器」，而是一个**内容已经写好、运行时只负责解释内容**的阅读器。这一点对 tutorials-maker 很关键：先有内容契约，再有页面。

## 2. 规模与产物

| 指标 | 数值 |
|---|---|
| 主题 | 27 个，分 3 组（执行与性能 8、状态与正确性 8、分布式协作 11） |
| 场景 | 54 条（27 主题 × 主流程/故障双场景） |
| 演示阶段 | 216 个（54 × 4） |
| 来源 | 39 条（课程、官方文档、论文、手册） |
| 运行时 | 纯静态；无后端、无 CDN、无外部服务 |
| 部署 | GitHub Pages；`dist/` 直接托管 |
| 构建 | `npm ci && npm run build && npm run check` |

产物大小（`dist/`）：

| 文件 | 大小 | 作用 |
|---|---:|---|
| `index.html` | 9.1 KB | 静态页面骨架、面板、对话框、无障碍属性 |
| `data.js` | 118.3 KB | 已审计的课程内容（`SOURCES` / `GROUPS` / `LESSONS`） |
| `mechanisms.js` | 42.3 KB | 27 个主题的深入解释与 CSAPP 阅读映射 |
| `app.js` | 17.9 KB | 导航、场景状态、轨迹、详情、知识图、播放 |
| `styles.css` | 26.0 KB | 视觉系统、响应式、暗色主题、reduced-motion |
| `isokit.js` | 267.2 KB | React 19.3.1 + react-isokit 0.5.0 的隔离渲染包 |
| `isokit.css` | 10.5 KB | IsoKit 样式 |

技术栈：**原生 JavaScript + DOM 字符串模板**；React 只用于等距图渲染，并且被 esbuild 打成一个独立的 IIFE 包，通过 `window.SystemsDiagram` 暴露一个 `render` 方法。应用其余部分不依赖 React。

## 3. 文件分层

```
dist/index.html          静态骨架：顶栏 / 左目录 / 中画布 / 右详解 / 底部轨迹
dist/data.js             SOURCES + GROUPS + LESSONS（课程内容）
dist/mechanisms.js       MECHANISM_DETAILS + CSAPP_READINGS（长文解释）
dist/isokit.js           React + IsoKit 渲染岛，暴露 window.SystemsDiagram
dist/app.js              应用逻辑：选择、播放、渲染、知识图、本地存储
dist/styles.css          设计令牌、布局、响应式、主题、动效降级
scripts/build.mjs        esbuild 打包 + 许可证收集 + build-info
check-content.cjs        内容契约
check-isokit.cjs         216 阶段渲染回归
check-motion.cjs         时间/位置/暂停/速度/清理回归
```

`index.html` 的加载顺序是 `data.js → mechanisms.js → isokit.js → app.js`，全部 `defer`（`dist/index.html:7-8`）。`app.js` 直接读取全局 `LESSONS`、`SOURCES`、`MECHANISM_DETAILS`、`CSAPP_READINGS`。这是有意的取舍：**内容不是模块，而是先于应用加载的数据**。

## 4. 内容模型

### 4.1 顶层结构

`dist/data.js` 只有三个全局常量：

| 常量 | 行号 | 形状 | 作用 |
|---|---:|---|---|
| `SOURCES` | 2 | `{ [id]: { name, url, note, kind } }` | 来源卡片；`kind` 区分课程背景 / 官方文档 / 原始论文 / 具体机制资料 |
| `GROUPS` | 238 | `[{ id, name, en, color, question }]` | 三个部分；`question` 是该部分的总问题 |
| `LESSONS` | 261 | `Lesson[]` | 27 个主题的全部内容 |

`dist/mechanisms.js`：

| 常量 | 行号 | 形状 | 作用 |
|---|---:|---|---|
| `CSAPP_READINGS` | 3 | `{ [id]: { section, title, path, note } }` | CSAPP 中文版章节映射 |
| `MECHANISM_DETAILS` | 26 | `{ [id]: { sections, foundation, readings, sources? } }` | 每个主题的深入解释 |

### 4.2 Lesson 的字段

```js
{
  group: 0 | 1 | 2,
  id: "cache",
  title: "缓存与局部性",
  en: "CACHE & LOCALITY",
  summary: "把经常使用、即将再次使用的数据，放到离计算更近的地方。",
  nodes: ["CPU", "缓存控制器", "缓存存储阵列", "主存 DRAM"],
  steps: [ /* 4 个 Step */ ],
  principle: "时间局部性复用最近访问；空间局部性利用相邻数据。",
  tradeoff: "提高命中率通常要同时考虑布局、工作集、替换策略和维护一致性的成本。",
  pitfall: "缓存行不同于对象；不同线程写同一行中的不同变量，也可能产生伪共享。",
  code: ["entry = cache.lookup(address)", "if entry.missing:", "  block = lowerLevel.readLine(lineBase(address))"],
  sources: ["cache_notes", "csapp"],
  related: ["vm", "pipeline", "measure"],
  fault: {
    name: "工作集超过容量",
    nodes: ["CPU", "缓存控制器", "缓存阵列 · 2 行", "主存 DRAM"],
    steps: [ /* 4 个 Step */ ],
    code: [ /* 故障场景的伪代码 */ ]
  }
}
```

几个设计点：

- **`nodes` 固定 4 个。** 这不是巧合，而是布局和测试的硬约束：`POSITIONS` 只有 4 个坐标（`src/isokit-model.mjs:2`），`check-content.cjs` 会断言每个场景 `nodes.length === 4`。
- **`fault` 是完整场景，不是备注。** 它有独立的 `nodes`、`steps`、`code`，甚至可以有不同角色。测试会断言 `l.steps !== l.fault.steps`，防止两个场景共享可变数组（`check-content.cjs:17-18`）。
- **`related` 是无向关联，不是前置依赖。** 页面明确写「连线：技术关联，无方向，不代表执行顺序或前置依赖」（`dist/index.html:31`）。
- **`sources` 与 `related` 都是 id 引用。** 内容校验会检查每个 id 存在、URL 是 HTTPS（`check-content.cjs:23-24`）。

### 4.3 Step 的 7 元组

这是整个内容模型的最小单元：

```js
[
  label,        // 0 步骤名，例如 "发出读取"
  from,         // 1 起点节点索引
  to,           // 2 终点节点索引
  event,        // 3 事件/信号，例如 "LOAD A"
  explanation,  // 4 这一步为什么发生、省略了什么
  state,        // 5 执行后的状态观察，例如 "A 的读取尚未完成"
  relationKind  // 6 关系类型
]
```

`relationKind` 只有 8 种：

| 值 | 含义 | 视觉编码 | 语义约束 |
|---|---|---|---|
| `request` | 请求传递 | 实线箭头 + 移动圆点 | `from !== to` |
| `data` | 数据传递 | 实线箭头 + 移动圆点 | `from !== to` |
| `control` | 控制关系 | 虚线 | `from !== to` |
| `check` | 条件校验 | 虚线 | `from !== to` |
| `reject` | 请求被拒绝 | 终点画 X，不画箭头 | `from !== to` |
| `lost` | 传递中断、未到达 | 路线只画一半，途中标红 | `from !== to`，接收方不高亮 |
| `local` | 内部操作 | 无连线 | 必须 `from === to` |
| `compare` | 方案对照 | 无箭头 | `from !== to` |

这套词汇表的价值在于：**关系类型同时约束了「内容语义」「图形语法」和「测试断言」**。例如 `local` 不允许发明一条传递箭头，`lost` 必须只激活发送方，`reject` 和 `lost` 不能看起来像成功送达。`check-content.cjs:21` 和 `check-isokit.cjs` 都围绕这些约束写断言。

### 4.4 深入解释的结构

`MECHANISM_DETAILS[id]`：

```js
{
  sections: [ { title, body }, ... ],  // 3 段左右的机制解释
  foundation: "§1.5 ... §9.3 ...",      // 与 CSAPP 的关系
  readings: ["locality", "paging"],     // CSAPP 章节 id
  sources: ["..."]                       // 可选，额外来源
}
```

它和 `LESSONS` 分开，是因为两者的阅读节奏不同：`LESSONS.steps` 是「时间轴」，`MECHANISM_DETAILS.sections` 是「长文」。右侧检查器的三个页签正好对应三种阅读模式：

- **机制**：`summary + principle + sections + tradeoff + pitfall + CSAPP + related`
- **伪代码**：`code + 当前步骤的 state`
- **来源**：所有来源卡片 + 整理范围说明

## 5. 场景与播放状态机

### 5.1 运行时状态

`dist/app.js` 顶部的可变状态（压缩后仍在同一行）：

```js
let current = byId[location.hash.slice(1)] || LESSONS[0],
    step = 0,
    fault = false,
    filter = 'all',
    query = '',
    detail = 'concept',
    view = 'mechanism',
    timer = null,
    speed = 1,
    motionMode = 'preview',
    motionVersion = 0,
    playbackEnded = false;
```

关键函数：

| 函数 | 行号 | 职责 |
|---|---:|---|
| `scenario()` | 约 17 | `fault ? current.fault : current` |
| `frames()` | 约 18 | `scenario().steps` |
| `play()` | 28 | 播放/暂停切换，`setInterval(2600 / speed)` |
| `stop()` | 约 27 | 清定时器，`motionMode = 'paused'`，重绘 |
| `finish()` | 39 | 标记完成、保存进度、刷新导航/地图/提示 |
| `goStep(n)` | 40 | 手动跳步，停止播放，触发一次预览动画 |
| `select(id)` | 42 | 切换主题，重置 step/fault/view/detail/hash |
| `renderStep()` | 77 | 渲染当前步骤的图、轨迹、详情、按钮状态 |
| `renderMap()` | 79 | 渲染知识地图 |

### 5.2 状态机

```
                    select(id)
                         │
                         ▼
                   preview(step 0)
                    │           ▲
                 play()         │ reset / Esc
                    ▼           │
                 playing ───────┘
                 │      │
       pause/stop│      │ last tick
                 ▼      ▼
              paused   ended
                 │        │
              play()    play() → 回到 step 0 并重新播放
```

不变量：

- `timer !== null` ⇔ 正在播放；
- `0 <= step <= frames().length - 1`；
- `motionMode` 与 `timer` 一致（播放中为 `playing`，否则 `paused`/`preview`）；
- `playbackEnded` 只在最后一个阶段完整停留一个间隔后为 `true`；
- 切换主题、切换场景、手动跳步都会 `stop()` 并 `cueMotion()`（递增 `motionVersion`，让动画从头预览）。

### 5.3 播放细节

`play()`（`dist/app.js:28`）做了几件容易被忽略的事：

1. 如果当前已经在最后一帧且处于 `preview`，先回到第 0 帧；
2. 用 `setInterval(2600 / speed)` 推进，**不是** `requestAnimationFrame`；图上的圆点动画是独立的时间驱动；
3. 进入最后一帧时不立即 `stop()`，而是再等一个间隔，让最后一帧的传输动画完整播放；
4. 最后一个间隔结束后才 `playbackEnded = true`、`stop()`、`finish()`。

`check-motion.cjs` 专门把 `play()` 从 `app.js` 里切出来，在 `vm` 里用假定时器跑一遍，断言「进入最后一帧不能立即停止」「最后一个间隔才 finish」。这是一个非常具体的 UX bug 回归测试。

### 5.4 键盘与可见性

`dist/app.js:105` 的全局键盘处理：

| 键 | 行为 |
|---|---|
| `/` | 聚焦搜索；移动端先打开侧栏 |
| `Space` | 播放/暂停（焦点不在按钮/链接上时） |
| `←` / `→` | 上一步 / 下一步（仅在机制视图） |
| `Esc` | 停止、回到第 0 步、关闭菜单 |
| `Enter` / `Space` | 在轨迹行上跳转到该步 |

`visibilitychange`（`dist/app.js:108`）：页面隐藏时自动暂停。这个细节避免用户切走后动画继续跑、回来时状态错位。

## 6. 等距图形层

### 6.1 渲染边界

`src/isokit-renderer.jsx` 只有 14 行：

```jsx
let root;
window.SystemsDiagram = Object.freeze({
  render(props) {
    root ??= createRoot(document.getElementById('diagram'));
    // Keep the diagram and the existing synchronous trace/controls on the same frame.
    flushSync(() => root.render(<MechanismScene {...props} />));
  },
});
```

这是整个仓库最重要的架构边界之一：**React 是一个岛，不是应用本身**。宿主应用只认识一个命令式接口 `render(props)`，不需要知道 React、IsoKit 或组件树。`flushSync` 保证图形和右侧的 DOM 轨迹表在同一帧更新。

### 6.2 场景组件

`MechanismScene`（`src/isokit-scene.jsx:61`）接收：

```js
{
  label, nodes, frame, playing,
  motionMode, motionVersion, speed, stageKey, reducedMotion, dark
}
```

它根据 `frame[6]`（关系类型）决定：

- `transfer = request || data`：画实线箭头，并挂载 `TravelDot`；
- `rejected = reject || lost`：画 X 标记或半程路线；
- `compare`：不画箭头；
- `local`：不画连线，节点上画一个「内部操作」标记；
- 只有 `transfer && !reducedMotion` 才渲染移动圆点。

### 6.3 布局与路由

`src/isokit-model.mjs`：

| 函数/常量 | 行号 | 作用 |
|---|---:|---|
| `POSITIONS` | 2 | 四个固定坐标，2×2 布局 |
| `routeBetween(from, to)` | 10 | 生成正交路由；同一行走直线，不同行走中央走廊 |
| `truncateRoute(points, fraction)` | 25 | 按路径长度截断，用于 `lost` 的半程 |
| `labelLines(text, max)` | 41 | 中英文混排的按宽度换行 |
| `illustrationFor(name)` | 55 | 根据中文关键词推断 5 种图形原型 |

`illustrationFor` 用正则把节点名映射到 `compute / queue / storage / control / record`：

```js
if (/队列|缓冲|Outbox|就绪集合/.test(name)) return 'queue';
if (/校验|检查器|规范|权限|锁状态|监控|模型|控制器|MMU|TLB/.test(name)) return 'control';
if (/日志|存储|数据库|磁盘|数据页|版本链|检查点|记录|页面|索引|内存|主存|DRAM|缓存|页表/.test(name)) return 'storage';
if (/CPU|线程|Worker|任务|事务|Leader|Follower|客户端|服务端|执行|调度|处理|消费|转发|回调/.test(name)) return 'compute';
return 'record';
```

这是一个「内容到视觉」的启发式推断：作者只写节点名，图形自动选型。优点是内容成本低；缺点是**只对中文关键词有效**，换语言或换领域就会退化。tutorials-maker 如果要做通用内容模型，应该把 `kind` 显式写进 Node，而不是靠正则猜。

### 6.4 运动控制器

`src/point-motion.mjs:17` 的 `createPointMotion` 是一个与 React 解耦的时间控制器：

- 输入：`points`、`duration`、`paint`、`requestFrame`、`cancelFrame`、`now`；
- 内部维护 `progress`、`running`、`pending`、`previous`；
- `advance(time)` 用**真实经过时间**推进，而不是每次固定加一点；
- `pause()` 在停止前先 `advance(now())`，保证暂停位置是真实停止时刻的位置；
- `setDuration()` 在运行中先结算当前位置，再改速度；
- 完成后不再调度下一帧。

`TravelDot`（`src/travel-dot.jsx:4`）把它接到 SVG `<circle>` 上，写 `cx`、`cy` 和 `data-progress`。`data-progress` 是测试钩子，浏览器检查可以直接读到进度。

这套控制器的关键取舍：**动画时间与步骤定时器是两条独立时间线**。步骤每 2.6 秒切一次；圆点在自己的 `duration = 2200 / speed` 内走完。暂停时两条时间线都停；改速度时只改圆点，不改步骤间隔。这比「用 CSS animation 让圆点跟着步骤走」可控得多。

## 7. 阅读层

`renderDetail()`（`dist/app.js:45`）负责右侧检查器。它有三个页签：

| 页签 | 内容 | 细节 |
|---|---|---|
| 机制 | `summary`、`principle`、`sections`、`tradeoff`、`pitfall`、CSAPP 关联、`related` | 用 `esc()` 转义所有文本 |
| 伪代码 | `code`、当前 `state` 快照、来源说明 | 行号补零，等宽字体 |
| 来源 | 去重后的来源卡片、整理范围、完整说明按钮 | `kind` 标签区分资料类型 |

一个值得借鉴的 UX 细节：**动画推进时不重置阅读位置**。

```js
const key = current.id + ':' + detail;
if (detail !== 'code' && renderedDetail === key) return;
```

只要主题和页签没变，`renderDetail` 直接返回，不重写 DOM，因此读者在右侧滚动的位置、聚焦的链接都不会被动画打断。切到「伪代码」时例外，因为伪代码需要跟随当前步骤更新状态快照。

## 8. 知识地图

`renderMap()`（`dist/app.js:79`）把 27 个主题排成 3 列（每组一列），每个主题一个矩形节点；只画**当前主题的直接关联**，不是全量图。

- 布局：`x = pad + groupIndex * 218`，`y = 85 + indexInGroup * 68`；
- 同列关系：从右侧绕一条 lane 回来；
- 跨列关系：走顶部 `y=70` 的走廊；
- 相邻列关系：用三次贝塞尔曲线；
- 完成状态：节点编号替换成 `check` 图标；
- 图例明确写「无方向，不代表执行顺序或前置依赖」。

这是一个**认知负荷**上的取舍：全量图会变成蜘蛛网，只画直接关联能让读者聚焦当前主题。代价是看不到两跳以外的路径。对 tutorials-maker 的启示：知识图不一定要展示全部边，可以「当前节点 + 直接邻居 + 分组」优先。

## 9. 可访问性与响应式

### 9.1 无障碍

| 机制 | 位置/实现 |
|---|---|
| 跳转链接 | `dist/index.html:11` `<a class="skip" href="#main">` |
| 主区域可聚焦 | `main tabindex="-1"` |
| 页签语义 | `role="tablist"` / `role="tab"` / `aria-selected` |
| 按钮状态 | `aria-pressed`（主流程/故障、标记已学） |
| 状态播报 | `#toast role="status"`、场景说明 `aria-live="polite"` |
| 焦点可见 | `:focus-visible` 3px 黄色 outline |
| 关闭对话框 | 原生 `<dialog>` + `showModal()` + `close()` |
| 键盘操作 | Space / ← → / Esc / `/` |
| 动画降级 | `prefers-reduced-motion` + `body.no-motion` |
| 本地状态容错 | `safeRead` 用 try/catch 包住 `JSON.parse` |

### 9.2 响应式

断点：

| 断点 | 布局变化 |
|---|---|
| `min-width: 1600px` | 三栏加宽，字号略增 |
| `max-width: 1190px` | 三栏压缩，顶栏简化 |
| `max-width: 990px` | 两栏：侧栏 + 内容；轨迹移到下方 |
| `max-width: 700px` | 单栏；侧栏变抽屉；轨迹在画布下方；移动菜单 |
| `max-width: 375px` | 进一步压缩字号和工具栏 |

### 9.3 主题

`body.dark` 覆盖一组 CSS 变量（`--ink`、`--paper`、`--panel`、`--accent`、`--fault` 等），`color-scheme: dark` 同步原生控件。主题和完成进度写入 `localStorage`，并用 `storage` 事件跨标签页同步。

## 10. 构建与验证

### 10.1 构建

`scripts/build.mjs` 只做一件事：把 React 岛打成一个可预测的包。

```js
await build({
  entryPoints: ['src/isokit-renderer.jsx'],
  outfile: 'dist/isokit.js',
  bundle: true, minify: true, format: 'iife', target: ['es2020'],
  jsx: 'automatic',
  define: { 'process.env.NODE_ENV': '"production"' },
  legalComments: 'eof', metafile: true,
});
```

然后：

- 复制 `react`、`react-dom`、`react-isokit` 的 LICENSE 到 `dist/licenses/`；
- 复制 IsoKit 的 NOTICE；
- 断言 `metafile.inputs` 里确实包含 `react-isokit`（防止打包配置错误导致「假渲染」）；
- 写 `dist/licenses/build-info.json`，记录版本与产物字节数。

依赖版本全部 pin：`react@19.3.1`、`react-dom@19.3.1`、`react-isokit@0.5.0`、`esbuild@0.28.2`（`package.json`）。构建结果是确定性的，便于审计和复现。

### 10.2 三层验证

| 脚本 | 验证对象 | 关键断言 | 不能证明什么 |
|---|---|---|---|
| `check-content.cjs` | 内容契约 | 27 主题、3 组 8/8/11、54 独立场景、216 个 7 元组、节点索引合法、关系类型合法、`local` 必须 `from===to`、来源存在且 HTTPS、领域回归（Raft ACK 方向、WAL 持久化语义、B+ 树/LSM 分支等） | 不能证明协议正确，也不能证明文字教学质量 |
| `check-isokit.cjs` | 渲染回归 | 216 个阶段全部用真实库渲染；4 个节点、4 个 Box；`local/compare` 无箭头；只有 `request/data` 有移动点；暂停保留位置；reduced-motion 不渲染移动点；投影往返误差 < 0.001；`lost` 恰好半程且接收方不高亮；标签 ≤ 2 行；路由正交 | 不能证明视觉美观，也不能覆盖所有浏览器 |
| `check-motion.cjs` | 运动回归 | 路径插值、拐角、暂停/恢复、速度变化、延迟首帧、丢帧后落点、回调清理、最后阶段完整停留 | 不能证明真实浏览器的帧率与布局 |

`check-content.cjs` 里的「领域回归」尤其值得注意：

```js
const raft = lessons.find(l => l.id === 'raft');
assert(raft.steps.some(s =>
  /Follower|副本 B/.test(raft.nodes[s[1]]) &&
  /Leader|领导/.test(raft.nodes[s[2]]) &&
  /ACK|确认|响应/.test(s.join(' '))
), 'Raft confirmation must come from follower to leader');

assert.equal(raft.fault.steps[1][6], 'lost',
  'Undelivered replication must not look like a successful transfer');
```

这不是通用 schema 能覆盖的，而是**把曾经讲错过的知识点固化成回归测试**。内容越重要，越值得这样做。

### 10.3 本次实际执行

在本地参考仓库执行：

```bash
node check-content.cjs
# Content contracts passed: 27 lessons, 54 independent scenarios, 216 typed stages, valid references.
```

通过。`check-isokit.cjs` 与 `check-motion.cjs` 需要 `npm ci`（esbuild、react、react-isokit），本次未安装依赖，因此以阅读代码与仓库自带证据为准。仓库自己的 `docs/isokit-integration.md` 与 `docs/motion-fix.md` 记录了完整的渲染/运动检查结果，并明确写出「浏览器回归未完整完成」的边界。

### 10.4 工程文化

`docs/isokit-integration.md`、`docs/motion-fix.md`、`dist/accuracy-audit.md` 是三个「工程日志」：

- 记录改了什么、为什么改；
- 记录验证了什么、没验证什么；
- 明确写出「这不能证明协议正确」「最终浏览器覆盖有限」。

这种**诚实边界**比「全部通过」更有价值。tutorials-maker 如果要做可信的教育内容，应该把这种日志作为交付物的一部分。

## 11. 技术特点（按可复用价值排序）

1. **内容即数据，且有契约。** `LESSONS` 是唯一事实来源；schema、引用、语义都由测试守着。
2. **正常/故障双场景。** 故障不是脚注，而是有独立角色、独立状态、独立伪代码的完整叙事。
3. **语义化关系词汇表。** 8 种关系同时约束内容、图形和测试，避免「箭头画错意思」。
4. **时间驱动动画与步骤定时器解耦。** 圆点按真实时间走，暂停/恢复/变速都精确。
5. **渲染器适配层。** `window.SystemsDiagram.render(props)` 是宿主与图形之间唯一的缝。
6. **三层验证。** 内容契约 → 渲染回归 → 运动回归，每层都能独立失败。
7. **零后端、本地优先。** 静态部署、hash 路由、localStorage，适合教程类站点。
8. **动效降级是硬约束。** `prefers-reduced-motion` 和 `body.no-motion` 不是补丁，而是渲染条件。
9. **知识图只画直接关联。** 用限制换可读性。
10. **视觉系统有明确立场。** 纸/墨/细线/编号，等距图形代表逻辑实体，不是物理拓扑。

## 12. 局限与风险

| 局限 | 表现 | 对 tutorials-maker 的启示 |
|---|---|---|
| 固定 4 节点 | 无法表达 5+ 参与者的系统 | 布局要参数化，节点数 2–8 可配 |
| 中文正则推断图形 | `illustrationFor` 只认中文关键词 | Node 上显式写 `kind`，不要靠猜 |
| 手工内容成本高 | `data.js` 118 KB，无 CMS/authoring | 先做内容 schema 和校验，再做编辑器 |
| `app.js` 单文件 | 111 行但每行很长，字符串模板多 | 拆成模块；至少把状态机、渲染、存储分开 |
| React 包偏大 | 267 KB 只为图形 | 如果图形简单，可用原生 SVG；如果复杂，接受这个成本 |
| 无文字动画 | 只有圆点移动 + 少量 CSS 过渡 | 文字动画需要独立的时间轴/渲染器 |
| 校验是领域回归 | 断言写死了 Raft/WAL 等知识点 | 通用 schema + 领域断言两层都要有 |
| 无仓库级 LICENSE | GitHub 显示 `none` | 直接复制代码有风险；只借模式，不搬代码 |
| 来源会失效 | 39 条外链无自动检查 | 加链接检查与内容复审日期 |
| 知识图不完整 | 只画直接关联 | 明确图例，避免读者误解为全图 |

## 13. 小结

cs-systems-design 是一个「**内容先行、验证兜底、渲染可换**」的样板。它真正值得学的不是等距插画，而是：

> 把每一节课拆成可验证的数据；把每一种关系定义成有语义的图元；把每一次播放拆成可测试的状态迁移；把每一个「我们没验证」写清楚。

这四句话可以直接作为 tutorials-maker 的设计原则。
