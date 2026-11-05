# 03 · 参考库：mockup、Figma、Dribbble 与设计资源

> 参考不是拿来抄的，是拿来拆的。每个参考都按“看什么 / 借什么 / 不借什么 / 用在哪”记录。

## 0. 使用说明

参考分三层：

1. **结构参考**：信息架构、筛选方式、页面模板、元数据组织。优先级最高。
2. **视觉参考**：排版、色彩、字体、图像处理、动效。只借方法，不抄皮肤。
3. **素材参考**：截图、封面、图标、字体。注意版权，能自己拍/自己截就自己做。

建议最终只保留 **30–50 个**参考，按页面类型归档；收集 300 个只会让你更犹豫。

---

## 1. 六个指定站点

### 1.1 vibeprompts.dev

- 链接：https://vibeprompts.dev
- 是什么：给 “vibe coder” 的 UI 提示词库。站点自述 286 条提示词、15 个分类；每条有预览图、分类、标题、简介和独立详情页。
- 分类：Auth Forms、Pricing、Features/Bento、Hero Sections、Testimonials、CTA Banners、Stats Bars、Nav Bars、Footer、FAQ、Dashboards、Onboarding、Blog/Content、Contact、Bonus。
- 页面结构：顶部 logo + 面包屑 + 分类 pills（带数量）→ 简介 → 提示词卡片网格 → 详情页（预览 + 复制提示词）。
- **借什么：**
  - 提示词的“分类 + 数量 + 预览 + 独立链接”结构，很适合给 AI 生成页面时做“组件菜单”。
  - 先看预览再复制的流程，减少“抽盲盒”。
  - 每条提示词有 permalink，方便团队共享。
- **不借什么：**
  - 它的分类是“页面区块”，不是“教育内容主题”；不要把这套分类搬成我们的导航。
  - 提示词默认生成 Tailwind + 通用 SaaS 风格；直接喂给 AI 会得到“一眼 AI”的页面。必须同时给 `DESIGN.md` 和本项目页面模板。
- **用在哪：** 生成 Header、资料库工具条、合集刊头、资源详情侧栏时，作为提示词起点。

### 1.2 minimal.gallery

- 链接：https://minimal.gallery
- 是什么：2013 年至今的极简网站设计画廊，分 Websites / Templates / Tools。约 70 个标签；Portfolio（991）、Personal（815）是最大类；也按建站工具筛（Framer 130、Readymag 24、Webflow 20、Astro 6）。
- 页面结构：顶部导航 + 每周订阅 → 精选标签行 → 卡片网格（900×500 缩略图、站名、相对时间）→ 侧栏标签/筛选 → 分页（约 132 页）→ 页脚。
- **借什么：**
  - 两轴筛选：内容类型（行业/用途）× 工具/平台。
  - 标签旁显示数量，让用户知道“这个方向有多深”。
  - 统一比例缩略图 + 相对时间（“2 days ago”），网格非常可扫。
  - 透明标注赞助位；书签收藏；每周邮件。
- **不借什么：**
  - 纯时间流 + 132 页分页不适合教育资源的“按主题找”；必须加合集、搜索和主题入口。
  - 不要只做画廊；我们的资料库默认是文字索引。
- **用在哪：** 资料库筛选、首页最新收录、合集封面网格。

### 1.3 kage.design

- 链接：https://kage.design
- 是什么：真实产品界面的策展库，并把界面拆成可给 AI 用的提示词。站点可见 637 个设计、3,379 个组件、353 个产品；19 种组件类型、约 35 个行业、13 种风格（minimal、dark、editorial、brutalist、retro、playful、glass、bento 等）、12 种颜色、按技术栈筛。
- 页面结构：header（搜索 ⌘K + 提交）→ hero（提交 URL + 标语 + 实时统计）→ 侧栏（All designs / Components / Products / Categories / Styles / Industries / Colours / Stacks）→ 卡片网格，可按 Latest / Most copied / Most viewed 排序 → 灵感合集 → 页脚。
- **借什么：**
  - 多轴分类，但用户端只暴露最需要的 5 个维度；其余放“更多筛选”。
  - 组件级浏览：从“导航 / hero / 定价 / 卡片 / 图表”切进去找参考。
  - “复制提示词”作为主要动作，而不是只收藏截图。
  - 策展合集（如 “Minimal landing pages”）。
- **不借什么：**
  - 19 种组件 × 35 个行业对 MVP 太多；会把资料库变成过滤器博览会。
  - 它的用户是设计师/开发者，不是“找课的学习者”；信息密度和术语要降级。
