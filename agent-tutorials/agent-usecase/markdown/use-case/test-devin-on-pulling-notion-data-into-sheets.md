---
title: "Test Devin on pulling Notion data into Sheets"
slug: "test-devin-on-pulling-notion-data-into-sheets"
summary: "Answer.AI testers found Devin completed only 3 of 20 tasks, succeeding at moving Notion data to Google Sheets and building a planet tracker."
category: "Software & DevOps"
agents:
  - name: "Devin"
    slug: "devin"
source_platform: "theregister.com"
source_date: "Jan 23, 2025"
source_url: "https://www.theregister.com/2025/01/23/ai_developer_devin_poor_reviews"
fetched_from: "https://agentusecases.ai/use-case/test-devin-on-pulling-notion-data-into-sheets"
---

# Test Devin on pulling Notion data into Sheets

> Answer.AI testers found Devin completed only 3 of 20 tasks, succeeding at moving Notion data to Google Sheets and building a planet tracker.

**Category:** Software & DevOps  
**Agent:** Devin  
**Source:** theregister.com · Jan 23, 2025

## What they did

Three Answer.AI data scientists (Hamel Husain, Isaac Flath, Johno Whitaker) gave Devin 20 tasks. Devin takes commands through Slack and works in a Docker container with a terminal, browser, code editor and planner. Early tasks included pulling data from a Notion database into Google Sheets and building a planet tracker for checking historical Jupiter and Saturn positions.

## How it went

Devin finished 3 of 20 tasks: the Notion-to-Sheets move, the planet tracker, and a Discord bot research task. Three were inconclusive and 14 failed. Simple-looking tasks often took days, and it was hard to predict which would work.

## Worth knowing

Devin starts at $500 per month. It kept pushing on impossible tasks, such as a Railway deployment, for over a day instead of stopping, so set time limits.

## Prompt

```text
Pull the data from my Notion database [database name or link] into a new Google Sheet, with one column per Notion property and one row per entry. Keep the Sheet in a shared location I can open, and tell me the link when the row count in the Sheet matches the Notion database. Ask me before overwriting or deleting anything that already exists.
```

## Related use cases

- [Hand narrow code changes to Devin for pull requests](./hand-narrow-code-changes-to-devin-for-pull-requests.md)
- [Rewrite a README after a rearchitecture](./rewrite-a-readme-after-a-rearchitecture.md)
- [Turn Slack feedback into PRs and debug infra](./turn-slack-feedback-into-prs-and-debug-infra.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a homepage from Figma designs via MCP](./build-a-homepage-from-figma-designs-via-mcp.md)
- [Run Codex with low-touch planning and port reservation](./run-codex-with-low-touch-planning-and-port-reservation.md)
