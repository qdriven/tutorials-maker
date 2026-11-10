---
title: "Turn tickets into merged pull requests"
slug: "turn-tickets-into-merged-pull-requests"
summary: "Pulls tasks from GitHub Issues or Linear, then runs Claude Code or Codex in isolated Kubernetes pods to carry each one through to a PR. · Mar 25, 2026"
category: "Software & DevOps"
agents:
  - name: "Claude Code"
    slug: "claude-code"
  - name: "Codex"
    slug: "codex"
source_url: "https://github.com/jonwiggins/optio"
fetched_from: "https://agentusecases.ai/use-case/turn-tickets-into-merged-pull-requests"
---

# Turn tickets into merged pull requests

> Pulls tasks from GitHub Issues or Linear, then runs Claude Code or Codex in isolated Kubernetes pods to carry each one through to a PR. · Mar 25, 2026

**Category:** Software & DevOps  
**Agent:** Claude Code, Codex

## What they did

Optio is a self-hosted tool you run on Kubernetes. You assign it a GitHub Issue, Linear ticket or Jira card. It finds or creates a long-lived pod for the repo and adds a git worktree. It runs the agent there and opens a PR. A PR watcher polls CI and review state, and resumes the agent with context on CI failures, merge conflicts or review feedback. A review agent also runs.

## How it went

The README says the pipeline runs end to end, squash-merging when CI is green and the review is done, then closing the linked issue and recording cost. It gives no success rates or benchmark numbers.

## Worth knowing

It needs Kubernetes v1.33 or newer, Helm, Postgres and Redis. Auto-resumes are capped by the OPTIO_MAX_AUTO_RESUMES setting, so stuck PRs can still need a person.

## Prompt

```text
Look at the open issues in my repo [owner/repo] labeled [label, e.g. good-first-issue] and pick the [number, e.g. 3] smallest ones. For each, work on its own branch, make the fix, run the tests, and prepare a draft pull request description. Pause and show me each diff and PR description before you push anything or open a PR.
```

## Related use cases

- [Run multi-stage PR reviews with parallel sub-agents](./run-multi-stage-pr-reviews-with-parallel-sub-agents.md)
- [Build and balance a live Telegram RPG](./build-and-balance-a-live-telegram-rpg.md)
- [Run a live Kalshi prediction-market account autonomously](./run-a-live-kalshi-prediction-market-account-autonomously.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Click through apps to verify its own work](./click-through-apps-to-verify-its-own-work.md)
- [Auto-generate a searchable help video library for an app](./auto-generate-a-searchable-help-video-library-for-an-app.md)
