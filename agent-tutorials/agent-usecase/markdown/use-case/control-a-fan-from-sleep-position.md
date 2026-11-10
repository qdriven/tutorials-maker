---
title: "Control a fan from sleep position"
slug: "control-a-fan-from-sleep-position"
summary: "An AI roommate uses a pose model on a Raspberry Pi to watch the user sleep and presses a remote button to turn the fan on or off."
category: "Life Admin & Home"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_platform: "X"
source_date: "Feb 20, 2026"
source_url: "https://x.com/the2ndfloorguy/status/2024832757382500720"
fetched_from: "https://agentusecases.ai/use-case/control-a-fan-from-sleep-position"
---

# Control a fan from sleep position

> An AI roommate uses a pose model on a Raspberry Pi to watch the user sleep and presses a remote button to turn the fan on or off.

**Category:** Life Admin & Home  
**Agent:** custom-built or unnamed agent  
**Source:** X · Feb 20, 2026

## What they did

The setup runs a MediaPipe pose vision model on a Raspberry Pi home server that watches the sleeping person via camera. It detects real-time sleep position and sends a signal to a remote button pusher: arms or leg out triggers fan on, arms curled triggers fan off. The person defined the position rules and installed the hardware.

## How it went

The fan turns on or off automatically overnight without waking the user. Current version struggles with blankets at times.

## Worth knowing

Demo uses a stock photo; blanket detection issues are being fixed.

## Prompt

```text
Help me build a project on a [Raspberry Pi model] with a camera that detects when I'm [asleep or in a certain pose] using a pose estimation model and then triggers [fan or other device] through [remote, relay, or smart plug]. Write the code, the setup steps, and a test mode that logs detections without controlling anything. Finish when I can run the test mode and see it working, and ask before enabling real device control.
```

## Related use cases

- [Get a second opinion on an MRI](./get-a-second-opinion-on-an-mri.md)
- [Sort 2,200 Downloads files into folders with summaries](./sort-2-200-downloads-files-into-folders-with-summaries.md)
- [Plan meals and track symptoms with Claude Code](./plan-meals-and-track-symptoms-with-claude-code.md)
- [Extract school dates from forwarded emails and flyers](./extract-school-dates-from-forwarded-emails-and-flyers.md)
- [Use a coding agent for everyday non-programming chores](./use-a-coding-agent-for-everyday-non-programming-chores.md)
- [Run personal assistant tasks like medical data and finance reports](./run-personal-assistant-tasks-like-medical-data-and-finance-r.md)
