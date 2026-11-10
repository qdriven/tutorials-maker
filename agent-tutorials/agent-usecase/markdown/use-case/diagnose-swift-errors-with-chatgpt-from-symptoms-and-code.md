---
title: "Diagnose Swift errors with ChatGPT from symptoms and code"
slug: "diagnose-swift-errors-with-chatgpt-from-symptoms-and-code"
summary: "A Swift developer feeds error symptoms and code to ChatGPT to get a starting lead on the cause, then reviews the code it produces."
category: "Software & DevOps"
agents:
  - name: "ChatGPT"
    slug: "chatgpt"
source_platform: "HN"
source_date: "Dec 9, 2025"
source_url: "https://news.ycombinator.com/item?id=46201198"
fetched_from: "https://agentusecases.ai/use-case/diagnose-swift-errors-with-chatgpt-from-symptoms-and-code"
---

# Diagnose Swift errors with ChatGPT from symptoms and code

> A Swift developer feeds error symptoms and code to ChatGPT to get a starting lead on the cause, then reviews the code it produces.

**Category:** Software & DevOps  
**Agent:** ChatGPT  
**Source:** HN · Dec 9, 2025

## What they did

The developer writes Swift and pastes an error's symptoms along with the relevant code into ChatGPT, asking what it thinks is going on. They use it like Stack Overflow, but faster and interactive. They review all the code it gives back and have not yet used any of it verbatim.

## How it went

Per the commenter, it usually gives a good starting point in about half a minute, versus roughly half an hour working it out alone. They found it better than Claude for Swift and it picked up their style.

## Worth knowing

Treat the answer as a lead, not a fix: the author still reviews everything and hasn't used generated code verbatim.

## Prompt

```text
I'm getting this error in my [language/framework] project: [paste error message or describe symptoms]. Here is the relevant code: [paste code or file path]. Find the most likely causes ranked by probability, tell me how to confirm each, and propose a minimal fix as a diff. Don't apply any changes until I've reviewed the diff.
```

## Related use cases

- [Generate LEGO CAD models in LDraw with AI agents](./generate-lego-cad-models-in-ldraw-with-ai-agents.md)
- [Generate a spoken daily news bulletin at home](./generate-a-spoken-daily-news-bulletin-at-home.md)
- [Find SEO competitors with ChatGPT Pro agent](./find-seo-competitors-with-chatgpt-pro-agent.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a budgeting app from a single prompt](./build-a-budgeting-app-from-a-single-prompt.md)
- [Spin up a second agent as an independent QA reviewer](./spin-up-a-second-agent-as-an-independent-qa-reviewer.md)
