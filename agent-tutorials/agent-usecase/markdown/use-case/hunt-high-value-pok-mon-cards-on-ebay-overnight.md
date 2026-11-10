---
title: "Hunt high-value Pokémon cards on eBay overnight"
slug: "hunt-high-value-pok-mon-cards-on-ebay-overnight"
summary: "An engineer built a Codex agent that browses eBay listings, extracts PSA certificate numbers and cross-references known prices while he sleeps."
category: "Shopping & Errands"
agents:
  - name: "Codex"
    slug: "codex"
source_platform: "X"
source_date: "Jul 18, 2026"
source_url: "https://x.com/Scantor22/status/2078497019446894953"
fetched_from: "https://agentusecases.ai/use-case/hunt-high-value-pok-mon-cards-on-ebay-overnight"
---

# Hunt high-value Pokémon cards on eBay overnight

> An engineer built a Codex agent that browses eBay listings, extracts PSA certificate numbers and cross-references known prices while he sleeps.

**Category:** Shopping & Errands  
**Agent:** Codex  
**Source:** X · Jul 18, 2026

## What they did

Alessio Finelli gave the Codex agent a sparse skill file with rules on target cards, batch size of 5, and grading companies. The agent browses eBay listings on its own, extracts PSA certificate numbers, cross-references known prices, and flags underpriced high-value cards. He steps in only to review flags for his physical shop.

## How it went

It works as his power buyer, surfacing underpriced cards before others see them.

## Worth knowing

Limit batches to 5 listings to avoid eBay bans; run on a cloud VPS.

## Prompt

```text
Write and run an agent that browses [marketplace, e.g. eBay] listings for [item type, e.g. graded Pokémon cards] under [max price], extracts each listing's [certificate or serial number], and compares it to prices in [price source or file]. Save listings that look underpriced by at least [percent]% to a file called [output file] with the link, price, and reference price. Stop after running it once on [number] listings and show me the results and how to schedule it overnight. Don't buy, bid, or message any sellers.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Diagnose a killed process on a server](./diagnose-a-killed-process-on-a-server.md)
- [Spin up a second agent as an independent QA reviewer](./spin-up-a-second-agent-as-an-independent-qa-reviewer.md)
- [Order groceries online with a local LLM skill](./order-groceries-online-with-a-local-llm-skill.md)
- [Research buying a yak](./research-buying-a-yak.md)
- [Buy a microwave from Costco](./buy-a-microwave-from-costco.md)
