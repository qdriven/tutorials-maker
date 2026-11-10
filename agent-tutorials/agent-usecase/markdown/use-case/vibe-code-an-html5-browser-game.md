---
title: "Vibe code an HTML5 browser game"
slug: "vibe-code-an-html5-browser-game"
summary: "The developer of Xenodochium built the game with Gemini, hit repeated errors, and worked around them by starting a fresh chat."
category: "Games & Simulations"
agents:
  - name: "Gemini"
    slug: "gemini"
source_platform: "itch.io"
source_date: "Undated"
source_url: "https://itch.io/devlog/983711/gemini-something-went-wrong.amp"
fetched_from: "https://agentusecases.ai/use-case/vibe-code-an-html5-browser-game"
---

# Vibe code an HTML5 browser game

> The developer of Xenodochium built the game with Gemini, hit repeated errors, and worked around them by starting a fresh chat.

**Category:** Games & Simulations  
**Agent:** Gemini  
**Source:** itch.io · Undated

## What they did

The developer talked Gemini through the goal, expectations and existing code, then narrowed the scope over a few prompts before asking for output. Gemini returned an updated script, then the chat kept failing with a generic error. The developer opened a new chat, fed it all the related scripts plus the error, and iterated on its fixes until one worked.

## How it went

They ended up with a working inventory manager for basic resources, with placeholders for more complex items. Along the way Gemini's fixes introduced new errors, and its internal markup leaked into the code output.

## Worth knowing

Chats can stall with 'Something went wrong'. Starting a fresh chat and re-supplying all related scripts got past it. The developer is considering one chat to draft the prompt and another to write the code.

## Prompt

```text
Help me build an HTML5 browser game called [game name] in this project, where the player [core mechanic]. Start with a minimal playable version using plain HTML, CSS and JavaScript, then add [features] one at a time. After each change, run the game and fix any console errors before continuing. You're done when the game loads and plays with no errors.
```

## Related use cases

- [Orchestrate a multi-phase RAG migration](./orchestrate-a-multi-phase-rag-migration.md)
- [Hunt for unpatched vulnerabilities in SQLite commits](./hunt-for-unpatched-vulnerabilities-in-sqlite-commits.md)
- [Critique blog post drafts for technical errors](./critique-blog-post-drafts-for-technical-errors.md)
- [Play RollerCoaster Tycoon](./play-rollercoaster-tycoon.md)
- [Build retro games with a child using Claude Code](./build-retro-games-with-a-child-using-claude-code.md)
- [Run a D&D dungeon crawl with an AI dungeon master](./run-a-d-d-dungeon-crawl-with-an-ai-dungeon-master.md)
