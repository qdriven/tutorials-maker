---
title: "Check live product prices before buying"
slug: "check-live-product-prices-before-buying"
summary: "The poster stitched together tools that read product pages and validate them so an agent can check current prices, after ChatGPT quoted stale ones."
category: "Shopping & Errands"
agents:
  - name: "ChatGPT"
    slug: "chatgpt"
source_platform: "Reddit"
source_date: "Undated"
source_url: "https://www.reddit.com/r/ChatGPT/comments/1x724a0/chatgpt_kept_quoting_me_prices_that_were_weeks"
fetched_from: "https://agentusecases.ai/use-case/check-live-product-prices-before-buying"
---

# Check live product prices before buying

> The poster stitched together tools that read product pages and validate them so an agent can check current prices, after ChatGPT quoted stale ones.

**Category:** Shopping & Errands  
**Agent:** ChatGPT  
**Source:** Reddit · Undated

## What they did

After ChatGPT gave stale camera prices, the poster built an MCP server that chains multiple page-reading tools: plain fetches, reader services, browser tools, stealth browsers, and optional paid scrapers. The agent tries cheaper tools first, then validates what came back before trusting it: product pages must include a price, search pages must show results, and bot checks, cookie walls, login redirects, or empty loads count as failures, so it escalates to the next tool; the person still recommends manually opening the link before any expensive purchase.

## How it went

On a 150-site test set chosen in advance, the combined setup read 96% correctly, versus 85% for the best single tool, Firecrawl. Free tools alone reached 88%, but some sites such as Shopee and Temu still beat every tool they tried.

## Worth knowing

The main catch is speed: agent mode and multi-tool fallback are slower, especially on hard sites, even though the project itself is free and open source.

## Prompt

```text
Build me a small tool that takes product links like [product URLs], loads each page, extracts the current price, availability, and seller, and validates that the data looks sane (such as a price that is present and in the expected currency). Output a table with the price and the time checked, flagging any page it couldn't read reliably. Finish once it runs successfully on my links, and do not make any purchases.
```

## Related use cases

- [Generate LEGO CAD models in LDraw with AI agents](./generate-lego-cad-models-in-ldraw-with-ai-agents.md)
- [Compile and filter apartment listings](./compile-and-filter-apartment-listings.md)
- [Run a 10-agent SEO content pipeline](./run-a-10-agent-seo-content-pipeline.md)
- [Order groceries online with a local LLM skill](./order-groceries-online-with-a-local-llm-skill.md)
- [Research buying a yak](./research-buying-a-yak.md)
- [Shop, play a game and compile course info with Operator](./shop-play-a-game-and-compile-course-info-with-operator.md)
