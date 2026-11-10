---
title: "Reverse engineer legacy systems without source code"
slug: "reverse-engineer-legacy-systems-without-source-code"
summary: "Thoughtworks consultants used Gemini 2.5 Pro in a two-week pilot to produce validated blueprints of legacy systems' functionality."
category: "Software & DevOps"
agents:
  - name: "Gemini"
    slug: "gemini"
source_platform: "infoq.com"
source_date: "Undated"
source_url: "https://www.infoq.com/Reverse_Engineering/news"
fetched_from: "https://agentusecases.ai/use-case/reverse-engineer-legacy-systems-without-source-code"
---

# Reverse engineer legacy systems without source code

> Thoughtworks consultants used Gemini 2.5 Pro in a two-week pilot to produce validated blueprints of legacy systems' functionality.

**Category:** Software & DevOps  
**Agent:** Gemini  
**Source:** infoq.com · Undated

## What they did

Thoughtworks consultants used Gemini 2.5 Pro to reverse engineer legacy systems that had no source code available. The AI helped extract what the systems do, and the output was validated "blueprints" of their functionality. This was a two-week pilot. The listing I read is only a short blurb, so it gives no detail on inputs or on the steps people took.

## How it went

The pilot produced validated functionality blueprints in two weeks. The blurb says it showed AI could cut the time and risk of modernizing opaque systems, with speed having to be balanced against validation.

## Worth knowing

Validation is the catch. Speed has to be balanced against checking the AI's output. The full InfoQ article, not this category listing, has the details.

## Prompt

```text
I have a legacy system in [folder path] and no documentation. Read through the code, configs, and database schemas and write a blueprint in a markdown file covering what the system does, its main workflows, data flows, and business rules. Mark anything you are unsure about as unverified. Do not modify any files other than the blueprint. Stop when every major module is described.
```

## Related use cases

- [Orchestrate a multi-phase RAG migration](./orchestrate-a-multi-phase-rag-migration.md)
- [Vibe code an HTML5 browser game](./vibe-code-an-html5-browser-game.md)
- [Critique blog post drafts for technical errors](./critique-blog-post-drafts-for-technical-errors.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a budgeting app from a single prompt](./build-a-budgeting-app-from-a-single-prompt.md)
- [Spin up a second agent as an independent QA reviewer](./spin-up-a-second-agent-as-an-independent-qa-reviewer.md)
