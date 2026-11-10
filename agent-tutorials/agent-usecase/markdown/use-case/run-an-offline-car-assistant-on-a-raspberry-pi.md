---
title: "Run an offline car assistant on a Raspberry Pi"
slug: "run-an-offline-car-assistant-on-a-raspberry-pi"
summary: "A local Qwen model on a Pi reads car OBD data and the manual to answer car questions, controls AC and locks via cloud, and alerts other agents to a breakdown so they can look up train tickets. · Aug 25, 2026"
category: "Life Admin & Home"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_url: "https://github.com/ThinkOffApp/CarWatch"
fetched_from: "https://agentusecases.ai/use-case/run-an-offline-car-assistant-on-a-raspberry-pi"
---

# Run an offline car assistant on a Raspberry Pi

> A local Qwen model on a Pi reads car OBD data and the manual to answer car questions, controls AC and locks via cloud, and alerts other agents to a breakdown so they can look up train tickets. · Aug 25, 2026

**Category:** Life Admin & Home  
**Agent:** custom-built or unnamed agent

## What they did

A Raspberry Pi 5 (16 GB) rides in the car and runs a local Qwen3.6-35B model through llama.cpp. It reads live OBD data over a Bluetooth ELM327 adapter and answers voice questions from the 489-page owner's manual, with page citations. It posts to a chat room as an agent. The repo says cloud lock and window commands work through Home Assistant, and that precondition (AC) is only the next planned command.

## How it went

The model runs at about 3.5 tokens/s generation, and the voice, manual and OBD loops are marked proven on a real car. The README does not mention train tickets. Preconditioning and agent-to-agent cases are listed as enabled, not demonstrated.

## Worth knowing

Loading the 14 GB model from microSD takes about three minutes, and generation is slow. Smaller models run faster on the Pi but suit simple questions better.

## Prompt

```text
Help me build an offline car assistant on a [Raspberry Pi model] using a local model. It should read OBD data from my [car make/model/year] through a [OBD adapter type] and answer questions using the owner's manual PDF at [path]. Finish with a working script I can run and a test question answered from live or sample data; pause before sending any commands that change car settings, such as locks or AC.
```

## Related use cases

- [Get a second opinion on an MRI](./get-a-second-opinion-on-an-mri.md)
- [Manage an inbox and build courses and budgets with Claude Code](./manage-an-inbox-and-build-courses-and-budgets-with-claude-co.md)
- [Let Claude read Apple Health and Fitbit data via MCP](./let-claude-read-apple-health-and-fitbit-data-via-mcp.md)
- [Extract school dates from forwarded emails and flyers](./extract-school-dates-from-forwarded-emails-and-flyers.md)
- [Use a coding agent for everyday non-programming chores](./use-a-coding-agent-for-everyday-non-programming-chores.md)
- [Run personal assistant tasks like medical data and finance reports](./run-personal-assistant-tasks-like-medical-data-and-finance-r.md)
