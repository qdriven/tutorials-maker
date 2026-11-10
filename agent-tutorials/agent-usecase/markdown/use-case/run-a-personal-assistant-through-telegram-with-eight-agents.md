---
title: "Run a personal assistant through Telegram with eight agents"
slug: "run-a-personal-assistant-through-telegram-with-eight-agents"
summary: "The author built a multi-agent n8n system with eight specialized agents controlled via Telegram by voice or text, replacing their personal assistant."
category: "Life Admin & Home"
agents:
  - name: "n8n"
    slug: "n8n"
source_platform: "Reddit"
source_date: "Undated"
source_url: "https://www.reddit.com/r/n8n/comments/1mugdof/i_built_an_ai_agent_army_in_n8n_that_completely"
fetched_from: "https://agentusecases.ai/use-case/run-a-personal-assistant-through-telegram-with-eight-agents"
---

# Run a personal assistant through Telegram with eight agents

> The author built a multi-agent n8n system with eight specialized agents controlled via Telegram by voice or text, replacing their personal assistant.

**Category:** Life Admin & Home  
**Agent:** n8n  
**Source:** Reddit · Undated

## What they did

The author built an n8n workflow with a core orchestrator agent on GPT-4.1, PostgreSQL memory, and eight specialist agents for email, calendar, expenses, travel, weather/news, research, content, social planning, and contacts. They control it through Telegram by text or voice, and the orchestrator routes each request to the right agent, which then uses connected tools like Google Workspace, Airtable, SerpAPI, Tavily, Perplexity, and Replicate to complete the task.

## How it went

The author says it saves 20+ hours a week, makes travel planning take seconds instead of hours, and gets them to inbox zero while handling routine logging and research with sources. In comments, they say they have been using it for a while, but they do not give hard operating-cost figures.

## Worth knowing

The main catch they mention is setup: you need an n8n instance, Telegram bot, Google Workspace access, PostgreSQL, and several API keys; they also say run cost is not easy to quantify.

## Prompt

```text
Help me build a personal assistant in n8n that I can message on Telegram by text or voice note. Create a main router agent that sends requests to specialist agents for [e.g. calendar, email, tasks, notes, research, contacts, reminders, expenses], transcribing voice messages first. It's done when I can send a test request to each specialist and get a sensible reply, and any step that sends an email, books something, or deletes data must first show me what it's about to do and wait for my confirmation.
```

## Related use cases

- [Add todo items to Todoist from Telegram](./add-todo-items-to-todoist-from-telegram.md)
- [Answer WhatsApp customer questions and escalate to humans](./answer-whatsapp-customer-questions-and-escalate-to-humans.md)
- [Turn booking confirmation emails into calendar events](./turn-booking-confirmation-emails-into-calendar-events.md)
- [Get a second opinion on an MRI](./get-a-second-opinion-on-an-mri.md)
- [Automate simple Discord tasks and tutoring with Hermes](./automate-simple-discord-tasks-and-tutoring-with-hermes.md)
- [Control your Mac by voice with a Claude-backed assistant](./control-your-mac-by-voice-with-a-claude-backed-assistant.md)
