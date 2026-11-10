---
title: "Sync family calendars by generating and emailing invites"
slug: "sync-family-calendars-by-generating-and-emailing-invites"
summary: "The poster has Grok Bot generate .ics invites and email them for approval, and is giving it an iCloud account to reach the family calendar."
category: "Life Admin & Home"
agents:
  - name: "Grok Bot"
    slug: "grok-bot"
source_platform: "Reddit"
source_date: "Sep 20, 2026"
source_url: "https://www.reddit.com/r/GrokBot/comments/1wltlzm/iphone_calendar_access_for_a_bot"
fetched_from: "https://agentusecases.ai/use-case/sync-family-calendars-by-generating-and-emailing-invites"
---

# Sync family calendars by generating and emailing invites

> The poster has Grok Bot generate .ics invites and email them for approval, and is giving it an iCloud account to reach the family calendar.

**Category:** Life Admin & Home  
**Agent:** Grok Bot  
**Source:** Reddit · Sep 20, 2026

## What they did

The thread describes two practical setups rather than a full built sync: one person has the bot generate .ics calendar invites and send them by email, then they manually accept them into the calendar. Another commenter created a separate iCloud account for the bot, gave it its own email, and added that account to the family so it could reach the shared calendar without using the person’s Apple ID password.

## How it went

The post itself is asking how to sync iPhone and Google calendars, so it does not report a finished sync result or any performance numbers. Comments say the iCloud.com approach had not caused weekly usage limits to burn too fast, but there are no harder outcomes.

## Worth knowing

The main catch raised in the thread is credentials: using iCloud.com inside the bot can expose your Apple login, so a separate bot iCloud account was suggested.

## Prompt

```text
Whenever I forward you [event details, such as a school schedule, appointment, or practice time], create a calendar invite (.ics) for it and email it to [family member emails] for approval. Don't send anything until you've shown me the invite details and I've said yes. Once approved, confirm the event is on [shared family calendar, e.g. iCloud] and tell me when it's done.
```

## Related use cases

- [Plan and book a short-notice work trip](./plan-and-book-a-short-notice-work-trip.md)
- [File receipts from a folder](./file-receipts-from-a-folder.md)
- [Monitor competitor marketplace prices](./monitor-competitor-marketplace-prices.md)
- [Get a second opinion on an MRI](./get-a-second-opinion-on-an-mri.md)
- [Give an AI its own inbox to act as personal assistant](./give-an-ai-its-own-inbox-to-act-as-personal-assistant.md)
- [Run personal life admin with Claude Code skills](./run-personal-life-admin-with-claude-code-skills.md)
