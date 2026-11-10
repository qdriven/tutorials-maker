---
title: "Run parallel local coding agent sessions"
slug: "run-parallel-local-coding-agent-sessions"
summary: "A developer runs up to 10 coding agent sessions at once, using Claude Code and local models on RTX 3090s with cached contexts for daily development work."
category: "Software & DevOps"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "HN"
source_date: "Oct 7, 2026"
source_url: "https://news.ycombinator.com/item?id=49992657"
fetched_from: "https://agentusecases.ai/use-case/run-parallel-local-coding-agent-sessions"
---

# Run parallel local coding agent sessions

> A developer runs up to 10 coding agent sessions at once, using Claude Code and local models on RTX 3090s with cached contexts for daily development work.

**Category:** Software & DevOps  
**Agent:** Claude Code  
**Source:** HN · Oct 7, 2026

## What they did

Roark66 runs coding agents on RTX 3090s with 24GB each, using Claude Code alongside local models. They keep up to 10 agent sessions open at once, though never more than 5 are active at the same moment. Because they control inference, they keep full contexts cached in RAM and can save the cache to disk, so a session isn't re-read in full after sitting idle.

## How it went

Holding about 15 full contexts cached in RAM pushes their local cache utilisation to 95% or more. They say their usage of roughly 1.3B input tokens a week would cost thousands of USD at API prices.

## Worth knowing

Cloud caches expire after 5 minutes or 1 hour, so an idle 500k context gets billed as full input again; local caching avoids that, but you need enough RAM to hold the contexts.

## Prompt

```text
I want to work on [N] separate tasks in my repo at [path] at the same time. For each task, create its own git worktree and branch, work on it independently, run the tests, and summarize what changed. The tasks are: [task 1], [task 2], [task 3]. Stop when each branch has a passing diff ready for my review, and do not merge anything.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Link journal entries and write book reviews in Obsidian](./link-journal-entries-and-write-book-reviews-in-obsidian.md)
- [Produce a finished music release from one chat](./produce-a-finished-music-release-from-one-chat.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a budgeting app from a single prompt](./build-a-budgeting-app-from-a-single-prompt.md)
- [Find bugs with property-testing agent swarms](./find-bugs-with-property-testing-agent-swarms.md)
