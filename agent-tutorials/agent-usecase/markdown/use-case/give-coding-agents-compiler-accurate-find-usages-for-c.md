---
title: "Give coding agents compiler-accurate Find Usages for C#"
slug: "give-coding-agents-compiler-accurate-find-usages-for-c"
summary: "Graphify C# lets coding agents find symbol usages in C# codebases with compiler-level accuracy. · Sep 12, 2026"
category: "Software & DevOps"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_url: "https://github.com/zachsaw/graphify-csharp"
fetched_from: "https://agentusecases.ai/use-case/give-coding-agents-compiler-accurate-find-usages-for-c"
---

# Give coding agents compiler-accurate Find Usages for C#

> Graphify C# lets coding agents find symbol usages in C# codebases with compiler-level accuracy. · Sep 12, 2026

**Category:** Software & DevOps  
**Agent:** custom-built or unnamed agent

## What they did

You install a .NET global tool and run it on a .sln or .csproj. It loads the project through MSBuild and asks Roslyn to resolve every symbol. The output is one JSON file of nodes and edges (calls, references, implements, inherits, overrides). An included skill file tells Codex or Claude Code when to refresh the index and how to follow the edges. An optional watcher keeps the index current.

## How it went

The README's example is an internal method whose single compiler-resolved caller was a test, which shows how test-only usage can be spotted. It gives no benchmarks. Reflection, dependency injection and dynamic calls are not captured.

## Worth knowing

Zero inbound edges means only zero observed static references, so deletion candidates still need human judgment. SDKs, packages and MSBuild inputs must be available locally.

## Prompt

```text
In my C# solution at [path], find every usage of [class or method name], including interface implementations and overrides, using the compiler's semantic info (for example Roslyn) rather than text search. Give me a list of file and line for each usage, grouped by project. Do not edit any files; stop once the list is complete and tell me how you verified it was accurate.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Hand narrow code changes to Devin for pull requests](./hand-narrow-code-changes-to-devin-for-pull-requests.md)
- [Build and deploy a Game of Life simulation site](./build-and-deploy-a-game-of-life-simulation-site.md)
- [Manage NixOS server configs with Claude Code](./manage-nixos-server-configs-with-claude-code.md)
- [Fix a Linux kernel memory management problem with Claude](./fix-a-linux-kernel-memory-management-problem-with-claude.md)
- [Turn Sentry bug reports into fix pull requests](./turn-sentry-bug-reports-into-fix-pull-requests.md)
