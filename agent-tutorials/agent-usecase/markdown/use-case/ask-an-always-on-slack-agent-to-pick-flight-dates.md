---
title: "Ask an always-on Slack agent to pick flight dates"
slug: "ask-an-always-on-slack-agent-to-pick-flight-dates"
summary: "A reviewer connected Dots to Slack and asked it to use its own computer to choose flight dates; it was slow and had not picked dates after a minute."
category: "Travel & Bookings"
agents:
  - name: "Dots"
    slug: "dots"
  - name: "Codex"
    slug: "codex"
source_platform: "promptadvisers.com"
source_date: "Undated"
source_url: "https://www.promptadvisers.com/openai-dots-review"
fetched_from: "https://agentusecases.ai/use-case/ask-an-always-on-slack-agent-to-pick-flight-dates"
---

# Ask an always-on Slack agent to pick flight dates

> A reviewer connected Dots to Slack and asked it to use its own computer to choose flight dates; it was slow and had not picked dates after a minute.

**Category:** Travel & Bookings  
**Agent:** Dots, Codex  
**Source:** promptadvisers.com · Undated

## What they did

Mark Kashef connected Dots to Slack in about three clicks: authenticate, pick a workspace, grant access. He then asked it to find a Montreal to Johannesburg flight using its own computer. The only sign of activity was a "thinking" label, so he opened the computer manually and saw it on the Emirates site.

## How it went

A minute in, Dots still hadn't picked dates. A normal Codex session would have produced a short list by then. He concluded it isn't worth switching to.

## Worth knowing

Dots gives no progress feedback, so you have to open its computer yourself to see what it's doing. Connections made in Codex don't carry over and must be redone.

## Prompt

```text
Connect to my Slack workspace and help me pick flight dates for a trip from [origin] to [destination] sometime between [date range]. Use your own computer to check fares across a few days and compare prices for trips of [number] nights. Finish by posting the three best date options with prices and links in Slack, and do not book or pay for anything without showing me the details and getting my approval.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Catch and prepare an unsent invoice for approval](./catch-and-prepare-an-unsent-invoice-for-approval.md)
- [Spend leftover AI quota on reviewable PRs](./spend-leftover-ai-quota-on-reviewable-prs.md)
- [Decide between points and cash for every trip](./decide-between-points-and-cash-for-every-trip.md)
- [Book a restaurant table with Alexa+](./book-a-restaurant-table-with-alexa.md)
- [Book a private chef and plan a ski holiday](./book-a-private-chef-and-plan-a-ski-holiday.md)
