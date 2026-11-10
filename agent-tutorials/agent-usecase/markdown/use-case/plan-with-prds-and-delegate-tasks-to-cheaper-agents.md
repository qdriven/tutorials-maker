---
title: "Plan with PRDs and delegate tasks to cheaper agents"
slug: "plan-with-prds-and-delegate-tasks-to-cheaper-agents"
summary: "A developer uses a high-level agent to write a PRD, splits it into a task list, and hands the work to cheaper agents in a production workflow."
category: "Software & DevOps"
agents:
  - name: "Claude Code"
    slug: "claude-code"
  - name: "Claude"
    slug: "claude"
source_platform: "Reddit"
source_date: "Apr 1, 2026"
source_url: "https://www.reddit.com/r/ClaudeCode/comments/1stmgpn/serious_question_whats_your_actual_ai_workflow"
fetched_from: "https://agentusecases.ai/use-case/plan-with-prds-and-delegate-tasks-to-cheaper-agents"
---

# Plan with PRDs and delegate tasks to cheaper agents

> A developer uses a high-level agent to write a PRD, splits it into a task list, and hands the work to cheaper agents in a production workflow.

**Category:** Software & DevOps  
**Agent:** Claude Code, Claude  
**Source:** Reddit · Apr 1, 2026

## What they did

The commenter described an internal setup with two systems: a task-based workflow that enforces TDD and can run multi-agent flows with git trees, plus persistent memory with hooks and house-style rules. Their day-to-day process is to work with a high-level agent like Opus to create a PRD, break it into a task list, and then hand implementation work to cheaper agents; they also said they are building their own Python orchestrator to call Haiku or other agents by API.

## How it went

The source gives no hard performance numbers or business results. It frames the approach as an actively evolving internal workflow rather than a finished system, with the user still building the harness around it.

## Worth knowing

The practical catch is that this depends on custom infrastructure the commenter created, including task enforcement, persistent memory, and an in-progress orchestrator.

## Prompt

```text
I want to build [feature or project] in [repo path]. First write a short PRD covering goals, scope, and acceptance criteria, then split it into small, independent tasks in a TASKS.md file with clear done criteria for each. Stop and show me the PRD and task list so I can review it before anything is implemented, so I can hand the tasks to a cheaper model.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build retro games with a child using Claude Code](./build-retro-games-with-a-child-using-claude-code.md)
- [Generate monthly marketing reports and buying-intent replies](./generate-monthly-marketing-reports-and-buying-intent-replies.md)
- [Review Linux kernel patches](./review-linux-kernel-patches.md)
- [Build a budgeting app from a single prompt](./build-a-budgeting-app-from-a-single-prompt.md)
- [Build a multilingual typing app for language learning](./build-a-multilingual-typing-app-for-language-learning.md)
