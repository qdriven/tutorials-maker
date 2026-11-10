---
title: "Build a portfolio plan from brokerage exports"
slug: "build-a-portfolio-plan-from-brokerage-exports"
summary: "Claude Code read a directory of brokerage CSV exports and notes, researched funds, and produced buy, stop-buying and hold lists with a tax-loss harvesting partner fund for each."
category: "Money, Bills & Benefits"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "mattstockton.com"
source_date: "Feb 10, 2026"
source_url: "https://mattstockton.com/2026/02/10/building-a-portfolio-optimization-plan-with-claude-code.html"
fetched_from: "https://agentusecases.ai/use-case/build-a-portfolio-plan-from-brokerage-exports"
---

# Build a portfolio plan from brokerage exports

> Claude Code read a directory of brokerage CSV exports and notes, researched funds, and produced buy, stop-buying and hold lists with a tax-loss harvesting partner fund for each.

**Category:** Money, Bills & Benefits  
**Agent:** Claude Code  
**Source:** mattstockton.com · Feb 10, 2026

## What they did

Matt Stockton pointed Claude Code at a directory with brokerage CSV exports, a typed scratchpad of other balances, and a detailed goal prompt covering constraints, strawman targets and "ask me questions exhaustively". Claude wrote Python to parse and classify holdings, then built a gap analysis. Over several sessions he refined constraints, and a CLAUDE.md file carried context between them.

## How it went

It produced a ten-section plan with a four-phase action plan, tax payback tables and fund research. He's nearly done executing it. A self-rating of 7.5/10 surfaced improvements, such as using tax-free accounts for the overweight position.

## Worth knowing

The goal prompt mattered most. Include constraints, such as accounts you won't touch, and ask Claude to critique its own plan. It took a few evenings across multiple sessions.

## Prompt

```text
Read the brokerage CSV exports and notes in [folder path]. Research the funds I hold and give me three lists: buy more, stop buying, and hold. For each fund you suggest selling at a loss, name a similar partner fund for tax-loss harvesting and explain the reason. Write the result to a file called portfolio-plan and don't make any trades.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Link journal entries and write book reviews in Obsidian](./link-journal-entries-and-write-book-reviews-in-obsidian.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Shop for umbrella insurance through your personal agent](./shop-for-umbrella-insurance-through-your-personal-agent.md)
- [Draft a refund demand for an unauthorized renewal](./draft-a-refund-demand-for-an-unauthorized-renewal.md)
- [Run overnight memecoin checks and alerts](./run-overnight-memecoin-checks-and-alerts.md)
