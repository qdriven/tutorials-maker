---
title: "Troubleshoot a production-only performance issue"
slug: "troubleshoot-a-production-only-performance-issue"
summary: "A developer used Cursor and Warp agents to analyze NestJS database queries and recommend indexes for a production performance problem."
category: "Software & DevOps"
agents:
  - name: "Cursor"
    slug: "cursor"
source_platform: "trevorarnold.substack.com"
source_date: "Dec 1, 2025"
source_url: "https://trevorarnold.substack.com/p/december-2025-lessons"
fetched_from: "https://agentusecases.ai/use-case/troubleshoot-a-production-only-performance-issue"
---

# Troubleshoot a production-only performance issue

> A developer used Cursor and Warp agents to analyze NestJS database queries and recommend indexes for a production performance problem.

**Category:** Software & DevOps  
**Agent:** Cursor  
**Source:** trevorarnold.substack.com · Dec 1, 2025

## What they did

A page was slow in production but not in the dev environment. The developer asked a Cursor/Warp agent to list possible causes and the steps to fix them. The agent read the codebase, worked out which database queries NestJS was making, and said which database indexes should be used.

## How it went

After the developer added the recommended indexes, page load performance improved significantly. The source gives no timings or figures.

## Worth knowing

The agent worked from the codebase and produced a list of candidate causes, so the developer still had to apply the indexes and check the result in production.

## Prompt

```text
Our [framework, e.g. NestJS] app is slow in production but not locally, specifically [endpoint or page]. Read the code and database queries involved, identify the slowest or most repeated ones, and recommend indexes or query changes with an explanation of why. You're done when you have a ranked list of fixes with the exact migration or code change for each. Don't run anything against the production database; show me the changes first.
```

## Related use cases

- [Keep coding agents running autonomously for long stretches](./keep-coding-agents-running-autonomously-for-long-stretches.md)
- [Grade Cursor on a real data science project](./grade-cursor-on-a-real-data-science-project.md)
- [Queue maintenance and bug fixes for Cursor background agents](./queue-maintenance-and-bug-fixes-for-cursor-background-agents.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build and deploy an app over a weekend](./build-and-deploy-an-app-over-a-weekend.md)
- [Build an anonymous wall of hopes and fears about AI](./build-an-anonymous-wall-of-hopes-and-fears-about-ai.md)
