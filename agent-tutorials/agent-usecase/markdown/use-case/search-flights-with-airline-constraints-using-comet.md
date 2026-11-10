---
title: "Search flights with airline constraints using Comet"
slug: "search-flights-with-airline-constraints-using-comet"
summary: "Comet searched Lisbon-to-Taiwan flights across chosen airlines with no 737 Max and one stop max, pulling live prices and reaching the passenger info page."
category: "Travel & Bookings"
agents:
  - name: "Perplexity Comet"
    slug: "perplexity-comet"
source_platform: "usaii.org"
source_date: "Undated"
source_url: "https://www.usaii.org/ai-insights/perplexity-comet-in-action-real-examples-of-ai-browser-assistance"
fetched_from: "https://agentusecases.ai/use-case/search-flights-with-airline-constraints-using-comet"
---

# Search flights with airline constraints using Comet

> Comet searched Lisbon-to-Taiwan flights across chosen airlines with no 737 Max and one stop max, pulling live prices and reaching the passenger info page.

**Category:** Travel & Bookings  
**Agent:** Perplexity Comet  
**Source:** usaii.org · Undated

## What they did

The prompt asked for a one-way Lisbon-to-Taiwan flight in August on KLM, EVA or Emirates only, with no Boeing 737 Max and at most one stop. Comet first returned only a summary table and opened no tabs. After a follow-up prompt, it opened background tabs on each airline's site, pulled live prices and best dates, and compared options.

## How it went

It went through the booking flow as far as the passenger information page. The first attempt was only a table summary, so the airline-site search needed a second prompt.

## Worth knowing

If Comet answers with just a summary table, tell it explicitly to search the individual airline sites. Comet was available through Perplexity's $200/month Max plan at the time.

## Prompt

```text
Search flights from [origin] to [destination] departing between [date range], using only [airlines], with a maximum of [number] stop(s) and no [aircraft type]. Show me the three best options with live prices, durations and layovers in a table. Take me to the passenger info page for my favorite, then stop before entering personal details or paying.
```

## Related use cases

- [Find coffee makers under $100 and add options to the cart](./find-coffee-makers-under-100-and-add-options-to-the-cart.md)
- [Research restaurants and hotel availability for trips](./research-restaurants-and-hotel-availability-for-trips.md)
- [Manage X follows and unfollows](./manage-x-follows-and-unfollows.md)
- [Decide between points and cash for every trip](./decide-between-points-and-cash-for-every-trip.md)
- [Turn reservation calls into calendar bookings](./turn-reservation-calls-into-calendar-bookings.md)
- [Book flights as a travel agent (came close)](./book-flights-as-a-travel-agent-came-close.md)
