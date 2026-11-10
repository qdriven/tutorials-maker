---
title: "Sort waste using local recycling rules"
slug: "sort-waste-using-local-recycling-rules"
summary: "Gemini Robotics-ER 1.5 looks up local recycling rules online, then plans and sorts objects into compost, recycling and trash bins."
category: "Security, Science & Hardware"
agents:
  - name: "Gemini"
    slug: "gemini"
source_platform: "developers.googleblog.com"
source_date: "Undated"
source_url: "https://developers.googleblog.com/building-the-next-generation-of-physical-agents-with-gemini-robotics-er-15/"
fetched_from: "https://agentusecases.ai/use-case/sort-waste-using-local-recycling-rules"
---

# Sort waste using local recycling rules

> Gemini Robotics-ER 1.5 looks up local recycling rules online, then plans and sorts objects into compost, recycling and trash bins.

**Category:** Security, Science & Hardware  
**Agent:** Gemini  
**Source:** developers.googleblog.com · Undated

## What they did

The post frames this as a use case for the model acting as a robot's high-level reasoning layer. It would use Google Search to find local recycling guidelines, identify the objects in view, and plan the sort. It would then call a vision-language-action model or user-defined functions to move items. The shown demo prompts it to explain the sort and point to each object.

## How it went

The post shows only a rendered animation of a spatially grounded sorting plan, with text interleaved with points. It gives no success rates for end-to-end sorting. The model is in preview.

## Worth knowing

Model-level safety filters don't replace real robot safety engineering. The post says developers still need emergency stops, collision avoidance and risk assessments.

## Prompt

```text
Write a program that takes a photo of items from [image folder] and sorts each into compost, recycling, or trash. Look up the rules for [my city or waste provider] online and cite the source page for each rule you use. Output a table of item, bin, and reason, and flag any items you are unsure about. Stop once every item in the photos is sorted.
```

## Related use cases

- [Orchestrate a multi-phase RAG migration](./orchestrate-a-multi-phase-rag-migration.md)
- [Vibe code an HTML5 browser game](./vibe-code-an-html5-browser-game.md)
- [Critique blog post drafts for technical errors](./critique-blog-post-drafts-for-technical-errors.md)
- [Find a Linux vulnerability hidden for 23 years](./find-a-linux-vulnerability-hidden-for-23-years.md)
- [Drive a 7-axis robot arm with natural language](./drive-a-7-axis-robot-arm-with-natural-language.md)
- [Reverse engineer a Go binary with Ghidra via MCP](./reverse-engineer-a-go-binary-with-ghidra-via-mcp.md)
