---
title: "Record how you work, then automate the repetitive parts"
slug: "record-how-you-work-then-automate-the-repetitive-parts"
summary: "Screenpipe records screen and audio locally and gives agents a searchable memory to turn repeated tasks into procedures."
category: "Work & Operations"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_platform: "HN"
source_date: "Jul 23, 2026"
source_url: "https://news.ycombinator.com/item?id=49024620"
fetched_from: "https://agentusecases.ai/use-case/record-how-you-work-then-automate-the-repetitive-parts"
---

# Record how you work, then automate the repetitive parts

> Screenpipe records screen and audio locally and gives agents a searchable memory to turn repeated tasks into procedures.

**Category:** Work & Operations  
**Agent:** custom-built or unnamed agent  
**Source:** HN · Jul 23, 2026

## What they did

Screenpipe runs in the background and captures a screenshot plus the OS accessibility tree whenever something meaningful happens, such as an app switch, click, or typing pause. It falls back to OCR when needed, and transcribes audio locally. Everything goes into a local SQLite index with an authenticated API on port 3030, plus MCP and skills. An agent is then asked to find repeated work, build SOPs, or automate it.

## How it went

The source gives no results or measurements for these automations, only example prompts. It states the local models are meant to use under 1% CPU and 400 MB RAM. It is a launch post, not a case study.

## Worth knowing

Commercial use needs a paid license; personal, nonprofit, educational and research use is free. You can try it with npx screenpipe record, no account needed.

## Prompt

```text
I do this task repeatedly: [describe task and the apps involved]. Help me write it up as a clear step-by-step procedure, then build a script or reusable instruction file in [folder path] that automates it. Run it once on a safe test case, and pause before any step that sends, submits, pays, or deletes.
```

## Related use cases

- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Automate recurring work with scheduled Cowork tasks](./automate-recurring-work-with-scheduled-cowork-tasks.md)
- [Review contracts like NDAs and SaaS agreements in Claude Code](./review-contracts-like-ndas-and-saas-agreements-in-claude-cod.md)
- [Regrade assignments and update grades in Brightspace](./regrade-assignments-and-update-grades-in-brightspace.md)
- [Build a Telegram bot that sends emails and checks calendar](./build-a-telegram-bot-that-sends-emails-and-checks-calendar.md)
- [Generate recurring weekly reports combining KPIs and pull requests](./generate-recurring-weekly-reports-combining-kpis-and-pull-re.md)
