---
title: "Run a coding agent on a live Excalidraw canvas"
slug: "run-a-coding-agent-on-a-live-excalidraw-canvas"
summary: "Drawgent is a coding agent that works on a live Excalidraw canvas. · Sep 26, 2026"
category: "Software & DevOps"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_url: "https://tangled.org/yanndegat.tngl.sh/drawgent"
fetched_from: "https://agentusecases.ai/use-case/run-a-coding-agent-on-a-live-excalidraw-canvas"
---

# Run a coding agent on a live Excalidraw canvas

> Drawgent is a coding agent that works on a live Excalidraw canvas. · Sep 26, 2026

**Category:** Software & DevOps  
**Agent:** custom-built or unnamed agent

## What they did

drawgent is a single binary that connects your own Claude Code, Codex or opencode install to an Excalidraw board. It gives the agent canvas tools over MCP. You ask in a chat panel, write AGENT: notes on the canvas, or point with the laser. The agent reads the scene and a screenshot, edits live, and links each box to code.

## How it went

The source gives no benchmark numbers. It lists limits: macOS builds are untested on a real Mac, Codex live attach is untested, rooms mirror one board, and images aren't synced.

## Worth knowing

You need one agent already installed and logged in. Rendering needs Chrome or Chromium, and setup finds or installs one. Claude --attach forks the session instead of joining it.

## Prompt

```text
Help me set up a workflow where a coding agent can read and edit a diagram in [Excalidraw file path or URL] as part of working on [project]. Start by generating an architecture diagram of the code in this repo, then update it when I describe a change like [example change]. Done means the diagram file is saved in the repo and matches the code, and ask me before overwriting any existing file.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Hand narrow code changes to Devin for pull requests](./hand-narrow-code-changes-to-devin-for-pull-requests.md)
- [Build and deploy a Game of Life simulation site](./build-and-deploy-a-game-of-life-simulation-site.md)
- [Manage NixOS server configs with Claude Code](./manage-nixos-server-configs-with-claude-code.md)
- [Fix a Linux kernel memory management problem with Claude](./fix-a-linux-kernel-memory-management-problem-with-claude.md)
- [Turn Sentry bug reports into fix pull requests](./turn-sentry-bug-reports-into-fix-pull-requests.md)
