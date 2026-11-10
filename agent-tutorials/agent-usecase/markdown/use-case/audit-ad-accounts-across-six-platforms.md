---
title: "Audit ad accounts across six platforms"
slug: "audit-ad-accounts-across-six-platforms"
summary: "A Claude Code skill runs parallel subagents performing 190 audit checks across ad platforms and produces a prioritized action plan."
category: "Sales, Marketing & Support"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "X"
source_date: "Apr 10, 2026"
source_url: "https://x.com/ihteshamali/status/2042392207425225067"
fetched_from: "https://agentusecases.ai/use-case/audit-ad-accounts-across-six-platforms"
---

# Audit ad accounts across six platforms

> A Claude Code skill runs parallel subagents performing 190 audit checks across ad platforms and produces a prioritized action plan.

**Category:** Sales, Marketing & Support  
**Agent:** Claude Code  
**Source:** X · Apr 10, 2026

## What they did

The Claude Ads skill is run via one command that launches six parallel subagents. They execute 190 checks (74 on Google, 46 on Meta, plus the rest on YouTube, LinkedIn, TikTok, and Microsoft Ads), apply the 3x Kill Rule to flag campaigns, enforce per-platform budget rules, run compliance checks for housing/credit/finance/healthcare, and pull from 11 industry templates. The user grants ad-account access and executes the command; subagents produce the consolidated output autonomously.

## How it went

It outputs a single Ads Health Score and revenue-impact-ranked action plan that replaced a $4,000/month agency. No performance metrics or shortfalls are stated.

## Worth knowing

Free, open-source MIT project with 714 GitHub stars.

## Prompt

```text
I run ads on [list of platforms, e.g. Google, Meta, LinkedIn]. Using the exports or reports in [folder path], check each account for wasted spend, weak targeting, missing tracking and poor creative performance. Finish with a single prioritized action plan ranked by likely impact, with a short reason for each item. Do not change anything in the accounts; this is read-only.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Link journal entries and write book reviews in Obsidian](./link-journal-entries-and-write-book-reviews-in-obsidian.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Sell services through an agent that takes payment and delivers](./sell-services-through-an-agent-that-takes-payment-and-delive.md)
- [Manage customer enquiries from Telegram](./manage-customer-enquiries-from-telegram.md)
- [Run SEO strategy and content with Claude to grow a product](./run-seo-strategy-and-content-with-claude-to-grow-a-product.md)
