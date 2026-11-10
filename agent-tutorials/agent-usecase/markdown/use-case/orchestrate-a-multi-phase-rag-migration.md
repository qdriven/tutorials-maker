---
title: "Orchestrate a multi-phase RAG migration"
slug: "orchestrate-a-multi-phase-rag-migration"
summary: "A walkthrough of using Gemini CLI to coordinate a complex, multi-phase cloud migration project."
category: "Software & DevOps"
agents:
  - name: "Gemini"
    slug: "gemini"
source_platform: "DEV"
source_date: "Apr 28, 2026"
source_url: "https://dev.to/googleai/how-i-used-gemini-cli-to-orchestrate-a-complex-rag-migration-43ga"
fetched_from: "https://agentusecases.ai/use-case/orchestrate-a-multi-phase-rag-migration"
---

# Orchestrate a multi-phase RAG migration

> A walkthrough of using Gemini CLI to coordinate a complex, multi-phase cloud migration project.

**Category:** Software & DevOps  
**Agent:** Gemini  
**Source:** DEV · Apr 28, 2026

## What they did

The author ran Gemini CLI with the Conductor extension. Markdown files defined the product, tech stack and workflow. For each track the agent wrote a spec and plan, which he approved before implementation. It then worked test-first, wrote Terraform, and ran checkpoints at the end of each phase. He ran it in a sandbox in Yolo mode with a notifier script, and returned when notified.

## How it went

The project took several days of AI-assisted work. It used about 19M input, 66M cached input and 400k output tokens, costing around $30 on Vertex AI. The source gives no failure details.

## Worth knowing

Cached input tokens dominated usage, and the author says costs vary. Rules like running terraform plan before apply and the coverage target belong in workflow.md.

## Prompt

```text
I'm migrating [system, e.g. my search and RAG pipeline] from [current setup] to [target cloud service]. Read the codebase in this folder and break the migration into phases with clear checkpoints, risks, and rollback steps. Finish with a written plan in MIGRATION.md; don't change any code or run any cloud commands until I approve each phase.
```

## Related use cases

- [Race three models to build a Counter-Strike clone](./race-three-models-to-build-a-counter-strike-clone.md)
- [Hunt for unpatched vulnerabilities in SQLite commits](./hunt-for-unpatched-vulnerabilities-in-sqlite-commits.md)
- [Critique blog post drafts for technical errors](./critique-blog-post-drafts-for-technical-errors.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a budgeting app from a single prompt](./build-a-budgeting-app-from-a-single-prompt.md)
- [Spin up a second agent as an independent QA reviewer](./spin-up-a-second-agent-as-an-independent-qa-reviewer.md)
