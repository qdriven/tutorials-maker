---
title: "Configure macOS and dev tooling from the terminal"
slug: "configure-macos-and-dev-tooling-from-the-terminal"
summary: "Gemini CLI ran defaults write commands to set Dock auto-hide, and was also used to install Docker and configure Git GPG signing."
category: "Software & DevOps"
agents:
  - name: "Gemini"
    slug: "gemini"
source_platform: "addyosmani.com"
source_date: "Jan 1, 2026"
source_url: "https://addyosmani.com/blog/gemini-cli/"
fetched_from: "https://agentusecases.ai/use-case/configure-macos-and-dev-tooling-from-the-terminal"
---

# Configure macOS and dev tooling from the terminal

> Gemini CLI ran defaults write commands to set Dock auto-hide, and was also used to install Docker and configure Git GPG signing.

**Category:** Software & DevOps  
**Agent:** Gemini  
**Source:** addyosmani.com · Jan 1, 2026

## What they did

The guide's system-troubleshooting tip says you can run Gemini CLI outside a code project and ask it to install Docker, configure Git GPG signing, or edit dotfiles. It may search the web for instructions, then run shell commands, showing each command or diff for approval. In one user example, it ran the defaults write commands for Dock auto-hide and no delay.

## How it went

The source reports the Dock change worked, with the AI running the right defaults write commands. It gives no timings or results for the Docker or GPG tasks, and offers no measured outcomes.

## Worth knowing

Approve each command yourself, since system-level changes can be wide-reaching. You can ask Gemini to explain a command, such as a defaults write, before running it.

## Prompt

```text
Help me set up my [macOS or other OS] machine from the terminal. I want to [settings to change, e.g. auto-hide the Dock], install [tools, e.g. Docker], and configure [e.g. Git commit signing with GPG]. Show me each command and what it does before you run it, and tell me when each setup step has worked. Pause before anything that needs admin rights or changes my existing keys or settings.
```

## Related use cases

- [Orchestrate a multi-phase RAG migration](./orchestrate-a-multi-phase-rag-migration.md)
- [Vibe code an HTML5 browser game](./vibe-code-an-html5-browser-game.md)
- [Shop Etsy for party supplies within a budget](./shop-etsy-for-party-supplies-within-a-budget.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a budgeting app from a single prompt](./build-a-budgeting-app-from-a-single-prompt.md)
- [Spin up a second agent as an independent QA reviewer](./spin-up-a-second-agent-as-an-independent-qa-reviewer.md)
