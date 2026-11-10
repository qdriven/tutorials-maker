---
title: "Create and read issues from Claude Code via a Tangled MCP server"
slug: "create-and-read-issues-from-claude-code-via-a-tangled-mcp-se"
summary: "The author started building an MCP server so Claude Code can create and read issues on Tangled. · Oct 16, 2025"
category: "Software & DevOps"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_url: "https://nate.leaflet.pub/3m2vldeq2wk2d"
fetched_from: "https://agentusecases.ai/use-case/create-and-read-issues-from-claude-code-via-a-tangled-mcp-se"
---

# Create and read issues from Claude Code via a Tangled MCP server

> The author started building an MCP server so Claude Code can create and read issues on Tangled. · Oct 16, 2025

**Category:** Software & DevOps  
**Agent:** Claude Code

## What they did

While auditing his atproto identity visualization tool, the author wanted to do project management on code hosted at Tangled. Working with Claude, he built a Tangled MCP server and registered it in Anthropic's MCP registry. It has a connection-status resource, a branch-listing tool, and issue tools to create, update, delete and list. Repos are given as owner/repo.

## How it went

It covers only a few operations so far, but it did what he needed for creating and reading issues. Pull request support looks blocked by architectural limits, at least for mutations.

## Worth knowing

Only branches and issues are supported. The author hasn't yet confirmed whether PR mutations can be done at all. The README has usage instructions.

## Prompt

```text
Help me build an MCP server in [language] that lets you create and read issues on [issue tracker or code host, e.g. Tangled] using [API or auth method]. Start with two tools, create_issue and list_issues, and write a short README explaining how to register it with Claude Code. Finish when you can list issues from my repo [repo name], and ask me before creating any real test issue.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Search years of research files in an Obsidian vault](./search-years-of-research-files-in-an-obsidian-vault.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a budgeting app from a single prompt](./build-a-budgeting-app-from-a-single-prompt.md)
- [Find bugs with property-testing agent swarms](./find-bugs-with-property-testing-agent-swarms.md)
