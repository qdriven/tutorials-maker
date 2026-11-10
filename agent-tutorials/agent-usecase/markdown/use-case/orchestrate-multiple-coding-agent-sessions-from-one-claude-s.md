---
title: "Orchestrate multiple coding agent sessions from one Claude session"
slug: "orchestrate-multiple-coding-agent-sessions-from-one-claude-s"
summary: "A developer talks to one Claude session that messages other agent sessions (including Codex) as orchestrator, reachable from CLI, mobile app and IRC, to load-balance token usage."
category: "Software & DevOps"
agents:
  - name: "Claude"
    slug: "claude"
  - name: "Claude Code"
    slug: "claude-code"
  - name: "Codex"
    slug: "codex"
source_platform: "HN"
source_date: "Nov 4, 2026"
source_url: "https://news.ycombinator.com/item?id=50368019"
fetched_from: "https://agentusecases.ai/use-case/orchestrate-multiple-coding-agent-sessions-from-one-claude-s"
---

# Orchestrate multiple coding agent sessions from one Claude session

> A developer talks to one Claude session that messages other agent sessions (including Codex) as orchestrator, reachable from CLI, mobile app and IRC, to load-balance token usage.

**Category:** Software & DevOps  
**Agent:** Claude, Claude Code, Codex  
**Source:** HN · Nov 4, 2026

## What they did

The developer talks mostly to a single Opus 5.5 session, chosen for its 1M context window, and lets it message other agent sessions as an orchestrator. They use it from the CLI and the mobile app. Claude often calls Codex on their behalf. Some agents are also reachable over IRC through a small CLI they're building.

## How it went

The workflow replaced the need for complex orchestration tools or agent platforms. Delegation was once for quality problems; now it mainly load-balances token usage across Claude and Codex subscriptions. The IRC CLI is still in progress.

## Worth knowing

This assumes subscriptions to both Claude and Codex, mostly at top tiers, which the author adjusts up or down depending on usage.

## Prompt

```text
Help me set up an orchestrator workflow where this Claude Code session can send tasks to other agent sessions, including [Codex or another coding agent], and collect their replies. Start by proposing a simple setup for [my project folder] where I give you one goal and you split it into [number] parallel tasks. Show me the plan and wait for my approval before launching any sessions, and finish by summarizing what each session did.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Let Claude read Apple Health and Fitbit data via MCP](./let-claude-read-apple-health-and-fitbit-data-via-mcp.md)
- [Run each coding agent session in a cgroup that is killed on completion](./run-each-coding-agent-session-in-a-cgroup-that-is-killed-on-.md)
- [Review Linux kernel patches](./review-linux-kernel-patches.md)
- [Build a full CRM with email, video and calendar](./build-a-full-crm-with-email-video-and-calendar.md)
- [Check code against user intent with review agents and tests](./check-code-against-user-intent-with-review-agents-and-tests.md)
