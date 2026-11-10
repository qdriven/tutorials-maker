---
title: "Write and debug code across eight test tasks"
slug: "write-and-debug-code-across-eight-test-tasks"
summary: "A reviewer had Manus build a currency converter, fix a find_max bug and make a landing page, with mostly strong results."
category: "Software & DevOps"
agents:
  - name: "Manus"
    slug: "manus"
source_platform: "secondtalent.com"
source_date: "Undated"
source_url: "https://www.secondtalent.com/resources/manus-ai-coding-review/"
fetched_from: "https://agentusecases.ai/use-case/write-and-debug-code-across-eight-test-tasks"
---

# Write and debug code across eight test tasks

> A reviewer had Manus build a currency converter, fix a find_max bug and make a landing page, with mostly strong results.

**Category:** Software & DevOps  
**Agent:** Manus  
**Source:** secondtalent.com · Undated

## What they did

The reviewer gave Manus eight self-contained prompts in September 2025. They included a Python currency converter, a broken find_max function, a bubble sort walkthrough, a landing page, a React scaffold and a Guess Who game. Each output was scored on the same checks: whether it ran, edge cases, validation, explanation, accessibility and sample output.

## How it went

Manus averaged 4.69 out of 5 and scored 5 on four tasks, including the find_max fix, where it found all three bugs. It lost points for skipping explanations, never running its JavaScript, weak email validation and a Guess Who game that only understood keyword questions.

## Worth knowing

Tests ran on an early Manus version, before 1.5 and 1.6. Every lost point was something a developer review would catch, so plan for a review pass.

## Prompt

```text
Write a [small program, e.g. currency converter in Python] that [requirements]. Then review this code for bugs and fix them: [paste code]. Run it with a few test cases and give me the final code, the test results and a one-paragraph explanation of what you changed.
```

## Related use cases

- [Compile journalist lists and search apartment listings](./compile-journalist-lists-and-search-apartment-listings.md)
- [Make an AI trends presentation](./make-an-ai-trends-presentation.md)
- [Run varied business tasks through a general agent](./run-varied-business-tasks-through-a-general-agent.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Click through apps to verify its own work](./click-through-apps-to-verify-its-own-work.md)
- [Point a computer-using bot at any repo](./point-a-computer-using-bot-at-any-repo.md)
