---
title: "Review a hardware assembly for injection-molding risks"
slug: "review-a-hardware-assembly-for-injection-molding-risks"
summary: "Codex with local CAD tools checked a real assembly's geometry and configuration, flagged pre-tooling risks, and organized findings with measurements and closure criteria. · Oct 28, 2026"
category: "Security, Science & Hardware"
agents:
  - name: "Codex"
    slug: "codex"
source_platform: "github.com"
source_date: "Oct 28, 2026 · Submitted by SvenKunkka"
source_url: "https://github.com/SvenKunkka/3d-structure-review"
fetched_from: "https://agentusecases.ai/use-case/review-a-hardware-assembly-for-injection-molding-risks"
---

# Review a hardware assembly for injection-molding risks

> Codex with local CAD tools checked a real assembly's geometry and configuration, flagged pre-tooling risks, and organized findings with measurements and closure criteria. · Oct 28, 2026

**Category:** Security, Science & Hardware  
**Agent:** Codex  
**Source:** github.com · Oct 28, 2026 · Submitted by SvenKunkka

## What they did

The author distilled a real CAD structure and injection-molding review into a reusable Codex Skill. Given a STEP or native assembly plus the product configuration table, Codex uses local CAD to check version, units and pose, solid validity, interference, clearances, wall thickness and key sections. It then flags molding risks. A script records SHA-256 hashes of the input files.

## How it went

The output is an editable report listing each issue's location, measurement method, recheck result and closure condition. The repo includes none of the original product's data or results, so conclusions must be re-verified on each new input.

## Worth knowing

Local geometry measurements are not mold-flow or physical test results. Material, loads and mold plan must come from you, and the report says which mold and trial evidence is still needed.

## Prompt

```text
Review the CAD files in [folder path] for injection-molding risks before tooling: wall thickness, draft angles, undercuts, sink risk, and parting lines. Make a list of findings ranked by severity, each with the measurement, the affected part, and a clear criterion for calling it fixed. Do not modify any files, and stop when the report is saved as [filename].
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Diagnose a killed process on a server](./diagnose-a-killed-process-on-a-server.md)
- [Find bugs with property-testing agent swarms](./find-bugs-with-property-testing-agent-swarms.md)
- [Find a Linux vulnerability hidden for 23 years](./find-a-linux-vulnerability-hidden-for-23-years.md)
- [Reverse engineer Claude Desktop to find a path to Linux support](./reverse-engineer-claude-desktop-to-find-a-path-to-linux-supp.md)
- [Sort waste using local recycling rules](./sort-waste-using-local-recycling-rules.md)
