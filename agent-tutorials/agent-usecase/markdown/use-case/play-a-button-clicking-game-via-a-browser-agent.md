---
title: "Play a button-clicking game via a browser agent"
slug: "play-a-button-clicking-game-via-a-browser-agent"
summary: "A developer wired Gemini's Computer Use model to Playwright in Java and had it play a simple button-clicking game to verify click-coordinate scaling."
category: "Games & Simulations"
agents:
  - name: "Gemini"
    slug: "gemini"
source_platform: "glaforge.dev"
source_date: "Nov 3, 2025"
source_url: "https://glaforge.dev/posts/2025/11/03/driving-a-web-browser-with-gemini-computer-use-model-in-java/"
fetched_from: "https://agentusecases.ai/use-case/play-a-button-clicking-game-via-a-browser-agent"
---

# Play a button-clicking game via a browser agent

> A developer wired Gemini's Computer Use model to Playwright in Java and had it play a simple button-clicking game to verify click-coordinate scaling.

**Category:** Games & Simulations  
**Agent:** Gemini  
**Source:** glaforge.dev · Nov 3, 2025

## What they did

Guillaume Laforge built a Java loop around Gemini's computer-use preview model and Playwright's headless Chromium, with a 1000x1000 viewport. The model got a screenshot after every action and returned click actions with coordinates on a normalized 1000x1000 grid. His code scaled those to the viewport and clicked. He built a simple game where a red button moves after each click, and told the agent to click it 10 times and read the score.

## How it went

The agent clicked the moving button and reported a final score of 10, which confirmed the click handling and coordinate scaling worked. The source mentions no failures in this test.

## Worth knowing

Send a fresh screenshot to the model after every action, and wait about a second first so the page has finished rendering. Otherwise the model sees a blank or half-drawn page.

## Prompt

```text
Use browser control to open [URL of a simple web game] and play it by looking at screenshots and clicking, for about [number] moves. Report whether your clicks landed where you intended, and note any mismatch between screenshot coordinates and actual click positions. Stop when you've finished the moves and summarize how it went.
```

## Related use cases

- [Orchestrate a multi-phase RAG migration](./orchestrate-a-multi-phase-rag-migration.md)
- [Hunt for unpatched vulnerabilities in SQLite commits](./hunt-for-unpatched-vulnerabilities-in-sqlite-commits.md)
- [Critique blog post drafts for technical errors](./critique-blog-post-drafts-for-technical-errors.md)
- [Play RollerCoaster Tycoon](./play-rollercoaster-tycoon.md)
- [Build retro games with a child using Claude Code](./build-retro-games-with-a-child-using-claude-code.md)
- [Run a D&D dungeon crawl with an AI dungeon master](./run-a-d-d-dungeon-crawl-with-an-ai-dungeon-master.md)
