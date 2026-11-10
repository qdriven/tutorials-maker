---
title: "Control lights and fix automations in Home Assistant via OpenClaw"
slug: "control-lights-and-fix-automations-in-home-assistant-via-ope"
summary: "Dan Malone runs OpenClaw as an always-on Claude agent connected to Home Assistant through ha-mcp, controlling his lights and fixing his automations."
category: "Life Admin & Home"
agents:
  - name: "OpenClaw"
    slug: "openclaw"
source_platform: "dan-malone.com"
source_date: "Undated"
source_url: "https://www.dan-malone.com/blog/openclaw-home-assistant"
fetched_from: "https://agentusecases.ai/use-case/control-lights-and-fix-automations-in-home-assistant-via-ope"
---

# Control lights and fix automations in Home Assistant via OpenClaw

> Dan Malone runs OpenClaw as an always-on Claude agent connected to Home Assistant through ha-mcp, controlling his lights and fixing his automations.

**Category:** Life Admin & Home  
**Agent:** OpenClaw  
**Source:** dan-malone.com · Undated

## What they did

Dan runs OpenClaw in its own LXC container on his Proxmox server, next to Home Assistant, and connects it through ha-mcp. He chats with it over Telegram. When his landing motion lights failed, the agent found two dead Hue bulbs. It couldn't edit the blueprint automation, so it deleted it and rebuilt it as a native one. Dan then asked for weekend nap schedules.

## How it went

The fix took about five minutes of typing in Telegram. Dan estimates the Home Assistant UI would have taken at least an hour. The agent also updated his dashboard to show the new automation.

## Worth knowing

Costs add up on per-token API billing, because debugging automations burns a lot of context. Dan rides on his roughly $200/month Claude Max plan, and he runs the agent sandboxed in an isolated container.

## Prompt

```text
Connect to my Home Assistant at [address] and review my automations. Find any that are broken, failing or never triggering, explain what is wrong, and propose fixes. Show me each proposed change and wait for my approval before saving it, then test the ones that are fixed and report the results.
```

## Related use cases

- [Manage 18 agents from a Notion workspace](./manage-18-agents-from-a-notion-workspace.md)
- [Draft and publish blog posts with an SEO-aware agent](./draft-and-publish-blog-posts-with-an-seo-aware-agent.md)
- [Draft messages, fill web forms and prototype sites by chat](./draft-messages-fill-web-forms-and-prototype-sites-by-chat.md)
- [Get a second opinion on an MRI](./get-a-second-opinion-on-an-mri.md)
- [Let Claude read Apple Health and Fitbit data via MCP](./let-claude-read-apple-health-and-fitbit-data-via-mcp.md)
- [Run pet relocation, Airbnb pricing, and disputes with agents](./run-pet-relocation-airbnb-pricing-and-disputes-with-agents.md)
