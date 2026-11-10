---
title: "Plan and re-plan a Japan trip with Claude Code"
slug: "plan-and-re-plan-a-japan-trip-with-claude-code"
summary: "A traveler used Claude Code to plan a 14-day Japan trip, build a private offline trip app with booking QR codes and train guides, and re-plan days from a phone."
category: "Travel & Bookings"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "Reddit"
source_date: "Undated"
source_url: "https://www.reddit.com/r/ClaudeAI/comments/1x6ng3u/how_i_used_claude_code_as_a_travel_assistant_for"
fetched_from: "https://agentusecases.ai/use-case/plan-and-re-plan-a-japan-trip-with-claude-code"
---

# Plan and re-plan a Japan trip with Claude Code

> A traveler used Claude Code to plan a 14-day Japan trip, build a private offline trip app with booking QR codes and train guides, and re-plan days from a phone.

**Category:** Travel & Bookings  
**Agent:** Claude Code  
**Source:** Reddit · Undated

## What they did

The traveler kept the trip in an Obsidian vault and had Claude Code plan by asking one question at a time, logging recommendations, rejected options, and friend tips, then doing "run checks" over each city’s days. Claude also built a private offline trip web app as one encrypted HTML file on Vercel with day cards, booking QR codes, train guides, taxi cards, and lists; during the trip, the same desktop Claude session was left running at home and remotely controlled from a phone to retime days, update the app, and move calendar events.

## How it went

It supported a 14-day Kyoto-Hakone-Tokyo trip and could re-plan a day and redeploy the app in a couple of minutes. One on-the-fly stop was added without checking the venue’s own site and turned out to be closed.

## Worth knowing

Open the app once online before you need it offline; the post says a service worker cached the single HTML page, and internet was only needed again to refresh updates.

## Prompt

```text
Help me plan a [number]-day trip to [destination] from [dates] with a budget of [amount] and these interests: [interests]. Build a simple private offline trip web page in [folder] with a day-by-day itinerary, booking confirmations and QR codes I paste in, and transit guides. Make it easy to ask you to re-plan a single day later; don't book anything, and stop once I can open the page on my phone.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Index a newsletter archive and repurpose writing](./index-a-newsletter-archive-and-repurpose-writing.md)
- [Build a company structure with Claude Code agents](./build-a-company-structure-with-claude-code-agents.md)
- [Plan a family trip and pre-fill bookings](./plan-a-family-trip-and-pre-fill-bookings.md)
- [Book tickets, rides and services via Alexa+](./book-tickets-rides-and-services-via-alexa.md)
- [Book a private chef and plan a ski holiday](./book-a-private-chef-and-plan-a-ski-holiday.md)
