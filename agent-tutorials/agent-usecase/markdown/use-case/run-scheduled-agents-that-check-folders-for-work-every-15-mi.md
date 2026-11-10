---
title: "Run scheduled agents that check folders for work every 15 minutes"
slug: "run-scheduled-agents-that-check-folders-for-work-every-15-mi"
summary: "A commenter set up scheduled Claude tasks and another model to poll folders every 15 minutes and act on any work they find."
category: "Work & Operations"
agents:
  - name: "Claude"
    slug: "claude"
source_platform: "Reddit"
source_date: "Oct 1, 2026"
source_url: "https://www.reddit.com/r/AI_Agents/comments/1x8zcex/agents_running_24_7_on_your_laptop"
fetched_from: "https://agentusecases.ai/use-case/run-scheduled-agents-that-check-folders-for-work-every-15-mi"
---

# Run scheduled agents that check folders for work every 15 minutes

> A commenter set up scheduled Claude tasks and another model to poll folders every 15 minutes and act on any work they find.

**Category:** Work & Operations  
**Agent:** Claude  
**Source:** Reddit · Oct 1, 2026

## What they did

One commenter runs two Claude agents and two Codex agents on a Mac mini across two projects. They first use Claude to plan, write a spec and a three-column to-do list, then make Claude the architect and Codex the coder, with shared folders acting as ticket, review, and deploy queues; both models are scheduled to check those folders every 15 minutes, while the person handles outside tasks like setting up Supabase or Vercel and making decisions.

## How it went

They said they usually wake up liking the overnight output and are making better progress than before, but they still had mornings where Claude made bad design choices and needed a firm redirect.

## Worth knowing

The main catch they described is that the system still depends on human setup and intervention for accounts, reviews, and correcting design drift.

## Prompt

```text
Set up a scheduled task that runs every 15 minutes and checks [folder path] for new files. For each new file, do [action, e.g. summarize it and move it to a Done folder], and log what you did in [log file]. Do not delete anything or send messages without asking me first, and finish by showing me the log after the first run.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Track competitor prices and contacts into Google Sheets](./track-competitor-prices-and-contacts-into-google-sheets.md)
- [Run weekly marketing content in brand voice](./run-weekly-marketing-content-in-brand-voice.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Grade papers and build lessons with Claude Cowork](./grade-papers-and-build-lessons-with-claude-cowork.md)
- [Answer patient enquiries for a clinic by chat](./answer-patient-enquiries-for-a-clinic-by-chat.md)
