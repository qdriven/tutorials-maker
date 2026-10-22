# 交互式工具生态调研笔记

> 调研日期：2026-07-14  
> 调研员：调研员_交互工具  
> 调研范围：marimo、JupyterLite、Observable、Streamlit、Gradio、Anvil、H5P、Pyodide/WASM 及可执行文档在教育领域的应用

---

## 1. marimo 最新发展

### 1.1 核心数据（2025-2026）

| 指标 | 数值（截至2026-01） | 来源 |
|------|-------------------|------|
| 月下载量 | 100万+ | marimo Newsletter 21, 2026-01-12 |
| 周下载量 | 18万+ | marimo Newsletter 21, 2026-01-12 |
| GitHub Stars | 1.8万+ | marimo Newsletter 21, 2026-01-12 |
| GitHub 贡献者 | 200+ | marimo Newsletter 21, 2026-01-12 |
| YouTube 累计观看 | 94万+ | marimo Newsletter 21, 2026-01-12 |
| Discord 社区成员 | 3,000+ | marimo Newsletter 21, 2026-01-12 |
| 团队规模 | 8人（从2位联合创始人增长） | marimo Newsletter 21, 2026-01-12 |
| Nature 期刊提及 | 2025年被Nature推荐为科学家应使用marimo的理由 | marimo Newsletter 21, 2026-01-12 |

**增长轨迹：**
- 2024-11-21：7,800+ GitHub Stars，60+ 贡献者，1,000 Discord成员（HPCWire报道）
- 2025-09-29：16,000+ Stars，180 贡献者，50万+ YouTube观看（Newsletter 18）
- 2025-11-20：17,000+ Stars，200+ 贡献者，75万+ YouTube观看（Newsletter 20）
- 2026-01-12：18,000+ Stars，200+ 贡献者，94万+ YouTube观看（Newsletter 21）

### 1.2 最新版本功能（0.19.0 - 0.23.10）

**2026年发布亮点：**
- **0.23.10（2026-04-20）**：更新至 Pyodide v314.0.0；支持 `mo.ui.chat` 渲染marimo HTML样式；预加载面板分块
- **0.23.9（2026-06）**：支持在同一笔记本的第二个浏览器标签页中只读查看；`mo.ui.table` 新增列可见性控制；幻灯片视图支持无输出单元格显示；演讲者备注
- **0.23.7（2026-05）**：表格过滤功能升级；WASM笔记本支持使用DuckDB查询远程文件
- **0.19.0（2026-01，最大版本）**：UI简化（更轻阴影、减少悬停样式、移除布局偏移）；可配置侧边栏；新增开发者面板（Cmd/Ctrl + J，类似VS Code）；支持pytest fixtures（对自动评分有用）；reactive Plotly条形图和热图；新依赖面板含minimap；参数化app组合

**2026年规划路线：**
- JupyterHub扩展
- 领域特定anywidget更易编写
- 刷新幻灯片和网格布局
- 完整IPython notebook导出
- PDF导出
- Quarto扩展改版
- 远程存储检查器（对象存储、Google Drive等）
- VS Code调试
- mo lab secrets / instant previews（共享快照）
- Kubernetes operator

来源：marimo Newsletter 21, GitHub Releases, marimo.io/blog

### 1.3 marimo WASM / 浏览器内运行

**核心机制：**
- marimo通过 `marimo export html-wasm` 命令将笔记本导出为纯浏览器端运行的WASM应用
- 由 Pyodide 驱动，支持完整Python科学计算栈（NumPy, Pandas, SciPy, scikit-learn, Matplotlib, Polars, DuckDB等）
- 三种创建方式：molab（`/wasm` 后缀预览GitHub笔记本）、导出WASM HTML、临时WebAssembly playground
- 自动包安装：通过 micropip 安装缺失包，或预安装 `--sandbox` 模式将依赖元数据嵌入笔记本文件

**WASM笔记本限制：**
- 内存限制：2GB（未来可能提升）
- 并非所有Python包都支持（仅支持纯Python wheel + 已移植的C扩展）
- PDB调试器不支持
- 并发支持有限（通过Pyodide的JSPI-backed asyncio loop实现协作式适配，原生线程/进程不支持）
- `sys.platform == "emscripten"` 用于检测WASM环境

