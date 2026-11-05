# 04 · 落地建议：把参考仓库和 Skill 调研变成一条管线

> 本文把 [01-implementation.md](01-implementation.md)、[02-abstraction.md](02-abstraction.md)、[03-top10-skills.md](03-top10-skills.md) 合成一条可执行的路线。
> 目标不是「做一个 cs-systems-design 的克隆」，而是「让 tutorials-maker 能持续生产可验证的交互教程」。

## 1. 三条设计原则

### 原则 1：内容先行，页面后行

先把 `LessonSpec` 写出来、校验通过，再谈渲染。页面只是内容的一种投影。cs-systems-design 的 `data.js` 118 KB、`app.js` 17.9 KB，比例本身就是答案。

### 原则 2：借架构，不借皮肤；借方法，不借代码

- 借 cs-systems-design 的：7 元组、双场景、关系词汇、三层验证、本地优先。
- 借 teachable-code 的：固定 commit、`file:line`、`runs/` 证据、诚实边界。
- 借 codebase-to-course 的：内容哲学、代码↔英文、应用型测验。
- 借 archify 的：finalize 门禁、artifact 路由、密度/删除原则。
- 借 scroll-craft / remotion 的：滚动叙事、帧级文字动画。
- **不复制任何无 LICENSE 仓库的代码**；只读方法论文档，自己实现。

### 原则 3：验证是产品的一部分

没有验证的「AI 生成教程」不可规模化。每一条内容都要能回答：

- 结构合法吗？
- 引用的代码/来源存在吗？
- 关系语义画对了吗？
- 动画暂停/恢复/降级正确吗？
- 事实和来源可靠吗？

## 2. MVP 范围

### 2.1 做什么

**一条端到端的「简单动画 Web 应用 → 一页交互教程」管线**，先支持 3 类课程：

| 类型 | 例子 | 渲染器 | 关键关系 |
|---|---|---|---|
| **流程型** | 请求从点击到渲染的链路 | `flow`（2D SVG） | request / data / render / paint |
| **状态型** | 滚动驱动动画的进度状态 | `state`（状态机 + 步骤） | event / state / transform |
| **文字型** | 逐字/逐行/滚动揭示 | `text`（时间轴） | reveal / type / highlight / stagger |

### 2.2 不做什么（第一版）

- 不做 3D / 等距图（可以作为后续渲染器）；
- 不做完整课程体系（先做单页教程）；
- 不做 CMS / 账号 / 多租户；
- 不做视频导出（先做网页）；
- 不做自动读任意仓库（先人工/Agent 辅助选 1 个试点仓库）。

### 2.3 试点仓库选择标准

选一个**小型、动画多、结构清晰**的 Web 应用：

- 单页或少量页面；
- 有明确的动画入口（GSAP / CSS scroll-driven / Web Animations API / canvas）；
- 依赖少、能本地跑；
- 代码量 500–5,000 行；
- 有 README 或 demo，便于核对预期行为；
- 许可证允许引用代码片段（或只引用极小片段并注明来源）。

不建议第一版选：框架源码、编译器、训练框架、微服务集群、大型 monorepo。

## 3. 目标架构

```
content/
  lessons/
    scroll-text-reveal.yaml
    click-to-paint.yaml
    ...
packages/
  schema/          LessonSpec + Zod schema + 关系规则
  player/          播放状态机 + 时间控制器 + LearnerState
  renderers/
    flow/          2D SVG 流程图
    state/         状态机 + 状态快照
    text/          文字动画时间轴
  verifier/        schema / 引用 / 语义 / 领域回归 / 渲染 / 运动
  site/            静态站点壳、路由、主题、可访问性
scripts/
  build.ts         校验 + 打包 + 静态生成
  check-links.ts   来源链接检查
tests/
  content/         每条 lesson 的契约测试
  render/          Playwright 快照
  motion/          假时钟单元测试
```

### 3.1 数据流

```
YAML 内容
  → schema 校验（Zod）
  → 引用完整性（node/source/related/codeLine）
  → 语义规则（relation × from/to × motion）
  → 领域回归（曾经讲错的知识点）
  → 渲染器选择（lesson.renderer 或按 domain 默认）
  → 静态生成（每步一个可索引 DOM 状态）
  → Playwright 渲染快照（light/dark/mobile/reduced-motion）
  → 假时钟运动测试
  → 链接/来源检查
  → dist/
```

