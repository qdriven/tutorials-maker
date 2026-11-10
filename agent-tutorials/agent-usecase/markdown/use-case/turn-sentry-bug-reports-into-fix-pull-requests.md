---
title: "Turn Sentry bug reports into fix pull requests"
slug: "turn-sentry-bug-reports-into-fix-pull-requests"
summary: "Sentry's Seer passes root cause analysis and issue context to a Cursor Cloud Agent, which writes the fix and opens a pull request in the user's repo."
category: "Software & DevOps"
agents:
  - name: "Cursor"
    slug: "cursor"
source_platform: "blog.sentry.io"
source_date: "Undated"
source_url: "https://blog.sentry.io/seer-can-now-trigger-cursor-agents-to-fix-your-bugs"
fetched_from: "https://agentusecases.ai/use-case/turn-sentry-bug-reports-into-fix-pull-requests"
---

# Turn Sentry bug reports into fix pull requests

> Sentry's Seer passes root cause analysis and issue context to a Cursor Cloud Agent, which writes the fix and opens a pull request in the user's repo.

**Category:** Software & DevOps  
**Agent:** Cursor  
**Source:** blog.sentry.io · Undated

## What they did

Setup takes a few minutes. You install the Cursor Agent integration in Sentry with a Cursor API key, then set Seer's stopping point to hand off to Cursor. After Seer finishes root cause analysis, the Cursor Cloud Agent gets the stack traces, breadcrumbs, user impact and RCA, plus your running codebase. You can trigger it by hand from an issue or automatically.

## How it went

The post reports no measured results. It says the agent can run type checks, lint and tests, so issues can arrive triaged and merge-ready as a pull request in your repo. Those agents also appear in your local Cursor IDE agents tab.

## Worth knowing

Automation is configured per project in Seer settings, so you can choose which issues get auto-queued for fixes. The post gives no cost or success-rate figures.

## Prompt

```text
Take the Sentry issue [issue link or ID] in my repo [repo name] and find the root cause using the stack trace and recent commits. Write a minimal fix with a test that reproduces the bug, then prepare a pull request describing the cause and the change. Finished means the tests pass and the PR is ready on a new branch. Show me the diff and PR description before you open the pull request or push anything.
```

## Related use cases

- [Keep coding agents running autonomously for long stretches](./keep-coding-agents-running-autonomously-for-long-stretches.md)
- [Draft articles quoting Kindle highlights and notes](./draft-articles-quoting-kindle-highlights-and-notes.md)
- [Manage an inbox and book jobs as an office manager](./manage-an-inbox-and-book-jobs-as-an-office-manager.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build and deploy an app over a weekend](./build-and-deploy-an-app-over-a-weekend.md)
- [Build an anonymous wall of hopes and fears about AI](./build-an-anonymous-wall-of-hopes-and-fears-about-ai.md)
