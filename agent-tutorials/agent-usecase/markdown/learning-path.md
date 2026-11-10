# Agent 用例分级学习指南

> 基于 agentusecases.ai 语料库的 1910 个用例，按复杂度自动评分分级，供循序渐进地学习。每个链接打开即是用例详情，其中的 Prompt 可直接复制。

## 总览

| 级别 | 数量 | 占比 |
|---|---|---|
| 入门（L1） | 695 | 36% |
| 中级（L2） | 903 | 47% |
| 高级（L3） | 312 | 16% |

## 判定标准

综合五个维度打分（分数越高越复杂）：

| 维度 | 规则 |
|---|---|
| agent 类型 | 纯对话 0 分；编程/自动化平台/浏览器操作型 agent +2 |
| 外部服务集成 | 1-2 个 +1；3-5 个 +2；6 个以上 +3 |
| 多智能体协作 | 多 agent 分工/编排 +3 |
| 定时自动化 | cron/定时/触发器/监控 +2 |
| agent 基础设施 | RAG、记忆系统、MCP、沙箱、评测 +2 |
| 端到端真实操作 | 在真实网站完成下单/订票/支付等 +2 |
| 工程化实践 | 部署、测试、PR、代码审查 +1 |
| 分级阈值 | ≤2 入门（L1）；3-5 中级（L2）；≥6 高级（L3） |

## 入门（L1）：第一周就能上手

第一次接触 AI agent 就能做的例子——纯对话、单轮 prompt、无需任何集成和配置，结果立等可见。适合零基础：不用写代码、不用配 API key，打开 ChatGPT/Claude 聊天框照着抄 Prompt 即可。这一级的目标是建立直觉：理解 agent 能做什么、不能做什么，学会把任务描述清楚。

**数量**：695 个 · **最集中的领域**：Life Admin & Home（109）、Work & Operations（104）、Money, Bills & Benefits（78）、Sales, Marketing & Support（71）

### 精选例子

| 用例 | 领域 | 复杂度构成 |
|---|---|---|
| [Analyze budgets and research investments from bank data](./use-case/analyze-budgets-and-research-investments-from-bank-data.md) | Money, Bills & Benefits | 纯对话式使用 |
| [Compare Coca-Cola prices across Belgian supermarkets](./use-case/compare-coca-cola-prices-across-belgian-supermarkets.md) | Shopping & Errands | 纯对话式使用 |
| [Compile and filter apartment listings](./use-case/compile-and-filter-apartment-listings.md) | Life Admin & Home | 纯对话式使用 |
| [Find fitting job postings and tailor resumes](./use-case/find-fitting-job-postings-and-tailor-resumes.md) | Life Admin & Home | 纯对话式使用 |
| [Fight a hospital bill with an appeal letter](./use-case/fight-a-hospital-bill-with-an-appeal-letter.md) | Money, Bills & Benefits | 纯对话式使用 |
| [Appeal a denied travel insurance claim](./use-case/appeal-a-denied-travel-insurance-claim.md) | Money, Bills & Benefits | 纯对话式使用 |
| [Extract sales metrics from call transcripts](./use-case/extract-sales-metrics-from-call-transcripts.md) | Sales, Marketing & Support | 纯对话式使用 |
| [Book a flight from your phone](./use-case/book-a-flight-from-your-phone.md) | Travel & Bookings | 纯对话式使用 |
| [Find restaurants that fit a party of 16](./use-case/find-restaurants-that-fit-a-party-of-16.md) | Travel & Bookings | 纯对话式使用 |
| [Find and test promo codes before checkout](./use-case/find-and-test-promo-codes-before-checkout.md) | Shopping & Errands | 纯对话式使用 |
| [Find holiday gifts and check stock and sales](./use-case/find-holiday-gifts-and-check-stock-and-sales.md) | Shopping & Errands | 纯对话式使用 |
| [Build a charting tool from blood test PDFs](./use-case/build-a-charting-tool-from-blood-test-pdfs.md) | Life Admin & Home | 纯对话式使用 |
| [Build interactive HTML presentations for history classes](./use-case/build-interactive-html-presentations-for-history-classes.md) | Content & Creative | 纯对话式使用 |
| [Call local stores to check toy stock](./use-case/call-local-stores-to-check-toy-stock.md) | Shopping & Errands | 纯对话式使用 |

## 中级（L2）：开始搭系统

从「聊天」进入「搭建」——用编程 agent（Cursor、Claude Code、Replit）做小工具，用自动化平台（n8n、Zapier、Make）串联 2-3 个服务，加定时任务让 agent 自己跑，或用浏览器 agent 在真实网站上完成操作。适合：愿意配 API key、能读懂简单代码、会排查报错的人。这一级的目标是掌握 1-2 个 agent 工具的完整工作流。

