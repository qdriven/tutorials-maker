---
title: "Validate invoices against inventory and create purchase orders"
slug: "validate-invoices-against-inventory-and-create-purchase-orde"
summary: "An n8n workflow built for a client matches invoice data to a Google Sheets inventory, creates ERP purchase orders and notifies purchasing; about 90% of invoices are handled automatically."
category: "Work & Operations"
agents:
  - name: "n8n"
    slug: "n8n"
source_platform: "dev.to"
source_date: "Undated"
source_url: "https://dev.to/nova_gg/n8n-review-2026-i-used-it-for-8-months-to-build-ai-agents-honest-verdict-kif"
fetched_from: "https://agentusecases.ai/use-case/validate-invoices-against-inventory-and-create-purchase-orde"
---

# Validate invoices against inventory and create purchase orders

> An n8n workflow built for a client matches invoice data to a Google Sheets inventory, creates ERP purchase orders and notifies purchasing; about 90% of invoices are handled automatically.

**Category:** Work & Operations  
**Agent:** n8n  
**Source:** dev.to · Undated

## What they did

A 23-node n8n workflow watches the client's Gmail for invoice emails, pulls out the PDF attachments and sends them to OpenAI's vision model to extract vendor, amount, items and dates. It checks the data against a Google Sheets inventory. If items match and amounts look reasonable, it creates an ERP purchase order, posts to Slack and replies to the sender.

## How it went

The client went from manually handling 40-50 invoices a week to about 90% processed automatically, saving roughly 8-10 hours weekly. The author built it in 3 days, mostly handling edge cases, then trained the operations manager in about 2 hours.

## Worth knowing

n8n counts every node run as an execution, so each invoice uses about 23. At 200 invoices a month, the author says the Pro plan is the minimum.

## Prompt

```text
Build me an n8n workflow that triggers when a new invoice arrives at [email inbox or folder], extracts the vendor, line items and quantities, and checks them against my inventory in [Google Sheets link]. If items are low or match a reorder rule, create a purchase order in [ERP or tool] and notify [purchasing contact] on [Slack or email]. Send anything it can't match to a review list instead of acting on it, and pause to show me the purchase order it is about to create before you enable the live version.
```

## Related use cases

- [Add todo items to Todoist from Telegram](./add-todo-items-to-todoist-from-telegram.md)
- [Run 24/7 WhatsApp support and track application status](./run-24-7-whatsapp-support-and-track-application-status.md)
- [Automate client onboarding and schedule PDFs](./automate-client-onboarding-and-schedule-pdfs.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Give a teacher a Claude Code workspace for lessons and reports](./give-a-teacher-a-claude-code-workspace-for-lessons-and-repor.md)
- [Give an agent a phone number to make and answer calls](./give-an-agent-a-phone-number-to-make-and-answer-calls.md)
