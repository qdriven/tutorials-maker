---
title: "Book a Munich to London flight (didn't finish)"
slug: "book-a-munich-to-london-flight-didn-t-finish"
summary: "The user asked an AI agent to book a flight from Munich to London; it searched the airline site but couldn't complete the booking."
category: "Travel & Bookings"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_platform: "Reddit"
source_date: "Oct 17, 2026"
source_url: "https://www.reddit.com/r/agi/comments/1x7sd1q/i_asked_an_ai_agent_to_book_my_flight_and_it"
fetched_from: "https://agentusecases.ai/use-case/book-a-munich-to-london-flight-didn-t-finish"
---

# Book a Munich to London flight (didn't finish)

> The user asked an AI agent to book a flight from Munich to London; it searched the airline site but couldn't complete the booking.

**Category:** Travel & Bookings  
**Agent:** custom-built or unnamed agent  
**Source:** Reddit · Oct 17, 2026

## What they did

The user told an AI agent to book a Munich-to-London flight for the 25th. It found options on Google Flights in about ten seconds, then tried airline and travel sites to complete the purchase, but British Airways, Lufthansa, easyJet, Kayak, Skyscanner, and Expedia all blocked or challenged it; Kiwi’s MCP server was the only route that returned flights and a handoff link for the user to finish entering passenger details.

## How it went

It never reached the passenger-details page on the normal booking sites, so it did not complete the booking. The only successful step was Kiwi’s MCP server, which returned 15 flights in under four seconds and a link for manual checkout.

## Worth knowing

The post says no CAPTCHA solving or pretending to be a person was allowed, which appears to be the key constraint that kept the agent from finishing.

## Prompt

```text
Find the best nonstop or one-stop flight from [origin city] to [destination city] on [date], returning [date or one-way], for [number] traveler(s). Compare options on Google Flights and the airline's own site, then take me to the checkout page for the one you recommend. Pause before entering any payment details or submitting the booking, and show me the fare, times, and baggage rules first.
```

## Related use cases

- [Decide between points and cash for every trip](./decide-between-points-and-cash-for-every-trip.md)
- [Book flights with credits and manage reservations](./book-flights-with-credits-and-manage-reservations.md)
- [Research hotels for a 14-day Japan trip](./research-hotels-for-a-14-day-japan-trip.md)
- [Fix wrong-day flight reservations between bots](./fix-wrong-day-flight-reservations-between-bots.md)
- [Save the best local restaurants as a Google Maps list](./save-the-best-local-restaurants-as-a-google-maps-list.md)
- [Book a flight end-to-end through an agent](./book-a-flight-end-to-end-through-an-agent.md)
