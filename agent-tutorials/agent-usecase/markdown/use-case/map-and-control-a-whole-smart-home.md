---
title: "Map and control a whole smart home"
slug: "map-and-control-a-whole-smart-home"
summary: "Karpathy's agent scanned the home network, logged into Sonos, reverse-engineered APIs, mapped lights, HVAC, shades, pool and security, and built a dashboard."
category: "Life Admin & Home"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_platform: "X"
source_date: "Mar 25, 2026"
source_url: "https://x.com/MilkRoadAI/status/2036820969067524357"
fetched_from: "https://agentusecases.ai/use-case/map-and-control-a-whole-smart-home"
---

# Map and control a whole smart home

> Karpathy's agent scanned the home network, logged into Sonos, reverse-engineered APIs, mapped lights, HVAC, shades, pool and security, and built a dashboard.

**Category:** Life Admin & Home  
**Agent:** custom-built or unnamed agent  
**Source:** X · Mar 25, 2026

## What they did

Karpathy prompted the agent in chat with "Can you find my Sonos?". The agent scanned the home IP network, logged into the unprotected Sonos, web-searched and reverse-engineered its API endpoints, then repeated the process on lights, HVAC, shades, pool, spa, and security systems. It built its own dashboard and APIs to stitch the systems together; Karpathy later issued commands such as "Dobby, it's sleepy time".

## How it went

The agent produced a unified control center for the full house and now executes high-level commands across all devices. The post states no further metrics or shortfalls.

## Prompt

```text
Scan my home network at [network range] and identify the smart devices on it, such as [lights, speakers, thermostat, cameras]. Map what each one can do and how to control it, then build a simple local dashboard that shows them in one place. Only read and list devices at first, and ask me before logging in to any account or sending any control command.
```

## Related use cases

- [Get a second opinion on an MRI](./get-a-second-opinion-on-an-mri.md)
- [Sort 2,200 Downloads files into folders with summaries](./sort-2-200-downloads-files-into-folders-with-summaries.md)
- [Plan meals and track symptoms with Claude Code](./plan-meals-and-track-symptoms-with-claude-code.md)
- [Extract school dates from forwarded emails and flyers](./extract-school-dates-from-forwarded-emails-and-flyers.md)
- [Use a coding agent for everyday non-programming chores](./use-a-coding-agent-for-everyday-non-programming-chores.md)
- [Run personal assistant tasks like medical data and finance reports](./run-personal-assistant-tasks-like-medical-data-and-finance-r.md)
