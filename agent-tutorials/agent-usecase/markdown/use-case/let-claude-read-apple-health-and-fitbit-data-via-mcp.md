---
title: "Let Claude read Apple Health and Fitbit data via MCP"
slug: "let-claude-read-apple-health-and-fitbit-data-via-mcp"
summary: "The poster built a setup that lets Claude read Apple Health and Fitbit data and log workouts and meals through MCP."
category: "Life Admin & Home"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "Reddit"
source_date: "Undated"
source_url: "https://www.reddit.com/r/ClaudeHomies/comments/1uiey1q/if_you_want_claude_to_actually_read_your_apple"
fetched_from: "https://agentusecases.ai/use-case/let-claude-read-apple-health-and-fitbit-data-via-mcp"
---

# Let Claude read Apple Health and Fitbit data via MCP

> The poster built a setup that lets Claude read Apple Health and Fitbit data and log workouts and meals through MCP.

**Category:** Life Admin & Home  
**Agent:** Claude Code  
**Source:** Reddit · Undated

## What they did

The poster used a hosted MCP connector instead of a self-hosted server. They connected their devices once on the web, then in Claude went to Settings, Connectors, Add custom connector, pasted the connector URL, authorized it, and Claude could then read Apple Health or Fitbit data to answer questions like weekly training or last month’s sleep; the URL itself was left in a comment.

## How it went

It let Claude use the poster’s real health data and sometimes return interactive charts instead of only text. The poster says it was free and early, was built by one person, and they were explicitly looking for reports on where it breaks.

## Worth knowing

The main catch is that this was an early free service from a solo builder, and the post points readers to a comment for the connector URL and tool catalog.

## Prompt

```text
Help me set up an MCP server so you can read my [Apple Health / Fitbit] data and log workouts and meals. Walk me through the setup, then pull my last [30] days of [sleep, steps, and workouts] and summarize any trends. Before you write or log anything to my health data, show me exactly what you are about to add and wait for my approval.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Link journal entries and write book reviews in Obsidian](./link-journal-entries-and-write-book-reviews-in-obsidian.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Run a personal doorman agent on a $7 VPS](./run-a-personal-doorman-agent-on-a-7-vps.md)
- [Automate simple Discord tasks and tutoring with Hermes](./automate-simple-discord-tasks-and-tutoring-with-hermes.md)
- [Place library holds for books you need](./place-library-holds-for-books-you-need.md)
