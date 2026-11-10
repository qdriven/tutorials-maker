---
title: "Find Reddit leads for a website and email them"
slug: "find-reddit-leads-for-a-website-and-email-them"
summary: "An n8n workflow takes a website URL, works out industry and keywords, monitors Reddit for relevant posts and emails potential leads to the user."
category: "Sales, Marketing & Support"
agents:
  - name: "n8n"
    slug: "n8n"
source_platform: "n8n.io"
source_date: "Undated"
source_url: "https://n8n.io/workflows/3935-ai-marketing-agent-for-lead-generation-reddit-openrouter-gmail/"
fetched_from: "https://agentusecases.ai/use-case/find-reddit-leads-for-a-website-and-email-them"
---

# Find Reddit leads for a website and email them

> An n8n workflow takes a website URL, works out industry and keywords, monitors Reddit for relevant posts and emails potential leads to the user.

**Category:** Sales, Marketing & Support  
**Agent:** n8n  
**Source:** n8n.io · Undated

## What they did

A user submits their website URL and email through a form. The workflow analyzes the site to find the industry and keywords, then searches Reddit and filters posts by upvotes over 15, non-empty text and age under 90 days. An AI agent (GPT-4.1-mini via OpenRouter) judges each post's relevance and summarizes it.

## How it went

Relevant posts are saved to Google Sheets and sent to the user as an HTML email of potential leads. The page gives no results or lead-quality numbers.

## Worth knowing

You need OAuth credentials for Reddit (a Reddit app), Google Sheets and Gmail, plus an OpenRouter API key. The template is listed at $20.

## Prompt

```text
Build an n8n workflow where I give it my website URL [URL]. It should work out my industry and a list of keywords, then check Reddit every [few hours] for new posts where someone is asking for help that my business could solve. Email me a digest with the post link, a one-line reason it is a good lead, and a suggested reply, and pause for my approval before it posts or messages anyone on Reddit.
```

## Related use cases

- [Add todo items to Todoist from Telegram](./add-todo-items-to-todoist-from-telegram.md)
- [Run 24/7 WhatsApp support and track application status](./run-24-7-whatsapp-support-and-track-application-status.md)
- [Automate client onboarding and schedule PDFs](./automate-client-onboarding-and-schedule-pdfs.md)
- [Sell services through an agent that takes payment and delivers](./sell-services-through-an-agent-that-takes-payment-and-delive.md)
- [Run a Monday competitor-monitoring brief from job listings](./run-a-monday-competitor-monitoring-brief-from-job-listings.md)
- [Prep sales calls and research YouTube ideas with agents](./prep-sales-calls-and-research-youtube-ideas-with-agents.md)
