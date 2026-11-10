---
title: "Run builds, tests and PR creation with shell commands"
slug: "run-builds-tests-and-pr-creation-with-shell-commands"
summary: "A guide shows Scout running build, test, lint and gh commands, listing or creating PRs, and handing diff reviews and test runs to background sub-agents."
category: "Software & DevOps"
agents:
  - name: "Microsoft Scout"
    slug: "microsoft-scout"
source_platform: "allthings.how"
source_date: "Undated"
source_url: "https://allthings.how/how-to-run-git-and-shell-commands-with-microsoft-scout/"
fetched_from: "https://agentusecases.ai/use-case/run-builds-tests-and-pr-creation-with-shell-commands"
---

# Run builds, tests and PR creation with shell commands

> A guide shows Scout running build, test, lint and gh commands, listing or creating PRs, and handing diff reviews and test runs to background sub-agents.

**Category:** Software & DevOps  
**Agent:** Microsoft Scout  
**Source:** allthings.how · Undated

## What they did

You assign Scout a workspace folder and ask in plain language for builds, tests, lint, git or gh tasks such as listing open PRs or creating one. Scout turns each request into a command and runs it. Read-only commands run automatically, writes and network calls wait for your Approve, and destructive commands are blocked. For bigger jobs it launches background sub-agents, such as Task and Code review agents.

## How it went

The guide describes the behavior but gives no results or measurements. Output, tool calls and permission prompts stream into the conversation. Scout is prerelease, so capabilities and defaults may change.

## Worth knowing

Access is limited. It needs Windows 11 or macOS 12+, Microsoft 365 and Copilot licenses, GitHub Copilot Business or Enterprise, Frontier early-access enrollment, and IT admin setup.

## Prompt

```text
In [path to repo], run the build with [build command], the tests with [test command] and the linter with [lint command], then summarize what passed and failed. Fix simple failures, and list my open PRs using the gh CLI. If everything is green, draft a PR title and description for [branch name] and pause to show me before creating it.
```

## Related use cases

- [Clear leftover installers and fetch a YouTube transcript](./clear-leftover-installers-and-fetch-a-youtube-transcript.md)
- [Build a slide deck from a single prompt](./build-a-slide-deck-from-a-single-prompt.md)
- [Build dashboards and troubleshoot support cases](./build-dashboards-and-troubleshoot-support-cases.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a budgeting app from a single prompt](./build-a-budgeting-app-from-a-single-prompt.md)
- [Run a task-manager sub-agent with atomic commits](./run-a-task-manager-sub-agent-with-atomic-commits.md)
