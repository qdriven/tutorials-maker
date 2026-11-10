---
title: "Have Copilot write all of a day's pushed code"
slug: "have-copilot-write-all-of-a-day-s-pushed-code"
summary: "A commenter had Copilot write every line pushed in a day; it mostly worked but one wrong change needed human review."
category: "Software & DevOps"
agents:
  - name: "GitHub Copilot"
    slug: "github-copilot"
source_platform: "Reddit"
source_date: "Undated"
source_url: "https://www.reddit.com/r/GithubCopilot/comments/1o8kq2t"
fetched_from: "https://agentusecases.ai/use-case/have-copilot-write-all-of-a-day-s-pushed-code"
---

# Have Copilot write all of a day's pushed code

> A commenter had Copilot write every line pushed in a day; it mostly worked but one wrong change needed human review.

**Category:** Software & DevOps  
**Agent:** GitHub Copilot  
**Source:** Reddit · Undated

## What they did

A commenter said they had Copilot write every line of code they pushed that day, but only by closely steering it the whole time. In the same thread, others described the practical pattern as giving one or two tightly scoped goals, specifying what not to touch, testing before accepting changes, and undoing whole sessions from backups when the agent mangled files.

## How it went

It worked well enough for that day’s code, but only with constant hand-holding. The thread’s broader verdict was that agents are unreliable on larger tasks and often force rollbacks or restarts when they go off the rails.

## Worth knowing

The clearest catch was the supervision overhead: one user said a single game change took 2 days of trial, error, and rollbacks before it worked.

## Prompt

```text
Help me implement [feature or fix] in my [repo/project] using Copilot for every code change. Work in small steps, and after each step list the files you touched and what changed so I can review the diff before moving on. Flag any change that alters existing behavior rather than just adding to it, and finish when [the feature works and tests pass].
```

## Related use cases

- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Iterate on tasks with Copilot CLI autopilot and fleet](./iterate-on-tasks-with-copilot-cli-autopilot-and-fleet.md)
- [Assign GitHub issues to Copilot coding agent](./assign-github-issues-to-copilot-coding-agent.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a name-and-face quiz site from a spreadsheet](./build-a-name-and-face-quiz-site-from-a-spreadsheet.md)
- [Port a Chrome extension to Safari](./port-a-chrome-extension-to-safari.md)
