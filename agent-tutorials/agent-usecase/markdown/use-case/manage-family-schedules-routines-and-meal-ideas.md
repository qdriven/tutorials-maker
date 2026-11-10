---
title: "Manage family schedules, routines and meal ideas"
slug: "manage-family-schedules-routines-and-meal-ideas"
summary: "An n8n workflow sends family activity reminders, routine checklists and a weekly plan prompt over email and Telegram, and generates meal ideas."
category: "Life Admin & Home"
agents:
  - name: "n8n"
    slug: "n8n"
source_platform: "n8n.io"
source_date: "Undated"
source_url: "https://n8n.io/workflows/4855-family-assistant-schedule-meal-and-routine-management-with-email-and-telegram/"
fetched_from: "https://agentusecases.ai/use-case/manage-family-schedules-routines-and-meal-ideas"
---

# Manage family schedules, routines and meal ideas

> An n8n workflow sends family activity reminders, routine checklists and a weekly plan prompt over email and Telegram, and generates meal ideas.

**Category:** Life Admin & Home  
**Agent:** n8n  
**Source:** n8n.io · Undated

## What they did

The template bundles several independent n8n automations. Each runs on a Cron trigger, builds its content from lists you write into Set or Function nodes, and sends an email. The daily activity reminder filters your schedule to today's events and emails only if there are any. Meal ideas are picked from an array you edit. You import the JSON, add email credentials, replace the placeholder addresses and text, and set the timings.

## How it went

The source gives no measured results. It describes the reminders, routine checklists, a Sunday planning prompt and meal ideas. Telegram appears only as a suggested extension, and the meal ideas come from your own list rather than being generated.

## Worth knowing

Most automations are inactive until you switch them on, and the template costs $30. Calendar sync and Telegram are suggested extensions you would have to add yourself.

## Prompt

```text
Build an n8n workflow for my family that sends activity reminders from [calendar or sheet] and morning and evening routine checklists to [email or Telegram group]. Each [day of week] it should also ask for the weekly plan and suggest [number] meal ideas based on [dietary preferences or ingredients]. Finish by running one reminder and one meal suggestion as a test, and show me before it messages anyone other than me.
```

## Related use cases

- [Add todo items to Todoist from Telegram](./add-todo-items-to-todoist-from-telegram.md)
- [Run 24/7 WhatsApp support and track application status](./run-24-7-whatsapp-support-and-track-application-status.md)
- [Automate client onboarding and schedule PDFs](./automate-client-onboarding-and-schedule-pdfs.md)
- [Get a second opinion on an MRI](./get-a-second-opinion-on-an-mri.md)
- [Automate simple Discord tasks and tutoring with Hermes](./automate-simple-discord-tasks-and-tutoring-with-hermes.md)
- [Control your Mac by voice with a Claude-backed assistant](./control-your-mac-by-voice-with-a-claude-backed-assistant.md)
