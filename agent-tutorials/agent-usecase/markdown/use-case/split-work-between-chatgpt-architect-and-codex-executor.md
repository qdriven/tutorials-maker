---
title: "Split work between ChatGPT architect and Codex executor"
slug: "split-work-between-chatgpt-architect-and-codex-executor"
summary: "The poster built a bridge where ChatGPT plans and reviews while Codex does the local execution work."
category: "Software & DevOps"
agents:
  - name: "ChatGPT"
    slug: "chatgpt"
  - name: "Codex"
    slug: "codex"
source_platform: "Reddit"
source_date: "Undated"
source_url: "https://www.reddit.com/r/OpenAI/comments/1uow2ld/i_built_a_bridge_between_chatgpt_and_codex"
fetched_from: "https://agentusecases.ai/use-case/split-work-between-chatgpt-architect-and-codex-executor"
---

# Split work between ChatGPT architect and Codex executor

> The poster built a bridge where ChatGPT plans and reviews while Codex does the local execution work.

**Category:** Software & DevOps  
**Agent:** ChatGPT, Codex  
**Source:** Reddit · Undated

## What they did

The poster used MCP-style local file access to connect ChatGPT with a local Codex setup, after seeing ChatGPT handle a local CAD task by asking clarifying questions and working with subagents for nearly an hour. They then built a small workflow layer that assigns ChatGPT the planning and review role, while Codex handles local execution steps like touching files, running commands, and checking results, with basic safety boundaries added by the poster.

## How it went

The immediate CAD test showed stronger high-level capability from ChatGPT than Codex, though the CAD output itself was only so-so. The bridge itself is presented as experimental, with no performance numbers yet and the author asking others how they would design the workflow.

## Worth knowing

It was built for the Windows version of Codex, and the author said using computer-use directly inside native apps like the ChatGPT desktop app usually failed, so they bypassed that with Codex web Chrome control.

## Prompt

```text
I'm using ChatGPT as the planner and reviewer for [project or repo path], and you're the executor. Read the plan I paste below, carry it out step by step in the local repo, and run [tests or build command] after each step. When finished, give me a short summary of what changed, the files touched, and any test results that I can paste back to ChatGPT for review. Pause and ask me before deleting files or pushing anything. Plan: [paste plan from ChatGPT]
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Analyze budgets and research investments from bank data](./analyze-budgets-and-research-investments-from-bank-data.md)
- [Order from a restaurant menu photo with ChatGPT](./order-from-a-restaurant-menu-photo-with-chatgpt.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Click through apps to verify its own work](./click-through-apps-to-verify-its-own-work.md)
- [Build a multilingual typing app for language learning](./build-a-multilingual-typing-app-for-language-learning.md)
