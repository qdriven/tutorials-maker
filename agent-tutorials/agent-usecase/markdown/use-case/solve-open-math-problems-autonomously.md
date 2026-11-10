---
title: "Solve open math problems autonomously"
slug: "solve-open-math-problems-autonomously"
summary: "DeepMind's Aletheia agent on Gemini Deep Think was evaluated on 700 open Erdős problems and autonomously solved four."
category: "Security, Science & Hardware"
agents:
  - name: "Gemini"
    slug: "gemini"
source_platform: "deepmind.google"
source_date: "Undated"
source_url: "https://deepmind.google/blog/accelerating-mathematical-and-scientific-discovery-with-gemini-deep-think/"
fetched_from: "https://agentusecases.ai/use-case/solve-open-math-problems-autonomously"
---

# Solve open math problems autonomously

> DeepMind's Aletheia agent on Gemini Deep Think was evaluated on 700 open Erdős problems and autonomously solved four.

**Category:** Security, Science & Hardware  
**Agent:** Gemini  
**Source:** deepmind.google · Undated

## What they did

DeepMind built Aletheia, a math research agent on Gemini Deep Think, with three parts: a generator, a natural-language verifier and a reviser. The verifier flags flaws, and the agent either revises the solution or restarts. It can also admit failure. It uses Google Search and web browsing to check published literature. In a semi-autonomous evaluation it was run against 700 open problems from Bloom's Erdős database.

## How it went

It autonomously solved four open Erdős questions: 652, 654, 1040 and 1051. Erdős-1051 also led to a generalization in a separate paper. The post claims no major-advance or breakthrough-level results.

## Worth knowing

The agent's ability to say it can't solve a problem saved researchers time. The prompts and outputs are on GitHub, and the full details are in the arXiv paper.

## Prompt

```text
Here is an open math problem I want to work on: [problem statement]. Search the literature to check whether it is already solved, then try to build a proof or find a counterexample, showing each step. Finish with a clear verdict: solved, partial progress, or stuck, and list any steps that I should verify by hand.
```

## Related use cases

- [Orchestrate a multi-phase RAG migration](./orchestrate-a-multi-phase-rag-migration.md)
- [Vibe code an HTML5 browser game](./vibe-code-an-html5-browser-game.md)
- [Critique blog post drafts for technical errors](./critique-blog-post-drafts-for-technical-errors.md)
- [Find a Linux vulnerability hidden for 23 years](./find-a-linux-vulnerability-hidden-for-23-years.md)
- [Drive a 7-axis robot arm with natural language](./drive-a-7-axis-robot-arm-with-natural-language.md)
- [Reverse engineer a Go binary with Ghidra via MCP](./reverse-engineer-a-go-binary-with-ghidra-via-mcp.md)
