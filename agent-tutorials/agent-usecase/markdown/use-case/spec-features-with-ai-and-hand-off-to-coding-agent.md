---
title: "Spec features with AI and hand off to coding agent"
slug: "spec-features-with-ai-and-hand-off-to-coding-agent"
summary: "Author discusses a spec with an AI agent or ChatGPT, then hands it to an agent to code, and tests the outcome instead of reading every line."
category: "Software & DevOps"
agents:
  - name: "ChatGPT"
    slug: "chatgpt"
source_platform: "HN"
source_date: "Feb 16, 2026"
source_url: "https://news.ycombinator.com/item?id=47033624"
fetched_from: "https://agentusecases.ai/use-case/spec-features-with-ai-and-hand-off-to-coding-agent"
---

# Spec features with AI and hand off to coding agent

> Author discusses a spec with an AI agent or ChatGPT, then hands it to an agent to code, and tests the outcome instead of reading every line.

**Category:** Software & DevOps  
**Agent:** ChatGPT  
**Source:** HN · Feb 16, 2026

## What they did

The author first talks through a feature with an AI agent or ChatGPT to produce a thorough spec. That spec then goes to a coding agent, which writes the code. The author doesn't read every line of the output; instead they test the result thoroughly themselves.

## How it went

The author says they ship better-quality applications much faster, and that the AI handles edge cases and best practices they might have missed. Bugs that remain, like unexpected data, are ones they'd have written too.

## Worth knowing

Since review happens through testing rather than reading code, the quality of your tests, especially with unexpected input data, decides whether bugs get caught.

## Prompt

```text
I want to add [feature] to this project. First interview me with questions until you can write a clear spec, and save it as SPEC.md. Then implement it and write tests that check the behavior. Finished means the tests pass and you give me a short list of steps to try the feature myself. Ask before deleting files or changing the database.
```

## Related use cases

- [Generate LEGO CAD models in LDraw with AI agents](./generate-lego-cad-models-in-ldraw-with-ai-agents.md)
- [Generate a spoken daily news bulletin at home](./generate-a-spoken-daily-news-bulletin-at-home.md)
- [Find SEO competitors with ChatGPT Pro agent](./find-seo-competitors-with-chatgpt-pro-agent.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a budgeting app from a single prompt](./build-a-budgeting-app-from-a-single-prompt.md)
- [Spin up a second agent as an independent QA reviewer](./spin-up-a-second-agent-as-an-independent-qa-reviewer.md)
