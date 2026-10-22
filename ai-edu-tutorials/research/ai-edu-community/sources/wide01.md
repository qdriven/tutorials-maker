# AI + 互动教育开源生态全景调研报告（2024–2026）

> 调研时间：2026-07-13  
> 角色：开源生态调研员_W1  
> 搜索覆盖：GitHub、Gitee、arXiv、行业媒体、基金会公告、投融资数据库

---

## Facet: AI教育开源生态全景

### Key Findings

- **GitHub AI教育相关项目在过去三年增长近20倍**，截至2025年初，基于大模型的开源项目已突破17万个 [^1]。2025–2026年，AI相关项目占据GitHub开源生态增长的45%以上，中国开发者贡献率达到38% [^2]。
- **OpenClaw以248,000+ Stars成为GitHub历史上增长最快的开源项目**（4个月内登顶），虽非纯教育项目，但其AI Agent能力已被大量教育场景复用 [^3]。
- **DeepTutor（HKUDS）自2025年12月发布以来迅速积累17,000+ Stars**，是完全开源的Agent原生个性化辅导平台，采用RAG+知识图谱双循环架构 [^4]。
- **Datawhale作为中国最大AI开源学习社区**，旗下75+份开源教程累计获得GitHub 70,000+ Stars（全球组织排名前200），代表项目包括PumpkinBook、LLM-Universe（6.3K Stars）、Happy-LLM（4.8K Stars）、easy-vibe（8.7K Stars）[^5][^6][^7]。
- **2025年7月至2026年6月，全球纯AI教育初创公司共披露22笔融资，总计1.9692亿美元**，中位数融资额为790万美元，无一笔超过5000万美元，显示市场仍处于早期验证阶段 [^8]。
- **盖茨基金会通过Digital Promise发布了高达700–800万美元的"EDU AI"资助计划**，专门用于开发开源K-12 AI辅导模型，这是教育开源领域最大规模的单一资助之一 [^9][^10]。
- **Khan Academy与Microsoft合作，计划开发基于Phi-3系列的开源小语言模型**用于数学辅导，并将Khanmigo教师工具免费提供给全美K-12教师 [^11]。
- **Open edX和H5P仍是开源教育基础设施的核心**：Open edX 2026年大会于5月在盐湖城召开；H5P于2026年1月推出OER Hub共享库 [^12][^13]。
- **教育领域交互式框架正从服务器端向浏览器端迁移**：JupyterLite（纯浏览器Wasm Jupyter）、Pyodide/PyScript（浏览器内Python）、marimo（反应式Python Notebook）成为新兴技术栈 [^14][^15]。
- **MIT和Apache 2.0许可证占据AI教育开源项目的主导地位**（约30–35%和大量新项目），GPL项目相对较少，整体生态对商业化友好 [^16]。

---

### Major Players & Sources

#### 国际核心项目

| 项目/组织 | 角色/定位 | 关键数据 |
|-----------|-----------|----------|
| **OpenClaw** | 通用AI Agent框架（教育场景大量复用） | 248K+ Stars，GitHub历史第一 [^3] |
| **DeepTutor (HKUDS)** | Agent原生个性化辅导平台 | 17K+ Stars，2025.12发布 [^4] |
| **Khan Academy / Khanmigo** | 非营利AI辅导（探索开源小模型） | GPT-4驱动，Microsoft合作，全美教师免费 [^11] |
| **Open edX** | 开源LMS平台，全球高校广泛采用 | 2026年会5月召开 [^12] |
| **H5P** | 交互式内容创建与共享 | 2026.1推出OER Hub [^13] |
| **Runestone Academy** | 开源交互式Python教材平台 | 多所高校采用，支持实时编程练习 [^17] |
| **OpenTutor** | 本地优先的块式自适应学习工作区 | 支持10+ LLM提供商，开源自托管 [^18] |
| **OpenTutorAI-CE** | 开源AI教育协作平台 | 支持对话式和沉浸式学习 [^19] |
| **edu-agent** | LangGraph + RAG驱动的教育Agent | StudentTraineeCenter出品 [^20] |
| **AITutorAgent** | 基于LangGraph的交互式辅导系统 | 支持结构化教程和知识评估 [^21] |
| **EduAI** | 全栈AI LMS概念验证 | React + NestJS + PostgreSQL [^22] |
| **marimo** | 反应式Python Notebook（教育场景） | 纯Python存储，Git友好，AI原生编辑器 [^15] |
| **JupyterLite** | 纯浏览器Jupyter发行版 | 基于Pyodide/WebAssembly，无需服务器 [^14] |
| **IBL.ai** | 开源LLM无关的AI教育平台（公司化运营） | 纽约-based，服务高校和终身学习 [^23] |
| **GeminiLight/awesome-ai-llm4education** | AI+LLM教育论文Awesome List | 顶级会议/期刊论文集合 [^24] |