**WASM资源占用对比（第三方评测，来源：Londogard Blog 2025-02-17）：**

| 工具 | WASM RAM占用 |
|------|-------------|
| Marimo | ~400 MB |
| stlite (Streamlit WASM) | ~600 MB |
| JupyterLite | >1 GB |
| Gradio Lite | ~522 MB |
| 纯Pyodide (无UI) | ~200 MB |

### 1.4 marimo在教育场景的具体应用案例

**高等教育：**
- **Stanford/SLAC**：计算机科学与数据科学课程使用marimo。GISMo团队将其用于可复现计算实验框架（expd），以及发布交互式教学材料（如信号分解方法教程）。来源：marimo.io/blog/slac-marimo, 2025-01-28
- **Hugging Face NLP课程**：使用内联marimo笔记本教授GRPO算法（DeepSeek R1使用的强化学习算法）。来源：marimo Newsletter 21
- **Real Python**：推出全面marimo课程。来源：marimo Newsletter 21
- **NASA**：凸优化课程使用marimo创建交互式笔记本。来源：marimo.io/blog/slac-marimo
- **Kaggle Grandmaster Parul Pandey**：从Jupyter迁移到marimo。来源：marimo Newsletter 21
- **Cloudflare**：以marimo作为Cloudflare数据接口，推出 notebooks.cloudflare.com。来源：marimo Newsletter 21

**教育场景核心优势：**
- 反应式执行使学生修改参数时依赖单元格自动更新，适合线性代数、数据可视化、机器学习建模等概念教学
- 支持嵌入自动测试（pytest），学生获得即时通过/失败反馈
- 内置AI助教（编辑器内置AI聊天助手，支持`marimo-pair`）
- `--sandbox` 模式确保所有学生使用相同的包环境
- 笔记本存储为纯Python文件，便于Git版本控制
- 可一键切换为App模式，无需重写代码即可创建交互式学习材料

来源：marimo.io/for-educators, marimo.io/features/user-educator

### 1.5 marimo与其他Notebook对比

| 维度 | marimo | JupyterLite | Observable | Google Colab |
|------|--------|-------------|------------|--------------|
| 执行模型 | 反应式（自动依赖追踪） | 顺序式（需手动执行单元格） | 反应式（数据流图） | 顺序式（基于Jupyter） |
| 存储格式 | 纯Python (.py) | JSON (.ipynb) | JSON/JS | JSON (.ipynb) |
| WASM/浏览器端 | ✅ 完整支持（Pyodide） | ✅ 完整支持（Pyodide） | ✅ 原生浏览器JS | ❌ 需要服务器 |
| 无服务器部署 | ✅ 可导出静态HTML | ✅ 静态文件服务器即可 | ✅ 原生 | ❌ 需要Google服务 |
| 复现性 | 无隐藏状态，自动依赖管理 | 需手动管理，有隐藏状态问题 | 版本历史，fork/merge | 环境共享但可能漂移 |
| 教育适用性 | ⭐⭐⭐⭐⭐（原生交互组件+AI） | ⭐⭐⭐⭐（经典，社区大） | ⭐⭐⭐⭐（数据可视化强） | ⭐⭐⭐⭐（免费GPU，易上手） |
| 包管理 | 内置+自动检测+`--sandbox` | 标准pip/conda | npm | 标准pip |
| 社区规模 | 增长极快（18k+ stars） | 庞大（Jupyter生态） | 大（100万+笔记本创建） | 极大（Google生态） |
| 语言 | Python | Python/R/C++ | JavaScript | Python |
| 特定优势 | 反应式+纯Python+WASM+App模式 | 完全兼容Jupyter生态+轻量部署 | D3/Plot可视化+数据叙事 | 免费GPU+Colab AI+共享 |

---

## 2. 类似交互式工具生态

### 2.1 Observable（数据可视化+交互）

**核心数据（2025-2026）：**
- 产品演变：2025年推出 **Observable Canvases**（浏览器端协作白板，支持SQL+UI+AI数据探索和分析）
- **Observable Notebooks 2.0**：2025年夏季发布，支持本地文件编辑、原生JavaScript、Notebook Kit（开放文件格式）和Notebook Desktop（macOS桌面应用）
- **Verifiable AI**：2025年7月发布，强调AI辅助数据工作中的透明度和可验证性
- 已创建笔记本数量：100万+（Observable官网，2025-04-14）
- 社区创作者持续增长，包括教育类交互笔记本（如Kernel Density Estimation教学笔记本）

