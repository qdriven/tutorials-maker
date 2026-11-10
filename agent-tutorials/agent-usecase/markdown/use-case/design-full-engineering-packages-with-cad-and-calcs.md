---
title: "Design full engineering packages with CAD and calcs"
slug: "design-full-engineering-packages-with-cad-and-calcs"
summary: "The poster says their Dot runs design-calculate-verify loops for hours unattended, producing CAD, calculations, BOM, electrical docs, and drawings."
category: "Security, Science & Hardware"
agents:
  - name: "Dots"
    slug: "dots"
source_platform: "Reddit"
source_date: "Oct 7, 2026"
source_url: "https://www.reddit.com/r/OpenAI/comments/1wyoaw7/my_dot_burns_16b_tokens_a_day_on_since_day_one_on"
fetched_from: "https://agentusecases.ai/use-case/design-full-engineering-packages-with-cad-and-calcs"
---

# Design full engineering packages with CAD and calcs

> The poster says their Dot runs design-calculate-verify loops for hours unattended, producing CAD, calculations, BOM, electrical docs, and drawings.

**Category:** Security, Science & Hardware  
**Agent:** Dots  
**Source:** Reddit · Oct 7, 2026

## What they did

The poster gives a Dot a large engineering task, answers a few clarifying questions, then leaves it running on its cloud computer for hours or days, sometimes by dropping a task document into Google Drive for it to work through sequentially. They say it had CAD tools, electronic schematic software, Blender, and scheduling ability, and it repeatedly inspected files, modified CAD or code, ran calculations and simulations, checked results, revised geometry, and produced BOMs, drawings, electrical docs, manifests, and verification data; the human restarted one overbuilt design with clearer constraints and reviews outputs before manufacturing.

## How it went

They report one package with 1,000+ unique components, 6,000+ solids, nearly 300 pages of drawings, and hundreds of electrical connections, plus laser-cut parts that worked after a small speed tweak. It also reduced a 200k-triangle model to versions around 152k, 84k, 56k, and 50k, but the first structural pass used roughly a 5x safety margin and they would not ship safety-critical designs without human review.

## Worth knowing

The main catch is time and economics: they say one complete manufacturing piece takes about 20 hours, and they doubt the current $100-subscription economics will last.

## Prompt

```text
Design [describe the system, e.g. a 24V control panel or a small mounting bracket] meeting these requirements: [loads, dimensions, standards, constraints]. Run design, calculate, and verify loops on your own until the numbers check out. Deliver CAD files, a calculation sheet, a bill of materials, [electrical documents if relevant], and drawings in [folder], with any assumptions listed.
```

## Related use cases

- [Plan a trip and book flight, hotel and shuttle with an always-on agent](./plan-a-trip-and-book-flight-hotel-and-shuttle-with-an-always.md)
- [Turn customer feedback into tested pull requests](./turn-customer-feedback-into-tested-pull-requests.md)
- [Turn GitHub issues into draft pull requests with long-running agents](./turn-github-issues-into-draft-pull-requests-with-long-runnin.md)
- [Find a Linux vulnerability hidden for 23 years](./find-a-linux-vulnerability-hidden-for-23-years.md)
- [Run a home robot through Claude Desktop](./run-a-home-robot-through-claude-desktop.md)
- [Sort waste using local recycling rules](./sort-waste-using-local-recycling-rules.md)
