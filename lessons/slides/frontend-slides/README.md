# 第一课 · frontend-slides:把文档变成网页幻灯片

> 课程系列:`lessons/slides` 第 1 课
> 上游 skill:[zarazhangrui/frontend-slides](https://github.com/zarazhangrui/frontend-slides)(MIT)
> 本课产出:`deck.html`(用该 skill 的 broadside 模板生成的 15 页教学 deck)+ [skill 源码分析](skill-analysis.md)

**目标读者**:会用 Claude Code(或任意能读文件、跑命令的 coding agent),想把一份 Markdown / PPTX 快速变成漂亮网页演示文稿的人。

**学完能做什么**:

1. 把 skill 装进自己的 agent 环境
2. 走完一次完整生成流程:内容 → 风格 → 单文件 HTML deck
3. 看懂产出的 HTML 结构,能自己改

---

## 1. 这个 skill 是什么

frontend-slides 不是模板库,也不是 CLI 工具,而是一份**写给 coding agent 的工作流说明书**(`SKILL.md`)加上配套的设计资产。agent 读它之后就知道:

- 怎么**一次问清**你的需求(目的 / 长度 / 内容 / 密度)
- 怎么**生成三张真实风格预览**让你挑(「show, don't tell」—— 不让你用嘴描述审美)
- 怎么把内容编译成**一个零依赖的单文件 HTML** —— 无 npm、无构建,双击即放,十年后还能打开
- 怎么部署成 URL(Vercel)或导出 PDF(Playwright 逐页截图)

三种工作模式:**新建**(Mode A)、**PPTX 转换**(Mode B)、**增强已有 HTML deck**(Mode C)。

## 2. 安装

### 方式 A:Claude Code 插件市场(推荐)

在 Claude Code 里**分两条消息**发送:

```text
/plugin marketplace add https://github.com/zarazhangrui/frontend-slides
```

等它跑完,再发:

```text
/plugin install frontend-slides@frontend-slides
```

注意:
- 必须用 **HTTPS 完整地址**;短式写法 `zarazhangrui/frontend-slides` 可能让 Claude Code 走 SSH,在 GitHub 不在 `known_hosts` 时会失败
- 装完用 `/frontend-slides:frontend-slides` 唤起(插件技能带 `插件名:技能名` 命名空间)

### 方式 B:手动安装(适合离线 / 自定义目录)

```bash
git clone https://github.com/zarazhangrui/frontend-slides.git ~/.claude/skills/frontend-slides
```

或只复制 skill 核心文件到技能目录:

```bash
mkdir -p ~/.claude/skills/frontend-slides/scripts
cp SKILL.md STYLE_PRESETS.md viewport-base.css html-template.md animation-patterns.md ~/.claude/skills/frontend-slides/
cp -R bold-template-pack ~/.claude/skills/frontend-slides/
cp scripts/extract-pptx.py scripts/deploy.sh scripts/export-pdf.sh ~/.claude/skills/frontend-slides/scripts/
```

装完用 `/frontend-slides` 唤起(独立技能没有命名空间)。

### 方式 C:其他 coding agent(Codex / Gemini CLI / OpenCode / Kimi Code…)

不用安装。把仓库链接发给 agent,让它「用 frontend-slides skill 帮我做一份 slides」即可。能读文件的 agent 都会从 `SKILL.md` 入口开始,按需加载引用文件。

本仓库工作区在 [`tutorials/frontend-slides/`](../../tutorials/frontend-slides/) 放了完整副本(按 `.gitignore` 约定不入库,仅供本地参考;克隆仓库后请直接用上游 GitHub 地址)。

### 验证安装

```text
/frontend-slides:frontend-slides        # 插件方式
/frontend-slides                        # 手动方式
```

agent 应开始 Phase 1 提问(见下节),而不是反问「什么是 frontend-slides」。

## 3. 使用:一次生成的六个阶段

```text
P0 模式检测 ─▶ P1 内容发现 ─▶ P2 风格发现 ─▶ P3 生成 ─▶ P5 交付 ─▶ P6 分享(可选)
                  │                              ▲
                  └── P4 PPT 转换(仅转换模式)──┘
```

| 阶段 | 发生什么 | 你要做什么 |
|---|---|---|
| P0 模式检测 | 判断新建 / 转换 / 增强 | 说清楚要哪种 |
| P1 内容发现 | **一次性**问四件事:目的、长度(5-10 / 10-20 / 20+)、内容就绪度、密度 | 一次性答完;有内容就丢给它 |
| P2 风格发现 | 生成 3 张预览:1 个安全预设 + ≥1 个 bold 模板 + 1 个 wildcard,每张都是**你 deck 真实的首页** | 用眼睛挑,或选「混搭」说要求 |
| P3 生成 | 产出单文件 HTML:1920×1080 固定舞台、CSS/JS 全内联、`viewport-base.css` 全量拷入 | 等结果 |
| P4 PPT 转换 | `python scripts/extract-pptx.py` 抽取文字 / 图片 / 备注 | 确认抽取清单 |
| P5 交付 | 删预览、打开浏览器、告诉你怎么改(`:root` 变量、字体链接、`.reveal` 动画) | 试用:方向键翻页,按 `E` 行内编辑 |
| P6 分享(可选) | `deploy.sh` 部署 Vercel,或 `export-pdf.sh` 导出 PDF | 选一个 |

### 密度:唯一真正影响「性格」的选择

| 密度 | 适合 | 表现 |
|---|---|---|
| **演讲版**(低密度) | 现场讲、keynote | 一页一个观点、大字、每页 ≤3 条要点、页数更多 |
| **阅读版**(高密度) | 异步传阅、报告评审 | 每页自成一篇、网格表格齐全、不看讲解也懂 |

底线两种密度都一样:**不滚动、不溢出、不重叠;装不下就拆页,绝不缩小字号**。混合需求时选更接近的那档,不要发明中间档。

### 生成后自己动手改

- 颜色:改 `:root` 里的 CSS 变量
- 字体:换 `<head>` 里的 Google Fonts / Fontshare 链接
- 文案:按 `E` 进编辑模式,点任意文字直接改,`Ctrl+S` 存进浏览器
- 动画:`.reveal` 系列类 + `.d1`–`.d6` 出场延迟

## 4. 实战:把一份文档变成 HTML slides

### 路径 A:Markdown / 笔记 → deck(本课 deck 就是这么做的)

1. **准备内容**:一份文档即可,粗糙也没关系(本课的输入是 skill 的 README + SKILL.md 摘要)
2. **发起**:
   ```text
   /frontend-slides:frontend-slides
   > 把这份文档变成一份 15 页左右的教学 deck,阅读版
   ```
3. **答四问**:教学目的 / 中等长度 / 内容就绪 / 阅读版
4. **挑风格**:agent 给 3 张首页预览。本课的候选与选择:
   - 安全预设类:`cobalt-grid`(上一份 speaker deck 已用过,排除)
   - bold 模板类:`neo-grid-bold`(签名是「全大写 + 负字距」,中文没有大写,等于丢掉模板灵魂)
   - **选定 `broadside`**:火焰橙 × 墨黑双寄存器,自带中英双语字体栈(思源宋体 900 大字 + Barlow),「印刷传单」气质天然适配中文重宋
5. **拿产物**:单文件 `deck.html`,浏览器打开即用
6. **验收**(skill 明文要求):1280×720 截图 + 一个手机视口截图,逐页查溢出与面板重叠 —— 本课 deck 15 页全部截图验证过

### 路径 B:PPTX → deck

```text
> 把 presentation.pptx 转成网页幻灯片
```

agent 会:

1. `pip install python-pptx`(如缺)+ 运行 `python scripts/extract-pptx.py presentation.pptx output_dir/`
2. 给你看抽取清单:每页标题、内容摘要、图片数量
3. 走同一条 P2 风格发现 → P3 生成
4. 文字、图片、页序全保留;**演讲备注保留为 HTML 注释**

### 分享

```bash
bash scripts/deploy.sh ./deck/            # → Vercel URL,任何设备可开
bash scripts/export-pdf.sh deck.html      # → PDF(1920×1080 逐页截图,动画不保留)
```

## 5. 产物解剖:deck.html 里有什么

打开本课的 [`deck.html`](deck.html),从上到下:

| 区块 | 内容 | 规矩来源 |
|---|---|---|
| `<head>` 字体 | Google Fonts:Barlow / IBM Plex Mono / 思源宋体 / 思源黑体 | 禁止系统字体 |
| `:root` 变量 | broadside 调色板 + 1920×1080 舞台尺寸的字号 token | 模板 design.md |
| `viewport-base.css` | **全量内联**:`.deck-viewport` / `.deck-stage`(1920×1080)/ `.slide` 可见性切换 / 打印分页 / `prefers-reduced-motion` | skill 强制 |
| 双寄存器 | `.slide-dark`(内容页)/ `.slide-orange`(封面、章节、宣言、结尾) | broadside |
| 组件 | 顶/底 chrome 发丝线、mono kicker、顶边框统计卡、`/` 橙色列表符(每页至多 3 条)、橙色右板 compare | broadside |
| 动画 | `.reveal` / `.reveal-blur` / `.reveal-scale` + `.d1`–`.d6` 出场延迟,由 `.slide.visible` 触发,每次进页重放 | animation-patterns.md |
| `SlidePresentation` 类 | 舞台等比缩放(`transform: scale`,可留黑边、绝不重排)+ 键盘 / 触屏 / 滚轮导航 + `?slide=N` 深链 | html-template.md |
| `InlineEditor` 类 | 悬停左上角或按 `E` 进编辑,`contenteditable` 直接改字,`Ctrl+S` 存 localStorage | html-template.md |

## 6. 常见问题

- **预览打不开 / 字体是宋体 fallback**:网络不通(Google Fonts CDN)。国内环境可把字体链接换成本地文件或镜像。
- **手机上字太小**:这是**设计如此**。固定舞台按 16:9 整体缩放,手机竖屏会 pillarbox,不会重排;分享给手机用户时建议部署 URL 而非发文件。
- **想改某页**:直接按 `E` 行内编辑;想改结构就告诉 agent「把第 7 页拆成两页」(Mode C 增强模式会先查密度再动手)。
- **PDF 体积大**:每页是整张 1920×1080 截图,20 页约 20MB;`export-pdf.sh --compact` 用 1280×720 渲染,可减 50-70%。
- **部署后图片裂了**:单文件部署只打包 `src="..."` 引用;CSS `background-image` 引的本地图会漏 —— 最稳是把 HTML 和图片放一个文件夹整夹部署。

## 7. 参考资料

- skill 仓库:<https://github.com/zarazhangrui/frontend-slides>(本地工作副本在 `tutorials/frontend-slides/`,已 gitignore)
- 作者的入门视频(walkthrough & tutorial):<https://www.youtube.com/watch?v=372Iksaz8b0>
- bold 模板库上游:<https://github.com/zarazhangrui/beautiful-html-templates>(34 套设计系统)
- 本仓库内的姊妹实现:`build-path/slides/slides-tool/`(LLM+编译器路线,与本文的 agent-skill 路线对照,见 [skill-analysis.md](skill-analysis.md) §6)
- 深入阅读:[frontend-slides 源码分析](skill-analysis.md) —— 它做什么、架构、产出 SLIDES HTML 需要什么、参考材料

---

下一课预告:`lessons/slides` 的第 2 课计划讲 **slides-tool:把同一份 deck.md 编译进不同模板**(内容与呈现分离的编译器路线)。