### 3.2 运行时

```
静态页面
  → 载入 lesson JSON
  → Player（preview/playing/paused/ended）
  → Renderer（flow/state/text）
  → Inspector（概念/代码/来源）
  → LearnerState（localStorage）
```

## 4. LessonSpec 示例：滚动文字揭示

```yaml
schemaVersion: "0.1"
id: scroll-text-reveal
title: 滚动驱动的文字揭示
summary: 滚动进度如何变成文字的位置、透明度和裁剪，以及为什么它比定时动画更跟手。
domain: frontend-animation
difficulty: intro
audience: [vibe-coder, designer]

concepts:
  - id: scroll-progress
    term: 滚动进度
    plain: 页面滚到某个区间时，0 到 1 之间的一个数。
    misconception: 滚动进度不是滚动速度，也不是时间。
  - id: compositor
    term: 合成层
    plain: 浏览器把已经画好的图层拼成最终画面的一步。
  - id: reduced-motion
    term: 动效降级
    plain: 当用户选择减少动态效果时，直接显示最终状态。

scenarios:
  normal:
    id: normal
    name: 正常滚动
    nodes:
      - { id: scroller, label: 滚动容器, kind: actor }
      - { id: timeline, label: 滚动时间轴, kind: control }
      - { id: text, label: 标题文字, kind: dom }
      - { id: compositor, label: 合成器, kind: layer }
    steps:
      - id: s1
        label: 监听滚动
        from: scroller
        to: timeline
        event: scroll
        explanation: 滚动容器产生 scroll 事件，时间轴把滚动位置映射为 0–1 的进度。
        state: progress = 0.42
        relation: event
        motion: { kind: travel, durationMs: 300, reducedMotion: static }
      - id: s2
        label: 计算文字状态
        from: timeline
        to: text
        event: update
        explanation: 根据进度计算 translateY、opacity 和 clip-path。
        state: y = 24px, opacity = 0.58
        relation: state
        motion: { kind: transform, durationMs: 200, reducedMotion: static }
      - id: s3
        label: 合成到屏幕
        from: text
        to: compositor
        event: composite
        explanation: 只改变 transform/opacity，交给合成器，不触发布局。
        state: 文字在当前帧可见
        relation: paint
        motion: { kind: none, durationMs: 0, reducedMotion: static }
    code:
      - file: src/scroll-text.ts
        startLine: 12
        language: ts
        lines:
          - "const progress = clamp((scrollY - start) / (end - start), 0, 1);"
          - "text.style.transform = `translateY(${(1 - progress) * 24}px)`;"
          - "text.style.opacity = String(progress);"

  fault:
    id: fault
    name: 用户开启减少动效
    nodes:
      - { id: user, label: 用户设置, kind: actor }
      - { id: media, label: prefers-reduced-motion, kind: control }
      - { id: text, label: 标题文字, kind: dom }
      - { id: compositor, label: 合成器, kind: layer }
    steps:
      - id: f1
        label: 读取媒体查询
        from: user
        to: media
        event: matchMedia
        explanation: 浏览器把用户的系统设置暴露为媒体查询。
        state: reduced = true
        relation: check
        motion: { kind: none, durationMs: 0, reducedMotion: static }
      - id: f2
        label: 跳过动画
        from: media
        to: text
        event: skip
        explanation: 直接把文字设为最终状态，而不是播放动画。
        state: y = 0, opacity = 1
        relation: state
        motion: { kind: none, durationMs: 0, reducedMotion: instant }
      - id: f3
        label: 正常合成
        from: text
        to: compositor
        event: composite
        explanation: 最终状态仍要合成到屏幕。
        state: 文字清晰可见
        relation: paint
        motion: { kind: none, durationMs: 0, reducedMotion: static }

sources:
  - id: mdn-scroll-timeline
    name: MDN · Scroll-driven animations
    url: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll-driven_animations
    kind: official-doc
    note: 滚动时间轴、进度与合成层的基本语义。
    accessedAt: 2026-11-05
  - id: webdev-reduced-motion
    name: web.dev · prefers-reduced-motion
    url: https://web.dev/articles/prefers-reduced-motion
    kind: article
    note: 动效降级的用户价值和实现方式。
    accessedAt: 2026-11-05

related: [click-to-paint, raf-render-pipeline]

meta:
  version: "0.1.0"
  authors: [tutorials-maker]
  reviewedAt: 2026-11-05
  license: CC-BY-4.0
```

