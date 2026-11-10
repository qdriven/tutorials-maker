---
title: "Plan a trip and book flight, hotel and shuttle with an always-on agent"
slug: "plan-a-trip-and-book-flight-hotel-and-shuttle-with-an-always"
summary: "A user had Dots plan a trip and remind them to book the shuttle; the agent filled booking forms but kept asking for confirmation and wouldn't enter 2FA codes, so it only got partway."
category: "Travel & Bookings"
agents:
  - name: "Dots"
    slug: "dots"
source_platform: "HN"
source_date: "Sep 30, 2026"
source_url: "https://news.ycombinator.com/item?id=49904198"
fetched_from: "https://agentusecases.ai/use-case/plan-a-trip-and-book-flight-hotel-and-shuttle-with-an-always"
---

# Plan a trip and book flight, hotel and shuttle with an always-on agent

> A user had Dots plan a trip and remind them to book the shuttle; the agent filled booking forms but kept asking for confirmation and wouldn't enter 2FA codes, so it only got partway.

**Category:** Travel & Bookings  
**Agent:** Dots  
**Source:** HN · Sep 30, 2026

## What they did

The user asked Dots to work out a trip, then booked the flight and hotel themselves. The agent noticed the shuttle was missing and offered to book it. It reopened the site, rechecked the agreed details, and filled the booking form on its cloud computer. The user confirmed repeatedly. They also tried writing broad permission rules.

## How it went

The shuttle booking stalled because the agent kept asking for confirmation after filling the form. It would not enter emailed 2FA codes, and the permissions checker rejected most broad rules; only two were accepted. The user graded it B-.

## Worth knowing

Expect to enter 2FA codes yourself, which breaks chains like flights to Uber, since Uber triggers one every login; the permissions rule checker also rejected broad delegation rules.

## Prompt

```text
Plan a trip to [destination] from [date] to [date] for [number] travelers with a budget of [amount]. Find flight, hotel, and airport shuttle options, give me a short comparison, and remind me on [day] to book the shuttle. Fill in booking forms as far as you can, but pause and show me everything before any payment or submission, and tell me exactly what you need from me for 2FA steps.
```

## Related use cases

- [Research and help rebook a flight with an always-on agent](./research-and-help-rebook-a-flight-with-an-always-on-agent.md)
- [Monitor public documents for changes affecting teaching materials](./monitor-public-documents-for-changes-affecting-teaching-mate.md)
- [Ask an always-on Slack agent to pick flight dates](./ask-an-always-on-slack-agent-to-pick-flight-dates.md)
- [Decide between points and cash for every trip](./decide-between-points-and-cash-for-every-trip.md)
- [Research hotels for a 14-day Japan trip](./research-hotels-for-a-14-day-japan-trip.md)
- [Book a private chef and plan a ski holiday](./book-a-private-chef-and-plan-a-ski-holiday.md)
