---
title: "Generate parametric CAD models from a prompt"
slug: "generate-parametric-cad-models-from-a-prompt"
summary: "An open-source text-to-CAD tool that produces 3D models from text and image references by generating CAD as code. · Jun 17, 2026"
category: "Security, Science & Hardware"
agents:
  - name: "Claude"
    slug: "claude"
source_url: "https://github.com/Adam-CAD/CADAM"
fetched_from: "https://agentusecases.ai/use-case/generate-parametric-cad-models-from-a-prompt"
---

# Generate parametric CAD models from a prompt

> An open-source text-to-CAD tool that produces 3D models from text and image references by generating CAD as code. · Jun 17, 2026

**Category:** Security, Science & Hardware  
**Agent:** Claude

## What they did

You describe a part in plain English, optionally with reference images. The app uses Claude to write OpenSCAD code, which runs in the browser through WebAssembly and shows a live Three.js preview. It pulls out adjustable dimensions as sliders, so you can change sizes without asking the AI to regenerate. You can export STL, SCAD or DXF.

## How it went

The README's benchmark gallery shows single prompts producing parametric models, from knurled knobs and threaded bolts to a V8 engine with 22 dimension controls. It gives no failure rates or accuracy measurements.

## Worth knowing

Self-hosting needs Node, the Supabase CLI, ngrok for webhooks, and your own API keys (Anthropic and others). The hosted demo at adam.new/cadam needs no install.

## Prompt

```text
Write a parametric CAD script in [CadQuery or OpenSCAD] for [describe the part, e.g. a wall bracket for a 25mm pipe], with named variables for all key dimensions at the top. Run it and export an [STL or STEP] file to this folder. Stop when the file exports without errors and show me the list of parameters I can change.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Prospect, score leads and run outbound email sequences](./prospect-score-leads-and-run-outbound-email-sequences.md)
- [Build an anonymous wall of hopes and fears about AI](./build-an-anonymous-wall-of-hopes-and-fears-about-ai.md)
- [Find a Linux vulnerability hidden for 23 years](./find-a-linux-vulnerability-hidden-for-23-years.md)
- [Run a home robot through Claude Desktop](./run-a-home-robot-through-claude-desktop.md)
- [Orchestrate a Spot robot through multi-step tasks](./orchestrate-a-spot-robot-through-multi-step-tasks.md)
