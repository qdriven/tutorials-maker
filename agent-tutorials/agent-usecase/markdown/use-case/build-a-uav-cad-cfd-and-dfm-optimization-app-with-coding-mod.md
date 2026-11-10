---
title: "Build a UAV CAD, CFD and DFM optimization app with coding models"
slug: "build-a-uav-cad-cfd-and-dfm-optimization-app-with-coding-mod"
summary: "A developer builds a specialized UAV CAD, CFD and DFM optimization application, using Opus for design and review and Flash for code generation."
category: "Security, Science & Hardware"
agents:
  - name: "Claude"
    slug: "claude"
source_platform: "HN"
source_date: "Oct 28, 2026"
source_url: "https://news.ycombinator.com/item?id=50276245"
fetched_from: "https://agentusecases.ai/use-case/build-a-uav-cad-cfd-and-dfm-optimization-app-with-coding-mod"
---

# Build a UAV CAD, CFD and DFM optimization app with coding models

> A developer builds a specialized UAV CAD, CFD and DFM optimization application, using Opus for design and review and Flash for code generation.

**Category:** Security, Science & Hardware  
**Agent:** Claude  
**Source:** HN · Oct 28, 2026

## What they did

The developer is building a UAV-focused CAD, CFD and DFM optimization application. They wrote detailed requirement, design and technical implementation plans, then tried smaller models and the best open-weights models against them. After comparing results, they settled on Opus for design and review and Flash 3.8 for code generation and implementation.

## How it went

Open-weights models still produced many defects and egregious mistakes despite the detailed plans. Opus and Gemini 3.8 (and now Argon) did significantly better. The author says smaller models may be fine for common small apps.

## Worth knowing

Even very detailed written plans did not stop open models from making serious errors on this specialized engineering domain, so test your own use case before committing to a cheaper model.

## Prompt

```text
I want to build a [type of engineering tool, e.g. UAV design optimizer] that takes [inputs like wing span, weight, material] and evaluates [analyses like CFD drag, structural checks, manufacturability]. First write a short design plan and have me approve it, then implement it in this folder with tests and a README on how to run it. When done, review your own code for bugs and list what is still approximate or unverified.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a charting tool from blood test PDFs](./build-a-charting-tool-from-blood-test-pdfs.md)
- [Run a daily-updated local business directory autonomously](./run-a-daily-updated-local-business-directory-autonomously.md)
- [Find a Linux vulnerability hidden for 23 years](./find-a-linux-vulnerability-hidden-for-23-years.md)
- [Run a home robot through Claude Desktop](./run-a-home-robot-through-claude-desktop.md)
- [Orchestrate a Spot robot through multi-step tasks](./orchestrate-a-spot-robot-through-multi-step-tasks.md)
