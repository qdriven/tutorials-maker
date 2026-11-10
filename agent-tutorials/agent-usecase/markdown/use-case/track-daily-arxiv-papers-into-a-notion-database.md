---
title: "Track daily arXiv papers into a Notion database"
slug: "track-daily-arxiv-papers-into-a-notion-database"
summary: "An n8n workflow fetches arXiv papers daily for a keyword, summarizes them with Gemini 2.5 Flash, writes them to Notion and sends Feishu and Gmail notifications."
category: "Research & Knowledge"
agents:
  - name: "n8n"
    slug: "n8n"
  - name: "Gemini"
    slug: "gemini"
source_platform: "n8n.io"
source_date: "Undated"
source_url: "https://n8n.io/workflows/8847-daily-rag-research-paper-hub-with-arxiv-gemini-ai-and-notion/"
fetched_from: "https://agentusecases.ai/use-case/track-daily-arxiv-papers-into-a-notion-database"
---

# Track daily arXiv papers into a Notion database

> An n8n workflow fetches arXiv papers daily for a keyword, summarizes them with Gemini 2.5 Flash, writes them to Notion and sends Feishu and Gmail notifications.

**Category:** Research & Knowledge  
**Agent:** n8n, Gemini  
**Source:** n8n.io · Undated

## What they did

A daily 6:00 AM n8n schedule queries the arXiv API for the previous day's submissions on one keyword. It cleans the Atom response into JSON with authors and categories as arrays. Gemini 2.5 Flash then analyzes each paper and writes a daily summary with translation. Pages are created in two Notion tables, and Feishu and Gmail messages go out. GPT was used to design the HTML email template.

## How it went

The source gives no results or measurements. It expects fewer than 20 papers a day and doesn't report how well the summaries turned out.

## Worth knowing

Notion's create-page node only adds entries and never updates them. Multi-select fields need real arrays, and null values cause a 400 error.

## Prompt

```text
Build an n8n workflow that runs every day at [time], fetches new arXiv papers matching the keyword [keyword], summarizes each in 2-3 sentences with an AI model, and adds them to my Notion database [database name] with title, authors, link and summary. Then send me one email digest listing the new papers. You're done when a test run adds the latest papers without duplicates; pause and show me the email before the first send.
```

## Related use cases

- [Orchestrate a multi-phase RAG migration](./orchestrate-a-multi-phase-rag-migration.md)
- [Call and text appointment reminders every morning](./call-and-text-appointment-reminders-every-morning.md)
- [Configure macOS and dev tooling from the terminal](./configure-macos-and-dev-tooling-from-the-terminal.md)
- [Find connections across 100 non-fiction books](./find-connections-across-100-non-fiction-books.md)
- [Use Cursor for academic paper writing with citations](./use-cursor-for-academic-paper-writing-with-citations.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