- **用在哪：** 筛选维度设计、资源详情元数据、AI 提示词工作流。

### 1.4 styles.refero.design

- 链接：https://styles.refero.design
- 是什么：2,000+ 个“AI 可读”的设计系统，从知名产品网站提取颜色、字体、字号、间距、组件和 `DESIGN.md`，可导入 Cursor / Claude Code / Codex / v0 / Lovable。每个风格用一句情绪化描述命名（如 “midnight precision instrument”）。
- 单页结构：预览 → 情绪描述 → 颜色表（名称/Hex/token/角色）→ 字体与字号表 → 间距 / 圆角 / 阴影 → 组件 → Do / Don't → 导出 `DESIGN.md` / Tailwind v4 / CSS Variables。
- **借什么：**
  - `DESIGN.md` 的结构：颜色带角色、字号带用途、间距带密度、组件带规格、Do/Don't 成对出现。
  - “先命名风格，再给 token”的表达方式，方便团队对齐。
  - 页面顶部的来源链接和“测量值已归一化”的诚实说明。
- **不借什么：**
  - 不要照搬某个品牌的配色和字体（比如 Apple 蓝、Linear 紫）；借结构，不借皮肤。
  - 它的尺寸是测量+推断，不是官方设计规范；落地前要自己校验对比度和可读性。
- **用在哪：** 本目录 `02-visual-style.md` 的 token 表和 `04-design-md-draft.md` 的格式。

### 1.5 designmd.ai

- 链接：https://designmd.ai
- 是什么：`DESIGN.md` 的社区库。站点把 `DESIGN.md` 描述为“一个 AI 编码工具会读的 markdown 文件”，放在仓库根目录，AI 就能按它生成一致的 UI；提供 MCP 和 CLI。站点有数百个免费设计系统，按 saas / dark / minimal / bold / dashboard / landing-page / mobile-app / accessible / design-tokens 等标签分类。
- **借什么：**
  - “一个文件放在仓库根目录”的安装方式，极低成本。
  - 把设计规范写成 AI 能执行的契约，而不是散落在 Figma 和口头约定里。
  - 社区案例的标签体系，可以用来找同类产品参考。
- **不借什么：**
  - 它是社区库，不是官方标准；不同文件质量差异很大，必须校验 token、对比度和组件完整性。
  - 不要下载一个“看起来像”的设计系统就直接套；我们的品牌决策要自己写。
- **用在哪：** `04-design-md-draft.md` 的落地方式；后续把最终版放到仓库根目录 `DESIGN.md`。

### 1.6 mobbin.com

- 链接：https://mobbin.com
- 教育集合：https://mobbin.com/browse/ios/apps/education · https://mobbin.com/browse/web/apps/education
- 是什么：真实 App 和网页的截图/流程库，站点自述 60 万+ 屏幕。可按产品、平台、行业、页面、流程、UI 元素、网站区块浏览；支持搜索屏幕内文字、完整流程、流程树、动效播放、历史版本；有 MCP/API（部分付费）。
- 教育集合里可见的产品：Duolingo、Headway、Fable、MasterClass、Babbel、Brilliant、Coursera、Drops、Speak、Imprint、Uxcel Go、Apple Books 等；常见屏幕包括 Learning Path、Practice Session、Course Homepage、Progress Statistics、Learning Dashboard。
- **借什么：**
  - 看完整流程，不要只看单屏：首次进入 → 选课 → 课程首页 → 学习 → 进度 → 完成。
  - 同一类界面比较 3–5 个产品，找共同约定（比如进度、返回、继续学习放哪）。
  - 保留来源链接和截图日期；截图会随版本变化。
- **不借什么：**
  - 单屏好看不等于流程合理；Mobbin 自己也提醒“这是真实产品做法，不是效果证明”。
  - 不覆盖 Android；需要 Android 流程时用 Page Flows。
- **用在哪：** 课程阅读页、收藏/保存流程、onboarding、任何有“进度”的界面。

---

## 2. 补充参考

### 2.1 策展 / 编辑类

