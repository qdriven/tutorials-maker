---
title: "Find good eBay deals on a schedule"
slug: "find-good-ebay-deals-on-a-schedule"
summary: "A community developer built an eBay deal finder where Firecrawl scrapes listings and Hermes runs on a schedule to judge whether each is a good deal against the user's criteria."
category: "Shopping & Errands"
agents:
  - name: "Hermes Agent"
    slug: "hermes-agent"
source_platform: "firecrawl.dev"
source_date: "Undated"
source_url: "https://www.firecrawl.dev/blog/hermes-agent"
fetched_from: "https://agentusecases.ai/use-case/find-good-ebay-deals-on-a-schedule"
---

# Find good eBay deals on a schedule

> A community developer built an eBay deal finder where Firecrawl scrapes listings and Hermes runs on a schedule to judge whether each is a good deal against the user's criteria.

**Category:** Shopping & Errands  
**Agent:** Hermes Agent  
**Source:** firecrawl.dev · Undated

## What they did

The source mentions this only briefly. A community developer built an eBay deal finder in which Firecrawl scrapes product listings and prices. Hermes runs on a schedule, pulls the latest data, and judges each listing against the user's criteria. Hermes has a built-in cron scheduler, and it can send results to messaging apps such as Telegram. The full build is in a linked video.

## How it went

The source gives no results, numbers, or limitations for the deal finder. It only describes the setup in a sentence or two.

## Worth knowing

Hermes cron has no daily run limit, so the only cost is your API budget. Firecrawl's free tier gives 1,000 credits a month.

## Prompt

```text
Every [number] hours, search eBay for [item or model] and scrape the new listings with [Firecrawl or another scraper]. Judge each one against my criteria: max price [amount including shipping], condition [condition], seller rating above [number], and typical market price around [amount]. Send me only the listings that look like good deals on [Telegram / other channel], each with a one-sentence reason and the link; do not bid or buy anything.
```

## Related use cases

- [Set up a home chat server and manage accounts from your phone](./set-up-a-home-chat-server-and-manage-accounts-from-your-phon.md)
- [Create a full music video with lyrics, music and visuals](./create-a-full-music-video-with-lyrics-music-and-visuals.md)
- [Give an agent a phone number to make and answer calls](./give-an-agent-a-phone-number-to-make-and-answer-calls.md)
- [Order groceries online with a local LLM skill](./order-groceries-online-with-a-local-llm-skill.md)
- [Build an Instacart list for a charcuterie board](./build-an-instacart-list-for-a-charcuterie-board.md)
- [Run an online store's inventory, listings and photos](./run-an-online-store-s-inventory-listings-and-photos.md)
