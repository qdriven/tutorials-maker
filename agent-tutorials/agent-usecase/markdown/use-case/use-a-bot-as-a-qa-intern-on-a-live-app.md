---
title: "Use a bot as a QA intern on a live app"
slug: "use-a-bot-as-a-qa-intern-on-a-live-app"
summary: "A Grok Bot clicked through an app's core flows several times a day, reported problems and drafted fix PRs; it found a real bug."
category: "Software & DevOps"
agents:
  - name: "Grok Bot"
    slug: "grok-bot"
source_platform: "X"
source_date: "Undated"
source_url: "https://x.com/PrajwalTomar_/article/2088965811776147761"
fetched_from: "https://agentusecases.ai/use-case/use-a-bot-as-a-qa-intern-on-a-live-app"
---

# Use a bot as a QA intern on a live app

> A Grok Bot clicked through an app's core flows several times a day, reported problems and drafted fix PRs; it found a real bug.

**Category:** Software & DevOps  
**Agent:** Grok Bot  
**Source:** X · Undated

## What they did

The agent received access to a cloud computer pointed at one live app. It was instructed to click through core user flows several times a day like a new user, log anything broken or confusing, and draft fix PRs. The owner reviewed the outputs and edited the PRs.

## How it went

In the first 48 hours it found a real signup flow bug on a specific untested screen size. The drafted PR was junior-level and the owner rewrote half of it.

## Worth knowing

The finding mattered more than the fix, which the owner could handle in 20 minutes.

## Prompt

```text
Act as a QA intern for [app URL]. Several times a day, click through the core flows ([flow 1], [flow 2], [flow 3]) and report anything broken with steps to reproduce and screenshots. For real bugs, draft a fix PR in [repo] but don't merge it; show me the report and the PR link.
```

## Related use cases

- [Plan and book a short-notice work trip](./plan-and-book-a-short-notice-work-trip.md)
- [Monitor PC memory and ask before closing apps](./monitor-pc-memory-and-ask-before-closing-apps.md)
- [Watch weekly deals and buy regular items](./watch-weekly-deals-and-buy-regular-items.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build and deploy an app over a weekend](./build-and-deploy-an-app-over-a-weekend.md)
- [Split frontend and backend work across Claude Code and Codex](./split-frontend-and-backend-work-across-claude-code-and-codex.md)
