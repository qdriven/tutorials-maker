---
title: "Convert React MUI components to Tailwind with Devin"
slug: "convert-react-mui-components-to-tailwind-with-devin"
summary: "Lumos used Devin for routine tasks like MUI-to-Tailwind conversion, which went well, and its unit-test feedback loop reduced rewrites."
category: "Software & DevOps"
agents:
  - name: "Devin"
    slug: "devin"
source_platform: "lumos.com"
source_date: "Undated"
source_url: "https://www.lumos.com/blog/cognitions-devin-your-new-junior-engineer"
fetched_from: "https://agentusecases.ai/use-case/convert-react-mui-components-to-tailwind-with-devin"
---

# Convert React MUI components to Tailwind with Devin

> Lumos used Devin for routine tasks like MUI-to-Tailwind conversion, which went well, and its unit-test feedback loop reduced rewrites.

**Category:** Software & DevOps  
**Agent:** Devin  
**Source:** lumos.com · Undated

## What they did

Lumos engineers gave Devin a short prompt to convert React MUI components to Tailwind using their own styles, and it opened a PR. Before that, they let it run unit tests and filled its Knowledge feature with codebase-specific guidance. Engineers then reviewed the PR.

## How it went

The conversion went quite well, but the PR wasn't ready to merge as-is. They think linting and pre-commit hooks might have fixed that. Overall, Devin pushed 44 PRs in 48 days, and 19 were merged.

## Worth knowing

Typical Devin PRs cost $5 to $40, averaging about $20. Each command is capped at 10 ACUs (about $20), and a simple deletion PR cost about $5.

## Prompt

```text
In [repo name], convert the React components in [folder path] from [current styling library, e.g. MUI] to [target, e.g. Tailwind], keeping the look and behavior the same. Run the existing unit tests after each component and fix failures before moving on. Open a PR when all tests pass, with a short list of components converted and anything you couldn't convert.
```

## Related use cases

- [Hand narrow code changes to Devin for pull requests](./hand-narrow-code-changes-to-devin-for-pull-requests.md)
- [Explore code to write technical documentation](./explore-code-to-write-technical-documentation.md)
- [Test features on screen and merge fixed PRs](./test-features-on-screen-and-merge-fixed-prs.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a homepage from Figma designs via MCP](./build-a-homepage-from-figma-designs-via-mcp.md)
- [Run Codex with low-touch planning and port reservation](./run-codex-with-low-touch-planning-and-port-reservation.md)
