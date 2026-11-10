---
title: "Book flights and hotels, stopping at payment for approval"
slug: "book-flights-and-hotels-stopping-at-payment-for-approval"
summary: "Claude Cowork drove the browser through Claude in Chrome to book 8 flights and 5 hotels, filling traveler details and seats and pausing at payment for approval."
category: "Travel & Bookings"
agents:
  - name: "Claude Cowork"
    slug: "claude-cowork"
  - name: "Claude in Chrome"
    slug: "claude-in-chrome"
source_platform: "mikareyes.com"
source_date: "Undated"
source_url: "https://mikareyes.com/ai/how-to-book-flights-with-claude"
fetched_from: "https://agentusecases.ai/use-case/book-flights-and-hotels-stopping-at-payment-for-approval"
---

# Book flights and hotels, stopping at payment for approval

> Claude Cowork drove the browser through Claude in Chrome to book 8 flights and 5 hotels, filling traveler details and seats and pausing at payment for approval.

**Category:** Travel & Bookings  
**Agent:** Claude Cowork, Claude in Chrome  
**Source:** mikareyes.com · Undated

## What they did

Boris Cherny put his flight preferences in Cowork instructions and let Opus 4.7 book while he kept working in Claude Code. The guide's setup is Claude in Chrome with browser actions allowed, an Expedia connector, and a Flight Booker project. Claude researches three options, a person approves one, then Claude fills in traveler details, loyalty numbers and seats, and stops at payment.

## How it went

Cherny said Opus 4.7 one-shotted 8 flights and 5 hotels. The author has only tried the research step, not payment, and says Claude in Chrome is finicky.

## Worth knowing

Handing over card details is the risky part. The author suggests 1Password for agents rather than pasting credentials into instructions, and finds Expedia research works best before switching to the browser to book.

## Prompt

```text
Using Claude in Chrome, search for and fill in booking details for [number] flights and [number] hotels for my trip to [destination, dates, traveler names], selecting seats and room preferences as specified. Stop and show me the full itinerary and total cost before submitting any payment.
```

## Related use cases

- [Build a balloon-camel simulator for an LED Burning Man totem](./build-a-balloon-camel-simulator-for-an-led-burning-man-totem.md)
- [Repurpose a newsletter into social content](./repurpose-a-newsletter-into-social-content.md)
- [Do sales research and compare app to mock-ups](./do-sales-research-and-compare-app-to-mock-ups.md)
- [Decide between points and cash for every trip](./decide-between-points-and-cash-for-every-trip.md)
- [Book tickets, rides and services via Alexa+](./book-tickets-rides-and-services-via-alexa.md)
- [Buy movie tickets and set reminders from your calendar](./buy-movie-tickets-and-set-reminders-from-your-calendar.md)
