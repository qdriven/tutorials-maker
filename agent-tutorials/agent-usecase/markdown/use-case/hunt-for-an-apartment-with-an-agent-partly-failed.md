---
title: "Hunt for an apartment with an agent (partly failed)"
slug: "hunt-for-an-apartment-with-an-agent-partly-failed"
summary: "A self-hosted agent surfaced broken links and mismatched descriptions at over $100 in credits; ChatGPT then compared listings and scheduled searches until it lost site access."
category: "Life Admin & Home"
agents:
  - name: "ChatGPT"
    slug: "chatgpt"
source_platform: "medium.com"
source_date: "Undated"
source_url: "https://medium.com/@dmitrymind/i-used-an-ai-agent-to-find-an-apartment-it-failed-but-i-felt-bad-turning-it-off-c5a937af3aaa"
fetched_from: "https://agentusecases.ai/use-case/hunt-for-an-apartment-with-an-agent-partly-failed"
---

# Hunt for an apartment with an agent (partly failed)

> A self-hosted agent surfaced broken links and mismatched descriptions at over $100 in credits; ChatGPT then compared listings and scheduled searches until it lost site access.

**Category:** Life Admin & Home  
**Agent:** ChatGPT  
**Source:** medium.com · Undated

## What they did

The author installed OpenClaw on Hostinger with a one-click installer, in about 40 minutes, and connected it to Telegram. It was told to watch Facebook Marketplace, filter for a three-bedroom apartment with a balcony, and send twice-daily roundups. He capped it at 30 attempts. After it failed, he tried ChatGPT, then Codex with useComputer.

## How it went

The agent never found an apartment. Roundups came late or not at all, links were broken, and descriptions were hallucinated. It cost over $100 in credits and a week. ChatGPT worked better until it lost site access. Codex, driving a real browser, worked reliably.

## Worth knowing

Cap the agent's attempts, since agents don't report intermediate failures and costs can run away. A $20/month ChatGPT subscription beat the self-hosted setup, and the Codex route needs your own computer left on.

## Prompt

```text
Help me find an apartment in [city or neighborhood] with a budget of [max rent], [number] bedrooms, and these must-haves: [list]. Open the listing sites, check that each link works and that the description matches the photos and details, and give me a table of the 8 best verified options with price, address, and link. Flag anything that looks outdated or suspicious. Do not contact any landlords or submit any forms without showing me first.
```

## Related use cases

- [Generate LEGO CAD models in LDraw with AI agents](./generate-lego-cad-models-in-ldraw-with-ai-agents.md)
- [Generate a spoken daily news bulletin at home](./generate-a-spoken-daily-news-bulletin-at-home.md)
- [Find SEO competitors with ChatGPT Pro agent](./find-seo-competitors-with-chatgpt-pro-agent.md)
- [Get a second opinion on an MRI](./get-a-second-opinion-on-an-mri.md)
- [Plan meals and track symptoms with Claude Code](./plan-meals-and-track-symptoms-with-claude-code.md)
- [Use a coding agent for everyday non-programming chores](./use-a-coding-agent-for-everyday-non-programming-chores.md)
