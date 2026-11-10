---
title: "Book site visits and follow up with real-estate leads"
slug: "book-site-visits-and-follow-up-with-real-estate-leads"
summary: "The poster built an n8n-based sales assistant that books site visits, sends emails, follows up with leads and updates the CRM."
category: "Sales, Marketing & Support"
agents:
  - name: "n8n"
    slug: "n8n"
source_platform: "Reddit"
source_date: "Jul 1, 2026"
source_url: "https://www.reddit.com/r/aiagents/comments/1uhus5x/i_built_an_ai_real_estate_sales_assistant_that"
fetched_from: "https://agentusecases.ai/use-case/book-site-visits-and-follow-up-with-real-estate-leads"
---

# Book site visits and follow up with real-estate leads

> The poster built an n8n-based sales assistant that books site visits, sends emails, follows up with leads and updates the CRM.

**Category:** Sales, Marketing & Support  
**Agent:** n8n  
**Source:** Reddit · Jul 1, 2026

## What they did

The poster built the assistant in n8n with OpenAI, Airtable, WhatsApp, Gmail, and Google Calendar. New leads are stored in Airtable, the agent tracks fields like welcome sent, visit status, and follow-up date, answers property questions, recommends listings, pulls property images from Airtable, books site visits with calendar conflict checks, sends HTML confirmation emails, and updates the CRM; a separate daily workflow sends WhatsApp follow-ups only to declined leads due that day.

## How it went

They say it now handles a significant part of the real-estate sales pipeline and avoids duplicate welcomes and follow-ups. The main issues were WhatsApp webhook loops from status events and getting the agent to reliably use Gmail, Calendar, Airtable, and the property-search tool with structured outputs.

## Worth knowing

The biggest catch was debugging reliability: filtering WhatsApp status webhooks and making tool outputs match the parser took substantial work before the flow became dependable.

## Prompt

```text
Build an n8n workflow for my [real estate business] that triggers when a new lead arrives from [form/source], emails them to offer site visit times from [calendar], and books the visit once they reply. If they don't reply in [X days], send a follow-up, and update the lead's status in [CRM] at every step. Show me a sample of each email template for approval before any message goes to a real lead, and stop once a test lead runs through end to end.
```

## Related use cases

- [Add todo items to Todoist from Telegram](./add-todo-items-to-todoist-from-telegram.md)
- [Answer WhatsApp customer questions and escalate to humans](./answer-whatsapp-customer-questions-and-escalate-to-humans.md)
- [Turn booking confirmation emails into calendar events](./turn-booking-confirmation-emails-into-calendar-events.md)
- [Sell services through an agent that takes payment and delivers](./sell-services-through-an-agent-that-takes-payment-and-delive.md)
- [Run a Monday competitor-monitoring brief from job listings](./run-a-monday-competitor-monitoring-brief-from-job-listings.md)
- [Prep sales calls and research YouTube ideas with agents](./prep-sales-calls-and-research-youtube-ideas-with-agents.md)
