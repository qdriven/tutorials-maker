---
title: "Auto-file issues when your agent mishandles Svelte"
slug: "auto-file-issues-when-your-agent-mishandles-svelte"
summary: "An opt-in skill lets a coding agent open an issue on the Svelte AI tools repo whenever it gets something wrong while working with Svelte. · Nov 2, 2026"
category: "Software & DevOps"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_url: "https://svelte.dev/docs/ai/skills#svelte-mcp-feedback"
fetched_from: "https://agentusecases.ai/use-case/auto-file-issues-when-your-agent-mishandles-svelte"
---

# Auto-file issues when your agent mishandles Svelte

> An opt-in skill lets a coding agent open an issue on the Svelte AI tools repo whenever it gets something wrong while working with Svelte. · Nov 2, 2026

**Category:** Software & DevOps  
**Agent:** custom-built or unnamed agent

## What they did

You install the svelte-mcp-feedback skill separately, since no plugin bundles it. After you correct a Svelte or SvelteKit mistake the agent made, it fixes the code and builds a minimal reproduction. If the Svelte MCP is available, it runs the autofixer on that reproduction. It searches existing issues, then files one in sveltejs/ai-tools with the GitHub CLI. Without the CLI, it opens a prefilled issue form for you to submit.

## How it went

The source gives no results or numbers. It says the skill ignores initial requests, unrelated bugs and personal style preferences, and files only concrete, generalizable mistakes.

## Worth knowing

It needs the GitHub CLI installed and authenticated to file automatically. Otherwise you still have to submit the prefilled form yourself.

## Prompt

```text
Create an opt-in skill for this project that triggers when you make a mistake while working with [framework or library, e.g. Svelte]. It should draft a GitHub issue for [repo URL] with what I asked for, what you did wrong, the correct approach, and a minimal code example. Always show me the draft and wait for my approval before filing anything. Done when the skill file is saved and you've demonstrated it with a sample draft.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a searchable map of funded companies](./build-a-searchable-map-of-funded-companies.md)
- [Review GitHub pull requests automatically](./review-github-pull-requests-automatically.md)
- [Build a multi-tenant SaaS with an agent](./build-a-multi-tenant-saas-with-an-agent.md)
- [Plan with PRDs and delegate tasks to cheaper agents](./plan-with-prds-and-delegate-tasks-to-cheaper-agents.md)
- [Review agent work plans and track user intent logs](./review-agent-work-plans-and-track-user-intent-logs.md)
