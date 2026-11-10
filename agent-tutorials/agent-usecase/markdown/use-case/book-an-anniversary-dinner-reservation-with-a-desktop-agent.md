---
title: "Book an anniversary dinner reservation with a desktop agent"
slug: "book-an-anniversary-dinner-reservation-with-a-desktop-agent"
summary: "Poster used an AI desktop agent to book a reservation at Serafina in San Francisco for an anniversary dinner."
category: "Travel & Bookings"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_platform: "Reddit"
source_date: "Undated"
source_url: "https://www.reddit.com/r/OpenAI/comments/1jl8psc"
fetched_from: "https://agentusecases.ai/use-case/book-an-anniversary-dinner-reservation-with-a-desktop-agent"
---

# Book an anniversary dinner reservation with a desktop agent

> Poster used an AI desktop agent to book a reservation at Serafina in San Francisco for an anniversary dinner.

**Category:** Travel & Bookings  
**Agent:** custom-built or unnamed agent  
**Source:** Reddit · Undated

## What they did

The poster used Spongecake with OpenAI’s CUA as a desktop agent, not a fixed script. They gave it a detailed prompt with an OpenTable search URL, constraints like Friday only and earliest time from 7:30 p.m., their phone number, and preferences for opting out of restaurant marketing but allowing reservation text updates; the poster noted OTP handling still needed a solution.

## How it went

It was far enough along that the poster showed the agent booking the anniversary reservation at Serafina in San Francisco, but they said OTPs were still an unsolved part of the flow. No performance numbers or success rate were given.

## Worth knowing

The main catch was authentication: the poster explicitly said they still needed a good way to handle OTPs.

## Prompt

```text
Book a dinner reservation for [number] people at [restaurant name] in [city] on [date] around [time], for [occasion]. Use [OpenTable, Resy, or the restaurant's site], and note any special requests like [request]. Pause and show me the exact time, party size and any deposit or card details before you confirm, and stop when you have a confirmation to show me.
```

## Related use cases

- [Decide between points and cash for every trip](./decide-between-points-and-cash-for-every-trip.md)
- [Book flights with credits and manage reservations](./book-flights-with-credits-and-manage-reservations.md)
- [Research hotels for a 14-day Japan trip](./research-hotels-for-a-14-day-japan-trip.md)
- [Fix wrong-day flight reservations between bots](./fix-wrong-day-flight-reservations-between-bots.md)
- [Save the best local restaurants as a Google Maps list](./save-the-best-local-restaurants-as-a-google-maps-list.md)
- [Book a flight end-to-end through an agent](./book-a-flight-end-to-end-through-an-agent.md)
