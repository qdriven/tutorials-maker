---
title: "Research stock positions as an AI analyst"
slug: "research-stock-positions-as-an-ai-analyst"
summary: "A Claude Code agent twice weekly covers about 15 positions and a watchlist with news synthesis and bull/bear cases, while a human sets risk limits and approves trades."
category: "Money, Bills & Benefits"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "explainx.ai"
source_date: "Undated"
source_url: "https://explainx.ai/blog/claude-portfolio-autopilot-ai-trading-experiment-august-2026"
fetched_from: "https://agentusecases.ai/use-case/research-stock-positions-as-an-ai-analyst"
---

# Research stock positions as an AI analyst

> A Claude Code agent twice weekly covers about 15 positions and a watchlist with news synthesis and bull/bear cases, while a human sets risk limits and approves trades.

**Category:** Money, Bills & Benefits  
**Agent:** Claude Code  
**Source:** explainx.ai · Undated

## What they did

An anonymous operator gave a Claude Code agent (Opus 4.6) a one-line instruction to beat the S&P 500 on a $50,000 real-money account. The agent produces research on about 15 positions plus a candidate list, covering news, bull and bear cases and scenarios, twice a week. The operator wrote the risk rules (size limits, a turnover ceiling, a written thesis that can be proven wrong) and says the final picks are theirs.

## How it went

The operator reports +19.04% against +12.24% for the S&P 500 from March 3 to August 4, 2026, with $27 million copying the trades. The article says five months is too short to show skill, and the figures are unaudited.

## Worth knowing

Cost was only described as more than zero and less than an analyst; the full reply is cut off. The author notes this is a marketing funnel for a copy-trading product.

## Prompt

```text
Act as my research analyst for these positions: [tickers] and this watchlist: [tickers]. Twice a week, summarize recent news for each, give a bull case and a bear case, and flag anything that breaks my risk limits: [limits]. Do not place or suggest executing trades without my approval. You're done when I have a first report in [file or email format].
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Search years of research files in an Obsidian vault](./search-years-of-research-files-in-an-obsidian-vault.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Shop for umbrella insurance through your personal agent](./shop-for-umbrella-insurance-through-your-personal-agent.md)
- [Draft a refund demand for an unauthorized renewal](./draft-a-refund-demand-for-an-unauthorized-renewal.md)
- [Run overnight memecoin checks and alerts](./run-overnight-memecoin-checks-and-alerts.md)
