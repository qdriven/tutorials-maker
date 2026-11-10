---
title: "Book flights with AI trip planners"
slug: "book-flights-with-ai-trip-planners"
summary: "A blog tested five AI trip planners on completing flight bookings; Kayak's agent finished through its own checkout, while ChatGPT Operator only partly completed bookings via form-filling and needed manual cancellation."
category: "Travel & Bookings"
agents:
  - name: "Operator"
    slug: "operator"
source_platform: "travelanywhere.blog"
source_date: "Undated"
source_url: "https://www.travelanywhere.blog/blog/ai-trip-planners-that-book-flights-tested"
fetched_from: "https://agentusecases.ai/use-case/book-flights-with-ai-trip-planners"
---

# Book flights with AI trip planners

> A blog tested five AI trip planners on completing flight bookings; Kayak's agent finished through its own checkout, while ChatGPT Operator only partly completed bookings via form-filling and needed manual cancellation.

**Category:** Travel & Bookings  
**Agent:** Operator  
**Source:** travelanywhere.blog · Undated

## What they did

The blog ran five AI trip planners through the same scenarios: a same-week domestic booking, a multi-city international trip, and a premium cabin request. Kayak's agent negotiated the itinerary in conversation, then handed off to Kayak's own checkout. For ChatGPT Operator, the testers pointed it at United.com. It filled in the search and passenger details, then paused at payment for the user to authorize.

## How it went

Kayak completed the booking, though changes and cancellations go through its support flow. Operator failed in two of three runs because of session timeouts, CAPTCHAs and price changes. Gemini and Mindtrip only redirected.

## Worth knowing

The blog also sells one of the tools it ranks first, and it gives no per-run timing. Kayak fares may carry a markup, which the blog puts at $30–$80 on economy international.

## Prompt

```text
Find the best flight from [origin] to [destination] departing [date] and returning [date], with a budget of [amount] and a preference for [nonstop or cheapest]. Compare at least three options on [airline or booking site] and tell me which you recommend. Pause before entering passenger details or payment and show me exactly what you are about to submit, and never complete a purchase without my confirmation.
```

## Related use cases

- [Find a toy and start checkout with Operator](./find-a-toy-and-start-checkout-with-operator.md)
- [Research sales leads with Operator](./research-sales-leads-with-operator.md)
- [Contact OpenAI support on the user's behalf](./contact-openai-support-on-the-user-s-behalf.md)
- [Decide between points and cash for every trip](./decide-between-points-and-cash-for-every-trip.md)
- [Plan a last-minute business trip by phone](./plan-a-last-minute-business-trip-by-phone.md)
- [Book a private chef and plan a ski holiday](./book-a-private-chef-and-plan-a-ski-holiday.md)