这个例子展示了：

- 正常/故障双场景（故障是「用户开启减少动效」）；
- 关系类型 `event/state/paint/check` 与视觉、测试的对应；
- `motion` 明确声明降级方式；
- 代码块带真实文件与行号；
- 来源带访问日期。

## 5. 分阶段计划

### Phase 0：定协议（1 周）

交付：

- [ ] `LessonSpec v0.1` TypeScript 类型 + Zod schema；
- [ ] 关系词汇表 v0.1（基础 8 种 + 前端/文字扩展）；
- [ ] 3 条示例 lesson（流程/状态/文字各 1）；
- [ ] 校验脚本：schema + 引用完整性 + 语义规则。

验收：

- 3 条示例全部通过校验；
- 故意改坏 10 处（删来源、改 from/to、`local` 加箭头、`lost` 激活接收方等），校验必须报错。

### Phase 1：做播放器（1–2 周）

交付：

- [ ] `packages/player`：状态机 + 时间控制器；
- [ ] 假时钟测试：播放/暂停/恢复/变速/末帧停留/清理；
- [ ] `LearnerState`：完成标记、主题、最近位置；
- [ ] 键盘与 `prefers-reduced-motion`。

验收：

- 状态机测试覆盖 10 个迁移；
- reduced-motion 下不产生持续动画；
- 页面隐藏自动暂停；
- 刷新后进度保留。

### Phase 2：做渲染器（2–3 周）

交付：

- [ ] `flow` 渲染器：2D SVG、正交路由、语义边、移动点；
- [ ] `state` 渲染器：状态机节点 + 当前状态快照；
- [ ] `text` 渲染器：split reveal / typewriter / highlight / stagger；
- [ ] 每个渲染器的契约测试（`local` 无箭头、`lost` 半程、reduced-motion 降级）。

验收：

- 3 条示例在 3 个渲染器上都能正确播放；
- 深色/浅色/移动端/reduced-motion 四种模式截图通过；
- 文字动画暂停后位置不跳变。

### Phase 3：做验证（1–2 周）

交付：

- [ ] `packages/verifier`：七层检查；
- [ ] Playwright 渲染快照：每步 × light/dark × mobile/reduced-motion；
- [ ] 链接检查：来源 URL 可达，记录 404/410；
- [ ] 领域回归：10–30 条「曾经讲错」的断言；
- [ ] 发布清单：`reviewedAt`、`sources`、`codeLine` 齐全。

验收：

- CI 上一次跑完所有检查；
- 任何一条失败都能定位到 lesson id + step id；
- 链接检查有白名单和重试策略，不因临时网络失败误报。

### Phase 4：试点与复盘（2 周）

交付：

- [ ] 选 1 个动画 Web 应用仓库，做 1 条完整教程；
- [ ] 用 codebase-to-course 的教学法 + teachable-code 的证据链 + archify 的图；
- [ ] 收集 5–10 位目标读者的反馈；
- [ ] 复盘：时间成本、事实错误、动效问题、可维护性。

验收：

- 读者能在 10 分钟内说出「这个动画的输入、状态、输出」；
- 测验正确率 ≥ 70%；
- 事实错误 0（人工复核）；
- 单条教程生产时间可估算（例如 < 1 人日）。

## 6. 质量门（CI）

```yaml
# 概念示意
checks:
  content:
    - schema
    - references
    - semantics
    - domain-regressions
  render:
    - snapshot: [light, dark]
    - viewport: [desktop, mobile]
    - reduced-motion
  motion:
    - play-pause-resume
    - speed-change
    - final-dwell
    - cleanup
  sources:
    - link-check
    - reviewed-at-freshness
  a11y:
    - axe
    - keyboard
    - focus-visible
    - contrast
```

失败策略：

- schema / 引用 / 语义 / 领域回归：**阻塞合并**；
- 渲染 / 运动 / a11y：**阻塞合并**；
- 链接检查：警告 + 定期任务，不阻塞（避免网络误报）；
- 事实核查：人工 sign-off，阻塞发布。

## 7. 内容生产流程（人 + Agent）