**2026年规划：**
- Observable Canvases 图表能力升级（引入D3和Plot图库更多图表）
- 新教育资源和社区创作者推广
- 从产品设计到用户体验的整体改进

来源：observablehq.com/blog/observable-2025-year-in-review, observablehq.com

**教育场景特点：**
- 原生JavaScript反应式笔记本，D3.js可视化无与伦比
- Observable Framework（静态站点生成器）用于构建交互式数据应用和可探索解释（explorable explanations）
- 已被华盛顿大学CSEP 590a数据可视化课程采用（2025冬季学期）
- 适合数据新闻、可视化叙事、数据科学入门教学

### 2.2 Streamlit（Python应用构建）

**核心数据（2025-2026）：**
- 成立于2018年，2019年开源，2021年发布1.0，2022年被Snowflake收购
- 2025年：据称被超过90%的Fortune 50公司使用（deepnote.com, 2025-08-25）
- 开源（Apache 2.0），有Streamlit Cloud（免费+付费）
- 核心特点：用纯Python脚本快速构建数据应用，无需HTML/CSS/JS
- 支持Python 3.7-3.12（截至2025年）

**优点与缺点（2026年评测，digitaldefynd.com, 2026-07-03）：**
- ✅ 快速开发、最小配置、高度交互、丰富社区、Python生态集成
- ❌ 大型应用可扩展性有限、定制选项受限、纯Python、性能问题、移动端支持不佳

**WASM方面：**
- 通过 `stlite` 项目支持WASM部署（基于Pyodide）
- 可导出为单个HTML文件或base64编码URL
- WASM RAM占用约600MB（高于marimo）

来源：deepnote.com/blog/ultimate-guide-to-the-streamlit-library, digitaldefynd.com, blog.londogard.com

### 2.3 Gradio（AI Demo构建）

**核心数据（2025-2026）：**
- Gradio 5.0于2024年9月发布，2025年持续演进
- 核心定位：Hugging Face生态中的AI/ML Demo构建工具
- Hugging Face Spaces提供免费的公共Demo托管
- 开源（Apache 2.0），与Hugging Face Hub深度集成

**Gradio 5.0主要特性：**
- 服务器端渲染（SSR）在Hugging Face Spaces上大幅提升加载速度
- UI全面刷新（Button、Tab、Slider、JSON、ChatInterface等）
- 支持流式音频、图像、视频输入输出（HLS协议）
- 安全增强（第三方安全审计）
- AI Playground（实验性）：通过提示生成Gradio应用
- 提供 `gradio_client` REST API，便于程序化调用

**WASM方面：**
- 支持 `gradio_lite`（WASM版本），但UI体验较原生版本有明显降级
- WASM RAM占用约522MB
- 在WASM生态中排名中等（次于marimo/stlite）

来源：GitHub gradio-app/gradio #9463, blog.londogard.com

### 2.4 Anvil（Python全栈Web应用）

**核心定位：**
- 纯Python全栈Web应用构建平台（前端+后端均为Python）
- 拖放式UI设计器，无需JavaScript/CSS/HTML知识
- 免费使用（基础版），付费支持专业项目
- 支持数据库（PostgreSQL后端）、用户认证、HTTP端点/API、Stripe集成等
- 支持Git版本控制、CI、调试器等开发者工作流工具
- 与AI编码助手（如Claude Code）直接集成

**教育场景特点：**
- 被Talk Python Training等平台作为Python Web开发课程教学工具
- 降低Web开发门槛，使Python学习者能构建全栈应用
- 商业平台而非纯开源，适合快速原型和教学项目

来源：anvil.works, talkpython.fm, dev.to

---

## 3. 浏览器内计算/交互式文档的趋势

### 3.1 WebAssembly在教育技术中的趋势（2025-2026）

