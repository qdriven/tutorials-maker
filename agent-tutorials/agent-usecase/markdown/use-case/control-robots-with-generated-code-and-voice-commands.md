---
title: "Control robots with generated code and voice commands"
slug: "control-robots-with-generated-code-and-voice-commands"
summary: "Gemini detects objects and writes robot API code, and with 10 in-context demos an ALOHA robot packed boxes and folded a dress; voice commands became robot plans."
category: "Security, Science & Hardware"
agents:
  - name: "Gemini"
    slug: "gemini"
source_platform: "developers.googleblog.com"
source_date: "Undated"
source_url: "https://developers.googleblog.com/gemini-25-for-robotics-and-embodied-intelligence/"
fetched_from: "https://agentusecases.ai/use-case/control-robots-with-generated-code-and-voice-commands"
---

# Control robots with generated code and voice commands

> Gemini detects objects and writes robot API code, and with 10 in-context demos an ALOHA robot packed boxes and folded a dress; voice commands became robot plans.

**Category:** Security, Science & Hardware  
**Agent:** Gemini  
**Source:** developers.googleblog.com · Undated

## What they did

Gemini 2.5 was given a robot control API (detect object, get grasp pose, move/open/close gripper) and wrote Python plans zero-shot, such as putting a banana in a bowl. For ALOHA box packing and dress folding, 10 demonstrations of interleaved reasoning and actions were added to context. For voice, the same API calls were defined as Live API function-calling tools, with the camera feed streamed in.

## How it went

Gemini produced two feasible banana plans, one of which re-planned around the right arm's reach limit. ALOHA packed boxes and folded a dress from the in-context demos. The post gives no success rates.

## Worth knowing

The ALOHA setup is in an open-source Colab with example demonstrations. The Live API voice console is on GitHub, and Gemini Robotics-ER access requires a trusted tester waitlist.

## Prompt

```text
Help me build a simulated robot arm controller in [simulator or language]. Use a vision model to detect objects in [image or camera feed], then write code that calls my robot API [API description] to [task, e.g. pack items into a box]. Run it in simulation only, and show me the generated code before anything is run on real hardware. Stop when the task succeeds in simulation three times in a row.
```

## Related use cases

- [Orchestrate a multi-phase RAG migration](./orchestrate-a-multi-phase-rag-migration.md)
- [Vibe code an HTML5 browser game](./vibe-code-an-html5-browser-game.md)
- [Critique blog post drafts for technical errors](./critique-blog-post-drafts-for-technical-errors.md)
- [Find a Linux vulnerability hidden for 23 years](./find-a-linux-vulnerability-hidden-for-23-years.md)
- [Drive a 7-axis robot arm with natural language](./drive-a-7-axis-robot-arm-with-natural-language.md)
- [Reverse engineer a Go binary with Ghidra via MCP](./reverse-engineer-a-go-binary-with-ghidra-via-mcp.md)