```
1. 选仓库：小型、动画多、许可允许
2. 固定 commit，记录 URL + SHA
3. 扫描：入口、模块、动画链路、状态、样式
4. 提概念：3–8 个必须建立的概念 + 常见误解
5. 写双场景：正常流程 + 一个故障/边界
6. 写步骤：7 元组（label/from/to/event/explanation/state/relation）
7. 挂证据：file:line + source
8. 写测验：应用型，不是背诵型
9. 机检：schema / 引用 / 语义 / 渲染 / 运动
10. 人审：事实、教学、可读性
11. 发布：记录 reviewedAt / 版本 / 变更说明
```

Agent 可以加速 3–8，但不能替代 9–10。**验证和事实核查必须有人类 sign-off。**

## 8. 度量

| 维度 | 指标 | 目标（MVP） |
|---|---|---|
| 内容 | lesson 数 | 3 条示例 + 1 条试点 |
| 内容 | 每条 step 数 | 4–6 |
| 内容 | 每条来源数 | ≥ 3 |
| 质量 | schema/引用/语义错误 | 0 |
| 质量 | 事实错误（人工复核） | 0 |
| 质量 | 渲染快照通过率 | 100% |
| 体验 | 完成率 | ≥ 50% |
| 体验 | 测验正确率 | ≥ 70% |
| 体验 | 10 分钟内能复述核心机制 | ≥ 80% 受访者 |
| 成本 | 单条教程生产时间 | 可估算、可下降 |
| 维护 | 链接失效率 | < 10%，有复审机制 |

## 9. 风险与对策

| 风险 | 表现 | 对策 |
|---|---|---|
| 内容错误 | LLM 编造代码行为/来源 | 固定 commit + `file:line` + fact-check gate + 人审 |
| 许可风险 | 复制了无 LICENSE 仓库的代码 | 只借方法，不复制；引用代码片段注明来源与许可 |
| 动效不可访问 | 动画是理解前提、无法暂停 | reduced-motion 直接呈现最终状态；播放器可暂停 |
| 性能 | 文字动画卡顿、移动端掉帧 | 只动 transform/opacity/filter/clip-path；限制同时动画元素数 |
| 范围蔓延 | 想做 3D、视频、CMS、账号 | MVP 锁定 3 类课程 + 静态站点 |
| 维护 | 来源失效、代码漂移 | reviewedAt + 链接检查 + 重新固定 commit |
| Agent 依赖 | 换模型后输出不稳定 | 内容 schema 和验证与模型解耦；Agent 只是作者之一 |
| 评分误导 | star 高但不适合 | 按目标选型，不按 star 选型 |

## 10. 开放问题

1. **试点仓库选哪个？** 建议从「滚动文字动画 / 点击到渲染 / 一个小组件库」三类里选一个。
2. **是否需要 3D/等距渲染器？** 如果目标题材是系统/硬件，值得；如果是纯前端动画，2D + 文字优先。
3. **内容语言？** 中文优先，但 schema 要预留 i18n 字段。
4. **是否做视频导出？** 第一版不做；如果做，Remotion 是更合适的路线，不要自己写编码器。
5. **是否做 CMS？** 第一版不做；YAML + Git + PR 评审已经够用。
6. **是否直接采用某个 Skill？** 建议「借方法 + 自研管线」，而不是把一个无 LICENSE 的 Skill 塞进产品。
7. **如何衡量「学会了」？** 除了测验，考虑「让读者用自己的话解释一遍」或「让读者改一个参数并预测结果」。

## 11. 下一步（本周可做）

1. 把 [02-abstraction.md](02-abstraction.md) 的 `LessonSpec` 落成 `packages/schema` 的 TypeScript + Zod。
2. 把本文第 4 节的 YAML 示例写成第一条 `content/lessons/scroll-text-reveal.yaml`，跑通 schema 校验。
3. 把 cs-systems-design 的 `point-motion.mjs` 思路重写成 `packages/player` 的时间控制器（不复制代码）。
4. 选一个动画 Web 应用仓库，做一次 30 分钟的「能不能讲清楚」评估。
5. 决定第一版做 `flow` 还是 `text` 渲染器；不要同时做三个。

## 12. 一句话总结

> **先用 LessonSpec 把「教什么」固定下来，再用 Renderer 把「怎么显示」解耦，最后用 Verifier 把「是否可信」变成 CI。**
>
> cs-systems-design 证明了这套方法在一个题材上可行；Top 10 Skill 调研说明了没有现成全能选手。tutorials-maker 的机会，是把两者之间的空隙补上。
