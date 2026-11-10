---
title: "Coordinate sub-agents to monitor PRs and fix prod bugs"
slug: "coordinate-sub-agents-to-monitor-prs-and-fix-prod-bugs"
summary: "A Cursor Projects coordinator agent delegates to sub-agents, watches new PRs and production bugs, spins up agents to fix issues, and surfaces questions to the user."
category: "Software & DevOps"
agents:
  - name: "Cursor"
    slug: "cursor"
source_platform: "X"
source_date: "Oct 7, 2026"
source_url: "https://x.com/chsrbrts/status/2107637980504723550"
fetched_from: "https://agentusecases.ai/use-case/coordinate-sub-agents-to-monitor-prs-and-fix-prod-bugs"
---

# Coordinate sub-agents to monitor PRs and fix prod bugs

> A Cursor Projects coordinator agent delegates to sub-agents, watches new PRs and production bugs, spins up agents to fix issues, and surfaces questions to the user.

**Category:** Software & DevOps  
**Agent:** Cursor  
**Source:** X · Oct 7, 2026

## What they did

The Cursor Projects coordinator agent received overall project context and intent. On its own it monitored fresh PRs and production issues or bugs, then spun up sub-agents to handle fixes while delegating context across them. It sent the user live updates and surfaced questions along with its own recommendation or point of view.

## How it went

After finishing one large project the user described the experience as a collaborative marathon that ended too soon and preferred it to earlier agent workflows.

## Prompt

```text
Act as a coordinator for [repo]. Watch for new pull requests and production errors from [monitoring tool], and for each issue spin up a sub-agent to investigate and propose a fix as a draft PR. Report back to me with a short summary and any questions you have. Don't merge or deploy anything without my explicit approval.
```

## Related use cases

- [Keep coding agents running autonomously for long stretches](./keep-coding-agents-running-autonomously-for-long-stretches.md)
- [Draft articles quoting Kindle highlights and notes](./draft-articles-quoting-kindle-highlights-and-notes.md)
- [Manage an inbox and book jobs as an office manager](./manage-an-inbox-and-book-jobs-as-an-office-manager.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build and deploy an app over a weekend](./build-and-deploy-an-app-over-a-weekend.md)
- [Build an anonymous wall of hopes and fears about AI](./build-an-anonymous-wall-of-hopes-and-fears-about-ai.md)
