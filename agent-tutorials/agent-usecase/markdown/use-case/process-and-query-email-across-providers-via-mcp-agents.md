---
title: "Process and query email across providers via MCP agents"
slug: "process-and-query-email-across-providers-via-mcp-agents"
summary: "A developer built an email intelligence product using agents and MCP, running on open-source models, that lets LLMs query Gmail and Outlook mailboxes; in private beta."
category: "Work & Operations"
agents:
  - name: "Cursor"
    slug: "cursor"
  - name: "Codex"
    slug: "codex"
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "HN"
source_date: "Sep 17, 2026"
source_url: "https://news.ycombinator.com/item?id=49743163"
fetched_from: "https://agentusecases.ai/use-case/process-and-query-email-across-providers-via-mcp-agents"
---

# Process and query email across providers via MCP agents

> A developer built an email intelligence product using agents and MCP, running on open-source models, that lets LLMs query Gmail and Outlook mailboxes; in private beta.

**Category:** Work & Operations  
**Agent:** Cursor, Codex, Claude Code  
**Source:** HN · Sep 17, 2026

## What they did

The developer spent six months writing the codebase with help from Cursor, Codex and Claude Code. The system runs in the cloud and connects to Gmail and Outlook mailboxes. Agents powered by open-source models process email content transiently without storing it. They derive intelligence that ChatGPT, Claude and other LLMs can query through MCP. It launches first as a ChatGPT app.

## How it went

The codebase is largely done and running in private beta. Public launch is held up waiting on approvals from Google, Microsoft and OpenAI, which the author calls tedious. IMAP and other providers are planned for later.

## Worth knowing

Budget time for the provider approvals from Google, Microsoft and OpenAI; the author found them a slow, tedious gate even after the code was finished.

## Prompt

```text
Help me build a small email intelligence tool that lets an LLM query a mailbox through an MCP server. Start with [Gmail or Outlook] read-only access and add tools for [search, summarize a thread, find attachments]. Use OAuth with the minimum scopes needed. Stop when I can ask a natural-language question about my mailbox and get an answer with the source emails cited, and ask before enabling any send or delete permissions.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Handle family errands and recipe sorting with Codex](./handle-family-errands-and-recipe-sorting-with-codex.md)
- [Use a coding agent for everyday non-programming chores](./use-a-coding-agent-for-everyday-non-programming-chores.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Run a meeting assistant that handles meetings and summaries](./run-a-meeting-assistant-that-handles-meetings-and-summaries.md)
- [Turn receipts into CSV for bookkeeping](./turn-receipts-into-csv-for-bookkeeping.md)
