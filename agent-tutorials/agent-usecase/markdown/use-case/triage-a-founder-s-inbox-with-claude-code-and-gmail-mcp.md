---
title: "Triage a founder's inbox with Claude Code and Gmail MCP"
slug: "triage-a-founder-s-inbox-with-claude-code-and-gmail-mcp"
summary: "A team connected a Gmail MCP server so Claude Code reads the inbox, labels messages and drafts replies, plus calendar prep and reports."
category: "Work & Operations"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "dev.to"
source_date: "Sep 21, 2026"
source_url: "https://dev.to/todoforai/claude-code-for-non-coders-and-non-coding-tasks-what-works-what-doesnt-and-what-to-run-for-the-3lmh"
fetched_from: "https://agentusecases.ai/use-case/triage-a-founder-s-inbox-with-claude-code-and-gmail-mcp"
---

# Triage a founder's inbox with Claude Code and Gmail MCP

> A team connected a Gmail MCP server so Claude Code reads the inbox, labels messages and drafts replies, plus calendar prep and reports.

**Category:** Work & Operations  
**Agent:** Claude Code  
**Source:** dev.to · Sep 21, 2026

## What they did

The team wired a Gmail MCP server into Claude Code, which has a shell, a file system and MCP access. It reads the founder's inbox, applies labels and drafts replies. They also set up Calendar, Slack and Notion MCP servers for a 'prep me for tomorrow' command that collects context for each meeting.

## How it went

The authors call founder inbox triage the most useful non-code job Claude Code does. They give no metrics. Each extra SaaS tool needs its own MCP server, and browser work and unattended runs have limits.

## Worth knowing

Expect an MCP tax: each tool (Gmail, Calendar, Slack, Notion) needs its own server installed and authenticated, and that setup is painful across a team. The authors also compete with Claude Code.

## Prompt

```text
Using my connected Gmail MCP server, read the last [number] emails in my inbox and label each as [e.g. Urgent, Reply, FYI, Ignore]. Draft replies for the Urgent and Reply ones in my voice, saved as drafts. Do not send or delete anything; show me a summary table of labels and drafts for approval.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Search years of research files in an Obsidian vault](./search-years-of-research-files-in-an-obsidian-vault.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Write end-of-sprint changelogs from completed tickets](./write-end-of-sprint-changelogs-from-completed-tickets.md)
- [Build a Telegram bot that sends emails and checks calendar](./build-a-telegram-bot-that-sends-emails-and-checks-calendar.md)
