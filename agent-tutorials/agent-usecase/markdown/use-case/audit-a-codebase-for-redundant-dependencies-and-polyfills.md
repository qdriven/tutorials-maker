---
title: "Audit a codebase for redundant dependencies and polyfills"
slug: "audit-a-codebase-for-redundant-dependencies-and-polyfills"
summary: "An MCP server lets an agent check a codebase for redundant dependencies and polyfills, usable remotely or as a local stdio server. · Jul 21, 2026"
category: "Software & DevOps"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_url: "https://mcp.e18e.dev/"
fetched_from: "https://agentusecases.ai/use-case/audit-a-codebase-for-redundant-dependencies-and-polyfills"
---

# Audit a codebase for redundant dependencies and polyfills

> An MCP server lets an agent check a codebase for redundant dependencies and polyfills, usable remotely or as a local stdio server. · Jul 21, 2026

**Category:** Software & DevOps  
**Agent:** custom-built or unnamed agent

## What they did

You add the e18e MCP server to your agent, either as a remote streamable HTTP server (Claude Code has a one-line add command) or as the local stdio package @e18e/mcp. The agent can then check install commands for packages with better alternatives, parse source files and suggest replacements for their imports, look up replacements by name or topic, and read curated migration guides.

## How it went

The page describes the tools and setup only. It gives no results, numbers, or example audit, so there is no evidence here of how well it works on a real codebase.

## Worth knowing

The code-checker works on a single source file at a time, so auditing a whole codebase means the agent has to run it file by file.

## Prompt

```text
Audit the project at [path to repo] for redundant dependencies and unnecessary polyfills, such as packages that can be replaced by built-in features in [runtime and version, e.g. Node 20]. Produce a report listing each one, why it's redundant, and the suggested replacement. Don't edit package files or install anything until I've reviewed the report.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Hand narrow code changes to Devin for pull requests](./hand-narrow-code-changes-to-devin-for-pull-requests.md)
- [Build and deploy a Game of Life simulation site](./build-and-deploy-a-game-of-life-simulation-site.md)
- [Manage NixOS server configs with Claude Code](./manage-nixos-server-configs-with-claude-code.md)
- [Fix a Linux kernel memory management problem with Claude](./fix-a-linux-kernel-memory-management-problem-with-claude.md)
- [Turn Sentry bug reports into fix pull requests](./turn-sentry-bug-reports-into-fix-pull-requests.md)
