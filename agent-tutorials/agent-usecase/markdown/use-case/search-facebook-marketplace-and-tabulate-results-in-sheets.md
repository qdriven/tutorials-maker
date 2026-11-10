---
title: "Search Facebook Marketplace and tabulate results in Sheets"
slug: "search-facebook-marketplace-and-tabulate-results-in-sheets"
summary: "A user tries to have Claude in Chrome search Marketplace items and log them in a Google Sheet, but constant permission prompts get in the way."
category: "Shopping & Errands"
agents:
  - name: "Claude in Chrome"
    slug: "claude-in-chrome"
source_platform: "Reddit"
source_date: "Jan 16, 2026"
source_url: "https://www.reddit.com/r/ClaudeAI/comments/1qelajn/claude_for_chrome_constantly_asking_for_permissions"
fetched_from: "https://agentusecases.ai/use-case/search-facebook-marketplace-and-tabulate-results-in-sheets"
---

# Search Facebook Marketplace and tabulate results in Sheets

> A user tries to have Claude in Chrome search Marketplace items and log them in a Google Sheet, but constant permission prompts get in the way.

**Category:** Shopping & Errands  
**Agent:** Claude in Chrome  
**Source:** Reddit · Jan 16, 2026

## What they did

The poster tried to use the Claude Code Chrome extension to search Facebook Marketplace listings and enter the results into a Google Sheet. They enabled “Act without asking” and gave the extension full site access in Chrome, but once Claude opened Marketplace and then Sheets, it switched back to per-action approval so every click, read, and cell entry needed manual permission.

## How it went

It did not become a usable hands-off workflow: the thread says Facebook triggered an always-prompt mode, and another commenter said they could only get it to work by timing a click on an “always allow” popup when it appeared.

## Worth knowing

A commenter said even after fixing permissions they had to restart Claude Code with the --chrome flag; the bigger catch was Facebook causing repeated approval prompts on every action.

## Prompt

```text
Search Facebook Marketplace near [city] for [item] under [price]. For the first [20] listings, record title, price, location, and link in a new Google Sheet. Finished means the sheet is filled and you tell me the top [3] deals. Do not message any sellers; show me the sheet first.
```

## Related use cases

- [Build a balloon-camel simulator for an LED Burning Man totem](./build-a-balloon-camel-simulator-for-an-led-burning-man-totem.md)
- [Book travel and find restaurant reservations](./book-travel-and-find-restaurant-reservations.md)
- [Bulk-unsubscribe from Gmail newsletters](./bulk-unsubscribe-from-gmail-newsletters.md)
- [Order groceries online with a local LLM skill](./order-groceries-online-with-a-local-llm-skill.md)
- [Compare grocery prices across stores from a list](./compare-grocery-prices-across-stores-from-a-list.md)
- [Buy a microwave from Costco](./buy-a-microwave-from-costco.md)
