---
title: "Build a booking app with calendar and Stripe sandbox"
slug: "build-a-booking-app-with-calendar-and-stripe-sandbox"
summary: "A reviewer had Manus build a live booking app in about 40 minutes with calendar, Stripe sandbox and test data; email was inconsistent and mobile layout needed manual fixes."
category: "Software & DevOps"
agents:
  - name: "Manus"
    slug: "manus"
source_platform: "emergent.sh"
source_date: "Undated"
source_url: "https://emergent.sh/learn/manus-ai-review"
fetched_from: "https://agentusecases.ai/use-case/build-a-booking-app-with-calendar-and-stripe-sandbox"
---

# Build a booking app with calendar and Stripe sandbox

> A reviewer had Manus build a live booking app in about 40 minutes with calendar, Stripe sandbox and test data; email was inconsistent and mobile layout needed manual fixes.

**Category:** Software & DevOps  
**Agent:** Manus  
**Source:** emergent.sh · Undated

## What they did

The reviewer gave Manus a single plain-English prompt. It asked for a client booking app where visitors pick a service and a time slot, pay a deposit through Stripe, and get an email confirmation. They then closed the tab. Manus worked in its cloud sandbox and deployed the app without further input.

## How it went

After about 40 minutes it returned a live app with a booking calendar, a Stripe sandbox and test reservations in a database. The confirmation email fired inconsistently, and the mobile layout needed manual fixes.

## Worth knowing

The build used roughly 1,000 credits in one pass, with no live alert as the meter climbed. Plans start at $20 a month for 4,000 credits.

## Prompt

```text
Build me a live booking app for [type of business, e.g. a yoga studio] with a calendar for picking [service/time slots], Stripe in sandbox/test mode only, and some realistic test data. Deploy it and send me the link, plus a short list of what works and what doesn't, including confirmation emails and mobile layout. Pause and ask me before connecting any real payment keys or sending any real emails.
```

## Related use cases

- [Compile journalist lists and search apartment listings](./compile-journalist-lists-and-search-apartment-listings.md)
- [Generate slide decks from titles and a branded template](./generate-slide-decks-from-titles-and-a-branded-template.md)
- [Produce competitor research reports and build a landing page](./produce-competitor-research-reports-and-build-a-landing-page.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Click through apps to verify its own work](./click-through-apps-to-verify-its-own-work.md)
- [Point a computer-using bot at any repo](./point-a-computer-using-bot-at-any-repo.md)
