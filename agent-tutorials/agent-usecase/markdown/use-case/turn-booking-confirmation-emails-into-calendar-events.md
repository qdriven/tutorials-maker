---
title: "Turn booking confirmation emails into calendar events"
slug: "turn-booking-confirmation-emails-into-calendar-events"
summary: "An n8n workflow extracts details from booking emails and PDF attachments and creates calendar events in a dedicated calendar, built for a CEO's flooded inbox."
category: "Work & Operations"
agents:
  - name: "n8n"
    slug: "n8n"
source_platform: "Reddit"
source_date: "May 13, 2026"
source_url: "https://www.reddit.com/r/n8n/comments/1tc4fpb/built_an_n8n_workflow_that_turns_any_booking"
fetched_from: "https://agentusecases.ai/use-case/turn-booking-confirmation-emails-into-calendar-events"
---

# Turn booking confirmation emails into calendar events

> An n8n workflow extracts details from booking emails and PDF attachments and creates calendar events in a dedicated calendar, built for a CEO's flooded inbox.

**Category:** Work & Operations  
**Agent:** n8n  
**Source:** Reddit · May 13, 2026

## What they did

The workflow watches Gmail for emails a person labels "Events," then extracts date, time, location, confirmation number, vendor, and notes from the email body plus any PDF attachments. In n8n, the email body is first wrapped into a PDF, both sources are parsed in parallel through one extractor pipeline, the results are merged with attachment data taking priority, and the workflow either creates an event in a separate Google Calendar with a link back to the email or flags the message for review and sends a missing-fields notification.

## How it went

It was built for a CEO whose inbox was full of travel and booking confirmations, so the result was automatic event creation in a dedicated "Auto-imported" calendar instead of manual entry. The author says it does not yet have a dedicated step for confirmations containing multiple events in one message.

## Worth knowing

The main catch is that a human still has to label the Gmail message "Events" to trigger the workflow.

## Prompt

```text
Build an n8n workflow that watches my Gmail inbox for booking confirmation emails (flights, hotels, restaurants, [other types]). Extract the event name, date, time, location, and confirmation number from the email body or PDF attachment, then create an event in a dedicated Google Calendar called [calendar name]. It is done when a test confirmation email I forward shows up correctly as a calendar event; skip anything it can't parse and notify me instead of guessing.
```

## Related use cases

- [Add todo items to Todoist from Telegram](./add-todo-items-to-todoist-from-telegram.md)
- [Answer WhatsApp customer questions and escalate to humans](./answer-whatsapp-customer-questions-and-escalate-to-humans.md)
- [Automate client onboarding and schedule PDFs](./automate-client-onboarding-and-schedule-pdfs.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Give a teacher a Claude Code workspace for lessons and reports](./give-a-teacher-a-claude-code-workspace-for-lessons-and-repor.md)
- [Give an agent a phone number to make and answer calls](./give-an-agent-a-phone-number-to-make-and-answer-calls.md)
