---
title: "Run sandboxed Claude Code fleet sharing files via MCP"
slug: "run-sandboxed-claude-code-fleet-sharing-files-via-mcp"
summary: "A developer runs a fleet of sandboxed Claude Code instances that share files through MCP tools on a virtual filesystem, with an orchestrator handling AWS storage and audit logs."
category: "Software & DevOps"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "HN"
source_date: "Sep 21, 2026"
source_url: "https://news.ycombinator.com/item?id=49782293"
fetched_from: "https://agentusecases.ai/use-case/run-sandboxed-claude-code-fleet-sharing-files-via-mcp"
---

# Run sandboxed Claude Code fleet sharing files via MCP

> A developer runs a fleet of sandboxed Claude Code instances that share files through MCP tools on a virtual filesystem, with an orchestrator handling AWS storage and audit logs.

**Category:** Software & DevOps  
**Agent:** Claude Code  
**Source:** HN · Sep 21, 2026

## What they did

The developer runs a fleet of sandboxed Claude Code instances that exchange files. Agents get MCP tools to list, upload and download from a virtual filesystem using a custom URI scheme (agentfiles://). An outer orchestrator receives those MCP requests and does the real file work on AWS, so the agents never see credentials or know AWS is involved.

## How it went

The model adapted well to the unusual filesystem, and the agents stayed fully compartmentalized. Tool request logs plus orchestrator logs give full auditing. The source gives no numbers.

## Worth knowing

Keep storage credentials in the orchestrator and expose only narrow MCP file tools, so sandboxed agents never touch the backend directly.

## Prompt

```text
Help me design a small fleet of sandboxed Claude Code instances that share files through an MCP server exposing a virtual filesystem. Build a minimal prototype with [number] agents, a shared file store backed by [local folder or S3 bucket], and an audit log of every file read and write. Stop when two agents can pass a file to each other and I can read the log, and ask before touching any cloud resources or credentials.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Link journal entries and write book reviews in Obsidian](./link-journal-entries-and-write-book-reviews-in-obsidian.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a budgeting app from a single prompt](./build-a-budgeting-app-from-a-single-prompt.md)
- [Find bugs with property-testing agent swarms](./find-bugs-with-property-testing-agent-swarms.md)
