---
title: "Run background agents with an email-style approval inbox"
slug: "run-background-agents-with-an-email-style-approval-inbox"
summary: "A self-hosted desktop app runs background agents, with finished work in Unread and approvals in Action; it began as automating CRM activity logging and meeting prep. · Sep 15, 2026"
category: "Work & Operations"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_url: "https://github.com/pizza-bot-app/pizza-bot"
fetched_from: "https://agentusecases.ai/use-case/run-background-agents-with-an-email-style-approval-inbox"
---

# Run background agents with an email-style approval inbox

> A self-hosted desktop app runs background agents, with finished work in Unread and approvals in Action; it began as automating CRM activity logging and meeting prep. · Sep 15, 2026

**Category:** Work & Operations  
**Agent:** custom-built or unnamed agent

## What they did

You start or schedule a task in the desktop app (Electron, also available in a browser or CLI), then carry on with other work. Runs are checkpointed and continue after you navigate away. Finished work goes to Unread, and runs needing a decision go to Action. Cron or webhook triggers can start runs, and skills run as delegated workers. Local folders are only reachable if you grant them.

## How it went

The README gives no results or metrics beyond saying more than 2,000 Amazon users tested earlier versions. It doesn't mention CRM logging or meeting prep, so that origin isn't confirmed here.

## Worth knowing

The api-server process has to stay running for agents to keep working. You also need Node.js 24 or newer and a model provider configured under Settings > Providers.

## Prompt

```text
Set up a background agent that every [weekday morning] reviews my [calendar and CRM] and drafts meeting prep notes for each upcoming meeting, plus activity log entries for yesterday's calls. Put finished prep notes in an unread list, and put anything that would write to the CRM or send a message in a separate approval list. Do not make any changes or send anything until I approve it.
```

## Related use cases

- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Automate recurring work with scheduled Cowork tasks](./automate-recurring-work-with-scheduled-cowork-tasks.md)
- [Review contracts like NDAs and SaaS agreements in Claude Code](./review-contracts-like-ndas-and-saas-agreements-in-claude-cod.md)
- [Regrade assignments and update grades in Brightspace](./regrade-assignments-and-update-grades-in-brightspace.md)
- [Build a Telegram bot that sends emails and checks calendar](./build-a-telegram-bot-that-sends-emails-and-checks-calendar.md)
- [Generate recurring weekly reports combining KPIs and pull requests](./generate-recurring-weekly-reports-combining-kpis-and-pull-re.md)
