---
title: "Automate client onboarding and schedule PDFs"
slug: "automate-client-onboarding-and-schedule-pdfs"
summary: "An n8n workflow triggered from a Google Sheet generates a PDF training schedule, emails it to the client with reminders, and cleans up the temp file."
category: "Work & Operations"
agents:
  - name: "n8n"
    slug: "n8n"
source_platform: "Reddit"
source_date: "Nov 1, 2025"
source_url: "https://www.reddit.com/r/n8n/comments/1rruer8/built_an_n8n_automation_that_handles_client"
fetched_from: "https://agentusecases.ai/use-case/automate-client-onboarding-and-schedule-pdfs"
---

# Automate client onboarding and schedule PDFs

> An n8n workflow triggered from a Google Sheet generates a PDF training schedule, emails it to the client with reminders, and cleans up the temp file.

**Category:** Work & Operations  
**Agent:** n8n  
**Source:** Reddit · Nov 1, 2025

## What they did

They built two n8n workflows around a Google Sheet. One triggers when a new booking is marked for onboarding, pulls that client’s upcoming sessions, creates a temporary Google Doc, turns it into a personalized PDF, emails the welcome pack with the trainer CC’d, then updates the sheet so it cannot resend; a second 8am workflow checks for sessions 30 or 7 days out and repeats the PDF-and-email process for reminders.

## How it went

The result was that every client automatically got a welcome pack plus 30-day and 7-day reminders with no manual sending. The post says it works well, but gives no hard metrics and the author still thinks parts could be structured more cleanly.

## Worth knowing

The main catch is the temporary-file PDF pipeline: it creates a Google Doc, converts it, attaches it, and deletes it afterward so Drive does not fill up.

## Prompt

```text
Build an n8n workflow that triggers when a new row is added to my Google Sheet [sheet name] with client name, email, and [program details]. Generate a PDF training schedule from a template, email it to the client with a short welcome message, schedule reminder emails on [days], and delete the temporary PDF afterward. Test it with a dummy row sent to my own email before enabling it for real clients.
```

## Related use cases

- [Add todo items to Todoist from Telegram](./add-todo-items-to-todoist-from-telegram.md)
- [Answer WhatsApp customer questions and escalate to humans](./answer-whatsapp-customer-questions-and-escalate-to-humans.md)
- [Turn booking confirmation emails into calendar events](./turn-booking-confirmation-emails-into-calendar-events.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Give a teacher a Claude Code workspace for lessons and reports](./give-a-teacher-a-claude-code-workspace-for-lessons-and-repor.md)
- [Give an agent a phone number to make and answer calls](./give-an-agent-a-phone-number-to-make-and-answer-calls.md)
