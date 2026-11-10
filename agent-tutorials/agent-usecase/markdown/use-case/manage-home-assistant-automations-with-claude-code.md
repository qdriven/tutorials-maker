---
title: "Manage Home Assistant automations with Claude Code"
slug: "manage-home-assistant-automations-with-claude-code"
summary: "Adam uses Claude Code via an MCP server to search entities, read automation traces and build and debug automations like a shed motion light."
category: "Life Admin & Home"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "blog.beguelin.com"
source_date: "Undated"
source_url: "https://blog.beguelin.com/2026/04/claude-code-home-assistant/"
fetched_from: "https://agentusecases.ai/use-case/manage-home-assistant-automations-with-claude-code"
---

# Manage Home Assistant automations with Claude Code

> Adam uses Claude Code via an MCP server to search entities, read automation traces and build and debug automations like a shed motion light.

**Category:** Life Admin & Home  
**Agent:** Claude Code  
**Source:** blog.beguelin.com · Undated

## What they did

Adam keeps his Home Assistant automations as YAML files in a git repo. Claude Code reaches HA through an MCP server to search entities, read traces and reload configs. For each change it edits the file, copies it to HA with scp, reloads automations and commits. For the shed motion light, it first planned: it read his existing motion automations, checked for conflicts and asked clarifying questions.

## How it went

A noisy camera automation was traced to home-to-home GPS updates and fixed in under two minutes. A brightness tweak took four messages. The shed light automation snapshots each light's state, so lights that were already on stay on.

## Worth knowing

He wrote project skills files covering his conventions and known device quirks, which Claude loads automatically. This helps it match existing patterns.

## Prompt

```text
Connect to my Home Assistant instance at [URL] through an MCP server using the access token I'll provide. Search my entities for [room or device type], then help me build an automation that [describe trigger and action, e.g. turns on the shed light when motion is detected after dark]. Show me the automation before you save it, and if something misbehaves, read the trace and explain what went wrong. Stop when the automation runs correctly in a test.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Search years of research files in an Obsidian vault](./search-years-of-research-files-in-an-obsidian-vault.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Run a personal doorman agent on a $7 VPS](./run-a-personal-doorman-agent-on-a-7-vps.md)
- [Automate simple Discord tasks and tutoring with Hermes](./automate-simple-discord-tasks-and-tutoring-with-hermes.md)
- [Place library holds for books you need](./place-library-holds-for-books-you-need.md)
