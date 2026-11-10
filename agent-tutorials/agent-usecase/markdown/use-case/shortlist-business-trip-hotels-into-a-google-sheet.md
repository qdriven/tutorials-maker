---
title: "Shortlist business-trip hotels into a Google Sheet"
slug: "shortlist-business-trip-hotels-into-a-google-sheet"
summary: "A Claude in Chrome shortcut searches Booking.com for hotels near downtown under a price cap and logs each with price, rating, distance, amenities and booking link in a Google Sheet."
category: "Travel & Bookings"
agents:
  - name: "Claude in Chrome"
    slug: "claude-in-chrome"
source_platform: "app.therundown.ai"
source_date: "Undated"
source_url: "https://app.therundown.ai/guides/use-claudes-chrome-extension-to-quickly-book-business-trips"
fetched_from: "https://agentusecases.ai/use-case/shortlist-business-trip-hotels-into-a-google-sheet"
---

# Shortlist business-trip hotels into a Google Sheet

> A Claude in Chrome shortcut searches Booking.com for hotels near downtown under a price cap and logs each with price, rating, distance, amenities and booking link in a Google Sheet.

**Category:** Travel & Bookings  
**Agent:** Claude in Chrome  
**Source:** app.therundown.ai · Undated

## What they did

You create a /hotel-picker shortcut in Claude in Chrome that starts from Booking.com. It applies the Hotels-only, distance and 4-star-plus filters, then checks Booking.com and TripAdvisor reviews. You set up a Google Sheet with headers. A prompt gives Claude the trip, dates, price cap and sheet URL, and it adds a row per hotel.

## How it went

The source says results come back in about 10–15 minutes as a top-10 list sorted by value. It gives no tested results or accuracy numbers.

## Worth knowing

Needs a Claude Pro account. Use a dedicated Chrome profile to limit logins, and don't click in the active tab. If anti-bot protections trigger, ask Claude to type slowly.

## Prompt

```text
Search Booking.com for hotels near [location] under [price cap] per night, and log each match into a Google Sheet with price, rating, distance from downtown, amenities and the booking link. Stop once you have a shortlist of at least [number] options for me to review.
```

## Related use cases

- [Build a balloon-camel simulator for an LED Burning Man totem](./build-a-balloon-camel-simulator-for-an-led-burning-man-totem.md)
- [Negotiate a billing credit from AT&T](./negotiate-a-billing-credit-from-at-t.md)
- [Build prospect lists and cold emails from the web](./build-prospect-lists-and-cold-emails-from-the-web.md)
- [Decide between points and cash for every trip](./decide-between-points-and-cash-for-every-trip.md)
- [Plan a last-minute business trip by phone](./plan-a-last-minute-business-trip-by-phone.md)
- [Book a private chef and plan a ski holiday](./book-a-private-chef-and-plan-a-ski-holiday.md)
