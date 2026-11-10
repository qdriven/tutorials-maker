---
title: "Run large-scale cold email campaigns with Claude Code"
slug: "run-large-scale-cold-email-campaigns-with-claude-code"
summary: "The poster uses Claude Code to run cold email workflows sending 10-20K emails per client monthly, replacing a Clay bill."
category: "Sales, Marketing & Support"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "Reddit"
source_date: "Apr 2, 2026"
source_url: "https://www.reddit.com/r/gtmengineering/comments/1sufhd1/i_send_1020k_cold_emails_per_client_per_month"
fetched_from: "https://agentusecases.ai/use-case/run-large-scale-cold-email-campaigns-with-claude-code"
---

# Run large-scale cold email campaigns with Claude Code

> The poster uses Claude Code to run cold email workflows sending 10-20K emails per client monthly, replacing a Clay bill.

**Category:** Sales, Marketing & Support  
**Agent:** Claude Code  
**Source:** Reddit · Apr 2, 2026

## What they did

The poster says they built a single outbound plugin around Claude Code agents that automates most of a cold email agency workflow: buying domains through Namecheap, setting DNS in Cloudflare, creating inboxes with Zapmail/Aerosend, warming them, researching offers with scraped company and competitor data, mapping TAM, enriching leads, finding and verifying emails, and setting up campaigns. A person still steps in most during TAM mapping, where a growth manager starts each client’s mapping and adjusts the skill for unusual markets.

## How it went

They say this let them cancel a $350/month Clay subscription and run outbound solo, with most clients sending at least 40,000 emails a month and some near 100,000. In comments they report roughly 2% to 4% reply rates, while noting results depend mostly on the offer.

## Worth knowing

The biggest catch is maintenance and human oversight in TAM mapping; the post says this is still a big human-in-the-loop system for unique markets.

## Prompt

```text
Help me set up a cold email workflow for [client or business] targeting [audience description]. Build a lead list of [number] contacts from [data source or CSV], enrich each with [fields like role, company, recent news], and write personalized first lines and a [number]-step sequence in [tone]. Save everything as a CSV ready to import into [sending tool]. Before sending or scheduling anything, pause and show me a sample of [10] emails and the send settings for approval.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Index a newsletter archive and repurpose writing](./index-a-newsletter-archive-and-repurpose-writing.md)
- [Build a company structure with Claude Code agents](./build-a-company-structure-with-claude-code-agents.md)
- [Sell services through an agent that takes payment and delivers](./sell-services-through-an-agent-that-takes-payment-and-delive.md)
- [Run full-stack SEO with an n8n agent](./run-full-stack-seo-with-an-n8n-agent.md)
- [Auto-apply to jobs on LinkedIn with ChatGPT Agent](./auto-apply-to-jobs-on-linkedin-with-chatgpt-agent.md)
