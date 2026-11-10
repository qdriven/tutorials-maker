---
title: "Turn any URL into a structured Notion note"
slug: "turn-any-url-into-a-structured-notion-note"
summary: "An n8n workflow fetches a submitted URL, strips it to readable content, has OpenAI summarise it into structured fields, and saves a Notion note."
category: "Research & Knowledge"
agents:
  - name: "n8n"
    slug: "n8n"
source_platform: "community.n8n.io"
source_date: "Undated"
source_url: "https://community.n8n.io/t/turns-any-article-into-a-structured-notion-note/297566"
fetched_from: "https://agentusecases.ai/use-case/turn-any-url-into-a-structured-notion-note"
---

# Turn any URL into a structured Notion note

> An n8n workflow fetches a submitted URL, strips it to readable content, has OpenAI summarise it into structured fields, and saves a Notion note.

**Category:** Research & Knowledge  
**Agent:** n8n  
**Source:** community.n8n.io · Undated

## What they did

A webhook receives a URL, an HTTP Request node fetches the page, and a Code node removes scripts, styles and tags, then truncates the text to 8,000 characters. OpenAI, in JSON output mode, returns title, summary, key insights and tags. The Notion node maps these to six properties with no parsing step.

## How it went

Stripping the HTML first cut the payload from about 60K tokens to under 4K. Summaries improved and cost dropped significantly. JavaScript-heavy single-page apps return empty shell HTML, and some sites block requests.

## Worth knowing

Share the Notion database with your n8n integration first, or the write fails silently. Adding a Mozilla/5.0 User-Agent header clears most 403 errors.

## Prompt

```text
Build an n8n workflow that starts from a webhook or form where I submit a [URL]. It should fetch the page, strip it down to readable text, ask an AI model to produce a title, a 3-sentence summary, key points and 3 tags, then create a new note in my Notion database [database name] with those fields. You're done when a test URL I submit produces a correctly filled Notion note; show me the draft workflow before you activate it.
```

## Related use cases

- [Add todo items to Todoist from Telegram](./add-todo-items-to-todoist-from-telegram.md)
- [Answer WhatsApp customer questions and escalate to humans](./answer-whatsapp-customer-questions-and-escalate-to-humans.md)
- [Automate client onboarding and schedule PDFs](./automate-client-onboarding-and-schedule-pdfs.md)
- [Find connections across 100 non-fiction books](./find-connections-across-100-non-fiction-books.md)
- [Use Cursor for academic paper writing with citations](./use-cursor-for-academic-paper-writing-with-citations.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
