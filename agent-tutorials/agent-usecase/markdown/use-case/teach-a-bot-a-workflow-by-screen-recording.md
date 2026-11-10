---
title: "Teach a bot a workflow by screen recording"
slug: "teach-a-bot-a-workflow-by-screen-recording"
summary: "Grok Bot learns a task from a screen recording and repeats it; a reviewer taught one to pull newsletter stats without an API."
category: "Work & Operations"
agents:
  - name: "Grok Bot"
    slug: "grok-bot"
source_platform: "Reddit"
source_date: "Aug 13, 2026"
source_url: "https://www.reddit.com/r/AI_Agents/comments/1vnbg4z/grok_bot_just_validated_everything_weve_been"
fetched_from: "https://agentusecases.ai/use-case/teach-a-bot-a-workflow-by-screen-recording"
---

# Teach a bot a workflow by screen recording

> Grok Bot learns a task from a screen recording and repeats it; a reviewer taught one to pull newsletter stats without an API.

**Category:** Work & Operations  
**Agent:** Grok Bot  
**Source:** Reddit · Aug 13, 2026

## What they did

The post describes Grok Bot’s teach-a-task feature as learning from a single screen recording of someone doing a workflow, then repeating that workflow on its own. The concrete example given is a reviewer who taught it to pull newsletter stats without an API or plugin, and the thread also says Grok Bot can pause for a human to handle login, then resume the task.

## How it went

The claimed upside was removing much of the work of specifying an automation flow and making no-API workflows possible. The source gives no measured results for the newsletter-stats example, so it does not say how accurate or reliable the repeated task was.

## Worth knowing

The main catch mentioned is access cost: the post says Grok Bot was bundled into paid plans starting around $120 per seat per month, with higher individual tiers.

## Prompt

```text
I'm going to share a screen recording of me doing [task, e.g. pulling weekly stats from a dashboard that has no API]. Watch it, write out the steps you learned, and confirm them with me. Then repeat the task and give me the results as [format, e.g. a table or spreadsheet]. Pause before you submit any form or change any data.
```

## Related use cases

- [Plan and book a short-notice work trip](./plan-and-book-a-short-notice-work-trip.md)
- [File receipts from a folder](./file-receipts-from-a-folder.md)
- [Monitor competitor marketplace prices](./monitor-competitor-marketplace-prices.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Send a 7am daily brief from email, calendar and Todoist](./send-a-7am-daily-brief-from-email-calendar-and-todoist.md)
- [Build a Telegram bot that sends emails and checks calendar](./build-a-telegram-bot-that-sends-emails-and-checks-calendar.md)
