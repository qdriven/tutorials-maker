---
title: "Build and deploy an app over a weekend"
slug: "build-and-deploy-an-app-over-a-weekend"
summary: "The author had Devin build and deploy an app, finding it quick on PR feedback but weak on legacy monorepos and costly on broad requests."
category: "Software & DevOps"
agents:
  - name: "Devin"
    slug: "devin"
source_platform: "medium.com"
source_date: "Undated"
source_url: "https://medium.com/@sambhavgaur_70582/copilot-cursor-or-devin-my-hands-on-weekend-with-ai-that-codes-and-deploys-acc708e802b3"
fetched_from: "https://agentusecases.ai/use-case/build-and-deploy-an-app-over-a-weekend"
---

# Build and deploy an app over a weekend

> The author had Devin build and deploy an app, finding it quick on PR feedback but weak on legacy monorepos and costly on broad requests.

**Category:** Software & DevOps  
**Agent:** Devin  
**Source:** medium.com · Undated

## What they did

The author subscribed to Devin's Core plan and gave it a blank GitHub repo, asking for a City Explorer dashboard showing images, weather and news for a city. Devin ran in its own cloud VM. It scaffolded a FastAPI backend and React frontend, set up .env files and routes, added placeholder integrations, tested locally, opened a PR and deployed. The author only approved or clarified one or two prompts.

## How it went

A working, deployed app took about 90 minutes from an empty repo. Devin is weaker on older monorepos and bespoke infrastructure, and broad requests burn more compute units.

## Worth knowing

Devin bills in Agent Compute Units, and idle time and thinking both use them. Keep requests narrowly scoped and kill idle sessions to hold down cost.

## Prompt

```text
Build and deploy a small app that [describe what the app does] in a new repo. Keep the scope narrow, start with the simplest working version, and tell me your plan and rough effort before you begin. Finish by giving me a live URL and a short list of what works and what doesn't. Pause and ask me before deploying or making any change that could cost money.
```

## Related use cases

- [Hand narrow code changes to Devin for pull requests](./hand-narrow-code-changes-to-devin-for-pull-requests.md)
- [Explore code to write technical documentation](./explore-code-to-write-technical-documentation.md)
- [Turn Slack feedback into PRs and debug infra](./turn-slack-feedback-into-prs-and-debug-infra.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a homepage from Figma designs via MCP](./build-a-homepage-from-figma-designs-via-mcp.md)
- [Run Codex with low-touch planning and port reservation](./run-codex-with-low-touch-planning-and-port-reservation.md)
