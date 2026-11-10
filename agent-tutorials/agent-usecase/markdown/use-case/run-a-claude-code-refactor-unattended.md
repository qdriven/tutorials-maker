---
title: "Run a Claude Code refactor unattended"
slug: "run-a-claude-code-refactor-unattended"
summary: "A Claude Code agent ran 40 minutes unattended on a refactor; it worked and tests passed, but the user couldn't tell what it did in between."
category: "Software & DevOps"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "Reddit"
source_date: "Aug 30, 2026"
source_url: "https://www.reddit.com/r/AI_Agents/comments/1w0z37j/my_claude_code_agent_ran_for_40_minutes_while_i"
fetched_from: "https://agentusecases.ai/use-case/run-a-claude-code-refactor-unattended"
---

# Run a Claude Code refactor unattended

> A Claude Code agent ran 40 minutes unattended on a refactor; it worked and tests passed, but the user couldn't tell what it did in between.

**Category:** Software & DevOps  
**Agent:** Claude Code  
**Source:** Reddit · Aug 30, 2026

## What they did

The post says a Claude Code agent was left alone for about 40 minutes to do a refactor, and when the user returned the refactor worked and tests passed. In the comments, people describe how they handle this in practice: run the agent in a low-privilege account, inspect git diffs afterward, or log tool calls with Claude Code’s PreToolUse/PostToolUse hooks or session JSONL files under ~/.claude/projects to reconstruct what files and commands it touched.

## How it went

The reported outcome was that the refactor succeeded and tests passed, but the user had no clear timeline, diff summary, or visibility into whether it read sensitive files or made outside calls. Commenters said transcripts are poor for auditing, and recommended relying on diffs, permissions, and tool-level logs instead.

## Worth knowing

The clearest catch was visibility: a long unattended run may succeed, but without separate logging or diff review you may not know what happened in between.

## Prompt

```text
Refactor [module or area of the codebase] to [goal, e.g. split it into smaller functions or remove the deprecated API]. As you work, keep a running log file called PROGRESS.md noting each change you make and why, and run [test command] after each major step. Stop when all tests pass and give me a short summary of the files you touched and anything you weren't sure about.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Link journal entries and write book reviews in Obsidian](./link-journal-entries-and-write-book-reviews-in-obsidian.md)
- [Produce a finished music release from one chat](./produce-a-finished-music-release-from-one-chat.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a budgeting app from a single prompt](./build-a-budgeting-app-from-a-single-prompt.md)
- [Find bugs with property-testing agent swarms](./find-bugs-with-property-testing-agent-swarms.md)