| 站点 | 链接 | 看什么 | 借什么 / 不借什么 |
|---|---|---|---|
| Are.na | https://www.are.na/ | 安静的编辑语气、编号原则、非算法化定位、标签跑马灯、编辑文章网格 | 借“人味”和结构；不借它复杂的频道/区块模型 |
| Cosmos | https://www.cosmos.so/ | “Find your next [thing]” + 搜索的 hero、功能小卡、策展人网格、品牌条 | 借搜索优先的首页和“让策展人可见”；不借它的潮流视觉 |
| Minimalissimo | https://minimalissimo.com/ | 四个内容支柱、统一图片网格、按时间倒序、Load more、极简文案 | 借图片纪律和“少即是美”；不借纯画廊结构 |
| Siteinspire | https://www.siteinspire.com/ | 带数量的分类瓦片、多轴筛选、日期 + 署名、周报、赞助位、登录后收藏 | 借分类计数、署名、邮件订阅；不借纯截图网格 |
| Dense Discovery | https://www.densediscovery.com/ | 每周一封、栏目化（Tools / Books / Media / Inspiration / Guests / Numbers / Polls / Socials）、413 期档案、编辑主笔 | 借栏目结构和“主笔口吻”；不借 newsletter 的纯邮件形态 |
| Savee | https://savee.it/ | 视觉收藏、moodboard、保存动作 | 借收藏交互；不借它的图片墙作为主界面 |
| Curated.design | https://curated.design/ | 高编辑门槛的网页设计画廊、动效/交互 | 借“编辑筛选”的表达；不借重动效 |
| Designspiration | https://www.designspiration.com/ | 以收藏驱动的视觉发现 | 借视觉搜索；仅作 moodboard 来源 |

### 2.2 学习产品

| 产品 | 链接 | 看什么 | 借什么 / 不借什么 |
|---|---|---|---|
| Khan Academy | https://www.khanacademy.org/ | 干净、内容优先、无障碍（键盘、读屏、对比度、减少动效、字幕/文字稿） | 借可访问性和内容优先；不借它面向 K-12 的亲和视觉 |
| Brilliant | https://brilliant.org/ | 极简导航、受众切换（学习者/家长教师）、trust seals、功能 tab、课程深度、评价 | 借受众切换和课程深度展示；不借 3D 产品渲染和重营销结构 |
| Maven | https://maven.com/ | 分类 mega-menu、形式卡（cohort / workshop / free lesson）、趋势列表、统一课程卡元数据（周数/日期/讲师）、排名徽章、分类瓦片、讲师档案 | 借课程卡元数据和“形式分层”；不借排行榜式的热闹感 |
| MasterClass | https://www.masterclass.com/ | 电影感暗色、全屏视频、极简导航、高对比标题 | 只借媒体 hero 的处理；不借全站暗色（阅读不友好） |
| Duolingo | https://www.duolingo.com/ | 学习路径、连续天数、游戏化、进度 | 如果有站内课程，借进度和路径；不要给“资源收藏”加游戏化 |
| Coursera | https://www.coursera.org/ | 大规模目录的分面筛选、分类、评价 | 借筛选和目录结构；不借市场式的密集促销 |
| Udemy | https://www.udemy.com/ | 大规模课程目录、搜索、评分、价格 | 借搜索和筛选；不借折扣/倒计时式营销 |
| Domestika | https://www.domestika.org/ | 创意课程卡、项目制、封面一致 | 借封面纪律；不借过于活泼的插画风 |
| Skillshare | https://www.skillshare.com/ | 创意学习、课程卡、社区 | 借课程卡结构；不借社区信息流 |

### 2.3 图库 / 工具

| 工具 | 链接 | 用途 | 注意 |
|---|---|---|---|
| Mobbin | https://mobbin.com | 真实产品截图与完整流程 | 免费版有限；单屏不是效果证明 |
| Page Flows | https://pageflows.com | iOS / Android / Web / Email 的完整流程 | 覆盖 Android 和邮件，补 Mobbin 的缺口 |
| Dribbble | https://dribbble.com/tags/education-website | 视觉方向、概念稿、配色/排版灵感 | 概念稿不等于可落地的产品；不要照抄 |
| Figma Community | https://www.figma.com/community/search?resource_type=files&q=education | UI kit、设计系统、组件库 | 质量参差；检查许可证和变量/组件完整度 |
| Awwwards（Education） | https://www.awwwards.com/websites/education/ | 教育/文化类网站的排版、动效、叙事 | 偏获奖作品，性能和可访问性未必达标 |
| Land-book | https://land-book.com/ | 按行业（Education）、风格、类型、排版、颜色、平台筛网站 | 以落地页为主，不是资料库 |
| Siteinspire | https://www.siteinspire.com/ | Minimal / Typographic / Grid Layout 分类 | 截图会过期，点进去看原站 |
| Minimal Gallery | https://minimal.gallery | 极简网站、模板、工具 | 同一类风格看多了会趋同 |
| Kage | https://kage.design | 组件级真实界面 + AI 提示词 | 面向设计师，术语和密度偏高 |
| Refero Styles | https://styles.refero.design | DESIGN.md、设计 token、Do/Don't | 测量值需自己校验 |
| DESIGNmd | https://designmd.ai | DESIGN.md 社区库、MCP/CLI | 社区质量参差 |
| vibeprompts | https://vibeprompts.dev | 页面区块提示词 | 默认输出通用 SaaS 风，需加约束 |

