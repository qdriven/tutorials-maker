---
title: "Generate parametric geometry workflows with an agent"
slug: "generate-parametric-geometry-workflows-with-an-agent"
summary: "GrassLobster uses agentic AI to generate parametric geometry workflows. · Sep 18, 2026"
category: "Security, Science & Hardware"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_url: "https://www.miro.vision/index.php/2026/09/17/grasslobbster/"
fetched_from: "https://agentusecases.ai/use-case/generate-parametric-geometry-workflows-with-an-agent"
---

# Generate parametric geometry workflows with an agent

> GrassLobster uses agentic AI to generate parametric geometry workflows. · Sep 18, 2026

**Category:** Security, Science & Hardware  
**Agent:** custom-built or unnamed agent

## What they did

Miro Bannwart's Rhino/Grasshopper plugin links an external coding agent, such as Codex or Claude Code, to a saved project folder. The agent interviews you about the idea, then builds connected Geometry Stations whose code and inputs are mirrored as text files. You review the canvas and change parameters. In one test, Miro marked a screenshot in red and green to correct a staircase handrail.

## How it went

Examples include a chest of drawers, curved staircase, villa, bookshelf and timber frame. It is an experimental alpha. Miro got his best results with GPT-6 Astra, and his local-model attempts failed.

## Worth knowing

Give the agent access to the project folder only, keep backups, and test with a small model first. IFC export is unreliable (sphere Breps failed reimport) and can take minutes.

## Prompt

```text
Build a parametric geometry workflow in [Grasshopper or a Python library like CadQuery] that generates [describe shape, e.g. a lattice panel] from inputs like [width, height, density]. Run it with three different input sets and save the outputs. Stop when all three run cleanly and give me a short note on how to change the parameters.
```

## Related use cases

- [Find a Linux vulnerability hidden for 23 years](./find-a-linux-vulnerability-hidden-for-23-years.md)
- [Program a sub-$2k personal robot](./program-a-sub-2k-personal-robot.md)
- [Run a home robot through Claude Desktop](./run-a-home-robot-through-claude-desktop.md)
- [Repair formal proofs for a verified garbage collector](./repair-formal-proofs-for-a-verified-garbage-collector.md)
- [Orchestrate a Spot robot through multi-step tasks](./orchestrate-a-spot-robot-through-multi-step-tasks.md)
- [Run an AI agent on a Nokia 110 feature phone](./run-an-ai-agent-on-a-nokia-110-feature-phone.md)
