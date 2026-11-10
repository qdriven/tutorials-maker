---
title: "Research hedge fund portfolios from 13F filings"
slug: "research-hedge-fund-portfolios-from-13f-filings"
summary: "An open-source financial research agent with live data access works with 13F filings to analyze institutional portfolio disclosures."
category: "Research & Knowledge"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_platform: "Reddit"
source_date: "Mar 19, 2026"
source_url: "https://www.reddit.com/r/aiagents/comments/1rvhnqo/ai_for_financial_research_i_gave_my_opensource"
fetched_from: "https://agentusecases.ai/use-case/research-hedge-fund-portfolios-from-13f-filings"
---

# Research hedge fund portfolios from 13F filings

> An open-source financial research agent with live data access works with 13F filings to analyze institutional portfolio disclosures.

**Category:** Research & Knowledge  
**Agent:** custom-built or unnamed agent  
**Source:** Reddit · Mar 19, 2026

## What they did

The post describes an open-source financial research app that lets an AI agent query live financial data, including SEC filings, insider transactions, earnings, stock prices, and newly added 13F, 13D, and 13G disclosures. The user asks in plain English for things like a fund’s biggest new positions, and the agent searches and analyzes that data through a Next.js app using the Vercel AI SDK for tool calling, Daytona for code execution, and Valyu search; the human’s role is framing the prompt and reviewing the output.

## How it went

The creator says the app had close to 1,000 GitHub stars and can surface institutional portfolios and related filings from one prompt. A commenter notes 13F data is delayed, so it is better for idea generation and historical tracking than real-time conviction.

## Worth knowing

It is presented as 100% free, open-source, and able to run offline with local models.

## Prompt

```text
Research the latest 13F filing for [hedge fund or institutional investor name] using SEC EDGAR data. Summarize its top 10 holdings by value, the biggest new positions, the positions it increased, reduced or exited since the prior quarter, and its sector concentration. Finish with a one-page summary table and a short list of the three most notable changes, citing the filing links you used.
```

## Related use cases

- [Find connections across 100 non-fiction books](./find-connections-across-100-non-fiction-books.md)
- [Link journal entries and write book reviews in Obsidian](./link-journal-entries-and-write-book-reviews-in-obsidian.md)
- [Catalog and summarize papers dropped into Drive](./catalog-and-summarize-papers-dropped-into-drive.md)
- [Research a person and write a bio](./research-a-person-and-write-a-bio.md)
- [Measure how long jobs stay open at tech companies](./measure-how-long-jobs-stay-open-at-tech-companies.md)
- [Scrape AI news three times a day with a custom bot](./scrape-ai-news-three-times-a-day-with-a-custom-bot.md)
