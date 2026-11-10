---
title: "Hand off coding sessions between agent accounts at usage limits"
slug: "hand-off-coding-sessions-between-agent-accounts-at-usage-lim"
summary: "A developer built an app that tracks usage across multiple Codex and Claude Code accounts and auto-hands-off conversations when one hits its limit."
category: "Software & DevOps"
agents:
  - name: "Codex"
    slug: "codex"
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "HN"
source_date: "Oct 6, 2026"
source_url: "https://news.ycombinator.com/item?id=49973683"
fetched_from: "https://agentusecases.ai/use-case/hand-off-coding-sessions-between-agent-accounts-at-usage-lim"
---

# Hand off coding sessions between agent accounts at usage limits

> A developer built an app that tracks usage across multiple Codex and Claude Code accounts and auto-hands-off conversations when one hits its limit.

**Category:** Software & DevOps  
**Agent:** Codex, Claude Code  
**Source:** HN · Oct 6, 2026

## What they did

The developer, teivz, runs several Codex and Claude Code accounts and was tired of copying context to another account whenever one hit its usage limit. They built a transcript server that runs on their own computer with a web UI. It shows usage for every account in one place and hands a conversation to another account automatically at the limit.

## How it went

The source gives no numbers or test results. It lists the app's features (manual account choice, media file management, history search, integrations) and asks for feedback, so how well handoffs preserve context is unreported.

## Worth knowing

The source does not explain how context is transferred or whether the app is available to install, so check the original thread before planning to copy this.

## Prompt

```text
Build me a small local tool that tracks usage across my [number] Codex and Claude Code accounts and warns me when one is close to its limit. When an account hits its limit, it should save a summary of the current session (task, files touched, next steps) so I can paste it into another account and continue. Done means I can run it, see usage per account, and generate a handoff note; show me the plan before it touches any credentials or config files.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Patch laptop BIOS to unlock hidden firmware menus](./patch-laptop-bios-to-unlock-hidden-firmware-menus.md)
- [Run a live Kalshi prediction-market account autonomously](./run-a-live-kalshi-prediction-market-account-autonomously.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Click through apps to verify its own work](./click-through-apps-to-verify-its-own-work.md)
- [Auto-generate a searchable help video library for an app](./auto-generate-a-searchable-help-video-library-for-an-app.md)
