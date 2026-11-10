---
title: "Manage customer enquiries from Telegram"
slug: "manage-customer-enquiries-from-telegram"
summary: "An n8n system captures email and form enquiries, creates tasks, and lets the owner reply via Telegram while the AI sends emails and updates status."
category: "Sales, Marketing & Support"
agents:
  - name: "n8n"
    slug: "n8n"
source_platform: "X"
source_date: "Jun 30, 2026"
source_url: "https://x.com/Toma_web3/status/2071843246427492806"
fetched_from: "https://agentusecases.ai/use-case/manage-customer-enquiries-from-telegram"
---

# Manage customer enquiries from Telegram

> An n8n system captures email and form enquiries, creates tasks, and lets the owner reply via Telegram while the AI sends emails and updates status.

**Category:** Sales, Marketing & Support  
**Agent:** n8n  
**Source:** X · Jun 30, 2026

## What they did

n8n workflow captures enquiries from email or forms, assigns a unique ID, auto-creates a ClickUp task, and pushes an instant Telegram notification. Owner replies naturally in Telegram; OpenAI then reads the reply and chooses to send a Gmail response, update status in Google Sheets, or close the thread. Built with n8n, OpenAI, Telegram, ClickUp, Gmail and Google Sheets.

## How it went

Enquiries stay in one place with no lost context or tool switching, letting the owner reply faster while staying in full control instead of full automation.

## Prompt

```text
Build an n8n workflow that captures customer enquiries from [email inbox and web form] and creates a task for each in [task tool]. Send me a Telegram message for each new one, and when I reply with instructions, have the AI draft an email and update the task status. Draft emails should be shown to me in Telegram for approval before anything is sent to a customer.
```

## Related use cases

- [Add todo items to Todoist from Telegram](./add-todo-items-to-todoist-from-telegram.md)
- [Answer WhatsApp customer questions and escalate to humans](./answer-whatsapp-customer-questions-and-escalate-to-humans.md)
- [Automate client onboarding and schedule PDFs](./automate-client-onboarding-and-schedule-pdfs.md)
- [Sell services through an agent that takes payment and delivers](./sell-services-through-an-agent-that-takes-payment-and-delive.md)
- [Run a Monday competitor-monitoring brief from job listings](./run-a-monday-competitor-monitoring-brief-from-job-listings.md)
- [Prep sales calls and research YouTube ideas with agents](./prep-sales-calls-and-research-youtube-ideas-with-agents.md)
