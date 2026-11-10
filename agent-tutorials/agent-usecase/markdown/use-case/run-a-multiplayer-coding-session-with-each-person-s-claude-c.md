---
title: "Run a multiplayer coding session with each person's Claude Code"
slug: "run-a-multiplayer-coding-session-with-each-person-s-claude-c"
summary: "Claude Squad lets each participant connect their own Claude Code as an agent, with fresh context per feature and spec and review passes."
category: "Software & DevOps"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "Reddit"
source_date: "Undated"
source_url: "https://www.reddit.com/r/ClaudeAI/comments/1svmpkv/built_claude_squad_a_multiplayer_coding_session"
fetched_from: "https://agentusecases.ai/use-case/run-a-multiplayer-coding-session-with-each-person-s-claude-c"
---

# Run a multiplayer coding session with each person's Claude Code

> Claude Squad lets each participant connect their own Claude Code as an agent, with fresh context per feature and spec and review passes.

**Category:** Software & DevOps  
**Agent:** Claude Code  
**Source:** Reddit · Undated

## What they did

The creator built Claude Squad as a self-hosted shared session where each participant runs one CLI command to connect their local Claude Code as an agent. In chat, an orchestrator agent splits the requested feature into parallel tasks, each Claude Code works on its own branch, merges are applied in sequence into one PR, and people step in when flagged merge conflicts need manual resolution.

## How it went

It runs on free-tier Vercel, Supabase, and Partykit, keeps API keys on each person’s machine, and splits token cost across participants. The author says task decomposition is still the main bottleneck; at the time of the thread, conflict handling and post-merge review were still early and lacked much real-world data.

## Worth knowing

Each feature was built with a fresh Claude Code context plus spec and review passes, and collaborators join a session by running a single npx connect command.

## Prompt

```text
Help me set up a shared coding session on [repo] where [number] of us each run our own Claude Code. First write a short spec for [feature], split it into tasks per person, start each task with fresh context, and finish with a review pass of every branch. Stop when each task has a branch ready for me to review, and do not merge anything.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Index a newsletter archive and repurpose writing](./index-a-newsletter-archive-and-repurpose-writing.md)
- [Build a company structure with Claude Code agents](./build-a-company-structure-with-claude-code-agents.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Debug prod pods and docker-compose with Cursor](./debug-prod-pods-and-docker-compose-with-cursor.md)
- [Build code with agents while keeping a working understanding](./build-code-with-agents-while-keeping-a-working-understanding.md)
