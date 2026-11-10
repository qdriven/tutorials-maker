---
title: "Code in the terminal with an agent"
slug: "code-in-the-terminal-with-an-agent"
summary: "The poster uses Grok as a terminal coding agent that reads, edits, runs tools and spawns sub-agents."
category: "Software & DevOps"
agents:
  - name: "Grok Bot"
    slug: "grok-bot"
source_platform: "Reddit"
source_date: "Sep 10, 2026"
source_url: "https://www.reddit.com/r/AI_Agents/comments/1v3gtvc/grok_is_surprisingly_good_as_a_terminal_coding"
fetched_from: "https://agentusecases.ai/use-case/code-in-the-terminal-with-an-agent"
---

# Code in the terminal with an agent

> The poster uses Grok as a terminal coding agent that reads, edits, runs tools and spawns sub-agents.

**Category:** Software & DevOps  
**Agent:** Grok Bot  
**Source:** Reddit · Sep 10, 2026

## What they did

The poster says they built agenc-core as a terminal agent harness where Grok drives the work directly in a CLI/TUI: it reads files, edits code, runs tools, and can spawn parallel sub-agents with separate context, tools, and token budgets. In the example they watched it split a divisible job into eight workers to build eight separate C terminal games at once, while the main orchestrator integrated and verified the results and a human handled approval prompts for tool calls.

## How it went

The post presents it as working well enough to be the author’s showcase, including the eight-game parallel build and integrations like Ledger actions gated by on-device approval. It does not give benchmark numbers, failure rates, or a detailed comparison against other coding agents.

## Worth knowing

The main catch is the permission model: tool calls can require human approval, and any Ledger action that moves value needs physical confirmation on the device.

## Prompt

```text
In the project at [path to repo], I want you to [describe feature or bug fix]. Read the relevant code first, make the edits, and run [test or build command] to check that it works. Show me a summary of the changes when you're done, and ask before deleting any files or running anything destructive.
```

## Related use cases

- [Plan and book a short-notice work trip](./plan-and-book-a-short-notice-work-trip.md)
- [File receipts from a folder](./file-receipts-from-a-folder.md)
- [Monitor competitor marketplace prices](./monitor-competitor-marketplace-prices.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build and deploy an app over a weekend](./build-and-deploy-an-app-over-a-weekend.md)
- [Split frontend and backend work across Claude Code and Codex](./split-frontend-and-backend-work-across-claude-code-and-codex.md)
