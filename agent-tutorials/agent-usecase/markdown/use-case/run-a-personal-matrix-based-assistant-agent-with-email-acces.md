---
title: "Run a personal Matrix-based assistant agent with email access"
slug: "run-a-personal-matrix-based-assistant-agent-with-email-acces"
summary: "The author built a small Claw-like agent loop on Kimi and GLM5 that reads email read-only, messages via a self-hosted Matrix server, keeps memory files, and handles reminders and tasks."
category: "Life Admin & Home"
agents:
  - name: "OpenClaw"
    slug: "openclaw"
source_platform: "HN"
source_date: "Oct 8, 2026"
source_url: "https://news.ycombinator.com/item?id=50003674"
fetched_from: "https://agentusecases.ai/use-case/run-a-personal-matrix-based-assistant-agent-with-email-acces"
---

# Run a personal Matrix-based assistant agent with email access

> The author built a small Claw-like agent loop on Kimi and GLM5 that reads email read-only, messages via a self-hosted Matrix server, keeps memory files, and handles reminders and tasks.

**Category:** Life Admin & Home  
**Agent:** OpenClaw  
**Source:** HN · Oct 8, 2026

## What they did

The author had Kimi set up a local Matrix server and write a small Claw-like loop. Tools run in bubblewrap sandboxing, with identity, soul and memory files. Email is read-only because the agent has tools for read operations but never sees credentials. New Matrix messages are injected to start turns, and a heartbeat consolidates memory, advances tasks and handles reminders.

## How it went

The source gives no metrics. It reports the setup working with a mix of Kimi and GLM5, reachable from a phone, a web app, and Claude, Codex or Kimi CLI through a small MCP wrapper. Code may be released later.

## Worth knowing

Bubblewrap isn't enough against untrusted data, and the agents still have web access, so the author plans to move it into a VM and warns to be careful.

## Prompt

```text
Set me up as a personal assistant that I can message through [Matrix or my chat app]. Give it read-only access to my email at [email provider], memory files for my preferences and ongoing tasks, and the ability to set reminders. When it's working, send me a test message summarizing my unread email from today, and ask me before taking any action beyond reading and reminding.
```

## Related use cases

- [Manage 18 agents from a Notion workspace](./manage-18-agents-from-a-notion-workspace.md)
- [Draft and publish blog posts with an SEO-aware agent](./draft-and-publish-blog-posts-with-an-seo-aware-agent.md)
- [Draft messages, fill web forms and prototype sites by chat](./draft-messages-fill-web-forms-and-prototype-sites-by-chat.md)
- [Get a second opinion on an MRI](./get-a-second-opinion-on-an-mri.md)
- [Let Claude read Apple Health and Fitbit data via MCP](./let-claude-read-apple-health-and-fitbit-data-via-mcp.md)
- [Run pet relocation, Airbnb pricing, and disputes with agents](./run-pet-relocation-airbnb-pricing-and-disputes-with-agents.md)
