---
title: "Investigate and unblock stuck task cards"
slug: "investigate-and-unblock-stuck-task-cards"
summary: "Hermes monitors blocked cards, investigates causes, tries to resolve them and reports in Discord; another user had it fix failed Home Assistant logins after a move."
category: "Work & Operations"
agents:
  - name: "Hermes Agent"
    slug: "hermes-agent"
source_platform: "Reddit"
source_date: "Sep 1, 2026"
source_url: "https://www.reddit.com/r/hermesagent/comments/1w0mblq/what_have_you_done_with_hermes_agent_this_week"
fetched_from: "https://agentusecases.ai/use-case/investigate-and-unblock-stuck-task-cards"
---

# Investigate and unblock stuck task cards

> Hermes monitors blocked cards, investigates causes, tries to resolve them and reports in Discord; another user had it fix failed Home Assistant logins after a move.

**Category:** Work & Operations  
**Agent:** Hermes Agent  
**Source:** Reddit · Sep 1, 2026

## What they did

One user had Hermes create a “Kanban watchdog” cron that checks for blocked cards every five minutes. When it finds one, Hermes investigates why the card is blocked, tries to clear the blocker itself, and sends the outcome to Discord; the person only steps in when it needs access or other human input.

## How it went

The user said it has worked well so far, with far fewer blocked tasks waiting by morning. It still escalates cases Hermes cannot resolve on its own, such as missing permissions.

## Worth knowing

The concrete setup detail to copy is the 5-minute cron plus Discord reporting; the main catch mentioned was that unresolved access issues still need a human.

## Prompt

```text
Watch my [project board tool] for cards marked blocked. For each one, investigate why it's stuck by checking [relevant systems, logs, or services], try to fix it if the fix is safe, and post a short report in [Discord channel] saying what you found and what you did. Ask me before you change any settings, delete anything, or run a fix that can't be undone. Finish each card with either a resolved note or a clear explanation of what you need from me.
```

## Related use cases

- [Set up a home chat server and manage accounts from your phone](./set-up-a-home-chat-server-and-manage-accounts-from-your-phon.md)
- [Create a full music video with lyrics, music and visuals](./create-a-full-music-video-with-lyrics-music-and-visuals.md)
- [Give an agent a phone number to make and answer calls](./give-an-agent-a-phone-number-to-make-and-answer-calls.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Pull invoices from Gmail and organize them](./pull-invoices-from-gmail-and-organize-them.md)
- [Automate email replies, form data extraction, and lead notes](./automate-email-replies-form-data-extraction-and-lead-notes.md)
