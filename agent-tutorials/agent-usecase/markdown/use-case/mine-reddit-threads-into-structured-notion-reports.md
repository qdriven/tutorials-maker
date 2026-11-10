---
title: "Mine Reddit threads into structured Notion reports"
slug: "mine-reddit-threads-into-structured-notion-reports"
summary: "An n8n workflow scrapes Reddit posts and comments via Bright Data, extracts concerns and themes with Gemini, and writes reports to Notion."
category: "Research & Knowledge"
agents:
  - name: "n8n"
    slug: "n8n"
  - name: "Gemini"
    slug: "gemini"
source_platform: "dev.to"
source_date: "Undated"
source_url: "https://dev.to/kichuman28/unstoppable-reddit-research-agent-real-time-insights-with-n8n-bright-data-34g0"
fetched_from: "https://agentusecases.ai/use-case/mine-reddit-threads-into-structured-notion-reports"
---

# Mine Reddit threads into structured Notion reports

> An n8n workflow scrapes Reddit posts and comments via Bright Data, extracts concerns and themes with Gemini, and writes reports to Notion.

**Category:** Research & Knowledge  
**Agent:** n8n, Gemini  
**Source:** dev.to · Undated

## What they did

A schedule trigger runs the n8n workflow on a chosen subreddit. It reads the subreddit's RSS feed for recent post URLs and batches them to Bright Data, polling every 30 seconds until the snapshot is ready. It downloads titles, comments and upvotes, and a Gemini agent turns them into marketing insights. Those are converted to Notion blocks on a new page.

## How it went

The author demos it on the SkincareAddiction subreddit and says it runs end to end without manual steps. No volume or accuracy numbers are given. Multi-subreddit support and Notion databases remain future work.

## Worth knowing

The hardest part was converting the agent's Markdown output into valid Notion blocks, which meant learning the Notion API's blocks and page IDs. The workflow is shared as a GitHub Gist.

## Prompt

```text
Build me an n8n workflow that takes a Reddit thread or search URL from [trigger, e.g. form or chat message], scrapes the posts and comments with [scraping service], and uses Gemini to extract the main concerns, recurring themes, and notable quotes. Write one structured report per run into my Notion database [database name] with fields for [fields, e.g. topic, themes, concerns, source URL]. Test it on [example Reddit URL] and show me the resulting Notion page before activating it.
```

## Related use cases

- [Orchestrate a multi-phase RAG migration](./orchestrate-a-multi-phase-rag-migration.md)
- [Call and text appointment reminders every morning](./call-and-text-appointment-reminders-every-morning.md)
- [Critique blog post drafts for technical errors](./critique-blog-post-drafts-for-technical-errors.md)
- [Find connections across 100 non-fiction books](./find-connections-across-100-non-fiction-books.md)
- [Use Cursor for academic paper writing with citations](./use-cursor-for-academic-paper-writing-with-citations.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
