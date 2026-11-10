---
title: "Find the cheapest flight with ChatGPT"
slug: "find-the-cheapest-flight-with-chatgpt"
summary: "A user used ChatGPT in their flight search workflow and compared its results with other tools; it did not complete the booking."
category: "Travel & Bookings"
agents:
  - name: "ChatGPT"
    slug: "chatgpt"
source_platform: "Reddit"
source_date: "Undated"
source_url: "https://www.reddit.com/r/ChatGPT/comments/1qyh4z6/i_asked_chatgpt_to_find_me_the_cheapest_flight"
fetched_from: "https://agentusecases.ai/use-case/find-the-cheapest-flight-with-chatgpt"
---

# Find the cheapest flight with ChatGPT

> A user used ChatGPT in their flight search workflow and compared its results with other tools; it did not complete the booking.

**Category:** Travel & Bookings  
**Agent:** ChatGPT  
**Source:** Reddit · Undated

## What they did

The poster asked ChatGPT to find flights from Shanghai to Tokyo across platforms and list flight numbers, departure times, prices, luggage allowances, and the cheapest option. ChatGPT gave a route overview and admitted it could not access live prices, so the user also tried Manus to browse airline sites and Sheet0 to autonomously extract the same fields into a spreadsheet; the user compared the outputs and booked separately.

## How it went

No tool completed the whole job alone: ChatGPT was useful for planning, Manus could pull site data, and Sheet0 returned a structured sheet. In comments, the poster said Gemini with Google Flights felt more reliable, though it surfaced significantly fewer results than ChatGPT and Sheet0.

## Worth knowing

The main catch was that ChatGPT itself could not access real-time flight databases or prices, so the workflow still required other tools and a separate booking step.

## Prompt

```text
Find the cheapest flight from [origin] to [destination] departing [date or range] and returning [date], with at most [number] stops and [other constraints]. Compare at least three sources and give me the top 3 options with total price including bags, times, and booking links. Do not book or enter any payment details; stop and show me the options.
```

## Related use cases

- [Generate LEGO CAD models in LDraw with AI agents](./generate-lego-cad-models-in-ldraw-with-ai-agents.md)
- [Compile and filter apartment listings](./compile-and-filter-apartment-listings.md)
- [Run a 10-agent SEO content pipeline](./run-a-10-agent-seo-content-pipeline.md)
- [Decide between points and cash for every trip](./decide-between-points-and-cash-for-every-trip.md)
- [Book a restaurant table with Alexa+](./book-a-restaurant-table-with-alexa.md)
- [Search venue sites for concerts to attend](./search-venue-sites-for-concerts-to-attend.md)
