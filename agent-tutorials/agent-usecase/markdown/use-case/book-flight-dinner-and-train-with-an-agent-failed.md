---
title: "Book flight, dinner and train with an agent (failed)"
slug: "book-flight-dinner-and-train-with-an-agent-failed"
summary: "Poster gave an agent a flight, a London dinner for two and a train ticket; it finished none, with OpenTable blocking robots."
category: "Travel & Bookings"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_platform: "Reddit"
source_date: "Undated"
source_url: "https://www.reddit.com/r/AgentsOfAI/comments/1xgg5me/i_gave_an_agent_three_everyday_errands_a_flight"
fetched_from: "https://agentusecases.ai/use-case/book-flight-dinner-and-train-with-an-agent-failed"
---

# Book flight, dinner and train with an agent (failed)

> Poster gave an agent a flight, a London dinner for two and a train ticket; it finished none, with OpenTable blocking robots.

**Category:** Travel & Bookings  
**Agent:** custom-built or unnamed agent  
**Source:** Reddit · Undated

## What they did

The poster ran a repeatable test where an agent used a headless browser step by step, identified itself in its user agent, checked robots.txt before each page, solved no CAPTCHAs, and entered no personal details. It tried booking a Saturday 8pm London dinner and a King's Cross–Edinburgh train, but mostly hit robots.txt bans, bot checks, broken retailer handoffs, or forms that required a person to supply card, name, and phone details.

## How it went

It completed none of the three errands. For dinner it checked nine places in under ten minutes and only one let it search availability; for trains, National Rail found ten options quickly but the purchase flow failed before checkout.

## Worth knowing

The main catch was not model capability but access: approved APIs existed for some flights, while restaurant and train booking paths were effectively closed to a consumer agent.

## Prompt

```text
Help me plan a trip to [city] from [date] to [date]: find flights from [origin], a dinner for [number] on [date] near [area], and a train from [city] to [city]. Search for options and give me links, times and prices for each, and if a site blocks you, tell me which one and give me the direct link instead. Do not book or pay for anything; present your top choice for each so I can confirm before you take any action.
```

## Related use cases

- [Decide between points and cash for every trip](./decide-between-points-and-cash-for-every-trip.md)
- [Book flights with credits and manage reservations](./book-flights-with-credits-and-manage-reservations.md)
- [Research hotels for a 14-day Japan trip](./research-hotels-for-a-14-day-japan-trip.md)
- [Fix wrong-day flight reservations between bots](./fix-wrong-day-flight-reservations-between-bots.md)
- [Save the best local restaurants as a Google Maps list](./save-the-best-local-restaurants-as-a-google-maps-list.md)
- [Book a flight end-to-end through an agent](./book-a-flight-end-to-end-through-an-agent.md)
