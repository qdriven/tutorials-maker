---
title: "Find and test discount codes with ChatGPT agent mode"
slug: "find-and-test-discount-codes-with-chatgpt-agent-mode"
summary: "The poster uses ChatGPT's agent mode for multi-step research and testing of discount codes to get better prices before purchase."
category: "Shopping & Errands"
agents:
  - name: "ChatGPT Agent"
    slug: "chatgpt-agent"
source_platform: "Reddit"
source_date: "Aug 24, 2026"
source_url: "https://www.reddit.com/r/ThinkingDeeplyAI/comments/1v7dvug/stop_paying_full_price_for_everything_let_chatgpt"
fetched_from: "https://agentusecases.ai/use-case/find-and-test-discount-codes-with-chatgpt-agent-mode"
---

# Find and test discount codes with ChatGPT agent mode

> The poster uses ChatGPT's agent mode for multi-step research and testing of discount codes to get better prices before purchase.

**Category:** Shopping & Errands  
**Agent:** ChatGPT Agent  
**Source:** Reddit · Aug 24, 2026

## What they did

The poster uses ChatGPT Work’s agent mode in a two-step workflow: first, they give it the exact product link, variant, quantity, and shipping destination so it can research public codes, sales, shipping thresholds, loyalty offers, rebates, cashback, competing retailers, and price-match options. Then, if browser access is available, they have it open the cart, try candidate codes one by one, record the discount and final total, reset the cart between tests, and pause for logins, CAPTCHAs, or other sensitive steps.

## How it went

The claimed result is faster coupon checking and a comparison of which codes worked, failed, or gave the lowest final total. The post does not provide a concrete savings result, and it notes some sites block automation or require user takeover.

## Worth knowing

The practical catch is setup: use the exact product page and cart, and explicitly tell it not to purchase; the image example suggests this can take about 60 seconds.

## Prompt

```text
I'm about to buy [product] from [store website]. Find public discount codes, add the item to the cart, and test each code at checkout to see which gives the best final price. Stop before entering any payment details or placing the order, and show me a table of each code tried, whether it worked, and the final total.
```

## Related use cases

- [Plan a family trip and pre-fill bookings](./plan-a-family-trip-and-pre-fill-bookings.md)
- [Collate WHO data into a multi-tab spreadsheet](./collate-who-data-into-a-multi-tab-spreadsheet.md)
- [Save the best local restaurants as a Google Maps list](./save-the-best-local-restaurants-as-a-google-maps-list.md)
- [Order groceries online with a local LLM skill](./order-groceries-online-with-a-local-llm-skill.md)
- [Find holiday gifts and check stock and sales](./find-holiday-gifts-and-check-stock-and-sales.md)
- [Buy a microwave from Costco](./buy-a-microwave-from-costco.md)
