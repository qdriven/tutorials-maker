---
title: "Turn customer support tickets into investigated pull requests"
slug: "turn-customer-support-tickets-into-investigated-pull-request"
summary: "Pylon connected its support tool to Devin so a detailed customer issue starts an investigation and possibly a PR, while engineers still review and merge."
category: "Software & DevOps"
agents:
  - name: "Devin"
    slug: "devin"
source_platform: "quasa.io"
source_date: "Oct 19, 2026"
source_url: "https://quasa.io/stories/pylon-sends-support-bugs-to-devin-but-engineers-still-merge-the-fixes"
fetched_from: "https://agentusecases.ai/use-case/turn-customer-support-tickets-into-investigated-pull-request"
---

# Turn customer support tickets into investigated pull requests

> Pylon connected its support tool to Devin so a detailed customer issue starts an investigation and possibly a PR, while engineers still review and merge.

**Category:** Software & DevOps  
**Agent:** Devin  
**Source:** quasa.io · Oct 19, 2026

## What they did

A Pylon workflow spots a detailed bug report, with an error message or repro steps, and adds an escalation tag. The tag starts a Devin automation with the issue as context. Devin looks through the repo and connected logs and tries to reproduce the failure. It may open a PR if Git permissions allow. An engineer reviews and decides whether to merge.

## How it went

The source describes a product launch, not measured results. Sessions can end with findings and no PR. Pylon's reporting can show whether Devin PRs opened, merged or closed. It can't confirm the customer's problem is fixed.

## Worth knowing

Devin's default Pylon profile has read-only Git access, so an admin must grant push and PR permissions. Full coding sessions use your Devin plan, while codebase search from Pylon is free.

## Prompt

```text
When a new support ticket tagged [tag, e.g. bug] arrives from [support tool], read the customer's description and investigate the codebase at [repo URL] to find the likely cause. Write up your findings, and if the fix is clear, open a draft pull request with a test. Do not merge anything, and ask me before contacting the customer.
```

## Related use cases

- [Hand narrow code changes to Devin for pull requests](./hand-narrow-code-changes-to-devin-for-pull-requests.md)
- [Rewrite a README after a rearchitecture](./rewrite-a-readme-after-a-rearchitecture.md)
- [Split a React Native to Swift migration across agents](./split-a-react-native-to-swift-migration-across-agents.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a homepage from Figma designs via MCP](./build-a-homepage-from-figma-designs-via-mcp.md)
- [Run Codex with low-touch planning and port reservation](./run-codex-with-low-touch-planning-and-port-reservation.md)
