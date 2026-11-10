---
title: "Run a planner and cheap executor subagent coding pipeline"
slug: "run-a-planner-and-cheap-executor-subagent-coding-pipeline"
summary: "The commenter uses Codex with GPT-5.5 as planner and a GPT-5.4 Mini agent as executor so cheaper models handle tasks that would otherwise cost too much."
category: "Software & DevOps"
agents:
  - name: "Codex"
    slug: "codex"
source_platform: "Reddit"
source_date: "Jul 26, 2026"
source_url: "https://www.reddit.com/r/codex/comments/1upz44z/codex_needs_cheaper_more_and_better_subagents"
fetched_from: "https://agentusecases.ai/use-case/run-a-planner-and-cheap-executor-subagent-coding-pipeline"
---

# Run a planner and cheap executor subagent coding pipeline

> The commenter uses Codex with GPT-5.5 as planner and a GPT-5.4 Mini agent as executor so cheaper models handle tasks that would otherwise cost too much.

**Category:** Software & DevOps  
**Agent:** Codex  
**Source:** Reddit · Jul 26, 2026

## What they did

In the thread, the commenter says they built their own workflow instead of relying on Codex’s default agent flow. They use GPT-5.5 only to plan tasks, then hand those tasks to a GPT-5.4 Mini agent that does most of the actual work, specifically including file editing; the person chose and assembled this routing themselves.

## How it went

The claimed result is lower-cost handling for most coding work because GPT-5.4 Mini covers most tasks while the pricier model is reserved for planning. The comment gives no metrics, examples, or failure cases.

## Worth knowing

The main catch is that they had to build the workflow themselves; the comment links a GitHub project but gives no setup time or cost numbers.

## Prompt

```text
In [repo path], set up a two-stage workflow for this task: [task description]. First, use the strongest model to write a step-by-step plan with small, well-specified subtasks and acceptance tests. Then hand each subtask to a cheaper, smaller model as an executor subagent, and have the planner review each result. Stop when all acceptance tests pass, and give me a summary of the plan, the changes, and any subtasks that needed rework.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Diagnose a killed process on a server](./diagnose-a-killed-process-on-a-server.md)
- [Find bugs with property-testing agent swarms](./find-bugs-with-property-testing-agent-swarms.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Migrate an Electron app from Vue 2 to Vue 3](./migrate-an-electron-app-from-vue-2-to-vue-3.md)
- [Auto-generate a searchable help video library for an app](./auto-generate-a-searchable-help-video-library-for-an-app.md)
