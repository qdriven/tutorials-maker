---
title: "Fill a grocery basket from a regular-items sheet"
slug: "fill-a-grocery-basket-from-a-regular-items-sheet"
summary: "Claude in Chrome added about 24 items to an ASDA basket from a Google Sheet, but the user still had to fix items and check out."
category: "Shopping & Errands"
agents:
  - name: "Claude in Chrome"
    slug: "claude-in-chrome"
source_platform: "christinasouch.com"
source_date: "Undated"
source_url: "https://christinasouch.com/blog/can-claude-automate-my-grocery-shopping"
fetched_from: "https://agentusecases.ai/use-case/fill-a-grocery-basket-from-a-regular-items-sheet"
---

# Fill a grocery basket from a regular-items sheet

> Claude in Chrome added about 24 items to an ASDA basket from a Google Sheet, but the user still had to fix items and check out.

**Category:** Shopping & Errands  
**Agent:** Claude in Chrome  
**Source:** christinasouch.com · Undated

## What they did

Claude built a Google Sheet of 40+ regular items with quantities, frequency tags and price rules. Christina Souch gave it to Haiku in Claude in Chrome on ASDA's site. The first run bulk-added everything from ASDA's Regulars page, so she told it the sheet was the only source of truth. She then ran it several more times, watching each one.

## How it went

The best run added about 24 of 42 items, totalling £71.76. It claimed the rest were unavailable, added carrots that weren't on the list, and she still had to fix the basket and check out. It was slower than shopping by hand.

## Worth knowing

The first run's bulk add of Regulars pushed a usual £60 shop past £200. One run stopped at a token limit, and closing the window mid-task lost all progress.

## Prompt

```text
Open my Google Sheet of regular groceries at [sheet link] and add each item to my basket at [grocery store site]. If an item isn't available, list it at the end instead of substituting. Stop with the basket full and give me a list of items that need my attention. Do not check out or pay.
```

## Related use cases

- [Build a balloon-camel simulator for an LED Burning Man totem](./build-a-balloon-camel-simulator-for-an-led-burning-man-totem.md)
- [Negotiate a billing credit from AT&T](./negotiate-a-billing-credit-from-at-t.md)
- [Build prospect lists and cold emails from the web](./build-prospect-lists-and-cold-emails-from-the-web.md)
- [Order groceries online with a local LLM skill](./order-groceries-online-with-a-local-llm-skill.md)
- [Compare grocery prices across stores from a list](./compare-grocery-prices-across-stores-from-a-list.md)
- [Buy a microwave from Costco](./buy-a-microwave-from-costco.md)
