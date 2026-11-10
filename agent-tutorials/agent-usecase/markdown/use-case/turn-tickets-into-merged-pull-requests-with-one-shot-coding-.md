---
title: "Turn tickets into merged pull requests with one-shot coding agents"
slug: "turn-tickets-into-merged-pull-requests-with-one-shot-coding-"
summary: "Stripe describes its internal Minions coding agents that take tasks end to end into code changes; the post is a headline only. · Feb 20, 2026"
category: "Software & DevOps"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_url: "https://stripe.dev/blog/minions-stripes-one-shot-end-to-end-coding-agents-part-2"
fetched_from: "https://agentusecases.ai/use-case/turn-tickets-into-merged-pull-requests-with-one-shot-coding-"
---

# Turn tickets into merged pull requests with one-shot coding agents

> Stripe describes its internal Minions coding agents that take tasks end to end into code changes; the post is a headline only. · Feb 20, 2026

**Category:** Software & DevOps  
**Agent:** custom-built or unnamed agent

## What they did

The fetched page holds only the post's header and summary, not the article body. Minions are Stripe's in-house coding agents. They write a code change from start to finish, and humans then review it. The mechanics of how they work and how Stripe built them are in the full post, which this page didn't include.

## How it went

Stripe says Minions are responsible for more than a thousand pull requests merged each week. The page gives no other numbers and no shortfalls.

## Prompt

```text
Take this ticket: [paste ticket text] and work on it in my repo at [repo path or URL]. Make the code change on a new branch, run the existing tests and linters, and fix failures until they pass. When done, show me the diff and a draft pull request description, and pause for my approval before pushing or opening the PR.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Hand narrow code changes to Devin for pull requests](./hand-narrow-code-changes-to-devin-for-pull-requests.md)
- [Build and deploy a Game of Life simulation site](./build-and-deploy-a-game-of-life-simulation-site.md)
- [Manage NixOS server configs with Claude Code](./manage-nixos-server-configs-with-claude-code.md)
- [Fix a Linux kernel memory management problem with Claude](./fix-a-linux-kernel-memory-management-problem-with-claude.md)
- [Turn Sentry bug reports into fix pull requests](./turn-sentry-bug-reports-into-fix-pull-requests.md)
