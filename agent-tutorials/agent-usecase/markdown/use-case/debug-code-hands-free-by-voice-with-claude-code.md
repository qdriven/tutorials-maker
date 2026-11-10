---
title: "Debug code hands-free by voice with Claude Code"
slug: "debug-code-hands-free-by-voice-with-claude-code"
summary: "Author built a local speech-to-text and text-to-speech stack hooked to Claude Code via MCP, and used it to debug a WhatsApp integration hands-free while brushing teeth."
category: "Software & DevOps"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "HN"
source_date: "Feb 5, 2026"
source_url: "https://news.ycombinator.com/item?id=46899573"
fetched_from: "https://agentusecases.ai/use-case/debug-code-hands-free-by-voice-with-claude-code"
---

# Debug code hands-free by voice with Claude Code

> Author built a local speech-to-text and text-to-speech stack hooked to Claude Code via MCP, and used it to debug a WhatsApp integration hands-free while brushing teeth.

**Category:** Software & DevOps  
**Agent:** Claude Code  
**Source:** HN · Feb 5, 2026

## What they did

The author spent an afternoon building a local voice stack on an M4 Pro: Parakeet v3 TDT for speech-to-text and Pocket TTS for speech-to-speech output, joined to Claude Code through a custom MCP. They hacked AirPods stem clicks to be captured, so a click interrupts Claude and starts listening. Claude narrates its work in short, frequent messages, and the session is streamed by AirPlay to a TV.

## How it went

The author had it debug a custom WhatsApp integration hands-free while brushing teeth, and calls it fun and easy on the back. The source gives no numbers or failure details.

## Worth knowing

Getting the AirPods stem click captured took some hacking, and the stack ran on an M4 Pro, so expect to tinker with hardware input and local model speed.

## Prompt

```text
Help me set up hands-free voice control for Claude Code on my [Mac/Windows/Linux] machine, using local speech-to-text and text-to-speech connected through an MCP server. Walk me through the setup step by step. Finished means I can speak a request, hear a spoken reply, and use it to debug [project or integration name]. Show me any command that installs software before running it.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Search years of research files in an Obsidian vault](./search-years-of-research-files-in-an-obsidian-vault.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a budgeting app from a single prompt](./build-a-budgeting-app-from-a-single-prompt.md)
- [Find bugs with property-testing agent swarms](./find-bugs-with-property-testing-agent-swarms.md)
