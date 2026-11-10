---
title: "Build a deals page step by step with Devin"
slug: "build-a-deals-page-step-by-step-with-devin"
summary: "An engineer had Devin implement a deals page in steps; it opened a PR in under 10 minutes, but CI failed, it added unnecessary changes and gave a false answer about a library."
category: "Software & DevOps"
agents:
  - name: "Devin"
    slug: "devin"
source_platform: "qubika.com"
source_date: "Undated"
source_url: "https://qubika.com/blog/devin-ai-coding-agent/"
fetched_from: "https://agentusecases.ai/use-case/build-a-deals-page-step-by-step-with-devin"
---

# Build a deals page step by step with Devin

> An engineer had Devin implement a deals page in steps; it opened a PR in under 10 minutes, but CI failed, it added unnecessary changes and gave a false answer about a library.

**Category:** Software & DevOps  
**Agent:** Devin  
**Source:** qubika.com · Undated

## What they did

The engineer connected the backend and frontend repos to Devin through its GitHub integration and had it set up its own environment. She gave it the Deal schema and a DB diagram, plus PR numbers for related unmerged work. Devin split the task into separate sessions, opened a PR for the first piece, and retried CI lint and TypeScript fixes. Each later part got its own session, with PRs based on the earlier ones.

## How it went

The first PR opened in under 10 minutes but failed CI. Later PRs were acceptable but carried extra changes, and Devin wrongly said Joi wasn't used elsewhere. The final session, getting the project running locally, hit usage limits.

## Worth knowing

Separate sessions don't share context, so the split can't be run in parallel. She used all 150 ACUs in under a week, and the docs say performance degrades past 10 ACUs per session.

## Prompt

```text
In [repo name], implement a [page or feature, e.g. deals page] in small steps: [step 1], then [step 2], then [step 3]. Open a PR after the steps, make sure CI passes, and don't add changes outside the scope. If you're unsure how a library works, check its docs and tell me what you verified versus what you assumed.
```

## Related use cases

- [Hand narrow code changes to Devin for pull requests](./hand-narrow-code-changes-to-devin-for-pull-requests.md)
- [Explore code to write technical documentation](./explore-code-to-write-technical-documentation.md)
- [Test features on screen and merge fixed PRs](./test-features-on-screen-and-merge-fixed-prs.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a homepage from Figma designs via MCP](./build-a-homepage-from-figma-designs-via-mcp.md)
- [Run Codex with low-touch planning and port reservation](./run-codex-with-low-touch-planning-and-port-reservation.md)
