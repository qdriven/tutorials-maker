---
title: "Schedule meetings by email from forwarded requests"
slug: "schedule-meetings-by-email-from-forwarded-requests"
summary: "A user built an AI scheduling assistant that takes forwarded emails, coordinates times with recipients by email, and adds Zoom links to the calendar."
category: "Work & Operations"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_platform: "X"
source_date: "Oct 6, 2026"
source_url: "https://x.com/edsoehnel/status/2107574500984287570"
fetched_from: "https://agentusecases.ai/use-case/schedule-meetings-by-email-from-forwarded-requests"
---

# Schedule meetings by email from forwarded requests

> A user built an AI scheduling assistant that takes forwarded emails, coordinates times with recipients by email, and adds Zoom links to the calendar.

**Category:** Work & Operations  
**Agent:** custom-built or unnamed agent  
**Source:** X · Oct 6, 2026

## What they did

User forwards meeting request emails to a labeled Gmail inbox or creates one. The AI agent takes over from there, sends emails to recipients to propose and coordinate times, and inserts a Zoom link into the calendar event when needed. It was built and iterated over months then open sourced; a person still initiates by forwarding.

## How it went

It works for the described single-person cases after several iterations using OpenAI's Dot. Group scheduling remains untested and Codex runs were problematic.

## Worth knowing

Months of iterations needed before it stabilized.

## Prompt

```text
When I forward you an email asking for a meeting, email the other person to find a time that works with my calendar, within [working hours and time zone]. Once a time is agreed, add it to my [Google] calendar with a [Zoom] link and send the invite. Show me each outgoing email before it is sent, and stop when the meeting is on my calendar.
```

## Related use cases

- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Delegate calendar, inbox and travel booking to a personal work agent](./delegate-calendar-inbox-and-travel-booking-to-a-personal-wor.md)
- [Check supplier invoices for duplicates and missing GST](./check-supplier-invoices-for-duplicates-and-missing-gst.md)
- [Regrade assignments and update grades in Brightspace](./regrade-assignments-and-update-grades-in-brightspace.md)
- [Build a Telegram bot that sends emails and checks calendar](./build-a-telegram-bot-that-sends-emails-and-checks-calendar.md)
- [Generate recurring weekly reports combining KPIs and pull requests](./generate-recurring-weekly-reports-combining-kpis-and-pull-re.md)
