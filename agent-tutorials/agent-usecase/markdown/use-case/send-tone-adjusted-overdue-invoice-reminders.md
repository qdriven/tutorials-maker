---
title: "Send tone-adjusted overdue invoice reminders"
slug: "send-tone-adjusted-overdue-invoice-reminders"
summary: "An n8n agent checks customer payment statuses, finds overdue invoices, picks a polite or firmer tone by days overdue, and emails reminders, skipping already-reminded customers."
category: "Work & Operations"
agents:
  - name: "n8n"
    slug: "n8n"
source_platform: "dev.to"
source_date: "Undated"
source_url: "https://dev.to/canankorkut/build-your-first-ai-agent-with-n8n-32pf"
fetched_from: "https://agentusecases.ai/use-case/send-tone-adjusted-overdue-invoice-reminders"
---

# Send tone-adjusted overdue invoice reminders

> An n8n agent checks customer payment statuses, finds overdue invoices, picks a polite or firmer tone by days overdue, and emails reminders, skipping already-reminded customers.

**Category:** Work & Operations  
**Agent:** n8n  
**Source:** dev.to · Undated

## What they did

The author ran n8n locally in Docker and built a chat-triggered AI agent using Gemini (gemini-2.0-flash-lite) with simple memory. It had two tools: a Data Table read (getInvoices) and a Gmail SMTP email sender. The prompt tells it to filter for past-due, positive-balance, Pending rows, skip Reminded ones, and soften or firm up the tone by days overdue.

## How it went

The source describes the finished workflow, which runs from one chat command and returns a JSON summary of emails sent. It reports no test results, numbers, or example outputs.

## Worth knowing

Gmail sending needs an app password, and the agent filters the rows itself from a full-table fetch. The source doesn't mention updating Status to Reminded after sending.

## Prompt

```text
Build an n8n workflow that runs every [day or week], reads invoices from [accounting tool or spreadsheet], and finds ones overdue. For each, write a reminder email that's polite if under [number] days overdue and firmer after that, and skip customers already reminded in the last [number] days. Log each reminder in [sheet or database]. Before any email is sent, show me the list of recipients and the draft text for approval.
```

## Related use cases

- [Add todo items to Todoist from Telegram](./add-todo-items-to-todoist-from-telegram.md)
- [Run 24/7 WhatsApp support and track application status](./run-24-7-whatsapp-support-and-track-application-status.md)
- [Automate client onboarding and schedule PDFs](./automate-client-onboarding-and-schedule-pdfs.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Give a teacher a Claude Code workspace for lessons and reports](./give-a-teacher-a-claude-code-workspace-for-lessons-and-repor.md)
- [Give an agent a phone number to make and answer calls](./give-an-agent-a-phone-number-to-make-and-answer-calls.md)
