---
title: "Find bugs with property-testing agent swarms"
slug: "find-bugs-with-property-testing-agent-swarms"
summary: "Agent swarms doing property testing found about 30 bugs in the author's work code, then ~100 bugs across open-source projects like uv, with many fixes merged."
category: "Software & DevOps"
agents:
  - name: "Codex"
    slug: "codex"
source_platform: "Bluesky"
source_date: "Oct 14, 2026"
source_url: "https://bsky.app/profile/hikikomorphism.bsky.social/post/3mxu3rxrroc2x"
fetched_from: "https://agentusecases.ai/use-case/find-bugs-with-property-testing-agent-swarms"
---

# Find bugs with property-testing agent swarms

> Agent swarms doing property testing found about 30 bugs in the author's work code, then ~100 bugs across open-source projects like uv, with many fixes merged.

**Category:** Software & DevOps  
**Agent:** Codex  
**Source:** Bluesky · Oct 14, 2026

## What they did

The author gave a side-project talk at work on property testing with agent swarms. They had found about 30 bugs in their employer's code. To write a blog post that didn't center those, they pointed the same approach at open-source projects, including uv, codex and prometheus. The post doesn't describe the mechanics.

## How it went

The author reports about 100 bugs found across the open-source projects, and says many fixes are already merged. The post gives no breakdown per project.

## Worth knowing

The post is a brief announcement. It gives no cost, setup or tooling details, so look for the author's promised blog post for the method.

## Prompt

```text
Look at [my repo or module] and write property-based tests with [Hypothesis / fast-check / the framework for my language] for its core functions, such as parsers, serializers and data transforms. Run them, and for every failing case, shrink it to a minimal reproduction and tell me whether it looks like a real bug. Stop when you hand me a list of confirmed bugs with repro steps and suggested fixes, and do not change my source code without asking.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Diagnose a killed process on a server](./diagnose-a-killed-process-on-a-server.md)
- [Spin up a second agent as an independent QA reviewer](./spin-up-a-second-agent-as-an-independent-qa-reviewer.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Migrate an Electron app from Vue 2 to Vue 3](./migrate-an-electron-app-from-vue-2-to-vue-3.md)
- [Auto-generate a searchable help video library for an app](./auto-generate-a-searchable-help-video-library-for-an-app.md)
