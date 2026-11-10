---
title: "Analyze 10-Ks for value investing"
slug: "analyze-10-ks-for-value-investing"
summary: "The poster is experimenting with an LLM agent that reads 10-Ks and handles normalized earnings, ROIC, owner earnings and a rough reverse DCF."
category: "Money, Bills & Benefits"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_platform: "Reddit"
source_date: "Oct 13, 2026"
source_url: "https://www.reddit.com/r/ValueInvesting/comments/1x52d8o/anyone_building_a_value_investing_agent_what_are"
fetched_from: "https://agentusecases.ai/use-case/analyze-10-ks-for-value-investing"
---

# Analyze 10-Ks for value investing

> The poster is experimenting with an LLM agent that reads 10-Ks and handles normalized earnings, ROIC, owner earnings and a rough reverse DCF.

**Category:** Money, Bills & Benefits  
**Agent:** custom-built or unnamed agent  
**Source:** Reddit · Oct 13, 2026

## What they did

The poster was testing an LLM investing assistant that read 10-Ks and tried to produce normalized earnings, ROIC, owner earnings, and a rough reverse DCF. In the thread, they say they first used EDGAR/XBRL Companyfacts, then easier APIs, but ran into custom tags, footnotes, and backtest leakage; commenters pushed a workflow that combines structured headline figures with retrieval over filing text, stores source passages and year-by-year claims outside the chat, and leaves the human to verify tricky comparability issues.

## How it went

The source reports no performance results, only problems and partial fixes: feeding whole filing histories hit context limits, chunking led to missed evidence and invented facts, and backtests looked unrealistically good because of restatements and filing lag. The poster’s takeaway was that retrieval with citations, sanity checks, and point-in-time inputs made the setup more trustworthy but did not solve cross-company footnote comparisons.

## Worth knowing

Most practical advice was about avoiding false confidence: process filings once, keep extracted structure and passage locations, and only run new filings afterward to control cost.

## Prompt

```text
Analyze the latest 10-K for [company name or ticker], which I'll attach or link: [file or URL]. Calculate normalized earnings, ROIC, and owner earnings, showing each adjustment and the line items you used. Then build a rough reverse DCF showing what growth the current price of [price] implies at a [discount rate]% discount rate. Finish with a one-page summary that notes your assumptions and anything you were unsure about.
```

## Related use cases

- [Shop for umbrella insurance through your personal agent](./shop-for-umbrella-insurance-through-your-personal-agent.md)
- [Research stock positions as an AI analyst](./research-stock-positions-as-an-ai-analyst.md)
- [Review IRS Tax Court case files and draft a settlement letter](./review-irs-tax-court-case-files-and-draft-a-settlement-lette.md)
- [File tenant complaints against a landlord automatically](./file-tenant-complaints-against-a-landlord-automatically.md)
- [Monitor DeFi positions and alert on risky pools](./monitor-defi-positions-and-alert-on-risky-pools.md)
- [Cancel seven subscriptions and close the accounts](./cancel-seven-subscriptions-and-close-the-accounts.md)
