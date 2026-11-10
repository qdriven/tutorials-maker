---
title: "Split frontend and backend coding between Claude and Codex"
slug: "split-frontend-and-backend-coding-between-claude-and-codex"
summary: "A developer uses Claude Design for front-end work and Codex for backend work, after finding OpenClaw and Hermes fell apart on real work."
category: "Software & DevOps"
agents:
  - name: "Claude"
    slug: "claude"
  - name: "Codex"
    slug: "codex"
  - name: "OpenClaw"
    slug: "openclaw"
  - name: "Hermes Agent"
    slug: "hermes-agent"
source_platform: "HN"
source_date: "Nov 4, 2026"
source_url: "https://news.ycombinator.com/item?id=50367571"
fetched_from: "https://agentusecases.ai/use-case/split-frontend-and-backend-coding-between-claude-and-codex"
---

# Split frontend and backend coding between Claude and Codex

> A developer uses Claude Design for front-end work and Codex for backend work, after finding OpenClaw and Hermes fell apart on real work.

**Category:** Software & DevOps  
**Agent:** Claude, Codex, OpenClaw, Hermes Agent  
**Source:** HN · Nov 4, 2026

## What they did

The commenter pays for two Claude Ultra and two ChatGPT/Codex Pro accounts, plus a few local models for small jobs like text formatting and TTS. They use the default CLI and desktop apps and built their own tool to combine them. For the past month, Claude Design handles front-end work, given plenty of references, and Codex handles backend work.

## How it went

Codex reliably finishes backend work but designs poorly. Claude designs well but struggles to bring anything to completion. OpenClaw and Hermes fell apart on real work, so they gave up on them.

## Worth knowing

Claude's design quality depends on supplying enough references, and running multiple top-tier subscriptions across both vendors is a real recurring cost.

## Prompt

```text
In [project folder], build the backend for [describe the feature], including [API endpoints, database, or auth needs]. Follow the existing code conventions, run the tests, and write a short note listing the endpoints and data shapes the frontend will need. You are done when the tests pass and that note is saved as [file name].
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Monitor Resy and book date night tables](./monitor-resy-and-book-date-night-tables.md)
- [Build Home Assistant automations with Claude](./build-home-assistant-automations-with-claude.md)
- [Review Linux kernel patches](./review-linux-kernel-patches.md)
- [Build a Chrome extension for presenting webinars](./build-a-chrome-extension-for-presenting-webinars.md)
- [Build an RFP analysis tool](./build-an-rfp-analysis-tool.md)