#### 中文社区核心项目

| 项目/组织 | 角色/定位 | 关键数据 |
|-----------|-----------|----------|
| **Datawhale** | 中国最大AI开源学习社区 | 2018年成立，75+教程，70K+ Stars，全球组织排名前200 [^5][^6] |
| **LLM-Universe** | 小白友好的大模型应用开发教程 | 6.3K Stars [^7] |
| **Happy-LLM** | 从零构建大模型教程 | 4.8K Stars [^25] |
| **easy-vibe** | Datawhale Vibe Coding全栈教程 | 8.7K Stars [^26] |
| **Deep Agents 实战** | LangChain/LangGraph生产级Agent指南 | 1K Stars [^27] |
| **通往AGI之路** | AI学习社区（社群+教程模式） | 验证"社区+教程"商业模式可行 |

#### 关键基金会与资助方

| 组织 | 角色 |
|------|------|
| **盖茨基金会 (Bill & Melinda Gates Foundation)** | EDU AI资助（$7–8M）用于开源K-12 AI辅导模型 [^9][^10] |
| **Digital Promise** | K-12 AI基础设施项目管理方，负责EDU AI RFP [^10] |
| **NSF (美国国家科学基金会)** | AI Education Act of 2024，资助AI教学工具与材料研究 [^28] |
| **Microsoft** | 向Khan Academy捐赠Azure基础设施，合作开发开源Phi-3教育模型 [^11] |
| **OpenStax (Rice University)** | 非营利开源教材，正在试点AI增强自适应学习技术 [^29] |

---

### Trends & Signals

#### 1. 技术架构：从单一LLM到Agent+RAG+知识图谱的复合架构

- **LangChain/LangGraph成为教育Agent的事实标准**。edu-agent、AITutorAgent、DeepTutor均基于LangGraph构建工作流 [^20][^21][^4]。
- **RAG技术广泛采用，但正从标准向量检索向GraphRAG演进**。DeepTutor采用"图增强RAG"（Graph-Enhanced RAG）结合知识图谱实现更精准的学科推理 [^4]。
- **多数据源RAG成为标配**。多个开源项目同时接入Wikipedia、ArXiv、教材PDF、课程文档等多种知识源 [^30]。
- **向量数据库分布**：Chroma（轻量/本地）、Pinecone（云端）、FAISS（Meta/研究）三分天下 [^30][^31]。

#### 2. 交互形态：从"问答"到"沉浸式工作区"

- **DeepTutor提出"Agent原生学习工作区"概念**，将辅导、解题、测验生成、研究、可视化、掌握追踪集成到单一界面 [^4]。
- **OpenTutor采用"块式自适应学习"**，将PDF自动转化为结构化笔记、测验、闪卡和自适应导师 [^18]。
- **浏览器端计算崛起**：JupyterLite + Pyodide使得Python教育完全脱离服务器，可在离线/低带宽环境运行 [^14]。
- **marimo等反应式Notebook**使教程代码可交互、可复现、Git友好，成为新一代技术教程载体 [^15]。

#### 3. 开源商业化："核心开源+增值服务"模式成熟

- **IBL.ai采用开源LLM无关平台策略**，面向高校和终身学习提供商业化服务 [^23]。
- **Subject获得2800万美元Growth Equity融资**，是AI教育领域唯一的后期阶段融资，其定位AI原生K-12课程平台 [^8]。
- **Gizmo（2200万美元Series A）**和**Oboe（1600万美元Series A, a16z投资）**将AI练习工具（闪卡、测验）作为高粘性入口 [^8]。
- ** educator copilots（教师助手）普遍获得小额种子轮融资**，但资本化程度低——占22.7%的交易数但仅占8.8%的资本，说明"节省教师时间"是强种子叙事但难以规模化 [^8]。

#### 4. 数据开放：从静态数据集到动态学习分析

- **开放学习分析数据集快速增长**：2026年一项研究发现了172个独特数据集，用于204篇出版物 [^32]。
- **OULAD（Open University Learning Analytics Dataset）**仍是教育数据挖掘的标准基准数据集 [^33]。
- **2026年Nature发表的新型去标识化学生活动数据集**代表了隐私保护与数据开放的新平衡 [^34]。

