---
title: "Ship a backlog landing page from a ticket spec"
slug: "ship-a-backlog-landing-page-from-a-ticket-spec"
summary: "Cursor's background agent built a pricing landing page from a short spec in about 5 minutes on a new branch and opened a PR."
category: "Software & DevOps"
agents:
  - name: "Cursor"
    slug: "cursor"
source_platform: "thepromptwarrior.com"
source_date: "Undated"
source_url: "https://www.thepromptwarrior.com/p/how-these-cursor-updates-will-save-you-hours"
fetched_from: "https://agentusecases.ai/use-case/ship-a-backlog-landing-page-from-a-ticket-spec"
---

# Ship a backlog landing page from a ticket spec

> Cursor's background agent built a pricing landing page from a short spec in about 5 minutes on a new branch and opened a PR.

**Category:** Software & DevOps  
**Agent:** Cursor  
**Source:** thepromptwarrior.com · Undated

## What they did

Moritz Kremb picked "Background" in Cursor's dropdown and gave it a small spec for a pricing landing page, like a ticket for a junior developer. The agent built the feature on its own, working on a new branch, and produced a pull request. He got a notification with a summary and a PR link.

## How it went

It took about 5 minutes. He reviewed the PR, tested it locally, and merged it to production. BugBot found no bugs on the PR. He says he only tries small, easy features so far.

## Worth knowing

BugBot uses Max mode, which the author calls quite pricey. He set it to run only when mentioned in a PR comment.

## Prompt

```text
Using this spec: [short description of the page, such as sections, copy and pricing tiers], build the landing page in my repo [repo name] on a new branch and open a pull request. Match the existing styles and components in the codebase. You're done when the page renders locally with no lint errors and the PR description lists what you changed. Show me the diff summary before you open the PR.
```

## Related use cases

- [Keep coding agents running autonomously for long stretches](./keep-coding-agents-running-autonomously-for-long-stretches.md)
- [Grade Cursor on a real data science project](./grade-cursor-on-a-real-data-science-project.md)
- [Queue maintenance and bug fixes for Cursor background agents](./queue-maintenance-and-bug-fixes-for-cursor-background-agents.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build and deploy an app over a weekend](./build-and-deploy-an-app-over-a-weekend.md)
- [Build an anonymous wall of hopes and fears about AI](./build-an-anonymous-wall-of-hopes-and-fears-about-ai.md)
