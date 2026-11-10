---
title: "Find prospects and summarize business opportunities for sales"
slug: "find-prospects-and-summarize-business-opportunities-for-sale"
summary: "Multi-agent n8n workflow finds company URLs, scrapes prospect websites and summarizes opportunities that sales teams can use to tailor outreach."
category: "Sales, Marketing & Support"
agents:
  - name: "n8n"
    slug: "n8n"
source_platform: "dev.to"
source_date: "Undated"
source_url: "https://dev.to/inforeole/the-unstoppable-lead-generation-engine-a-multi-agent-ai-workflow-with-n8n-bright-data-4k3j"
fetched_from: "https://agentusecases.ai/use-case/find-prospects-and-summarize-business-opportunities-for-sale"
---

# Find prospects and summarize business opportunities for sales

> Multi-agent n8n workflow finds company URLs, scrapes prospect websites and summarizes opportunities that sales teams can use to tailor outreach.

**Category:** Sales, Marketing & Support  
**Agent:** n8n  
**Source:** dev.to · Undated

## What they did

A chat trigger starts an n8n workflow. A first agent on o4-mini picks relevant company URLs. Bright Data's Web Unblocker node fetches each page's HTML, and a Code node cleans it. Other agents on gpt-5 summarize page by page, a Merge node combines the summaries, and a final prompt synthesizes the opportunities.

## How it went

It produces a list of business opportunities per prospect site for tailoring outreach. The source gives no numbers or accuracy results. A single all-in-one prompt gave irrelevant, poorly synthesized output.

## Worth knowing

Split the work into separate prompts (URL extraction, per-page summary, final synthesis) and use a cheaper model for URL filtering. A single prompt performed poorly.

## Prompt

```text
Build an n8n workflow that takes a list of [industry or search terms] and finds company website URLs, scrapes each homepage and about page, and has an AI step summarize what the company does and 2-3 opportunities where [my product or service] could help. Save each result as a row in a Google Sheet with the company, URL, summary and a suggested outreach angle. Stop after one test run of [5] companies and show me the sheet; do not send any outreach.
```

## Related use cases

- [Add todo items to Todoist from Telegram](./add-todo-items-to-todoist-from-telegram.md)
- [Run 24/7 WhatsApp support and track application status](./run-24-7-whatsapp-support-and-track-application-status.md)
- [Automate client onboarding and schedule PDFs](./automate-client-onboarding-and-schedule-pdfs.md)
- [Sell services through an agent that takes payment and delivers](./sell-services-through-an-agent-that-takes-payment-and-delive.md)
- [Run a Monday competitor-monitoring brief from job listings](./run-a-monday-competitor-monitoring-brief-from-job-listings.md)
- [Prep sales calls and research YouTube ideas with agents](./prep-sales-calls-and-research-youtube-ideas-with-agents.md)
