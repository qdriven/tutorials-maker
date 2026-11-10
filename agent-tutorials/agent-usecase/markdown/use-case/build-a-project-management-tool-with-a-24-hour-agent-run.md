---
title: "Build a project management tool with a 24-hour agent run"
slug: "build-a-project-management-tool-with-a-24-hour-agent-run"
summary: "Ran a Cursor agent continuously for 24 hours to build a project management tool; the app fully works but is not production ready."
category: "Software & DevOps"
agents:
  - name: "Cursor"
    slug: "cursor"
source_platform: "X"
source_date: "Oct 14, 2025"
source_url: "https://x.com/ericzakariasson/status/1978177556424917152"
fetched_from: "https://agentusecases.ai/use-case/build-a-project-management-tool-with-a-24-hour-agent-run"
---

# Build a project management tool with a 24-hour agent run

> Ran a Cursor agent continuously for 24 hours to build a project management tool; the app fully works but is not production ready.

**Category:** Software & DevOps  
**Agent:** Cursor  
**Source:** X · Oct 14, 2025

## What they did

The agent ran Sonnet 4.5 from the Cursor CLI in a continuous loop for 24 hours, receiving only the prompt "build a project management tool" and almost no upfront context. It tracked its own progress and iterated autonomously until it determined the task was complete. The human started the loop but added no further input during the run.

## How it went

The resulting app fully worked as a project management tool. It was not production ready, though the code structure and navigation proved better than expected.

## Worth knowing

Almost no initial context was supplied, showing how far a simple looped prompt can go on its own.

## Prompt

```text
Build a project management tool in this repo with [features: tasks, boards, assignees, due dates] using [tech stack]. Work in stages, run the tests and the app as you go, and keep a running list of what works and what is missing. Stop when the core flows work end to end and give me a summary of known gaps; ask before deleting files or adding paid services.
```

## Related use cases

- [Keep coding agents running autonomously for long stretches](./keep-coding-agents-running-autonomously-for-long-stretches.md)
- [Draft articles quoting Kindle highlights and notes](./draft-articles-quoting-kindle-highlights-and-notes.md)
- [Manage an inbox and book jobs as an office manager](./manage-an-inbox-and-book-jobs-as-an-office-manager.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build and deploy an app over a weekend](./build-and-deploy-an-app-over-a-weekend.md)
- [Build an anonymous wall of hopes and fears about AI](./build-an-anonymous-wall-of-hopes-and-fears-about-ai.md)
