---
title: "Automate new-hire onboarding and appointment watching"
slug: "automate-new-hire-onboarding-and-appointment-watching"
summary: "Commenters described n8n workflows that take HR input through approval, IT ticket and Azure account creation, and one that checks for medical appointment openings and notifies with booking buttons."
category: "Work & Operations"
agents:
  - name: "n8n"
    slug: "n8n"
source_platform: "Reddit"
source_date: "Jun 1, 2025"
source_url: "https://www.reddit.com/r/n8n/comments/1r0309s/what_was_the_first_workflow_that_made_you_go_okay"
fetched_from: "https://agentusecases.ai/use-case/automate-new-hire-onboarding-and-appointment-watching"
---

# Automate new-hire onboarding and appointment watching

> Commenters described n8n workflows that take HR input through approval, IT ticket and Azure account creation, and one that checks for medical appointment openings and notifies with booking buttons.

**Category:** Work & Operations  
**Agent:** n8n  
**Source:** Reddit · Jun 1, 2025

## What they did

One commenter built an n8n onboarding flow where HR started the process in chat, an AI turned that into structured data, the line manager got an approval email, and on approval the workflow opened an IT helpdesk ticket, created the Azure account, and sent the new hire an onboarding message to a personal email. Another set up two n8n workflows for medical bookings: one checked the appointment system every 15 minutes and pushed an ntfy alert when a slot appeared, and a second webhook-driven flow booked it and returned the generated PDF; the notification included buttons for hospital directions and an HTTP GET to book.

## How it went

The appointment watcher reportedly saved at least €400. The onboarding commenter said the AI version was worse than a normal form because it took longer and was less accurate without form validation.

## Worth knowing

The clearest catch was that the onboarding builder concluded not to use AI there: a regular validated form worked better and faster.

## Prompt

```text
Build an n8n workflow for new-hire onboarding: take HR's form input with [fields], send it to [manager] for approval, then open an IT ticket in [system] and create the account in [Azure/other directory] once approved. Pause for human approval before any account is created. Finish by testing with a fake employee and showing me each step's result.
```

## Related use cases

- [Add todo items to Todoist from Telegram](./add-todo-items-to-todoist-from-telegram.md)
- [Answer WhatsApp customer questions and escalate to humans](./answer-whatsapp-customer-questions-and-escalate-to-humans.md)
- [Turn booking confirmation emails into calendar events](./turn-booking-confirmation-emails-into-calendar-events.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Give a teacher a Claude Code workspace for lessons and reports](./give-a-teacher-a-claude-code-workspace-for-lessons-and-repor.md)
- [Give an agent a phone number to make and answer calls](./give-an-agent-a-phone-number-to-make-and-answer-calls.md)
