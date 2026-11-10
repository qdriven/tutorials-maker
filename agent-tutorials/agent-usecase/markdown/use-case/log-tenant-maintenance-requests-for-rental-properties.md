---
title: "Log tenant maintenance requests for rental properties"
slug: "log-tenant-maintenance-requests-for-rental-properties"
summary: "In a vendor demo, Claude Code connected to TIDY's MCP server logs maintenance requests, notifies a handyman and escalates an urgent issue."
category: "Work & Operations"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "tidy.com"
source_date: "Undated"
source_url: "https://www.tidy.com/blog/claude-code-sfr-property-management"
fetched_from: "https://agentusecases.ai/use-case/log-tenant-maintenance-requests-for-rental-properties"
---

# Log tenant maintenance requests for rental properties

> In a vendor demo, Claude Code connected to TIDY's MCP server logs maintenance requests, notifies a handyman and escalates an urgent issue.

**Category:** Work & Operations  
**Agent:** Claude Code  
**Source:** tidy.com · Undated

## What they did

The owner connects Claude Code to TIDY's MCP server with a free account and an API token. They describe a tenant's problems in plain language. Claude logs two issues at the property, notifies the handyman, and raises the disposal to urgent when asked. In the emergency example it texts the tenant shutoff steps from the saved property notes, calls a plumber, and asks the owner for a spending limit.

## How it went

The post shows scripted example conversations, not a real deployment. It reports no measured results, only the logged issues, the handyman notifications and a $500 plumber authorization.

## Worth knowing

TIDY charges a 3.9% platform fee when you book pros. The MCP server itself is free to connect, and the post's setup takes about five minutes.

## Prompt

```text
Help me set up a maintenance request flow for my rentals at [property list]. When I paste a tenant message, log it in [tool or sheet] with the unit, issue and urgency, and draft a note to [handyman name]. Treat [leaks, no heat, safety issues] as urgent and flag them. Show me any notification before it is sent. You're done when I've tested it on two sample requests.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Search years of research files in an Obsidian vault](./search-years-of-research-files-in-an-obsidian-vault.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Write end-of-sprint changelogs from completed tickets](./write-end-of-sprint-changelogs-from-completed-tickets.md)
- [Build a Telegram bot that sends emails and checks calendar](./build-a-telegram-bot-that-sends-emails-and-checks-calendar.md)
