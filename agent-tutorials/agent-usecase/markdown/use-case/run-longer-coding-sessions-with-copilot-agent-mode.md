---
title: "Run longer coding sessions with Copilot Agent Mode"
slug: "run-longer-coding-sessions-with-copilot-agent-mode"
summary: "A developer moved from Copilot syntax questions to agent-mode sessions, switched to Claude Sonnet as the model, and tried building more complete things."
category: "Software & DevOps"
agents:
  - name: "GitHub Copilot"
    slug: "github-copilot"
  - name: "Claude"
    slug: "claude"
source_platform: "dev.to"
source_date: "Undated"
source_url: "https://dev.to/jonasbn/ai-agent-coding-a-recap-of-my-experience-with-copilot-agent-mode-36lg"
fetched_from: "https://agentusecases.ai/use-case/run-longer-coding-sessions-with-copilot-agent-mode"
---

# Run longer coding sessions with Copilot Agent Mode

> A developer moved from Copilot syntax questions to agent-mode sessions, switched to Claude Sonnet as the model, and tried building more complete things.

**Category:** Software & DevOps  
**Agent:** GitHub Copilot, Claude  
**Source:** dev.to · Undated

## What they did

After a GitHub tutorial attempt stalled, Jonas started a repo for a web app to track scores for his Partners board game group. He added an outline and his existing JSON data, then used VS Code agent mode with Claude Sonnet. The agent built score entry, a history table, statistics charts, avatar mood pop-ups, Danish/English support and dark mode. He made only a few manual edits.

## How it went

He got a working app, deployed on Digital Ocean App Platform. The tutorial attempt ended in a loop of the agent undoing its own changes. The hover pop-up caused similar trouble, and the repo needs cleanup of leftover agent files.

## Worth knowing

The agent often lost its link to the editor and reported its own port as in use, which cost time. Commit after each working step, which he forgot to do.

## Prompt

```text
Use agent mode with Claude Sonnet as the model to build [a small but complete feature or app, e.g. a CRUD page for X] in my project in [folder or repo]. Work in stages: first propose a plan and file list, then implement it, run the app or tests, and fix any errors you hit. Finish when the feature works end to end, and give me a summary of the files you changed and how to run it.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Evaluate hiring candidates against competency levels](./evaluate-hiring-candidates-against-competency-levels.md)
- [Enrich and store contacts in a personal CRM](./enrich-and-store-contacts-in-a-personal-crm.md)
- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Rewrite a README after a rearchitecture](./rewrite-a-readme-after-a-rearchitecture.md)
- [Run parallel local coding agent sessions](./run-parallel-local-coding-agent-sessions.md)
