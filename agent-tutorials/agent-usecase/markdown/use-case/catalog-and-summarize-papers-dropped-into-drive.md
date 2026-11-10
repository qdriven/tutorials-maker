---
title: "Catalog and summarize papers dropped into Drive"
slug: "catalog-and-summarize-papers-dropped-into-drive"
summary: "An n8n workflow extracts metadata from new PDFs, finds related papers on Semantic Scholar and PubMed, builds an APA citation, logs to Sheets and creates a Notion summary."
category: "Research & Knowledge"
agents:
  - name: "n8n"
    slug: "n8n"
source_platform: "community.n8n.io"
source_date: "Undated"
source_url: "https://community.n8n.io/t/i-built-a-literature-review-assistant-in-n8n-drops-a-paper-in-drive-auto-extracts-metadata-finds-related-papers-on-semantic-scholar-pubmed-and-creates-a-notion-summary/274197"
fetched_from: "https://agentusecases.ai/use-case/catalog-and-summarize-papers-dropped-into-drive"
---

# Catalog and summarize papers dropped into Drive

> An n8n workflow extracts metadata from new PDFs, finds related papers on Semantic Scholar and PubMed, builds an APA citation, logs to Sheets and creates a Notion summary.

**Category:** Research & Knowledge  
**Agent:** n8n  
**Source:** community.n8n.io · Undated

## What they did

A Google Drive trigger fires when a PDF lands in a folder, and the workflow downloads it. The PDF Vector community node extracts metadata, abstract, study type and findings. It then searches Semantic Scholar and PubMed using the top 3 keywords, builds an APA citation, appends a row to Google Sheets, and creates a Notion page.

## How it went

Each paper takes about 20-30 seconds. The author reports about 98% metadata accuracy on digital PDFs, about 90% on study type, and about 85% on scanned papers. Niche topics may return only 3-5 related papers.

## Worth knowing

It needs self-hosted n8n. PDF Vector costs about 4-5 credits per paper, so the free 100 credits cover roughly 20-25 papers a month. Check the APA citations before using them.

## Prompt

```text
Build an n8n workflow that triggers when a new PDF lands in my [Google Drive folder], extracts the title, authors, year and abstract, finds 3-5 related papers on Semantic Scholar and PubMed, and builds an APA citation. Log everything in a Google Sheet and create a Notion page with a plain-language summary and the related papers. Done when one test PDF produces a sheet row and a Notion page, which you show me.
```

## Related use cases

- [Add todo items to Todoist from Telegram](./add-todo-items-to-todoist-from-telegram.md)
- [Answer WhatsApp customer questions and escalate to humans](./answer-whatsapp-customer-questions-and-escalate-to-humans.md)
- [Automate client onboarding and schedule PDFs](./automate-client-onboarding-and-schedule-pdfs.md)
- [Find connections across 100 non-fiction books](./find-connections-across-100-non-fiction-books.md)
- [Use Cursor for academic paper writing with citations](./use-cursor-for-academic-paper-writing-with-citations.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