**技术成熟度里程碑：**
- **WebAssembly 3.0** 于2025年发布，引入垃圾回收（WasmGC）、64位内存（Memory64）、异常处理
- **Python 3.14** 正式支持Emscripten（PEP 776），Python 3.13/3.14 WASM采用加速
- **Pyodide** 持续更新：2026年4月发布v314.0.2，基于CPython 3.14和Emscripten 5.0.3；scikit-learn开始发布官方WASM wheel（PEP 783）
- **cibuildwheel v4.1.0**（2026-06）支持直接构建和发布Pyodide wheel到PyPI
- **WASI 0.3** 预计2026年2月发布，WASI 1.0预计2026年底或2027年初

**采用数据：**
- Chrome Platform Status：WASM使用率从2024年约4.5%增长到2025年约5.5%的Chrome页面加载
- 前1000网站中特定垂直领域采用率更高
- 几乎所有前25种编程语言都支持WASM编译

来源：platform.uno/blog/the-state-of-webassembly-2025-2026, zylos.ai/research, pyodide.org

**教育领域预测时间线（ModelCitizenDeveloper.com, 2026-03-06）：**
- **2024-2025：机构巩固期** — Python 3.14 WASM支持、Project Jupyter迁移到LF Charities、PyScript加入Bytecode Alliance
- **2025-2026：Python 3.13/3.14 WASM采用** — Pyodide跟踪Python 3.13、性能改进（JIT编译）、性能接近原生场景扩展
- **2026-2027：教育主流采用** — 浏览器端Python成为CS课程标配、JupyterLite在成本敏感场景替代JupyterHub
- **2027-2029：企业级生产就绪** — PyScript 3.x生产案例、WASM启动延迟优化（缓存实现即时加载）

### 3.2 纯客户端运行对隐私和可访问性的价值

**隐私优势：**
- 数据完全在客户端处理，无需上传到服务器
- 符合GDPR、CCPA、HIPAA等隐私法规（减少数据传输意味着降低合规风险）
- 浏览器沙箱安全模型天然隔离用户数据
- 研究案例：浏览器端客户流失预测研究（2025年论文）显示，WASM处理避免了服务器端数据隐私和合规问题

**可访问性优势：**
- 零安装：无需Python、虚拟环境或pip安装
- 跨平台：任何现代浏览器即可运行（Chrome, Firefox, Safari, Edge）
- 硬件无关：$200的Chromebook到$2,000的工作站都能运行相同的计算应用
- 低延迟：消除与服务器的网络往返，响应即时
- 离线韧性：可设计为离线优先（Offline-First），网络中断时继续工作

来源：zylos.ai/research, ctelearning.com, ijsat.org/papers/2025/4/8275.pdf

### 3.3 对网络条件不稳定地区（全球南方）的价值

**关键价值主张：**
- **带宽需求大幅降低**：一旦初始应用加载完成，数据流量显著低于传统云工具，适合WiFi基础设施老化的农村学区
- **消除服务器基础设施成本**：无需维护昂贵的计算后端，静态文件即可服务数百万用户
- **法国教育系统案例（Capytale）**：使用基于Pyodide的`basthon.fr`平台，每周运行近60,000个笔记本会话，仅需轻量级服务器（仅用于认证和文件传输）。Chris Holdgraf博客，2022-12-10
- **数字鸿沟弥合**：专业级工具在低成本设备上可用，"将$200设备变成高性能工作站"
- **离线可用**：Service Workers + WASM模块缓存 = 完全离线Python编程环境

**挑战：**
- 初始WASM模块加载仍需要一定带宽（Pyodide核心约200MB+，完整notebook更大）
- 冷启动延迟（首次加载需要下载和编译WASM）
- 内存限制（2GB-4GB）对重型计算场景仍有限制
- 并非所有Python包都已移植到WASM

来源：chrisholdgraf.com/blog/2022/jupyterlite-workshop/, ctelearning.com, zylos.ai

---

## 4. H5P的最新发展（2025-2026）

### 4.1 核心更新（2026年2月）

**H5P Core 1.28 — 全新视觉设计：**
- 更现代、更简洁的布局，简化形状和边框
- 中性默认配色方案，适配机构品牌
- 改进排版和间距，移动端可读性提升
- 标题、说明和活动内容布局更一致
- 默认主题：Daylight（固定默认）；默认密度：Wide（固定默认）

**内容类型Hub迁移：**
- 新Hub地址：hub-api.h5p.org（旧api.h5p.org不再接收更新）
- 所有H5P Core集成必须更新端点URL

