---
title: "Fill out forms from images with a form-filling agent"
slug: "fill-out-forms-from-images-with-a-form-filling-agent"
summary: "The author used Gemini to build an agent that plans the fields in a form image and matches them to bounding boxes, for a friend who wanted forms filled automatically."
category: "Life Admin & Home"
agents:
  - name: "Gemini"
    slug: "gemini"
source_platform: "Reddit"
source_date: "Apr 1, 2025"
source_url: "https://www.reddit.com/r/OpenAI/comments/1k9ch4u"
fetched_from: "https://agentusecases.ai/use-case/fill-out-forms-from-images-with-a-form-filling-agent"
---

# Fill out forms from images with a form-filling agent

> The author used Gemini to build an agent that plans the fields in a form image and matches them to bounding boxes, for a friend who wanted forms filled automatically.

**Category:** Life Admin & Home  
**Agent:** Gemini  
**Source:** Reddit · Apr 1, 2025

## What they did

The author said a friend wanted JPEG/PNG forms filled automatically, so they reused prior work with OmniParser and built an annotated dataset from IRS and OPM forms with clearly defined fields. They used Gemini to identify what fields were present in a document and match those fields to bounding boxes, noting GPT-4o plus YOLO could have done the same job.

## How it went

The post presents it as a working approach for automating tedious form filling, especially in manual supply-chain workflows. It does not give accuracy numbers, speed, or failure cases in the thread text shown.

## Worth knowing

The main catch is that they first compiled their own annotated dataset from real forms, rather than relying on prompting alone.

## Prompt

```text
Build me a small tool that takes an image of a form at [file path], detects each blank field and its label, and draws bounding boxes where answers should go. Then fill the fields using the details in [my info file], and save the completed form as a new image at [output path]. Show me the result for review before treating it as done, and stop once the filled form lines up with every field.
```

## Related use cases

- [Orchestrate a multi-phase RAG migration](./orchestrate-a-multi-phase-rag-migration.md)
- [Vibe code an HTML5 browser game](./vibe-code-an-html5-browser-game.md)
- [Shop Etsy for party supplies within a budget](./shop-etsy-for-party-supplies-within-a-budget.md)
- [Get a second opinion on an MRI](./get-a-second-opinion-on-an-mri.md)
- [Let Claude read Apple Health and Fitbit data via MCP](./let-claude-read-apple-health-and-fitbit-data-via-mcp.md)
- [Use a coding agent for everyday non-programming chores](./use-a-coding-agent-for-everyday-non-programming-chores.md)
