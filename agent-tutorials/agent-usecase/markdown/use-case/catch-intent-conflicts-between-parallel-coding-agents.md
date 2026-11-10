---
title: "Catch intent conflicts between parallel coding agents"
slug: "catch-intent-conflicts-between-parallel-coding-agents"
summary: "Agents publish planned changes before editing so conflicting architecture changes across parallel worktrees get flagged before code is written. · Sep 21, 2026"
category: "Software & DevOps"
agents:
  - name: "Claude Code"
    slug: "claude-code"
  - name: "Codex"
    slug: "codex"
  - name: "Cursor"
    slug: "cursor"
source_url: "https://github.com/naw103/foremerge"
fetched_from: "https://agentusecases.ai/use-case/catch-intent-conflicts-between-parallel-coding-agents"
---

# Catch intent conflicts between parallel coding agents

> Agents publish planned changes before editing so conflicting architecture changes across parallel worktrees get flagged before code is written. · Sep 21, 2026

**Category:** Software & DevOps  
**Agent:** Claude Code, Codex, Cursor

## What they did

Foremerge is a local CLI and MCP server that Claude Code, Codex or Cursor agents are wired to. Each agent registers and publishes its intent with semantic scopes such as symbol:PaymentService before editing, then claims that scope. A person installs it, runs setup, and registers the test command. The demo has one agent replacing PaymentService while another extends it.

## How it went

The second agent's published intent immediately raised a HIGH replace_vs_extend advisory, with no files changed. Detection is heuristic, so it can miss synonyms or warn on compatible work. Claims only warn. No benchmark results are published.

## Worth knowing

This is a pre-1.0 local-only MVP: state lives in one SQLite database that agents on one machine share, and validation commands run unsandboxed with your permissions.

## Prompt

```text
I run several coding agents in parallel git worktrees on [repo path]. Set up a lightweight convention where each agent writes a short planned-changes note to [shared folder or file] before editing, and write a script that compares the notes and flags conflicting architecture or file changes. Done means I can run the script and see a clear conflict report, and please show me the plan before changing any existing files.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Run Codex tasks on your Home Assistant config](./run-codex-tasks-on-your-home-assistant-config.md)
- [Use a coding agent for everyday non-programming chores](./use-a-coding-agent-for-everyday-non-programming-chores.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Rewrite a README after a rearchitecture](./rewrite-a-readme-after-a-rearchitecture.md)
- [Have Copilot coding agent write and push code](./have-copilot-coding-agent-write-and-push-code.md)
