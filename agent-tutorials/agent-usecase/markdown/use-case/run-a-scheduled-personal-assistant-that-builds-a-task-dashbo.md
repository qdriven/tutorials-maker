---
title: "Run a scheduled personal assistant that builds a task dashboard"
slug: "run-a-scheduled-personal-assistant-that-builds-a-task-dashbo"
summary: "A Rippling engineer's Cursor cron agent runs every two hours, reading Slack notes, GitHub PRs, Jira issues and mentions, deduplicating them and posting a dashboard."
category: "Work & Operations"
agents:
  - name: "Cursor"
    slug: "cursor"
source_platform: "cursor.com"
source_date: "Undated"
source_url: "https://cursor.com/blog/automations"
fetched_from: "https://agentusecases.ai/use-case/run-a-scheduled-personal-assistant-that-builds-a-task-dashbo"
---

# Run a scheduled personal assistant that builds a task dashboard

> A Rippling engineer's Cursor cron agent runs every two hours, reading Slack notes, GitHub PRs, Jira issues and mentions, deduplicating them and posting a dashboard.

**Category:** Work & Operations  
**Agent:** Cursor  
**Source:** cursor.com · Undated

## What they did

Abhishek Singh at Rippling drops meeting notes, action items, TODOs and Loom links into a Slack channel during the day. A Cursor Automations cron agent runs every two hours in a cloud sandbox. It reads that channel along with his GitHub PRs, Jira issues and Slack mentions, deduplicates across them, and posts a dashboard.

## How it went

The source gives no metrics for this assistant. It says Singh went on to build other automations, such as Slack-to-Jira issue creation and Confluence summaries, and that the most useful ones get shared across the team.

## Prompt

```text
Set up a scheduled agent that runs every [2 hours] and reads my [Slack notes / GitHub PRs / Jira or Linear issues / mentions]. Merge duplicates into one prioritized task dashboard at [file or page location] grouped by [urgency / project]. Finish after one successful test run and show me the result, and do not post, comment or change anything in those tools without asking.
```

## Related use cases

- [Keep coding agents running autonomously for long stretches](./keep-coding-agents-running-autonomously-for-long-stretches.md)
- [Grade Cursor on a real data science project](./grade-cursor-on-a-real-data-science-project.md)
- [Queue maintenance and bug fixes for Cursor background agents](./queue-maintenance-and-bug-fixes-for-cursor-background-agents.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Review contracts like NDAs and SaaS agreements in Claude Code](./review-contracts-like-ndas-and-saas-agreements-in-claude-cod.md)
- [Give an agent a phone number to make and answer calls](./give-an-agent-a-phone-number-to-make-and-answer-calls.md)
