---
title: "Track food and symptoms in a health log via Telegram"
slug: "track-food-and-symptoms-in-a-health-log-via-telegram"
summary: "An OpenClaw agent logs meals and symptoms from Telegram messages into a markdown file, sends reminders, and runs a weekly pattern analysis; this is a tutorial-style setup."
category: "Life Admin & Home"
agents:
  - name: "OpenClaw"
    slug: "openclaw"
source_platform: "datacamp.com"
source_date: "Undated"
source_url: "https://www.datacamp.com/blog/openclaw-projects"
fetched_from: "https://agentusecases.ai/use-case/track-food-and-symptoms-in-a-health-log-via-telegram"
---

# Track food and symptoms in a health log via Telegram

> An OpenClaw agent logs meals and symptoms from Telegram messages into a markdown file, sends reminders, and runs a weekly pattern analysis; this is a tutorial-style setup.

**Category:** Life Admin & Home  
**Agent:** OpenClaw  
**Source:** datacamp.com · Undated

## What they did

You message a Telegram topic with what you ate or how you feel. The agent appends a timestamped entry to a markdown health log in its memory folder. Cron reminders go out at 8 AM, 1 PM and 7 PM. Every Sunday it analyzes the week's log and posts the patterns it finds back to the same topic. It needs no skills, only a prompt and a cron job.

## How it went

The article gives no measured results. It describes the kind of pattern the analysis should catch, such as dairy followed by headaches three Wednesdays running. It calls this the lowest-effort project on its list.

## Worth knowing

The article says setup takes under an hour if OpenClaw is already running. It also advises binding OpenClaw to 127.0.0.1 first, because the default exposes it on every network interface.

## Prompt

```text
Set up a health log I can use through Telegram. When I message what I ate or any symptoms, add a timestamped entry to a markdown file, remind me at [times] to log, and every [Sunday] send me a summary of patterns between foods and symptoms. Finish by logging a test entry and showing me the file. Treat the summary as observations only, not medical advice.
```

## Related use cases

- [Manage 18 agents from a Notion workspace](./manage-18-agents-from-a-notion-workspace.md)
- [Draft and publish blog posts with an SEO-aware agent](./draft-and-publish-blog-posts-with-an-seo-aware-agent.md)
- [Draft messages, fill web forms and prototype sites by chat](./draft-messages-fill-web-forms-and-prototype-sites-by-chat.md)
- [Get a second opinion on an MRI](./get-a-second-opinion-on-an-mri.md)
- [Let Claude read Apple Health and Fitbit data via MCP](./let-claude-read-apple-health-and-fitbit-data-via-mcp.md)
- [Run pet relocation, Airbnb pricing, and disputes with agents](./run-pet-relocation-airbnb-pricing-and-disputes-with-agents.md)