**数量**：903 个 · **最集中的领域**：Software & DevOps（195）、Work & Operations（152）、Sales, Marketing & Support（136）、Life Admin & Home（113）

### 精选例子

| 用例 | 领域 | 复杂度构成 |
|---|---|---|
| [Archive Trello boards into a Google Doc with Claude Code](./use-case/archive-trello-boards-into-a-google-doc-with-claude-code.md) | Work & Operations | 编程 agent（工程任务）；1-2 个外部服务集成；端到端真实网站操作 |
| [Build a 2D platformer game without coding](./use-case/build-a-2d-platformer-game-without-coding.md) | Games & Simulations | 编程 agent（工程任务）；1-2 个外部服务集成；定时/自动化流水线 |
| [Book restaurant reservations end to end on real sites](./use-case/book-restaurant-reservations-end-to-end-on-real-sites.md) | Travel & Bookings | 自动化平台编排；浏览器自动化操作；端到端真实网站操作 |
| [Alert AI agencies to businesses with bad reviews as leads](./use-case/alert-ai-agencies-to-businesses-with-bad-reviews-as-leads.md) | Sales, Marketing & Support | 自动化平台编排；1-2 个外部服务集成；定时/自动化流水线 |
| [Build an Excel portfolio tracker from trade logs](./use-case/build-an-excel-portfolio-tracker-from-trade-logs.md) | Money, Bills & Benefits | 编程 agent（工程任务）；1-2 个外部服务集成；定时/自动化流水线 |
| [Apply for Dutch rentals and schedule viewings](./use-case/apply-for-dutch-rentals-and-schedule-viewings.md) | Life Admin & Home | 自动化平台编排；1-2 个外部服务集成；定时/自动化流水线 |
| [Auto-buy items when the price hits a target](./use-case/auto-buy-items-when-the-price-hits-a-target.md) | Shopping & Errands | 浏览器/计算机操作型 agent；1-2 个外部服务集成；定时/自动化流水线 |
| [Answer data questions and build dashboards from the warehouse](./use-case/answer-data-questions-and-build-dashboards-from-the-warehous.md) | Work & Operations | 编程 agent（工程任务）；1-2 个外部服务集成；agent 基础设施（RAG/记忆/MCP/沙箱） |
| [Build searchable knowledge bases from videos and papers](./use-case/build-searchable-knowledge-bases-from-videos-and-papers.md) | Research & Knowledge | 浏览器/计算机操作型 agent；1-2 个外部服务集成；agent 基础设施（RAG/记忆/MCP/沙箱） |
| [Answer sales reps' questions with a Slackbot agent](./use-case/answer-sales-reps-questions-with-a-slackbot-agent.md) | Sales, Marketing & Support | 浏览器/计算机操作型 agent；1-2 个外部服务集成；agent 基础设施（RAG/记忆/MCP/沙箱） |
| [Build a booking and payment app for tattoo artists](./use-case/build-a-booking-and-payment-app-for-tattoo-artists.md) | Software & DevOps | 编程 agent（工程任务）；1-2 个外部服务集成；端到端真实网站操作 |
| [Explore open math problems with a multi-agent system](./use-case/explore-open-math-problems-with-a-multi-agent-system.md) | Security, Science & Hardware | 自动化平台编排；多智能体协作/编排 |
| [Audit a codebase for redundant dependencies and polyfills](./use-case/audit-a-codebase-for-redundant-dependencies-and-polyfills.md) | Software & DevOps | 自动化平台编排；agent 基础设施（RAG/记忆/MCP/沙箱）；工程化实践（部署/测试/PR） |
| [Book weekly restaurants and surface daily discoveries from your data](./use-case/book-weekly-restaurants-and-surface-daily-discoveries-from-y.md) | Life Admin & Home | 浏览器/计算机操作型 agent；1-2 个外部服务集成；定时/自动化流水线 |

## 高级（L3）：生产级 agent 系统

多个 agent 分工协作、深度集成 4+ 服务、7×24 常驻自动化、RAG/记忆/MCP 等基础设施、在关键业务流上端到端操作（支付、订票、代码合并）。适合：工程师或自动化从业者，能设计系统、处理失败重试、维护长期运行的 agent。这一级的目标是从「用一个 agent」到「运营一套 agent 系统」。

**数量**：312 个 · **最集中的领域**：Software & DevOps（84）、Work & Operations（77）、Sales, Marketing & Support（48）、Life Admin & Home（26）

### 精选例子

| 用例 | 领域 | 复杂度构成 |
|---|---|---|
| [Automate invoices, payments, and refunds](./use-case/automate-invoices-payments-and-refunds.md) | Work & Operations | 自动化平台编排；集成 4 个外部服务；多智能体协作/编排 |
| [Turn a Telegram message into researched, designed social posts](./use-case/turn-a-telegram-message-into-researched-designed-social-post.md) | Content & Creative | 自动化平台编排；集成 3 个外部服务；多智能体协作/编排 |
| [Run an AI software factory that opens, reviews, and merges PRs](./use-case/run-an-ai-software-factory-that-opens-reviews-and-merges-prs.md) | Software & DevOps | 自动化平台编排；集成 3 个外部服务；多智能体协作/编排 |
| [Migrate a legacy product stack with Claude Code](./use-case/migrate-a-legacy-product-stack-with-claude-code.md) | Software & DevOps | 编程 agent（工程任务）；1-2 个外部服务集成；多智能体协作/编排 |
| [Flag churn and expansion signals and draft support replies](./use-case/flag-churn-and-expansion-signals-and-draft-support-replies.md) | Sales, Marketing & Support | 自动化平台编排；集成 3 个外部服务；多智能体协作/编排 |
| [Hunt business-logic flaws and open fix PRs](./use-case/hunt-business-logic-flaws-and-open-fix-prs.md) | Security, Science & Hardware | 编程 agent（工程任务）；多智能体协作/编排；agent 基础设施（RAG/记忆/MCP/沙箱） |
| [Manage 18 agents from a Notion workspace](./use-case/manage-18-agents-from-a-notion-workspace.md) | Work & Operations | 浏览器/计算机操作型 agent；1-2 个外部服务集成；多智能体协作/编排 |
| [Build a company structure with Claude Code agents](./use-case/build-a-company-structure-with-claude-code-agents.md) | Content & Creative | 编程 agent（工程任务）；1-2 个外部服务集成；多智能体协作/编排 |
| [Automate lead research, CRM updates and enrichment](./use-case/automate-lead-research-crm-updates-and-enrichment.md) | Sales, Marketing & Support | 编程 agent（工程任务）；1-2 个外部服务集成；多智能体协作/编排 |
| [Save and search links via a Telegram second brain](./use-case/save-and-search-links-via-a-telegram-second-brain.md) | Research & Knowledge | 自动化平台编排；集成 3 个外部服务；定时/自动化流水线 |
| [Trade a small Robinhood account by tracking politician trades](./use-case/trade-a-small-robinhood-account-by-tracking-politician-trade.md) | Money, Bills & Benefits | 编程 agent（工程任务）；定时/自动化流水线；agent 基础设施（RAG/记忆/MCP/沙箱） |
| [Run a 24/7 personal assistant and progress tracker](./use-case/run-a-24-7-personal-assistant-and-progress-tracker.md) | Life Admin & Home | 浏览器/计算机操作型 agent；1-2 个外部服务集成；多智能体协作/编排 |
| [Let AI agents play Pictionary against each other](./use-case/let-ai-agents-play-pictionary-against-each-other.md) | Games & Simulations | 自动化平台编排；多智能体协作/编排；agent 基础设施（RAG/记忆/MCP/沙箱） |
| [Build client prototypes via team chat agent](./use-case/build-client-prototypes-via-team-chat-agent.md) | Software & DevOps | 编程 agent（工程任务）；1-2 个外部服务集成；多智能体协作/编排 |

## 建议学习路径

- **第 1 周**：在 L1 里挑 3-5 个和自己工作/生活相关的例子，直接抄每个文件里的 Prompt 跑一遍，体会「把任务说清楚」的差别。
- **第 2-4 周**：三选一深入：编程 agent（推荐从 Replit/Cursor 开始）、自动化平台（n8n 有免费自托管）、浏览器 agent（Claude in Chrome / ChatGPT Agent）。在所选方向复现 2 个 L2 例子。
- **第 2-3 月**：把 L2 的单步自动化扩展成 L3 式流水线：引入第二个 agent 分工（如一个产出、一个审核），加定时触发和失败通知。
- **持续**：L3 的失败案例同样值得读（如订票未完成的例子）——理解 agent 的边界比追求全自动更重要。

---

> 说明：分级由脚本按上表规则自动计算，供参考而非绝对标准——同一个例子对不同背景的人难度不同。想看某一层的全部例子，可在 `use-case/` 目录按分类浏览，或用 `markdown/README.md` 的分类索引。