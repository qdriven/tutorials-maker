---
title: "Build a dev-workflow generator with test-driven agent coding"
slug: "build-a-dev-workflow-generator-with-test-driven-agent-coding"
summary: "The author built an open-source system that generates project-specific dev workflows from an interview, entirely with Claude Code, which wrote and debugged 550+ tests."
category: "Software & DevOps"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "Reddit"
source_date: "Apr 1, 2026"
source_url: "https://www.reddit.com/r/claude/comments/1s383nj/i_built_agentic_workflow_entirely_with_claude"
fetched_from: "https://agentusecases.ai/use-case/build-a-dev-workflow-generator-with-test-driven-agent-coding"
---

# Build a dev-workflow generator with test-driven agent coding

> The author built an open-source system that generates project-specific dev workflows from an interview, entirely with Claude Code, which wrote and debugged 550+ tests.

**Category:** Software & DevOps  
**Agent:** Claude Code  
**Source:** Reddit · Apr 1, 2026

## What they did

The author says they built the whole system through Claude Code sessions: after a /bootstrap interview about a project's stack, it generates project-specific slash commands, guard hooks, pre-push checks, and agent configs. Claude Code also wrote the main code files, produced and debugged 550+ tests in a test-driven workflow, ran self-audits with four parallel review agents, and, via /task-hunter plus Backlog.md CLI, picked tasks, implemented changes, committed, and closed them autonomously.

## How it went

The result was an open-source, MIT-licensed workflow system the author says spans 15k+ lines, 200+ tasks, 20+ hook files, and supports many common web stacks plus a generic mode. The stated shortcoming was that Claude Code needed guardrails: without hooks, task structure, and automated review, it wrote to wrong directories, lost context, and let subtle bugs through.

## Worth knowing

To try it as described, you need both Claude Code CLI and Backlog.md CLI, then point the template at your codebase and run /bootstrap.

## Prompt

```text
Help me build [tool that does X] in [language] using test-driven development. For each feature, write failing tests first, then the code to make them pass, and run the full suite after each step, debugging any failures yourself. Stop when [the feature list] is implemented and all tests pass, then summarize the test coverage.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Link journal entries and write book reviews in Obsidian](./link-journal-entries-and-write-book-reviews-in-obsidian.md)
- [Produce a finished music release from one chat](./produce-a-finished-music-release-from-one-chat.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a budgeting app from a single prompt](./build-a-budgeting-app-from-a-single-prompt.md)
- [Find bugs with property-testing agent swarms](./find-bugs-with-property-testing-agent-swarms.md)
