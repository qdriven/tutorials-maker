---
title: "Draft overdue invoice follow-ups from payment status"
slug: "draft-overdue-invoice-follow-ups-from-payment-status"
summary: "A workflow checks invoice payment status in a spreadsheet on a schedule and an AI agent drafts follow-up emails based on days overdue."
category: "Work & Operations"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_platform: "Reddit"
source_date: "Apr 2, 2026"
source_url: "https://www.reddit.com/r/AiForSmallBusiness/comments/1s8k6ld/how_to_automate_client_invoicing_and_payment"
fetched_from: "https://agentusecases.ai/use-case/draft-overdue-invoice-follow-ups-from-payment-status"
---

# Draft overdue invoice follow-ups from payment status

> A workflow checks invoice payment status in a spreadsheet on a schedule and an AI agent drafts follow-up emails based on days overdue.

**Category:** Work & Operations  
**Agent:** custom-built or unnamed agent  
**Source:** Reddit · Apr 2, 2026

## What they did

In the thread, the concrete example is a commenter’s n8n setup: connect n8n to a spreadsheet, have it check payment status on a schedule, and use an AI agent to draft reminder emails based on how many days overdue an invoice is. The commenter says the workflow can map different tones to day 7, day 14, and day 30, and optionally add a human approval step before anything sends.

## How it went

The stated payoff was cutting attention per reminder from about 20 minutes to under 3 minutes while stopping reminders once payment is recorded. It’s only described at a high level in the comment, with no build details or measured collection-rate improvement.

## Worth knowing

The main catch is that the thread’s example is only a brief Reddit comment, so you’d still need to write the reminder templates and set the overdue rules yourself.

## Prompt

```text
Build a workflow that runs every [day or week], reads my invoice sheet at [spreadsheet link], and finds rows where the status is unpaid and the due date has passed. For each, have an AI step draft a follow-up email to [client email column], with tone based on days overdue: [friendly under X days, firmer after]. Save the drafts in [Gmail drafts or a review sheet] and do not send anything automatically; I will review and send them myself.
```

## Related use cases

- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Check hotel reservations and guest check-ins on Booking.com](./check-hotel-reservations-and-guest-check-ins-on-booking-com.md)
- [Run LLM assistants over company data with RAG in n8n](./run-llm-assistants-over-company-data-with-rag-in-n8n.md)
- [Organize deal flow with specialist bots for invoices and inbox](./organize-deal-flow-with-specialist-bots-for-invoices-and-inb.md)
- [Move OpenClaw skills to Grok Bot](./move-openclaw-skills-to-grok-bot.md)
- [Turn a large quarterly PDF into short documents and requisitions](./turn-a-large-quarterly-pdf-into-short-documents-and-requisit.md)
