---
title: "Research purchases for delivered price and working coupons"
slug: "research-purchases-for-delivered-price-and-working-coupons"
summary: "The poster built an agent that compares real delivered prices, tests every coupon it finds, reads owner feedback and goes through checkout without ordering."
category: "Shopping & Errands"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_platform: "Reddit"
source_date: "Undated"
source_url: "https://www.reddit.com/r/SideProject/comments/1wukkk1/built_an_ai_agent_that_researches_my_purchases"
fetched_from: "https://agentusecases.ai/use-case/research-purchases-for-delivered-price-and-working-coupons"
---

# Research purchases for delivered price and working coupons

> The poster built an agent that compares real delivered prices, tests every coupon it finds, reads owner feedback and goes through checkout without ordering.

**Category:** Shopping & Errands  
**Agent:** custom-built or unnamed agent  
**Source:** Reddit · Undated

## What they did

The poster runs this self-hosted on a home server with a Claude subscription. Claude Code orchestrates parallel subagents to check review sites and YouTube, read Reddit, analyze video transcripts and frames, find listings, and verify checkout; before showing the report, an audit step sends the agent back if key checks like Amazon or owner reviews are missing.

## How it went

It condenses the shopping research the poster used to do by hand into one report focused on delivered price, valid codes, merchant fit for Finland, and owner feedback. The post presents it as a personal tool and does not give benchmark accuracy or savings numbers.

## Worth knowing

Big catch: it is self-hosted and uses the poster’s existing Claude subscription, so copying it means running your own server setup.

## Prompt

```text
I want to buy [product]. Compare the full delivered price (including shipping and tax for [my zip code]) across [retailers or any major ones], try every coupon code you can find, and read owner reviews for common problems. Give me a table of the best deals with final prices and which coupons worked. Go through checkout to confirm the total, but stop before placing any order and show me what you see.
```

## Related use cases

- [Order groceries online with a local LLM skill](./order-groceries-online-with-a-local-llm-skill.md)
- [Order pens and search for reservations and resorts](./order-pens-and-search-for-reservations-and-resorts.md)
- [Build an Instacart list for a charcuterie board](./build-an-instacart-list-for-a-charcuterie-board.md)
- [Build an e-commerce agent with OpenClaw](./build-an-e-commerce-agent-with-openclaw.md)
- [Shop, play a game and compile course info with Operator](./shop-play-a-game-and-compile-course-info-with-operator.md)
- [Phone stores to check if items are in stock](./phone-stores-to-check-if-items-are-in-stock.md)
