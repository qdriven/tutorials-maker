---
title: "Build old and new apps with coding agents"
slug: "build-old-and-new-apps-with-coding-agents"
summary: "Terence Tao describes using modern coding agents to create or revive apps, based on the post title. · Jul 12, 2026"
category: "Software & DevOps"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_url: "https://terrytao.wordpress.com/2026/07/11/old-and-new-apps-via-modern-coding-agents/"
fetched_from: "https://agentusecases.ai/use-case/build-old-and-new-apps-with-coding-agents"
---

# Build old and new apps with coding agents

> Terence Tao describes using modern coding agents to create or revive apps, based on the post title. · Jul 12, 2026

**Category:** Software & DevOps  
**Agent:** custom-built or unnamed agent

## What they did

Tao asked an AI agent to port about two dozen of his 1999 Java applets to JavaScript. The agent worked out the code from the source and its HTML page. For complex apps he had it build the math engine and test it before the GUI. He then vibe-coded two new apps in conversation: a special relativity spacetime diagram tool and a Gilbreath conjecture visualization.

## How it went

The port took hours and all the applets work again. He found one minor drag bug, and the agent found two bugs in the original code. Each new app took a few hours. He calls the relativity app alpha.

## Worth knowing

Tao says his programming and domain expertise were essential for steering the agent and diagnosing problems. He considers the low-stakes visual aids an acceptable place to risk bugs.

## Prompt

```text
Build a small app that [describe what it does] in a new folder, or revive my old project at [path] that no longer runs. Start by writing a short plan, then work in small steps, running it and fixing errors as you go. Finish when I can launch it with a single command, and give me a short summary of what you changed. Ask before deleting any existing files.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Hand narrow code changes to Devin for pull requests](./hand-narrow-code-changes-to-devin-for-pull-requests.md)
- [Build and deploy a Game of Life simulation site](./build-and-deploy-a-game-of-life-simulation-site.md)
- [Manage NixOS server configs with Claude Code](./manage-nixos-server-configs-with-claude-code.md)
- [Fix a Linux kernel memory management problem with Claude](./fix-a-linux-kernel-memory-management-problem-with-claude.md)
- [Turn Sentry bug reports into fix pull requests](./turn-sentry-bug-reports-into-fix-pull-requests.md)
