---
title: "Run marketing operations with a team of subagents"
slug: "run-marketing-operations-with-a-team-of-subagents"
summary: "A CMO agent reads the weekly plan and spawns specialist subagents like a social media marketer and performance reviewer; the social agent double-posted to Reddit in week one."
category: "Sales, Marketing & Support"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "Reddit"
source_date: "May 25, 2026"
source_url: "https://www.reddit.com/r/AskGTM/comments/1tngr97/automated_my_marketing_operations_with_claude_code"
fetched_from: "https://agentusecases.ai/use-case/run-marketing-operations-with-a-team-of-subagents"
---

# Run marketing operations with a team of subagents

> A CMO agent reads the weekly plan and spawns specialist subagents like a social media marketer and performance reviewer; the social agent double-posted to Reddit in week one.

**Category:** Sales, Marketing & Support  
**Agent:** Claude Code  
**Source:** Reddit · May 25, 2026

## What they did

The poster set up a Chief Marketing Officer agent in Claude Code that reads a weekly plan, checks the current three-hour slot, and then launches specialist subagents for each task. Those agents live as markdown files in .claude/agents/ and can use custom scripts and integrations, including a Reddit OAuth2 client, a Hacker News headless client, Google Gemini for images, Sanity CDN uploads, and Slack notifications; the human appears to define the plan and refine rules.

## How it went

It automated recurring marketing work across channels, but the post calls out one clear failure: in week one the social media agent double-posted to Reddit because the instruction against duplicates was too vague. The comments frame this as a working system that still needed tighter guardrails.

## Worth knowing

The most useful catch was that prompt wording mattered operationally: saying “no duplicate comments” was not specific enough to stop repeated Reddit posts.

## Prompt

```text
Set up a small marketing team of subagents for [my business]: a lead agent that reads my weekly plan in [path/to/plan file] and delegates to a social media specialist and a performance reviewer. Have them draft this week's posts for [platforms] and a summary of last week's results. Before any post is published, show me the final text and destination, and check that nothing gets posted twice.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Link journal entries and write book reviews in Obsidian](./link-journal-entries-and-write-book-reviews-in-obsidian.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Sell services through an agent that takes payment and delivers](./sell-services-through-an-agent-that-takes-payment-and-delive.md)
- [Manage customer enquiries from Telegram](./manage-customer-enquiries-from-telegram.md)
- [Run SEO strategy and content with Claude to grow a product](./run-seo-strategy-and-content-with-claude-to-grow-a-product.md)
