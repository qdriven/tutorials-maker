---
title: "Run an 11-agent team for trading prep"
slug: "run-an-11-agent-team-for-trading-prep"
summary: "A trader runs 11 Grok Bot agents, each with one job and a scope document, with a Red Team agent that must approve a trade first."
category: "Money, Bills & Benefits"
agents:
  - name: "Grok Bot"
    slug: "grok-bot"
  - name: "Claude"
    slug: "claude"
  - name: "Codex"
    slug: "codex"
source_platform: "Reddit"
source_date: "Oct 7, 2026"
source_url: "https://www.reddit.com/r/GrokBot/comments/1wz4qxq/running_an_11agent_team_on_grok_bot_for_my"
fetched_from: "https://agentusecases.ai/use-case/run-an-11-agent-team-for-trading-prep"
---

# Run an 11-agent team for trading prep

> A trader runs 11 Grok Bot agents, each with one job and a scope document, with a Red Team agent that must approve a trade first.

**Category:** Money, Bills & Benefits  
**Agent:** Grok Bot, Claude, Codex  
**Source:** Reddit · Oct 7, 2026

## What they did

The trader moved a daily swing-trading prep workflow onto Grok Bot and organized it as 11 separate agents with an org-chart structure, a shared memory layer, and an agentic verification step. Each agent had one job plus MAP.md and CONTRACT.md files to define scope, used its own persistent cloud computer with browser, terminal, and file storage, and a Red Team agent had to pass a trade before anything else moved; the human still kept execution because none of the agents could place trades.

## How it went

They say the persistent browsing setup fixed most of the scraping breakage from the earlier system and was easier to set up than Claude Agent Teams. The post gives no performance numbers or P&L, and it leaves open problems around pinning models to agents and understanding Cursor integration.

## Worth knowing

The main catch is subscription/tooling tradeoffs: they say Grok Bot was much easier to manage than Claude Agent Teams, assuming you have the right subscription tier.

## Prompt

```text
Set up a small team of agents for my pre-market prep: one to scan [markets or tickers], one to summarize news, one to check my risk limits of [rules], and one skeptical reviewer that must challenge and approve any trade idea. Give each a short scope document with its single job. Output a daily list of reviewed ideas with the reviewer's verdict, and never place a trade without my explicit confirmation.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Book flights as a travel agent (came close)](./book-flights-as-a-travel-agent-came-close.md)
- [Run SEO strategy and content with Claude to grow a product](./run-seo-strategy-and-content-with-claude-to-grow-a-product.md)
- [Shop for umbrella insurance through your personal agent](./shop-for-umbrella-insurance-through-your-personal-agent.md)
- [Find recurring subscriptions in bank statements](./find-recurring-subscriptions-in-bank-statements.md)
- [Fight a denied home insurance water damage claim](./fight-a-denied-home-insurance-water-damage-claim.md)
