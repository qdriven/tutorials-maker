---
title: "Run email, calendar and tasks from a Telegram voice assistant"
slug: "run-email-calendar-and-tasks-from-a-telegram-voice-assistant"
summary: "An assistant named Jackie takes voice or text via Telegram to summarize unread emails, check calendar events and manage Google Tasks."
category: "Life Admin & Home"
agents:
  - name: "n8n"
    slug: "n8n"
source_platform: "n8n.io"
source_date: "Undated"
source_url: "https://n8n.io/workflows/8237-personal-life-manager-with-telegram-google-services-and-voice-enabled-ai/"
fetched_from: "https://agentusecases.ai/use-case/run-email-calendar-and-tasks-from-a-telegram-voice-assistant"
---

# Run email, calendar and tasks from a Telegram voice assistant

> An assistant named Jackie takes voice or text via Telegram to summarize unread emails, check calendar events and manage Google Tasks.

**Category:** Life Admin & Home  
**Agent:** n8n  
**Source:** n8n.io · Undated

## What they did

This n8n workflow starts with a Telegram trigger that checks whether the message is voice or text. Voice files are fetched from Telegram and transcribed with OpenAI. The text goes to Jackie, an agent running on an OpenRouter model. Jackie has tools for Gmail unread email, Google Calendar events by date, and creating and reading Google Tasks. She replies in Telegram using Markdown, drawing on conversation memory and the current date.

## How it went

The source describes the design and features but reports no test results, numbers or limitations.

## Worth knowing

You need four credentials: a Telegram bot token from @BotFather, an OpenAI key for transcription, an OpenRouter key, and Google OAuth2 for Gmail, Calendar and Tasks.

## Prompt

```text
Build an n8n assistant named [assistant name] that I can talk to by voice or text in Telegram. It should summarize my unread Gmail, list upcoming events from Google Calendar, and add or complete tasks in Google Tasks. It must be read-only for email, and it should confirm with me before creating or changing any calendar event or task; done when it handles "what's on my plate today?" correctly.
```

## Related use cases

- [Add todo items to Todoist from Telegram](./add-todo-items-to-todoist-from-telegram.md)
- [Run 24/7 WhatsApp support and track application status](./run-24-7-whatsapp-support-and-track-application-status.md)
- [Automate client onboarding and schedule PDFs](./automate-client-onboarding-and-schedule-pdfs.md)
- [Get a second opinion on an MRI](./get-a-second-opinion-on-an-mri.md)
- [Automate simple Discord tasks and tutoring with Hermes](./automate-simple-discord-tasks-and-tutoring-with-hermes.md)
- [Control your Mac by voice with a Claude-backed assistant](./control-your-mac-by-voice-with-a-claude-backed-assistant.md)
