---
title: "Add todo items to Todoist from Telegram"
slug: "add-todo-items-to-todoist-from-telegram"
summary: "A Telegram bot with an LLM and an orchestration platform (n8n or windmill) adds todos to the author's Todoist account from natural language messages."
category: "Life Admin & Home"
agents:
  - name: "n8n"
    slug: "n8n"
source_platform: "HN"
source_date: "Apr 11, 2026"
source_url: "https://news.ycombinator.com/item?id=47728484"
fetched_from: "https://agentusecases.ai/use-case/add-todo-items-to-todoist-from-telegram"
---

# Add todo items to Todoist from Telegram

> A Telegram bot with an LLM and an orchestration platform (n8n or windmill) adds todos to the author's Todoist account from natural language messages.

**Category:** Life Admin & Home  
**Agent:** n8n  
**Source:** HN · Apr 11, 2026

## What they did

The commenter uses an orchestration platform, either n8n or windmill.dev, connected to a Telegram bot. An LLM handles the natural language side, so a message sent to the bot gets turned into a todo item and added to their Todoist account. They describe it as a more controlled alternative to OpenClaw.

## How it went

The commenter says they do this themselves and that it covers the use case of adding home todos from elsewhere. The comment gives no numbers, setup steps, or limitations.

## Worth knowing

The comment is brief and gives no workflow details, so expect to design the Telegram trigger, LLM step, and Todoist action yourself in n8n or windmill.

## Prompt

```text
Build a workflow where I message a Telegram bot like 'remind me to [task] by [day]' and it adds a task to my Todoist with the right title and due date. Use an LLM step to parse the message. Finished means a test message creates a correct task in my [Todoist project], and the bot replies to confirm what it added.
```

## Related use cases

- [Draft email replies and LinkedIn posts with n8n workflows](./draft-email-replies-and-linkedin-posts-with-n8n-workflows.md)
- [Run 24/7 WhatsApp support and track application status](./run-24-7-whatsapp-support-and-track-application-status.md)
- [Automate client onboarding and schedule PDFs](./automate-client-onboarding-and-schedule-pdfs.md)
- [Get a second opinion on an MRI](./get-a-second-opinion-on-an-mri.md)
- [Automate simple Discord tasks and tutoring with Hermes](./automate-simple-discord-tasks-and-tutoring-with-hermes.md)
- [Control your Mac by voice with a Claude-backed assistant](./control-your-mac-by-voice-with-a-claude-backed-assistant.md)
