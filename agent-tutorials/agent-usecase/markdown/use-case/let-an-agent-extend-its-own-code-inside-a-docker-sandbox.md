---
title: "Let an agent extend its own code inside a Docker sandbox"
slug: "let-an-agent-extend-its-own-code-inside-a-docker-sandbox"
summary: "An agent built on Claude and Agno implements capabilities in its own source code in Docker, with changes validated, committed, or rolled back; it reached 21+ capabilities."
category: "Software & DevOps"
agents:
  - name: "Claude"
    slug: "claude"
source_platform: "HN"
source_date: "Mar 10, 2026"
source_url: "https://news.ycombinator.com/item?id=47329087"
fetched_from: "https://agentusecases.ai/use-case/let-an-agent-extend-its-own-code-inside-a-docker-sandbox"
---

# Let an agent extend its own code inside a Docker sandbox

> An agent built on Claude and Agno implements capabilities in its own source code in Docker, with changes validated, committed, or rolled back; it reached 21+ capabilities.

**Category:** Software & DevOps  
**Agent:** Claude  
**Source:** HN · Mar 10, 2026

## What they did

Miguel, built on Claude and the Agno framework, runs inside Docker with the project mounted read-only and only its own code directory writable. A host-side runner snapshots git, gives the agent its source plus the next capability, then validates changes with AST, JSON schema and import checks. It commits on success and rolls back on failure.

## How it went

It finished all 10 seed capabilities, wrote its own checklist, and reached 21+ capabilities. A consolidation batch cut code by 10% and the system prompt by 63%. It still sometimes makes questionable decisions.

## Worth knowing

Each improvement batch costs roughly a few euros in Claude API calls, and the agent can exhaust its context by reading six or more of its own files before writing any code.

## Prompt

```text
Help me set up a Docker sandbox where an agent can add new capabilities to its own source code in [repo path]. Each change should run the tests, be committed if they pass, and be rolled back if they fail, with a log of what happened. Finish by having it add [first capability, e.g. a web search tool] and show me the commit and test results; pause before any change that touches files outside the sandbox.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Prospect, score leads and run outbound email sequences](./prospect-score-leads-and-run-outbound-email-sequences.md)
- [Build an anonymous wall of hopes and fears about AI](./build-an-anonymous-wall-of-hopes-and-fears-about-ai.md)
- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Build a Pong game and website from scratch](./build-a-pong-game-and-website-from-scratch.md)
- [Build a project management tool with a 24-hour agent run](./build-a-project-management-tool-with-a-24-hour-agent-run.md)
