# Top 10 Use Cases & Top 10 GitHub Repos

> 从 1,910 个用例中按价值信号（实际效果、可量化收益、规模化运行、真实资金操作）精选，
> 每个用例点击即达详情页（含可复制的 Prompt）。GitHub 星数为 2026-11-06 实时数据。

## Top 10 Use Cases（最值得研究的用例）

| # | 用例 | 领域 | 为什么值得研究 |
|---|---|---|---|
| 1 | [Turn tickets into merged pull requests](./use-case/turn-tickets-into-merged-pull-requests-with-one-shot-coding-.md) | Software & DevOps | 把工单一路自动变成已合并的 PR——编码 agent 目前最强落地形态 |
| 2 | [Automate invoices, payments, and refunds](./use-case/automate-invoices-payments-and-refunds.md) | Work & Operations | 多智能体 + 4 服务集成，在真实资金流上运行，L3 的教科书样本 |
| 3 | [Run a solo company with eight agent departments](./use-case/run-a-solo-company-with-eight-agent-departments) | Work & Operations | 一人公司 + 8 个 agent 部门——「agent 组织」最有想象力的实践 |
| 4 | [Run a 24/7 personal assistant and progress tracker](./use-case/run-a-24-7-personal-assistant-and-progress-tracker.md) | Life Admin & Home | 7×24 常驻个人助理，长期运行 agent 的真实样本 |
| 5 | [Migrate a legacy product stack with Claude Code](./use-case/migrate-a-legacy-product-stack-with-claude-code.md) | Software & DevOps | 编码 agent 做大型遗留系统迁移——难度上限的代表 |
| 6 | [Book restaurant reservations end to end on real sites](./use-case/book-restaurant-reservations-end-to-end-on-real-sites.md) | Travel & Bookings | 浏览器 agent 在真实订位网站完成端到端操作 |
| 7 | [Buy headphones during a sale with an AI agent](./use-case/buy-headphones-during-a-sale-with-an-ai-agent.md) | Shopping & Errands | 盯促销→真实下单付款，agent 替你花钱的完整链路 |
| 8 | [Automate daily job applications with tailored CVs](./use-case/automate-daily-job-applications-with-tailored-cvs-and-cover-.md) | Life Admin & Home | 每日自动投递 + 定制简历/求职信，最「人人用得上」的自动化 |
| 9 | [Hunt business-logic flaws and open fix PRs](./use-case/hunt-business-logic-flaws-and-open-fix-prs.md) | Security & Hardware | agent 找业务逻辑漏洞并自动开修复 PR——安全 + 工程的交叉点 |
| 10 | [Source and screen candidates and reply over WhatsApp](./use-case/source-and-screen-candidates-and-reply-over-whatsapp.md) | Work & Operations | 招聘筛选 + WhatsApp 自动沟通，HR 场景的完整 agent 工作流 |

## Top 10 GitHub Repos（构建上述用例的工具箱）

| # | 仓库 | 星数 | 是什么 | 对应用例层级 |
|---|---|---|---|---|
| 1 | [openclaw/openclaw](https://github.com/openclaw/openclaw) | 394k | 全平台通用个人助理 agent（语料站里 95 个用例的主角） | L1-L3 全能 |
| 2 | [anomalyco/opencode](https://github.com/anomalyco/opencode) | 225k | 开源终端编码 agent（原 sst/opencode） | L2-L3 编码 |
| 3 | [n8n-io/n8n](https://github.com/n8n-io/n8n) | 210k | 工作流自动化平台 + 原生 AI，语料中 87 个用例的载体 | L2-L3 自动化 |
| 4 | [langgenius/dify](https://github.com/langgenius/dify) | 161k | 可视化 Agentic 工作流 / RAG 管道，低代码起步首选 | L1-L2 |
| 5 | [browser-use/browser-use](https://github.com/browser-use/browser-use) | 120k | Python 浏览器 agent 库（订票、表单、比价类用例的核心） | L2-L3 浏览器 |
| 6 | [OpenHands/OpenHands](https://github.com/OpenHands/OpenHands) | 93k | 自主编码 agent（原 All-Hands-AI） | L2-L3 编码 |
| 7 | [unclecode/crawl4ai](https://github.com/unclecode/crawl4ai) | 87k | 网站 → LLM 友好 Markdown 的爬虫，RAG 数据管道 | L3 基础设施 |
| 8 | [mem0ai/mem0](https://github.com/mem0ai/mem0) | 69k | agent 记忆层，即插即用的记忆基础设施 | L3 基础设施 |
| 9 | [microsoft/autogen](https://github.com/microsoft/autogen) | 62k | 微软多智能体编程框架 | L3 多智能体 |
| 10 | [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) | 45k | 代码优先的 agent 编排（图状态机），生产级控制力最强 | L2-L3 编排 |

> 遗珠：[crewAIInc/crewAI](https://github.com/crewAIInc/crewAI)（61k，角色化多智能体，上手比 autogen 简单）、
> [langflow-ai/langflow](https://github.com/langflow-ai/langflow)（~155k，可视化流编辑器）、
> [AutoGPT](https://github.com/Significant-Gravitas/AutoGPT)（~184k，自治 agent 先驱）。

### 怎么组合

- **入门第一站**：Dify（可视化）或直接用各家聊天 agent 复现 L1 用例
- **搭自动化**：n8n（自托管免费）串服务；浏览器类需求加 browser-use
- **编码任务**：opencode / OpenHands 跑本地开源方案，或直接用 Claude Code / Cursor（闭源但语料中最多）
- **上生产**：LangGraph 做编排控制，mem0 加记忆，crawl4ai 供数据——正好覆盖 L3 用例的三大件
