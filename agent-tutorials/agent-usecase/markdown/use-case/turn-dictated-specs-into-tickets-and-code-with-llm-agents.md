---
title: "Turn dictated specs into tickets and code with LLM agents"
slug: "turn-dictated-specs-into-tickets-and-code-with-llm-agents"
summary: "A developer dictates a spec, has LLMs densify it, then plan and scaffold the project, and an agent files implementation tickets per module."
category: "Software & DevOps"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_platform: "HN"
source_date: "Oct 31, 2026"
source_url: "https://news.ycombinator.com/item?id=50314175"
fetched_from: "https://agentusecases.ai/use-case/turn-dictated-specs-into-tickets-and-code-with-llm-agents"
---

# Turn dictated specs into tickets and code with LLM agents

> A developer dictates a spec, has LLMs densify it, then plan and scaffold the project, and an agent files implementation tickets per module.

**Category:** Software & DevOps  
**Agent:** custom-built or unnamed agent  
**Source:** HN · Oct 31, 2026

## What they did

The developer dictates a rambling spec, Whisper transcribes it, and an LLM condenses it into a structured markdown spec filed as issue 1. After human edits and another LLM densifying pass, an LLM writes a plan and scaffolding. An agent files per-module tickets, parallel agents write commit-level tasks and implement them as PRs, and an adversarial reviewer plus rework agents iterate.

## How it went

The author reports quite good results, with most PRs landing as-is and occasional corrections when the agent took the wrong approach. No numbers are given; the author says it is far cheaper than human developers despite many parallel agents and CI runs.

## Worth knowing

Works best when code is highly modular so agents rarely cross modules; the author keeps shared workflow, style, and lint policies in one repo vendored into each project.

## Prompt

```text
I'm going to paste a rough, dictated spec for [project idea]. First rewrite it into a tight, complete spec and list any open questions for me. Then propose a module-by-module plan, scaffold the project in [language/framework], and write one implementation ticket per module as a markdown file in a tickets folder, each with scope, acceptance criteria, and dependencies. Stop when the scaffold runs and every module has a ticket, then show me the list before doing any more work.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Configure a local AI lab and build a knowledge graph by chat](./configure-a-local-ai-lab-and-build-a-knowledge-graph-by-chat.md)
- [Build a Pong game and website from scratch](./build-a-pong-game-and-website-from-scratch.md)
- [Migrate a password reset flow to modern libraries](./migrate-a-password-reset-flow-to-modern-libraries.md)
- [Point a computer-using bot at any repo](./point-a-computer-using-bot-at-any-repo.md)
- [Migrate a website from a CMS to raw code and Markdown](./migrate-a-website-from-a-cms-to-raw-code-and-markdown.md)
