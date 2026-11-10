---
title: "Play Wordle in a browser with a computer-using agent"
slug: "play-wordle-in-a-browser-with-a-computer-using-agent"
summary: "Researchers had OpenAI's Computer-Using Agent play NYT Wordle; it solved only 5.36% of about 200 runs, mainly from misreading tile colors."
category: "Games & Simulations"
agents:
  - name: "Operator"
    slug: "operator"
source_platform: "arxiv.org"
source_date: "Undated"
source_url: "https://arxiv.org/abs/2504.15434"
fetched_from: "https://agentusecases.ai/use-case/play-wordle-in-a-browser-with-a-computer-using-agent"
---

# Play Wordle in a browser with a computer-using agent

> Researchers had OpenAI's Computer-Using Agent play NYT Wordle; it solved only 5.36% of about 200 runs, mainly from misreading tile colors.

**Category:** Games & Simulations  
**Agent:** Operator  
**Source:** arxiv.org · Undated

## What they did

The researchers pointed OpenAI's Computer-Using Agent at the New York Times Wordle game. The agent controlled it through a standard computer interface, the way a person would. They ran it over a week of daily Wordle puzzles, across several hundred runs. They watched its behavior to find where it failed.

## How it went

The agent solved only 5.36% of runs. The main failure was that it recognized tile colors inconsistently, and its accuracy depended on the context.

## Prompt

```text
Open [Wordle or another browser word game] and play today's puzzle. After each guess, read the tile colors carefully and state what each letter's color means before choosing the next guess. Stop when you solve it or run out of guesses, then tell me your guesses and any color you were unsure about.
```

## Related use cases

- [Find a toy and start checkout with Operator](./find-a-toy-and-start-checkout-with-operator.md)
- [Test Operator on legal paperwork, party planning and shopping](./test-operator-on-legal-paperwork-party-planning-and-shopping.md)
- [Contact OpenAI support on the user's behalf](./contact-openai-support-on-the-user-s-behalf.md)
- [Play RollerCoaster Tycoon](./play-rollercoaster-tycoon.md)
- [Code a 3D plane game in the browser](./code-a-3d-plane-game-in-the-browser.md)
- [Build and grow a mobile game with bots](./build-and-grow-a-mobile-game-with-bots.md)