**OER Hub更新：**
- 所有Hub内容使用Daylight主题（固定）和Medium密度（固定）
- 从Hub导入到H5P.com账户时，采用组织自己的主题和密度设置

来源：h5p.org/h5p-february-2026-update, 2026-02-18

### 4.2 内容类型与功能

**超过60种内容类型**，主要教育场景包括：

| 内容类型 | 最佳用途 | 是否评分 |
|---------|---------|---------|
| 交互式视频 | 带理解检查的讲座视频 | 是 |
| 课程演示 | 幻灯片微课程+互动元素 | 是 |
| 分支场景 | 临床决策、客服培训、伦理教育 | 是 |
| 拖放 | 解剖标记、流程排序、地理 | 是 |
| 对话卡片 | 词汇复习、术语记忆 | 否 |
| 时间线 | 历史年表、项目时间线 | 否 |
| 问题集 | 知识检查、练习测验 | 是 |
| 填空 | 语言学习、技术术语 | 是 |
| 标记词语 | 语法、阅读理解 | 是 |
| 专栏 | 组合多种内容类型的完整课程 | 是 |

来源：blog.moodiycloud.com/h5p-interactive-content-guide-moodle-2026, 2026-03-26

### 4.3 AI集成（2025年）

**H5P Smart Import：**
- 将现有文本、音频、视频或网页内容在几秒钟内转换为交互式测验、视频、填字游戏等
- 声称可将内容制作速度提升5倍
- 支持使用ChatGPT快速构建高度可定制的H5P内容（含自动反馈的测验、拖放任务、填空等）
- 2025年10月 webinar "Smarter, Better, Faster: Supercharging H5P with AI" 重点推广

来源：h5p.org/h5p-webinars-2025

---

## 5. 教育场景中的"可执行文档"概念

### 5.1 为什么可执行文档比静态视频/文本更适合学习

**核心学术证据：**

1. **主动学习 vs 被动学习**
   - 可执行文档将学生从被动接收者转变为"实验者"，通过代码执行即时获得反馈（Saefan, 2026系统综述）
   - 计算笔记本支持"测试-解释-修正"的探索循环（Perez & Granger, 2007）
   - 学生更愿意与可视化元素和交互组件互动，而非静态文本（SIGCSE 2021论文）

2. **即时反馈循环**
   - 修改代码→立即看到结果，强化理解
   - 与静态视频（单向）和静态PDF（无反馈）形成鲜明对比
   - Jupyter Notebook教育研究中，"主动交互"是比"阅读"更强的成绩预测因子（Smith et al., 2021）

3. **概念理解与计算思维的结合**
   - 计算笔记本将解释性叙事、代码和计算输出整合到单一文档中（Reades, 2020）
   - 学生可以追踪思维过程和问题解决步骤，特别适合需要可视化逐步分析的数据科学课程
   - 支持"读写程序"（literate programming），文档可执行且可复现（Knuth, 1984）

4. **学术实证数据**
   - 使用zyBooks（交互式教材）的多机构研究显示，课堂成绩显著提升，特别是低四分位学生（Edgecomb et al.）
   - 某入门编程课程中，使用Jupyter笔记本教材的通过率从78%提升至91%（McKinny et al.）
   - 学生对交互式笔记本的平均评分：4.1/5（价值认知），TBL（团队学习）评分4.4/5（Osório & Garma, 2025）
   - 100%学生认为Jupyter增强了高阶思维（Amoudi & Tbaishat, 2023）

5. **可执行文档的已知挑战**
   - 复现性：GitHub上数百万笔记本中，文档不足、库版本模糊、非顺序单元格执行是复现失败的主因（Pimentel et al., 2021）
   - 学生可能随机探索代码，偏离教学意图（Samuel & Mietchen, 2024）
   - 技术障碍和调试负担可能削弱情感体验（Saefan, 2026）
   - 大型笔记本在分页和滚动时可能变得笨重，阻碍学习（CCSC NE 2020论文）

来源：Saefan 2026系统综述, SIGCSE 2021, Amoudi & Tbaishat 2023, Pimentel et al. 2021, Hohman et al. 2020, Chi & Wylie 2014

### 5.2 交互式文档的新兴形式（2026）

