---
title: "Generate deep research reports into Notion"
slug: "generate-deep-research-reports-into-notion"
summary: "An n8n workflow turns a topic into up to three Tavily searches, compiles a Markdown report with an agent, and pushes it to a Notion page."
category: "Research & Knowledge"
agents:
  - name: "n8n"
    slug: "n8n"
source_platform: "n8n.io"
source_date: "Undated"
source_url: "https://n8n.io/workflows/7160-deep-research-agent-automated-research-and-notion-report-builder/"
fetched_from: "https://agentusecases.ai/use-case/generate-deep-research-reports-into-notion"
---

# Generate deep research reports into Notion

> An n8n workflow turns a topic into up to three Tavily searches, compiles a Markdown report with an agent, and pushes it to a Notion page.

**Category:** Research & Knowledge  
**Agent:** n8n  
**Source:** n8n.io · Undated

## What they did

A webhook passes the user's topic to a Strategy Agent, which asks 2–3 clarifying questions and then creates a Notion database page. The workflow generates up to three search queries. For each one, Tavily finds the top link and extracts its content. A Final Report Agent writes a Markdown report from the combined content. Gemini converts it to HTML in chunks, and the chunks are pushed into the Notion page.

## How it went

The workflow returns the Notion report link to the user with no manual steps after the clarifying questions. The source gives no quality, speed or cost figures. Each query uses only its single top-ranked source.

## Worth knowing

You need keys for Tavily, Notion, an OpenRouter or OpenAI model, and Google Gemini, plus a Notion database ID connected in n8n.

## Prompt

```text
Build an n8n workflow that takes a research topic [topic] and runs up to three web searches with Tavily. An AI agent should then compile the findings into a Markdown report with headings, key findings and source links, and save it as a new page in my Notion [parent page or database]. You're done when one test topic produces a finished Notion page; confirm the Notion destination with me before it writes anything.
```

## Related use cases

- [Add todo items to Todoist from Telegram](./add-todo-items-to-todoist-from-telegram.md)
- [Answer WhatsApp customer questions and escalate to humans](./answer-whatsapp-customer-questions-and-escalate-to-humans.md)
- [Automate client onboarding and schedule PDFs](./automate-client-onboarding-and-schedule-pdfs.md)
- [Find connections across 100 non-fiction books](./find-connections-across-100-non-fiction-books.md)
- [Use Cursor for academic paper writing with citations](./use-cursor-for-academic-paper-writing-with-citations.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
