---
title: "Test a browser agent on web games"
slug: "test-a-browser-agent-on-web-games"
summary: "Researchers had ChatGPT Atlas's browser agent play T-Rex Runner, Sudoku, Flappy Bird and Stein.world; it did well on logic puzzles like Sudoku, finishing faster than humans."
category: "Games & Simulations"
agents:
  - name: "ChatGPT"
    slug: "chatgpt"
source_platform: "arxiv.org"
source_date: "Undated"
source_url: "https://arxiv.org/html/2510.26298v1"
fetched_from: "https://agentusecases.ai/use-case/test-a-browser-agent-on-web-games"
---

# Test a browser agent on web games

> Researchers had ChatGPT Atlas's browser agent play T-Rex Runner, Sudoku, Flappy Bird and Stein.world; it did well on logic puzzles like Sudoku, finishing faster than humans.

**Category:** Games & Simulations  
**Agent:** ChatGPT  
**Source:** arxiv.org · Undated

## What they did

On each game's page in the ChatGPT Atlas browser, the researchers turned on Agent Mode (Preview) and gave one zero-shot instruction: play until you get stuck. They ran 10 trials per game and did not intervene. The agent worked out the controls itself. For Stein.world, they later added a second prompt that spelled out the keys and the first task.

## How it went

Sudoku took an average of 2m28s with 100% accuracy, against a human baseline of 10-12 minutes. T-Rex averaged 45.5 and Flappy Bird scored 0 in every trial. In Stein.world it only got out of the first room once it was given the detailed prompt.

## Worth knowing

The sample is small and the human baselines are rough, so the authors call the results preliminary. Stein.world needed explicit instructions, and even then the agent spent a long time deliberating before each move.

## Prompt

```text
Open [URL of a web game, e.g. an online Sudoku] and play it through a full round or puzzle. Report how long it took, whether you finished, and where you got stuck. Stop and ask me if the site asks you to log in, sign up or pay.
```

## Related use cases

- [Generate LEGO CAD models in LDraw with AI agents](./generate-lego-cad-models-in-ldraw-with-ai-agents.md)
- [Generate a spoken daily news bulletin at home](./generate-a-spoken-daily-news-bulletin-at-home.md)
- [Find SEO competitors with ChatGPT Pro agent](./find-seo-competitors-with-chatgpt-pro-agent.md)
- [Play RollerCoaster Tycoon](./play-rollercoaster-tycoon.md)
- [Code a 3D plane game in the browser](./code-a-3d-plane-game-in-the-browser.md)
- [Build and grow a mobile game with bots](./build-and-grow-a-mobile-game-with-bots.md)
