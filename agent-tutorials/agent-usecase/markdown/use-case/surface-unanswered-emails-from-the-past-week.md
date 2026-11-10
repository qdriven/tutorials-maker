---
title: "Surface unanswered emails from the past week"
slug: "surface-unanswered-emails-from-the-past-week"
summary: "Author had Devin build a Gmail API assistant that lists unanswered emails from the past week, since Attio lacks that tab; he wrote the auth part himself in Cursor."
category: "Work & Operations"
agents:
  - name: "Devin"
    slug: "devin"
  - name: "Cursor"
    slug: "cursor"
source_platform: "jamesin.substack.com"
source_date: "Undated"
source_url: "https://jamesin.substack.com/p/hello-world-meet-devin"
fetched_from: "https://agentusecases.ai/use-case/surface-unanswered-emails-from-the-past-week"
---

# Surface unanswered emails from the past week

> Author had Devin build a Gmail API assistant that lists unanswered emails from the past week, since Attio lacks that tab; he wrote the auth part himself in Cursor.

**Category:** Work & Operations  
**Agent:** Devin, Cursor  
**Source:** jamesin.substack.com · Undated

## What they did

The author wanted to recreate Affinity's Unanswered Emails tab using the Gmail API. Devin struggled with authentication, so he wrote that himself in Cursor. Devin then wrote a function for emails from the past week needing a reply, limited to Primary. It read the Gmail API docs in its own browser, built a front end, and deployed it. He then asked it to add Supabase storage and an Ignore action.

## How it went

It produced a working function, a front end, and a public deployment in one late-night session. It worked at human speed: the Supabase setup ran over an hour, which he says he could do in under 10 minutes.

## Worth knowing

Devin costs $500 a month and auto-hosts what it deploys. The author saw his Replit bill climb from $20 a month to $20 a week with hosted agent apps.

## Prompt

```text
Build me a small script that connects to my Gmail account through the Gmail API and lists every email from the past [number] days that I received but haven't replied to. Show each one with sender, subject, date and a link, and skip newsletters and automated mail. Walk me through the OAuth setup steps, and stop once I can run it and see a correct list; it must be read-only and never send or delete anything.
```

## Related use cases

- [Keep coding agents running autonomously for long stretches](./keep-coding-agents-running-autonomously-for-long-stretches.md)
- [Automate per-room heating control in Home Assistant](./automate-per-room-heating-control-in-home-assistant.md)
- [Turn daily X bookmarks into working tech prototypes](./turn-daily-x-bookmarks-into-working-tech-prototypes.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Grade papers and build lessons with Claude Cowork](./grade-papers-and-build-lessons-with-claude-cowork.md)
- [Summarize meetings and triage support tickets with Lindy](./summarize-meetings-and-triage-support-tickets-with-lindy.md)
