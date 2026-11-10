---
title: "Pick up new bugs automatically under team rules"
slug: "pick-up-new-bugs-automatically-under-team-rules"
summary: "A prototype agent built on DeepSeek Harness that stays out of the way and only works per team rules, such as picking up new bugs. · Oct 31, 2026"
category: "Software & DevOps"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_url: "https://github.com/deepseek-ai/dsh-superagent-prototype"
fetched_from: "https://agentusecases.ai/use-case/pick-up-new-bugs-automatically-under-team-rules"
---

# Pick up new bugs automatically under team rules

> A prototype agent built on DeepSeek Harness that stays out of the way and only works per team rules, such as picking up new bugs. · Oct 31, 2026

**Category:** Software & DevOps  
**Agent:** custom-built or unnamed agent

## What they did

The agent is packaged as a bundle for DeepSeek Harness and covers one GitHub repository. It listens to GitHub and, optionally, Feishu. When an allowed person asks for work, or a team-written rule permits it, the agent opens a work item. It works in its own session and directory, then replies in the original conversation, for example with a pull request. A web panel shows what needs a person.

## How it went

The README gives no results or numbers. It calls the project research code for reference only, not production-ready, and says it may contain bugs. Some designs from the accompanying article are not implemented.

## Worth knowing

Setup has many steps, so the README has your coding agent read SETUP.md and walk you through it, asking one short question at a time.

## Prompt

```text
Watch my bug tracker at [issue tracker URL or repo] for new issues labeled [label, e.g. bug]. For each new one, follow these team rules: [your rules, e.g. only pick up bugs under medium severity, never touch the [protected folder], always open a draft pull request]. Reproduce the bug, propose a fix in a branch, and open a draft pull request linking the issue. Do not merge anything or close issues without showing me the change and getting my approval first, and stop once each new bug has a draft PR or a comment explaining why you skipped it.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a searchable map of funded companies](./build-a-searchable-map-of-funded-companies.md)
- [Review GitHub pull requests automatically](./review-github-pull-requests-automatically.md)
- [Build a multi-tenant SaaS with an agent](./build-a-multi-tenant-saas-with-an-agent.md)
- [Plan with PRDs and delegate tasks to cheaper agents](./plan-with-prds-and-delegate-tasks-to-cheaper-agents.md)
- [Review agent work plans and track user intent logs](./review-agent-work-plans-and-track-user-intent-logs.md)
