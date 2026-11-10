---
title: "Build code with agents while keeping a working understanding"
slug: "build-code-with-agents-while-keeping-a-working-understanding"
summary: "A developer describes a workflow where the agent interviews them on ambiguities, makes the minor decisions, generates explainers and quizzes, and runs verifiers in the coding loop."
category: "Software & DevOps"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_platform: "HN"
source_date: "Oct 19, 2026"
source_url: "https://news.ycombinator.com/item?id=50158650"
fetched_from: "https://agentusecases.ai/use-case/build-code-with-agents-while-keeping-a-working-understanding"
---

# Build code with agents while keeping a working understanding

> A developer describes a workflow where the agent interviews them on ambiguities, makes the minor decisions, generates explainers and quizzes, and runs verifiers in the coding loop.

**Category:** Software & DevOps  
**Agent:** custom-built or unnamed agent  
**Source:** HN · Oct 19, 2026

## What they did

Before building, the agent interviews the developer on ambiguities in the spec (a /grill-me style prompt). The developer makes decisions on stack and architecture only for differentiating parts and leaves minor details and commodity subsystems like login to the agent. A skill generates interactive explainers with quizzes. Linters, type checkers, pre-commit hooks, tests, formal-method traces and a headless-browser design verifier keep the agent checking its own work.

## How it went

The developer says this keeps them out of the 2am fix-and-break loop while still building understanding. No measurements are given, and they note other engineers are split on whether understanding the code matters.

## Worth knowing

The design verifier turns spec requirements into mechanical rules checked against DOM measurements in a headless browser, which the author says was impractical before agents.

## Prompt

```text
I want to build [feature or project] in this codebase, and I want to stay able to understand everything you write. Before coding, interview me about any ambiguities in the plan, one question at a time, and make the minor decisions yourself, listing them for me. After each major piece, write a short explainer of how it works and give me a 3-question quiz on it, then run the tests or checks before moving on.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Configure a local AI lab and build a knowledge graph by chat](./configure-a-local-ai-lab-and-build-a-knowledge-graph-by-chat.md)
- [Build a Pong game and website from scratch](./build-a-pong-game-and-website-from-scratch.md)
- [Migrate a password reset flow to modern libraries](./migrate-a-password-reset-flow-to-modern-libraries.md)
- [Point a computer-using bot at any repo](./point-a-computer-using-bot-at-any-repo.md)
- [Turn Sentry bug reports into fix pull requests](./turn-sentry-bug-reports-into-fix-pull-requests.md)
