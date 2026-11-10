---
title: "Book a restaurant table through a Resy connector"
slug: "book-a-restaurant-table-through-a-resy-connector"
summary: "A PCWorld writer asked Claude to book a table for three in Midtown Manhattan via the Resy connector; it picked a restaurant but the exchange was clunky, with raw JSON and permission prompts."
category: "Travel & Bookings"
agents:
  - name: "Claude"
    slug: "claude"
source_platform: "pcworld.com"
source_date: "Apr 29, 2026"
source_url: "https://www.pcworld.com/article/3123989/chatgpt-and-claude-tried-to-book-my-dinner-it-got-clunky-fast.html"
fetched_from: "https://agentusecases.ai/use-case/book-a-restaurant-table-through-a-resy-connector"
---

# Book a restaurant table through a Resy connector

> A PCWorld writer asked Claude to book a table for three in Midtown Manhattan via the Resy connector; it picked a restaurant but the exchange was clunky, with raw JSON and permission prompts.

**Category:** Travel & Bookings  
**Agent:** Claude  
**Source:** pcworld.com · Apr 29, 2026

## What they did

The writer added the Resy connector to Claude through Customize > Connectors, then chatted about where to eat near his Midtown apartment (table for three, around 6:30 pm). Claude suggested The Smith and pulled up availability. A raw JSON permission prompt appeared and he clicked Always allow. Claude couldn't complete the booking itself, so he tapped the 7:15 slot and finished on Resy's site.

## How it went

Claude picked a good restaurant and showed open slots, but the writer still had to finish the reservation on Resy himself. He concluded the Resy app on his iPhone would have been faster.

## Worth knowing

The connector only exposes the tool calls the developers defined, so it can show availability but not book. Expect to finish the reservation yourself on Resy.

## Prompt

```text
Open Resy in my browser and find a table for [number] people in [neighborhood, city] on [date] around [time], serving [cuisine or budget]. Show me up to three options with times and any cancellation policy. Pause and wait for me to choose before booking, and show the booking details before you confirm. Finish when I have a confirmation.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Prospect, score leads and run outbound email sequences](./prospect-score-leads-and-run-outbound-email-sequences.md)
- [Build an anonymous wall of hopes and fears about AI](./build-an-anonymous-wall-of-hopes-and-fears-about-ai.md)
- [Decide between points and cash for every trip](./decide-between-points-and-cash-for-every-trip.md)
- [Book a restaurant table with Alexa+](./book-a-restaurant-table-with-alexa.md)
- [Search venue sites for concerts to attend](./search-venue-sites-for-concerts-to-attend.md)
