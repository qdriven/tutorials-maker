---
title: "Run a task-manager sub-agent with atomic commits"
slug: "run-a-task-manager-sub-agent-with-atomic-commits"
summary: "A poster built a Claude Code sub-agent that fetches the next task, marks it complete, and enforces atomic commits with a mandatory commit id."
category: "Software & DevOps"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "Reddit"
source_date: "Mar 1, 2025"
source_url: "https://www.reddit.com/r/ClaudeCode/comments/1mzt2b3/not_sure_if_people_already_do_this"
fetched_from: "https://agentusecases.ai/use-case/run-a-task-manager-sub-agent-with-atomic-commits"
---

# Run a task-manager sub-agent with atomic commits

> A poster built a Claude Code sub-agent that fetches the next task, marks it complete, and enforces atomic commits with a mandatory commit id.

**Category:** Software & DevOps  
**Agent:** Claude Code  
**Source:** Reddit · Mar 1, 2025

## What they did

In the thread, one commenter says they built a Python script to maintain a YAML todo file with task descriptions, then added a task-manager sub-agent with two actions: get_next_task and mark_task_completed. They required a commit ID when marking tasks complete so Claude Code would make atomic commits, while the person still had to watch for cases where it ignored the setup and used TodoWrite instead.

## How it went

The reported result was better task-by-task control and enforced atomic commits, but the setup was not fully reliable because Claude Code sometimes tried to bypass the sub-agent workflow.

## Worth knowing

The main catch is reliability: even with the sub-agent and mandatory commit ID, the poster says Claude Code still sometimes bypassed it and used TodoWrite.

## Prompt

```text
Create a Claude Code sub-agent called task-manager for [project]. It should fetch the next open task from [task file or tracker], hand it to me to work on, mark it complete when done, and require an atomic commit with a commit ID before closing any task. Finish by running it on one sample task and showing me the result.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Link journal entries and write book reviews in Obsidian](./link-journal-entries-and-write-book-reviews-in-obsidian.md)
- [Produce a finished music release from one chat](./produce-a-finished-music-release-from-one-chat.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a budgeting app from a single prompt](./build-a-budgeting-app-from-a-single-prompt.md)
- [Find bugs with property-testing agent swarms](./find-bugs-with-property-testing-agent-swarms.md)
