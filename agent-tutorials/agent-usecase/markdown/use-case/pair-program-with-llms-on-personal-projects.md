---
title: "Pair-program with LLMs on personal projects"
slug: "pair-program-with-llms-on-personal-projects"
summary: "The author uses Claude web and Jules (Gemini with GitHub integration) as pair-programming partners, navigating while coding locally and submitting back."
category: "Software & DevOps"
agents:
  - name: "Claude"
    slug: "claude"
source_platform: "HN"
source_date: "Sep 8, 2026"
source_url: "https://news.ycombinator.com/item?id=49605997"
fetched_from: "https://agentusecases.ai/use-case/pair-program-with-llms-on-personal-projects"
---

# Pair-program with LLMs on personal projects

> The author uses Claude web and Jules (Gemini with GitHub integration) as pair-programming partners, navigating while coding locally and submitting back.

**Category:** Software & DevOps  
**Agent:** Claude  
**Source:** HN · Sep 8, 2026

## What they did

The author treats Claude's web interface and Jules (Gemini with a GitHub integration) as remote pair-programming partners. They act mostly as navigator, directing the LLM, and occasionally take the driver's seat by writing code locally and submitting it back to the LLM. The comment adds that paid, locally-running tools give a more interactive session.

## How it went

The source gives no results or numbers. It says only that the usual caveats about AI apply and that outcomes are unpredictable, which the author sees as part of the fun.

## Worth knowing

This works asynchronously rather than side by side, so expect a copy-and-submit workflow unless you pay for locally-running tools.

## Prompt

```text
Act as my pair-programming partner on my project at [path to repo]. I want to [describe the feature or fix]. Start by suggesting a short plan and the files you'd touch, then work in small steps on a new branch, explaining each change. Stop when the change works and tests pass, and show me the diff before committing or pushing anything.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Prospect, score leads and run outbound email sequences](./prospect-score-leads-and-run-outbound-email-sequences.md)
- [Build an anonymous wall of hopes and fears about AI](./build-an-anonymous-wall-of-hopes-and-fears-about-ai.md)
- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Build a Pong game and website from scratch](./build-a-pong-game-and-website-from-scratch.md)
- [Build a project management tool with a 24-hour agent run](./build-a-project-management-tool-with-a-24-hour-agent-run.md)
