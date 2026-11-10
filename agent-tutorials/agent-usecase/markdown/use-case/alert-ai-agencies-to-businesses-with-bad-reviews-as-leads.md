---
title: "Alert AI agencies to businesses with bad reviews as leads"
slug: "alert-ai-agencies-to-businesses-with-bad-reviews-as-leads"
summary: "n8n agents notify automation agencies when a business receives bad reviews so they can call first and offer a damage-control tool."
category: "Sales, Marketing & Support"
agents:
  - name: "n8n"
    slug: "n8n"
source_platform: "dev.to"
source_date: "Undated"
source_url: "https://dev.to/myopicoracle/communitypulse-4230"
fetched_from: "https://agentusecases.ai/use-case/alert-ai-agencies-to-businesses-with-bad-reviews-as-leads"
---

# Alert AI agencies to businesses with bad reviews as leads

> n8n agents notify automation agencies when a business receives bad reviews so they can call first and offer a damage-control tool.

**Category:** Sales, Marketing & Support  
**Agent:** n8n  
**Source:** dev.to · Undated

## What they did

An n8n AI Agent node sits behind a hosted chat interface. The user names a country. The agent calls Bright Data tools to snapshot Google Maps review data, then retrieves it. It filters for well-rated businesses with reviews of 3 stars or lower and no owner reply, then summarizes the top 5 and sends results by email or Slack on request.

## How it went

It works as a demo submitted to a challenge, and the author has no plans to commercialize it. The sales-script generation tool is currently disabled. The source states no lead or conversion numbers.

## Worth knowing

Bright Data snapshots avoided looping Google Places and Reviews calls per place_id, which the author says gets you blocked quickly; read each node's docs before building.

## Prompt

```text
Build an n8n workflow that checks Google reviews for [type of local business, e.g. dentists in my city] every day and flags any business that just got a review of [1 or 2 stars]. For each one, have an AI step summarize the complaint and draft a short call script offering [my damage-control tool or service], then email me the business name, phone number, review text and script. Test it on a few businesses and show me the results; do not contact any business yourself.
```

## Related use cases

- [Add todo items to Todoist from Telegram](./add-todo-items-to-todoist-from-telegram.md)
- [Run 24/7 WhatsApp support and track application status](./run-24-7-whatsapp-support-and-track-application-status.md)
- [Automate client onboarding and schedule PDFs](./automate-client-onboarding-and-schedule-pdfs.md)
- [Sell services through an agent that takes payment and delivers](./sell-services-through-an-agent-that-takes-payment-and-delive.md)
- [Run a Monday competitor-monitoring brief from job listings](./run-a-monday-competitor-monitoring-brief-from-job-listings.md)
- [Prep sales calls and research YouTube ideas with agents](./prep-sales-calls-and-research-youtube-ideas-with-agents.md)
