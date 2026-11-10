---
title: "Split frontend and backend work across Claude Code and Codex"
slug: "split-frontend-and-backend-work-across-claude-code-and-codex"
summary: "A poster ran Claude Code and Codex in parallel for 15 days, with Claude Code on the frontend and another agent on the backend."
category: "Software & DevOps"
agents:
  - name: "Claude Code"
    slug: "claude-code"
  - name: "Codex"
    slug: "codex"
source_platform: "Reddit"
source_date: "Sep 1, 2026"
source_url: "https://www.reddit.com/r/AI_Agents/comments/1wk113z/i_ran_claude_code_and_codex_in_parallel_for_15"
fetched_from: "https://agentusecases.ai/use-case/split-frontend-and-backend-work-across-claude-code-and-codex"
---

# Split frontend and backend work across Claude Code and Codex

> A poster ran Claude Code and Codex in parallel for 15 days, with Claude Code on the frontend and another agent on the backend.

**Category:** Software & DevOps  
**Agent:** Claude Code, Codex  
**Source:** Reddit · Sep 1, 2026

## What they did

The poster split work between Claude Code on the frontend and Codex on the backend, then used Tutti for 15 days as a shared workspace so both agents could see the same live context, files, and task outputs. Instead of re-explaining work at every handoff, they forwarded task cards between agents, used @ references to pull prior Claude conversations into Codex, and occasionally borrowed a teammate’s agent with its MCP setup already configured.

## How it went

They said the main win was lower coordination overhead: easier handoffs, a board showing in-progress/completed/failed/stopped tasks, and faster recovery from failures by checking the last execution step. The poster also said two weeks was too short to fully stress-test the setup, and agent borrowing was less useful for solo async work.

## Worth knowing

Their clearest advice was to use card forwarding immediately and borrow the teammate agent with the best MCP configuration, since that full setup carries over.

## Prompt

```text
I'm building [project] and want to split the work: you handle the frontend in [frontend folder] and another agent handles the backend in [backend folder]. First write a short shared contract describing the API endpoints and data shapes at [file path]. Then build the frontend against it, and stop when it works with a mock of the backend. Tell me what the backend must match.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Patch laptop BIOS to unlock hidden firmware menus](./patch-laptop-bios-to-unlock-hidden-firmware-menus.md)
- [Use a coding agent for everyday non-programming chores](./use-a-coding-agent-for-everyday-non-programming-chores.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Click through apps to verify its own work](./click-through-apps-to-verify-its-own-work.md)
- [Auto-generate a searchable help video library for an app](./auto-generate-a-searchable-help-video-library-for-an-app.md)
