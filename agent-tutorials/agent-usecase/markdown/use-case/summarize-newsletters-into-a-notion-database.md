---
title: "Summarize newsletters into a Notion database"
slug: "summarize-newsletters-into-a-notion-database"
summary: "An n8n workflow retrieves newsletters, summarizes them with an LLM and stores them in Notion, splitting long summaries to fit block limits."
category: "Work & Operations"
agents:
  - name: "n8n"
    slug: "n8n"
source_platform: "medium.com"
source_date: "Undated"
source_url: "https://medium.com/@syrom_85473/a-practical-n8n-workflow-example-from-a-to-z-part-2-aggregating-newsletter-summaries-in-a-688f30f69352"
fetched_from: "https://agentusecases.ai/use-case/summarize-newsletters-into-a-notion-database"
---

# Summarize newsletters into a Notion database

> An n8n workflow retrieves newsletters, summarizes them with an LLM and stores them in Notion, splitting long summaries to fit block limits.

**Category:** Work & Operations  
**Agent:** n8n  
**Source:** medium.com · Undated

## What they did

The n8n workflow reads unread emails over IMAP, then filters by date and by a list of allowed senders. An OpenAI-backed summarization chain turns each remaining newsletter into bullet points that keep source URLs. Summaries over 1,950 characters are split by a code node. The first chunk creates the Notion page, and the later chunks are appended to that page by its URL.

## How it went

In the walkthrough, 15 unread emails were narrowed to 3 summaries, all written to Notion. The author's multi-email chunking fix worked. The IMAP filter rules were unreliable, and the author chose the wrong summarization method at first.

## Worth knowing

Only OpenAI ran reliably. Claude hit token limits mid-run after tokens were already spent, and local Llama2 errored. The author planned to switch from map-reduce to the simpler stuff method.

## Prompt

```text
Build an n8n workflow that pulls newsletters from my [email label or folder], summarizes each one with an AI model into a title, sender, 5 key bullets and a link, and saves them to my Notion database [database name]. If a summary is longer than Notion's block limit, split it across several blocks. You're done when a test run saves my last [number] newsletters correctly; show me the workflow before activating it.
```

## Related use cases

- [Add todo items to Todoist from Telegram](./add-todo-items-to-todoist-from-telegram.md)
- [Answer WhatsApp customer questions and escalate to humans](./answer-whatsapp-customer-questions-and-escalate-to-humans.md)
- [Automate client onboarding and schedule PDFs](./automate-client-onboarding-and-schedule-pdfs.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Give a teacher a Claude Code workspace for lessons and reports](./give-a-teacher-a-claude-code-workspace-for-lessons-and-repor.md)
- [Give an agent a phone number to make and answer calls](./give-an-agent-a-phone-number-to-make-and-answer-calls.md)
