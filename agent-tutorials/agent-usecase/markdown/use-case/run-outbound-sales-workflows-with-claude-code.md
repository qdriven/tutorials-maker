---
title: "Run outbound sales workflows with Claude Code"
slug: "run-outbound-sales-workflows-with-claude-code"
summary: "Four workflows cover pre-call research, event attendee scraping, a daily hot-leads digest, and post-call CRM updates and follow-up drafts."
category: "Sales, Marketing & Support"
agents:
  - name: "Claude Code"
    slug: "claude-code"
  - name: "Claude Cowork"
    slug: "claude-cowork"
source_platform: "salesforge.ai"
source_date: "Undated"
source_url: "https://www.salesforge.ai/blog/claude-code-for-outbound-sales"
fetched_from: "https://agentusecases.ai/use-case/run-outbound-sales-workflows-with-claude-code"
---

# Run outbound sales workflows with Claude Code

> Four workflows cover pre-call research, event attendee scraping, a daily hot-leads digest, and post-call CRM updates and follow-up drafts.

**Category:** Sales, Marketing & Support  
**Agent:** Claude Code, Claude Cowork  
**Source:** salesforge.ai · Undated

## What they did

Claude Code builds two workflows. A pre-call brief comes from three research agents, which a HubSpot meeting booking triggers and which post to Slack. An event scraper uses Firecrawl as an MCP server, takes a described schema, then enriches through Leadsforge into a Salesforge campaign. Claude co-work runs a 7:30 a.m. hot-leads digest and a post-call agent that updates whitelisted CRM fields and drafts follow-ups for AE review.

## How it went

The author reports briefs in under 2 minutes versus 30-45, and event lists in 20-30 minutes versus 4-6 hours. One conference list booked five meetings. Post-call admin drops from 2.5 hours to 10 minutes a day. These are self-reported figures.

## Worth knowing

The author says the digest and post-call agents took about a week to get right, since they depend on your CRM structure and scoring rules. Start with read-only access.

## Prompt

```text
Help me with sales prep. Before my call with [person and company] on [date], research the company, the person's background and recent news, and give me a one-page brief with three talking points. After the call, I'll paste my notes: turn them into CRM update text and a follow-up email draft. Don't send the email or change the CRM until I've reviewed it.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Track personal finances nightly from bank emails](./track-personal-finances-nightly-from-bank-emails.md)
- [Summarize Reddit threads before writing code](./summarize-reddit-threads-before-writing-code.md)
- [Sell services through an agent that takes payment and delivers](./sell-services-through-an-agent-that-takes-payment-and-delive.md)
- [Run a daily SEO article campaign](./run-a-daily-seo-article-campaign.md)
- [Run SEO strategy and content with Claude to grow a product](./run-seo-strategy-and-content-with-claude-to-grow-a-product.md)
