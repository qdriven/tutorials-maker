---
title: "Find errors in production agent traces"
slug: "find-errors-in-production-agent-traces"
summary: "Laminar's flow-1 model reads agent traces to catch implicit failures like wrong clicks or wrong citations, so every production trace can be analyzed without sampling."
category: "Software & DevOps"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_platform: "HN"
source_date: "Oct 19, 2026"
source_url: "https://news.ycombinator.com/item?id=50154029"
fetched_from: "https://agentusecases.ai/use-case/find-errors-in-production-agent-traces"
---

# Find errors in production agent traces

> Laminar's flow-1 model reads agent traces to catch implicit failures like wrong clicks or wrong citations, so every production trace can be analyzed without sampling.

**Category:** Software & DevOps  
**Agent:** custom-built or unnamed agent  
**Source:** HN · Oct 19, 2026

## What they did

flow-1, a small open-source model fine-tuned and then trained with RL on synthetic investigations, runs inside a harness called Signals. It treats a trace like a repo with each span as a file, starts from a compressed trace plus a user prompt, greps spans, reads relevant ones in full, and returns findings as JSON in a user-defined schema.

## How it went

Laminar says it matches GPT-6-sol in detection quality on its own benchmark at 23x lower cost, making analysis of every trace affordable. Similar findings are clustered, though the benchmark is the vendor's own.

## Worth knowing

Signals accepts general prompts, such as checking whether a browser agent completed a checkout, and clusters of failures can seed eval datasets for fixing them. Laminar is Apache 2.0 and self-hostable.

## Prompt

```text
I have a folder of exported traces from my AI agent at [path to trace files]. Read through every trace and flag the ones with silent failures, such as wrong clicks, wrong citations, skipped steps, or answers that don't match the tool output. Finish with a table listing the trace ID, the failure type, and a one-line explanation for each flagged trace, plus a count of the most common failure patterns.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Configure a local AI lab and build a knowledge graph by chat](./configure-a-local-ai-lab-and-build-a-knowledge-graph-by-chat.md)
- [Build a Pong game and website from scratch](./build-a-pong-game-and-website-from-scratch.md)
- [Migrate a password reset flow to modern libraries](./migrate-a-password-reset-flow-to-modern-libraries.md)
- [Point a computer-using bot at any repo](./point-a-computer-using-bot-at-any-repo.md)
- [Turn Sentry bug reports into fix pull requests](./turn-sentry-bug-reports-into-fix-pull-requests.md)
