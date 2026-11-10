---
title: "Run a 24/7 personal assistant and progress tracker"
slug: "run-a-24-7-personal-assistant-and-progress-tracker"
summary: "The poster is setting up OpenClaw as an always-on personal assistant and progress tracker, and also uses it for a self-hosted project, seeking advice on model routing costs."
category: "Life Admin & Home"
agents:
  - name: "OpenClaw"
    slug: "openclaw"
source_platform: "Reddit"
source_date: "May 1, 2026"
source_url: "https://www.reddit.com/r/openclaw/comments/1t4fj71/whats_your_daily_driver"
fetched_from: "https://agentusecases.ai/use-case/run-a-24-7-personal-assistant-and-progress-tracker"
---

# Run a 24/7 personal assistant and progress tracker

> The poster is setting up OpenClaw as an always-on personal assistant and progress tracker, and also uses it for a self-hosted project, seeking advice on model routing costs.

**Category:** Life Admin & Home  
**Agent:** OpenClaw  
**Source:** Reddit · May 1, 2026

## What they did

The post describes an OpenClaw setup meant to stay on all day in the background as a personal assistant and progress tracker. The agent was intended to watch the user’s schedule, track progress, update and format a database feeding a personal dashboard, listen for cron jobs, send SMS or chat pings, and do occasional light web search and scraping; the thread’s concrete follow-up came from a commenter using a second agent for a self-hosted project and Google Workspace access after API setup.

## How it went

The thread gives no measured results from the original poster. In comments, one user said a two-agent setup was going well: a $10 plan handled Gmail triage, calendar events, sync cron jobs, and weekly stock pulls, while a second $20 agent was used for a self-hosted project.

## Worth knowing

The clearest catch mentioned is setup overhead: Google Workspace automation required initial API configuration before the bot could work across Gmail and Calendar.

## Prompt

```text
Set me up as a 24/7 personal assistant that tracks my progress on [goals or projects]. Each [day or week], ask me for updates, log them in [notes or file], and send me a short summary of progress and what's next. Suggest a model routing setup that uses cheaper models for routine tasks and stronger ones for hard ones, with estimated monthly cost. Ask before sending messages to anyone but me.
```

## Related use cases

- [Manage 18 agents from a Notion workspace](./manage-18-agents-from-a-notion-workspace.md)
- [Curate a weekly newsletter from RSS feeds](./curate-a-weekly-newsletter-from-rss-feeds.md)
- [Diagnose a check engine light by ordering an OBD2 scanner](./diagnose-a-check-engine-light-by-ordering-an-obd2-scanner.md)
- [Get a second opinion on an MRI](./get-a-second-opinion-on-an-mri.md)
- [Fill out a long GP form](./fill-out-a-long-gp-form.md)
- [Log meals and medical metrics into a health spreadsheet](./log-meals-and-medical-metrics-into-a-health-spreadsheet.md)
