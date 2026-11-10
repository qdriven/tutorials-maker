---
title: "Build an AI health coach from Apple Health data"
slug: "build-an-ai-health-coach-from-apple-health-data"
summary: "The author pipes Apple Health data (nutrition, activity, scale, blood pressure, sleep, workouts) into their own server/agent to act as a health coach."
category: "Life Admin & Home"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_platform: "Reddit"
source_date: "Sep 28, 2026"
source_url: "https://www.reddit.com/r/QuantifiedSelf/comments/1w4wszd/ai_health_coach"
fetched_from: "https://agentusecases.ai/use-case/build-an-ai-health-coach-from-apple-health-data"
---

# Build an AI health coach from Apple Health data

> The author pipes Apple Health data (nutrition, activity, scale, blood pressure, sleep, workouts) into their own server/agent to act as a health coach.

**Category:** Life Admin & Home  
**Agent:** custom-built or unnamed agent  
**Source:** Reddit · Sep 28, 2026

## What they did

The poster feeds Gemini a weekly manual upload of their personal health data into an ongoing chat that already contains background on them: food logs, steps and activity, smart scale and blood-pressure readings, sleep, workout logs, and supplements. They review the data before uploading to catch bad entries, then use the model for specific recommendations like warm-ups, workouts, cool-downs, joint-specific advice, and a nutrition plan built around foods they actually keep on hand.

## How it went

They report concrete wins: Gemini flagged very low iodine intake, they switched to iodized salt and felt better within a week, and it reorganized five weekly workouts into a PPL, Tabata, and distance-run split that made recovery easier. Limits noted in the thread: the setup is manual, and long-running chats can start forgetting earlier weeks.

## Worth knowing

The main catch is upkeep: they only upload once a week on purpose so they can manually sanity-check entries before sending them.

## Prompt

```text
Help me build a personal health coach that reads my exported Apple Health data (nutrition, activity, weight, blood pressure, sleep, workouts) from [export file or folder path]. Write a script that parses it and produces a weekly summary with trends and three suggestions for my goal of [goal]. You're done when I can run one command and get a readable report, and don't send my data to any outside service without showing me first.
```

## Related use cases

- [Get a second opinion on an MRI](./get-a-second-opinion-on-an-mri.md)
- [Sort 2,200 Downloads files into folders with summaries](./sort-2-200-downloads-files-into-folders-with-summaries.md)
- [Plan meals and track symptoms with Claude Code](./plan-meals-and-track-symptoms-with-claude-code.md)
- [Run a focus agent and Gmail agent on goals](./run-a-focus-agent-and-gmail-agent-on-goals.md)
- [Clear Gmail spam folder with a browser agent](./clear-gmail-spam-folder-with-a-browser-agent.md)
- [Move Twitter follows over to Bluesky](./move-twitter-follows-over-to-bluesky.md)
