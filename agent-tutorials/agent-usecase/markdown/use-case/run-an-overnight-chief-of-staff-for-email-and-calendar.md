---
title: "Run an overnight chief of staff for email and calendar"
slug: "run-an-overnight-chief-of-staff-for-email-and-calendar"
summary: "A Claude Code system triages email at 5:30 AM, preps the calendar, updates tasks, adds drive-time events from traffic data and time-blocks the day."
category: "Work & Operations"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "the-ai-corner.com"
source_date: "Undated"
source_url: "https://www.the-ai-corner.com/p/claude-code-chief-of-staff-system"
fetched_from: "https://agentusecases.ai/use-case/run-an-overnight-chief-of-staff-for-email-and-calendar"
---

# Run an overnight chief of staff for email and calendar

> A Claude Code system triages email at 5:30 AM, preps the calendar, updates tasks, adds drive-time events from traffic data and time-blocks the day.

**Category:** Work & Operations  
**Agent:** Claude Code  
**Source:** the-ai-corner.com · Undated

## What they did

The author runs Claude Code with MCP servers for Google Calendar, Gmail, Todoist and Google Maps (Directions API) for drive times. Scheduled tasks run email triage at 5:30 AM and calendar prep at 5:45 AM. In the morning, one command starts six parallel subagents, and a time-block workflow builds the day's schedule. Emails are sorted into Dispatch, Prep, Yours or Skip so the human stays in control.

## How it went

The author says the task list and calendar, including traffic-based drive-time events, are current by 6:15 AM. The source gives no measured results beyond that. Most of the guide is paywalled.

## Worth knowing

The author puts the cost at about $100/month and suggests planning a weekend to build it. The full agent and command files are behind a paywall.

## Prompt

```text
Build me an overnight chief-of-staff routine that runs at [time, e.g. 5:30 AM] each weekday. It should triage my email into [categories], prep my calendar for the day, update my task list at [path or app], add drive-time events using traffic from [home or work address], and propose a time-blocked schedule. Have it write a morning summary I can read in two minutes. It should never send emails or accept invitations without my approval, only draft them. Stop when a test run produces a full summary.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Search years of research files in an Obsidian vault](./search-years-of-research-files-in-an-obsidian-vault.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Write end-of-sprint changelogs from completed tickets](./write-end-of-sprint-changelogs-from-completed-tickets.md)
- [Build a Telegram bot that sends emails and checks calendar](./build-a-telegram-bot-that-sends-emails-and-checks-calendar.md)
