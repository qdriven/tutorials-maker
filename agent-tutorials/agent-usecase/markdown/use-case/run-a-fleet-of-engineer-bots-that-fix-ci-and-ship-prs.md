---
title: "Run a fleet of engineer bots that fix CI and ship PRs"
slug: "run-a-fleet-of-engineer-bots-that-fix-ci-and-ship-prs"
summary: "A SpaceXAI engineer runs five specialized Grok bots that launch cloud agents, fix failing CI and security issues, trigger reviews, and ship PRs overnight, handling over 200 agents at once."
category: "Software & DevOps"
agents:
  - name: "Grok Bot"
    slug: "grok-bot"
source_platform: "X"
source_date: "Sep 11, 2026"
source_url: "https://x.com/XFreeze/status/2098448967294173482"
fetched_from: "https://agentusecases.ai/use-case/run-a-fleet-of-engineer-bots-that-fix-ci-and-ship-prs"
---

# Run a fleet of engineer bots that fix CI and ship PRs

> A SpaceXAI engineer runs five specialized Grok bots that launch cloud agents, fix failing CI and security issues, trigger reviews, and ship PRs overnight, handling over 200 agents at once.

**Category:** Software & DevOps  
**Agent:** Grok Bot  
**Source:** X · Sep 11, 2026

## What they did

Lingxi gave five specialized Grok bots (iOS/mobile, desktop, Android, infra, harness) access to launch cloud coding agents, inspect their transcripts and screenshots, and manage a shared Notion PR database. Every 30 minutes the bots scanned for failing CI, security issues, and merge conflicts, then sent agents back to fix or triggered reviews. Jenny, the operations bot, ran 5 AM 1:1s, postmortems, and playbook updates.

## How it went

The fleet ran over 200 agents simultaneously (up from Lingxi's manual limit of 15) and produced fresh PRs ready for review each morning after overnight audits. Related Grok Bot work yielded 2,000+ PRs in a month and multi-week features in weeks.

## Prompt

```text
Watch [repo URL] for failing CI runs and security alerts, and launch a separate agent for each one to diagnose it and fix it in a branch. Open a pull request for each fix, request review from [team or person], and post a status summary of everything handled. Do not merge or deploy anything; leave that for me in the morning.
```

## Related use cases

- [Plan and book a short-notice work trip](./plan-and-book-a-short-notice-work-trip.md)
- [File receipts from a folder](./file-receipts-from-a-folder.md)
- [Watch weekly deals and buy regular items](./watch-weekly-deals-and-buy-regular-items.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build and deploy an app over a weekend](./build-and-deploy-an-app-over-a-weekend.md)
- [Split frontend and backend work across Claude Code and Codex](./split-frontend-and-backend-work-across-claude-code-and-codex.md)
