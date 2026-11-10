---
title: "Track personal finances with a Claude Code assistant"
slug: "track-personal-finances-with-a-claude-code-assistant"
summary: "The author built a Claude Code financial assistant using macro data over MCP and his own financials to track his finances, assess health and support investment decisions."
category: "Money, Bills & Benefits"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "adlrocha.substack.com"
source_date: "Undated"
source_url: "https://adlrocha.substack.com/p/adlrocha-agents-will-make-code-and"
fetched_from: "https://agentusecases.ai/use-case/track-personal-finances-with-a-claude-code-assistant"
---

# Track personal finances with a Claude Code assistant

> The author built a Claude Code financial assistant using macro data over MCP and his own financials to track his finances, assess health and support investment decisions.

**Category:** Money, Bills & Benefits  
**Agent:** Claude Code  
**Source:** adlrocha.substack.com · Undated

## What they did

The author connected the Baselight MCP to Claude Code, then had Claude generate a repo of markdown files: CLAUDE.md for behavior, YAML and markdown files for memory (portfolio, decisions, action plans), and saved SQL queries. He wrote no code and no markdown by hand. Each run queries Baselight for macro data, then analyses his portfolio. Git hooks encrypt sensitive data.

## How it went

The assistant, called Mr. Malone, runs analyses against his own portfolio and stores action plans for later sessions. The post gives no quantitative results, and he says LLMs can be unreliable and stochastic.

## Worth knowing

He built and used the assistant in one Claude Code session, which mixed contexts, and he kept the repo private and encrypted because the data is sensitive.

## Prompt

```text
Build me a personal finance assistant using my data in [folder or export files]. Summarize my income, spending, debts and savings, assess my financial health, and flag [concerns like runway or high-interest debt]. Keep everything local and don't make any transactions. You're done when I have a one-page report and a list of three questions or decisions I should consider next.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Search years of research files in an Obsidian vault](./search-years-of-research-files-in-an-obsidian-vault.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Shop for umbrella insurance through your personal agent](./shop-for-umbrella-insurance-through-your-personal-agent.md)
- [Draft a refund demand for an unauthorized renewal](./draft-a-refund-demand-for-an-unauthorized-renewal.md)
- [Run overnight memecoin checks and alerts](./run-overnight-memecoin-checks-and-alerts.md)