#### 5. 许可证趋势：高度商业化友好

- **MIT许可证在GitHub上占比约30–35%**，是AI教育项目的首选 [^16]。
- **Apache 2.0因专利保护条款**，被大型公司和基金会项目广泛采用（如OpenClaw的部分组件）。
- **GPL在教育开源领域占比相对较低**，可能限制了其在追求商业化的教育科技初创公司中的采用 [^35]。

---

### Controversies & Conflicting Claims

- **开源vs.闭源AI辅导模型**：Khan Academy的Khanmigo基于GPT-4（闭源），虽Microsoft合作探索开源Phi-3小模型，但核心产品仍依赖商业API [^11]。与之相反，盖茨基金会EDU AI资助明确要求产出"完全开源"的K-12辅导模型 [^9]。这一 tension 反映了教育AI领域"效果优先"与"可及性优先"的路线之争。
- **AI辅导是否真的有效仍存争议**：虽然大量开源项目声称实现"苏格拉底式辅导"，但独立的教育效果研究仍然稀缺。Khanmigo的设计强调"不给答案"，但这依赖于高质量的提示工程和实时内容审查 [^36]。
- **中国开发者贡献率38%的数据与西方主流话语的落差**：GitHub Octoverse报告显示中国开发者在AI开源领域贡献率全球领先 [^2]，但在HuggingFace等主流平台上的高星项目仍以欧美主导。Datawhale的生态主要服务中文学习者，国际化程度有限。
- **"AI-native"叙事与实际落地之间的差距**：2025–2026年AI教育融资数据显示市场极度早期（中位数仅790万美元），多数产品仍在验证PMF阶段，但技术社区已出现大量"AI-native教育平台"的同质化项目 [^8]。

---

### Recommended Deep-Dive Areas

| 领域 | 为什么值得深入 |
|------|---------------|
| **DeepTutor的Agent架构与RAG实现** | 17K Stars的快速增长，HKUDS学术背景，图增强RAG在STEM辅导中的实际效果 |
| **盖茨基金会EDU AI资助的落地项目** | $7–8M单一资助将塑造K-12开源AI tutoring的标准，影响未来3–5年生态格局 |
| **Datawhale社区模式的可复制性** | 70K Stars的学习社区如何组织75+份教程的生产、维护和质量控制 |
| **JupyterLite/marimo对编程教育的技术颠覆** | 纯浏览器计算消除了服务器和部署门槛，可能重塑在线编程教育的成本结构 |
| **Open edX + H5P + AI的集成路径** | 全球最广泛部署的开源LMS如何拥抱LLM，代表了"传统教育基础设施AI化"的核心场景 |
| **AI教育开源项目的商业模式验证** | 当前市场无一笔融资超过5000万美元，需要追踪哪些项目能从种子期存活到Series B |
| **中文AI教育开源项目的国际化** | Datawhale等项目主要以中文服务，其内容和技术框架能否走向全球市场 |

---

## 附录：分角度搜索摘要

### 角度1：GitHub Stars增长趋势
OpenClaw 248K Stars（2026 AI Agent元年标志），DeepTutor 17K Stars（6个月），Datawhale组织累计70K+ Stars。GitHub AI项目整体三年增长20倍 [^1][^2][^3][^4]。

### 角度2：新兴AI教育开源项目
OpenTutor（块式自适应学习）、OpenTutorAI-CE（沉浸式学习平台）、edu-agent（LangGraph+RAG）、AITutorAgent（结构化教程）、EduAI（全栈LMS）、marimo（反应式教育Notebook）[^18][^19][^20][^21][^22][^15]。

### 角度3：技术架构对比
LangChain/LangGraph dominant（>80%的教育Agent项目），RAG向量数据库三分天下（Chroma/Pinecone/FAISS），GraphRAG emerging（DeepTutor），多模态小模型（Phi-3 for education）[^4][^30][^31][^11]。

### 角度4：教育开源组织/基金会
Open edX（2026大会5月）、H5P（OER Hub 2026.1）、Runestone Academy（交互式教材）、OpenStax（AI增强试点）、Khan Academy（非营利AI辅导）[^12][^13][^17][^29][^11]。

### 角度5：社区活跃度与贡献者
Datawhale（中国最大AI学习社区，75+教程），GitHub AI项目贡献中国开发者38%，Octoverse 2025报告显示AI占开源增长45%+ [^2][^5][^6]。

