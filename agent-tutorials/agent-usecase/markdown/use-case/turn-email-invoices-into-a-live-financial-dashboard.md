---
title: "Turn email invoices into a live financial dashboard"
slug: "turn-email-invoices-into-a-live-financial-dashboard"
summary: "An n8n workflow scans emailed invoices, extracts supplier, amount, date and description, and feeds a real-time Google Sheets dashboard."
category: "Work & Operations"
agents:
  - name: "n8n"
    slug: "n8n"
source_platform: "Reddit"
source_date: "Undated"
source_url: "https://www.reddit.com/r/n8n/comments/1o27rk5/i_built_an_ai_accountant_in_n8n_that_turns_email"
fetched_from: "https://agentusecases.ai/use-case/turn-email-invoices-into-a-live-financial-dashboard"
---

# Turn email invoices into a live financial dashboard

> An n8n workflow scans emailed invoices, extracts supplier, amount, date and description, and feeds a real-time Google Sheets dashboard.

**Category:** Work & Operations  
**Agent:** n8n  
**Source:** Reddit · Undated

## What they did

The workflow watches Gmail for incoming invoice emails, then uses AI to classify each one as an expense or income and extract fields including supplier, amount, date, description, and category. It writes the structured data into Google Sheets, where the sheet itself powers a live dashboard showing totals, net profit, and category breakdowns; the Reddit post does not describe a manual review step.

## How it went

The stated result is a real-time finance dashboard tracking total income, total expenses, net profit, and spending by category. The post shares no hard metrics, error rates, or before-and-after time savings.

## Worth knowing

The source is high level only: it explains the flow and dashboard outputs, but gives no template, run cost, or setup time in the post text shown.

## Prompt

```text
Build a workflow that watches [Gmail label or inbox] for emails with invoice attachments, extracts supplier, amount, date, and description from each, and appends a row to the Google Sheet [sheet name]. Add a second tab with totals by supplier and month for a live dashboard. Finished means a test invoice shows up correctly in the sheet; flag any invoice it cannot read instead of guessing.
```

## Related use cases

- [Add todo items to Todoist from Telegram](./add-todo-items-to-todoist-from-telegram.md)
- [Answer WhatsApp customer questions and escalate to humans](./answer-whatsapp-customer-questions-and-escalate-to-humans.md)
- [Automate client onboarding and schedule PDFs](./automate-client-onboarding-and-schedule-pdfs.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Give a teacher a Claude Code workspace for lessons and reports](./give-a-teacher-a-claude-code-workspace-for-lessons-and-repor.md)
- [Give an agent a phone number to make and answer calls](./give-an-agent-a-phone-number-to-make-and-answer-calls.md)
