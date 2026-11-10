---
title: "Run a personal assistant over WhatsApp"
slug: "run-a-personal-assistant-over-whatsapp"
summary: "The author runs OpenClaw on a cheap VPS, messaging it over WhatsApp to manage his calendar, browse the web, answer voice notes, and log habits to a Git-tracked file."
category: "Life Admin & Home"
agents:
  - name: "OpenClaw"
    slug: "openclaw"
source_platform: "medium.com"
source_date: "Undated"
source_url: "https://medium.com/@srechakra/sda-f079871369ae"
fetched_from: "https://agentusecases.ai/use-case/run-a-personal-assistant-over-whatsapp"
---

# Run a personal assistant over WhatsApp

> The author runs OpenClaw on a cheap VPS, messaging it over WhatsApp to manage his calendar, browse the web, answer voice notes, and log habits to a Git-tracked file.

**Category:** Life Admin & Home  
**Agent:** OpenClaw  
**Source:** medium.com · Undated

## What they did

OpenClaw runs in Docker on a $5/month VPS, with headless Chromium for browsing and the gateway reachable only through an SSH tunnel. The author messages it on WhatsApp. It manages Google Calendar and Gmail through the gog CLI, logs habits to markdown files, and turns voice notes into filed action items using Gemini. It commits notes to a private GitHub repo. Family members are routed to a separate agent.

## How it went

He dropped paid Notion, Todoist and a habit tracker, and the agent also made phone calls and reservations from its own $5 eSIM number. The source gives no accuracy or reliability measurements.

## Worth knowing

OpenClaw rewrites its config on startup and strips the WhatsApp allowlist, so he added a golden-config restore and a watchdog. Chromium in Docker also needs 2GB of shared memory.

## Prompt

```text
Set up a personal assistant I can message over [WhatsApp/Telegram] that can check and edit my calendar at [calendar service], browse the web, transcribe voice notes, and log daily habits ([list habits]) to a text file in a Git repo at [path]. Walk me through setup on my [VPS/computer], then test it by having me send one message of each type. Setup is done when each of those tests works; ask before it sends any message to anyone besides me or changes any calendar events.
```

## Related use cases

- [Manage 18 agents from a Notion workspace](./manage-18-agents-from-a-notion-workspace.md)
- [Draft and publish blog posts with an SEO-aware agent](./draft-and-publish-blog-posts-with-an-seo-aware-agent.md)
- [Track sleep, notes, code and earthquakes with a personal agent](./track-sleep-notes-code-and-earthquakes-with-a-personal-agent.md)
- [Get a second opinion on an MRI](./get-a-second-opinion-on-an-mri.md)
- [Let Claude read Apple Health and Fitbit data via MCP](./let-claude-read-apple-health-and-fitbit-data-via-mcp.md)
- [Run pet relocation, Airbnb pricing, and disputes with agents](./run-pet-relocation-airbnb-pricing-and-disputes-with-agents.md)
