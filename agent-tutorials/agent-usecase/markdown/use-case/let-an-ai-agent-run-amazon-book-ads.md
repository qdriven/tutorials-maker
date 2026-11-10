---
title: "Let an AI agent run Amazon book ads"
slug: "let-an-ai-agent-run-amazon-book-ads"
summary: "An author gave an AI agent control of their Amazon ads account; it pulls reports via the Ads API on a schedule, changes bids, adds negatives, and pauses campaigns without approval."
category: "Sales, Marketing & Support"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_platform: "Reddit"
source_date: "Undated"
source_url: "https://www.reddit.com/r/ClaudeAI/comments/1umauys/anyone_else_letting_an_ai_run_their_book_ads"
fetched_from: "https://agentusecases.ai/use-case/let-an-ai-agent-run-amazon-book-ads"
---

# Let an AI agent run Amazon book ads

> An author gave an AI agent control of their Amazon ads account; it pulls reports via the Ads API on a schedule, changes bids, adds negatives, and pauses campaigns without approval.

**Category:** Sales, Marketing & Support  
**Agent:** custom-built or unnamed agent  
**Source:** Reddit · Undated

## What they did

The author wired Claude to the Amazon Ads API to run every three days across about 10 nonfiction titles. It pulled reports, changed bids, added negative keywords, paused campaigns, and logged its reasoning, with hard limits in a config file for spend, bid changes, and campaign creation; the author also fed it search data from the GitHub tool kdp-scout and kept editorial changes as manual-only proposals.

## How it went

After about six weeks, June finished at $682 in royalties against $757 in ad spend, an improvement from losing more money before. It also made a costly mistake by cloning winning keywords into a higher-bid campaign that competed with the original and caused nearly two days of dead sales, though the author later added dedupe rules and the agent shut down unprofitable Germany and Spain campaigns on its own.

## Worth knowing

The main catch was attribution lag: the author learned to ignore the last two days of Amazon ads data before cutting anything, and capped the system with an €800 monthly budget plus daily limits.

## Prompt

```text
Connect to my Amazon Ads account using the API credentials in [secure location] and pull a report of my book campaigns for the last [number] days. Recommend bid changes, negative keywords, and campaigns to pause, with the numbers behind each. Show me the full list and wait for my approval before changing or pausing anything.
```

## Related use cases

- [Sell services through an agent that takes payment and delivers](./sell-services-through-an-agent-that-takes-payment-and-delive.md)
- [Resolve customer calls proactively with AI agents](./resolve-customer-calls-proactively-with-ai-agents.md)
- [Run a Monday competitor-monitoring brief from job listings](./run-a-monday-competitor-monitoring-brief-from-job-listings.md)
- [Draft daily niche-news posts for four social platforms](./draft-daily-niche-news-posts-for-four-social-platforms.md)
- [Qualify leads and draft emails pending human approval](./qualify-leads-and-draft-emails-pending-human-approval.md)
- [Research and suggest X posts for Slack approval](./research-and-suggest-x-posts-for-slack-approval.md)
