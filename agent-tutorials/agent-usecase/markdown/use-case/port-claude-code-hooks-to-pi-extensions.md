---
title: "Port Claude Code hooks to pi extensions"
slug: "port-claude-code-hooks-to-pi-extensions"
summary: "After leaving Claude, the author pointed an agent at their Claude hooks folder and had it rebuild them as a pi extension, which it did quickly."
category: "Software & DevOps"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "HN"
source_date: "Apr 20, 2026"
source_url: "https://news.ycombinator.com/item?id=47830898"
fetched_from: "https://agentusecases.ai/use-case/port-claude-code-hooks-to-pi-extensions"
---

# Port Claude Code hooks to pi extensions

> After leaving Claude, the author pointed an agent at their Claude hooks folder and had it rebuild them as a pi extension, which it did quickly.

**Category:** Software & DevOps  
**Agent:** Claude Code  
**Source:** HN · Apr 20, 2026

## What they did

The author had built up a collection of Claude Code hooks over several months. Unlike skills, hooks use a Claude-specific format, so they were the hardest part to migrate to pi. They pointed an agent at the Claude hooks folder and told it to make them work in pi, as a pi extension.

## How it went

According to the author, the agent did the port very quickly. The comment gives no details on how well the hooks worked afterward, or on what was checked or fixed by hand.

## Worth knowing

Hooks don't carry over between tools the way skills do, so give the agent your whole hooks folder as the reference when asking it to build the extension.

## Prompt

```text
Read the hooks in my folder [path to .claude/hooks or settings] and rebuild each one as an extension for [new agent or tool name], following its extension docs at [docs URL]. Keep the same behavior for each hook and write a short test or example run for each. Stop when every hook has an equivalent, and list any that can't be ported exactly.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Search years of research files in an Obsidian vault](./search-years-of-research-files-in-an-obsidian-vault.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a budgeting app from a single prompt](./build-a-budgeting-app-from-a-single-prompt.md)
- [Find bugs with property-testing agent swarms](./find-bugs-with-property-testing-agent-swarms.md)