- **ViviDoc**（2026年论文）：探索人机协作生成交互式文档，通过DocSpec框架让教育者控制AI生成的交互内容
- **Nature "live-code"文章**：2025年Nature推出可执行科学文章，允许科学家直接交互和复现结果
- **AI+可执行文档结合**：marimo的`marimo-pair`将LLM直接嵌入运行中的笔记本会话，AI可添加/删除/运行单元格、读取程序内存、安装包

来源：arxiv.org/html/2603.01912v1, Nature 2025a/2025b

---

## 6. 开源交互式课件框架对比：教育场景适用性

### 6.1 综合评分矩阵

基于2025-2026年公开数据和第三方评测（Londogard Blog, Deepnote, digitaldefynd等）整理：

| 维度 | marimo | JupyterLite | Observable | Streamlit | Gradio | H5P |
|------|--------|-------------|------------|-----------|--------|-----|
| **主要语言** | Python | Python/R/C++ | JavaScript | Python | Python | 无代码/模板 |
| **执行模型** | 反应式 | 顺序式 | 反应式 | 顺序式 | 顺序式 | 预定义交互 |
| **WASM支持** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐（原生JS） | ⭐⭐⭐⭐（stlite） | ⭐⭐⭐ | ❌ |
| **无服务器部署** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐（静态） |
| **复现性** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **交互组件** | ⭐⭐⭐⭐⭐（原生） | ⭐⭐⭐（ipywidgets） | ⭐⭐⭐⭐⭐（D3/Plot） | ⭐⭐⭐⭐ | ⭐⭐⭐⭐（AI Demo） | ⭐⭐⭐⭐⭐（教育专用） |
| **数据可视化** | ⭐⭐⭐⭐（Plotly/Altair） | ⭐⭐⭐⭐（Matplotlib等） | ⭐⭐⭐⭐⭐（D3原生） | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ |
| **编程学习** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐（JS） | ⭐⭐⭐ | ⭐⭐ | ⭐⭐（无需编程） |
| **数据科学教学** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ |
| **AI/ML教学** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| **部署简易度** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **社区生态** | 快速增长（18k+） | 庞大 | 大（100万+笔记本） | 极大（Fortune 50） | 大（Hugging Face） | 大（教育专用） |
| **开源** | ✅ MIT | ✅ BSD-3 | 混合（核心开源） | ✅ Apache 2.0 | ✅ Apache 2.0 | ✅ MIT |
| **教育场景最佳** | 反应式Python+WASM | 经典Jupyter+WASM | 数据可视化+JS | 快速数据应用 | AI/ML Demo | 标准化交互内容 |

### 6.2 教育场景选型建议

| 场景 | 推荐工具 | 理由 |
|------|---------|------|
| **Python编程入门** | JupyterLite / marimo | 零安装、即时执行、低门槛 |
| **数据科学/分析课程** | marimo / JupyterLite | 反应式探索、丰富可视化、科学计算栈完整 |
| **AI/ML模型展示** | Gradio / marimo | Hugging Face生态、marimo原生WASM支持 |
| **数据可视化/数据新闻** | Observable | D3.js原生、反应式JS、可视化叙事 |
| **快速构建数据仪表板** | Streamlit / marimo | 纯Python、快速部署、丰富组件 |
| **标准化交互课件（LMS集成）** | H5P | 60+内容类型、LMS原生集成、无需编程 |
| **可复现计算科学** | marimo | 无隐藏状态、纯Python文件、Git友好、依赖嵌入 |
| **离线/低带宽环境** | JupyterLite / marimo WASM | 纯客户端运行、无服务器、静态文件部署 |
| **全栈Web应用教学** | Anvil | 纯Python全栈、拖放UI、降低Web开发门槛 |

### 6.3 WASM生态内存与性能对比

| 工具 | WASM RAM | 特点 |
|------|----------|------|
| marimo | ~400 MB | 低资源占用、内置包管理、反应式执行 |
| stlite (Streamlit WASM) | ~600 MB | 需网络获取CDN资源、社区大 |
| Gradio Lite | ~522 MB | UI在WASM中降级、REST API是优势 |
| JupyterLite | >1 GB | 兼容Jupyter生态、资源占用最高 |
| 纯Pyodide | ~200 MB | 无UI，仅运行时 |

