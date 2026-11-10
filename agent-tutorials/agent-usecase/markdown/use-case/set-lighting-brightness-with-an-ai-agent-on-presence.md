---
title: "Set lighting brightness with an AI agent on presence"
slug: "set-lighting-brightness-with-an-ai-agent-on-presence"
summary: "A Home Assistant presence sensor triggers n8n, where a Deepseek agent picks a brightness for the time of day and sets the lights."
category: "Life Admin & Home"
agents:
  - name: "n8n"
    slug: "n8n"
source_platform: "growwstacks.com"
source_date: "Undated"
source_url: "https://growwstacks.com/blog/n8n-home-assistant-ai-lighting-automation"
fetched_from: "https://agentusecases.ai/use-case/set-lighting-brightness-with-an-ai-agent-on-presence"
---

# Set lighting brightness with an AI agent on presence

> A Home Assistant presence sensor triggers n8n, where a Deepseek agent picks a brightness for the time of day and sets the lights.

**Category:** Life Admin & Home  
**Agent:** n8n  
**Source:** growwstacks.com · Undated

## What they did

n8n runs as a Home Assistant add-on. A Home Assistant automation fires when the presence sensor goes from Clear to Detected and calls an n8n webhook through a REST command. In n8n, a Deepseek agent prompted as a lighting designer picks a brightness percentage for the current time. A final node calls Home Assistant's turn_on service for the light with that value.

## How it went

The source gives no measured results. It presents the workflow as working and says it is meant to avoid harsh night lighting and dim mornings. Brightness is the only attribute it actually sets.

## Worth knowing

Use the Home Assistant IP address in the webhook URL, not the default hostname. The article calls this the main connectivity fix and recommends at least 4GB RAM.

## Prompt

```text
Build an n8n workflow triggered when the presence sensor [sensor name] in Home Assistant detects someone in [room]. Have an AI agent pick a light brightness from 1 to 100 based on the time of day and [other rules, e.g. sunset or movie mode], then set [light entity] to that level. Done when I can test it at three different times of day and see a sensible brightness each time.
```

## Related use cases

- [Add todo items to Todoist from Telegram](./add-todo-items-to-todoist-from-telegram.md)
- [Run 24/7 WhatsApp support and track application status](./run-24-7-whatsapp-support-and-track-application-status.md)
- [Automate client onboarding and schedule PDFs](./automate-client-onboarding-and-schedule-pdfs.md)
- [Get a second opinion on an MRI](./get-a-second-opinion-on-an-mri.md)
- [Automate simple Discord tasks and tutoring with Hermes](./automate-simple-discord-tasks-and-tutoring-with-hermes.md)
- [Control your Mac by voice with a Claude-backed assistant](./control-your-mac-by-voice-with-a-claude-backed-assistant.md)
