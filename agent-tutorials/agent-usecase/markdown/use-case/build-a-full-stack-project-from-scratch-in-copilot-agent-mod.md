---
title: "Build a full-stack project from scratch in Copilot agent mode"
slug: "build-a-full-stack-project-from-scratch-in-copilot-agent-mod"
summary: "The poster built a full-stack project with Copilot agent mode using Claude 3.7 Sonnet; it needed babysitting through setup problems but eventually produced styled, working React components."
category: "Software & DevOps"
agents:
  - name: "GitHub Copilot"
    slug: "github-copilot"
  - name: "Claude"
    slug: "claude"
source_platform: "Reddit"
source_date: "Undated"
source_url: "https://www.reddit.com/r/GithubCopilot/comments/1kl49la/what_i_learned_babysitting_llms_in_github_copilot"
fetched_from: "https://agentusecases.ai/use-case/build-a-full-stack-project-from-scratch-in-copilot-agent-mod"
---

# Build a full-stack project from scratch in Copilot agent mode

> The poster built a full-stack project with Copilot agent mode using Claude 3.7 Sonnet; it needed babysitting through setup problems but eventually produced styled, working React components.

**Category:** Software & DevOps  
**Agent:** GitHub Copilot, Claude  
**Source:** Reddit · Undated

## What they did

The poster used GitHub Copilot agent mode to build a full-stack app from scratch across React, TypeScript, Tailwind, ShadCN/UI, Python, Clojure, and PostgreSQL. Before each run they gave the agent three files: a project spec, a step-by-step task list, and a Copilot instructions file; then they babysat shell commands, corrected bad paths and Windows/Linux CLI mismatches, and kept refining the instructions between runs.

## How it went

Claude 3.7 Sonnet was the most proactive and kept trying to recover from setup errors, but all models initially failed on the React, Tailwind v4, and ShadCN setup. After a second Claude run and better instructions, the poster says they finally got fully styled, working React components.

## Worth knowing

The main catch was setup reliability: the poster says even routine install and directory steps needed repeated manual intervention and instruction-file tweaks.

## Prompt

```text
Using agent mode, build a full-stack project from scratch: [describe the app] with a [frontend, e.g. React] frontend and a [backend/database] backend. Set up the project structure, get it running locally, and create styled components for [main screens or features]. If setup hits an error, try to fix it yourself first, and stop to ask me before installing anything large or changing config outside the project folder.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Evaluate hiring candidates against competency levels](./evaluate-hiring-candidates-against-competency-levels.md)
- [Enrich and store contacts in a personal CRM](./enrich-and-store-contacts-in-a-personal-crm.md)
- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Rewrite a README after a rearchitecture](./rewrite-a-readme-after-a-rearchitecture.md)
- [Run parallel local coding agent sessions](./run-parallel-local-coding-agent-sessions.md)
