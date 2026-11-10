---
title: "Rank viral social posts and send top picks overnight"
slug: "rank-viral-social-posts-and-send-top-picks-overnight"
summary: "A Grok Bot runs Apify scrapers for X, TikTok and Instagram, normalizes engagement, ranks by save rate and sends the top three to Telegram."
category: "Sales, Marketing & Support"
agents:
  - name: "Grok Bot"
    slug: "grok-bot"
source_platform: "blog.apify.com"
source_date: "Undated"
source_url: "https://blog.apify.com/track-viral-posts-with-grok-bot/"
fetched_from: "https://agentusecases.ai/use-case/rank-viral-social-posts-and-send-top-picks-overnight"
---

# Rank viral social posts and send top picks overnight

> A Grok Bot runs Apify scrapers for X, TikTok and Instagram, normalizes engagement, ranks by save rate and sends the top three to Telegram.

**Category:** Sales, Marketing & Support  
**Agent:** Grok Bot  
**Source:** blog.apify.com · Undated

## What they did

With the Apify plugin installed in Grok Bot, the author prompts it to run Tweet Scraper, TikTok Scraper and Instagram Scraper. The bot first reports each Actor's engagement field names. It then normalizes them into one table, drops posts under 24 hours old, and ranks by save rate. Instagram has no public saves, so it uses comments divided by likes. A weekday schedule and a Telegram bot, connected through Composio, deliver the top three.

## How it went

Of 150 posts scraped, 128 made the board; four were dropped as too new and 18 for having no usable save rate. The top three were all X posts, with save rates of 2.5 to 2.7.

## Worth knowing

Have the bot show each Actor's returned field names before normalizing. Platforms name saves differently, and Instagram has none, so a wrong mapping ranks the wrong numbers.

## Prompt

```text
Every night, run scrapers for [X, TikTok, Instagram] on [keywords, hashtags, or accounts in my niche]. Normalize engagement across platforms, rank posts by [save rate or another metric], and send the top three with links and a one-line reason each to [Telegram or email] by [time]. A finished run is one message with three picks; don't post or engage with anything yourself.
```

## Related use cases

- [Plan and book a short-notice work trip](./plan-and-book-a-short-notice-work-trip.md)
- [File receipts from a folder](./file-receipts-from-a-folder.md)
- [Monitor competitor marketplace prices](./monitor-competitor-marketplace-prices.md)
- [Sell services through an agent that takes payment and delivers](./sell-services-through-an-agent-that-takes-payment-and-delive.md)
- [Run brand marketing end to end and publish to social](./run-brand-marketing-end-to-end-and-publish-to-social.md)
- [Run business WhatsApp customer messages with an agent](./run-business-whatsapp-customer-messages-with-an-agent.md)
