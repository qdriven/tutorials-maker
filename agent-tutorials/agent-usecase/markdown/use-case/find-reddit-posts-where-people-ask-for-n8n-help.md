---
title: "Find Reddit posts where people ask for n8n help"
slug: "find-reddit-posts-where-people-ask-for-n8n-help"
summary: "An n8n agent scrapes recent Reddit posts, stores them in a vector store, and retrieves n8n help requests for the author."
category: "Sales, Marketing & Support"
agents:
  - name: "n8n"
    slug: "n8n"
source_platform: "Reddit"
source_date: "Undated"
source_url: "https://www.reddit.com/r/n8n/comments/1ugatgt/made_myself_a_simple_ai_with_rag"
fetched_from: "https://agentusecases.ai/use-case/find-reddit-posts-where-people-ask-for-n8n-help"
---

# Find Reddit posts where people ask for n8n help

> An n8n agent scrapes recent Reddit posts, stores them in a vector store, and retrieves n8n help requests for the author.

**Category:** Sales, Marketing & Support  
**Agent:** n8n  
**Source:** Reddit · Undated

## What they did

The author built two n8n workflows. One runs on a schedule, uses an Apify actor to scrape recent posts from selected n8n subreddits, then creates embeddings and stores them in PostgreSQL with pgvector; the other listens in a Telegram chat, sends the message to an AI agent with access to that vector store, and returns semantically matched help posts. The agent uses Gemini Flash 3.1 Lite.

## How it went

The result was a personal search assistant for finding Reddit posts where people need n8n help, and the author says it helped them understand how RAG works by grounding responses in retrieved posts. The post does not give accuracy, volume, or performance numbers.

## Worth knowing

The main practical catch mentioned is model choice: they used Gemini Flash 3.1 Lite because its free tier has a high limit.

## Prompt

```text
Build an n8n workflow that pulls recent posts from [subreddits] every [day], stores them in a vector store, and then retrieves posts where someone is asking for help with [tool or topic, e.g. n8n]. It's done when I get a daily digest in [email/Slack/Google Sheet] listing each matching post with its title, link, and a one-line summary of what they need. Don't post any replies on Reddit.
```

## Related use cases

- [Add todo items to Todoist from Telegram](./add-todo-items-to-todoist-from-telegram.md)
- [Answer WhatsApp customer questions and escalate to humans](./answer-whatsapp-customer-questions-and-escalate-to-humans.md)
- [Turn booking confirmation emails into calendar events](./turn-booking-confirmation-emails-into-calendar-events.md)
- [Sell services through an agent that takes payment and delivers](./sell-services-through-an-agent-that-takes-payment-and-delive.md)
- [Run a Monday competitor-monitoring brief from job listings](./run-a-monday-competitor-monitoring-brief-from-job-listings.md)
- [Prep sales calls and research YouTube ideas with agents](./prep-sales-calls-and-research-youtube-ideas-with-agents.md)
