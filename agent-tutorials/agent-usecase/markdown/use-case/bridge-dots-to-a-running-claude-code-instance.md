---
title: "Bridge Dots to a running Claude Code instance"
slug: "bridge-dots-to-a-running-claude-code-instance"
summary: "The poster built a ChatGPT MCP so Dots could read and write to their running Claude Code instance in a multi-lane coding workflow, but found reliability issues."
category: "Software & DevOps"
agents:
  - name: "Dots"
    slug: "dots"
  - name: "ChatGPT"
    slug: "chatgpt"
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "Reddit"
source_date: "Oct 1, 2026"
source_url: "https://www.reddit.com/r/codex/comments/1wvmejz/do_not_upgrade_for_dots"
fetched_from: "https://agentusecases.ai/use-case/bridge-dots-to-a-running-claude-code-instance"
---

# Bridge Dots to a running Claude Code instance

> The poster built a ChatGPT MCP so Dots could read and write to their running Claude Code instance in a multi-lane coding workflow, but found reliability issues.

**Category:** Software & DevOps  
**Agent:** Dots, ChatGPT, Claude Code  
**Source:** Reddit · Oct 1, 2026

## What they did

A commenter said they were already running many orchestrator and subagent coding lanes in Claude Code desktop, then built a quick ChatGPT MCP so Dots could read from and send messages into that live Claude Code setup. They also kept Codex open and used Dots as the main long-running session that collected updates and let them talk across those lanes with less back-and-forth.

## How it went

They said it took a few hours before Dots started giving good results, and that with setup work it could become impressive. The main limitation they called out was reliability issues, plus confusion over whether Dots was actually writing versus just creating or messaging Claude Code sessions.

## Worth knowing

Their main practical warning was that Dots was bad out of the box and only became useful after a few hours of tuning.

## Prompt

```text
I want to run several coding lanes, with [another agent] handing work to this Claude Code session and reading back results. Set up a simple, reliable bridge, such as an MCP server or a shared task file, for [project folder]. Test that messages go both ways, log any failures, and show me the setup before connecting anything else.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Monitor public documents for changes affecting teaching materials](./monitor-public-documents-for-changes-affecting-teaching-mate.md)
- [Order from a restaurant menu photo with ChatGPT](./order-from-a-restaurant-menu-photo-with-chatgpt.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Review GitHub pull requests automatically](./review-github-pull-requests-automatically.md)
- [Redesign an admin feature with multiple design options](./redesign-an-admin-feature-with-multiple-design-options.md)
