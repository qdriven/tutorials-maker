---
title: "Analyze company filings for investment research"
slug: "analyze-company-filings-for-investment-research"
summary: "The poster downloads filings themselves and hands the analysis to Claude Cowork, cutting manual company research work."
category: "Money, Bills & Benefits"
agents:
  - name: "Claude Cowork"
    slug: "claude-cowork"
source_platform: "Reddit"
source_date: "Aug 2, 2026"
source_url: "https://www.reddit.com/r/ValueInvesting/comments/1v5b241/is_anyone_spending_time_to_research_companies_or"
fetched_from: "https://agentusecases.ai/use-case/analyze-company-filings-for-investment-research"
---

# Analyze company filings for investment research

> The poster downloads filings themselves and hands the analysis to Claude Cowork, cutting manual company research work.

**Category:** Money, Bills & Benefits  
**Agent:** Claude Cowork  
**Source:** Reddit · Aug 2, 2026

## What they did

The poster used to research ideas from Reddit, then manually review financials, filings, and transcripts against a checklist. They now download company documents and hand the filing analysis to Claude Cowork, then built a simple MCP-connected tool so a /research command can fetch related financial data and filings, produce a thesis, and answer follow-up questions while they stay in the loop asking questions and judging the result.

## How it went

They say the setup lets them research stocks much faster and in a more automated way, and that they saw promising results. The thread gives no hard performance numbers, and the poster also warns that AI can hallucinate if it is not given the right data sources.

## Worth knowing

The main remaining work they called out was downloading and feeding documents; their custom tool was built specifically to remove that manual step.

## Prompt

```text
I've saved the filings for [company name] (10-Ks, 10-Qs, and earnings transcripts) in [folder path]. Read them and write me a research memo covering revenue and margin trends, debt and cash position, risks flagged in the filings, and changes in management tone between periods. Save it as a document in the same folder, quote the page or section for every key claim, and mark anything you're unsure about.
```

## Related use cases

- [Summarize email and prep briefings from your phone](./summarize-email-and-prep-briefings-from-your-phone.md)
- [Build Godot games with paired design and coding agents](./build-godot-games-with-paired-design-and-coding-agents.md)
- [Run work scripts in Cowork on staged documents](./run-work-scripts-in-cowork-on-staged-documents.md)
- [Shop for umbrella insurance through your personal agent](./shop-for-umbrella-insurance-through-your-personal-agent.md)
- [Search state databases for unclaimed property under old names](./search-state-databases-for-unclaimed-property-under-old-name.md)
- [Run a live Kalshi prediction-market account autonomously](./run-a-live-kalshi-prediction-market-account-autonomously.md)
