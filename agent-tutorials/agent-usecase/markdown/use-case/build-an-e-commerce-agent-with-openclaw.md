---
title: "Build an e-commerce agent with OpenClaw"
slug: "build-an-e-commerce-agent-with-openclaw"
summary: "Poster spent 100+ hours and 200M+ tokens building an e-commerce workflow agent with OpenClaw; post focuses mostly on the build effort."
category: "Shopping & Errands"
agents:
  - name: "OpenClaw"
    slug: "openclaw"
source_platform: "Reddit"
source_date: "Jan 1, 2026"
source_url: "https://www.reddit.com/r/openclaw/comments/1rgcunb/spent_100_hours_and_burned_200m_tokens_building"
fetched_from: "https://agentusecases.ai/use-case/build-an-e-commerce-agent-with-openclaw"
---

# Build an e-commerce agent with OpenClaw

> Poster spent 100+ hours and 200M+ tokens building an e-commerce workflow agent with OpenClaw; post focuses mostly on the build effort.

**Category:** Shopping & Errands  
**Agent:** OpenClaw  
**Source:** Reddit · Jan 1, 2026

## What they did

The poster built an e-commerce agent in OpenClaw on a sandboxed VPS, using Telegram rather than Discord, Kimi K2.5 as the main model, and a cheaper model for heartbeats and background jobs. They gave the agent a linked markdown memory system, sub-agent templates, and decision-tree instruction files it only opened when needed, while they manually restarted the gateway, tweaked configs, and brought in stronger models like Opus or Sonnet when troubleshooting.

## How it went

After 100+ hours and 200M+ tokens, they say they finally got a workflow running reliably enough to use. The main shortcomings were high token burn, background costs, and destructive mistakes like wiping files or even an entire VPS when permissions and boundaries were too loose.

## Worth knowing

Their stated operating cost was about $10-15 for a full workday of prompting, plus roughly $1-2/day if heartbeats ran on a pricier model.

## Prompt

```text
Help me build a small e-commerce workflow agent for my [store platform, e.g. Shopify] store. Start with one job: [e.g. checking inventory and drafting supplier reorder emails, or updating product listings from a spreadsheet]. Finished means one working run on [3 sample products] with a short summary of what it did. Pause and show me anything before it sends a message, changes a listing, or spends money.
```

## Related use cases

- [Manage 18 agents from a Notion workspace](./manage-18-agents-from-a-notion-workspace.md)
- [Draft and publish blog posts with an SEO-aware agent](./draft-and-publish-blog-posts-with-an-seo-aware-agent.md)
- [Draft messages, fill web forms and prototype sites by chat](./draft-messages-fill-web-forms-and-prototype-sites-by-chat.md)
- [Order groceries online with a local LLM skill](./order-groceries-online-with-a-local-llm-skill.md)
- [Find holiday gifts and check stock and sales](./find-holiday-gifts-and-check-stock-and-sales.md)
- [Compare Coca-Cola prices across Belgian supermarkets](./compare-coca-cola-prices-across-belgian-supermarkets.md)
