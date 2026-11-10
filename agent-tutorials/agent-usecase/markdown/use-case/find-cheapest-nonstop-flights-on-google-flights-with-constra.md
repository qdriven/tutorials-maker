---
title: "Find cheapest nonstop flights on Google Flights with constraints"
slug: "find-cheapest-nonstop-flights-on-google-flights-with-constra"
summary: "ChatGPT Agent searched Google Flights for the cheapest nonstop flights this year, 4 to 10 day trips, excluding Boeing 737 MAX, and succeeded."
category: "Travel & Bookings"
agents:
  - name: "ChatGPT Agent"
    slug: "chatgpt-agent"
source_platform: "Reddit"
source_date: "Jul 24, 2025"
source_url: "https://www.reddit.com/r/OpenAI/comments/1m8k3am"
fetched_from: "https://agentusecases.ai/use-case/find-cheapest-nonstop-flights-on-google-flights-with-constra"
---

# Find cheapest nonstop flights on Google Flights with constraints

> ChatGPT Agent searched Google Flights for the cheapest nonstop flights this year, 4 to 10 day trips, excluding Boeing 737 MAX, and succeeded.

**Category:** Travel & Bookings  
**Agent:** ChatGPT Agent  
**Source:** Reddit · Jul 24, 2025

## What they did

A commenter used ChatGPT Agent on Google Flights to search for the cheapest flights available that year while enforcing three constraints at once: nonstop only, trip lengths of 4 to 10 days, and no Boeing 737 MAX aircraft. The agent handled the web UI itself and, after scrolling broke a Google dropdown’s CSS height, it still managed to work around the interface problem without extra steps described from the user.

## How it went

It took a while, but the commenter said it performed much better than expected and succeeded in finding matching flights. No prices, routes, or comparison numbers were given.

## Worth knowing

The main catch was speed and brittle web automation: the run took a while, and the standout detail was that it had to overcome a Google Flights UI/CSS glitch mid-task.

## Prompt

```text
Search Google Flights for the cheapest nonstop flights from [origin airport] to [destination] at any time in [year or date range], for trips lasting [min] to [max] days. Exclude [aircraft type or airline, if any]. Give me a table of the 5 cheapest options with dates, price, airline and aircraft, then stop. Do not book anything or enter payment details.
```

## Related use cases

- [Plan a family trip and pre-fill bookings](./plan-a-family-trip-and-pre-fill-bookings.md)
- [Collate WHO data into a multi-tab spreadsheet](./collate-who-data-into-a-multi-tab-spreadsheet.md)
- [Book appointments and send emails and messages](./book-appointments-and-send-emails-and-messages.md)
- [Decide between points and cash for every trip](./decide-between-points-and-cash-for-every-trip.md)
- [Book tickets, rides and services via Alexa+](./book-tickets-rides-and-services-via-alexa.md)
- [Buy movie tickets and set reminders from your calendar](./buy-movie-tickets-and-set-reminders-from-your-calendar.md)
