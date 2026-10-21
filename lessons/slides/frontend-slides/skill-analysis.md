# frontend-slides 源码分析

> 对象:[zarazhangrui/frontend-slides](https://github.com/zarazhangrui/frontend-slides)(MIT,~31k stars / 2.4k forks,2026-10 时点)
> 分析基于本地工作副本 `tutorials/frontend-slides/`(`.gitignore` 约定不入库,克隆后请参照上游仓库)
> 关联课程:[第一课 · 把文档变成网页幻灯片](README.md)

## 1. 它做什么

一句话:**一份写给 coding agent 的「做 slides 工作流说明书」+ 配套设计资产,产出零依赖的单文件 HTML 演示文稿。**

关键定性:它**不是**运行时代码 —— 没有一个会被你部署的库或 CLI;真正「运行」的是 agent 本身。skill 的全部价值在于把「怎么把需求变成一份合格 deck」的隐性设计知识,写成了 agent 可执行的过程性指令(prompt 工程 + 设计系统文档)。

三种工作模式(SKILL.md Phase 0):

| 模式 | 输入 | 输出 |
|---|---|---|
| A 新建 | 口述需求 / 文档 / 图片 | 单文件 HTML deck |
| B 转换 | `.pptx` | 保留文字、图片、页序、备注(转 HTML 注释)的 deck |
| C 增强 | 已有 HTML deck | 加内容 / 改风格(先查密度限制,防溢出) |

## 2. 仓库结构

```text
frontend-slides/
├── SKILL.md                     # 入口:核心工作流(六阶段)+ 全局铁律
├── README.md                    # 面向人的说明:安装、用法、模板画廊
├── STYLE_PRESETS.md             # 12 个安全预设(暗/亮/特色,含配色 CSS)
├── viewport-base.css            # 强制基础 CSS:固定 16:9 舞台(必须全量拷入产物)
├── html-template.md             # 产物 HTML 架构 + 控制器 JS + 行内编辑规范
├── animation-patterns.md        # 动画模式参考(效果→情绪对照表 + CSS/JS 片段)
├── bold-template-pack/
│   ├── selection-index.json     # 34 套 bold 模板的紧凑元数据索引
│   └── templates/<slug>/
│       ├── preview.md           # 轻量风格卡(预览阶段只读这个)
│       ├── design.md            # 完整设计系统(选定后才读)
│       └── (deck-stage.js)      # 部分模板附带的舞台缩放器
├── scripts/
│   ├── extract-pptx.py          # python-pptx 抽取 PPT 内容
│   ├── deploy.sh                # 部署到 Vercel(自动打包 src 引用的本地资源)
│   └── export-pdf.sh            # Playwright 逐页 1920×1080 截图合成 PDF
├── .claude-plugin/marketplace.json   # Claude Code 插件市场清单
└── plugins/frontend-slides/     # 插件包:plugin.json + 同一份 skill 的规范目录
```

## 3. 架构:渐进式披露(progressive disclosure)

核心设计决策:**SKILL.md 只是地图,支撑文件按需加载**。这是 agent-skill 最佳实践 —— 先给 agent 一张工作流地图,当前选择需要哪个文件才揭示哪个文件。

加载顺序(以新建模式为例):

```text
SKILL.md(永远)
  ├─ P1 内容发现 ──(用户提供图片时)─▶ 逐张图像理解 + 可用性评估
  ├─ P2 风格发现 ─▶ STYLE_PRESETS.md(候选预设)
  │                ─▶ selection-index.json(紧凑索引,34 选 3)
  │                ─▶ 只读入围者的 preview.md(小卡片)
  │                ─▶ 用户选定后,只读那一个模板的 design.md
  ├─ P3 生成 ────▶ viewport-base.css(全量拷入)
  │                ─▶ html-template.md(架构与 JS 规范)
  │                ─▶ animation-patterns.md
  ├─ P4 转换 ────▶ scripts/extract-pptx.py(仅 PPTX)
  └─ P6 分享 ────▶ scripts/deploy.sh / export-pdf.sh
```

配套的**防走样机制**(写死在 SKILL.md 里的 NON-NEGOTIABLE):

- 固定 1920×1080 舞台,整体缩放,永不按设备重排(手机也保持 16:9)
- 翻页必须用 `visibility/opacity`(`.active`/`.visible`),禁用 `display:none`(会被后续 `display:flex` 覆盖导致全页可见)
- `viewport-base.css` 必须全量内联
- 预览页必须像「真实首页」,禁止出现 preview/Option A/preset 等内部工作流字样
- 禁止 `-clamp()` 这类被静默忽略的负 CSS 函数,要写 `calc(-1 * clamp(...))`
- 生成后必须浏览器截图验证:内容溢出 **和** 面板重叠(scrollHeight 查不出 grid 面板互相遮挡)

另有一套「反 AI slop」美学约束:禁 Inter/Roboto/Space Grotesk 惯性选择、禁白底紫渐变、要求每个 deck 有定制感 —— 通过 34 套来自 `beautiful-html-templates` 的 bold 模板 + 12 个安全预设 + 1 个 wildcard 的三选一预览结构来落地。

**双形态分发**:同一份 skill 既可当 Claude Code 插件装(`.claude-plugin/marketplace.json` → `/frontend-slides:frontend-slides`),也可裸读 `SKILL.md`(任何能读文件跑命令的 agent)。插件清单只增加安装便利性,不改变 skill 本体。

## 4. 产出一份 SLIDES HTML 需要什么

### 4.1 输入侧(人的责任)

| 要素 | 说明 |
|---|---|
| 需求四要素 | 目的 / 长度 / 内容就绪度 / 密度(演讲版 vs 阅读版) |
| 内容 | 文字材料(md / 笔记 / 口述)或 `.pptx` |
| 图片(可选) | 给文件夹则逐张评估,可用图参与大纲共创(3 张截图 → 3 个功能页) |
| 风格决定 | 从 3 张真实预览里挑(唯一强制的「人肉」环节) |

### 4.2 约束侧(skill 铁律,全部可机器检查)

1. 单文件自包含 HTML,CSS/JS 全内联,零运行时依赖
2. `viewport-base.css` 全量内联:锁定视口、`.deck-stage` 1920×1080、`.slide` 绝对定位堆叠 + 可见性切换、打印每页一屏、`prefers-reduced-motion`
3. 舞台缩放器:一个 `transform: translate(...) scale(...)` 把整舞台等比 fit 视口,允许留黑边
4. 字体只用 Fontshare / Google Fonts(产物依赖 CDN,离线场景是已知弱点)
5. 控制器 JS(`SlidePresentation` 类):方向键/空格/翻页键/触屏滑动/滚轮
6. 行内编辑默认包含(不预先询问):JS hotzone + 400ms 缓冲(明确禁止 CSS `~` 兄弟选择器方案,`pointer-events` 会打断 hover 链)、`contenteditable`、localStorage、`E` 键开关
7. 图片走相对路径,和 HTML 同目录交付
8. 每个代码段有 `/* === SECTION === */` 注释块

### 4.3 产出侧(一份合格 deck.html 的解剖)

见 [README.md §5](README.md#5-产物解剖deckhtml-里有什么)(以本课 broadside deck 为例逐段拆解)。

### 4.4 分享链路

- `deploy.sh`:Vercel 免费层;自动检测 `src="..."` 打包本地资源;CSS `background-image` 引用可能漏打包(已知 gotcha,整夹部署最稳);重跑原地更新
- `export-pdf.sh`:Playwright 逐页截图合 PDF;首次运行下载 Chromium(~150MB);`--compact` 降采样减体积;要求页元素用 `class="slide"`(导出脚本按此查询)

## 5. 相关参考材料

| 材料 | 位置 | 用途 |
|---|---|---|
| bold 模板库上游 | [beautiful-html-templates](https://github.com/zarazhangrui/beautiful-html-templates) | 34 套设计系统的源头;每套 3 张截图展示不同版式;`selection-index.json` 是它的压缩视图 |
| 作者入门视频 | [YouTube: Frontend Slides walkthrough](https://www.youtube.com/watch?v=372Iksaz8b0) | 面向初学者的全流程演示 |
| Claude Code 插件机制 | `.claude-plugin/marketplace.schema.json`(anthropic 官方 schema) | 双形态分发里插件侧的规范 |
| Claude Code skills 目录约定 | `~/.claude/skills/<name>/SKILL.md` | 手动安装路径;其他 agent 的等价目录同理 |
| SPACE10 报告 / Wim Crouwel 网格 | broadside `design.md` 里的文化引用 | 各模板设计语言的出处(理解气质用) |
| python-pptx / Playwright / Vercel | scripts/ 依赖 | 转换 / 导出 / 部署三条工具链 |

## 6. 评价(结合本仓库语境)

**优点**

- 把「设计品味」变成可执行流程:三选一真实预览绕开了「说不清审美」的根本障碍
- 渐进式披露控制 token 成本:34 套模板只暴露一个 JSON 索引,选中才读全量 design.md
- 铁律可验证:固定舞台、可见性切换、截图验收 —— 都是能写出断言的硬约束
- 单文件产物符合「十年后还能打开」的长期主义

**局限 / 与 slides-tool 路线的对照**

| 维度 | frontend-slides(agent-skill 路线) | slides-tool(本仓库,编译器路线) |
|---|---|---|
| 生成时机 | 每次生成都要 LLM 全程参与 | LLM 只产 `deck.md`,编译是本地确定性操作 |
| 呈现自由度 | 34 模板 + 预设,选完锁死 | template 是独立文件,热切换即时预览 |
| 一致性 | 依赖铁律 + 截图验收,agent 仍可能走样 | 编译器保证结构,错误在预览前被拦下 |
| 依赖 | 无(产物零依赖;生成期依赖 agent) | Node + OpenAI 兼容端点 |
| 定位 | 一次性、高质量、人挑风格 | 反复迭代、模板实验、内容与呈现分离 |

两条路线共享同一个判断:**幻灯片的本质是「内容结构 × 呈现系统」的乘积** —— skill 把呈现系统做成设计文档让 LLM 临摹,slides-tool 把它做成模板让编译器填空。本仓库的 Gen UI 论证(见 `docs/gen-ui-edu-research.md` §4.3)正是把这两条路线当作同一光谱的两端。
