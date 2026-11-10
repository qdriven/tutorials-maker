---
title: "Answer support tickets with ChatGPT connected to Freshdesk"
slug: "answer-support-tickets-with-chatgpt-connected-to-freshdesk"
summary: "A SaaS owner connected ChatGPT to Freshdesk with ticket history and internal tools, but dropped full autonomy because choosing the right answer and knowing when not to respond was unreliable."
category: "Sales, Marketing & Support"
agents:
  - name: "ChatGPT"
    slug: "chatgpt"
source_platform: "Reddit"
source_date: "Aug 4, 2026"
source_url: "https://www.reddit.com/r/SaaS/comments/1vevgnd/i_stopped_building_an_ai_support_agent_and"
fetched_from: "https://agentusecases.ai/use-case/answer-support-tickets-with-chatgpt-connected-to-freshdesk"
---

# Answer support tickets with ChatGPT connected to Freshdesk

> A SaaS owner connected ChatGPT to Freshdesk with ticket history and internal tools, but dropped full autonomy because choosing the right answer and knowing when not to respond was unreliable.

**Category:** Sales, Marketing & Support  
**Agent:** ChatGPT  
**Source:** Reddit · Aug 4, 2026

## What they did

The SaaS owner first gathered years of support tickets plus scraped docs and the knowledge base into a searchable dataset, then built a custom Freshdesk integration so ChatGPT could access ticket history, customer conversations, source code, and internal tools through an MCP server. Instead of letting an autonomous agent answer customers, they used ChatGPT interactively for tasks like flagging tickets needing attention, summarizing a ticket, checking whether an issue had happened before, and drafting replies while the human stayed in control.

## How it went

They say this worked better than a fully autonomous support agent: it cut time spent searching, made replies more consistent, and helped them process tickets faster. The autonomous version was dropped because reliable decision-making, edge-case recovery, and knowing when not to answer proved too hard.

## Worth knowing

The main catch was scope: they found themselves spending more time improving the autonomous agent than actually using it.

## Prompt

```text
Here are [number] past support tickets and my answers from [help desk name], plus my product docs: [paste or attach]. Draft replies to these new tickets: [paste tickets]. For each, give a confidence level, and mark any ticket you should not answer automatically (billing disputes, angry customers, unclear problems) with the reason, so I can review before anything is sent.
```

## Related use cases

- [Generate LEGO CAD models in LDraw with AI agents](./generate-lego-cad-models-in-ldraw-with-ai-agents.md)
- [Compile and filter apartment listings](./compile-and-filter-apartment-listings.md)
- [Run a 10-agent SEO content pipeline](./run-a-10-agent-seo-content-pipeline.md)
- [Sell services through an agent that takes payment and delivers](./sell-services-through-an-agent-that-takes-payment-and-delive.md)
- [Run marketing campaigns, SEO and content with agents](./run-marketing-campaigns-seo-and-content-with-agents.md)
- [Take orders for a sushi chain with an agent](./take-orders-for-a-sushi-chain-with-an-agent.md)
