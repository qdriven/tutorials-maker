---
title: "Log meals and medical metrics into a health spreadsheet"
slug: "log-meals-and-medical-metrics-into-a-health-spreadsheet"
summary: "A Claude Cowork skill tracks diet and medical metrics in a spreadsheet, and meals told to Claude on mobile are logged in the daily record."
category: "Life Admin & Home"
agents:
  - name: "Claude Cowork"
    slug: "claude-cowork"
  - name: "Claude"
    slug: "claude"
source_platform: "Reddit"
source_date: "May 1, 2026"
source_url: "https://www.reddit.com/r/ClaudeCowork/comments/1sz5yqb/healthdiet_tracking_skill"
fetched_from: "https://agentusecases.ai/use-case/log-meals-and-medical-metrics-into-a-health-spreadsheet"
---

# Log meals and medical metrics into a health spreadsheet

> A Claude Cowork skill tracks diet and medical metrics in a spreadsheet, and meals told to Claude on mobile are logged in the daily record.

**Category:** Life Admin & Home  
**Agent:** Claude Cowork, Claude  
**Source:** Reddit · May 1, 2026

## What they did

The poster made a Claude Cowork “Health Related” folder on a desktop and asked Claude to create both a spreadsheet and a skill for tracking diet goals and medical metrics. After enabling Dispatch, they could tell Claude on their phone what they ate; Claude looked up nutrition on the web, split meals into line items, wrote protein/fat/carbs/calories into the .xlsx daily log, and also logged weight and blood pressure.

## How it went

It produced per-item meal entries plus a running daily total against targets, then suggested how to use remaining calories and protein for later meals. The poster said setup took about eight minutes and described it as better than other tracking apps, but gave no longer-term results or accuracy checks.

## Worth knowing

The main catch mentioned is format: Claude used an .xlsx file, and the poster had Excel on a Mac but was not sure whether Excel was required.

## Prompt

```text
Set up a skill that tracks my diet and medical metrics such as [blood pressure, glucose, weight] in the spreadsheet at [file path]. When I tell you what I ate, log it with estimated [calories, protein, sodium] in today's row. When done, confirm the entry and show me the day's running totals.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Plan meals and place grocery orders from a Google Doc](./plan-meals-and-place-grocery-orders-from-a-google-doc.md)
- [Log, categorize and file invoices for bookkeeping](./log-categorize-and-file-invoices-for-bookkeeping.md)
- [Get a second opinion on an MRI](./get-a-second-opinion-on-an-mri.md)
- [Give an AI its own inbox to act as personal assistant](./give-an-ai-its-own-inbox-to-act-as-personal-assistant.md)
- [Diagnose a check engine light by ordering an OBD2 scanner](./diagnose-a-check-engine-light-by-ordering-an-obd2-scanner.md)
