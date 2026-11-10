---
title: "Find and book airport parking (partly failed)"
slug: "find-and-book-airport-parking-partly-failed"
summary: "A reporter asked Comet to find cheap parking near SFO and book it; it entered the wrong dates twice and still pushed checkout."
category: "Travel & Bookings"
agents:
  - name: "Perplexity Comet"
    slug: "perplexity-comet"
source_platform: "techcrunch.com"
source_date: "Jul 9, 2025"
source_url: "https://techcrunch.com/2025/07/09/perplexity-launches-comet-an-ai-powered-web-browser/"
fetched_from: "https://agentusecases.ai/use-case/find-and-book-airport-parking-partly-failed"
---

# Find and book airport parking (partly failed)

> A reporter asked Comet to find cheap parking near SFO and book it; it entered the wrong dates twice and still pushed checkout.

**Category:** Travel & Bookings  
**Agent:** Perplexity Comet  
**Source:** techcrunch.com · Jul 9, 2025

## What they did

In Comet's sidecar, the assistant was asked for long-term parking near SFO with good reviews under $15 a day. It suggested options. The reporter then asked it to book one. It opened the lot's website, entered dates and some personal details, and asked the reporter to review and check out.

## How it went

It entered completely wrong dates, then said the requested dates were booked yet still pushed checkout. After being told the dates were fixed and to try another lot, it made the same error again.

## Worth knowing

Check every date and detail before checkout. Comet also needs broad Google Account permissions for calendar and email tasks, and launch access was limited to the $200 per month Max plan or the waitlist.

## Prompt

```text
Find affordable parking near [airport] for [start date and time] to [end date and time]. Compare at least [3] options with price, distance, and reviews, then start the booking for the one I pick. Before checkout, show me the dates, times, and total price so I can verify them, and do not submit payment until I confirm.
```

## Related use cases

- [Find coffee makers under $100 and add options to the cart](./find-coffee-makers-under-100-and-add-options-to-the-cart.md)
- [Research restaurants and hotel availability for trips](./research-restaurants-and-hotel-availability-for-trips.md)
- [Manage X follows and unfollows](./manage-x-follows-and-unfollows.md)
- [Decide between points and cash for every trip](./decide-between-points-and-cash-for-every-trip.md)
- [Turn reservation calls into calendar bookings](./turn-reservation-calls-into-calendar-bookings.md)
- [Book flights as a travel agent (came close)](./book-flights-as-a-travel-agent-came-close.md)
