---
title: "Find a cheaper Rome flight and hotel combination"
slug: "find-a-cheaper-rome-flight-and-hotel-combination"
summary: "A user had a browser agent compare round-trip flights to Rome and mid-range hotels under a budget; it found booking separately was cheaper than a package."
category: "Travel & Bookings"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_platform: "Reddit"
source_date: "Undated"
source_url: "https://www.reddit.com/r/automation/comments/1obkk8u"
fetched_from: "https://agentusecases.ai/use-case/find-a-cheaper-rome-flight-and-hotel-combination"
---

# Find a cheaper Rome flight and hotel combination

> A user had a browser agent compare round-trip flights to Rome and mid-range hotels under a budget; it found booking separately was cheaper than a package.

**Category:** Travel & Bookings  
**Agent:** custom-built or unnamed agent  
**Source:** Reddit · Undated

## What they did

The user had GPT draft a prompt, then gave that prompt to MuleRun’s browser agent to find a September round-trip flight to Rome plus a mid-range city-center hotel for five nights under $1,500, with taxes and fees included. The agent compared flights and hotels across six platforms, filtered hidden fees, checked refund policies, organized the best three options, and surfaced that booking a direct flight and hotel separately beat package deals; the person then chose and booked one option.

## How it went

It found a direct flight plus boutique hotel for $1,280 total versus a package the user almost booked for $1,780, a claimed $500 savings. The post does not say which sites were searched or how reliable the result was beyond this one trip.

## Worth knowing

The key catch is that the user did not use the browser agent alone; they first asked GPT to write the shopping prompt for it.

## Prompt

```text
Compare round-trip flights from [my city] to [destination] for [dates] and mid-range hotels in [area] under [nightly or total budget]. Price it both as a package and as separate flight and hotel bookings, and show me a table with the cheapest options, total cost, and cancellation terms. Don't book or enter payment details; stop once you've given me your recommendation and links.
```

## Related use cases

- [Decide between points and cash for every trip](./decide-between-points-and-cash-for-every-trip.md)
- [Book flights with credits and manage reservations](./book-flights-with-credits-and-manage-reservations.md)
- [Research hotels for a 14-day Japan trip](./research-hotels-for-a-14-day-japan-trip.md)
- [Fix wrong-day flight reservations between bots](./fix-wrong-day-flight-reservations-between-bots.md)
- [Save the best local restaurants as a Google Maps list](./save-the-best-local-restaurants-as-a-google-maps-list.md)
- [Book the best-priced flight and later refund it](./book-the-best-priced-flight-and-later-refund-it.md)
