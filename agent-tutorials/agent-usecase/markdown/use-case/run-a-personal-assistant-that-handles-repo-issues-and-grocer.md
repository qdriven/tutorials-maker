---
title: "Run a personal assistant that handles repo issues and groceries"
slug: "run-a-personal-assistant-that-handles-repo-issues-and-grocer"
summary: "The author uses an oh-my-py agent setup as a personal assistant: it opens repo issues, has another agent ship code and run tests, and orders groceries with a limited virtual card."
category: "Life Admin & Home"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_platform: "HN"
source_date: "Sep 19, 2026"
source_url: "https://news.ycombinator.com/item?id=49766401"
fetched_from: "https://agentusecases.ai/use-case/run-a-personal-assistant-that-handles-repo-issues-and-grocer"
---

# Run a personal assistant that handles repo issues and groceries

> The author uses an oh-my-py agent setup as a personal assistant: it opens repo issues, has another agent ship code and run tests, and orders groceries with a limited virtual card.

**Category:** Life Admin & Home  
**Agent:** custom-built or unnamed agent  
**Source:** HN · Sep 19, 2026

## What they did

The author runs oh-my-py as a personal assistant as well as for coding, with different models for planning, task-vision and advising, routed through OpenRouter providers ordered by cheapest at a minimum speed. Asked in plain language, it opens a repo issue, then another agent ships the code, runs tests and updates master. For groceries it uses Bitwarden machine secrets and a limited virtual card tied to the author's phone.

## How it went

The author reports it gets these tasks done automatically and claims hundreds of hours of work can move with about one hour of input. No concrete measurements or failures are given.

## Worth knowing

Spending is capped by a limited virtual card, and credentials come from Bitwarden machine secrets. Parallel agents work best on tasks that barely overlap.

## Prompt

```text
Act as my personal assistant. First, open a GitHub issue in [repo name] describing [bug or task], then order [grocery items] from [store] using only the spending-limited card I give you. Pause and show me the issue text and the full cart with total before you submit the issue or place the order, and stop once both are confirmed.
```

## Related use cases

- [Get a second opinion on an MRI](./get-a-second-opinion-on-an-mri.md)
- [Manage an inbox and build courses and budgets with Claude Code](./manage-an-inbox-and-build-courses-and-budgets-with-claude-co.md)
- [Let Claude read Apple Health and Fitbit data via MCP](./let-claude-read-apple-health-and-fitbit-data-via-mcp.md)
- [Extract school dates from forwarded emails and flyers](./extract-school-dates-from-forwarded-emails-and-flyers.md)
- [Use a coding agent for everyday non-programming chores](./use-a-coding-agent-for-everyday-non-programming-chores.md)
- [Run personal assistant tasks like medical data and finance reports](./run-personal-assistant-tasks-like-medical-data-and-finance-r.md)
