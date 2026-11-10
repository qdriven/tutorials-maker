---
title: "Automate invoices, payments, and refunds"
slug: "automate-invoices-payments-and-refunds"
summary: "An n8n workflow manages invoices, payments, and refunds, updating records with status, PDF links, and timestamps."
category: "Work & Operations"
agents:
  - name: "n8n"
    slug: "n8n"
source_platform: "Reddit"
source_date: "Sep 1, 2026"
source_url: "https://www.reddit.com/r/n8n/comments/1wakr0s/n8n_workflow_that_handles_invoices_payments_and"
fetched_from: "https://agentusecases.ai/use-case/automate-invoices-payments-and-refunds"
---

# Automate invoices, payments, and refunds

> An n8n workflow manages invoices, payments, and refunds, updating records with status, PDF links, and timestamps.

**Category:** Work & Operations  
**Agent:** n8n  
**Source:** Reddit · Sep 1, 2026

## What they did

The setup was a single n8n workflow triggered by a webhook, with API-key validation up front and separate routes for invoice, payment, and refund events. It used Google Sheets for records, PDFbro to create invoice PDFs, Google Drive to store them, and Resend to send emails; before each path ran, it checked for duplicates, then updated statuses, links, balances, and timestamps after processing.

## How it went

The result was an end-to-end flow that kept invoice, payment, and refund handling in one orchestration layer while preventing duplicate records and duplicate notifications. The post frames it as a practical, reliability-focused example, but gives no performance metrics or business impact numbers.

## Worth knowing

The main catch is that the design emphasizes state management and duplicate checking, not just connecting apps, so copying it means modeling each event path and its status updates carefully.

## Prompt

```text
Build an n8n workflow that handles invoices, payments, and refunds for [business] using [Stripe/other payment tool]. When an invoice is created, paid, or refunded, update my [Airtable/Google Sheet] row with the status, a link to the invoice PDF, and a timestamp. Require my manual approval before any refund is actually issued, and test it using sandbox mode with one example of each event.
```

## Related use cases

- [Add todo items to Todoist from Telegram](./add-todo-items-to-todoist-from-telegram.md)
- [Answer WhatsApp customer questions and escalate to humans](./answer-whatsapp-customer-questions-and-escalate-to-humans.md)
- [Turn booking confirmation emails into calendar events](./turn-booking-confirmation-emails-into-calendar-events.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Give a teacher a Claude Code workspace for lessons and reports](./give-a-teacher-a-claude-code-workspace-for-lessons-and-repor.md)
- [Give an agent a phone number to make and answer calls](./give-an-agent-a-phone-number-to-make-and-answer-calls.md)
