---
title: "Monitor tasks and open pull requests with long-running agents"
slug: "monitor-tasks-and-open-pull-requests-with-long-running-agent"
summary: "A commenter runs a persistent script that watches tasks and uses Cursor to open pull requests, building a documentation summarizer and a data pipeline."
category: "Software & DevOps"
agents:
  - name: "Cursor"
    slug: "cursor"
source_platform: "Reddit"
source_date: "Jan 1, 2025"
source_url: "https://www.reddit.com/r/cursor/comments/1q4iztv/anyone_succeed_building_something_cool_with"
fetched_from: "https://agentusecases.ai/use-case/monitor-tasks-and-open-pull-requests-with-long-running-agent"
---

# Monitor tasks and open pull requests with long-running agents

> A commenter runs a persistent script that watches tasks and uses Cursor to open pull requests, building a documentation summarizer and a data pipeline.

**Category:** Software & DevOps  
**Agent:** Cursor  
**Source:** Reddit · Jan 1, 2025

## What they did

In a comment, the team said they run a Claude Code server on a VPS using the Caliber AI setup repo. That setup generates MCP configs and agent skills for their codebase and Cursor, they sync the environment with one command, and then a persistent script watches tasks and has Cursor open pull requests; the examples they named were a documentation summarizer and a data pipeline.

## How it went

They said this workflow was used to build a few internal tools, specifically those two examples. The comment gives no metrics, timeline, or detail on review, so the results are described only at a high level.

## Worth knowing

The main implementation catch they mention is infrastructure: a VPS-hosted Claude Code server, generated MCP configs and skills, and a one-command environment sync.

## Prompt

```text
In my repo [repo name], read the open tasks in [issue tracker or task file] and for the one I pick, make the code change on a new branch, run the tests, and open a pull request with a clear description. Start by listing the tasks you could handle and wait for my choice, and do not merge anything. Finish when the pull request is open and tests pass.
```

## Related use cases

- [Keep coding agents running autonomously for long stretches](./keep-coding-agents-running-autonomously-for-long-stretches.md)
- [Draft articles quoting Kindle highlights and notes](./draft-articles-quoting-kindle-highlights-and-notes.md)
- [Queue maintenance and bug fixes for Cursor background agents](./queue-maintenance-and-bug-fixes-for-cursor-background-agents.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build and deploy an app over a weekend](./build-and-deploy-an-app-over-a-weekend.md)
- [Build an anonymous wall of hopes and fears about AI](./build-an-anonymous-wall-of-hopes-and-fears-about-ai.md)
