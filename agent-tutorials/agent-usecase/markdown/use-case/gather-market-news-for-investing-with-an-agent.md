---
title: "Gather market news for investing with an agent"
slug: "gather-market-news-for-investing-with-an-agent"
summary: "A commenter is setting up an AI agent with access to a news API to collect market news for investing decisions."
category: "Money, Bills & Benefits"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_platform: "Reddit"
source_date: "Jun 1, 2026"
source_url: "https://www.reddit.com/r/ValueInvesting/comments/1tn1iuv/how_can_you_use_ai_to_help_with_investing"
fetched_from: "https://agentusecases.ai/use-case/gather-market-news-for-investing-with-an-agent"
---

# Gather market news for investing with an agent

> A commenter is setting up an AI agent with access to a news API to collect market news for investing decisions.

**Category:** Money, Bills & Benefits  
**Agent:** custom-built or unnamed agent  
**Source:** Reddit · Jun 1, 2026

## What they did

The commenter is setting up an agent on a VPS and plans to feed it data weekly by hand: scans on leading growth companies and industries plus an Excel sheet ranking about 200 sub-industries by performance versus the S&P 500. The agent also gets access to SEC EDGAR and a cheaper, slightly delayed news API so it can connect unusual relative-strength shifts with the prior week’s news; the person is using it to surface themes, not make final decisions.

## How it went

The intended result is to spot major industry shifts within a few days and catch most of the move, with CPU names like Intel, AMD, and Marvell given as examples. They describe it as a growth-investing workflow and say they are only now trying it agentically, so no performance numbers are reported.

## Worth knowing

You still have to supply the core inputs manually each week, and the commenter specifically calls out VPS setup and ongoing API bills as the main catches.

## Prompt

```text
Build me a workflow that runs every morning at [time], pulls market news from [news API name] for these tickers and topics: [list], and uses an AI step to filter out noise and summarize the top 5 items with links. It should email the digest to [my email address]. Done means a test run delivers one correctly formatted digest, and the workflow only reads news and sends me the email, nothing else.
```

## Related use cases

- [Shop for umbrella insurance through your personal agent](./shop-for-umbrella-insurance-through-your-personal-agent.md)
- [Build an Excel portfolio tracker from trade logs](./build-an-excel-portfolio-tracker-from-trade-logs.md)
- [Track personal finances nightly from bank emails](./track-personal-finances-nightly-from-bank-emails.md)
- [Negotiate a lower fiber bill with AT&T chat](./negotiate-a-lower-fiber-bill-with-at-t-chat.md)
- [Run an 11-agent team for trading prep](./run-an-11-agent-team-for-trading-prep.md)
- [Track personal investments with a Claude-built portfolio tracker](./track-personal-investments-with-a-claude-built-portfolio-tra.md)
