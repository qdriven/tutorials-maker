---
title: "Auto-resolve support tickets and escalate the rest"
slug: "auto-resolve-support-tickets-and-escalate-the-rest"
summary: "An n8n agent looks up the knowledge base and order history, replies by email or escalates to Slack with a draft; billing and security go to humans."
category: "Sales, Marketing & Support"
agents:
  - name: "n8n"
    slug: "n8n"
source_platform: "community.n8n.io"
source_date: "Undated"
source_url: "https://community.n8n.io/t/ai-customer-support-agent-auto-resolves-tickets-escalates-to-humans/285840"
fetched_from: "https://agentusecases.ai/use-case/auto-resolve-support-tickets-and-escalate-the-rest"
---

# Auto-resolve support tickets and escalate the rest

> An n8n agent looks up the knowledge base and order history, replies by email or escalates to Slack with a draft; billing and security go to humans.

**Category:** Sales, Marketing & Support  
**Agent:** n8n  
**Source:** community.n8n.io · Undated

## What they did

Tickets arrive by webhook from a form, chat widget or API call. n8n runs a knowledge base search and an order history lookup in parallel. GPT-4o-mini then classifies the category, sets priority, reads sentiment and drafts a reply. Resolvable tickets get an HTML email, a Google Sheets log entry and a Slack post. Others go to a category-specific Slack channel with the draft, a confidence score and notes.

## How it went

The author reports it runs cheaply. Billing and refund tickets always escalate, and account security goes to an urgent channel. The post gives no resolution rates or accuracy figures.

## Worth knowing

Cost is about $0.90 a month at 50 tickets a day with GPT-4o-mini. You need OpenAI, SMTP, Google Sheets and Slack credentials, and optionally knowledge base and order APIs.

## Prompt

```text
Create an n8n agent that reads incoming support tickets from [email or helpdesk], searches [knowledge base link] and looks up the customer's order in [order system or sheet]. If it's confident, have it draft the answer and show it to me before sending, while billing, refund and security issues go straight to [Slack channel] with a suggested draft. Finish by running three sample tickets and showing me how each was routed.
```

## Related use cases

- [Add todo items to Todoist from Telegram](./add-todo-items-to-todoist-from-telegram.md)
- [Run 24/7 WhatsApp support and track application status](./run-24-7-whatsapp-support-and-track-application-status.md)
- [Automate client onboarding and schedule PDFs](./automate-client-onboarding-and-schedule-pdfs.md)
- [Sell services through an agent that takes payment and delivers](./sell-services-through-an-agent-that-takes-payment-and-delive.md)
- [Run a Monday competitor-monitoring brief from job listings](./run-a-monday-competitor-monitoring-brief-from-job-listings.md)
- [Prep sales calls and research YouTube ideas with agents](./prep-sales-calls-and-research-youtube-ideas-with-agents.md)
