---
title: "Catch cloud outage risks before they happen"
slug: "catch-cloud-outage-risks-before-they-happen"
summary: "An autonomous ReAct agent that queries real data to stop cloud outages before they occur, built for the Sanity Challenge."
category: "Software & DevOps"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_platform: "DEV"
source_date: "Sep 26, 2026"
source_url: "https://dev.to/rajan_mishra_a9f78ad216b4/shipcheck-an-autonomous-react-agent-that-stops-cloud-outages-before-they-happen-5ag1"
fetched_from: "https://agentusecases.ai/use-case/catch-cloud-outage-risks-before-they-happen"
---

# Catch cloud outage risks before they happen

> An autonomous ReAct agent that queries real data to stop cloud outages before they occur, built for the Sanity Challenge.

**Category:** Software & DevOps  
**Agent:** custom-built or unnamed agent  
**Source:** DEV · Sep 26, 2026

## What they did

SHIPCHECK is a ReAct agent connected to a Sanity Content Lake through MCP. Given a proposed upgrade, it calls four tools for component state, version constraints, cluster dependencies and a knowledge graph. It follows two-hop dependencies with GROQ and settles conflicting docs by an authority score from 1 to 10. Sanity held 18 seeded records.

## How it went

For the payment service v2 to v4 upgrade, it ran 13 steps and found that the cluster's Payment SDK v2.4.1 was below the required v3.0.0. It returned DO NOT SHIP YET, and a simulated SDK fix flipped the verdict to safe.

## Worth knowing

The data is a small seeded set of 18 records, and the claim that hallucination fell from about 30% to 0% is stated without any evaluation method.

## Prompt

```text
Using the logs and metrics export at [path], look for patterns that came before past outages, like rising error rates, saturated CPU, or expiring certificates. Write a script that checks current data for those signals and outputs a ranked list of risks with evidence. Finish when it runs on my sample data. Do not change any infrastructure.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Hand narrow code changes to Devin for pull requests](./hand-narrow-code-changes-to-devin-for-pull-requests.md)
- [Build and deploy a Game of Life simulation site](./build-and-deploy-a-game-of-life-simulation-site.md)
- [Manage NixOS server configs with Claude Code](./manage-nixos-server-configs-with-claude-code.md)
- [Fix a Linux kernel memory management problem with Claude](./fix-a-linux-kernel-memory-management-problem-with-claude.md)
- [Turn Sentry bug reports into fix pull requests](./turn-sentry-bug-reports-into-fix-pull-requests.md)
