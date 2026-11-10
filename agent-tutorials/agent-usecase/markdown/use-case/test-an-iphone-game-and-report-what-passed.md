---
title: "Test an iPhone game and report what passed"
slug: "test-an-iphone-game-and-report-what-passed"
summary: "Cognition had Devin on GPT-6 Astra test the game Otter Run in a simulator, returning a recording and a report of checks passed and untested areas."
category: "Games & Simulations"
agents:
  - name: "Devin"
    slug: "devin"
source_platform: "openai.com"
source_date: "Undated"
source_url: "https://openai.com/index/cognition-devin-testing-with-astra/"
fetched_from: "https://agentusecases.ai/use-case/test-an-iphone-game-and-report-what-passed"
---

# Test an iPhone game and report what passed

> Cognition had Devin on GPT-6 Astra test the game Otter Run in a simulator, returning a recording and a report of checks passed and untested areas.

**Category:** Games & Simulations  
**Agent:** Devin  
**Source:** openai.com · Undated

## What they did

Devin, Cognition's cloud agent, ran on GPT-6 Astra and tested Otter Run, an iPhone game, in a simulator. It produced two outputs: a recording of the game running, and a report listing the checks that passed and the areas it left untested. Engineers use those outputs to see how the software behaves and what still needs attention.

## How it went

The source gives no pass counts or timings. It presents the example as a step toward engineers reviewing less code by hand, which Cognition expects over time and has not yet shown.

## Worth knowing

The report's list of untested areas shows what the agent did not cover, so you still have to review those parts yourself.

## Prompt

```text
Test my iOS app [app name] in the simulator. Play through [key flows, e.g. launch, first level, pause, game over] and record a screen recording while you do it. Finish with a report listing each check that passed, each failure with steps to reproduce, and areas you did not test. Don't change any code.
```

## Related use cases

- [Hand narrow code changes to Devin for pull requests](./hand-narrow-code-changes-to-devin-for-pull-requests.md)
- [Explore code to write technical documentation](./explore-code-to-write-technical-documentation.md)
- [Turn Slack feedback into PRs and debug infra](./turn-slack-feedback-into-prs-and-debug-infra.md)
- [Play RollerCoaster Tycoon](./play-rollercoaster-tycoon.md)
- [Add a battle-of-Alesia expansion to a 1990s game remake](./add-a-battle-of-alesia-expansion-to-a-1990s-game-remake.md)
- [Run a D&D dungeon crawl with an AI dungeon master](./run-a-d-d-dungeon-crawl-with-an-ai-dungeon-master.md)
