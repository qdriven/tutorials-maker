---
title: "Log workouts into Notion from Telegram messages"
slug: "log-workouts-into-notion-from-telegram-messages"
summary: "A Claude agent in a Telegram chat logs workouts and daily updates into Notion from text or voice messages."
category: "Life Admin & Home"
agents:
  - name: "Claude"
    slug: "claude"
source_platform: "Reddit"
source_date: "Jul 28, 2026"
source_url: "https://www.reddit.com/r/ClaudeAI/comments/1v0h49m/how_do_you_use_claude_to_improve_your_life_with"
fetched_from: "https://agentusecases.ai/use-case/log-workouts-into-notion-from-telegram-messages"
---

# Log workouts into Notion from Telegram messages

> A Claude agent in a Telegram chat logs workouts and daily updates into Notion from text or voice messages.

**Category:** Life Admin & Home  
**Agent:** Claude  
**Source:** Reddit · Jul 28, 2026

## What they did

The setup was a Claude agent living in the creator’s Telegram chat, with Whisper added so gym voice notes could be used too. They sent messages like “did bench 4x8 at 70kg,” and the agent logged them into Notion databases for workouts, body stats, goals, and PRs; because it also knew their equipment, injuries, and schedule, it could read recent logs and suggest that day’s training when asked.

## How it went

It successfully turned quick text or voice updates into structured Notion records and used those records to recommend sessions. The post gives no performance numbers or failure cases.

## Worth knowing

The main catch is that this depended on multiple integrations: Telegram chat, Whisper for voice input, and Notion databases set up with the user’s context.

## Prompt

```text
Act as my workout logger: when I send you a message like '[example: bench 3x8 at 60kg, felt strong]', add an entry to my Notion database [database name] with the date, exercises, sets, reps, weight, and notes. If something is ambiguous, ask me one short question before saving. After each entry, reply with a one-line confirmation of what you logged.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a charting tool from blood test PDFs](./build-a-charting-tool-from-blood-test-pdfs.md)
- [Run a daily-updated local business directory autonomously](./run-a-daily-updated-local-business-directory-autonomously.md)
- [Get a second opinion on an MRI](./get-a-second-opinion-on-an-mri.md)
- [Manage calendar and tasks by text with an assistant](./manage-calendar-and-tasks-by-text-with-an-assistant.md)
- [Maintain a home media library and handle personal projects](./maintain-a-home-media-library-and-handle-personal-projects.md)
