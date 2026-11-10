---
title: "Route customer reply emails to Freshdesk"
slug: "route-customer-reply-emails-to-freshdesk"
summary: "An n8n workflow catches customer replies to order confirmations and forwards support requests into Freshdesk."
category: "Sales, Marketing & Support"
agents:
  - name: "n8n"
    slug: "n8n"
source_platform: "Reddit"
source_date: "Undated"
source_url: "https://www.reddit.com/r/n8n/comments/1njjah9"
fetched_from: "https://agentusecases.ai/use-case/route-customer-reply-emails-to-freshdesk"
---

# Route customer reply emails to Freshdesk

> An n8n workflow catches customer replies to order confirmations and forwards support requests into Freshdesk.

**Category:** Sales, Marketing & Support  
**Agent:** n8n  
**Source:** Reddit · Undated

## What they did

They built an n8n workflow around a dedicated catch-all Gmail inbox for replies to order-confirmation emails. An AI classifier checked each incoming message to decide whether it was a real support request, and if so the workflow forwarded it into Freshdesk instead of sending every reply to support; the post does not describe any manual review step.

## How it went

It solved the problem of support replies landing in a generic info@ inbox without dumping unrelated mail into the support queue. The author says the first version took about 30 minutes to build, but gives no accuracy or volume numbers.

## Worth knowing

The main practical catch is that the source stays high level: it names Gmail, an AI classifier, and Freshdesk, but does not share the workflow, prompt, or classification criteria.

## Prompt

```text
Build an n8n workflow that watches [inbox] for customer replies to our order confirmation emails. Classify whether each reply is a support request, and if so create a Freshdesk ticket with the customer's email, order number, and message text. Ignore auto-replies and thank-yous, and finish by testing with two sample replies and showing me the resulting tickets.
```

## Related use cases

- [Add todo items to Todoist from Telegram](./add-todo-items-to-todoist-from-telegram.md)
- [Answer WhatsApp customer questions and escalate to humans](./answer-whatsapp-customer-questions-and-escalate-to-humans.md)
- [Turn booking confirmation emails into calendar events](./turn-booking-confirmation-emails-into-calendar-events.md)
- [Sell services through an agent that takes payment and delivers](./sell-services-through-an-agent-that-takes-payment-and-delive.md)
- [Run a Monday competitor-monitoring brief from job listings](./run-a-monday-competitor-monitoring-brief-from-job-listings.md)
- [Prep sales calls and research YouTube ideas with agents](./prep-sales-calls-and-research-youtube-ideas-with-agents.md)
