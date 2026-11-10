---
title: "Plan the workday across calendar, tickets, email, and docs"
slug: "plan-the-workday-across-calendar-tickets-email-and-docs"
summary: "A planning agent that works across Google Calendar, Linear, Gmail, and Google Docs through MCP."
category: "Work & Operations"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_platform: "DEV"
source_date: "Mar 11, 2026"
source_url: "https://dev.to/kimmaida/i-built-a-secure-planning-agent-with-mcp-and-keycard-324a"
fetched_from: "https://agentusecases.ai/use-case/plan-the-workday-across-calendar-tickets-email-and-docs"
---

# Plan the workday across calendar, tickets, email, and docs

> A planning agent that works across Google Calendar, Linear, Gmail, and Google Docs through MCP.

**Category:** Work & Operations  
**Agent:** custom-built or unnamed agent  
**Source:** DEV · Mar 11, 2026

## What they did

Kim Maida built a dashboard with a chat agent, Todaygent, backed by an MCP server. One tool fetches Calendar, Gmail, Linear, Drive and other sources in parallel, scores tasks, and caches them in a local JSON file. Access is read-only. Keycard swaps one login for short-lived, per-source tokens. The agent only dismisses or reprioritizes tasks locally, after asking.

## How it went

She uses it daily. Token exchange adds about 150–250ms per dashboard load. Early on the agent re-fetched data, dropped links and falsely claimed actions it couldn't take; a detailed system prompt addressed this. She says reproducing her prioritizing is an ongoing effort.

## Worth knowing

Keycard is in Early Access, and the author works there. It's a personal local tool, and a commenter warned it isn't production-secure.

## Prompt

```text
Plan my workday using my [Google Calendar], [ticket tracker, e.g. Linear], [Gmail], and [Google Docs]. Look at today's meetings, tickets due or assigned to me, and emails needing a reply, then propose a time-blocked schedule with priorities. Don't send, accept, or edit anything until I approve; stop once I have the plan and a list of suggested replies.
```

## Related use cases

- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Automate recurring work with scheduled Cowork tasks](./automate-recurring-work-with-scheduled-cowork-tasks.md)
- [Review contracts like NDAs and SaaS agreements in Claude Code](./review-contracts-like-ndas-and-saas-agreements-in-claude-cod.md)
- [Regrade assignments and update grades in Brightspace](./regrade-assignments-and-update-grades-in-brightspace.md)
- [Build a Telegram bot that sends emails and checks calendar](./build-a-telegram-bot-that-sends-emails-and-checks-calendar.md)
- [Generate recurring weekly reports combining KPIs and pull requests](./generate-recurring-weekly-reports-combining-kpis-and-pull-re.md)