**Dribbble 上 2025–2026 教育/EdTech 概念稿的共性（只作观察，不代表生产标准）：**

- 暖白/奶油底替代纯白；
- 大号展示字体 + 一个强调色短语；
- 模块化课程卡 / bento 网格；
- 拱形图片遮罩、贴纸式徽章；
- 早期放 trust signals（统计、社区、讲师、证书）；
- 结果导向的 hero 文案 + 降低焦虑的微文案（“No pressure. Cancel anytime.”）。

可搜索的名字/例子：

- Peno Lab 的在线学习平台站（Dribbble shot）：https://dribbble.com/shots/27810851-Online-learning-platform-website-Education-website-UI-design
- MyEdSkills（Yasir Noori）：在 Dribbble 搜索 `MyEdSkills`
- Morrow（Ezuma Victor）：搜索 `Morrow EdTech`
- Learning Solutions（Md.Rafiqul Islam）：搜索 `Learning Solutions online education platform`

这些概念稿可以借“暖底 + 大标题 + 单强调色 + 课程卡”的方向，但不要照搬它们的营销结构、3D 插画和过度圆角。

### 2.4 排版 / 可访问性

| 资源 | 链接 | 用途 |
|---|---|---|
| Google Fonts | https://fonts.google.com/ | Newsreader、Noto Serif SC、Noto Sans SC、IBM Plex Sans、IBM Plex Mono |
| Fontshare | https://www.fontshare.com/ | 免费商用字体备选；逐个确认许可证 |
| Typewolf | https://www.typewolf.com/ | 字体搭配与真实网站案例 |
| Practical Typography | https://practicaltypography.com/ | 行宽、层级、强调、排版的实用规则 |
| WCAG 2.2 Quick Reference | https://www.w3.org/WAI/WCAG22/quickref/ | 可访问性验收清单 |
| WebAIM Contrast Checker | https://webaim.org/resources/contrastchecker/ | 颜色对比度校验 |

---

## 3. 按页面类型的参考地图

| 页面 | 主要参考 | 具体看什么 |
|---|---|---|
| 首页 | Are.na、Dense Discovery、Cosmos、Minimal Gallery | 编辑语气、搜索优先的 hero、最新/精选的组织方式 |
| 资料库 | Minimal Gallery、Siteinspire、Land-book、Maven、Coursera | 两轴/多轴筛选、数量展示、列表密度、分页 |
| 合集 | Dense Discovery、Are.na、Awwwards Education | 专题刊头、编辑注、目录分组、叙事顺序 |
| 资源详情 | Maven、Kage、Minimal Gallery | 元数据模板、外链 CTA、为什么收录、相关资源 |
| 课程阅读 | Khan Academy、Brilliant、Mobbin Education、Page Flows | 目录、进度、正文排版、上一节/下一节、移动端 |
| 收藏 | Cosmos、Savee、Mobbin | 保存动作、空状态、本地优先、登录后同步 |
| 搜索 | Cosmos、Kage、Mobbin | ⌘K、分组结果、键盘操作、空结果建议 |

---

## 4. 搜索 playbook

不要漫无目的地刷。每次带着“页面类型 + 要找的结构”去搜，找到就截图 + 记一句“借什么”。

**Mobbin：**

- 搜索：`education`、`course`、`lesson`、`learning path`、`progress`、`onboarding`、`paywall`、`save`、`empty state`。
- 先按 Education 分类看 10 个产品，再挑 3 个看完整流程。
- 重点看：课程首页如何组织章节、进度放在哪、继续学习按钮在哪、空状态怎么写。

**Dribbble：**

- 标签：`education-website`、`e-learning`、`learning-platform`、`course-platform`、`education-dashboard`。
- 搜索：`editorial education`、`course catalog`、`learning platform`、`curriculum`。
- 只看“结构”和“排版”，不要被概念稿的 3D 插画带偏。

