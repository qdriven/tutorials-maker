---
title: "Orchestrate a Spot robot through multi-step tasks"
slug: "orchestrate-a-spot-robot-through-multi-step-tasks"
summary: "Gemini Robotics ER 2 drives a Boston Dynamics Spot, watching video to confirm tasks like tying a trash bag are done before moving on."
category: "Security, Science & Hardware"
agents:
  - name: "Gemini"
    slug: "gemini"
source_platform: "blog.google"
source_date: "Undated"
source_url: "https://blog.google/innovation-and-ai/models-and-research/google-deepmind/gemini-robotics-er-2/"
fetched_from: "https://agentusecases.ai/use-case/orchestrate-a-spot-robot-through-multi-step-tasks"
---

# Orchestrate a Spot robot through multi-step tasks

> Gemini Robotics ER 2 drives a Boston Dynamics Spot, watching video to confirm tasks like tying a trash bag are done before moving on.

**Category:** Security, Science & Hardware  
**Agent:** Gemini  
**Source:** blog.google · Undated

## What they did

Developers declare low-level controls, such as Boston Dynamics Spot's navigation and manipulator APIs, as tools. They stream video, audio or text into Gemini Robotics ER 2 through the Gemini Live API. The model sequences the steps, watches the video to track progress and confirm a task is finished, then moves on. The published Spot demo fetches objects, such as a popcorn snack, on a spoken command.

## How it went

On progress classification, which sorts each video frame into five progress bands, it reached 57.4% accuracy. On moment-finding it reached 91.3% accuracy with a 0.96s mean absolute distance. The post gives no Spot success rate for tying a trash bag.

## Worth knowing

The Spot demo code is on GitHub, and the model is available as a preview through the Gemini API and Google AI Studio.

## Prompt

```text
Write a Python program that breaks the task [multi-step task, e.g. tidy the workbench] into steps for a robot or simulator I have called [robot or simulator name]. After each step, have it check a camera frame or video clip from [source] to confirm the step is done before moving to the next. Show me the plan and code before running anything on real hardware. Stop when the program completes all steps in a simulated run.
```

## Related use cases

- [Orchestrate a multi-phase RAG migration](./orchestrate-a-multi-phase-rag-migration.md)
- [Vibe code an HTML5 browser game](./vibe-code-an-html5-browser-game.md)
- [Critique blog post drafts for technical errors](./critique-blog-post-drafts-for-technical-errors.md)
- [Find a Linux vulnerability hidden for 23 years](./find-a-linux-vulnerability-hidden-for-23-years.md)
- [Drive a 7-axis robot arm with natural language](./drive-a-7-axis-robot-arm-with-natural-language.md)
- [Reverse engineer a Go binary with Ghidra via MCP](./reverse-engineer-a-go-binary-with-ghidra-via-mcp.md)
