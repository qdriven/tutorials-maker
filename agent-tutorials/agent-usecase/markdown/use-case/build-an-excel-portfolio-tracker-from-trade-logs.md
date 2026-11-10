---
title: "Build an Excel portfolio tracker from trade logs"
slug: "build-an-excel-portfolio-tracker-from-trade-logs"
summary: "Claude Code reads a trade log, writes and runs Python, pulls live Yahoo Finance data and exports Robinhood trade history to build an Excel portfolio tracker."
category: "Money, Bills & Benefits"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "mispricedassets.substack.com"
source_date: "Undated"
source_url: "https://mispricedassets.substack.com/p/building-an-institutional-grade-portfolio"
fetched_from: "https://agentusecases.ai/use-case/build-an-excel-portfolio-tracker-from-trade-logs"
---

# Build an Excel portfolio tracker from trade logs

> Claude Code reads a trade log, writes and runs Python, pulls live Yahoo Finance data and exports Robinhood trade history to build an Excel portfolio tracker.

**Category:** Money, Bills & Benefits  
**Agent:** Claude Code  
**Source:** mispricedassets.substack.com · Undated

## What they did

The author gives Claude Code the path to an Excel Trade_Log, the starting capital and the start date. He tells it to use Excel formulas rather than hardcoded values. Claude reads the log, pulls prices and company data through yfinance, and builds the workbook sheets. The user then checks that the formulas recalculate. Broker pulls (including Robinhood via robin_stocks) and a daily update script are follow-up prompts.

## How it went

The guide describes a workbook with a dashboard, positions, equity curve, risk metrics and stress tests. It gives no measured results. It admits Claude will sometimes hardcode values or misunderstand, and the user then has to tell it to fix them.

## Worth knowing

Claude Pro is $20/month, and heavy builds may hit usage limits (Max is $100). Write the output to a new file, and change a price to confirm the formulas update.

## Prompt

```text
I have a trade log at [file path, e.g. a CSV exported from my broker]. Write and run Python that reads it, pulls current prices from Yahoo Finance, and builds an Excel portfolio tracker showing each position's cost basis, current value, gain/loss, and allocation. Save it as [filename].xlsx in this folder and tell me how to refresh it. Don't log into any account or change anything; work only from the exported file.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Search years of research files in an Obsidian vault](./search-years-of-research-files-in-an-obsidian-vault.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Shop for umbrella insurance through your personal agent](./shop-for-umbrella-insurance-through-your-personal-agent.md)
- [Draft a refund demand for an unauthorized renewal](./draft-a-refund-demand-for-an-unauthorized-renewal.md)
- [Run overnight memecoin checks and alerts](./run-overnight-memecoin-checks-and-alerts.md)
