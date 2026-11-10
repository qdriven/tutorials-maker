---
title: "Find and test promo codes before checkout"
slug: "find-and-test-promo-codes-before-checkout"
summary: "ChatGPT searches for public discounts, tests promo codes and confirms the final checkout price before the user buys."
category: "Shopping & Errands"
agents:
  - name: "ChatGPT"
    slug: "chatgpt"
source_platform: "Reddit"
source_date: "Aug 24, 2026"
source_url: "https://www.reddit.com/r/promptingmagic/comments/1v7dvjz/get_the_best_deal_on_anything_you_buy_with"
fetched_from: "https://agentusecases.ai/use-case/find-and-test-promo-codes-before-checkout"
---

# Find and test promo codes before checkout

> ChatGPT searches for public discounts, tests promo codes and confirms the final checkout price before the user buys.

**Category:** Shopping & Errands  
**Agent:** ChatGPT  
**Source:** Reddit · Aug 24, 2026

## What they did

The post describes a two-step ChatGPT Work workflow: first give the agent the exact product link, chosen variant, quantity, and shipping destination so it searches for public codes, sales, retailer offers, rebates, cashback, competing sellers, and price-match options. Then, in the same chat, ask it to use its browser on supported sites to open the cart, try each candidate code one by one, record the before-and-after totals, reset the cart between tests, and pause for the user on logins, CAPTCHA, or other sensitive steps.

## How it went

The claimed result is a ranked comparison of which codes actually worked, why others failed, and the lowest displayed final total before purchase. The post gives no measured savings from a real run, and notes sites may block automation or require user takeover.

## Worth knowing

The main catch is setup: use ChatGPT Work, start from the exact product page with the item already configured in the cart, and explicitly tell it to stop before placing the order.

## Prompt

```text
I'm about to buy [product] from [store or website] and want the lowest price. Search for current public promo codes and discounts, tell me which ones are likely to work, and list the sources. Give me a ranked list of codes to try and the expected final price, and don't purchase anything.
```

## Related use cases

- [Generate LEGO CAD models in LDraw with AI agents](./generate-lego-cad-models-in-ldraw-with-ai-agents.md)
- [Compile and filter apartment listings](./compile-and-filter-apartment-listings.md)
- [Run a 10-agent SEO content pipeline](./run-a-10-agent-seo-content-pipeline.md)
- [Order groceries online with a local LLM skill](./order-groceries-online-with-a-local-llm-skill.md)
- [Research buying a yak](./research-buying-a-yak.md)
- [Shop, play a game and compile course info with Operator](./shop-play-a-game-and-compile-course-info-with-operator.md)
