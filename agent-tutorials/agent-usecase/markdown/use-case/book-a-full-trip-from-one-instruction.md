---
title: "Book a full trip from one instruction"
slug: "book-a-full-trip-from-one-instruction"
summary: "A conference talk describes an AI agent given one instruction with four constraints that assembled, booked and paid for a flight, hotel and rental car with no supplier seeing the customer."
category: "Travel & Bookings"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_platform: "contraco.net"
source_date: "Undated"
source_url: "https://contraco.net/the-booking-you-never-saw.html"
fetched_from: "https://agentusecases.ai/use-case/book-a-full-trip-from-one-instruction"
---

# Book a full trip from one instruction

> A conference talk describes an AI agent given one instruction with four constraints that assembled, booked and paid for a flight, hotel and rental car with no supplier seeing the customer.

**Category:** Travel & Bookings  
**Agent:** custom-built or unnamed agent  
**Source:** contraco.net · Undated

## What they did

For a conference talk, contraco made a test purchase through an AI travel planner that holds no inventory of its own. The instruction was short: two travellers, Thursday to Sunday in late October, Miami, a hotel within walking distance of the beach and not on the Strip, and a one-day rental car outside the city. The agent assembled the trip, booked it and paid.

## How it went

Flight, hotel and rental car were all confirmed and paid. The suppliers received only a query and a payment, with no customer data, visit or account. The source gives no cost, price or timing for the trip.

## Worth knowing

The planner earns money by selling visibility to hotels and destinations from a published price list. The source does not name the planner, so you can't reproduce it exactly.

## Prompt

```text
Plan a trip to [destination] from [departure city] for [dates], with these constraints: flight budget of [amount], hotel within [area or distance] rated at least [rating], a rental car of [type], and [any fifth preference]. Search for options and put together the best full itinerary, with prices and links for the flight, hotel and car. Stop before paying or submitting any booking form and show me the complete itinerary and total cost so I can approve each purchase.
```

## Related use cases

- [Decide between points and cash for every trip](./decide-between-points-and-cash-for-every-trip.md)
- [Book flights with credits and manage reservations](./book-flights-with-credits-and-manage-reservations.md)
- [Research hotels for a 14-day Japan trip](./research-hotels-for-a-14-day-japan-trip.md)
- [Fix wrong-day flight reservations between bots](./fix-wrong-day-flight-reservations-between-bots.md)
- [Save the best local restaurants as a Google Maps list](./save-the-best-local-restaurants-as-a-google-maps-list.md)
- [Book a flight end-to-end through an agent](./book-a-flight-end-to-end-through-an-agent.md)
