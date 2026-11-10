---
title: "Give coding agents git-native persistent memory"
slug: "give-coding-agents-git-native-persistent-memory"
summary: "A tool that stores persistent memory for AI coding agents in git so context carries across sessions. · Sep 5, 2026"
category: "Software & DevOps"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_url: "https://github.com/okf-memory/okf-agent-memory"
fetched_from: "https://agentusecases.ai/use-case/give-coding-agents-git-native-persistent-memory"
---

# Give coding agents git-native persistent memory

> A tool that stores persistent memory for AI coding agents in git so context carries across sessions. · Sep 5, 2026

**Category:** Software & DevOps  
**Agent:** custom-built or unnamed agent

## What they did

You build a Go binary, then run a bootstrap command on a project. It creates a knowledge/ folder of Markdown files with YAML frontmatter, an agent skill, and an AGENTS.md. Agents reach the memory through the CLI or an MCP server over stdio, which works with Claude Code, Cursor and Codex. The convention tells agents to search before writing and to load only the index pages they need.

## How it went

The README claims search under 300µs, about 4ms to validate 50+ concepts, and an 80% token reduction. Those figures come from the project's own benchmarks and comparison table, and the README doesn't show independent results.

## Worth knowing

The repo is new, with one commit and 3 stars. The 80% token claim comes from a benchmark you can rerun with make benchmark against a local LLM.

## Prompt

```text
Set up persistent memory for coding agents in this repository by storing notes in a [folder name, e.g. .agent-memory] directory tracked in git. Create a simple format for recording decisions, conventions, and open tasks, and add instructions so future sessions read it first and update it at the end. Show me the files you plan to commit before you commit anything.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Hand narrow code changes to Devin for pull requests](./hand-narrow-code-changes-to-devin-for-pull-requests.md)
- [Build and deploy a Game of Life simulation site](./build-and-deploy-a-game-of-life-simulation-site.md)
- [Manage NixOS server configs with Claude Code](./manage-nixos-server-configs-with-claude-code.md)
- [Fix a Linux kernel memory management problem with Claude](./fix-a-linux-kernel-memory-management-problem-with-claude.md)
- [Turn Sentry bug reports into fix pull requests](./turn-sentry-bug-reports-into-fix-pull-requests.md)
