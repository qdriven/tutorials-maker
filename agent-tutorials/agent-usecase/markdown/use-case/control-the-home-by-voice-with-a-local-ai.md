---
title: "Control the home by voice with a local AI"
slug: "control-the-home-by-voice-with-a-local-ai"
summary: "A user set up local AI with voice commands for a home assistant that handles groceries, lights, AC and garden moisture monitoring."
category: "Life Admin & Home"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_platform: "X"
source_date: "Oct 1, 2026"
source_url: "https://x.com/HerbWetherell/status/2105798686194417918"
fetched_from: "https://agentusecases.ai/use-case/control-the-home-by-voice-with-a-local-ai"
---

# Control the home by voice with a local AI

> A user set up local AI with voice commands for a home assistant that handles groceries, lights, AC and garden moisture monitoring.

**Category:** Life Admin & Home  
**Agent:** custom-built or unnamed agent  
**Source:** X · Oct 1, 2026

## What they did

User ran local AI on their PC via Ollama with a private model sized to their GPU, better on Linux. They connected voice input through whisper and piper TTS to issue commands to a local home assistant instance. The setup handled groceries, lights, AC, and garden moisture monitoring, plus language teaching, with remote access via WireGuard or Tailscale and no external data sharing.

## How it went

The system worked alright for these tasks though the AI was less powerful than cloud versions. It delivered fully private local control without phoning home.

## Worth knowing

Setup may require an advanced AI to configure initially.

## Prompt

```text
Set up a local voice-controlled home assistant that runs on my own hardware with [local model, e.g. Llama via Ollama]. It should handle [grocery list, lights, AC, plant or garden moisture sensors] through [Home Assistant or device platform], and answer questions like 'is the garden dry?'. You're done when I can say five example commands out loud and each one works or gives a clear error. Ask me before changing any device settings that could affect safety, like heating or door locks.
```

## Related use cases

- [Get a second opinion on an MRI](./get-a-second-opinion-on-an-mri.md)
- [Sort 2,200 Downloads files into folders with summaries](./sort-2-200-downloads-files-into-folders-with-summaries.md)
- [Plan meals and track symptoms with Claude Code](./plan-meals-and-track-symptoms-with-claude-code.md)
- [Run a focus agent and Gmail agent on goals](./run-a-focus-agent-and-gmail-agent-on-goals.md)
- [Use a coding agent for everyday non-programming chores](./use-a-coding-agent-for-everyday-non-programming-chores.md)
- [Run personal assistant tasks like medical data and finance reports](./run-personal-assistant-tasks-like-medical-data-and-finance-r.md)
