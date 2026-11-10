---
title: "Analyze workouts and blood pressure from Apple Health data"
slug: "analyze-workouts-and-blood-pressure-from-apple-health-data"
summary: "The poster uses ChatGPT's Apple Health integration for run analysis, health planning and blood-pressure monitoring, but medication logs aren't accessible yet."
category: "Life Admin & Home"
agents:
  - name: "ChatGPT"
    slug: "chatgpt"
source_platform: "Reddit"
source_date: "Sep 18, 2026"
source_url: "https://www.reddit.com/r/ChatGPT/comments/1wju31j/apple_health_integration_medication_log_access"
fetched_from: "https://agentusecases.ai/use-case/analyze-workouts-and-blood-pressure-from-apple-health-data"
---

# Analyze workouts and blood pressure from Apple Health data

> The poster uses ChatGPT's Apple Health integration for run analysis, health planning and blood-pressure monitoring, but medication logs aren't accessible yet.

**Category:** Life Admin & Home  
**Agent:** ChatGPT  
**Source:** Reddit · Sep 18, 2026

## What they did

The poster connected ChatGPT to Apple Health and uses the synced data for workout and run analysis, general health planning, and tracking blood pressure patterns. They specifically want the agent to compare blood-pressure readings against medication timing, but ChatGPT can only see the medication list in Health, not the medication log entries, so they were considering having Codex build a companion app to surface those logs.

## How it went

It works for the Apple Health data categories ChatGPT can already read, including workouts, runs, and blood pressure. The stated gap is that medication logs are not exposed, so it cannot factor actual dose timing into the blood-pressure analysis yet.

## Worth knowing

The main catch is access, not prompting: medication names are visible, but medication log history is not, despite the poster saying Apple has an API for sharing those logs with third-party apps.

## Prompt

```text
Using my connected Apple Health data, analyze my runs from the past [time period]: pace trends, heart rate, and weekly volume. Also review my blood pressure readings over the same period and flag any patterns worth raising with my doctor. Finish with a simple [4-week] training plan toward [goal], and note any data you couldn't access.
```

## Related use cases

- [Generate LEGO CAD models in LDraw with AI agents](./generate-lego-cad-models-in-ldraw-with-ai-agents.md)
- [Compile and filter apartment listings](./compile-and-filter-apartment-listings.md)
- [Run a 10-agent SEO content pipeline](./run-a-10-agent-seo-content-pipeline.md)
- [Get a second opinion on an MRI](./get-a-second-opinion-on-an-mri.md)
- [Plan meals and track symptoms with Claude Code](./plan-meals-and-track-symptoms-with-claude-code.md)
- [Use a coding agent for everyday non-programming chores](./use-a-coding-agent-for-everyday-non-programming-chores.md)
