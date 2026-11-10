---
title: "Delegate web research from Claude Code to Comet"
slug: "delegate-web-research-from-claude-code-to-comet"
summary: "An MCP server lets Claude Code hand web navigation, login-walled pages and research to Comet while it keeps coding, then returns results."
category: "Software & DevOps"
agents:
  - name: "Claude Code"
    slug: "claude-code"
  - name: "Perplexity Comet"
    slug: "perplexity-comet"
source_platform: "github.com"
source_date: "Undated"
source_url: "https://github.com/hanzili/comet-mcp"
fetched_from: "https://agentusecases.ai/use-case/delegate-web-research-from-claude-code-to-comet"
---

# Delegate web research from Claude Code to Comet

> An MCP server lets Claude Code hand web navigation, login-walled pages and research to Comet while it keeps coding, then returns results.

**Category:** Software & DevOps  
**Agent:** Claude Code, Perplexity Comet  
**Source:** github.com · Undated

## What they did

You add the comet-mcp server to Claude Code's MCP config and install the Perplexity Comet browser. The server launches Comet with remote debugging and talks to it over CDP. Claude sends high-level goals such as researching a topic or logging into GitHub. Comet does the clicks, scrolling and searching, and Claude polls progress and gets the results back.

## How it went

The source gives no benchmarks or measured results. It shows a demo of research and login-flow delegation, and it presents the approach as keeping Claude's context focused on coding.

## Worth knowing

Needs Node 18+ and Comet installed. On WSL2 you must enable mirrored networking, and port 9222 has to be free.

## Prompt

```text
Help me set up an MCP server so that you can hand web research and browsing tasks to Perplexity Comet while you keep working on [my project] in [repo path]. Walk me through installing and configuring it, then test it by asking Comet to look up [a documentation page or question] and return a short summary. Tell me before you install anything or change my config files.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Compose and produce music through conversation](./compose-and-produce-music-through-conversation.md)
- [Run nightly briefing pipelines with scheduled tasks](./run-nightly-briefing-pipelines-with-scheduled-tasks.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a budgeting app from a single prompt](./build-a-budgeting-app-from-a-single-prompt.md)
- [Point a computer-using bot at any repo](./point-a-computer-using-bot-at-any-repo.md)
