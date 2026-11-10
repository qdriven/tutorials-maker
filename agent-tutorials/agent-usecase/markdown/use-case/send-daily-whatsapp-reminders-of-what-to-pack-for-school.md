---
title: "Send daily WhatsApp reminders of what to pack for school"
slug: "send-daily-whatsapp-reminders-of-what-to-pack-for-school"
summary: "A commenter built a Claude Code tool that sends a WhatsApp reminder the day before about what to pack in a child's school bag."
category: "Life Admin & Home"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "Reddit"
source_date: "Sep 28, 2026"
source_url: "https://www.reddit.com/r/ClaudeAI/comments/1wrckhp/what_tool_have_you_built_for_yourself_with_claude"
fetched_from: "https://agentusecases.ai/use-case/send-daily-whatsapp-reminders-of-what-to-pack-for-school"
---

# Send daily WhatsApp reminders of what to pack for school

> A commenter built a Claude Code tool that sends a WhatsApp reminder the day before about what to pack in a child's school bag.

**Category:** Life Admin & Home  
**Agent:** Claude Code  
**Source:** Reddit · Sep 28, 2026

## What they did

In the Reddit thread, the builder says their Claude Code tool reads emails from their child’s school and other activities like swimming, music classes, and scouts. From those emails it automatically adds events to a shared calendar, sends a WhatsApp reminder the day before with what to pack in the school bag, and reports the lunch menu; the post does not describe the implementation beyond that.

## How it went

They say it saves “so much headache and head space” in the family’s daily routine and cuts down morning scrambling. No metrics, costs, or failure cases are given for this specific tool.

## Prompt

```text
Build me a small tool that sends a WhatsApp message each evening at [time] reminding me what [child's name] needs to pack for school tomorrow, based on this weekly schedule: [schedule with days, classes, sports, and special items]. Use [WhatsApp option, e.g. Twilio or WhatsApp Business API] and send a test message to me only when I approve it. You're done when the tool runs on a schedule and I've confirmed the test message arrives correctly.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Link journal entries and write book reviews in Obsidian](./link-journal-entries-and-write-book-reviews-in-obsidian.md)
- [Produce a finished music release from one chat](./produce-a-finished-music-release-from-one-chat.md)
- [Run a personal doorman agent on a $7 VPS](./run-a-personal-doorman-agent-on-a-7-vps.md)
- [Automate simple Discord tasks and tutoring with Hermes](./automate-simple-discord-tasks-and-tutoring-with-hermes.md)
- [Place library holds for books you need](./place-library-holds-for-books-you-need.md)
