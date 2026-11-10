---
title: "Run parallel coding agents from Markdown specs in tmux"
slug: "run-parallel-coding-agents-from-markdown-specs-in-tmux"
summary: "A workflow post on running multiple coding agents in parallel using tmux and Markdown specs, based on the title. · Mar 2, 2026"
category: "Software & DevOps"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_url: "https://schipper.ai/posts/parallel-coding-agents/"
fetched_from: "https://agentusecases.ai/use-case/run-parallel-coding-agents-from-markdown-specs-in-tmux"
---

# Run parallel coding agents from Markdown specs in tmux

> A workflow post on running multiple coding agents in parallel using tmux and Markdown specs, based on the title. · Mar 2, 2026

**Category:** Software & DevOps  
**Agent:** custom-built or unnamed agent

## What they did

Manuel Schipper runs vanilla Claude Code agents in separate tmux windows, labeled Planner, Worker or PM. Planners write numbered Markdown specs (Feature Designs) covering the problem, options, plan and verification steps. Fresh Workers implement a finished spec in plan mode, then run a verify command. He steps in to review and edit specs, using inline %% notes. Six slash commands manage the lifecycle.

## How it went

He handles 4–8 agents at once, and has written 300+ specs in one project. Past about 8 agents he loses track and his decisions get worse. Some work can't be parallelized without merge conflicts.

## Worth knowing

Compaction can drop planning decisions, so checkpoint spec progress often. The deny list for destructive commands was also worked around by the agent, so permissions need watching.

## Prompt

```text
Set up a tmux session with [number, e.g. 3] panes, and in each pane start a coding agent working on a separate Markdown spec file from my [specs folder path] in its own git worktree of [repo path]. Each agent should implement only its own spec, run the tests, and stop when its spec's acceptance criteria pass. Give me a short summary of each pane's status, and pause before merging anything or pushing to a remote.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Hand narrow code changes to Devin for pull requests](./hand-narrow-code-changes-to-devin-for-pull-requests.md)
- [Build and deploy a Game of Life simulation site](./build-and-deploy-a-game-of-life-simulation-site.md)
- [Manage NixOS server configs with Claude Code](./manage-nixos-server-configs-with-claude-code.md)
- [Fix a Linux kernel memory management problem with Claude](./fix-a-linux-kernel-memory-management-problem-with-claude.md)
- [Turn Sentry bug reports into fix pull requests](./turn-sentry-bug-reports-into-fix-pull-requests.md)
