---
title: "Book tutoring appointments over WhatsApp"
slug: "book-tutoring-appointments-over-whatsapp"
summary: "An agency owner built a WhatsApp agent for a tutoring company that books calendar appointments, shipped in two days for a $5K fee."
category: "Work & Operations"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_platform: "HN"
source_date: "Apr 14, 2026"
source_url: "https://news.ycombinator.com/item?id=47763262"
fetched_from: "https://agentusecases.ai/use-case/book-tutoring-appointments-over-whatsapp"
---

# Book tutoring appointments over WhatsApp

> An agency owner built a WhatsApp agent for a tutoring company that books calendar appointments, shipped in two days for a $5K fee.

**Category:** Work & Operations  
**Agent:** custom-built or unnamed agent  
**Source:** HN · Apr 14, 2026

## What they did

MarcoKueks, who runs a small AI agency and is not an engineer, built a WhatsApp agent for a tutoring company that books calendar appointments. He used Struere, a platform he built to handle the recurring WhatsApp-to-calendar-to-database plumbing. That let him spend most of the two days on the client's booking logic.

## How it went

It shipped in two days for a $5K fee. Six months earlier, the same job took a week and a half, including days fixing messages that arrived but never triggered a booking.

## Worth knowing

The speedup came from reusing a platform he had already built after repeatedly paying developers for the same stack, not from starting fresh.

## Prompt

```text
Build a workflow that takes incoming WhatsApp messages for [business name], asks the customer which [service] and what time they want, checks [Google Calendar name] for openings, and books the slot. Send a confirmation back to the customer. Test it with a few fake bookings and show me the results before turning it on for real customers.
```

## Related use cases

- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Automate recurring work with scheduled Cowork tasks](./automate-recurring-work-with-scheduled-cowork-tasks.md)
- [Review contracts like NDAs and SaaS agreements in Claude Code](./review-contracts-like-ndas-and-saas-agreements-in-claude-cod.md)
- [Regrade assignments and update grades in Brightspace](./regrade-assignments-and-update-grades-in-brightspace.md)
- [Build a Telegram bot that sends emails and checks calendar](./build-a-telegram-bot-that-sends-emails-and-checks-calendar.md)
- [Generate recurring weekly reports combining KPIs and pull requests](./generate-recurring-weekly-reports-combining-kpis-and-pull-re.md)
