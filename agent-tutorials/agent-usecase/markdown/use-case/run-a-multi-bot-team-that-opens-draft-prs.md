---
title: "Run a multi-bot team that opens draft PRs"
slug: "run-a-multi-bot-team-that-opens-draft-prs"
summary: "A Grok setup of research, classifier, builder, tester, reviewer, and security bots maps repos, makes minimal changes, runs tests and lint, and opens draft PRs; the author reports over 1,000 PRs."
category: "Software & DevOps"
agents:
  - name: "Grok Bot"
    slug: "grok-bot"
source_platform: "X"
source_date: "Oct 4, 2026"
source_url: "https://x.com/0xMorlex/status/2106722078544007517"
fetched_from: "https://agentusecases.ai/use-case/run-a-multi-bot-team-that-opens-draft-prs"
---

# Run a multi-bot team that opens draft PRs

> A Grok setup of research, classifier, builder, tester, reviewer, and security bots maps repos, makes minimal changes, runs tests and lint, and opens draft PRs; the author reports over 1,000 PRs.

**Category:** Software & DevOps  
**Agent:** Grok Bot  
**Source:** X · Oct 4, 2026

## What they did

The author set up six sequential Grok bots. The first reads the issue and maps the repo to relevant files and prior PRs, passing only useful context. The second classifies the task and risk level to route it. The builder writes the smallest possible code change. A tester bot then runs tests, lint, type checks and builds, feeding failures back to the builder. A separate reviewer examines the diff for regressions and missing tests. A final security bot checks secrets, auth and dependencies before opening a draft PR.

## How it went

The loop produced over 1,000 PRs. No shortfalls are stated.

## Prompt

```text
Set up a team of bots for my repo [repo URL]: one maps the codebase, one classifies the task from [issue tracker or label], one builds a minimal change, one runs tests and lint, one reviews, and one checks security. Each task should end in a draft pull request with a summary of what changed and the test results. Never merge or push to the main branch; leave every PR as a draft for me to review.
```

## Related use cases

- [Plan and book a short-notice work trip](./plan-and-book-a-short-notice-work-trip.md)
- [File receipts from a folder](./file-receipts-from-a-folder.md)
- [Watch weekly deals and buy regular items](./watch-weekly-deals-and-buy-regular-items.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build and deploy an app over a weekend](./build-and-deploy-an-app-over-a-weekend.md)
- [Split frontend and backend work across Claude Code and Codex](./split-frontend-and-backend-work-across-claude-code-and-codex.md)
