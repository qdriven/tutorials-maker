---
title: "Diagnose AWS issues with read-only Claude access"
slug: "diagnose-aws-issues-with-read-only-claude-access"
summary: "A startup engineer gives Claude read-only access to AWS, logs and the database, and it investigates issues and writes a report, though it sometimes makes things up."
category: "Software & DevOps"
agents:
  - name: "Claude"
    slug: "claude"
source_platform: "HN"
source_date: "Oct 30, 2026"
source_url: "https://news.ycombinator.com/item?id=50306875"
fetched_from: "https://agentusecases.ai/use-case/diagnose-aws-issues-with-read-only-claude-access"
---

# Diagnose AWS issues with read-only Claude access

> A startup engineer gives Claude read-only access to AWS, logs and the database, and it investigates issues and writes a report, though it sometimes makes things up.

**Category:** Software & DevOps  
**Agent:** Claude  
**Source:** HN · Oct 30, 2026

## What they did

A startup engineer who covers the whole stack (code, deployment, database, cloud, networking) gives Claude read-only access to AWS, the logs and the database. Instead of manually reading logs, checking routing tables and cross-checking against database data, they let Claude use the AWS CLI to investigate the issue. It then writes a detailed report that can be passed to others.

## How it went

The author says it solves issues roughly 10x faster than they could. It sometimes makes things up, and the author worries about skill atrophy, including for future job interviews.

## Worth knowing

Read-only access limits the damage, but the report can contain invented claims, so verify its findings before passing them along.

## Prompt

```text
I'm giving you read-only access to [my AWS account/profile], [log source], and [database]. Investigate this problem: [describe the symptom and when it started]. Only run read-only commands, and don't change or delete anything. Write a report with what you found, the evidence for each claim (log lines, queries, resource IDs), and anything you're unsure about, clearly marked as a guess rather than a fact.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a charting tool from blood test PDFs](./build-a-charting-tool-from-blood-test-pdfs.md)
- [Run a daily-updated local business directory autonomously](./run-a-daily-updated-local-business-directory-autonomously.md)
- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Build a Pong game and website from scratch](./build-a-pong-game-and-website-from-scratch.md)
- [Build a project management tool with a 24-hour agent run](./build-a-project-management-tool-with-a-24-hour-agent-run.md)
