---
title: "Build a booking and payment app for tattoo artists"
slug: "build-a-booking-and-payment-app-for-tattoo-artists"
summary: "A former programmer used Replit Agent over a weekend to build a booking app with calendar, Google OAuth, Stripe deposits and notifications, though time zones and UI needed back-and-forth."
category: "Software & DevOps"
agents:
  - name: "Replit Agent"
    slug: "replit-agent"
source_platform: "iliashatzis.substack.com"
source_date: "Undated"
source_url: "https://iliashatzis.substack.com/p/from-zero-to-working-prototype-in"
fetched_from: "https://agentusecases.ai/use-case/build-a-booking-and-payment-app-for-tattoo-artists"
---

# Build a booking and payment app for tattoo artists

> A former programmer used Replit Agent over a weekend to build a booking app with calendar, Google OAuth, Stripe deposits and notifications, though time zones and UI needed back-and-forth.

**Category:** Software & DevOps  
**Agent:** Replit Agent  
**Source:** iliashatzis.substack.com · Undated

## What they did

On Thursday night he opened a blank repl and typed one paragraph asking for a Calendly-style calendar, Google OAuth, Stripe deposits and Postmark notifications. Replit Agent sketched the backend, wired Stripe, set up calendar integration and scaffolded a React front end. On Saturday he went back and forth with it on time-zone math and UI polish, and debugged in plain English.

## How it went

He ended up with a working prototype: client booking, artist dashboards, onboarding, conflict handling and Postmark confirmation emails. Stripe is connected but deposits are still on the roadmap. The app hasn't launched.

## Worth knowing

The agent sometimes rewrites working code for no reason, or breaks things and claims it fixed them, so check each change.

## Prompt

```text
Build a booking app for [type of small business, e.g. tattoo artists] with a calendar, Google sign-in, and deposit payments through Stripe in test mode. Include email or text notifications and handle time zones correctly. You're done when I can book a test slot end to end. Pause and show me before connecting live payments or sending any real messages.
```

## Related use cases

- [Build a searchable map of funded companies](./build-a-searchable-map-of-funded-companies.md)
- [Build a first real project with Replit Agent](./build-a-first-real-project-with-replit-agent.md)
- [Build an RFP analysis tool](./build-an-rfp-analysis-tool.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Write, review and document code across a product's PRs](./write-review-and-document-code-across-a-product-s-prs.md)
- [Fix a Linux kernel memory management problem with Claude](./fix-a-linux-kernel-memory-management-problem-with-claude.md)
