---
title: "Query 600 GB of Hacker News, arXiv, and LessWrong in plain English"
slug: "query-600-gb-of-hacker-news-arxiv-and-lesswrong-in-plain-eng"
summary: "Claude Code writes the SQL and vector queries against a public read-only index, and can set email alerts for nuanced criteria. · Dec 31, 2025"
category: "Research & Knowledge"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_url: "https://exopriors.com/scry"
fetched_from: "https://agentusecases.ai/use-case/query-600-gb-of-hacker-news-arxiv-and-lesswrong-in-plain-eng"
---

# Query 600 GB of Hacker News, arXiv, and LessWrong in plain English

> Claude Code writes the SQL and vector queries against a public read-only index, and can set email alerts for nuanced criteria. · Dec 31, 2025

**Category:** Research & Knowledge  
**Agent:** Claude Code

## What they did

Scry is an MCP server at mcp.scry.io that you add to Claude, ChatGPT, or Claude Code. The agent reads the live schema, picks the relations that could hold the answer, and writes one bounded query. That query can be a phrase match, a time window, a join, or vector math. It runs on Scry's side, not on your machine.

## How it went

The page says a scan of all indexed Hacker News text (15.5 billion characters) takes 0.86 seconds. It lists about 105 billion queryable rows. It says nothing about email alerts, and it doesn't report results from real use.

## Worth knowing

Free for non-commercial use when there is capacity. Most questions cost a fraction of a cent to a few cents, and data freshness varies by source.

## Prompt

```text
I want to explore [public dataset or index, e.g. Hacker News, arXiv posts] using plain-English questions. Connect to [read-only index or database URL], write the SQL or vector queries needed, and answer this: [your question, e.g. what are people saying about X over the last year]. Show me the queries you ran along with a short summary of results. If I ask for email alerts, show me the alert setup and wait for my approval before turning anything on.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Search years of research files in an Obsidian vault](./search-years-of-research-files-in-an-obsidian-vault.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Run persistent financial research with an agent](./run-persistent-financial-research-with-an-agent.md)
- [Catalog and summarize papers dropped into Drive](./catalog-and-summarize-papers-dropped-into-drive.md)
- [Research Reddit customer pain points with a skill](./research-reddit-customer-pain-points-with-a-skill.md)
