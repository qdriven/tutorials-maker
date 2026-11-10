---
title: "Use n8n workflows as a Home Assistant voice agent"
slug: "use-n8n-workflows-as-a-home-assistant-voice-agent"
summary: "A custom integration sends voice requests and exposed entities to an n8n workflow that can use AI and trigger automations, speaking the reply back."
category: "Life Admin & Home"
agents:
  - name: "n8n"
    slug: "n8n"
source_platform: "community.home-assistant.io"
source_date: "Undated"
source_url: "https://community.home-assistant.io/t/webhook-conversation/917228"
fetched_from: "https://agentusecases.ai/use-case/use-n8n-workflows-as-a-home-assistant-voice-agent"
---

# Use n8n workflows as a Home Assistant voice agent

> A custom integration sends voice requests and exposed entities to an n8n workflow that can use AI and trigger automations, speaking the reply back.

**Category:** Life Admin & Home  
**Agent:** n8n  
**Source:** community.home-assistant.io · Undated

## What they did

You install the Webhook Conversation custom integration through HACS and point it at the production webhook URL of an n8n webhook node, in a workflow that is set active. Home Assistant sends the conversation history, the user's query and the exposed entities with states, areas and aliases. An n8n agent node handles it and returns JSON, and the reply is spoken. For controlling devices, one user added the Home Assistant call service node.

## How it went

Users got state and attribute queries working, plus device control through n8n's Home Assistant nodes. Continued conversation reportedly triggers when a reply ends in a question mark. The integration doesn't support tool calls directly, and a 403 error appeared when the webhook required authentication.

## Worth knowing

The integration times out after 30 seconds by default, so slow multi-tool agent runs fail with an intent recognition error unless you raise the timeout.

## Prompt

```text
Set up an n8n workflow that acts as a voice agent for my Home Assistant at [Home Assistant URL]. It should receive the spoken request and list of exposed entities, use an AI model to decide what to do, call the matching Home Assistant services, and return a short reply to be spoken back. Start with only [list of safe entities, e.g. lights, media player] and exclude locks and alarms; you're done when I can say "[example command]" and it works.
```

## Related use cases

- [Add todo items to Todoist from Telegram](./add-todo-items-to-todoist-from-telegram.md)
- [Run 24/7 WhatsApp support and track application status](./run-24-7-whatsapp-support-and-track-application-status.md)
- [Automate client onboarding and schedule PDFs](./automate-client-onboarding-and-schedule-pdfs.md)
- [Get a second opinion on an MRI](./get-a-second-opinion-on-an-mri.md)
- [Automate simple Discord tasks and tutoring with Hermes](./automate-simple-discord-tasks-and-tutoring-with-hermes.md)
- [Control your Mac by voice with a Claude-backed assistant](./control-your-mac-by-voice-with-a-claude-backed-assistant.md)
