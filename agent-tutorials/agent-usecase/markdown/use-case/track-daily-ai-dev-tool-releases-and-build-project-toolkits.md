---
title: "Track daily AI dev tool releases and build project toolkits"
slug: "track-daily-ai-dev-tool-releases-and-build-project-toolkits"
summary: "Built with Claude Code, a tool scrapes sources around the clock, classifies finds with AI, scores legitimacy, and generates a project toolkit with a CLAUDE.md."
category: "Software & DevOps"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "Reddit"
source_date: "Undated"
source_url: "https://www.reddit.com/r/ClaudeAI/comments/1s7yiwh/i_used_claude_code_to_build_a_tool_that_tracks"
fetched_from: "https://agentusecases.ai/use-case/track-daily-ai-dev-tool-releases-and-build-project-toolkits"
---

# Track daily AI dev tool releases and build project toolkits

> Built with Claude Code, a tool scrapes sources around the clock, classifies finds with AI, scores legitimacy, and generates a project toolkit with a CLAUDE.md.

**Category:** Software & DevOps  
**Agent:** Claude Code  
**Source:** Reddit · Undated

## What they did

They built a site with Claude Code that continuously scrapes GitHub, Reddit, X, Hacker News, blogs, startups, and similar sources for new AI developer tools, then uses AI to classify each find and assign a legitimacy score. Claude Code acted as project manager across three parallel Claude Code sessions for backend scrapers, frontend, and a RAG layer, while scraping and classification agents ran through Claude CLI on a VM.

## How it went

At the time of the post it had indexed 329 resources across 14 categories and was free to use. The creator says the Toolkit Generator could suggest project-specific, non-obvious tools and produce a CLAUDE.md plus install commands, but the post gives no broader performance metrics.

## Worth knowing

The main catch is scale was still early: 329 indexed resources so far, with the creator expecting thousands later as the 24/7 scraping continued.

## Prompt

```text
Build me a small tool that checks [list of sources, e.g. GitHub trending, Hacker News, release blogs] every day for new [type of dev tools]. Have it classify each find by category, score how legitimate it looks, and save a daily digest to [folder]. Done when one full run produces a digest file and a README explaining how to schedule it.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Index a newsletter archive and repurpose writing](./index-a-newsletter-archive-and-repurpose-writing.md)
- [Build a company structure with Claude Code agents](./build-a-company-structure-with-claude-code-agents.md)
- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Debug prod pods and docker-compose with Cursor](./debug-prod-pods-and-docker-compose-with-cursor.md)
- [Build code with agents while keeping a working understanding](./build-code-with-agents-while-keeping-a-working-understanding.md)
