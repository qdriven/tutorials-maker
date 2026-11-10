---
title: "Compare Costco and Amazon carts on price and delivery"
slug: "compare-costco-and-amazon-carts-on-price-and-delivery"
summary: "Grok Bot added items to carts at Costco and Amazon and compared prices, delivery charges and times, handing the desktop back to the user for CAPTCHA or 2FA."
category: "Shopping & Errands"
agents:
  - name: "Grok Bot"
    slug: "grok-bot"
source_platform: "x.ai"
source_date: "Undated"
source_url: "https://x.ai/bot/guides/grok-bot-101"
fetched_from: "https://agentusecases.ai/use-case/compare-costco-and-amazon-carts-on-price-and-delivery"
---

# Compare Costco and Amazon carts on price and delivery

> Grok Bot added items to carts at Costco and Amazon and compared prices, delivery charges and times, handing the desktop back to the user for CAPTCHA or 2FA.

**Category:** Shopping & Errands  
**Agent:** Grok Bot  
**Source:** x.ai · Undated

## What they did

Matt Palmer, who works in DevRel, asked Grok Bot to look at Costco and Amazon, add items to his cart, and compare prices, delivery charges and times. The bot works on a persistent cloud desktop. When a site needs a CAPTCHA or 2FA login, it hands the desktop back to him to complete.

## How it went

The guide mentions this only briefly. It gives no prices, results or timings for the comparison, so how accurate or complete it was isn't stated.

## Worth knowing

A bot logged into Amazon could technically buy things. Permissions are natural-language rules in Settings, checked by a review agent, and every bot can reach any site one bot has logged into.

## Prompt

```text
Add this shopping list to a cart at both Costco and Amazon: [list of items with sizes or quantities]. Compare item prices, delivery charges and delivery times, and tell me which cart is the better deal. If you hit a captcha or two-factor prompt, hand control back to me, and do not check out. You're done when you've given me a side-by-side comparison.
```

## Related use cases

- [Plan and book a short-notice work trip](./plan-and-book-a-short-notice-work-trip.md)
- [Monitor PC memory and ask before closing apps](./monitor-pc-memory-and-ask-before-closing-apps.md)
- [Watch weekly deals and buy regular items](./watch-weekly-deals-and-buy-regular-items.md)
- [Order groceries online with a local LLM skill](./order-groceries-online-with-a-local-llm-skill.md)
- [Shop on Amazon and build pages with the Claude Chrome extension](./shop-on-amazon-and-build-pages-with-the-claude-chrome-extens.md)
- [Track competitor prices weekly across five sites](./track-competitor-prices-weekly-across-five-sites.md)
