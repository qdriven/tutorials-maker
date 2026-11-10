---
title: "Triage car repair requests and reply to customers"
slug: "triage-car-repair-requests-and-reply-to-customers"
summary: "An n8n workflow has AI classify web-form jobs by type, urgency and summary, create an Airtable record, reply instantly and flag uncertain cases."
category: "Work & Operations"
agents:
  - name: "n8n"
    slug: "n8n"
source_platform: "X"
source_date: "Oct 12, 2026"
source_url: "https://x.com/ho_lar_s/status/2109790708970438953"
fetched_from: "https://agentusecases.ai/use-case/triage-car-repair-requests-and-reply-to-customers"
---

# Triage car repair requests and reply to customers

> An n8n workflow has AI classify web-form jobs by type, urgency and summary, create an Airtable record, reply instantly and flag uncertain cases.

**Category:** Work & Operations  
**Agent:** n8n  
**Source:** X · Oct 12, 2026

## What they did

An n8n workflow receives car repair requests from a web form. The AI classifies each by job type, urgency, and summary, then creates an Airtable record and sends an instant customer reply. Uncertain cases are flagged for human review; out-of-scope ones receive an automatic polite decline.

## How it went

The Airtable base displays job status and timestamps for processed requests.

## Prompt

```text
Build an n8n workflow that triggers when someone submits my [repair request web form]. Have AI classify each request by job type, urgency and a one-line summary, create a record in [Airtable base], and send the customer an instant acknowledgement. If the AI is unsure, flag the job for me instead of replying. Hold outgoing replies for my approval until I've checked a few test runs.
```

## Related use cases

- [Add todo items to Todoist from Telegram](./add-todo-items-to-todoist-from-telegram.md)
- [Answer WhatsApp customer questions and escalate to humans](./answer-whatsapp-customer-questions-and-escalate-to-humans.md)
- [Turn booking confirmation emails into calendar events](./turn-booking-confirmation-emails-into-calendar-events.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Give a teacher a Claude Code workspace for lessons and reports](./give-a-teacher-a-claude-code-workspace-for-lessons-and-repor.md)
- [Give an agent a phone number to make and answer calls](./give-an-agent-a-phone-number-to-make-and-answer-calls.md)