**Figma Community：**

- 搜索：`education ui kit`、`learning platform`、`course dashboard`、`LMS`、`design system education`。
- 优先选带 variables、components、variants 的文件；检查许可证；不要整套照搬。
- 说明：Figma Community 里几乎没有“教育资源聚合站”的完整模板，搜到的大多是课程落地页、LMS dashboard 或通用 UI kit；只借组件结构和布局，不要整套套用。

**Awwwards：**

- Education 集合：https://www.awwwards.com/websites/education/
- 再看 Typography / Minimal / Grid 分类；重点看排版和叙事，不抄动效。

**Land-book：**

- 首页筛选：Industry → Education；Style → Minimal / Editorial；Type → Landing。
- 用它找“教育类落地页”的视觉方向，不找资料库结构。

**Siteinspire：**

- 分类：Minimal、Typographic、Grid Layout。
- 看分类瓦片的数量和署名方式。

**Refero：**

- 搜索：`editorial`、`warm`、`nonprofit`、`type foundry`、`clean developer docs`。
- 看每个风格的 Do/Don't 和 token 表，不看皮肤。

**Savee / Cosmos：**

- 搜索：`editorial web`、`course catalog`、`library ui`、`index layout`。
- 用来建 moodboard，不用于结构决策。

---

## 5. 首批 12 个参考（shortlist）

如果只看 12 个，看这些：

1. **Are.na** — 编辑语气、非算法化、编号原则。https://www.are.na/
2. **Dense Discovery** — 策展人的声音、栏目化、档案感。https://www.densediscovery.com/
3. **Minimalissimo** — 统一图片网格、克制。https://minimalissimo.com/
4. **Siteinspire** — 带数量的分类、多轴筛选、署名。https://www.siteinspire.com/
5. **Minimal Gallery** — 两轴筛选、相对时间、收藏。https://minimal.gallery
6. **Cosmos** — 搜索优先的 hero、策展人可见。https://www.cosmos.so/
7. **Maven** — 课程卡元数据、形式分层。https://maven.com/
8. **Brilliant** — 受众切换、课程深度。https://brilliant.org/
9. **Khan Academy** — 可访问性、内容优先。https://www.khanacademy.org/
10. **Mobbin Education** — 真实学习流程。https://mobbin.com/browse/web/apps/education
11. **Refero Styles** — `DESIGN.md` 结构与 Do/Don't。https://styles.refero.design
12. **Kage** — 多轴分类、组件级浏览。https://kage.design

---

## 6. 参考收集模板

建议在 `docs/research/ui-resarch/references/` 下建一个表格（或 Notion 数据库），字段如下：

| 字段 | 说明 |
|---|---|
| `id` | 如 `REF-012` |
| `url` | 原始链接 |
| `page_type` | 首页 / 资料库 / 合集 / 详情 / 课程 / 搜索 / 收藏 |
| `style_tags` | editorial / minimal / warm / swiss / dark … |
| `borrow` | 具体借什么（一句话，必须可执行） |
| `avoid` | 明确不借什么 |
| `screenshot_date` | 截图日期，防止改版后对不上 |
| `notes` | 补充 |

示例：

| id | url | page_type | style_tags | borrow | avoid | screenshot_date |
|---|---|---|---|---|---|---|
| REF-001 | https://minimal.gallery | 资料库 | minimal, grid | 两轴筛选 + 标签计数 + 统一缩略图 | 纯时间流、132 页分页 | 2026-11-05 |
| REF-002 | https://maven.com | 课程卡 | editorial, catalog | 形式/日期/讲师三件套元数据 | 排行榜式热闹感 | 2026-11-05 |
| REF-003 | https://www.are.na/ | 首页 | quiet, editorial | 编号原则 + 非算法化宣言 | 复杂频道模型 | 2026-11-05 |

---

## 7. 版权与时效提醒

- 参考站点的截图、版式、插画、字体都可能受版权保护；用于分析和讨论可以，**不要直接复制素材、版式或代码**。
- Dribbble / Behance 上的概念稿很多没有真实用户验证；把它当“视觉方向”，不要当“UX 证据”。
- Mobbin / Page Flows 的截图会随产品版本变化；记录截图日期和来源。
- 字体使用前确认许可证：Google Fonts 多为 OFL；Fontshare 部分字体免费商用但需逐个确认；商业字体不要擅自打包进仓库。
- 站点数据和分类会变；本文中的数量是 2026-11-05 的页面快照，引用时建议重新核对。
