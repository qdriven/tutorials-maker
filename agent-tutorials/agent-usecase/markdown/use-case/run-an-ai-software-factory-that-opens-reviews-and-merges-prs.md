---
title: "Run an AI software factory that opens, reviews, and merges PRs"
slug: "run-an-ai-software-factory-that-opens-reviews-and-merges-prs"
summary: "A guide to building agents that open, review, and merge pull requests. · Sep 11, 2026"
category: "Software & DevOps"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_url: "https://www.firecrawl.dev/blog/ai-software-factory"
fetched_from: "https://agentusecases.ai/use-case/run-an-ai-software-factory-that-opens-reviews-and-merges-prs"
---

# Run an AI software factory that opens, reviews, and merges PRs

> A guide to building agents that open, review, and merge pull requests. · Sep 11, 2026

**Category:** Software & DevOps  
**Agent:** custom-built or unnamed agent

## What they did

The guide breaks a software factory into five stages: intake, isolation, tools, verification and a merge gate. It draws on published setups from Stripe, Spotify, Shopify and Ramp. It gives configs for each stage, including an issue filter, git worktrees per agent, a shared MCP tool block, a screenshot-verification skill and tiered merge rules. A human reviews at the end.

## How it went

Microsoft's dotnet/runtime data shows agent PRs merging 67.9% of the time against 87.1% for engineers, and 55.1% when fully autonomous. Review capacity becomes the bottleneck, and proven results are mostly mechanical migrations.

## Worth knowing

Build the gates before the fleet, and start with one gate where agents cause the most rework. Worktrees start empty, with no .env, dependencies or free port, and non-interactive runs don't clean up after themselves.

## Prompt

```text
Set up a workflow for the repository [repo name] where an agent picks up issues labeled [label], opens a pull request with a fix and tests, and a second agent reviews it. Write the configuration and a short guide for how it runs. Do not enable automatic merging yet; show me the merge rules you propose and wait for my approval.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Hand narrow code changes to Devin for pull requests](./hand-narrow-code-changes-to-devin-for-pull-requests.md)
- [Build and deploy a Game of Life simulation site](./build-and-deploy-a-game-of-life-simulation-site.md)
- [Manage NixOS server configs with Claude Code](./manage-nixos-server-configs-with-claude-code.md)
- [Fix a Linux kernel memory management problem with Claude](./fix-a-linux-kernel-memory-management-problem-with-claude.md)
- [Turn Sentry bug reports into fix pull requests](./turn-sentry-bug-reports-into-fix-pull-requests.md)
