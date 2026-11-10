---
title: "Rewrite a README after a rearchitecture"
slug: "rewrite-a-readme-after-a-rearchitecture"
summary: "Devin scanned a rearchitected codebase and delivered a new README as a PR with accurate setup and API details, but struggled with design rationale and purpose."
category: "Software & DevOps"
agents:
  - name: "Devin"
    slug: "devin"
source_platform: "medium.com"
source_date: "Undated"
source_url: "https://medium.com/@universe3523/boosting-documentation-with-devin-ai-2257cfb04c79"
fetched_from: "https://agentusecases.ai/use-case/rewrite-a-readme-after-a-rearchitecture"
---

# Rewrite a README after a rearchitecture

> Devin scanned a rearchitected codebase and delivered a new README as a PR with accurate setup and API details, but struggled with design rationale and purpose.

**Category:** Software & DevOps  
**Agent:** Devin  
**Source:** medium.com · Undated

## What they did

After a major rearchitecture, the author gave Devin the repo and a step-by-step prompt. Devin scanned the code, read the old README, and proposed a headline outline. It then waited for a "CONFIRMED, PROCEED" command. Next it was told to forget the repo, follow its own setup instructions as a new developer, and report gaps. It then opened a PR from a branch off develop.

## How it went

The README had accurate setup steps, clear API endpoint specs, and examples inferred from the code. It struggled to explain design rationale and the project's overall purpose, which the codebase doesn't contain.

## Worth knowing

The author gives no timings, and suggests that supplying internal docs or architecture diagrams alongside the code might fix the missing rationale and purpose.

## Prompt

```text
My project at [path to repo] was recently rearchitected. Scan the code and rewrite the README with accurate setup steps, configuration, and API details, checking each command against the real code. Leave clearly marked placeholders for design rationale and project purpose that I will fill in. Put the change on a new branch and show me the diff before opening a PR.
```

## Related use cases

- [Hand narrow code changes to Devin for pull requests](./hand-narrow-code-changes-to-devin-for-pull-requests.md)
- [Explore code to write technical documentation](./explore-code-to-write-technical-documentation.md)
- [Turn Slack feedback into PRs and debug infra](./turn-slack-feedback-into-prs-and-debug-infra.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a homepage from Figma designs via MCP](./build-a-homepage-from-figma-designs-via-mcp.md)
- [Run Codex with low-touch planning and port reservation](./run-codex-with-low-touch-planning-and-port-reservation.md)
