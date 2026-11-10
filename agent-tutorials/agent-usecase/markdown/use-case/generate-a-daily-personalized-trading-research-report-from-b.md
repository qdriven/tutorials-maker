---
title: "Generate a daily personalized trading research report from brokerage data"
slug: "generate-a-daily-personalized-trading-research-report-from-b"
summary: "Lonnie VanZandt's Claude-based assistant reads his Schwab positions and watchlist via MCP, sweeps news and Fed sources, and writes a daily report."
category: "Money, Bills & Benefits"
agents:
  - name: "Claude"
    slug: "claude"
source_platform: "X"
source_date: "Oct 3, 2026"
source_url: "https://x.com/lonniev/status/2106218283426881984"
fetched_from: "https://agentusecases.ai/use-case/generate-a-daily-personalized-trading-research-report-from-b"
---

# Generate a daily personalized trading research report from brokerage data

> Lonnie VanZandt's Claude-based assistant reads his Schwab positions and watchlist via MCP, sweeps news and Fed sources, and writes a daily report.

**Category:** Money, Bills & Benefits  
**Agent:** Claude  
**Source:** X · Oct 3, 2026

## What they did

The Claude agent is given schwab-mcp access that authenticates against the user's own Schwab credentials for a single pull of positions, strike distances, buying power, watchlist and volatility data. It also sweeps wires, Fed releases and primary sources. A standing context prompt then directs it to produce a concise narrative that anchors every claim to the exact account numbers read minutes earlier.

## How it went

Every trading morning the assistant hands over the personalized report tuned to the user's holdings and worldview.

## Worth knowing

Requires the user's own Schwab account for MCP authentication.

## Prompt

```text
Set up a daily report that reads my positions and watchlist from [brokerage, read-only access], scans [news sources, Fed releases] for items affecting them, and writes a one-page summary with the biggest risks and moves. Save it as [file or email] each morning. Keep access read-only so it never places trades.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Prospect, score leads and run outbound email sequences](./prospect-score-leads-and-run-outbound-email-sequences.md)
- [Build an anonymous wall of hopes and fears about AI](./build-an-anonymous-wall-of-hopes-and-fears-about-ai.md)
- [Shop for umbrella insurance through your personal agent](./shop-for-umbrella-insurance-through-your-personal-agent.md)
- [Prepare and file overdue German VAT statements](./prepare-and-file-overdue-german-vat-statements.md)
- [Pull stock fundamentals from SEC filings for valuation](./pull-stock-fundamentals-from-sec-filings-for-valuation.md)
