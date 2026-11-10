---
title: "Book travel and find restaurant reservations"
slug: "book-travel-and-find-restaurant-reservations"
summary: "Claude books flights and hotels in a company travel system, and a prompt finds top-rated restaurants, identifies their reservation systems and checks Saturday 6pm availability for two."
category: "Travel & Bookings"
agents:
  - name: "Claude in Chrome"
    slug: "claude-in-chrome"
source_platform: "technicallycurious.substack.com"
source_date: "Undated"
source_url: "https://technicallycurious.substack.com/p/have-claude-browse-the-web-for-you"
fetched_from: "https://agentusecases.ai/use-case/book-travel-and-find-restaurant-reservations"
---

# Book travel and find restaurant reservations

> Claude books flights and hotels in a company travel system, and a prompt finds top-rated restaurants, identifies their reservation systems and checks Saturday 6pm availability for two.

**Category:** Travel & Bookings  
**Agent:** Claude in Chrome  
**Source:** technicallycurious.substack.com · Undated

## What they did

Claude drives a Chrome browser through Chrome MCP. Claire has it book her flights and hotels in her company's travel booking system. For restaurants, the prompt has Claude use Exa to find the top 3 restaurants in a city by Google reviews. It works out which reservation system each one uses, such as OpenTable, Resy or Tock, then checks availability for 2 at 6pm Saturday in the browser.

## How it went

The source gives no results or timings for either use. It only says the travel booking saves Claire from clicking through the system herself, and the restaurant prompt is offered as a starter example.

## Worth knowing

Browse from a separate Chrome profile with no banking or email logins, and require approval for irreversible actions, because of prompt injection risk.

## Prompt

```text
Book my flights and hotel for [destination and dates] in our company travel system, then find top-rated restaurants near [location], identify how each takes reservations, and check availability for [party size] at [day and time]. Show me the itinerary and restaurant options, and pause before confirming any bookings or payments.
```

## Related use cases

- [Build a balloon-camel simulator for an LED Burning Man totem](./build-a-balloon-camel-simulator-for-an-led-burning-man-totem.md)
- [Negotiate a billing credit from AT&T](./negotiate-a-billing-credit-from-at-t.md)
- [Build prospect lists and cold emails from the web](./build-prospect-lists-and-cold-emails-from-the-web.md)
- [Decide between points and cash for every trip](./decide-between-points-and-cash-for-every-trip.md)
- [Plan a last-minute business trip by phone](./plan-a-last-minute-business-trip-by-phone.md)
- [Book a private chef and plan a ski holiday](./book-a-private-chef-and-plan-a-ski-holiday.md)
