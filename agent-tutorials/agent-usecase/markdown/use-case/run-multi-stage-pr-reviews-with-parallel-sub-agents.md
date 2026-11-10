---
title: "Run multi-stage PR reviews with parallel sub-agents"
slug: "run-multi-stage-pr-reviews-with-parallel-sub-agents"
summary: "A Claude Code plugin that reviews pull requests in stages with sub-agents and validation passes, with optional ensemble review via Codex. · May 11, 2026"
category: "Software & DevOps"
agents:
  - name: "Claude Code"
    slug: "claude-code"
  - name: "Codex"
    slug: "codex"
source_url: "https://github.com/adamjgmiller/adamsreview"
fetched_from: "https://agentusecases.ai/use-case/run-multi-stage-pr-reviews-with-parallel-sub-agents"
---

# Run multi-stage PR reviews with parallel sub-agents

> A Claude Code plugin that reviews pull requests in stages with sub-agents and validation passes, with optional ensemble review via Codex. · May 11, 2026

**Category:** Software & DevOps  
**Agent:** Claude Code, Codex

## What they did

The /adamsreview:review command runs up to seven parallel sub-agent lenses (correctness, security, UX and others) on a branch or PR. Their findings go through dedup, a cheap-then-deep validation gate, and an optional Opus cross-cutting pass. With --ensemble it adds a Codex pass and a scrape of PR bot comments. /adamsreview:fix then runs fix sub-agents in parallel, re-reviews with Opus, reverts regressions and commits the rest. /adamsreview:walkthrough lets a person decide on uncertain findings.

## How it went

The author reports, anecdotally on their own PRs (n=me), that it catches far more real bugs than /review, /ultrareview, CodeRabbit, Greptile and Codex review, with fewer false positives. No measured numbers are given.

## Worth knowing

--ensemble costs more tokens and needs the Codex Claude Code plugin. Runs on a regular Claude Code subscription (Max recommended), not Extra Usage credits like /ultrareview.

## Prompt

```text
Review the pull request at [PR URL or branch name] in stages: use separate sub-agents to check correctness, security, tests, and style, then run a validation pass that discards findings you can't back up with a specific line of code. Finish with one ranked list of issues, each with file, line, and a suggested fix. Don't post any comments to the PR; just show me the list.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Build and balance a live Telegram RPG](./build-and-balance-a-live-telegram-rpg.md)
- [Run a live Kalshi prediction-market account autonomously](./run-a-live-kalshi-prediction-market-account-autonomously.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Click through apps to verify its own work](./click-through-apps-to-verify-its-own-work.md)
- [Auto-generate a searchable help video library for an app](./auto-generate-a-searchable-help-video-library-for-an-app.md)
