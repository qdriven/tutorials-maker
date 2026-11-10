# Theme 来源调研 · 哪里获取不同的样式与 Token 系统

> 目的：为「Zen Terminal」之外的主题迭代（或换肤能力）提供可持续的素材来源。
> 配套实况展示：`themes-showcase.html`（同组组件 × 5 主题渲染对比，浏览器直接打开）。
> 结论先行：**token 架构学 Carbon/W3C DTCG；色板取 Radix/Flexoki；暗色终端感取 VS Code 主题；快速出稿用本地 ui-ux-pro-max + tweakcn**。

---

## 1. 官方大厂设计系统 —— 学 token 架构，不抄皮肤

| 系统 | 获取 | 对本项目最值得取的部分 |
|---|---|---|
| Material Design 3 | m3.material.io | 动态色（dynamic-color）与 tonal palette 生成逻辑；`reference → system → component` 三层 token 命名法 |
| Apple HIG | developer.apple.com/design | 语义色 + 材质系统；亮暗成对设计的校验规则（THEME.md §8 直接引用其规则） |
| Fluent 2 | fluent2.microsoft.design | 全套 theme definition（间距/圆角/阴影 JSON），工程化最完整 |
| **Carbon v11**（IBM） | carbondesignsystem.com | **token 分层最严谨**（global/contextual/component），我们 theme.css 的分层即受其启发 |
| Ant Design 5 | ant.design | 中文产品语料 + 组件级 token（`--ant-color-*`）细分最贴国内习惯 |
| TDesign（腾讯）/ Arco（字节）/ Semi（抖音电商） | 各官网 | WorkBuddy/豆包 同厂审美参照；暗色体系成熟 |
| Polaris（Shopify）/ Lightning（Salesforce） | 各官网 | SaaS 密度体系、表格/表单密集场景 token |

**用法**：只取「分层结构与命名约定」，色值仍以我们 zinc 语义为准——避免整个站"长成 Material 味"。

## 2. 开源色彩系统 —— 直接可用的色板（换肤主力来源）

| 系统 | 获取 | 特点 | 对本项目 |
|---|---|---|---|
| **Radix Colors** | radix-ui.com/colors（npm `@radix-ui/colors`） | 26 色 × 12 阶，每阶语义固定（1-2 底 / 3-5 dim / 6-8 常规 / 9-10 纯色 / 11-12 文本），**自动暗色** | ★ 我们 `strong/dim` 变体体系的最佳上游；换 accent 时直接取其 9-11 阶 |
| Tailwind palette | tailwindcss.com/docs/customizing-colors | zinc/emerald/violet… 22 系 × 12 阶 | 当前基底（zinc）即出自此 |
| Open Color | yeun.github.io/open-color | 13 色 × 10 阶，轻量朴素 | 备选 |
| **Flexoki**（Steph Ango / kepano） | github.com/kepano/flexoki | **终端墨水风**：`#100200` 黑墨 → `#FFFCF0` 暖纸的灰阶 + 8 色 accent（green `#879A39`、orange `#DA702C`、blue `#4385BE`…） | ★ Zen Terminal 的天然兄弟主题——showcase 主题 D 即基于它 |
| Catppuccin | catppuccin.com | 4 档柔和暗色（latte/frappé/macchiato/mocha），社区认知度极高 | 小白亲和的暗色候选 |
| Nord / Dracula / Gruvbox / Solarized | 各官网 | 编辑器社区经典 | 用户自带情感记忆，适合"配色怀念杀" |

## 3. 主题集散地 —— 现成皮肤直接试

| 来源 | 说明 |
|---|---|
| **tweakcn**（tweakcn.com） | shadcn 主题可视化编辑器，拖出配色→导出 CSS variables（与我们 token 同形），**最快出稿路径** |
| shadcn/ui themes | 官方 6 组基础主题 + 海量社区块 |
| VS Code 主题库 | terminal/编辑器配色富矿；把任意 `.json` 主题直译成 web token（An Old Hope、Tokyo Night…） |
| Figma Community | 搜 "design tokens / theme" 直接取 Figma variables |

## 4. 生成工具 —— 从约束出发造色板

| 工具 | 用途 |
|---|---|
| **Style Dictionary**（Amazon，amzn.github.io/style-dictionary） | token 单源（JSON）→ 多端编译（CSS/TS/Swift）；**正式版管线用它把 theme.css 单源化** |
| Tokens Studio | Figma 插件，设计↔代码 token 同步 |
| **Leonardo**（Adobe，leonardocolor.io） | 给定底色+目标对比度自动生成完整色阶——**每档色自动满足 4.5:1**，正对我们在 P1 审查踩过的坑 |
| ui-ux-pro-max（本地 skill） | 79 styles / 192 palettes / 74 字体配对，`--design-system` 一条命令产出整套；showcase 主题 E 即取自此库 |

## 5. 格式与规范

- **W3C DTCG Design Tokens 草案**（design-tokens.github.com/community-group）——行业交换格式，跨工具迁移保证
- Refactoring UI（refactoringui.com）——色板构建的实操方法论（灰阶先行、语义封装）

## 6. 候选主题矩阵（→ showcase 页面对应）

| 主题 | 来源 | 一句话气质 | 适配场景 | 状态 |
|---|---|---|---|---|
| A Zen Light | 自研（zinc + 双 accent） | 现行：文档感 × agentic | 默认 | ✅ 现行 |
| B Zen Dark | 自研（agentway dark + 亮变体） | 同款夜间，OLED 墨黑 | 夜间/开发者 | showcase 已实现 |
| C AI Violet | skill `AI-Native UI` + shadcn 紫 | AI 学伴，淡紫氛围 | 小白营销页 | showcase 已实现 |
| D Flexoki Paper | Flexoki（Steph Ango） | 暖纸黑墨，印刷质感 | 长文阅读/词典 | showcase 已实现 |
| E Slate IDE | skill `Developer Tool` 色板 | 深蓝黑 + 终端绿，IDE 沉浸 | Playground 重度用户 | showcase 已实现 |

**推荐路线**：v1 单主题（A）→ v1.5 加 B（同一 token 换值）→ v2 用 Style Dictionary 把 A–E 全部单源化，暴露 `/themes` 用户可切换（Flexoki 与 Slate 作为"主题商店"首批）。
