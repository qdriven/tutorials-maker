---
title: "Coordinate group trips with a personal assistant agent"
slug: "coordinate-group-trips-with-a-personal-assistant-agent"
summary: "A user runs an OpenClaw assistant with its own email and phone to coordinate group trip payments and signups, keeping it away from credit cards and bank accounts."
category: "Travel & Bookings"
agents:
  - name: "OpenClaw"
    slug: "openclaw"
source_platform: "HN"
source_date: "Oct 21, 2026"
source_url: "https://news.ycombinator.com/item?id=50181184"
fetched_from: "https://agentusecases.ai/use-case/coordinate-group-trips-with-a-personal-assistant-agent"
---

# Coordinate group trips with a personal assistant agent

> A user runs an OpenClaw assistant with its own email and phone to coordinate group trip payments and signups, keeping it away from credit cards and bank accounts.

**Category:** Travel & Bookings  
**Agent:** OpenClaw  
**Source:** HN · Oct 21, 2026

## What they did

The user treats an OpenClaw agent like a human personal assistant, giving it its own email address and phone number. They use it to coordinate trips of 4 to 15 people: splitting bills and collecting everyone's Venmo accounts, and polling the group on activity signups such as horseback riding. Anything involving credit cards or bank accounts is kept off limits.

## How it went

The user says the assistant takes the work out of organizing vacations. The comment gives no numbers, costs, or failures, so how reliably it handles payments and signups isn't described.

## Worth knowing

Set a hard rule on access: the agent gets its own identity, but nothing that could leak sensitive personal info, like cards or bank accounts.

## Prompt

```text
Help me coordinate a group trip to [destination] for [number] people around [dates]. Use your own email and phone to collect signups, track who has paid me back via [Venmo/Zelle/etc.], and send reminders with deadlines to [list of names and contacts]. Never handle credit cards or bank accounts, and show me every message and booking-related action before sending it. You're done when you've sent me a sheet showing who is confirmed and who owes what.
```

## Related use cases

- [Manage 18 agents from a Notion workspace](./manage-18-agents-from-a-notion-workspace.md)
- [Draft and publish blog posts with an SEO-aware agent](./draft-and-publish-blog-posts-with-an-seo-aware-agent.md)
- [Track sleep, notes, code and earthquakes with a personal agent](./track-sleep-notes-code-and-earthquakes-with-a-personal-agent.md)
- [Decide between points and cash for every trip](./decide-between-points-and-cash-for-every-trip.md)
- [Book a restaurant table with Alexa+](./book-a-restaurant-table-with-alexa.md)
- [Search venue sites for concerts to attend](./search-venue-sites-for-concerts-to-attend.md)
