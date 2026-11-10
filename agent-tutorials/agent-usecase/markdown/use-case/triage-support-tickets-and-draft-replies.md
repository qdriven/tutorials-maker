---
title: "Triage support tickets and draft replies"
slug: "triage-support-tickets-and-draft-replies"
summary: "A Claude Code skill builds scripts against support, billing and database APIs to list and triage tickets, gather billing context, draft replies, and run refunds and cancellations."
category: "Sales, Marketing & Support"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "github.com"
source_date: "Undated"
source_url: "https://github.com/nbashaw/claude-cs"
fetched_from: "https://agentusecases.ai/use-case/triage-support-tickets-and-draft-replies"
---

# Triage support tickets and draft replies

> A Claude Code skill builds scripts against support, billing and database APIs to list and triage tickets, gather billing context, draft replies, and run refunds and cancellations.

**Category:** Sales, Marketing & Support  
**Agent:** Claude Code  
**Source:** github.com · Undated

## What they did

The skill interviews you about your support stack, then writes TypeScript scripts for your ticketing, billing and database APIs, plus response templates. Once built, the agent lists and triages every open ticket, proposes the most urgent one, pulls billing and customer context, and drafts a reply. You approve before anything is sent, refunded or closed.

## How it went

For the Lex setup (HelpScout, Stripe, PostgreSQL), the author built 15 scripts and 6 templates. He says it handles about 80% of support tasks with yes/no approvals.

## Worth knowing

Setup takes roughly 30-60 minutes for core scripts and templates, and you need API credentials. Database access is read-only, and the README says nothing goes out without your approval.

## Prompt

```text
Write scripts that connect to my [support tool] and [billing tool] APIs using the credentials in [env file], list open tickets, and sort them by urgency. For each ticket, pull the customer's billing context and draft a reply in a file for me to review. Do not send any reply, issue any refund, or cancel any account; pause and show me the exact action first.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Search years of research files in an Obsidian vault](./search-years-of-research-files-in-an-obsidian-vault.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Sell services through an agent that takes payment and delivers](./sell-services-through-an-agent-that-takes-payment-and-delive.md)
- [Manage customer enquiries from Telegram](./manage-customer-enquiries-from-telegram.md)
- [Run SEO strategy and content with Claude to grow a product](./run-seo-strategy-and-content-with-claude-to-grow-a-product.md)
