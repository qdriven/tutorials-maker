---
title: "Prototype product features as a non-coding PM"
slug: "prototype-product-features-as-a-non-coding-pm"
summary: "A founder used Cursor agents to find prototype gaps, draw ASCII wireframes, and plan and implement a feature with parallel agents in worktrees."
category: "Software & DevOps"
agents:
  - name: "Cursor"
    slug: "cursor"
source_platform: "amankhan1.substack.com"
source_date: "Undated"
source_url: "https://amankhan1.substack.com/p/cursor-for-product-managers"
fetched_from: "https://agentusecases.ai/use-case/prototype-product-features-as-a-non-coding-pm"
---

# Prototype product features as a non-coding PM

> A founder used Cursor agents to find prototype gaps, draw ASCII wireframes, and plan and implement a feature with parallel agents in worktrees.

**Category:** Software & DevOps  
**Agent:** Cursor  
**Source:** amankhan1.substack.com · Undated

## What they did

Eric Xiao cloned his trip-planner codebase and had Cursor describe it. He saved that description as an AGENTS.md file so new chats start with context. He then asked the agent for feature ideas with ASCII wireframes. He ran parallel agents on trip history and an itinerary editor, then used plan mode and worktrees to implement.

## How it went

The agent found gaps such as no saved trips, loading indicator, map or follow-ups, and drew wireframes for each. The post gives no build results or timings for the implemented feature, only a claim of about 30 minutes to a working prototype.

## Worth knowing

Work in branches or worktrees and clone repos read-only, so the worst case is deleting a branch and starting over.

## Prompt

```text
I'm not a developer. Look through my prototype in [repo or folder] and list what's missing for a working version of [feature idea]. Draw ASCII wireframes of the screens, then write a step-by-step plan and implement it, using parallel agents in separate worktrees if it helps. You're done when I can run the feature locally and you've explained in plain language how to try it. Show me the plan and wait for my approval before changing any code.
```

## Related use cases

- [Keep coding agents running autonomously for long stretches](./keep-coding-agents-running-autonomously-for-long-stretches.md)
- [Grade Cursor on a real data science project](./grade-cursor-on-a-real-data-science-project.md)
- [Queue maintenance and bug fixes for Cursor background agents](./queue-maintenance-and-bug-fixes-for-cursor-background-agents.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build and deploy an app over a weekend](./build-and-deploy-an-app-over-a-weekend.md)
- [Build an anonymous wall of hopes and fears about AI](./build-an-anonymous-wall-of-hopes-and-fears-about-ai.md)
