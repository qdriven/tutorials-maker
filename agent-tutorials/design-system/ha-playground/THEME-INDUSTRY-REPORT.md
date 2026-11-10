# 主题类别 × 行业映射报告（THEME-INDUSTRY-REPORT）

> 回答两个问题：①「Zen Terminal」这类主题还有哪些同族？②不同行业分别适配什么主题类别？
> 数据来源：ui-ux-pro-max 本地库（79 styles / 192 palettes，色板值均取自库内实测条目）+ 开源配色生态（见 THEME-SOURCES.md）。
> 配套实况：`themes-showcase.html`（左右翻页，6 页）。

---

## 一、Zen Terminal 同族主题（Doc-first × Monochrome 家族）

共同特征：**单色中性基底、弱装饰、内容优先、Mono 点缀、克制的语义色**。同族 8 个：

| 同族主题 | 与我们的差异 | 代表载体 |
|---|---|---|
| **Vercel Geist** | 更冷的黑白、灰阶更窄、无语义色点睛 | vercel.com/geist |
| **shadcn zinc** | 我们 zinc 阶的直接出处，无双 accent 体系 | ui.shadcn.com |
| **Linear Dark / Light** | 紫灰调中性 + 毛玻璃层级，动效更密 | linear.app |
| **Notion Sober** | 暖白底 + 近黑墨，几乎零色彩 | notion.so |
| **Flexoki**（showcase D） | 暖纸墨水方向，印刷质感 | github.com/kepano/flexoki |
| **iA Writer 视觉** | 极端克制：一种字重游戏代替色彩 | ia.net |
| **Bear / Things 素净** | 白底 + 单点缀色（黄/蓝） | bear.app |
| **agentway zen** | 本 Theme 的直接参考系 | agentway.dev |

**本 Theme 在同族中的差异化**：唯一带「双 accent 语义（Agent 态/学习态）+ 过程可见动效契约」——同族多用于"读"，我们额外服务"看 agent 跑"。

## 二、主题类别 × 行业映射（10 类）

> 每类给出 token 签名（skill 库实测值）、代表产品、适配行业、以及**可复用为本项目哪个视图/画像**。

### ① Doc-first Monochrome（我们 = Zen Terminal）
`bg #fff → fg #18181b · 弱 border · accent 只做状态`
- 行业：开发者工具文档、知识库、教育平台
- 代表：Vercel / Linear / Notion / agentway
- 本项目：**现行全局主题**

### ② AI-Native（光感紫/青）
`bg #FAF5FF · primary #7C3AED · accent #0891B2 · 渐变辉光 + streaming 动效`
- 行业：AI 助手、copilot、对话产品
- 代表：OpenAI / Claude（暖纸变体）/ Perplexity / Raycast
- 本项目：**showcase 主题 C**；适配画像 P3/P4 营销层

### ③ Terminal / IDE
`bg #0F172A 或 OLED #09090b · 高饱和 accent（绿/青）· mono 全局 · 网格纹理`
- 行业：CLI、harness、编码 Agent、运维
- 代表：Warp / Zed / VS Code（Tokyo Night、An Old Hope）/ Hyper
- 本项目：**showcase 主题 E**；适配 Playground 重度用户与画像 P2 后期

### ④ E-Ink / Editorial Paper
`bg #FDFBF7 · ink #1A1A1A · 衬线正文 · 无动效/瞬时切换 · 噪点纹理`
- 行业：阅读器、词典、newsletter、数字报刊
- 代表：Flexoki / Obsidian / Reader（Readwise）/ Are.na
- 本项目：**showcase 主题 D**；适配术语词典与长文讲解视图（P2 原理线）

### ⑤ Enterprise SaaS（中性蓝灰）
`bg #F8FAFC · primary #0F172A · accent #0369A1 · 高密度表格/表单 token`
- 行业：B2B SaaS、CRM、内部系统、项目管理
- 代表：IBM Carbon / Atlassian / Salesforce Lightning / 飞书管理台
- 本项目：候选 F 主题；适配案例库「按职业」职场面板（P1）

### ⑥ Fintech（信任金 × 深墨）
`bg #0F172A · primary #F59E0B（金）· accent #8B5CF6 · tabular-nums 强制`
- 行业：支付、银行、加密、记账
- 代表：Mercury（暖白变体）/ Ramp / Wise
- 本项目：账务类案例（催账/发票）可局部引用其 tabular 数字规范

### ⑦ Healthcare / Trust（青绿治愈）
`bg #ECFEFF · primary #0891B2 · accent #059669 · 大圆角 20px+ · 低饱和插画`
- 行业：医疗、健康、保险、心理咨询
- 代表：Ada Health / Headspace（更活泼变体）
- 本项目：暂无场景；如做"Agent 健康/合规检查"面板可引用

### ⑧ Education Playful
`bg #EFF6FF · primary #2563EB · accent #EC4899 + 黄 · 超大圆角 · 徽章/贴纸化`
- 行业：K12、兴趣课程、儿童编程
- 代表：Duolingo / Khan Academy / Scratch
- 本项目：画像 P3 小白 onboarding 弹层可借用其"贴纸徽章"语法，不做全局主题

### ⑨ Commerce Fresh
`bg #ECFDF5 · primary #059669 · accent #D97706 · 卡片瀑布流 · 价格 tabular`
- 行业：电商、零售、本地生活
- 代表：Shopify 消费端 / 美团 / JD 家电变体
- 本项目：电商场景案例（cs329z 场景篇/蓝皮书）案例卡局部用色

### ⑩ Dark Neon / Gamified
`bg #0B0B10 · 霓虹 accent（#22D3EE/#A78BFA 双色）· 辉光描边 · 步骤进度即关卡`
- 行业：游戏化学习、Hackathon 产品、开发者社区
- 代表：Duolingo 夜间社区版 / DEV Neon / itch.io
- 本项目：毕业设计关卡完成页（confetti + neon）可引用

## 三、画像 × 视图 × 主题推荐矩阵（本产品落位）

| 画像 | 主主题 | 强调视图 | 备选（正式版 /themes 可切换） |
|---|---|---|---|
| P1 职场效率族 | A Zen Light | 案例库（局部 ⑤ SaaS 色语法） | C AI Violet |
| P2 潜力新手 | A Zen Light | Notebook（③ Terminal 局部）+ 词典（④ Paper 局部） | B Zen Dark |
| P3 纯工具用户 | C AI Violet（onboarding 起） | 工具课 | A Zen Light |
| P4 输出导向 | A Zen Light | 毕业设计关卡（⑩ Dark Neon 局部） | E Slate IDE |
| 深夜学习 | B Zen Dark | 全站 | E Slate IDE |

> 落地口径：**全局一主题（按画像/时间切换），局部视图可借用其他类别的语法**（如词典页借 Paper 的衬线与噪点）——避免"一个站五张皮"。

## 四、结论

1. Zen 同族共 8 个成熟参照，我们的差异化锚点是「双 accent + 过程可见」——保持不动摇；
2. 10 类行业主题各有清晰 token 签名，其中 ②③④ 已做成实况（showcase B/C/D/E），⑤–⑩ 记录签名即可按需生产；
3. 正式版路线不变：v1 单主题 → v1.5 双主题 → v2 用 Style Dictionary 单源化，把 ①–④ 做成 `/themes` 首发四主题（⑤–⑩ 按画像需要再做）。
