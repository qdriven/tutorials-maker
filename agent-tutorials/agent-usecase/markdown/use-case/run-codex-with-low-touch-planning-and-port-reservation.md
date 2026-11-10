---
title: "Run Codex with low-touch planning and port reservation"
slug: "run-codex-with-low-touch-planning-and-port-reservation"
summary: "A commenter has Codex execute mostly on its own with human planning and review, including a portbroker that reserves and injects a port."
category: "Software & DevOps"
agents:
  - name: "Codex"
    slug: "codex"
source_platform: "Reddit"
source_date: "Undated"
source_url: "https://www.reddit.com/r/codex/comments/1ry39bx/use_chatgpt_as_your_development_and_engineering"
fetched_from: "https://agentusecases.ai/use-case/run-codex-with-low-touch-planning-and-port-reservation"
---

# Run Codex with low-touch planning and port reservation

> A commenter has Codex execute mostly on its own with human planning and review, including a portbroker that reserves and injects a port.

**Category:** Software & DevOps  
**Agent:** Codex  
**Source:** Reddit · Undated

## What they did

The commenter describes a split workflow: ChatGPT handled planning, strategy, versioning discipline, and writing the next prompt, while Codex did the implementation, with outputs manually copied back and forth between the two in extended-thinking chats. In a similar setup, another commenter added a small tool called portbroker so an agent could reserve a free port, log it, and inject it into $PORT automatically, reducing manual environment handling during parallel runs.

## How it went

They say this cut down prompt drift and made multi-agent or parallel local development more stable and predictable. The main drawback mentioned is that the handoff is still manual, with long threads causing slowdown and occasional need to start fresh sessions.

## Worth knowing

The practical catch is the copy-paste loop between ChatGPT and Codex, plus needing to reset when threads get "sludge" from growing too long.

## Prompt

```text
I've written a plan for [task] in [repo path]: [paste or point to plan file]. Carry it out mostly on your own, and before starting any dev server or test that needs a network port, pick a free port, reserve it, and pass it in through [env var or config setting] so it doesn't clash with other running jobs. When done, summarize what you changed and which checks passed so I can review, and ask me before pushing or deleting anything.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Diagnose a killed process on a server](./diagnose-a-killed-process-on-a-server.md)
- [Find bugs with property-testing agent swarms](./find-bugs-with-property-testing-agent-swarms.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Migrate an Electron app from Vue 2 to Vue 3](./migrate-an-electron-app-from-vue-2-to-vue-3.md)
- [Auto-generate a searchable help video library for an app](./auto-generate-a-searchable-help-video-library-for-an-app.md)
