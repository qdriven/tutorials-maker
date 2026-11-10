---
title: "Book restaurant reservations end to end on real sites"
slug: "book-restaurant-reservations-end-to-end-on-real-sites"
summary: "The poster built agents that find a restaurant, fill out the reservation form and confirm the booking on a real site, handling dynamic elements and bot detection."
category: "Travel & Bookings"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_platform: "Reddit"
source_date: "Mar 18, 2026"
source_url: "https://www.reddit.com/r/openclaw/comments/1rx218m/update_got_ai_agents_to_successfully_book"
fetched_from: "https://agentusecases.ai/use-case/book-restaurant-reservations-end-to-end-on-real-sites"
---

# Book restaurant reservations end to end on real sites

> The poster built agents that find a restaurant, fill out the reservation form and confirm the booking on a real site, handling dynamic elements and bot detection.

**Category:** Travel & Bookings  
**Agent:** custom-built or unnamed agent  
**Source:** Reddit · Mar 18, 2026

## What they did

The poster says their agents completed restaurant booking on the live site rather than a scripted demo: the agent found a restaurant, filled the reservation form, and confirmed it. They describe the setup as a stealth browser with persistent profiles and fingerprinting, residential proxies, and CAPTCHA-solving; they also say it still needed manual setup and was not yet a packaged product.

## How it went

They report the flow worked end to end on real sites and could get through dynamic elements and bot detection. A stated limitation was payments: their restaurant tests avoided it because booking did not require payment, and Uber used a saved card.

## Worth knowing

The main catch is that the current stack was still manual, with separate pieces duct-taped together rather than something an OpenClaw user could just install and run.

## Prompt

```text
Find a [cuisine] restaurant in [city] with a table for [party size] on [date] around [time], rated at least [rating], and show me your top three options. After I pick one, go through its reservation page and fill in the form with my name [name], phone [phone] and email [email]. Pause before submitting and show me the exact details, then once I approve, submit and give me the confirmation number or screenshot.
```

## Related use cases

- [Decide between points and cash for every trip](./decide-between-points-and-cash-for-every-trip.md)
- [Book flights with credits and manage reservations](./book-flights-with-credits-and-manage-reservations.md)
- [Research hotels for a 14-day Japan trip](./research-hotels-for-a-14-day-japan-trip.md)
- [Fix wrong-day flight reservations between bots](./fix-wrong-day-flight-reservations-between-bots.md)
- [Save the best local restaurants as a Google Maps list](./save-the-best-local-restaurants-as-a-google-maps-list.md)
- [Book a flight end-to-end through an agent](./book-a-flight-end-to-end-through-an-agent.md)
