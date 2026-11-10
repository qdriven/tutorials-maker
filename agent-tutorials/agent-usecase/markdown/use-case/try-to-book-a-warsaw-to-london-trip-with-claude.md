---
title: "Try to book a Warsaw to London trip with Claude"
slug: "try-to-book-a-warsaw-to-london-trip-with-claude"
summary: "The poster tried to have Claude fully book flights and hotel via Expedia and Kiwi connectors, found them poor, and ended up building a travel booking project instead."
category: "Travel & Bookings"
agents:
  - name: "Claude"
    slug: "claude"
source_platform: "Reddit"
source_date: "Sep 14, 2026"
source_url: "https://www.reddit.com/r/ClaudeAI/comments/1wg6ubl/i_asked_claude_to_book_my_flight_hotel_it_took_6"
fetched_from: "https://agentusecases.ai/use-case/try-to-book-a-warsaw-to-london-trip-with-claude"
---

# Try to book a Warsaw to London trip with Claude

> The poster tried to have Claude fully book flights and hotel via Expedia and Kiwi connectors, found them poor, and ended up building a travel booking project instead.

**Category:** Travel & Bookings  
**Agent:** Claude  
**Source:** Reddit · Sep 14, 2026

## What they did

The poster tried to make the default Claude mobile/web app fully book a Warsaw-to-London trip, using Expedia and Kiwi through Claude’s connectors. Claude could search options, but the attempt dragged on because the booking flow, especially taking payment safely without exposing card details to the model or connector, was not solved; the poster then turned the experience into building a travel-booking product instead.

## How it went

The trip itself was not fully booked by Claude, and the process stretched into a six-month project. In the end, the poster says a later model release changed what felt possible, but the original Expedia and Kiwi connector attempt was poor.

## Worth knowing

The biggest catch was payments: the post frames bank-grade card handling, without the AI or services ever seeing the card data, as the central blocker.

## Prompt

```text
Build me a small travel planning project for a trip from [origin city] to [destination city] on [dates]. It should pull flight and hotel options from [sites or APIs you prefer] into one ranked comparison file using my budget of [amount] and preferences of [preferences]. Stop once the shortlist is ready and show me the top choices with links, and don't book or pay for anything.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Prospect, score leads and run outbound email sequences](./prospect-score-leads-and-run-outbound-email-sequences.md)
- [Build an anonymous wall of hopes and fears about AI](./build-an-anonymous-wall-of-hopes-and-fears-about-ai.md)
- [Decide between points and cash for every trip](./decide-between-points-and-cash-for-every-trip.md)
- [Book a restaurant table with Alexa+](./book-a-restaurant-table-with-alexa.md)
- [Search venue sites for concerts to attend](./search-venue-sites-for-concerts-to-attend.md)
