---
title: "Run weekly lookalike outbound from closed-won deals"
slug: "run-weekly-lookalike-outbound-from-closed-won-deals"
summary: "A marketer built a Claude Cowork scheduled agent connecting HubSpot, Clay, Slack and email that uses weekly closed-won deals to drive lookalike outbound."
category: "Sales, Marketing & Support"
agents:
  - name: "Claude Cowork"
    slug: "claude-cowork"
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "newsletter.mkt1.co"
source_date: "Undated"
source_url: "https://newsletter.mkt1.co/p/real-marketers-claude-code-builds"
fetched_from: "https://agentusecases.ai/use-case/run-weekly-lookalike-outbound-from-closed-won-deals"
---

# Run weekly lookalike outbound from closed-won deals

> A marketer built a Claude Cowork scheduled agent connecting HubSpot, Clay, Slack and email that uses weekly closed-won deals to drive lookalike outbound.

**Category:** Sales, Marketing & Support  
**Agent:** Claude Cowork, Claude Code  
**Source:** newsletter.mkt1.co · Undated

## What they did

Elaine Zelby connected HubSpot, Clay, Slack and email to Claude Cowork using the official Claude Connectors, then built the workflow one piece at a time. Each week it reviews deals that reached closed-won in the last 7 days and pulls call data from HubSpot. It picks 10 lookalike companies, finds 3–5 contacts each in Clay, drafts a 4-email sequence plus LinkedIn DMs, and posts the drafts to Slack for review.

## How it went

The drafts come out close to sendable, helped by structured call data already in the CRM. Sending is not automated, because Elaine keeps a human in the loop. The source gives no results data.

## Worth knowing

Before building the agent, write reusable skills for ICP, personas, messaging and product information. Elaine says these made the agent much easier to assemble.

## Prompt

```text
Every [day of week] at [time], pull the deals marked closed-won in the last week from [CRM, e.g. HubSpot]. Find [number] lookalike companies for each using [enrichment tool or public sources], and draft a short personalized outbound email for each contact. Save the drafts and post a summary to [Slack channel]; do not send any email until I approve the batch.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Link journal entries and write book reviews in Obsidian](./link-journal-entries-and-write-book-reviews-in-obsidian.md)
- [Code with OpenCode and DeepSeek instead of Claude Code](./code-with-opencode-and-deepseek-instead-of-claude-code.md)
- [Sell services through an agent that takes payment and delivers](./sell-services-through-an-agent-that-takes-payment-and-delive.md)
- [Find stale commercial listings and email brokers](./find-stale-commercial-listings-and-email-brokers.md)
- [Auto-apply to jobs on LinkedIn with ChatGPT Agent](./auto-apply-to-jobs-on-linkedin-with-chatgpt-agent.md)
