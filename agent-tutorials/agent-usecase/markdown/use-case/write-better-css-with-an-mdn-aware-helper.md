---
title: "Write better CSS with an MDN-aware helper"
slug: "write-better-css-with-an-mdn-aware-helper"
summary: "An MCP server that consults MDN docs, reports browser compatibility, and analyzes your CSS for the agent. · Oct 9, 2025"
category: "Software & DevOps"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_url: "https://github.com/stolinski/css-mcp"
fetched_from: "https://agentusecases.ai/use-case/write-better-css-with-an-mdn-aware-helper"
---

# Write better CSS with an MDN-aware helper

> An MCP server that consults MDN docs, reports browser compatibility, and analyzes your CSS for the agent. · Oct 9, 2025

**Category:** Software & DevOps  
**Agent:** Claude Code

## What they did

You add the server to Claude Code, VS Code or another MCP client with an npx command. The agent can then call tools to fetch MDN docs for a CSS feature, pull browser compatibility data, and analyze pasted CSS or a project's built CSS files. Analysis returns a short summary by default, and you ask in plain language.

## How it went

The README gives no real-world results. It lists first fetches at about 400-500ms and cached ones at about 100ms. Summary analysis costs roughly 1-2k tokens.

## Worth knowing

Full 150+ metric analysis uses about 10k+ tokens, so keep the default summary mode. It needs Node 20+ and native build tools for the SQLite cache.

## Prompt

```text
Review the CSS in [path to stylesheet or project] and check each questionable property or feature against MDN docs for browser support in [browsers, e.g. the last 2 versions of Safari and Chrome]. Fix issues you find, like unsupported properties or redundant rules, and explain each change. Finish with a short compatibility report listing what's safe to ship and what needs a fallback.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Search years of research files in an Obsidian vault](./search-years-of-research-files-in-an-obsidian-vault.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a budgeting app from a single prompt](./build-a-budgeting-app-from-a-single-prompt.md)
- [Find bugs with property-testing agent swarms](./find-bugs-with-property-testing-agent-swarms.md)