来源：blog.londogard.com/posts/2025-02-17-marimo/

---

## 附录：数据来源索引

| 来源 | URL | 日期 |
|------|-----|------|
| marimo Newsletter 21 | https://marimo.io/blog/newsletter-21 | 2026-01-12 |
| marimo Newsletter 20 | https://marimo.io/blog/newsletter-20 | 2025-11-20 |
| marimo Newsletter 18 | https://marimo.io/blog/newsletter-18 | 2025-09-29 |
| marimo GitHub Releases | https://github.com/marimo-team/marimo/releases | 2026-04-20 |
| marimo for Educators | https://marimo.io/for-educators | - |
| marimo vs Jupyter | https://marimo.io/features/vs-jupyter-alternative | - |
| marimo WASM Docs | https://docs.marimo.io/guides/wasm/ | - |
| marimo SLAC Blog | https://marimo.io/blog/slac-marimo | 2025-01-28 |
| marimo Pyodide Blog | https://marimo.io/blog/pyodide | 2024-04-08 |
| Observable 2025 Review | https://observablehq.com/blog/observable-2025-year-in-review | 2025-12-17 |
| Observable Notebooks | https://observablehq.com/ | 2025-04-14 |
| Observable Framework | https://github.com/observablehq/framework | - |
| Streamlit Guide | https://deepnote.com/blog/ultimate-guide-to-the-streamlit-library | 2025-08-25 |
| Streamlit Pros/Cons | https://digitaldefynd.com/IQ/pros-cons-of-streamlit/ | 2026-07-03 |
| Gradio 5.0 | https://github.com/gradio-app/gradio/issues/9463 | 2024-09-27 |
| Anvil | https://anvil.works/ | - |
| H5P Feb 2026 Update | https://h5p.org/h5p-february-2026-update | 2026-02-18 |
| H5P Moodle Guide | https://blog.moodiycloud.com/h5p-interactive-content-guide-moodle-2026 | 2026-03-26 |
| H5P Webinars | https://h5p.org/h5p-webinars-2025 | - |
| Pyodide | https://pyodide.org/ | 2026-05-06 |
| Pyodide TheNewStack | https://thenewstack.io/run-real-python-in-browsers-with-pyodide-and-webassembly/ | 2025-12-30 |
| WASM State 2025/2026 | https://platform.uno/blog/the-state-of-webassembly-2025-2026/ | 2026-01-27 |
| WASM 2026 | https://zylos.ai/research/2026-02-05-webassembly-ecosystem-2026 | 2026-02-05 |
| WASM High School Labs | https://www.ctelearning.com/webassembly-wasm-high-school-labs | 2026-04-06 |
| JupyterLite Workshop | https://chrisholdgraf.com/blog/2022/jupyterlite-workshop/ | 2022-12-10 |
| JupyterLite PyData 2026 | https://pretalx.com/pydata-london-2026/talk/NVXBEM/ | 2026-06-06 |
| Browser Python Timeline | https://research.modelcitizendeveloper.com/survey/1-110-4/ | 2026-03-06 |
| Computational Notebooks SLR | https://www.researchsquare.com/article/rs-9124168/ | 2026 |
| Interactive Notebooks Learning | https://pmc.ncbi.nlm.nih.gov/articles/PMC10186312/ | 2023 |
| ViviDoc | https://arxiv.org/html/2603.01912v1 | 2026-02-27 |
| Marimo Blog | https://blog.londogard.com/posts/2025-02-17-marimo/ | 2025-02-17 |
| Marimo vs Jupyter | https://www.normallydistributed.dev/is-marimo-the-new-jupyter-notebook/ | 2026-01-03 |
| Marimo vs Deepnote | https://deepnote.com/compare/marimo-vs-deepnote | - |
| HPCWire Marimo | https://www.hpcwire.com/bigdatawire/2024/11/21/marimo-emerges-from-stealth-to-debut-its-python-notebook/ | 2024-11-21 |
| Pyodide Blog | https://github.com/pyodide/pyodide-blog/issues/41 | 2024-03-12 |
| Calmcode Marimo WASM | https://calmcode.io/course/marimo/webassembly | 2025-03-14 |

---

*调研完成。所有数据均来自公开可查来源，标注了获取日期和URL以便验证。*
