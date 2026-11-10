---
title: "Tell Indian citizens which government schemes they're owed"
slug: "tell-indian-citizens-which-government-schemes-they-re-owed"
summary: "An agent built on Sanity queries real content to tell people in India which government schemes they are entitled to."
category: "Money, Bills & Benefits"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_platform: "DEV"
source_date: "Oct 1, 2026"
source_url: "https://dev.to/varshithvhegde/entitled-an-ai-agent-that-tells-indians-which-government-schemes-theyre-owed-built-on-sanity-4dml"
fetched_from: "https://agentusecases.ai/use-case/tell-indian-citizens-which-government-schemes-they-re-owed"
---

# Tell Indian citizens which government schemes they're owed

> An agent built on Sanity queries real content to tell people in India which government schemes they are entitled to.

**Category:** Money, Bills & Benefits  
**Agent:** custom-built or unnamed agent  
**Source:** DEV · Oct 1, 2026

## What they did

The agent runs on Inception's Mercury via the Vercel AI SDK and reaches a Sanity Context MCP endpoint in GROQ mode. It extracts the person's details, reads the schema, and makes one GROQ query for schemes with typed eligibility rules. It then checks every exclusion rule. A second pass formats cards as JSON, and the route attaches the apply and source URLs from the dataset.

## How it went

Works in English and Kannada with follow-ups. The dataset has 125 schemes, but only 10 flagships have structured rules (33 rules, 11 exclusions). A run takes 30 to 45 seconds. The author did not verify every rule line by line.

## Worth knowing

The first Knowledge Base route burned 20 tool calls without answering. Switching to GROQ mode fixed it, but it needs a deployed Studio.

## Prompt

```text
I am a [age] year old [occupation] living in [state] in India with household income of about [amount] and [other relevant details like caste category, land, or family]. Search official government sites to find central and state schemes I may be eligible for. For each, give the benefit, eligibility, documents needed, and the official application link. Do not submit any applications or enter personal ID numbers.
```

## Related use cases

- [Shop for umbrella insurance through your personal agent](./shop-for-umbrella-insurance-through-your-personal-agent.md)
- [Produce investment memos with Claude Cowork](./produce-investment-memos-with-claude-cowork.md)
- [Prepare federal and state tax returns from a folder](./prepare-federal-and-state-tax-returns-from-a-folder.md)
- [Research crypto assets and execute swaps and perps trades](./research-crypto-assets-and-execute-swaps-and-perps-trades.md)
- [Do taxes by selecting the right invoices](./do-taxes-by-selecting-the-right-invoices.md)
- [Cancel seven subscriptions and close the accounts](./cancel-seven-subscriptions-and-close-the-accounts.md)
