---
title: "Add home TODO items by Telegram message"
slug: "add-home-todo-items-by-telegram-message"
summary: "The author told an OpenClaw agent over Telegram to add items to a home TODO list via a custom API while at the office, before they stopped using it."
category: "Life Admin & Home"
agents:
  - name: "OpenClaw"
    slug: "openclaw"
source_platform: "HN"
source_date: "Apr 10, 2026"
source_url: "https://news.ycombinator.com/item?id=47724016"
fetched_from: "https://agentusecases.ai/use-case/add-home-todo-items-by-telegram-message"
---

# Add home TODO items by Telegram message

> The author told an OpenClaw agent over Telegram to add items to a home TODO list via a custom API while at the office, before they stopped using it.

**Category:** Life Admin & Home  
**Agent:** OpenClaw  
**Source:** HN · Apr 10, 2026

## What they did

The author ran OpenClaw and wrote a custom API that adds items to a TODO list kept only on their home PC, with no phone syncing. From the office they sent a Telegram message, and the agent called that API to add the item. The source gives no further setup detail.

## How it went

It worked well enough that the author misses it. They stopped using OpenClaw after their QEMU software broke, and are now asking how to replicate this without the setup hassle.

## Worth knowing

The author says OpenClaw was less effort than writing a tool per use case, but not worth weeks chasing a perfect setup because it isn't reliable enough.

## Prompt

```text
Connect to my Telegram so I can message you to add items to my home to-do list stored at [app, file, or API]. When I send something like 'add [chore or errand]', add it and reply with the updated list. Finished means one test item appears in the list and I can ask you to read the list back. Ask before removing any items.
```

## Related use cases

- [Manage 18 agents from a Notion workspace](./manage-18-agents-from-a-notion-workspace.md)
- [Edit video through chat with subtitles and export](./edit-video-through-chat-with-subtitles-and-export.md)
- [Draft messages, fill web forms and prototype sites by chat](./draft-messages-fill-web-forms-and-prototype-sites-by-chat.md)
- [Get a second opinion on an MRI](./get-a-second-opinion-on-an-mri.md)
- [Let Claude read Apple Health and Fitbit data via MCP](./let-claude-read-apple-health-and-fitbit-data-via-mcp.md)
- [Run pet relocation, Airbnb pricing, and disputes with agents](./run-pet-relocation-airbnb-pricing-and-disputes-with-agents.md)
