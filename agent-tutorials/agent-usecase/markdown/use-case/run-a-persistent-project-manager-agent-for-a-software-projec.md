---
title: "Run a persistent project manager agent for a software project"
slug: "run-a-persistent-project-manager-agent-for-a-software-projec"
summary: "A user tried setting up their Dot as a persistent project manager coordinating a large software project, but it has not reliably maintained the single agent session it was meant to coordinate through."
category: "Software & DevOps"
agents:
  - name: "Dots"
    slug: "dots"
source_platform: "Reddit"
source_date: "Oct 20, 2026"
source_url: "https://www.reddit.com/r/codex/comments/1xa4ybq/have_you_actually_managed_to_do_anything_useful"
fetched_from: "https://agentusecases.ai/use-case/run-a-persistent-project-manager-agent-for-a-software-projec"
---

# Run a persistent project manager agent for a software project

> A user tried setting up their Dot as a persistent project manager coordinating a large software project, but it has not reliably maintained the single agent session it was meant to coordinate through.

**Category:** Software & DevOps  
**Agent:** Dots  
**Source:** Reddit · Oct 20, 2026

## What they did

The poster tried to use Dot as a persistent project manager over a large software project where other AI agents already communicated, delegated work, accessed files, and managed tasks across models and CLIs. In that setup, Dot was supposed to track progress, assign work, follow up, and route messages through one agent session, but they say it kept losing that connection, forgetting prior setup, failing to dispatch prepared tasks, and repeatedly resurfacing approved questions and blockers until the user stepped in.

## How it went

For this use case, it did not work reliably: the poster says a regular coding agent they launch themselves handles most of it with less trouble. Comments partly echoed that Dot times out or lacks the control needed for orchestration, though one person described a lighter setup where Dot reads a repo log on GitHub and updates a Notion kanban.

## Worth knowing

The clearest catch is reliability: the source describes hours of repeated blocker reports and repeated intervention instead of autonomous follow-through.

## Prompt

```text
Act as a persistent project manager for my software project [project name and repo link]. Keep one ongoing session where you track the task list, check on progress each [day/week], and give me a short status of what is done, blocked, and next. Before you assign work to another agent, message anyone, or change the repo, show me exactly what you plan to do and wait for my approval.
```

## Related use cases

- [Plan a trip and book flight, hotel and shuttle with an always-on agent](./plan-a-trip-and-book-flight-hotel-and-shuttle-with-an-always.md)
- [Track rare coffee beans with a scheduled Dot](./track-rare-coffee-beans-with-a-scheduled-dot.md)
- [Use a persistent assistant for student research and daily tasks](./use-a-persistent-assistant-for-student-research-and-daily-ta.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build and deploy a Game of Life simulation site](./build-and-deploy-a-game-of-life-simulation-site.md)
- [Fix a Linux kernel memory management problem with Claude](./fix-a-linux-kernel-memory-management-problem-with-claude.md)
