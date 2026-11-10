---
title: "Generate investment analysis from live market data"
slug: "generate-investment-analysis-from-live-market-data"
summary: "The poster built a personal wealth advisor in Claude Code that feeds live market data, macro indicators and news into investment analysis."
category: "Money, Bills & Benefits"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "Reddit"
source_date: "Apr 1, 2026"
source_url: "https://www.reddit.com/r/ClaudeAI/comments/1sdtgof/used_claude_code_to_build_myself_a_personal"
fetched_from: "https://agentusecases.ai/use-case/generate-investment-analysis-from-live-market-data"
---

# Generate investment analysis from live market data

> The poster built a personal wealth advisor in Claude Code that feeds live market data, macro indicators and news into investment analysis.

**Category:** Money, Bills & Benefits  
**Agent:** Claude Code  
**Source:** Reddit · Apr 1, 2026

## What they did

The poster used Claude Code CLI to build a personal wealth advisor that pulled live market data, macro indicators and news into one workflow, then fed it to Claude with a CFA-style system prompt. In comments, they say a memory system let it recall and revisit earlier calls from weeks prior, which improved analysis quality; the person built the setup and used Claude’s output rather than handing decisions over fully.

## How it went

They say the goal was analysis beyond generic stock tips, but the thread excerpt gives no performance numbers or verified investing results. What’s shown is a personalized research workflow, with the strongest claimed benefit being better output from retained memory.

## Worth knowing

The main catch mentioned is that the memory layer mattered a lot: being able to reference what it said two weeks earlier noticeably changed output quality.

## Prompt

```text
Build me a small personal investment research tool in this folder. It should pull live market data for [tickers or funds I hold], key macro indicators like [rates, inflation, unemployment], and recent news, then write a short analysis of how these affect my portfolio of [brief description]. It is done when I can run one command and get a dated report with sources, and it should not place any trades.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Link journal entries and write book reviews in Obsidian](./link-journal-entries-and-write-book-reviews-in-obsidian.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Shop for umbrella insurance through your personal agent](./shop-for-umbrella-insurance-through-your-personal-agent.md)
- [Draft a refund demand for an unauthorized renewal](./draft-a-refund-demand-for-an-unauthorized-renewal.md)
- [Run overnight memecoin checks and alerts](./run-overnight-memecoin-checks-and-alerts.md)
