---
title: "Split a React Native to Swift migration across agents"
slug: "split-a-react-native-to-swift-migration-across-agents"
summary: "Cognition's Jared Zoneraich uses Devin fan-out so child agents work in parallel on a migration split into six pieces."
category: "Software & DevOps"
agents:
  - name: "Devin"
    slug: "devin"
source_platform: "X"
source_date: "Jun 19, 2026"
source_url: "https://x.com/imjaredz/status/2068001458205720751"
fetched_from: "https://agentusecases.ai/use-case/split-a-react-native-to-swift-migration-across-agents"
---

# Split a React Native to Swift migration across agents

> Cognition's Jared Zoneraich uses Devin fan-out so child agents work in parallel on a migration split into six pieces.

**Category:** Software & DevOps  
**Agent:** Devin  
**Source:** X · Jun 19, 2026

## What they did

Jared instructed the master Devin to split the React Native to Swift migration into six independent pieces. The master then spawned child Devins, each assigned one piece, and later pulled their outputs together. Each child ran in its own VM with a narrow task and context.

## How it went

The migration completed via parallel child agents. No specific completion time, code volume, or shortfalls are stated.

## Prompt

```text
I'm migrating [repo] from [old framework, e.g. React Native] to [new framework, e.g. Swift]. Split the work into [number] independent pieces, such as [list modules], and run a separate child agent on each in parallel. Finish when each piece has a PR with passing tests and you've given me a summary of how they fit together; don't merge anything without my approval.
```

## Related use cases

- [Hand narrow code changes to Devin for pull requests](./hand-narrow-code-changes-to-devin-for-pull-requests.md)
- [Explore code to write technical documentation](./explore-code-to-write-technical-documentation.md)
- [Test features on screen and merge fixed PRs](./test-features-on-screen-and-merge-fixed-prs.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a homepage from Figma designs via MCP](./build-a-homepage-from-figma-designs-via-mcp.md)
- [Run Codex with low-touch planning and port reservation](./run-codex-with-low-touch-planning-and-port-reservation.md)
