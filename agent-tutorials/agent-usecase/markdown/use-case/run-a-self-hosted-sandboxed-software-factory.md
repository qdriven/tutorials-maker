---
title: "Run a self-hosted, sandboxed software factory"
slug: "run-a-self-hosted-sandboxed-software-factory"
summary: "One developer's build log of an almost fully self-hosted, sandboxed agentic pipeline for producing software. · Aug 21, 2026"
category: "Software & DevOps"
agents:
  - name: "Codex"
    slug: "codex"
source_url: "https://blog.jakesaunders.dev/building-an-almost-fully-self-hosted-sandboxed-agentic-software-factory/"
fetched_from: "https://agentusecases.ai/use-case/run-a-self-hosted-sandboxed-software-factory"
---

# Run a self-hosted, sandboxed software factory

> One developer's build log of an almost fully self-hosted, sandboxed agentic pipeline for producing software. · Aug 21, 2026

**Category:** Software & DevOps  
**Agent:** Codex

## What they did

The author put Hermes, an agent using Codex, on a spare eBay PC with no inbound internet access. The box ran Coolify, Forgejo, self-hosted Firecrawl and Tailscale. One prompt asked for a calorie-tracking SvelteKit app. The agent created the repo, wrote the code and tests, fixed CI failures, and deployed the app with its own Postgres.

## How it went

It reached a deployed app with no further prompts. One CSRF bug turned up on first use, and a single follow-up prompt got it diagnosed, fixed, covered by regression tests and redeployed.

## Worth knowing

The only specific ongoing cost is a £20 Codex subscription. The sandbox is not harmless: the agent can still wipe the box and misuse any keys you give it.

## Prompt

```text
Help me design a sandboxed pipeline where coding agents build [project idea] inside Docker containers with no access to my personal files or credentials. Write the container setup, a task queue folder, and a script that runs one agent on one task and saves the result as a branch. Finish when I can run one example task end to end, and show me the plan before running anything that touches the network.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Build a racing game from a single prompt](./build-a-racing-game-from-a-single-prompt.md)
- [Spin up a second agent as an independent QA reviewer](./spin-up-a-second-agent-as-an-independent-qa-reviewer.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Migrate an Electron app from Vue 2 to Vue 3](./migrate-an-electron-app-from-vue-2-to-vue-3.md)
- [Auto-generate a searchable help video library for an app](./auto-generate-a-searchable-help-video-library-for-an-app.md)
