---
title: "Review support tickets and synthesize product feedback"
slug: "review-support-tickets-and-synthesize-product-feedback"
summary: "Grok Bot reviews human and bot-handled tickets, coaches, flags long back-and-forths, posts daily Slack reports and synthesizes feedback."
category: "Sales, Marketing & Support"
agents:
  - name: "Grok Bot"
    slug: "grok-bot"
source_platform: "x.ai"
source_date: "Undated"
source_url: "https://x.ai/news/grok-bot-customer-support"
fetched_from: "https://agentusecases.ai/use-case/review-support-tickets-and-synthesize-product-feedback"
---

# Review support tickets and synthesize product feedback

> Grok Bot reviews human and bot-handled tickets, coaches, flags long back-and-forths, posts daily Slack reports and synthesizes feedback.

**Category:** Sales, Marketing & Support  
**Agent:** Grok Bot  
**Source:** x.ai · Undated

## What they did

Grok Bot was connected to the team's ticketing system (Plain), Linear and Datadog. It reviews tickets handled by people and by Bots, gives coaching feedback, and flags any ticket that goes back and forth more than three times for management review. It posts daily reports to Slack and groups customer feedback into themes for engineering.

## How it went

The team says Grok Bot synthesizes more than 20,000 points of product feedback from tickets each day. Overall, tickets rose 175% with no new hires. The source gives no accuracy figures for the review or coaching.

## Worth knowing

The team rolled out in stages: internal notes only, human approval for every write action, then traces and evaluations on every run before it answered customers directly.

## Prompt

```text
Every day, review yesterday's support tickets from [helpdesk], both human-handled and bot-handled. Flag long back-and-forth threads, note coaching points for each handler, and post a short report to [Slack channel]. Once a week, add a synthesis of recurring product feedback, and don't reply to any customer yourself.
```

## Related use cases

- [Plan and book a short-notice work trip](./plan-and-book-a-short-notice-work-trip.md)
- [Monitor PC memory and ask before closing apps](./monitor-pc-memory-and-ask-before-closing-apps.md)
- [Watch weekly deals and buy regular items](./watch-weekly-deals-and-buy-regular-items.md)
- [Sell services through an agent that takes payment and delivers](./sell-services-through-an-agent-that-takes-payment-and-delive.md)
- [Run brand marketing end to end and publish to social](./run-brand-marketing-end-to-end-and-publish-to-social.md)
- [Run business WhatsApp customer messages with an agent](./run-business-whatsapp-customer-messages-with-an-agent.md)
