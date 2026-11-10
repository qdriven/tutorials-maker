---
title: "Patch annoying software behavior by pointing an agent at it"
slug: "patch-annoying-software-behavior-by-pointing-an-agent-at-it"
summary: "Author had an agent debug a Hyper-V vmconnect fullscreen bug with a hook system, and pointed Codex at the Codex app to add features."
category: "Software & DevOps"
agents:
  - name: "Codex"
    slug: "codex"
  - name: "ChatGPT"
    slug: "chatgpt"
source_platform: "HN"
source_date: "Oct 10, 2026"
source_url: "https://news.ycombinator.com/item?id=50030987"
fetched_from: "https://agentusecases.ai/use-case/patch-annoying-software-behavior-by-pointing-an-agent-at-it"
---

# Patch annoying software behavior by pointing an agent at it

> Author had an agent debug a Hyper-V vmconnect fullscreen bug with a hook system, and pointed Codex at the Codex app to add features.

**Category:** Software & DevOps  
**Agent:** Codex, ChatGPT  
**Source:** HN · Oct 10, 2026

## What they did

The author pointed coding agents at software that annoyed them. For vmconnect.exe not going fullscreen after login, the agent debugged the problem and built a hook system that leaves Microsoft's files untouched. For the Codex Electron app, Codex was pointed at itself to build an MCP-based self-improvement setup with dynamic JS userscripts.

## How it went

Both fixes reportedly worked, though a few rounds of telling the model to do better were sometimes needed. Agents still wrote poor documentation and reports that humans could easily read.

## Prompt

```text
There is a behavior in [app or tool name] that annoys me: [describe the bug or missing feature]. Look at the source or install files at [path or repo], find where it comes from, and propose a small patch or hook to fix it. Show me the diff and explain how to test it before changing any files, and stop once the fix works and I can undo it.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Analyze budgets and research investments from bank data](./analyze-budgets-and-research-investments-from-bank-data.md)
- [Order from a restaurant menu photo with ChatGPT](./order-from-a-restaurant-menu-photo-with-chatgpt.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Click through apps to verify its own work](./click-through-apps-to-verify-its-own-work.md)
- [Build a multilingual typing app for language learning](./build-a-multilingual-typing-app-for-language-learning.md)
