---
title: "Migrate 180 microservices to a new framework version"
slug: "migrate-180-microservices-to-a-new-framework-version"
summary: "Brex built Cursor-based self-correcting agents that let one engineer migrate 180 microservices to a newer Micronaut version in about a month."
category: "Software & DevOps"
agents:
  - name: "Cursor"
    slug: "cursor"
source_platform: "brex.com"
source_date: "Undated"
source_url: "https://www.brex.com/journal/agent-automations-for-big-migrations"
fetched_from: "https://agentusecases.ai/use-case/migrate-180-microservices-to-a-new-framework-version"
---

# Migrate 180 microservices to a new framework version

> Brex built Cursor-based self-correcting agents that let one engineer migrate 180 microservices to a newer Micronaut version in about a month.

**Category:** Software & DevOps  
**Agent:** Cursor  
**Source:** brex.com · Undated

## What they did

Brex split the work between two self-hosted Cursor agents. Creating a Linear ticket triggers a generation agent. It combines scripts with LLM reasoning, builds locally, self-corrects, and opens a draft PR. A GitHub label then triggers a validation agent. It deploys to dev, runs integration tests, and patches failures up to three times. Both agents load eleven small skills, one per failure type.

## How it went

One engineer migrated 180 microservices in a month, which Brex puts at 32x per person. Cost per service fell about 90%. A few PRs passed all tests but still caused subtle production bugs.

## Worth knowing

A single giant prompt run from laptops failed. Cloud-hosted agents, modular skills and a three-attempt cap fixed that. Human review was still required, and weak test coverage let bugs through.

## Prompt

```text
Write a self-correcting migration agent that updates [list of services/repos] from [old framework version] to [new framework version], running build and tests after each change and fixing failures automatically. Have it report progress per service and pause before opening any pull requests for my review.
```

## Related use cases

- [Keep coding agents running autonomously for long stretches](./keep-coding-agents-running-autonomously-for-long-stretches.md)
- [Draft articles quoting Kindle highlights and notes](./draft-articles-quoting-kindle-highlights-and-notes.md)
- [Queue maintenance and bug fixes for Cursor background agents](./queue-maintenance-and-bug-fixes-for-cursor-background-agents.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build and deploy an app over a weekend](./build-and-deploy-an-app-over-a-weekend.md)
- [Build an anonymous wall of hopes and fears about AI](./build-an-anonymous-wall-of-hopes-and-fears-about-ai.md)
