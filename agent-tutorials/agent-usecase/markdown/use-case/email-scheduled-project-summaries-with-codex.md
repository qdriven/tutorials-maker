---
title: "Email scheduled project summaries with Codex"
slug: "email-scheduled-project-summaries-with-codex"
summary: "A guide sets up a Codex automation that reads project files on a schedule and emails a weekly summary via the Gmail plugin."
category: "Work & Operations"
agents:
  - name: "Codex"
    slug: "codex"
source_platform: "mindstudio.ai"
source_date: "Undated"
source_url: "https://www.mindstudio.ai/blog/chatgpt-codex-automations-gmail-plugin-scheduled-tasks"
fetched_from: "https://agentusecases.ai/use-case/email-scheduled-project-summaries-with-codex"
---

# Email scheduled project summaries with Codex

> A guide sets up a Codex automation that reads project files on a schedule and emails a weekly summary via the Gmail plugin.

**Category:** Work & Operations  
**Agent:** Codex  
**Source:** mindstudio.ai · Undated

## What they did

The guide has you install the Gmail plugin through OAuth and send a test email. You then create an automation attached to a local project folder. Its prompt tells Codex to summarize the files and send the result with @Gmail. The demo used a folder of two transcript files, medium reasoning, a Sunday 9 a.m. schedule and full-access permissions so it runs unattended.

## How it went

The source says setup takes under ten minutes and then runs with no further input. It gives no measured results from real runs, only troubleshooting for failures such as expired OAuth, approval pauses and a missing @Gmail mention.

## Worth knowing

Automations use tokens on every run, so check your usage first. Large folders or high reasoning drain credits quickly, and full access is needed for unattended runs.

## Prompt

```text
Create a scheduled automation that runs every [day and time], reads the files in [project folder], and writes a short weekly summary of progress, open issues, and next steps. Email it to [recipient address] using my Gmail plugin. Before the first send, show me the draft and the schedule so I can approve them.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Build a racing game from a single prompt](./build-a-racing-game-from-a-single-prompt.md)
- [Spin up a second agent as an independent QA reviewer](./spin-up-a-second-agent-as-an-independent-qa-reviewer.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Speed up multifamily deal research and property summaries](./speed-up-multifamily-deal-research-and-property-summaries.md)
- [Turn receipts into CSV for bookkeeping](./turn-receipts-into-csv-for-bookkeeping.md)
