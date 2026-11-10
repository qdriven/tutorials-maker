---
title: "Monitor competitor marketplace prices"
slug: "monitor-competitor-marketplace-prices"
summary: "The poster uses Grok Bot to check competitor listings and product prices over time, though CAPTCHAs block it on some sites."
category: "Shopping & Errands"
agents:
  - name: "Grok Bot"
    slug: "grok-bot"
source_platform: "Reddit"
source_date: "Sep 25, 2026"
source_url: "https://www.reddit.com/r/GrokBot/comments/1wq5vdz/grok_bot_keeps_getting_captcha_when_browsing"
fetched_from: "https://agentusecases.ai/use-case/monitor-competitor-marketplace-prices"
---

# Monitor competitor marketplace prices

> The poster uses Grok Bot to check competitor listings and product prices over time, though CAPTCHAs block it on some sites.

**Category:** Shopping & Errands  
**Agent:** Grok Bot  
**Source:** Reddit · Sep 25, 2026

## What they did

The poster says they use Grok Bot to periodically check product prices and competitor listings on a few online marketplaces. The bot browses those sites on its own, but some marketplaces interrupt it with CAPTCHAs; the poster says they currently have to use an API to solve them, and commenters suggested lower request rates, logged-in sessions, or routing the bot’s traffic through the user’s own device.

## How it went

It works for ongoing marketplace price checks, but reliability breaks on sites that throw CAPTCHAs, including a mouse-movement puzzle. No performance numbers or savings are given.

## Worth knowing

The main catch is that CAPTCHA handling was not solved natively in the thread; the poster says they are using an API for it.

## Prompt

```text
Every [day or week], check these competitor listings on [marketplace names]: [links or search terms]. Record the price, stock status, and any changes in a spreadsheet, and flag anything that dropped more than [percent]. If a site blocks you with a CAPTCHA, skip it, list it as blocked, and send me the summary when done.
```

## Related use cases

- [Plan and book a short-notice work trip](./plan-and-book-a-short-notice-work-trip.md)
- [File receipts from a folder](./file-receipts-from-a-folder.md)
- [Watch weekly deals and buy regular items](./watch-weekly-deals-and-buy-regular-items.md)
- [Order groceries online with a local LLM skill](./order-groceries-online-with-a-local-llm-skill.md)
- [Shop on Amazon and build pages with the Claude Chrome extension](./shop-on-amazon-and-build-pages-with-the-claude-chrome-extens.md)
- [Track competitor prices weekly across five sites](./track-competitor-prices-weekly-across-five-sites.md)
