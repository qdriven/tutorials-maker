---
title: "Run a Xianyu resale side business with an AI agent"
slug: "run-a-xianyu-resale-side-business-with-an-ai-agent"
summary: "The author gave an agent about 20 Xianyu listings; it handled buyer messages and price changes, even overnight, and sold an old Xbox 360 within hours during a 15-day test. · Nov 5, 2026"
category: "Shopping & Errands"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_platform: "zyentor.com"
source_date: "Nov 5, 2026 · Submitted by from search gap: 赚钱"
source_url: "https://www.zyentor.com/news/6562"
fetched_from: "https://agentusecases.ai/use-case/run-a-xianyu-resale-side-business-with-an-ai-agent"
---

# Run a Xianyu resale side business with an AI agent

> The author gave an agent about 20 Xianyu listings; it handled buyer messages and price changes, even overnight, and sold an old Xbox 360 within hours during a 15-day test. · Nov 5, 2026

**Category:** Shopping & Errands  
**Agent:** custom-built or unnamed agent  
**Source:** zyentor.com · Nov 5, 2026 · Submitted by from search gap: 赚钱

## What they did

Xianyu has no official API, so the author had Claude Code build browser automation that works the web version like a person. It has three parts. One scans unread messages every few dozen seconds and sorts them. One writes replies in the author's tone. One changes prices and haggles within set limits. The author still packed and shipped the orders.

## How it went

Over 15 days it closed 27 orders, about half again as many as the previous month. Response time fell to under 40 seconds. It can't take photos, write listings, or judge what to buy.

## Worth knowing

Set a floor price, a cap of 5% per price cut, and at most two changes a day per item. Try it on a spare account, since the platform may throttle automation.

## Prompt

```text
Help me manage my [Xianyu or other resale marketplace] listings. Here are my [number] listings: [list or link]. Reply to buyer questions politely using the item details, and propose price changes when an item has had no interest for [number] days. Do not accept any offer, change any price or send a message with a commitment until you show me the draft and I approve; give me a daily summary of activity.
```

## Related use cases

- [Order groceries online with a local LLM skill](./order-groceries-online-with-a-local-llm-skill.md)
- [Shop for Raspberry Pi parts on Amazon with Claude](./shop-for-raspberry-pi-parts-on-amazon-with-claude.md)
- [Auto-buy items when the price hits a target](./auto-buy-items-when-the-price-hits-a-target.md)
- [Hunt high-value Pokémon cards on eBay overnight](./hunt-high-value-pok-mon-cards-on-ebay-overnight.md)
- [Order family groceries from fridge contents](./order-family-groceries-from-fridge-contents.md)
- [Find good eBay deals on a schedule](./find-good-ebay-deals-on-a-schedule.md)
