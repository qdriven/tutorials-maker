---
title: "Place Taobao orders with one sentence via Qwen AI shopping"
slug: "place-taobao-orders-with-one-sentence-via-qwen-ai-shopping"
summary: "A reviewer tested Qwen's shopping agent on Taobao; one sentence placed an order and paid after confirmation, but it picked white instead of the requested green. · Nov 5, 2026"
category: "Shopping & Errands"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_platform: "leikeji.com"
source_date: "Nov 5, 2026 · Submitted by from search gap: 淘宝"
source_url: "https://www.leikeji.com/article/76642"
fetched_from: "https://agentusecases.ai/use-case/place-taobao-orders-with-one-sentence-via-qwen-ai-shopping"
---

# Place Taobao orders with one sentence via Qwen AI shopping

> A reviewer tested Qwen's shopping agent on Taobao; one sentence placed an order and paid after confirmation, but it picked white instead of the requested green. · Nov 5, 2026

**Category:** Shopping & Errands  
**Agent:** custom-built or unnamed agent  
**Source:** leikeji.com · Nov 5, 2026 · Submitted by from search gap: 淘宝

## What they did

The reviewer updated Taobao and Qwen (app 6.9.1 or later) and used Qwen's shopping assistant. He sent two gamepad product links for comparison, asked for a cheaper listing, then told it to order. The agent suggested joining the store membership for a coupon. He confirmed, and payment went through immediately.

## How it went

Ordering and payment were smooth. But he asked for green, and the context also said green, and it defaulted to white. Qwen also claimed its price was the lowest, yet he easily found a cheaper one at an official flagship store.

## Worth knowing

Check the color or variant on the confirmation screen before paying, because the agent chose the wrong one by default.

## Prompt

```text
Go to [shopping site] and find [item] in [color/size/other specifics]. Before you add anything to the cart, show me the exact product, variant, price and seller you picked so I can confirm the variant is correct. Stop before payment and wait for my approval; do not place the order yourself.
```

## Related use cases

- [Order groceries online with a local LLM skill](./order-groceries-online-with-a-local-llm-skill.md)
- [Shop for Raspberry Pi parts on Amazon with Claude](./shop-for-raspberry-pi-parts-on-amazon-with-claude.md)
- [Auto-buy items when the price hits a target](./auto-buy-items-when-the-price-hits-a-target.md)
- [Hunt high-value Pokémon cards on eBay overnight](./hunt-high-value-pok-mon-cards-on-ebay-overnight.md)
- [Order family groceries from fridge contents](./order-family-groceries-from-fridge-contents.md)
- [Find good eBay deals on a schedule](./find-good-ebay-deals-on-a-schedule.md)
