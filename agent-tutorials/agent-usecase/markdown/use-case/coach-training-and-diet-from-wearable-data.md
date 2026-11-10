---
title: "Coach training and diet from wearable data"
slug: "coach-training-and-diet-from-wearable-data"
summary: "The poster uses Claude with Apple Health, nutrition and lifting app data, plus medication and bloodwork files, and has it maintain an HTML dashboard."
category: "Life Admin & Home"
agents:
  - name: "Claude"
    slug: "claude"
source_platform: "Reddit"
source_date: "Oct 11, 2026"
source_url: "https://www.reddit.com/r/ClaudeAI/comments/1x2c0v0/has_anyone_used_claude_as_a_training_and_diet"
fetched_from: "https://agentusecases.ai/use-case/coach-training-and-diet-from-wearable-data"
---

# Coach training and diet from wearable data

> The poster uses Claude with Apple Health, nutrition and lifting app data, plus medication and bloodwork files, and has it maintain an HTML dashboard.

**Category:** Life Admin & Home  
**Agent:** Claude  
**Source:** Reddit · Oct 11, 2026

## What they did

One commenter described a setup very close to this: Garmin data is pulled hourly into an InfluxDB on their server, and Claude Code runs there on a scheduled daily morning task. Claude reads load, stress, sleep and related metrics, calculates a training-readiness score itself, builds and adjusts the training plan, and publishes the result to a small webpage they host for phone access; they also gave it an initial full export plus years of Garmin, Strava, and .fit history for context.

## How it went

They said it keeps daily training specific enough to avoid burnout or overtraining and can notice rough periods like vacation, long work weeks, and time-zone travel. The post gives no quantified results, only that long-term history improved context for future goals.

## Worth knowing

The main catch they mention is setup: hourly polling plus a scheduled Claude Code task on your own server, with a big historical import at the start.

## Prompt

```text
I'm going to upload my [Apple Health export, nutrition log, lifting app data] plus [bloodwork or medication notes]. Analyze trends in my training, recovery and diet toward my goal of [goal], then build me an HTML dashboard I can update each week with new data. Finish with three specific changes to try this week, and flag anything that sounds like a question for my doctor rather than guessing.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a charting tool from blood test PDFs](./build-a-charting-tool-from-blood-test-pdfs.md)
- [Build an anonymous wall of hopes and fears about AI](./build-an-anonymous-wall-of-hopes-and-fears-about-ai.md)
- [Get a second opinion on an MRI](./get-a-second-opinion-on-an-mri.md)
- [Manage calendar and tasks by text with an assistant](./manage-calendar-and-tasks-by-text-with-an-assistant.md)
- [Maintain a home media library and handle personal projects](./maintain-a-home-media-library-and-handle-personal-projects.md)
