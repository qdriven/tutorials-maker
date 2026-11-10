---
title: "Build a working coding agent in R from three tools"
slug: "build-a-working-coding-agent-in-r-from-three-tools"
summary: "Author builds a functional coding agent in R starting from three tools, then adds tools to make it safer and more efficient. · Jun 19, 2026"
category: "Software & DevOps"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_url: "https://tidydesign.substack.com/p/a-coding-agent-is-six-functions-in"
fetched_from: "https://agentusecases.ai/use-case/build-a-working-coding-agent-in-r-from-three-tools"
---

# Build a working coding agent in R from three tools

> Author builds a functional coding agent in R starting from three tools, then adds tools to make it safer and more efficient. · Jun 19, 2026

**Category:** Software & DevOps  
**Agent:** custom-built or unnamed agent

## What they did

The author uses R's ellmer package to build a Claude-backed agent from three plain R functions: read file, write file and run shell command. Each function returns a string to the model, and a short system prompt tells it to read before editing and to run tests. He then adds list and search tools, a path check that keeps access inside the project directory, and a targeted edit tool.

## How it went

The three-tool agent can find a function, read the existing tests, write a new test and run the suite, though the author says it falls well short of Claude Code. The shell tool stays risky, and the author defers fuller security coverage to a later post.

## Worth knowing

Wrap every file tool in the path check, not just search. The unrestricted shell tool can still bypass it, so don't treat the project-directory check as full protection.

## Prompt

```text
Help me build a small coding agent in [language, e.g. R] from three tools: read a file, write a file, and run a shell command. Wire them to [LLM provider] in a simple loop and test it on a small task in [path to scratch folder]. Then suggest and add tools that make it safer and more efficient, such as confirmation before running commands. Finish when it completes the test task end to end.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Hand narrow code changes to Devin for pull requests](./hand-narrow-code-changes-to-devin-for-pull-requests.md)
- [Build and deploy a Game of Life simulation site](./build-and-deploy-a-game-of-life-simulation-site.md)
- [Manage NixOS server configs with Claude Code](./manage-nixos-server-configs-with-claude-code.md)
- [Fix a Linux kernel memory management problem with Claude](./fix-a-linux-kernel-memory-management-problem-with-claude.md)
- [Turn Sentry bug reports into fix pull requests](./turn-sentry-bug-reports-into-fix-pull-requests.md)
