---
title: "Monitor Resy and book date night tables"
slug: "monitor-resy-and-book-date-night-tables"
summary: "Brian built a Hermes agent that watches Resy for openings at favorite NYC restaurants and books tables, but it had no rate limits and got his account suspended."
category: "Travel & Bookings"
agents:
  - name: "Hermes Agent"
    slug: "hermes-agent"
source_platform: "X"
source_date: "Aug 17, 2026"
source_url: "https://x.com/bdistel/status/2089421994450170039"
fetched_from: "https://agentusecases.ai/use-case/monitor-resy-and-book-date-night-tables"
---

# Monitor Resy and book date night tables

> Brian built a Hermes agent that watches Resy for openings at favorite NYC restaurants and books tables, but it had no rate limits and got his account suspended.

**Category:** Travel & Bookings  
**Agent:** Hermes Agent  
**Source:** X · Aug 17, 2026

## What they did

Brian spun up a Hermes subagent inside his personal agent Hannah (which used Obsidian as the brain and Telegram as the interface) to monitor Resy for openings at a few favorite NYC restaurants and book tables for date nights. The subagent ran checks on its own with no rate limits configured. It operated by repeatedly querying the site whenever it detected availability.

## How it went

The subagent secured openings effectively until Resy suspended the account for hammering their system and violating TOS. After repeated support requests he received a one-time reinstatement.

## Worth knowing

No rate limits were set on the subagent's Resy queries, which caused the immediate suspension.

## Prompt

```text
Watch Resy for openings at [list of restaurants] in [city] for [party size] on [days and times]. Check at a gentle rate of no more than once every [number] minutes to avoid getting my account blocked. When a table opens, message me with the details and book it only after I approve.
```

## Related use cases

- [Set up a home chat server and manage accounts from your phone](./set-up-a-home-chat-server-and-manage-accounts-from-your-phon.md)
- [Create a full music video with lyrics, music and visuals](./create-a-full-music-video-with-lyrics-music-and-visuals.md)
- [Debloat an Android TV](./debloat-an-android-tv.md)
- [Decide between points and cash for every trip](./decide-between-points-and-cash-for-every-trip.md)
- [Research hotels for a 14-day Japan trip](./research-hotels-for-a-14-day-japan-trip.md)
- [Buy movie tickets and set reminders from your calendar](./buy-movie-tickets-and-set-reminders-from-your-calendar.md)
