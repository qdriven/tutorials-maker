---
title: "Spend leftover AI quota on reviewable PRs"
slug: "spend-leftover-ai-quota-on-reviewable-prs"
summary: "RemainderBot uses a founder's goals and task lists to write PRs with spare Claude and Codex quota, producing 111 PRs including call prep and prototypes."
category: "Software & DevOps"
agents:
  - name: "Claude"
    slug: "claude"
  - name: "Codex"
    slug: "codex"
source_platform: "HN"
source_date: "Oct 13, 2026"
source_url: "https://news.ycombinator.com/item?id=50073611"
fetched_from: "https://agentusecases.ai/use-case/spend-leftover-ai-quota-on-reviewable-prs"
---

# Spend leftover AI quota on reviewable PRs

> RemainderBot uses a founder's goals and task lists to write PRs with spare Claude and Codex quota, producing 111 PRs including call prep and prototypes.

**Category:** Software & DevOps  
**Agent:** Claude, Codex  
**Source:** HN · Oct 13, 2026

## What they did

The founder points RemainderBot at a goals file and task-list sources. It runs by hand or as a cronjob. In cron mode it checks remaining subscription quota and time until the weekly reset, picks a task, works on a new branch, and opens a PR. The founder reviews PRs on GitHub, and comments and merge decisions shape later tasks.

## How it went

It produced 111 PRs, including customer call prep, a census of 31 GitHub orgs' agent setup files, and standalone prototypes for demos. The source gives no accuracy figures; the author asks users to report mistakes.

## Worth knowing

Needs git, the claude or codex CLI, and an authenticated gh. A single small run with a 20-minute deadline costs a few percent of weekly quota.

## Prompt

```text
Read my goals in [path to goals file] and my task list in [path or link to task list]. Pick up to [number] small, well-defined tasks I could use help with, such as call prep notes, prototypes, or small fixes, and do each on its own branch and open it as a pull request in [repo] with a short description of what you did and why. Do not merge anything, and stop once you have opened the PRs and given me a list of them.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Generate a daily personalized trading research report from brokerage data](./generate-a-daily-personalized-trading-research-report-from-b.md)
- [Spin up a second agent as an independent QA reviewer](./spin-up-a-second-agent-as-an-independent-qa-reviewer.md)
- [Review Linux kernel patches](./review-linux-kernel-patches.md)
- [Build a name-and-face quiz site from a spreadsheet](./build-a-name-and-face-quiz-site-from-a-spreadsheet.md)
- [Build an invitation card website purely by prompting](./build-an-invitation-card-website-purely-by-prompting.md)
