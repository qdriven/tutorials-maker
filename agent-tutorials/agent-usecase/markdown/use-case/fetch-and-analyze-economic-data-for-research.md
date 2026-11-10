---
title: "Fetch and analyze economic data for research"
slug: "fetch-and-analyze-economic-data-for-research"
summary: "An economist used Claude Code to find Census homeownership data, clean it and chart it, and to scrape SEC 10-K risk factors into a DuckDB database showing tariff-risk changes. · Oct 26, 2026"
category: "Research & Knowledge"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "economics.princeton.edu"
source_date: "Oct 26, 2026 · Submitted by from search gap: 学术"
source_url: "https://economics.princeton.edu/?p=52387"
fetched_from: "https://agentusecases.ai/use-case/fetch-and-analyze-economic-data-for-research"
---

# Fetch and analyze economic data for research

> An economist used Claude Code to find Census homeownership data, clean it and chart it, and to scrape SEC 10-K risk factors into a DuckDB database showing tariff-risk changes. · Oct 26, 2026

**Category:** Research & Knowledge  
**Agent:** Claude Code  
**Source:** economics.princeton.edu · Oct 26, 2026 · Submitted by from search gap: 学术

## What they did

In a webinar series, Paul Goldsmith-Pinkham ran Claude Code, a terminal-based assistant, on two tasks. For homeownership, it found the Census data, dealt with scraping problems, cleaned the spreadsheets and wrote the scripts to plot it. For the second, it scraped SEC EDGAR 10-K filings, extracted risk factors and built a DuckDB database. He planned and iterated on the results.

## How it went

The tariff-risk database showed tariff-related disclosure becoming more frequent and more specific in recent years. The source says messy filings became usable research data in just a few minutes.

## Worth knowing

The source stresses planning first and iterating on results with Claude Code. Detailed step-by-step notes are in his Substack posts for episodes 2 and 3.

## Prompt

```text
I'm researching [economic question, e.g. how homeownership rates changed by age group]. Find the right public data from [source, e.g. Census Bureau or SEC filings], download it, clean it, and store it in a DuckDB database in this folder. Then produce a chart and a short written summary of what the data shows, with the source links and any gaps or caveats noted. Stop when the chart, database and summary are saved.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Link journal entries and write book reviews in Obsidian](./link-journal-entries-and-write-book-reviews-in-obsidian.md)
- [Produce a finished music release from one chat](./produce-a-finished-music-release-from-one-chat.md)
- [Run persistent financial research with an agent](./run-persistent-financial-research-with-an-agent.md)
- [Catalog and summarize papers dropped into Drive](./catalog-and-summarize-papers-dropped-into-drive.md)
- [Research Reddit customer pain points with a skill](./research-reddit-customer-pain-points-with-a-skill.md)
