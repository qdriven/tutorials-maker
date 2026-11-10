---
title: "Call and text appointment reminders every morning"
slug: "call-and-text-appointment-reminders-every-morning"
summary: "An n8n workflow pulls the day's Google Calendar appointments, places automated voice calls via Retell AI, then sends follow-up SMS through Twilio."
category: "Work & Operations"
agents:
  - name: "n8n"
    slug: "n8n"
source_platform: "dev.to"
source_date: "Undated"
source_url: "https://dev.to/sabbschow/automated-appointment-reminder-with-voice-call-and-sms-using-n8n-10bi"
fetched_from: "https://agentusecases.ai/use-case/call-and-text-appointment-reminders-every-morning"
---

# Call and text appointment reminders every morning

> An n8n workflow pulls the day's Google Calendar appointments, places automated voice calls via Retell AI, then sends follow-up SMS through Twilio.

**Category:** Work & Operations  
**Agent:** n8n  
**Source:** dev.to · Undated

## What they did

The author built an n8n workflow that runs on a schedule each morning. It reads that day's appointments from Google Calendar and has Retell AI place an automated voice call to each customer as a reminder. After a short delay it sends a personalized follow-up text through Twilio. The post describes no manual steps once the workflow is running.

## How it went

The post claims the workflow saves time and keeps reminders consistent without human involvement. It gives no numbers, no results from real use, and no account of failures.

## Worth knowing

The post is a brief overview with a screenshot. It gives no setup details, such as the call script, the delay length, or how phone numbers are pulled from calendar events.

## Prompt

```text
Build an n8n workflow that runs every morning at [time], pulls today's appointments from my Google Calendar [calendar name], calls each client with a Retell AI voice agent to confirm, and then texts a follow-up through Twilio. Use this script: [reminder wording]. Before the first live run, pause and show me the full list of people it will call and text, and test it only on my own number first.
```

## Related use cases

- [Add todo items to Todoist from Telegram](./add-todo-items-to-todoist-from-telegram.md)
- [Run 24/7 WhatsApp support and track application status](./run-24-7-whatsapp-support-and-track-application-status.md)
- [Automate client onboarding and schedule PDFs](./automate-client-onboarding-and-schedule-pdfs.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Give a teacher a Claude Code workspace for lessons and reports](./give-a-teacher-a-claude-code-workspace-for-lessons-and-repor.md)
- [Give an agent a phone number to make and answer calls](./give-an-agent-a-phone-number-to-make-and-answer-calls.md)
