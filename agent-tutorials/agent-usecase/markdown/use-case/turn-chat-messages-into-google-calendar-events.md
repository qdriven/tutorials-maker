---
title: "Turn chat messages into Google Calendar events"
slug: "turn-chat-messages-into-google-calendar-events"
summary: "An n8n calendar agent takes a chat message, extracts event title, location and times, and creates a Google Calendar entry."
category: "Life Admin & Home"
agents:
  - name: "n8n"
    slug: "n8n"
source_platform: "freecodecamp.org"
source_date: "Undated"
source_url: "https://www.freecodecamp.org/news/how-to-build-ai-workflows-with-n8n/"
fetched_from: "https://agentusecases.ai/use-case/turn-chat-messages-into-google-calendar-events"
---

# Turn chat messages into Google Calendar events

> An n8n calendar agent takes a chat message, extracts event title, location and times, and creates a Google Calendar entry.

**Category:** Life Admin & Home  
**Agent:** n8n  
**Source:** freecodecamp.org · Undated

## What they did

The tutorial builds an n8n workflow with a chat trigger, an AI Agent node on an OpenAI chat model, and a Google Calendar node. The prompt tells the agent to resolve relative dates against the current time and default to 60 minutes. The agent calls a Date & Time tool to produce Unix timestamps, then returns structured JSON. Those fields are mapped into a calendar event.

## How it went

The article says the workflow creates events, and the Google Calendar node returns an htmlLink to the new event. It shows no test results, accuracy figures or failure cases.

## Worth knowing

Setup uses n8n's free OpenAI credits, a Google OAuth2 sign-in, and a free n8n cloud trial or self-hosting. A public chat URL lets others book events on your calendar.

## Prompt

```text
Build me an n8n workflow that takes a chat message like 'Dinner with [person] at [place] on [day] at [time]' and extracts the event title, location, start and end times. Have it create an event in my [Google Calendar name] and reply in the chat with the details. If the time or date is missing or ambiguous, have it ask me before creating anything, and stop once a test message produces a correct event.
```

## Related use cases

- [Add todo items to Todoist from Telegram](./add-todo-items-to-todoist-from-telegram.md)
- [Run 24/7 WhatsApp support and track application status](./run-24-7-whatsapp-support-and-track-application-status.md)
- [Automate client onboarding and schedule PDFs](./automate-client-onboarding-and-schedule-pdfs.md)
- [Get a second opinion on an MRI](./get-a-second-opinion-on-an-mri.md)
- [Automate simple Discord tasks and tutoring with Hermes](./automate-simple-discord-tasks-and-tutoring-with-hermes.md)
- [Control your Mac by voice with a Claude-backed assistant](./control-your-mac-by-voice-with-a-claude-backed-assistant.md)
