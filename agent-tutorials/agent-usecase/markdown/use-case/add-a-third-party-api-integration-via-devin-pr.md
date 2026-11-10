---
title: "Add a third-party API integration via Devin PR"
slug: "add-a-third-party-api-integration-via-devin-pr"
summary: "Devin opened a PR with the endpoint and backend wiring that was merged, but missed API key logic, code style and abstraction, needing review fixes."
category: "Software & DevOps"
agents:
  - name: "Devin"
    slug: "devin"
source_platform: "dev.to"
source_date: "Undated"
source_url: "https://dev.to/prpatel05/a-real-world-coding-story-devin-ai-as-my-co-pilot-548"
fetched_from: "https://agentusecases.ai/use-case/add-a-third-party-api-integration-via-devin-pr"
---

# Add a third-party API integration via Devin PR

> Devin opened a PR with the endpoint and backend wiring that was merged, but missed API key logic, code style and abstraction, needing review fixes.

**Category:** Software & DevOps  
**Agent:** Devin  
**Source:** dev.to · Undated

## What they did

The author asked Devin, through its Slack integration, to build a token-generation endpoint for a third-party service from the docs link. The prompt said to add it to an existing microservice and use the existing CDK secrets logic for the API key. Devin posted a plan, then opened a GitHub PR. The author left review comments on the PR, and Devin pushed fixes.

## How it went

After 2-3 review rounds the code was production-ready, tests passed, and the PR merged. The whole task took about an hour, against roughly 15 minutes if done by hand. The author spent about 5 minutes reviewing.

## Worth knowing

Devin left out the third-party API key in its calls and didn't put the client logic in the shared clients library, so review the PR as you would a junior's.

## Prompt

```text
In the repo [repo URL], add an integration with [third-party API] including the endpoint, backend wiring, and config for the API key via [env var or secrets approach]. Follow the existing code style and abstractions in [folder or file] and add tests. Open a pull request listing what you changed and any assumptions, and stop there without merging.
```

## Related use cases

- [Hand narrow code changes to Devin for pull requests](./hand-narrow-code-changes-to-devin-for-pull-requests.md)
- [Rewrite a README after a rearchitecture](./rewrite-a-readme-after-a-rearchitecture.md)
- [Turn Slack feedback into PRs and debug infra](./turn-slack-feedback-into-prs-and-debug-infra.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a homepage from Figma designs via MCP](./build-a-homepage-from-figma-designs-via-mcp.md)
- [Run Codex with low-touch planning and port reservation](./run-codex-with-low-touch-planning-and-port-reservation.md)
