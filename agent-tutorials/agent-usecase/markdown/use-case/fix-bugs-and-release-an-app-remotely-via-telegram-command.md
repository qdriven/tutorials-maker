---
title: "Fix bugs and release an app remotely via Telegram command"
slug: "fix-bugs-and-release-an-app-remotely-via-telegram-command"
summary: "A commenter tells Gemini over Telegram to fix bugs, test, and release their app while they are away from their laptop."
category: "Software & DevOps"
agents:
  - name: "Gemini"
    slug: "gemini"
source_platform: "Reddit"
source_date: "Undated"
source_url: "https://www.reddit.com/r/GeminiAI/comments/1uf244j/whos_gonna_let_google_use_their_computer"
fetched_from: "https://agentusecases.ai/use-case/fix-bugs-and-release-an-app-remotely-via-telegram-command"
---

# Fix bugs and release an app remotely via Telegram command

> A commenter tells Gemini over Telegram to fix bugs, test, and release their app while they are away from their laptop.

**Category:** Software & DevOps  
**Agent:** Gemini  
**Source:** Reddit · Undated

## What they did

A commenter says they already let a Hermes agent have full access to their MacBook and control it while the laptop stays powered on. They send commands through Telegram from elsewhere, and the agent works on the machine remotely; the examples they give are fixing bugs, running tests, and releasing an app, with no manual laptop access needed during those tasks.

## How it went

The source only claims it works well enough that they can do those software tasks while away from the computer. It gives no metrics, tool stack details, or examples of failures beyond the broader thread’s privacy and hallucination concerns.

## Worth knowing

The main catch they mention is that the MacBook has to stay on and powered for the Telegram-driven remote workflow to work.

## Prompt

```text
I'll message you from Telegram while I'm away from my laptop. When I send a bug description for [project name], find the cause in [repo path], fix it, run the tests, and report back with the diff summary and test results. Only build or release the app after I reply with an explicit approval, and never delete anything without asking.
```

## Related use cases

- [Orchestrate a multi-phase RAG migration](./orchestrate-a-multi-phase-rag-migration.md)
- [Vibe code an HTML5 browser game](./vibe-code-an-html5-browser-game.md)
- [Shop Etsy for party supplies within a budget](./shop-etsy-for-party-supplies-within-a-budget.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a budgeting app from a single prompt](./build-a-budgeting-app-from-a-single-prompt.md)
- [Spin up a second agent as an independent QA reviewer](./spin-up-a-second-agent-as-an-independent-qa-reviewer.md)
