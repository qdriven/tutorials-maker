---
title: "Run multi-agent LLM financial trading analysis"
slug: "run-multi-agent-llm-financial-trading-analysis"
summary: "A framework of multiple LLM agents that collaborate on financial trading decisions. · Sep 8, 2026"
category: "Money, Bills & Benefits"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_url: "https://github.com/TauricResearch/TradingAgents"
fetched_from: "https://agentusecases.ai/use-case/run-multi-agent-llm-financial-trading-analysis"
---

# Run multi-agent LLM financial trading analysis

> A framework of multiple LLM agents that collaborate on financial trading decisions. · Sep 8, 2026

**Category:** Money, Bills & Benefits  
**Agent:** custom-built or unnamed agent

## What they did

You install the repo, set an API key for an LLM provider, and pick a ticker and date in the CLI or through the Python TradingAgentsGraph call. Analyst agents cover fundamentals, sentiment, news and technicals. Bullish and bearish researchers then debate, a trader proposes a decision, and risk managers review it. The Portfolio Manager approves or rejects, and approved orders go to a simulated exchange.

## How it went

The source reports no benchmark results. It says outputs vary between runs and backtest returns may not match published figures, so the framework is a research scaffold and not a strategy with a fixed return.

## Worth knowing

Runs aren't reproducible, because LLM sampling and live news and social data change. Reasoning models ignore the temperature setting, so use a non-reasoning model for steadier output.

## Prompt

```text
Set up a small multi-agent research project in this folder where separate LLM agents act as a fundamentals analyst, a news analyst, a technical analyst and a risk manager for [ticker or list of tickers]. Have them debate and produce one written recommendation per ticker with reasoning, using only [free data source, e.g. yfinance]. This is paper analysis only, so never connect to a brokerage or place trades, and stop once you have run it on one ticker and saved the report.
```

## Related use cases

- [Shop for umbrella insurance through your personal agent](./shop-for-umbrella-insurance-through-your-personal-agent.md)
- [Research stock positions as an AI analyst](./research-stock-positions-as-an-ai-analyst.md)
- [Review IRS Tax Court case files and draft a settlement letter](./review-irs-tax-court-case-files-and-draft-a-settlement-lette.md)
- [File tenant complaints against a landlord automatically](./file-tenant-complaints-against-a-landlord-automatically.md)
- [Do taxes by selecting the right invoices](./do-taxes-by-selecting-the-right-invoices.md)
- [Cancel seven subscriptions and close the accounts](./cancel-seven-subscriptions-and-close-the-accounts.md)
