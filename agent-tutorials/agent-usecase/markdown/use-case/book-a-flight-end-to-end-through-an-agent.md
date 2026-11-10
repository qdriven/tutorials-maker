---
title: "Book a flight end-to-end through an agent"
slug: "book-a-flight-end-to-end-through-an-agent"
summary: "The author's agent Flightclaw searched airlines, sent a secure checkout link, and returned a booking reference after he paid."
category: "Travel & Bookings"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_platform: "X"
source_date: "Oct 11, 2026"
source_url: "https://x.com/JackCulpan/status/2109071761300189417"
fetched_from: "https://agentusecases.ai/use-case/book-a-flight-end-to-end-through-an-agent"
---

# Book a flight end-to-end through an agent

> The author's agent Flightclaw searched airlines, sent a secure checkout link, and returned a booking reference after he paid.

**Category:** Travel & Bookings  
**Agent:** custom-built or unnamed agent  
**Source:** X · Oct 11, 2026

## What they did

User added the Flightclaw MCP URL to Claude, ChatGPT or Cursor then signed in with an email code. Asked the agent to book a flight; it searched ~300 airlines on its own and returned one secure checkout link. User paid by card and the agent finished the booking.

## How it went

Agent returned a booking reference after payment. Works with zero setup on flightclaw.com via WebMCP for browser agents.

## Worth knowing

Free to use; traveller pays airline fare plus 5% + $3 fee (min $12) shown before checkout.

## Prompt

```text
Find the best-priced [economy/other class] flight from [origin] to [destination] departing [date] and returning [date or one-way] for [number] traveler(s), with a limit of [max price] and preferences of [e.g. nonstop, no red-eyes]. Show me the top three options with times, airlines, and total prices. Stop before entering payment or submitting any booking, and show me exactly what you are about to buy so I can approve it.
```

## Related use cases

- [Decide between points and cash for every trip](./decide-between-points-and-cash-for-every-trip.md)
- [Book flights with credits and manage reservations](./book-flights-with-credits-and-manage-reservations.md)
- [Research hotels for a 14-day Japan trip](./research-hotels-for-a-14-day-japan-trip.md)
- [Fix wrong-day flight reservations between bots](./fix-wrong-day-flight-reservations-between-bots.md)
- [Save the best local restaurants as a Google Maps list](./save-the-best-local-restaurants-as-a-google-maps-list.md)
- [Book the best-priced flight and later refund it](./book-the-best-priced-flight-and-later-refund-it.md)
