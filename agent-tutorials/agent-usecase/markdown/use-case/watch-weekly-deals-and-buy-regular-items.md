---
title: "Watch weekly deals and buy regular items"
slug: "watch-weekly-deals-and-buy-regular-items"
summary: "One Grok Bot watches deals on regularly bought products, another purchases in a browser with shipping details and discount codes, then reads order confirmations and tracking."
category: "Shopping & Errands"
agents:
  - name: "Grok Bot"
    slug: "grok-bot"
source_platform: "Reddit"
source_date: "Aug 23, 2026"
source_url: "https://www.reddit.com/r/GrokBot/comments/1vwkzf1/heres_how_grok_bot_is_doing_all_the_stuff_i_hate"
fetched_from: "https://agentusecases.ai/use-case/watch-weekly-deals-and-buy-regular-items"
---

# Watch weekly deals and buy regular items

> One Grok Bot watches deals on regularly bought products, another purchases in a browser with shipping details and discount codes, then reads order confirmations and tracking.

**Category:** Shopping & Errands  
**Agent:** Grok Bot  
**Source:** Reddit · Aug 23, 2026

## What they did

The setup used two separate bots: Deals checked weekly for discounts on repeat purchases like energy drinks and cat supplies, then sent approved finds to Buyer. Buyer used Grok Bot’s Chrome browser plus a custom skill containing the shipping address and instructions to hunt for recent discount codes, complete checkout, pull one-time passcodes from iMessages when Stripe Link needed them, and then watch for order confirmations and tracking updates.

## How it went

The poster says Grok Bot is finding deals on consumables they always need and buying them without their involvement. No savings totals or success-rate numbers were given, and purchases still depended on the user approving the deal first.

## Worth knowing

The main catch is usage: the poster says they used up Grok Bot on Cursor Pro+ in a day.

## Prompt

```text
Each week, watch deals on these items I buy regularly: [list of products] at [stores]. When one is at or below [target price], add it to the cart using my shipping details and the best available discount code. Pause and show me the cart and total before you pay, then after I approve, save the order confirmation and tracking number and tell me when it ships.
```

## Related use cases

- [Plan and book a short-notice work trip](./plan-and-book-a-short-notice-work-trip.md)
- [File receipts from a folder](./file-receipts-from-a-folder.md)
- [Monitor competitor marketplace prices](./monitor-competitor-marketplace-prices.md)
- [Order groceries online with a local LLM skill](./order-groceries-online-with-a-local-llm-skill.md)
- [Shop on Amazon and build pages with the Claude Chrome extension](./shop-on-amazon-and-build-pages-with-the-claude-chrome-extens.md)
- [Track competitor prices weekly across five sites](./track-competitor-prices-weekly-across-five-sites.md)
