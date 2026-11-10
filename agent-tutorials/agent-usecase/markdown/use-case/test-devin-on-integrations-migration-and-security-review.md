---
title: "Test Devin on integrations, migration and security review"
slug: "test-devin-on-integrations-migration-and-security-review"
summary: "Answer.AI tried Devin on an observability integration, an nbdev migration and a vulnerability review; it found some real issues, hallucinated others, and failed the migration."
category: "Software & DevOps"
agents:
  - name: "Devin"
    slug: "devin"
  - name: "Cursor"
    slug: "cursor"
source_platform: "answer.ai"
source_date: "Jan 8, 2025"
source_url: "https://www.answer.ai/posts/2025-01-08-devin"
fetched_from: "https://agentusecases.ai/use-case/test-devin-on-integrations-migration-and-security-review"
---

# Test Devin on integrations, migration and security review

> Answer.AI tried Devin on an observability integration, an nbdev migration and a vulnerability review; it found some real issues, hallucinated others, and failed the migration.

**Category:** Software & DevOps  
**Agent:** Devin, Cursor  
**Source:** answer.ai · Jan 8, 2025

## What they did

Answer.AI gave Devin, which works through Slack in its own Docker environment with a browser, editor and shell, about 20 real tasks. These included generating and uploading synthetic data to Braintrust, migrating a Python project to nbdev, and a security review of a repo under 700 lines. People checked the output and often took over.

## How it went

The Braintrust integration was abandoned and redone in Cursor. The nbdev migration failed on basic setup. The security review found some real issues but also false positives and hallucinated ones. Overall 14 failures, 3 successes and 3 inconclusive.

## Worth knowing

Devin pressed on with impossible tasks for days. The authors suggest a single focused LLM call for something like a small-repo security review.

## Prompt

```text
Take on three tasks in my repo [repo name]: add an integration with [observability tool], migrate [a module or tool] to [target tool or version], and review the code for security vulnerabilities. For each one, tell me how you verified your results, and clearly mark any finding you could not confirm. Open separate pull requests for the work and do not merge anything.
```

## Related use cases

- [Keep coding agents running autonomously for long stretches](./keep-coding-agents-running-autonomously-for-long-stretches.md)
- [Automate per-room heating control in Home Assistant](./automate-per-room-heating-control-in-home-assistant.md)
- [Turn daily X bookmarks into working tech prototypes](./turn-daily-x-bookmarks-into-working-tech-prototypes.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a full CRM with email, video and calendar](./build-a-full-crm-with-email-video-and-calendar.md)
- [Build client prototypes via team chat agent](./build-client-prototypes-via-team-chat-agent.md)
