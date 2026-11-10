---
title: "Set up a home chat server and manage accounts from your phone"
slug: "set-up-a-home-chat-server-and-manage-accounts-from-your-phon"
summary: "A Hermes agent running on a local Qwen model set up an Open WebUI server and handled account management via phone, giving the author's teen their own account."
category: "Life Admin & Home"
agents:
  - name: "Hermes Agent"
    slug: "hermes-agent"
source_platform: "HN"
source_date: "Jun 23, 2026"
source_url: "https://news.ycombinator.com/item?id=48650822"
fetched_from: "https://agentusecases.ai/use-case/set-up-a-home-chat-server-and-manage-accounts-from-your-phon"
---

# Set up a home chat server and manage accounts from your phone

> A Hermes agent running on a local Qwen model set up an Open WebUI server and handled account management via phone, giving the author's teen their own account.

**Category:** Life Admin & Home  
**Agent:** Hermes Agent  
**Source:** HN · Jun 23, 2026

## What they did

The author runs Qwen3.6-35B-A3B on a home server through llama.cpp, with Open WebUI as the chat interface. An agent powered by that same model, using Hermes agent, set up the Open WebUI server. It also handled account management, driven from the author's phone, which gave the teen a personal account on the home network.

## How it went

The teen has their own account and uses it when curious. The author finds local models capable for chat, research and troubleshooting, though still keeps a paid Anthropic subscription for now.

## Worth knowing

The author says local models suit personal use, while top hosted models still make sense for sophisticated coding agent work.

## Prompt

```text
Set up Open WebUI on my [machine, e.g. home server] connected to my local model at [model endpoint], and make it reachable on my home network at [address or port]. Create accounts for [names] and walk me through managing them from my phone. Finish by giving me the login URL and confirming each account can chat; ask me before opening ports or deleting any accounts.
```

## Related use cases

- [Configure a local AI lab and build a knowledge graph by chat](./configure-a-local-ai-lab-and-build-a-knowledge-graph-by-chat.md)
- [Produce a short-form video from research to captions](./produce-a-short-form-video-from-research-to-captions.md)
- [Debloat an Android TV](./debloat-an-android-tv.md)
- [Get a second opinion on an MRI](./get-a-second-opinion-on-an-mri.md)
- [Let Claude read Apple Health and Fitbit data via MCP](./let-claude-read-apple-health-and-fitbit-data-via-mcp.md)
- [Use a coding agent for everyday non-programming chores](./use-a-coding-agent-for-everyday-non-programming-chores.md)
