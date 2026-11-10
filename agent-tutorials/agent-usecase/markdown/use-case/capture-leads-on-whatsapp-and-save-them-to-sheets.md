---
title: "Capture leads on WhatsApp and save them to Sheets"
slug: "capture-leads-on-whatsapp-and-save-them-to-sheets"
summary: "An n8n WhatsApp agent asks leads for their name and email and automatically saves them to Google Sheets, shown in a demo."
category: "Sales, Marketing & Support"
agents:
  - name: "n8n"
    slug: "n8n"
source_platform: "X"
source_date: "Oct 13, 2026"
source_url: "https://x.com/Anshuman_7_7_7_/status/2109942223420973344"
fetched_from: "https://agentusecases.ai/use-case/capture-leads-on-whatsapp-and-save-them-to-sheets"
---

# Capture leads on WhatsApp and save them to Sheets

> An n8n WhatsApp agent asks leads for their name and email and automatically saves them to Google Sheets, shown in a demo.

**Category:** Sales, Marketing & Support  
**Agent:** n8n  
**Source:** X · Oct 13, 2026

## What they did

The n8n workflow starts with a WhatsApp trigger that feeds incoming messages to an AI agent. The agent asks the lead for name and email during the chat, then writes the data directly to Google Sheets. The build connects the three components with no further user input after the trigger.

## How it went

The demo shows the lead captured and saved automatically to Sheets. No metrics or shortfalls are stated.

## Worth knowing

Source highlights showing every step including what breaks.

## Prompt

```text
Build me an n8n workflow that starts when someone messages my WhatsApp Business number via the WhatsApp Cloud API. Use an AI agent node to greet the lead for [my business name], ask for their name and email one step at a time, and check the email looks valid. When both are collected, append a row to my Google Sheet [sheet name] with name, email, phone number and timestamp, then send a short thank-you reply. Test it with a sample message and show me the sheet row before you activate the workflow.
```

## Related use cases

- [Add todo items to Todoist from Telegram](./add-todo-items-to-todoist-from-telegram.md)
- [Answer WhatsApp customer questions and escalate to humans](./answer-whatsapp-customer-questions-and-escalate-to-humans.md)
- [Turn booking confirmation emails into calendar events](./turn-booking-confirmation-emails-into-calendar-events.md)
- [Sell services through an agent that takes payment and delivers](./sell-services-through-an-agent-that-takes-payment-and-delive.md)
- [Run a Monday competitor-monitoring brief from job listings](./run-a-monday-competitor-monitoring-brief-from-job-listings.md)
- [Prep sales calls and research YouTube ideas with agents](./prep-sales-calls-and-research-youtube-ideas-with-agents.md)
