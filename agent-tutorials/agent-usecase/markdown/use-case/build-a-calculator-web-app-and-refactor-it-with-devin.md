---
title: "Build a calculator web app and refactor it with Devin"
slug: "build-a-calculator-web-app-and-refactor-it-with-devin"
summary: "A Scott Logic developer built a calculators web app with Devin, then had it plan a refactor of the bloated codebase, and feeding the plan back in chunks cut project size by about 60%."
category: "Software & DevOps"
agents:
  - name: "Devin"
    slug: "devin"
source_platform: "blog.scottlogic.com"
source_date: "Oct 20, 2025"
source_url: "https://blog.scottlogic.com/2025/10/20/rapid-development-with-devin.html"
fetched_from: "https://agentusecases.ai/use-case/build-a-calculator-web-app-and-refactor-it-with-devin"
---

# Build a calculator web app and refactor it with Devin

> A Scott Logic developer built a calculators web app with Devin, then had it plan a refactor of the bloated codebase, and feeding the plan back in chunks cut project size by about 60%.

**Category:** Software & DevOps  
**Agent:** Devin  
**Source:** blog.scottlogic.com · Oct 20, 2025

## What they did

James Camilleri gave Devin a carbon-emissions spreadsheet and a connected repo. His first Electron attempt failed, so he restarted with TypeScript/React, starting with the calculation models and then the UI. Devin planned, branched, built and raised PRs for him to review. After a few calculators the code was repetitive, so he had Devin analyse it and write a refactoring plan, which he fed back in chunks.

## How it went

The refactor cut project size by about 60%. The app took just over a week. Camilleri couldn't read all the generated code, so he relied on tests and focused review of key logic.

## Worth knowing

The build used about 155 ACUs, roughly $350, and the account needed several top-ups. Start new sessions regularly to avoid context rot.

## Prompt

```text
Build a small web app in [framework, e.g. React] that provides [type of calculators, e.g. mortgage, tip, unit conversion], with a clean layout and basic tests. When it works, review the codebase and write a step-by-step refactor plan that removes duplication and unused code, split into small chunks I can approve one at a time. Pause after presenting the plan and wait for my go-ahead before changing any code, then finish when the tests pass and you've reported how much smaller the project got.
```

## Related use cases

- [Hand narrow code changes to Devin for pull requests](./hand-narrow-code-changes-to-devin-for-pull-requests.md)
- [Explore code to write technical documentation](./explore-code-to-write-technical-documentation.md)
- [Test features on screen and merge fixed PRs](./test-features-on-screen-and-merge-fixed-prs.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a homepage from Figma designs via MCP](./build-a-homepage-from-figma-designs-via-mcp.md)
- [Run Codex with low-touch planning and port reservation](./run-codex-with-low-touch-planning-and-port-reservation.md)
