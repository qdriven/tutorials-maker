---
title: "Plan business trips and learn from each debrief"
slug: "plan-business-trips-and-learn-from-each-debrief"
summary: "A demo travel-ops agent searched flights and hotels, applied stored preferences and produced one recommendation pending approval, then updated its memory; nothing was booked."
category: "Travel & Bookings"
agents:
  - name: "Hermes Agent"
    slug: "hermes-agent"
source_platform: "dev.to"
source_date: "Undated"
source_url: "https://dev.to/christopher_mburu_7b7e0ba/hermes-travelops-an-agent-that-learns-from-every-trip-5805"
fetched_from: "https://agentusecases.ai/use-case/plan-business-trips-and-learn-from-each-debrief"
---

# Plan business trips and learn from each debrief

> A demo travel-ops agent searched flights and hotels, applied stored preferences and produced one recommendation pending approval, then updated its memory; nothing was booked.

**Category:** Travel & Bookings  
**Agent:** Hermes Agent  
**Source:** dev.to · Undated

## What they did

Built on Hermes Agent's own memory, skills and web search, running on gemini-3-flash-preview. With seeded traveler profiles, it ran three web searches for a Dubai trip and applied stored preferences unprompted. After a debrief typed by the author, it rewrote its memory file with a 3-hour layover cap and re-planned.

## How it went

The first plan was one recommendation (about $850) ending at pending approval. The re-plan enforced non-stop flights because of the debrief lesson. Profiles and trip dates were fixture data, and nothing was booked.

## Worth knowing

Demo data was seeded before recording and trip dates are fixtures, so real use needs your own traveler profiles loaded into memory first.

## Prompt

```text
Plan a business trip to [destination] from [date] to [date], departing from [city]. Search flights and hotels, apply my preferences in [seat, airline, hotel chain, budget, neighborhood], and give me one recommendation with a price breakdown and one backup. Do not book anything; wait for my approval, and after the trip ask for a debrief and save what you learned to memory.
```

## Related use cases

- [Set up a home chat server and manage accounts from your phone](./set-up-a-home-chat-server-and-manage-accounts-from-your-phon.md)
- [Produce a short-form video from research to captions](./produce-a-short-form-video-from-research-to-captions.md)
- [Debloat an Android TV](./debloat-an-android-tv.md)
- [Decide between points and cash for every trip](./decide-between-points-and-cash-for-every-trip.md)
- [Research hotels for a 14-day Japan trip](./research-hotels-for-a-14-day-japan-trip.md)
- [Buy movie tickets and set reminders from your calendar](./buy-movie-tickets-and-set-reminders-from-your-calendar.md)
