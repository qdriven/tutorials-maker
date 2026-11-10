---
title: "Port the Copilot runtime to Rust agentically"
slug: "port-the-copilot-runtime-to-rust-agentically"
summary: "Microsoft reportedly used agents to port its Copilot runtime to Rust for $120K, according to the headline. · Sep 20, 2026"
category: "Software & DevOps"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_url: "https://www.theregister.com/devops/2026/09/18/microsoft-agentically-ports-copilot-runtime-to-rust-for-120k/5297549"
fetched_from: "https://agentusecases.ai/use-case/port-the-copilot-runtime-to-rust-agentically"
---

# Port the Copilot runtime to Rust agentically

> Microsoft reportedly used agents to port its Copilot runtime to Rust for $120K, according to the headline. · Sep 20, 2026

**Category:** Software & DevOps  
**Agent:** custom-built or unnamed agent

## What they did

Microsoft used Copilot, driven by several LLMs picked for their strengths, to rewrite the TypeScript Copilot runtime in Rust one module at a time. The port was a direct replacement and did not restructure the runtime. On the 30,000-line session.ts, one session read the docs, spawned 15 child sessions in separate worktrees, and had them coordinate with each other.

## How it went

Agents turned 430,000 lines of TypeScript into 800,000 lines of Rust over 14.5 weeks and 135+ releases. A benchmark ran 15.9x faster and memory fell from 1,383 MB to 126 MB, but a few dozen regressions appeared.

## Worth knowing

Cost was about $120K in tokens plus roughly three weeks of a developer's time. Compiling did not mean correct, so regressions still got through.

## Prompt

```text
I want to port [component or module] in [repo path] from [source language] to Rust using an agentic workflow. Start by reading the code and proposing a phased porting plan with test checkpoints, and wait for my approval. Then port one module at a time, keeping the existing tests passing, and finish with a summary of what's ported, what's left, and an estimate of effort.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Hand narrow code changes to Devin for pull requests](./hand-narrow-code-changes-to-devin-for-pull-requests.md)
- [Build and deploy a Game of Life simulation site](./build-and-deploy-a-game-of-life-simulation-site.md)
- [Manage NixOS server configs with Claude Code](./manage-nixos-server-configs-with-claude-code.md)
- [Fix a Linux kernel memory management problem with Claude](./fix-a-linux-kernel-memory-management-problem-with-claude.md)
- [Turn Sentry bug reports into fix pull requests](./turn-sentry-bug-reports-into-fix-pull-requests.md)
