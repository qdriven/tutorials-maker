---
title: "Shop for cars on websites with a browser agent"
slug: "shop-for-cars-on-websites-with-a-browser-agent"
summary: "The poster uses Muse to shop for cars online and finds a persistent logged-in browser profile with normal pacing works best as sites start blocking it."
category: "Shopping & Errands"
agents:
  - name: "Meta Muse"
    slug: "meta-muse"
source_platform: "Reddit"
source_date: "Undated"
source_url: "https://www.reddit.com/r/AI_Agents/comments/1wrlvs9/over_last_week_sites_that_used_to_work_are_now"
fetched_from: "https://agentusecases.ai/use-case/shop-for-cars-on-websites-with-a-browser-agent"
---

# Shop for cars on websites with a browser agent

> The poster uses Muse to shop for cars online and finds a persistent logged-in browser profile with normal pacing works best as sites start blocking it.

**Category:** Shopping & Errands  
**Agent:** Meta Muse  
**Source:** Reddit · Undated

## What they did

The poster had Muse browse car-shopping sites for them, but says sites that had worked started flagging or blocking it as a bot. In the comments, one person says what still works for them is giving the agent a persistent, logged-in browser profile for each site with real cookies and having it move at a normal pace, because fresh headless sessions get flagged quickly.

## How it went

It was useful for browsing car listings until at least Cars.com began blocking the agent. The thread offers a workaround idea, but no performance numbers or fully reliable fix.

## Worth knowing

The main catch is durability: a fresh headless browser context may get flagged within a day, so persistence and slower pacing mattered most in the comments.

## Prompt

```text
Shop for a used [make/model/year range] near [city or zip] on [car sites], with a budget of [max price] and under [mileage] miles. Use a persistent logged-in browser profile and pace your clicks like a normal person so sites don't block you. Finish with a shortlist of 5 to 8 listings with price, mileage, and links; don't contact any seller or submit any forms without showing me first.
```

## Related use cases

- [Find airline food-fee reimbursement emails buried in the inbox](./find-airline-food-fee-reimbursement-emails-buried-in-the-inb.md)
- [Build and order a grocery cart from an idea](./build-and-order-a-grocery-cart-from-an-idea.md)
- [Build profit/loss statements for rental properties](./build-profit-loss-statements-for-rental-properties.md)
- [Order groceries online with a local LLM skill](./order-groceries-online-with-a-local-llm-skill.md)
- [Research buying a yak](./research-buying-a-yak.md)
- [Negotiate a TV price with a retailer's chat](./negotiate-a-tv-price-with-a-retailer-s-chat.md)
