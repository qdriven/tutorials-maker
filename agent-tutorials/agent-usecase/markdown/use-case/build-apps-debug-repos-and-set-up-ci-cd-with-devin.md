---
title: "Build apps, debug repos and set up CI/CD with Devin"
slug: "build-apps-debug-repos-and-set-up-ci-cd-with-devin"
summary: "A review lists Devin building a full-stack to-do app, debugging a public repo with a PR, and doing Docker setup, deployment and CI/CD."
category: "Software & DevOps"
agents:
  - name: "Devin"
    slug: "devin"
source_platform: "fritz.ai"
source_date: "Undated"
source_url: "https://fritz.ai/cognition-ai-review/"
fetched_from: "https://agentusecases.ai/use-case/build-apps-debug-repos-and-set-up-ci-cd-with-devin"
---

# Build apps, debug repos and set up CI/CD with Devin

> A review lists Devin building a full-stack to-do app, debugging a public repo with a PR, and doing Docker setup, deployment and CI/CD.

**Category:** Software & DevOps  
**Agent:** Devin  
**Source:** fritz.ai · Undated

## What they did

The reviewer did not run Devin. They relied on Cognition's demo videos and early-access user reports. In those, Devin works in a Linux shell with a browser and GitHub. It built a React and Express to-do app, debugged a public repo and submitted a pull request, and set up Docker, deployment and CI/CD pipelines.

## How it went

The review calls Devin strong on boilerplate and clearly specced features. It is weaker on legacy refactoring, complex logic and vague instructions. One beta tester said Devin did 90% of a Node.js backend setup, leaving cleanup.

## Worth knowing

These results come from demos and second-hand reports, not hands-on testing. At publication Devin was closed beta with no pricing, and the review says its code still needs checking.

## Prompt

```text
In my repo [repo link], set up Docker so the app builds and runs locally, then add a CI/CD pipeline using [GitHub Actions or other CI] that runs tests and deploys to [hosting target]. You're done when the pipeline passes on a test branch and I can follow your README steps to run it. Pause and show me the deployment config before anything is deployed to production.
```

## Related use cases

- [Hand narrow code changes to Devin for pull requests](./hand-narrow-code-changes-to-devin-for-pull-requests.md)
- [Rewrite a README after a rearchitecture](./rewrite-a-readme-after-a-rearchitecture.md)
- [Turn Slack feedback into PRs and debug infra](./turn-slack-feedback-into-prs-and-debug-infra.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a homepage from Figma designs via MCP](./build-a-homepage-from-figma-designs-via-mcp.md)
- [Run Codex with low-touch planning and port reservation](./run-codex-with-low-touch-planning-and-port-reservation.md)