### 角度6：商业模式与公司赞助
AI教育融资196.92M/22 deals（2025.7–2026.6），Subject $28M、Gizmo $22M、Oboe $16M（a16z），微软赞助Khan Academy Azure，盖茨基金会$7–8M资助开源模型 [^8][^11][^9][^10]。

### 角度7：中文社区AI教育开源
Datawhale（LLM-Universe 6.3K、Happy-LLM 4.8K、easy-vibe 8.7K），CSDN/掘金/微信公众号大量教程分发，"通往AGI之路"社群验证模式 [^5][^6][^7][^25][^26]。

### 角度8：互动式教程框架
JupyterLite（Wasm/无服务器）、Pyodide/PyScript（浏览器Python）、marimo（反应式/纯Python存储）、Runestone（交互式教材）、H5P（富交互内容）[^14][^15][^17][^13]。

### 角度9：LICENSE分布与商业化友好度
MIT ~30–35%（最流行），Apache 2.0（专利保护，受企业青睐），GPL占比低，整体生态高度商业化友好 [^16][^35]。

### 角度10：教育数据开放/共享
172个学习分析数据集（2026研究），OULAD基准数据集，Nature 2026新数据集，盖茨/NSF资助推动数据开放 [^32][^33][^34][^28][^9]。

---

## 来源脚注

[^1]: CSDN博客，《2026年AI大模型应用开发保姆级教程》，2025-12-17。https://modelers.csdn.net/69a543f87bbde9200b9b4418.html

[^2]: 稀土掘金，《AI开源项目全景图：2025-2026年顶级项目生态概览》，2026-04-17。https://juejin.cn/post/7629239986617663514

[^3]: cnbugs，《🤖 2025-2026年GitHub热门AI开源项目大盘点》，2026-06-04。https://www.cnbugs.com/post-7991.html

[^4]: GitHub - HKUDS/DeepTutor，2026-06-30。https://github.com/HKUDS/DeepTutor；arXiv，《DeepTutor: Towards Agentic Personalized Tutoring》，2026-04-10。https://arxiv.org/html/2604.26962v1；Emelia，《DeepTutor: The AI Assistant That Personalizes Learning with Agents》，2026-04-12。https://emelia.io/hub/deeptutor-ai-learning-assistant

[^5]: GitHub - datawhalechina，2026-07-02。https://github.com/datawhalechina；智源社区，《《Datawhale人工智能培养方案》2.0发布》，2023-10-20。https://hub.baai.ac.cn/view/31753

[^6]: 博客园，《DataWhale的AI开源学习进阶》，2026-01-02。https://www.cnblogs.com/zafu/p/19432118

[^7]: GitHub - datawhalechina/llm-universe。https://github.com/datawhalechina/llm-universe；微信公众号(逛逛GitHub)，《2025 神仙开源 AI 教程一网打尽》，2025-07-01。http://mp.weixin.qq.com/s?__biz=MzUxNjg4NDEzNA==&mid=2247525124&idx=1&sn=d464f82df6d4fed19bff1f6286871819

[^8]: New Market Pitch，《AI in Education Startup Funding 2025-2026》，2026-04-23（数据截至2026-06-08）。https://newmarketpitch.com/blogs/news/ai-education-funding-analysis

[^9]: k12-ai-infrastructure.org，《Letter of Intent – Open Source AI Model for Tutoring (EDU AI)》，2026-05-08。https://k12-ai-infrastructure.org/loi-1/

[^10]: edtechinnovationhub.com，《Digital Promise opens $8M AI tutoring RFP》，2026-06-04。https://www.edtechinnovationhub.com/news/digital-promise-program-opens-8-million-ai-tutoring-grant-backed-by-gates-foundation

[^11]: Microsoft News，《Microsoft and Khan Academy to make AI-powered Khanmigo tool free to every US teacher》，2024-05-21（更新2025-02-04）。https://news.microsoft.com/source/features/ai/khan-academy-and-microsoft-partner-to-expand-access-to-ai-tools/；Khan Academy Blog，《Your AI Tutor: Khanmigo by Khan Academy》，2024-04-10。https://blog.khanacademy.org/learner-khanmigo/

[^12]: Open edX Conference 2026。https://con.openedx.org/；Edly，《Open edX Conference 2026 Gear-Up Guide》，2026-05-11。https://edly.io/blog/openedx-conference-2026-gear-up-guide/

[^13]: H5P，《The Launch of H5P OER Hub》，2026-01-23。https://h5p.org/h5p-oer-hub-jan-2026

