---
title: "Process supplier invoices from Gmail through approval and payment"
slug: "process-supplier-invoices-from-gmail-through-approval-and-pa"
summary: "An n8n pipeline extracts invoice data, checks duplicates and suppliers, routes high-value invoices for approval, then creates accounting entries and schedules payment."
category: "Work & Operations"
agents:
  - name: "n8n"
    slug: "n8n"
source_platform: "medium.com"
source_date: "Undated"
source_url: "https://medium.com/@beulahdaizy/i-built-an-ai-powered-invoice-automation-pipeline-in-n8n-heres-how-part-1-the-stack-602d839eaf41"
fetched_from: "https://agentusecases.ai/use-case/process-supplier-invoices-from-gmail-through-approval-and-pa"
---

# Process supplier invoices from Gmail through approval and payment

> An n8n pipeline extracts invoice data, checks duplicates and suppliers, routes high-value invoices for approval, then creates accounting entries and schedules payment.

**Category:** Work & Operations  
**Agent:** n8n  
**Source:** medium.com · Undated

## What they did

This is Part 1 of a 3-part series, and it covers the infrastructure only. The author runs n8n in queue mode with PostgreSQL and Redis in Docker, plus a worker. Tables for suppliers, invoices and an audit log are set up, along with Gmail, OpenAI, Postgres and Slack credentials. The planned flow is Gmail, OCR, AI extraction, duplicate and supplier checks, classification, approval, journal entry, payment.

## How it went

No results or numbers yet. The article ends with a running stack and schema ready. The extraction, validation, approval and accounting steps are left to Parts 2 and 3.

## Worth knowing

Queue mode can retry stalled jobs, so each step must be idempotent. That is why duplicate detection matters, and why the n8n encryption key needs a backup.

## Prompt

```text
Build an n8n workflow that watches Gmail label [invoices] for supplier invoices, extracts supplier, amount, due date and invoice number, and checks for duplicates and known suppliers in [my supplier sheet]. Invoices over [amount] should go to [approver] for approval. It's finished when a test invoice reaches the approval step; pause before creating any accounting entry or scheduling any payment and show me the details.
```

## Related use cases

- [Add todo items to Todoist from Telegram](./add-todo-items-to-todoist-from-telegram.md)
- [Run 24/7 WhatsApp support and track application status](./run-24-7-whatsapp-support-and-track-application-status.md)
- [Automate client onboarding and schedule PDFs](./automate-client-onboarding-and-schedule-pdfs.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Give a teacher a Claude Code workspace for lessons and reports](./give-a-teacher-a-claude-code-workspace-for-lessons-and-repor.md)
- [Give an agent a phone number to make and answer calls](./give-an-agent-a-phone-number-to-make-and-answer-calls.md)
