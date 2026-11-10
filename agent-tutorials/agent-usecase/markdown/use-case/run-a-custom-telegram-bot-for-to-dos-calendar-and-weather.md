---
title: "Run a custom Telegram bot for to-dos, calendar and weather"
slug: "run-a-custom-telegram-bot-for-to-dos-calendar-and-weather"
summary: "After dropping OpenClaw over security and self-configuration crashes, the author wrote their own Telegram bot with a few manually enabled capabilities: TODO list, calendar and weather."
category: "Life Admin & Home"
agents:
  - name: "OpenClaw"
    slug: "openclaw"
source_platform: "HN"
source_date: "Oct 22, 2026"
source_url: "https://news.ycombinator.com/item?id=50198933"
fetched_from: "https://agentusecases.ai/use-case/run-a-custom-telegram-bot-for-to-dos-calendar-and-weather"
---

# Run a custom Telegram bot for to-dos, calendar and weather

> After dropping OpenClaw over security and self-configuration crashes, the author wrote their own Telegram bot with a few manually enabled capabilities: TODO list, calendar and weather.

**Category:** Life Admin & Home  
**Agent:** OpenClaw  
**Source:** HN · Oct 22, 2026

## What they did

After running OpenClaw in a dedicated VM with tightly limited file access, the author wrote their own bot that talks to them over Telegram. They manually enabled a few capabilities: adding to a TODO list, adding to a calendar, and fetching weather in their preferred format. The plan is to add features as needed.

## How it went

The author says they now know how the whole flow works, and found OpenClaw's soul.md, heartbeat and memory features never really worked. They are still looking for a way to let the LLM browse websites.

## Worth knowing

OpenClaw kept trying to configure itself and then crashing, so building only the capabilities you need gives a smaller, more predictable bot.

## Prompt

```text
Write me a small Telegram bot I can run myself that does only three things: manage a to-do list, show my calendar events from [Google Calendar or other calendar], and give the weather for [city]. Keep each capability in its own file and make it so nothing else is enabled unless I turn it on. Walk me through setup and token storage, test each command, and stop when all three work. Ask me before you install anything or connect to my accounts.
```

## Related use cases

- [Manage 18 agents from a Notion workspace](./manage-18-agents-from-a-notion-workspace.md)
- [Draft and publish blog posts with an SEO-aware agent](./draft-and-publish-blog-posts-with-an-seo-aware-agent.md)
- [Track sleep, notes, code and earthquakes with a personal agent](./track-sleep-notes-code-and-earthquakes-with-a-personal-agent.md)
- [Get a second opinion on an MRI](./get-a-second-opinion-on-an-mri.md)
- [Let Claude read Apple Health and Fitbit data via MCP](./let-claude-read-apple-health-and-fitbit-data-via-mcp.md)
- [Run pet relocation, Airbnb pricing, and disputes with agents](./run-pet-relocation-airbnb-pricing-and-disputes-with-agents.md)
