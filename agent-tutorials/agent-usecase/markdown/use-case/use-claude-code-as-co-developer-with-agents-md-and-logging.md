---
title: "Use Claude Code as co-developer with AGENTS.md and logging"
slug: "use-claude-code-as-co-developer-with-agents-md-and-logging"
summary: "The author uses Claude Code for planning, coding, testing, and debugging, with AGENTS.md and numerical logging to improve accuracy and context handling."
category: "Software & DevOps"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "Reddit"
source_date: "Oct 20, 2026"
source_url: "https://www.reddit.com/r/ClaudeWorkflows/comments/1xax029/workflow_claude_code_as_a_codeveloper_planning"
fetched_from: "https://agentusecases.ai/use-case/use-claude-code-as-co-developer-with-agents-md-and-logging"
---

# Use Claude Code as co-developer with AGENTS.md and logging

> The author uses Claude Code for planning, coding, testing, and debugging, with AGENTS.md and numerical logging to improve accuracy and context handling.

**Category:** Software & DevOps  
**Agent:** Claude Code  
**Source:** Reddit · Oct 20, 2026

## What they did

The author spent about seven months building ThinkTerm, a Rust terminal multiplexer on top of WezTerm, with Claude Code acting as a co-developer. Claude Code handled planning, code writing, tests, and benchmarks, while the author reviewed the output; hard rules lived in AGENTS.md or Claude.md, and for UI work without a framework Claude saved frames as PNGs because it could not see the window.

## How it went

The result was an open-source app for macOS, Linux, and Windows that the author says lets them manage agent sessions across machines. The main shortcoming they call out is debugging accuracy: Claude guessed wrong repeatedly on one bug until they made it log actual numeric sizes.

## Worth knowing

The most concrete catch is to force Claude to log numbers and real measurements instead of inferring them; the author says that fixed a bug after five wrong guesses.

## Prompt

```text
Create an AGENTS.md file in [repo path] that describes the project's structure, how to run and test it, coding conventions, and rules for you to follow. Then help me with [feature or bug] by planning first, then coding, testing, and debugging, adding clear numbered log lines so you can verify behavior from the output. Stop when the tests pass and show me a summary of the changes.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Link journal entries and write book reviews in Obsidian](./link-journal-entries-and-write-book-reviews-in-obsidian.md)
- [Produce a finished music release from one chat](./produce-a-finished-music-release-from-one-chat.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a budgeting app from a single prompt](./build-a-budgeting-app-from-a-single-prompt.md)
- [Find bugs with property-testing agent swarms](./find-bugs-with-property-testing-agent-swarms.md)
