---
title: "Run multi-step tasks with model switching"
slug: "run-multi-step-tasks-with-model-switching"
summary: "@dani_avila7 tested Perplexity Computer on multiple tasks, where it picked Gemini 3 Flash for some steps and Opus 4.6 for code writing."
category: "Work & Operations"
agents:
  - name: "Gemini"
    slug: "gemini"
source_platform: "X"
source_date: "Feb 25, 2026"
source_url: "https://x.com/dani_avila7/status/2026702478801252697"
fetched_from: "https://agentusecases.ai/use-case/run-multi-step-tasks-with-model-switching"
---

# Run multi-step tasks with model switching

> @dani_avila7 tested Perplexity Computer on multiple tasks, where it picked Gemini 3 Flash for some steps and Opus 4.6 for code writing.

**Category:** Work & Operations  
**Agent:** Gemini  
**Source:** X · Feb 25, 2026

## What they did

User started the Perplexity Computer agent and let it run autonomously until tasks finished. The agent selected models per step on its own, using Gemini 3 Flash for several tasks before switching to Opus 4.6 for code writing.

## How it went

It completed the observed tasks via automatic model routing.

## Prompt

```text
I want you to complete this multi-step task: [describe the goal, e.g. research competitors, write a script to analyze the data, and produce a summary report]. Break it into steps, use whichever tools and models fit each step best, and tell me at the end which approach you used for each one. You're done when you've delivered [specific output, e.g. a report file and the script]. Pause before sending anything externally or spending money.
```

## Related use cases

- [Orchestrate a multi-phase RAG migration](./orchestrate-a-multi-phase-rag-migration.md)
- [Vibe code an HTML5 browser game](./vibe-code-an-html5-browser-game.md)
- [Critique blog post drafts for technical errors](./critique-blog-post-drafts-for-technical-errors.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Check supplier invoices for duplicates and missing GST](./check-supplier-invoices-for-duplicates-and-missing-gst.md)
- [Scrape websites with a plain-language browser agent](./scrape-websites-with-a-plain-language-browser-agent.md)
