---
title: "Compare Coca-Cola prices across Belgian supermarkets"
slug: "compare-coca-cola-prices-across-belgian-supermarkets"
summary: "Grok Bot compared a bottle of Coca-Cola across Belgian supermarkets, named cheapest and priciest and flagged promotions, handing the browser to the user at a Carrefour captcha."
category: "Shopping & Errands"
agents:
  - name: "Grok Bot"
    slug: "grok-bot"
source_platform: "petervanhees.com"
source_date: "Undated"
source_url: "https://www.petervanhees.com/grok-bot-knows-when-to-stop/"
fetched_from: "https://agentusecases.ai/use-case/compare-coca-cola-prices-across-belgian-supermarkets"
---

# Compare Coca-Cola prices across Belgian supermarkets

> Grok Bot compared a bottle of Coca-Cola across Belgian supermarkets, named cheapest and priciest and flagged promotions, handing the browser to the user at a Carrefour captcha.

**Category:** Shopping & Errands  
**Agent:** Grok Bot  
**Source:** petervanhees.com · Undated

## What they did

Peter van Hees asked Grok Bot in plain language to compare Coca-Cola prices at the major Belgian supermarkets, without naming shops or sizes. The bot worked from the official store sites rather than comparison blogs. Carrefour blocked it with a Cloudflare check, so the bot asked him to click the human check in the shared browser. He did, and it carried on.

## How it went

It reported 1.5L prices (Colruyt and Delhaize 2,38 euro, Albert Heijn 2,39), noted that Aldi and Lidl lacked a comparable bottle, and found promotions. Once Carrefour opened, it revised its ranking: Carrefour's 2L at 1,48 per liter was the best. The author says the prices shouldn't be treated as publishable fact.

## Worth knowing

Grok Bot has no standalone plan. The author's top-tier subscription costs 200 euros a month, and the bots share one computer's logins, so xAI says not to treat them as separate security boundaries.

## Prompt

```text
Compare the price of [product, brand and size] across [country] supermarkets such as [store 1, store 2, store 3]. Tell me which store is cheapest and which is priciest, and flag any current promotions. If a captcha or login blocks you, hand the browser back to me, and stop once you've given me a short comparison list.
```

## Related use cases

- [Plan and book a short-notice work trip](./plan-and-book-a-short-notice-work-trip.md)
- [Monitor PC memory and ask before closing apps](./monitor-pc-memory-and-ask-before-closing-apps.md)
- [Watch weekly deals and buy regular items](./watch-weekly-deals-and-buy-regular-items.md)
- [Order groceries online with a local LLM skill](./order-groceries-online-with-a-local-llm-skill.md)
- [Shop on Amazon and build pages with the Claude Chrome extension](./shop-on-amazon-and-build-pages-with-the-claude-chrome-extens.md)
- [Track competitor prices weekly across five sites](./track-competitor-prices-weekly-across-five-sites.md)
