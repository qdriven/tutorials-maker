---
title: "Find London tours and order groceries"
slug: "find-london-tours-and-order-groceries"
summary: "Operator found top-rated London walking tours on TripAdvisor, but its Instacart order went wrong by searching in the wrong city."
category: "Travel & Bookings"
agents:
  - name: "Operator"
    slug: "operator"
source_platform: "platformer.news"
source_date: "Undated"
source_url: "https://www.platformer.news/openai-operator-ai-agent-hands-on/"
fetched_from: "https://agentusecases.ai/use-case/find-london-tours-and-order-groceries"
---

# Find London tours and order groceries

> Operator found top-rated London walking tours on TripAdvisor, but its Instacart order went wrong by searching in the wrong city.

**Category:** Travel & Bookings  
**Agent:** Operator  
**Source:** platformer.news · Undated

## What they did

Casey Newton gave OpenAI's Operator, which drives its own browser, two prompts. For walking tours, it opened TripAdvisor, searched, and returned a list of tours with links. For Instacart, he only said to help buy groceries. It never asked where he lived, started searching in Des Moines, got stuck on location, and handed control back to him.

## How it went

The tour search took about a minute and worked. The Instacart task failed, and Newton finished it himself. Adding bananas, seltzer and raspberries took 15 minutes. Free ChatGPT gave a comparable tour list faster.

## Worth knowing

Operator uses its own browser, not yours, so it isn't logged in and doesn't know your location. State your city and store in the prompt. It was a $200/month ChatGPT Pro preview.

## Prompt

```text
Find the top-rated [type of tour, e.g. walking tours] in [city] on TripAdvisor for [date range], and list the five best with price, duration, rating and link. Then build an Instacart cart for [grocery list] delivering to [full address in the correct city]. Confirm the store location and delivery city with me before filling the cart, and stop before checkout to show me the total.
```

## Related use cases

- [Find a toy and start checkout with Operator](./find-a-toy-and-start-checkout-with-operator.md)
- [Research sales leads with Operator](./research-sales-leads-with-operator.md)
- [Contact OpenAI support on the user's behalf](./contact-openai-support-on-the-user-s-behalf.md)
- [Decide between points and cash for every trip](./decide-between-points-and-cash-for-every-trip.md)
- [Plan a last-minute business trip by phone](./plan-a-last-minute-business-trip-by-phone.md)
- [Book a private chef and plan a ski holiday](./book-a-private-chef-and-plan-a-ski-holiday.md)
