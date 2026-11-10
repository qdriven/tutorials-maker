---
title: "Book hotel rooms across booking engines"
slug: "book-hotel-rooms-across-booking-engines"
summary: "Manus was tested on 11 hotel booking engines and got through date and room selection on 8, but handed back at payment details so no booking was completed."
category: "Travel & Bookings"
agents:
  - name: "Manus"
    slug: "manus"
source_platform: "hotelnewsresource.com"
source_date: "Undated"
source_url: "https://www.hotelnewsresource.com/article137200.html"
fetched_from: "https://agentusecases.ai/use-case/book-hotel-rooms-across-booking-engines"
---

# Book hotel rooms across booking engines

> Manus was tested on 11 hotel booking engines and got through date and room selection on 8, but handed back at payment details so no booking was completed.

**Category:** Travel & Bookings  
**Agent:** Manus  
**Source:** hotelnewsresource.com · Undated

## What they did

Triptease gave Manus the same one-line prompt on each of 11 booking engines, asking for a room at a named hotel for September 15 to 17. Manus went to the hotel's own site first, then clicked through the date picker and room choice. It stopped at the guest and payment form so a person could enter details. It never held card details.

## How it went

Manus succeeded on 8 of 11 engines, 3 of them with delays. It failed on D Edge and Travelanium because of CAPTCHAs, and on Simple Booking because of its date selector. Each time it fell back to Booking.com.

## Worth knowing

Date pickers that show months side by side worked best. A length-of-stay picker or a CAPTCHA sent Manus to Booking.com, and it still can't finish payment itself.

## Prompt

```text
Go to [hotel website or booking engine URL] and go through the booking flow for a [room type] from [check-in date] to [check-out date] for [number] guests. Stop at the payment details page and show me the room, price, and cancellation terms. Don't enter any payment information or submit the booking.
```

## Related use cases

- [Compile journalist lists and search apartment listings](./compile-journalist-lists-and-search-apartment-listings.md)
- [Make an AI trends presentation](./make-an-ai-trends-presentation.md)
- [Run varied business tasks through a general agent](./run-varied-business-tasks-through-a-general-agent.md)
- [Decide between points and cash for every trip](./decide-between-points-and-cash-for-every-trip.md)
- [Book tickets, rides and services via Alexa+](./book-tickets-rides-and-services-via-alexa.md)
- [Buy movie tickets and set reminders from your calendar](./buy-movie-tickets-and-set-reminders-from-your-calendar.md)
