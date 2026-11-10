---
title: "Trade a small Robinhood account by tracking politician trades"
slug: "trade-a-small-robinhood-account-by-tracking-politician-trade"
summary: "The author connected Claude Code to Robinhood's agentic trading beta via MCP with a $100 account; it watches politician and executive trades, tracks positions with live P&L and places real trades."
category: "Money, Bills & Benefits"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "ryandoser.com"
source_date: "Undated"
source_url: "https://ryandoser.com/ai-trading-agent-robinhood/"
fetched_from: "https://agentusecases.ai/use-case/trade-a-small-robinhood-account-by-tracking-politician-trade"
---

# Trade a small Robinhood account by tracking politician trades

> The author connected Claude Code to Robinhood's agentic trading beta via MCP with a $100 account; it watches politician and executive trades, tracks positions with live P&L and places real trades.

**Category:** Money, Bills & Benefits  
**Agent:** Claude Code  
**Source:** ryandoser.com · Undated

## What they did

Ryan Doser added Robinhood's trading MCP endpoint to Claude Code and finished OAuth on desktop, with a verification step in the Robinhood mobile app. He wrote a skill in 15 to 30 minutes that watches politician and executive trades. Claude asked him about his trading preferences, and it started a markdown trade log without being asked. It then bought four stocks.

## How it went

After overnight fund settlement, it bought four stocks at market open, including a couple of insurance names and Norwegian Cruise Line. The account was up about 33 cents at open. Returns are unproven.

## Worth knowing

Claude Code has to stay open on your computer for trades to execute, since the cron job only works while it's running. It's a beta, so only fund it with money you can afford to lose.

## Prompt

```text
Help me build a small experiment that watches publicly disclosed trades by [politicians or executives] and keeps a log of my positions with live profit and loss for a [dollar amount] account at [broker]. Start in read-only mode and give me a daily report of what you would trade and why. Before placing any real order, stop and show me the ticker, size and price and wait for my explicit yes.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Link journal entries and write book reviews in Obsidian](./link-journal-entries-and-write-book-reviews-in-obsidian.md)
- [Produce a finished music release from one chat](./produce-a-finished-music-release-from-one-chat.md)
- [Shop for umbrella insurance through your personal agent](./shop-for-umbrella-insurance-through-your-personal-agent.md)
- [Draft a refund demand for an unauthorized renewal](./draft-a-refund-demand-for-an-unauthorized-renewal.md)
- [Run overnight memecoin checks and alerts](./run-overnight-memecoin-checks-and-alerts.md)
