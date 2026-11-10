---
title: "Track training and nutrition habits with a health agent"
slug: "track-training-and-nutrition-habits-with-a-health-agent"
summary: "The poster built an agent that uses two Sheets tools to track and analyze training and nutrition, with sleep and psychological tracking planned."
category: "Life Admin & Home"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_platform: "Reddit"
source_date: "Apr 28, 2026"
source_url: "https://www.reddit.com/r/AI_Agents/comments/1t0gp2b/ai_agent_for_health_wellness"
fetched_from: "https://agentusecases.ai/use-case/track-training-and-nutrition-habits-with-a-health-agent"
---

# Track training and nutrition habits with a health agent

> The poster built an agent that uses two Sheets tools to track and analyze training and nutrition, with sleep and psychological tracking planned.

**Category:** Life Admin & Home  
**Agent:** custom-built or unnamed agent  
**Source:** Reddit · Apr 28, 2026

## What they did

The poster said they spent five months building one main agent to manage two Google Sheets-style tools: one for training and one for nutrition. The current interface is WhatsApp messages received by API, and a “get rows” step runs before the agent so data is filtered or recorded for the user who sent the message; for broader analysis, they planned an n8n AI agent node with access to the user’s vectorized data.

## How it went

It was still in development: the poster said tracking was not finished, and psychological and sleep tracking plus a combined body score were still planned. No usage numbers or measured results were given.

## Worth knowing

The main practical catch mentioned is privacy and validation: they rely on a pre-agent “get rows” filter tied to the message sender before the agent sees spreadsheet data.

## Prompt

```text
Build me a health tracking agent that reads and writes two Google Sheets: one for training ([sheet link]) and one for nutrition ([sheet link]). It should log entries from my plain-language messages, then give me a weekly analysis of trends against my goal of [goal]. Keep it structured so I can add sleep and mood tracking later, and show me any changes to the sheets' structure before applying them.
```

## Related use cases

- [Get a second opinion on an MRI](./get-a-second-opinion-on-an-mri.md)
- [Sort 2,200 Downloads files into folders with summaries](./sort-2-200-downloads-files-into-folders-with-summaries.md)
- [Plan meals and track symptoms with Claude Code](./plan-meals-and-track-symptoms-with-claude-code.md)
- [Run a focus agent and Gmail agent on goals](./run-a-focus-agent-and-gmail-agent-on-goals.md)
- [Clear Gmail spam folder with a browser agent](./clear-gmail-spam-folder-with-a-browser-agent.md)
- [Move Twitter follows over to Bluesky](./move-twitter-follows-over-to-bluesky.md)
