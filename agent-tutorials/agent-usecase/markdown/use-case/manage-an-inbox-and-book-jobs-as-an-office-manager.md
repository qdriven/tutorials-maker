---
title: "Manage an inbox and book jobs as an office manager"
slug: "manage-an-inbox-and-book-jobs-as-an-office-manager"
summary: "Users run Grok Bot as an inbox manager and as an office manager that takes work orders, plans capacity and books jobs across Gmail, Slack, and ServiceTitan."
category: "Work & Operations"
agents:
  - name: "Grok Bot"
    slug: "grok-bot"
  - name: "Cursor"
    slug: "cursor"
source_platform: "Reddit"
source_date: "Aug 26, 2026"
source_url: "https://www.reddit.com/r/cursor/comments/1vz4cei/grok_bot_is_now_included_with_cursor_pro"
fetched_from: "https://agentusecases.ai/use-case/manage-an-inbox-and-book-jobs-as-an-office-manager"
---

# Manage an inbox and book jobs as an office manager

> Users run Grok Bot as an inbox manager and as an office manager that takes work orders, plans capacity and books jobs across Gmail, Slack, and ServiceTitan.

**Category:** Work & Operations  
**Agent:** Grok Bot, Cursor  
**Source:** Reddit · Aug 26, 2026

## What they did

The post says Grok Bot acts as a persistent bot with its own computer, so people can sign it into work tools and hand off tasks that keep running even after their own machine is off. For the office-manager and inbox uses described there, the bot is given access to Gmail, Slack, ServiceTitan, and a client portal, then works through email, intakes work orders, plans capacity, and books jobs, only returning when a person needs to approve or handle exceptions.

## How it went

The thread gives no hard performance numbers or case-study results. The clearest limitation mentioned is that some users on Cursor legacy Pro plans could not access Grok Bot, and one commenter said website browsing was clumsy and opened unnecessary tabs.

## Worth knowing

A practical catch from the comments: Grok Bot was not included for at least some legacy Cursor Pro plans, despite the announcement.

## Prompt

```text
Act as my office manager for [business type]. Watch [Gmail inbox and Slack channel] for new work orders, check our capacity in [scheduling tool, e.g. ServiceTitan], and draft a proposed booking for each job. Pause and show me each booking and any reply before you schedule it or send a message. Finish by giving me a summary of the jobs handled and any you couldn't place.
```

## Related use cases

- [Keep coding agents running autonomously for long stretches](./keep-coding-agents-running-autonomously-for-long-stretches.md)
- [Review support tickets and synthesize product feedback](./review-support-tickets-and-synthesize-product-feedback.md)
- [Monitor competitor marketplace prices](./monitor-competitor-marketplace-prices.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Screen candidates and summarize resumes with AI](./screen-candidates-and-summarize-resumes-with-ai.md)
- [Turn receipts into CSV for bookkeeping](./turn-receipts-into-csv-for-bookkeeping.md)
