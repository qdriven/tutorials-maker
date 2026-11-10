---
title: "Monitor hotel prices daily and alert on drops for rebooking"
slug: "monitor-hotel-prices-daily-and-alert-on-drops-for-rebooking"
summary: "After booking a refundable hotel room, a scheduled Claude task checks the same room's price daily until the cancellation window ends and alerts the user to rebook if it drops."
category: "Travel & Bookings"
agents:
  - name: "Claude"
    slug: "claude"
source_platform: "Reddit"
source_date: "Oct 17, 2026"
source_url: "https://www.reddit.com/r/claude/comments/1x8m80f/use_claude_to_save_on_booking_hotels_when"
fetched_from: "https://agentusecases.ai/use-case/monitor-hotel-prices-daily-and-alert-on-drops-for-rebooking"
---

# Monitor hotel prices daily and alert on drops for rebooking

> After booking a refundable hotel room, a scheduled Claude task checks the same room's price daily until the cancellation window ends and alerts the user to rebook if it drops.

**Category:** Travel & Bookings  
**Agent:** Claude  
**Source:** Reddit · Oct 17, 2026

## What they did

The poster uses Claude with hotel-site connectors, especially Booking.com, Tripadvisor, Brek, and LetsFG, to pull the same room from multiple sites and normalize the full-stay total by including taxes and fees that may be disclosed separately. After booking a refundable rate, they set a scheduled Claude task to check that same room every day until free cancellation ends and alert them if the price drops so they can rebook.

## How it went

The source gives no savings total for the monitoring workflow, only that hotel prices can move sharply and sometimes fall after booking. It also depends on connectors and on fees being listed somewhere for Claude to find.

## Worth knowing

The main catch is that this only works cleanly if you book with free cancellation and keep checking until the cancellation deadline.

## Prompt

```text
I booked a refundable hotel room: [hotel name], [room type], [check-in and check-out dates], at [price per night] with free cancellation until [cancellation deadline]. Set up a scheduled task to check the current price for this same room and dates once a day until the deadline passes, then stop. If the price drops below what I paid by [amount or percent], alert me with the new price, the savings and the booking link. Do not cancel or rebook anything; wait for my go-ahead.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a charting tool from blood test PDFs](./build-a-charting-tool-from-blood-test-pdfs.md)
- [Run a daily-updated local business directory autonomously](./run-a-daily-updated-local-business-directory-autonomously.md)
- [Decide between points and cash for every trip](./decide-between-points-and-cash-for-every-trip.md)
- [Book a restaurant table with Alexa+](./book-a-restaurant-table-with-alexa.md)
- [Search venue sites for concerts to attend](./search-venue-sites-for-concerts-to-attend.md)
