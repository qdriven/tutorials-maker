---
title: "Build a mental models framework with a multi-agent dev team"
slug: "build-a-mental-models-framework-with-a-multi-agent-dev-team"
summary: "A solo founder used Claude, ChatGPT, Windsurf and Cursor as role-based team members to design, test and deploy a 120-model mental-models framework and MCP server."
category: "Software & DevOps"
agents:
  - name: "Claude"
    slug: "claude"
  - name: "ChatGPT"
    slug: "chatgpt"
  - name: "Cursor"
    slug: "cursor"
source_platform: "HN"
source_date: "Nov 26, 2025"
source_url: "https://news.ycombinator.com/item?id=46061679"
fetched_from: "https://agentusecases.ai/use-case/build-a-mental-models-framework-with-a-multi-agent-dev-team"
---

# Build a mental models framework with a multi-agent dev team

> A solo founder used Claude, ChatGPT, Windsurf and Cursor as role-based team members to design, test and deploy a 120-model mental-models framework and MCP server.

**Category:** Software & DevOps  
**Agent:** Claude, ChatGPT, Cursor  
**Source:** HN · Nov 26, 2025

## What they did

A solo founder treated Claude, ChatGPT, Windsurf and Cursor as team members with defined roles, coordinated through a SITREP protocol and running four in parallel. They used the framework's own mental models to architect, validate and deploy it, with a 5-question wickedness rubric to set problem tiers. Stack: React, Cloudflare Workers, D1, TypeScript.

## How it went

The result was 120 models with a 9.2/10 quality score, 140 chaos tests all passing, and an MCP server for Claude Desktop. The whole effort took 22 months.

## Prompt

```text
Help me build a [number]-item framework of [mental models or other reference content] as structured files, plus a small MCP server that lets an AI look up entries by name or situation. Start with a data format, write [number] sample entries, then build the server and tests. Finished means I can query the server from my AI client and get a correct entry back. Ask before deploying anything publicly.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Generate a daily personalized trading research report from brokerage data](./generate-a-daily-personalized-trading-research-report-from-b.md)
- [Fill out immigration forms through a Spanish conversation](./fill-out-immigration-forms-through-a-spanish-conversation.md)
- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Migrate an Electron app from Vue 2 to Vue 3](./migrate-an-electron-app-from-vue-2-to-vue-3.md)
- [Build a dramatic digital envelope app for asking friends for money](./build-a-dramatic-digital-envelope-app-for-asking-friends-for.md)
