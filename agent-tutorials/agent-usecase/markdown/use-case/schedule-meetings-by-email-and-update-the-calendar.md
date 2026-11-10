---
title: "Schedule meetings by email and update the calendar"
slug: "schedule-meetings-by-email-and-update-the-calendar"
summary: "The poster built an agent that reads emails, checks calendar availability, replies with a meeting time and adds it to the calendar."
category: "Work & Operations"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_platform: "Reddit"
source_date: "Jan 1, 2026"
source_url: "https://www.reddit.com/r/SideProject/comments/1pton6u/i_built_an_ai_agent_that_reads_my_emails"
fetched_from: "https://agentusecases.ai/use-case/schedule-meetings-by-email-and-update-the-calendar"
---

# Schedule meetings by email and update the calendar

> The poster built an agent that reads emails, checks calendar availability, replies with a meeting time and adds it to the calendar.

**Category:** Work & Operations  
**Agent:** custom-built or unnamed agent  
**Source:** Reddit · Jan 1, 2026

## What they did

The poster built a background agent that scans their inbox for meeting requests, pulls the proposed date and time from the email, checks their calendar for conflicts, and either confirms the slot or suggests alternatives before blocking the time on the calendar. In comments, they said it uses limited permissions, no free-form actions, encrypted handling, and explicit authorization; for their use case it also accounts for in-person appointments, travel time, and distance between meetings.

## How it went

They said they had used it for about a month and estimated it saved 3–4 hours a week of scheduling. The main shortcoming raised in the thread was trust: people were uneasy about giving inbox access, and the poster did not share a detailed technical implementation.

## Worth knowing

The clearest practical catch is that this only made sense for them because existing scheduling tools did not handle travel time between in-person appointments.

## Prompt

```text
Build an agent that watches [email account] for meeting requests, checks my [calendar] for open slots in [working hours and time zone], and drafts a reply proposing a time. When the other person confirms, add the event to the calendar. Have it save replies as drafts for my approval before sending anything, and tell me when the setup is ready to test.
```

## Related use cases

- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Delegate calendar, inbox and travel booking to a personal work agent](./delegate-calendar-inbox-and-travel-booking-to-a-personal-wor.md)
- [Review contracts like NDAs and SaaS agreements in Claude Code](./review-contracts-like-ndas-and-saas-agreements-in-claude-cod.md)
- [Regrade assignments and update grades in Brightspace](./regrade-assignments-and-update-grades-in-brightspace.md)
- [Build a Telegram bot that sends emails and checks calendar](./build-a-telegram-bot-that-sends-emails-and-checks-calendar.md)
- [Generate recurring weekly reports combining KPIs and pull requests](./generate-recurring-weekly-reports-combining-kpis-and-pull-re.md)
