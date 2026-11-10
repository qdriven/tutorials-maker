---
title: "Generate updated research reports on followed companies"
slug: "generate-updated-research-reports-on-followed-companies"
summary: "The poster built and open-sourced a custom stock-research agent that produces updated reports on companies they follow."
category: "Research & Knowledge"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_platform: "Reddit"
source_date: "Jul 2, 2025"
source_url: "https://www.reddit.com/r/OpenAI/comments/1mdrdbh/built_my_own_agent_for_stock_research_and"
fetched_from: "https://agentusecases.ai/use-case/generate-updated-research-reports-on-followed-companies"
---

# Generate updated research reports on followed companies

> The poster built and open-sourced a custom stock-research agent that produces updated reports on companies they follow.

**Category:** Research & Knowledge  
**Agent:** custom-built or unnamed agent  
**Source:** Reddit · Jul 2, 2025

## What they did

The poster said they built a stock-research agent on top of paid real-time market-data subscriptions because ChatGPT’s answers were too dated for investing. In comments, they said it uses Polygon real-time stocks and options data, can run code on that data to answer screening-style requests like finding today’s inside-day patterns, and is available as a CLI plus a free web version; people still had to test outputs and report mistakes.

## How it went

The reported benefit was fresher research and the ability to answer data-driven trading queries ChatGPT alone could not. It fell short in important ways: the author said it was mostly US-focused, a user found a bad CHF/USD conversion and weak non-US handling, and the “open source” claim was challenged because the full backend was proprietary.

## Worth knowing

Copying this means paying for real-time data, and the source specifically names Polygon as the feed the author was buying.

## Prompt

```text
Build me a small research agent that, for each company on my list [tickers], pulls the latest filings, news, and price data from [sources] and writes an updated report in [folder]. Each report should cover what changed since the last one, key numbers, and risks. You're done when I can run one command to refresh all reports; test it on [two tickers] and show me the output first.
```

## Related use cases

- [Find connections across 100 non-fiction books](./find-connections-across-100-non-fiction-books.md)
- [Link journal entries and write book reviews in Obsidian](./link-journal-entries-and-write-book-reviews-in-obsidian.md)
- [Catalog and summarize papers dropped into Drive](./catalog-and-summarize-papers-dropped-into-drive.md)
- [Research a person and write a bio](./research-a-person-and-write-a-bio.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Research hedge fund portfolios from 13F filings](./research-hedge-fund-portfolios-from-13f-filings.md)