[^14]: GitHub - jupyterlite/jupyterlite。https://github.com/jupyterlite/jupyterlite

[^15]: GitHub - marimo-team/marimo，2026-06-25。https://github.com/marimo-team/marimo；marimo.io官网。https://marimo.io/

[^16]: DEV Community，《The Ultimate Guide to Choosing the Right License》，2025-10-08。https://dev.to/m-a-h-b-u-b/the-ultimate-guide-to-choosing-the-right-license-for-your-software-project-from-mit-to-gpl-h9e

[^17]: Runestone Academy Library。https://runestone.academy/ns/books/index；GitHub - RunestoneInteractive。https://github.com/orgs/RunestoneInteractive/repositories

[^18]: GitHub - zijinz456/OpenTutor，2026-07-07。https://github.com/zijinz456/OpenTutor

[^19]: arXiv，《Open TutorAI: An Open-source Platform for Personalized and Immersive Learning with Generative AI》，2026-02-06。https://arxiv.org/html/2602.07176v1；GitHub - Open-TutorAi/open-tutor-ai-CE。https://github.com/Open-TutorAi/open-tutor-ai-CE

[^20]: GitHub - StudentTraineeCenter/edu-agent，2025-10-09。https://github.com/StudentTraineeCenter/edu-agent

[^21]: GitHub - Ebimsv/AITutorAgent，2025-06-03。https://github.com/Ebimsv/AITutorAgent

[^22]: GitHub - LeParisien-dev/EduAI，2025-09-21。https://github.com/LeParisien-dev/EduAI

[^23]: masterofcode.com，《13 Best Education AI Companies Transforming Learning》，2026-07-08。https://masterofcode.com/blog/best-education-ai-companies

[^24]: GitHub - GeminiLight/awesome-ai-llm4education。https://github.com/GeminiLight/awesome-ai-llm4education

[^25]: GitHub - datawhalechina/happy-llm。https://github.com/datawhalechina/happy-llm

[^26]: DEV Community，《Easy-Vibe - Datawhale's AI-Era Programming Curriculum》，2026-05-13。https://dev.to/wonderlab/one-open-source-project-a-day-no-64-easy-vibe-datawhales-ai-era-programming-curriculum-26ic

[^27]: GitHub - datawhalechina/Deep-Agents（Deep Agents 实战），2026-07-02。https://github.com/datawhalechina

[^28]: Digital Promise，《AI in Education: Rewards, Risks, and Readiness [Report]》。https://cdn.prod.website-files.com/65af2088cac9fb1fb621091f/66f1ba0f9968c9a451ecb211_AI%20in%20Education_%20Rewards,%20Risks,%20and%20Readiness%20[Report].pdf

[^29]: Oregon State University Capstone，《Building the Future of AI-Powered Learning》。https://eecs.engineering.oregonstate.edu/capstone/submission/pages/viewSingleProject.php?id=CaziQbJxbPImRsGh；arXiv，《Towards an AI-Augmented Textbook》，2025-09-30。https://arxiv.org/html/2509.13348v4

[^30]: GitHub - dan0nchik/langchain-rag-agent，2025-05-17。https://github.com/dan0nchik/langchain-rag-agent；GitHub - ChitrakshSuri/RAG-With-Multiple-Data-Source-Using-Langchain，2025-07-15。https://github.com/ChitrakshSuri/RAG-With-Multiple-Data-Source-Using-Langchain

[^31]: firecrawl.dev，《15 Best Open-Source RAG Frameworks in 2026》，2026-01-02。https://www.firecrawl.dev/blog/best-open-source-rag-frameworks

[^32]: arXiv，《Open Datasets in Learning Analytics: Trends, Challenges, and Best Practice》，2026-02-19。https://arxiv.org/html/2602.17314v1

[^33]: GitHub - ElizabethSeidle/OULAD。https://github.com/ElizabethSeidle/OULAD

[^34]: Nature，《Open data, private learners: a de-identified student activity and performance dataset for learning analytics》，2026-02-27。https://www.nature.com/articles/s41597-026-06821-3

[^35]: tldrlss.com，《What's the Difference Between MIT, ISC, Apache, and GPL?》，2026-02-23。https://dev.tldrlss.com/en/article/2026/02/whats-the-license-about-mit-isc-apache-gpl/

[^36]: BuildMVPFast，《AI Tutoring at Scale: Khan Academy's Khanmigo Case Study》，2026-03-24。https://www.buildmvpfast.com/blog/ai-tutoring-khanmigo-case-study-2026
