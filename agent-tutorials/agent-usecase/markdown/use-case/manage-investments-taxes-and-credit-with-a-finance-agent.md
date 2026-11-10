---
title: "Manage investments, taxes and credit with a finance agent"
slug: "manage-investments-taxes-and-credit-with-a-finance-agent"
summary: "The poster built a Claude Code personal finance agent to track investments, prepare for self-employment taxes and optimize credit utilization."
category: "Money, Bills & Benefits"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "Reddit"
source_date: "Aug 1, 2026"
source_url: "https://www.reddit.com/r/ClaudeWorkflows/comments/1uzf8dd/workflow_building_hearth_a_claude_codepowered"
fetched_from: "https://agentusecases.ai/use-case/manage-investments-taxes-and-credit-with-a-finance-agent"
---

# Manage investments, taxes and credit with a finance agent

> The poster built a Claude Code personal finance agent to track investments, prepare for self-employment taxes and optimize credit utilization.

**Category:** Money, Bills & Benefits  
**Agent:** Claude Code  
**Source:** Reddit · Aug 1, 2026

## What they did

The poster used Claude Code to help build Hearth, a local Python personal finance system that pulled data from Schwab, Robinhood, Coinbase, Plaid, Gmail through Google MCP, and a market-data API. Claude helped research investing and tax rules, build custom skills, and refine logic for portfolio allocation, Schedule C and mileage handling, plus credit-utilization alerts keyed to statement close dates; the user validated the rules and cross-checks.

## How it went

The system consolidated investments, taxes, and credit monitoring in one dashboard and could flag issues like idle cash, dead connections, and discrepancies against bank data. The source gives no performance gains or savings figures, and says reproducing it would require significant technical skill.

## Worth knowing

The main catch is complexity: the source notes 547.7 million tokens over 80 active days, with no repo or prompt sequence provided.

## Prompt

```text
Build a personal finance assistant in this folder from my files: [investment statements, income records, credit card balances and limits]. It should track my investments, estimate quarterly self-employment tax set-asides based on [my income and state], and show how to bring credit utilization under [target percent]. It is done when one command produces a dated summary with the assumptions listed, and it should never connect to accounts or move money without asking me first.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Link journal entries and write book reviews in Obsidian](./link-journal-entries-and-write-book-reviews-in-obsidian.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Shop for umbrella insurance through your personal agent](./shop-for-umbrella-insurance-through-your-personal-agent.md)
- [Draft a refund demand for an unauthorized renewal](./draft-a-refund-demand-for-an-unauthorized-renewal.md)
- [Run overnight memecoin checks and alerts](./run-overnight-memecoin-checks-and-alerts.md)
