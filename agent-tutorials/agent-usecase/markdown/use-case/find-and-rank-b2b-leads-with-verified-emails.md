---
title: "Find and rank B2B leads with verified emails"
slug: "find-and-rank-b2b-leads-with-verified-emails"
summary: "The author built a Claude Code agent that finds B2B leads, ranks them by fit and pulls verified emails for the best, using Tavily and Prospeo on free tiers."
category: "Sales, Marketing & Support"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "medium.com"
source_date: "Undated"
source_url: "https://medium.com/@dvasquez.422/how-i-built-a-free-ai-lead-generation-agent-with-claude-code-40df4f125d89"
fetched_from: "https://agentusecases.ai/use-case/find-and-rank-b2b-leads-with-verified-emails"
---

# Find and rank B2B leads with verified emails

> The author built a Claude Code agent that finds B2B leads, ranks them by fit and pulls verified emails for the best, using Tavily and Prospeo on free tiers.

**Category:** Sales, Marketing & Support  
**Agent:** Claude Code  
**Source:** medium.com · Undated

## What they did

The author spent a weekend building an agent in Claude Code. Claude Code does the reasoning, Tavily does the research to find real B2B leads, and Prospeo enriches the best-ranked leads with verified emails. It was designed to use each tool's API credits sparingly.

## How it went

The author says the agent finds leads, ranks them by how likely they are to buy, and pulls verified emails for the top ones. The visible text gives no result numbers, and the build steps are paywalled.

## Worth knowing

Only the Claude Code subscription costs money, provided you stay within the free API tiers of Tavily and Prospeo. The full walkthrough is behind Medium's member-only paywall.

## Prompt

```text
Build me a small lead-finding tool in [project folder]. It should search the web for [type of company] in [industry or region], score each one from 1-10 on fit with [my ideal customer description], and for the top [number] look up verified contact emails using [email lookup service and API key]. Output a CSV sorted by score and stop once it runs end to end on a test batch of [number] companies.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Index a newsletter archive and repurpose writing](./index-a-newsletter-archive-and-repurpose-writing.md)
- [Build a company structure with Claude Code agents](./build-a-company-structure-with-claude-code-agents.md)
- [Sell services through an agent that takes payment and delivers](./sell-services-through-an-agent-that-takes-payment-and-delive.md)
- [Run full-stack SEO with an n8n agent](./run-full-stack-seo-with-an-n8n-agent.md)
- [Auto-apply to jobs on LinkedIn with ChatGPT Agent](./auto-apply-to-jobs-on-linkedin-with-chatgpt-agent.md)
