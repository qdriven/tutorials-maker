---
title: "Add agentic forgetting to an agent's memory"
slug: "add-agentic-forgetting-to-an-agent-s-memory"
summary: "Someone implemented a rudimentary version of Tim Kellogg's agentic forgetting approach and reports it works impressively even in its simplest form."
category: "Software & DevOps"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_platform: "Bluesky"
source_date: "Oct 2, 2026"
source_url: "https://bsky.app/profile/german-noob.win/post/3mwvtoizr4c2i"
fetched_from: "https://agentusecases.ai/use-case/add-agentic-forgetting-to-an-agent-s-memory"
---

# Add agentic forgetting to an agent's memory

> Someone implemented a rudimentary version of Tim Kellogg's agentic forgetting approach and reports it works impressively even in its simplest form.

**Category:** Software & DevOps  
**Agent:** custom-built or unnamed agent  
**Source:** Bluesky · Oct 2, 2026

## What they did

Lukas built a very basic version of Tim Kellogg's agentic forgetting approach for an agent's memory. The post doesn't describe the mechanics, such as what the agent can access, how it decides what to forget, or where a person steps in. His next step is a more extended version, which he credits to personhood.removal.surgery.

## How it went

He calls the result incredible even in its simplest form. The post gives no numbers, tests or comparisons, and no limitations.

## Worth knowing

The post is a short announcement with no implementation details, so you would need Kellogg's original write-up to copy the approach.

## Prompt

```text
Look at how my agent stores memory in [path or project]. Add a simple forgetting mechanism: give each memory a last-used time and relevance score, and have a scheduled pass archive or delete low-value, stale entries. Write tests showing old unused memories get dropped while frequently used ones stay. Before deleting anything real, show me the list of what would be removed.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Hand narrow code changes to Devin for pull requests](./hand-narrow-code-changes-to-devin-for-pull-requests.md)
- [Build and deploy a Game of Life simulation site](./build-and-deploy-a-game-of-life-simulation-site.md)
- [Manage NixOS server configs with Claude Code](./manage-nixos-server-configs-with-claude-code.md)
- [Fix a Linux kernel memory management problem with Claude](./fix-a-linux-kernel-memory-management-problem-with-claude.md)
- [Turn Sentry bug reports into fix pull requests](./turn-sentry-bug-reports-into-fix-pull-requests.md)
