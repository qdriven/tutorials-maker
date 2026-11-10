---
title: "Buy concert tickets with a browser agent (failed)"
slug: "buy-concert-tickets-with-a-browser-agent-failed"
summary: "An agent was given two general-admission Ticketmaster tickets but got stuck on the seating map and the cart expired twice."
category: "Travel & Bookings"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_platform: "Reddit"
source_date: "Undated"
source_url: "https://www.reddit.com/r/AI_Agents/comments/1vnydav/my_agent_spent_40_minutes_on_a_task_that_takes_me"
fetched_from: "https://agentusecases.ai/use-case/buy-concert-tickets-with-a-browser-agent-failed"
---

# Buy concert tickets with a browser agent (failed)

> An agent was given two general-admission Ticketmaster tickets but got stuck on the seating map and the cart expired twice.

**Category:** Travel & Bookings  
**Agent:** custom-built or unnamed agent  
**Source:** Reddit · Undated

## What they did

The poster tried agent-browser on Ticketmaster as a class side project, giving it the simple goal of buying two general-admission tickets. They say it handled token use better than a Playwright MCP setup, but once Ticketmaster showed captchas, modals, and the seating map, the agent kept retrying the same actions, including reopening one popup 11 times, while the person watched and babysat retries.

## How it went

It failed: after about 40 minutes, the agent still had not bought the tickets, and the cart hold expired twice. The poster ended with no tickets and said the manual flow still wins on this site.

## Worth knowing

The main catch was site hostility, not cost: Ticketmaster's captchas, shifting seating map, and expiring hold timer broke the run even though token use seemed fine.

## Prompt

```text
Help me buy [number] general-admission tickets for [event] at [venue] on [date] on [ticket site], with a maximum price of [price] each. Navigate to the listing and get the tickets into my cart, and tell me right away if you get stuck on a seating map or a queue. Stop before payment and show me the cart, total and fees so I can check out myself before the timer expires.
```

## Related use cases

- [Decide between points and cash for every trip](./decide-between-points-and-cash-for-every-trip.md)
- [Book flights with credits and manage reservations](./book-flights-with-credits-and-manage-reservations.md)
- [Research hotels for a 14-day Japan trip](./research-hotels-for-a-14-day-japan-trip.md)
- [Fix wrong-day flight reservations between bots](./fix-wrong-day-flight-reservations-between-bots.md)
- [Save the best local restaurants as a Google Maps list](./save-the-best-local-restaurants-as-a-google-maps-list.md)
- [Book a flight end-to-end through an agent](./book-a-flight-end-to-end-through-an-agent.md)
