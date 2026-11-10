---
title: "Auto-post curated AI news to X every two hours"
slug: "auto-post-curated-ai-news-to-x-every-two-hours"
summary: "An n8n workflow pulls AI/tech news from RSS feeds and posts it to the author's X account every two hours, saving manual work."
category: "Sales, Marketing & Support"
agents:
  - name: "n8n"
    slug: "n8n"
source_platform: "Reddit"
source_date: "Jan 1, 2025"
source_url: "https://www.reddit.com/r/n8n/comments/1prxv82/built_an_ai_agent_that_autoposts_to_xtwitter"
fetched_from: "https://agentusecases.ai/use-case/auto-post-curated-ai-news-to-x-every-two-hours"
---

# Auto-post curated AI news to X every two hours

> An n8n workflow pulls AI/tech news from RSS feeds and posts it to the author's X account every two hours, saving manual work.

**Category:** Sales, Marketing & Support  
**Agent:** n8n  
**Source:** Reddit · Jan 1, 2025

## What they did

The author built an n8n workflow that pulls AI and tech stories from several RSS feeds, sends them to OpenAI to turn them into tweet-ready posts, scores those drafts for engagement, stores them in Google Sheets, and auto-posts the top ones to X every two hours. They said it had been running for 2–3 days, with the free X API tier shaping the cadence, and later they manually fixed a length bug by adding a check to keep posts at 270 characters or less.

## How it went

Early results were modest: after two days they reported about 7–8 likes, with low engagement that they partly blamed on starting from a dead account. It also stalled for 2–3 days when overlength posts triggered X posting errors.

## Worth knowing

The key constraint was X’s free API limit of 17 posts per day, so they chose a 2-hour schedule, roughly 12 posts daily, to stay under it.

## Prompt

```text
Build a workflow that runs every [2 hours], reads these RSS feeds: [feed URLs], and picks the newest items about [topic, e.g. AI and tech] that haven't been posted before. For each one, write a short post under 280 characters with the link, and keep a record of posted links to avoid duplicates. Set it up so I can review the first few drafts in a test run, and don't connect the live posting step to my [X account] until I've approved how the posts look.
```

## Related use cases

- [Add todo items to Todoist from Telegram](./add-todo-items-to-todoist-from-telegram.md)
- [Answer WhatsApp customer questions and escalate to humans](./answer-whatsapp-customer-questions-and-escalate-to-humans.md)
- [Turn booking confirmation emails into calendar events](./turn-booking-confirmation-emails-into-calendar-events.md)
- [Sell services through an agent that takes payment and delivers](./sell-services-through-an-agent-that-takes-payment-and-delive.md)
- [Run a Monday competitor-monitoring brief from job listings](./run-a-monday-competitor-monitoring-brief-from-job-listings.md)
- [Prep sales calls and research YouTube ideas with agents](./prep-sales-calls-and-research-youtube-ideas-with-agents.md)
