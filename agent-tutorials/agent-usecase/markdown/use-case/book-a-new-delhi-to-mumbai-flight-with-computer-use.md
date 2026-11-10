---
title: "Book a New Delhi to Mumbai flight with computer use"
slug: "book-a-new-delhi-to-mumbai-flight-with-computer-use"
summary: "The author ran Claude's computer use in a Docker demo to book a flight from New Delhi to Mumbai; Claude opened Firefox and started the search, but the outcome isn't shown."
category: "Travel & Bookings"
agents:
  - name: "Claude computer use"
    slug: "claude-computer-use"
source_platform: "rittikajindal.medium.com"
source_date: "Undated"
source_url: "https://rittikajindal.medium.com/my-first-hand-experience-with-claudes-computer-use-when-ai-takes-control-a0f78445a6c7"
fetched_from: "https://agentusecases.ai/use-case/book-a-new-delhi-to-mumbai-flight-with-computer-use"
---

# Book a New Delhi to Mumbai flight with computer use

> The author ran Claude's computer use in a Docker demo to book a flight from New Delhi to Mumbai; Claude opened Firefox and started the search, but the outcome isn't shown.

**Category:** Travel & Bookings  
**Agent:** Claude computer use  
**Source:** rittikajindal.medium.com · Undated

## What they did

The author ran Anthropic's computer use demo in Docker with an API key and prompted Claude to book a New Delhi to Mumbai flight for 1 December 2024. Claude opened Firefox and went to makemytrip.com. It stalled on a sign-in popup until the author added a prompt telling it to close it. It then filled in the cities and navigated the calendar.

## How it went

Claude did not complete the booking. It got through the search form, including cities and date, after the popup was cleared and an error was retried. The author calls this a beta limitation.

## Worth knowing

Claude struggled with the popup and needed a follow-up prompt from the author to get past it. Anthropic advises a sandboxed container and human sign-off on any financial transaction.

## Prompt

```text
Open a browser and search for flights from [origin city] to [destination city] on [date], and compare the [number] cheapest and the [number] fastest options in a short list with airline, times and price. Stop at the passenger details page without entering anything. Show me your top pick and wait for my go-ahead before filling in any details, paying or submitting anything.
```

## Related use cases

- [Fill out a Form 1040 with computer use](./fill-out-a-form-1040-with-computer-use.md)
- [Find vegetarian restaurants and save notes via computer use](./find-vegetarian-restaurants-and-save-notes-via-computer-use.md)
- [Build a 52-node n8n workflow](./build-a-52-node-n8n-workflow.md)
- [Decide between points and cash for every trip](./decide-between-points-and-cash-for-every-trip.md)
- [Book a restaurant table with Alexa+](./book-a-restaurant-table-with-alexa.md)
- [Search venue sites for concerts to attend](./search-venue-sites-for-concerts-to-attend.md)
