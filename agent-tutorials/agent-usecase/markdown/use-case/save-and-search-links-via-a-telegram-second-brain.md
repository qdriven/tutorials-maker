---
title: "Save and search links via a Telegram second brain"
slug: "save-and-search-links-via-a-telegram-second-brain"
summary: "An n8n Telegram agent reads links sent to it, summarises and categorises them into Google Sheets, and answers questions from the library using Supabase semantic search."
category: "Research & Knowledge"
agents:
  - name: "n8n"
    slug: "n8n"
source_platform: "community.n8n.io"
source_date: "Undated"
source_url: "https://community.n8n.io/t/second-brain-on-telegram-save-and-search-your-links-google-sheets-supabase-rag/304330"
fetched_from: "https://agentusecases.ai/use-case/save-and-search-links-via-a-telegram-second-brain"
---

# Save and search links via a Telegram second brain

> An n8n Telegram agent reads links sent to it, summarises and categorises them into Google Sheets, and answers questions from the library using Supabase semantic search.

**Category:** Research & Knowledge  
**Agent:** n8n  
**Source:** community.n8n.io · Undated

## What they did

A Telegram AI agent sorts each message: a URL is saved, a question is searched, anything else gets a short how-to reply. Saving goes through a webhook that normalises the URL, reads the page with Jina Reader, and has an AI librarian write a summary and reuse existing categories. It then upserts into Google Sheets by URL and re-embeds the full text into Supabase. Two search tools cover the Sheet and the page text.

## How it went

The author describes the workflow as working: re-sent links update the existing card instead of duplicating, and unreadable pages are not filed. The post gives no usage numbers or benchmarks.

## Worth knowing

Setup needs a Telegram bot token, Supabase (the free tier is fine), Gemini embeddings, a shared Header Auth credential, and your own webhook URL in the save_link tool.

## Prompt

```text
Build an n8n workflow with a Telegram bot that I can send links to. For each link it should fetch the page, write a short summary, assign a category from [my list of categories], and add a row to my Google Sheet [sheet name]. It should also answer questions like 'what did I save about [topic]?' by searching the saved summaries. You're done when I can send one test link and then ask a question that returns it; show me the plan before activating the bot.
```

## Related use cases

- [Add todo items to Todoist from Telegram](./add-todo-items-to-todoist-from-telegram.md)
- [Answer WhatsApp customer questions and escalate to humans](./answer-whatsapp-customer-questions-and-escalate-to-humans.md)
- [Automate client onboarding and schedule PDFs](./automate-client-onboarding-and-schedule-pdfs.md)
- [Find connections across 100 non-fiction books](./find-connections-across-100-non-fiction-books.md)
- [Use Cursor for academic paper writing with citations](./use-cursor-for-academic-paper-writing-with-citations.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
