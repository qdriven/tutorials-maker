---
title: "Run email-driven agents that pick up Redmine tasks"
slug: "run-email-driven-agents-that-pick-up-redmine-tasks"
summary: "The author built custom agents that take instructions by email, one of which picks up and completes tasks from a Redmine board using a sandbox container for development."
category: "Software & DevOps"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_platform: "HN"
source_date: "Nov 5, 2026"
source_url: "https://news.ycombinator.com/item?id=50377453"
fetched_from: "https://agentusecases.ai/use-case/run-email-driven-agents-that-pick-up-redmine-tasks"
---

# Run email-driven agents that pick up Redmine tasks

> The author built custom agents that take instructions by email, one of which picks up and completes tasks from a Redmine board using a sandbox container for development.

**Category:** Software & DevOps  
**Agent:** custom-built or unnamed agent  
**Source:** HN · Nov 5, 2026

## What they did

The author built custom agents on top of RubyLLM and mostly gives them instructions by email. One agent has access to a Redmine project board, where it picks up tasks and completes assignments. It also gets non-sudo access to a sandbox container, which it uses for development work.

## How it went

The source gives no results or numbers. It only describes the setup, running on a locally hosted Qwen model, so how well the agent completes tasks is not stated.

## Worth knowing

Giving the agent only non-sudo access to a sandbox container limits what it can change while it does development work.

## Prompt

```text
Build a workflow that triggers when I get an email at [dedicated address] from [allowed sender], reads the instructions, and creates or updates a task in [Redmine/project board] accordingly. Add a step that has an AI agent work on the task, then replies by email with a summary of what it did. Before the workflow sends any reply or changes a task, have it hold the action for my approval, and finish by showing me a test run on a sample email.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a searchable map of funded companies](./build-a-searchable-map-of-funded-companies.md)
- [Review GitHub pull requests automatically](./review-github-pull-requests-automatically.md)
- [Build a multi-tenant SaaS with an agent](./build-a-multi-tenant-saas-with-an-agent.md)
- [Plan with PRDs and delegate tasks to cheaper agents](./plan-with-prds-and-delegate-tasks-to-cheaper-agents.md)
- [Review agent work plans and track user intent logs](./review-agent-work-plans-and-track-user-intent-logs.md)
