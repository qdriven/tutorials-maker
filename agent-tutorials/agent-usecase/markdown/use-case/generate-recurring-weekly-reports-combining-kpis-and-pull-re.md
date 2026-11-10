---
title: "Generate recurring weekly reports combining KPIs and pull requests"
slug: "generate-recurring-weekly-reports-combining-kpis-and-pull-re"
summary: "A product leader uses Claude Code for automatic recurring reports on what developers shipped and whether features helped or hurt KPIs."
category: "Work & Operations"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "dmkthinks.org"
source_date: "Undated"
source_url: "https://dmkthinks.org/blog/claude-code-examples/"
fetched_from: "https://agentusecases.ai/use-case/generate-recurring-weekly-reports-combining-kpis-and-pull-re"
---

# Generate recurring weekly reports combining KPIs and pull requests

> A product leader uses Claude Code for automatic recurring reports on what developers shipped and whether features helped or hurt KPIs.

**Category:** Work & Operations  
**Agent:** Claude Code  
**Source:** dmkthinks.org · Undated

## What they did

David Kelly, a product leader, tracks KPIs for each product in a Metabase dashboard. He prompts Claude Code to build a system that pulls weekly GitHub pull requests, compares them with period-over-period KPI changes, and scores how likely each PR affected each KPI. He connects Zen MCP tools to the OpenAI and Gemini APIs so several models cross-check the analysis. He publishes the full prompt.

## How it went

He gets a weekly report on whether shipped features helped or hurt KPIs, and he uses it to iterate. The post gives no accuracy figures for the correlations.

## Worth knowing

A paid Claude plan is needed. He suggests Pro at $20 a month and advises against the API because costs can add up quickly.

## Prompt

```text
Every [Monday morning], pull the pull requests merged in [repo name] over the past week and our KPI numbers from [KPI source, e.g. a CSV or dashboard export]. Write a one-page report of what shipped, which features likely helped or hurt [KPI names], and what to watch next week. Save it as [file path or format] and show me the first draft before setting up any recurring schedule or sending it to anyone.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Link journal entries and write book reviews in Obsidian](./link-journal-entries-and-write-book-reviews-in-obsidian.md)
- [Produce a finished music release from one chat](./produce-a-finished-music-release-from-one-chat.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Write end-of-sprint changelogs from completed tickets](./write-end-of-sprint-changelogs-from-completed-tickets.md)
- [Build a Telegram bot that sends emails and checks calendar](./build-a-telegram-bot-that-sends-emails-and-checks-calendar.md)
