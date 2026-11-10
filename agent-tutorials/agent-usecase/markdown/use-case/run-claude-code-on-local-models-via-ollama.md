---
title: "Run Claude Code on local models via Ollama"
slug: "run-claude-code-on-local-models-via-ollama"
summary: "A guide to setting up Claude Code in IntelliJ and connecting it to local models through Ollama for coding work."
category: "Software & DevOps"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "DEV"
source_date: "Oct 21, 2026"
source_url: "https://dev.to/mohammed_sebaa_2610/running-claude-code-with-ollama-and-local-models-4c49"
fetched_from: "https://agentusecases.ai/use-case/run-claude-code-on-local-models-via-ollama"
---

# Run Claude Code on local models via Ollama

> A guide to setting up Claude Code in IntelliJ and connecting it to local models through Ollama for coding work.

**Category:** Software & DevOps  
**Agent:** Claude Code  
**Source:** DEV · Oct 21, 2026

## What they did

The author installed Claude Code with npm and ran it from IntelliJ's built-in terminal. They pulled the qwen3.5:9b model in Ollama and pointed Claude Code at Ollama's Anthropic-compatible local endpoint with environment variables. An ollama launch command is offered as a shortcut. As a test, they asked it to build a Java console task manager. The person approved each change.

## How it went

Per the author, the agent planned the work, created the files, ran the program and fixed its own errors, and the app worked. The author rates local quality as good only for small tasks, and speed depends on your hardware.

## Worth knowing

Speed depends on your hardware, and the author says the setup only works if your machine can handle the model. Start with a small project.

## Prompt

```text
Help me set up Claude Code to run against a local model through Ollama on my [Mac/Windows/Linux] machine, using [IntelliJ/my editor] as my IDE. Walk me through installing Ollama, pulling a suitable coding model for my hardware ([RAM/GPU]), and pointing Claude Code at it. You're done when Claude Code answers a simple request about a file in [my project folder] using the local model. Show me any config files or commands before you change or run them.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Link journal entries and write book reviews in Obsidian](./link-journal-entries-and-write-book-reviews-in-obsidian.md)
- [Produce a finished music release from one chat](./produce-a-finished-music-release-from-one-chat.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a budgeting app from a single prompt](./build-a-budgeting-app-from-a-single-prompt.md)
- [Find bugs with property-testing agent swarms](./find-bugs-with-property-testing-agent-swarms.md)
