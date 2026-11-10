---
title: "Track daily price and stock changes on Shopify stores"
slug: "track-daily-price-and-stock-changes-on-shopify-stores"
summary: "An agent reads a Shopify store's public product feed daily and reports new, removed, price and stock changes, e.g. 692 products at allbirds.com. · Oct 11, 2026"
category: "Shopping & Errands"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_platform: "tools.openkrill.app"
source_date: "Oct 11, 2026 · Submitted by OpenKrill"
source_url: "https://tools.openkrill.app/blog/shopify-products-json-price-tracker"
fetched_from: "https://agentusecases.ai/use-case/track-daily-price-and-stock-changes-on-shopify-stores"
---

# Track daily price and stock changes on Shopify stores

> An agent reads a Shopify store's public product feed daily and reports new, removed, price and stock changes, e.g. 692 products at allbirds.com. · Oct 11, 2026

**Category:** Shopping & Errands  
**Agent:** custom-built or unnamed agent  
**Source:** tools.openkrill.app · Oct 11, 2026 · Submitted by OpenKrill

## What they did

The Store Price Tracker tool reads a Shopify store's public products.json feed, up to 250 products per page, and keeps a daily snapshot, because the feed has no price history. Each answer compares the latest snapshot with the previous day's: new and removed products, price changes and per-variant stock changes. It checks robots.txt first, identifies itself, and backs off on 429 responses.

## How it went

Across three stores, allbirds.com showed 692 products, 0 price changes and 10 stock changes. gymshark.com had 10,027 products read, 6 new, 0 price changes and 266 stock changes. Kylie Cosmetics (247 products) was only just added.

## Worth knowing

On very large catalogs the read stops at a page limit, so removed products can't be counted. The /cart.json Shopify check also returns 404 on custom storefronts such as gymshark.

## Prompt

```text
Write a small script that reads the public products feed of [store URL, e.g. store.com/products.json] each day and saves a snapshot. Compare each day to the previous one and report new products, removed products, price changes and stock changes in a short summary. Run it once now to create the first snapshot and show me the product count, then set it up to run daily at [time].
```

## Related use cases

- [Order groceries online with a local LLM skill](./order-groceries-online-with-a-local-llm-skill.md)
- [Order pens and search for reservations and resorts](./order-pens-and-search-for-reservations-and-resorts.md)
- [Build an Instacart list for a charcuterie board](./build-an-instacart-list-for-a-charcuterie-board.md)
- [Watch item prices and email on drops](./watch-item-prices-and-email-on-drops.md)
- [Run an online store's inventory, listings and photos](./run-an-online-store-s-inventory-listings-and-photos.md)
- [Phone stores to check if items are in stock](./phone-stores-to-check-if-items-are-in-stock.md)
