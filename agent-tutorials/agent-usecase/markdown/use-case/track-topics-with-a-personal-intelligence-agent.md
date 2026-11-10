---
title: "Track topics with a personal intelligence agent"
slug: "track-topics-with-a-personal-intelligence-agent"
summary: "A user turned Claude Code into a personal intelligence agent using CLAUDE.md and skills for data collection and analysis, watching topics and surfacing things they might miss."
category: "Research & Knowledge"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "Reddit"
source_date: "Mar 1, 2026"
source_url: "https://www.reddit.com/r/ClaudeAI/comments/1rc4rdj/i_turned_claude_code_into_a_personal_intelligence"
fetched_from: "https://agentusecases.ai/use-case/track-topics-with-a-personal-intelligence-agent"
---

# Track topics with a personal intelligence agent

> A user turned Claude Code into a personal intelligence agent using CLAUDE.md and skills for data collection and analysis, watching topics and surfacing things they might miss.

**Category:** Research & Knowledge  
**Agent:** Claude Code  
**Source:** Reddit · Mar 1, 2026

## What they did

The user built Signex inside Claude Code to monitor topics they describe in plain language, replacing a manual routine of checking HN, GitHub Trending, Reddit, Product Hunt, arXiv, and other sources. CLAUDE.md sets the agent’s behavior, while separate sensor skills collect data and lens skills analyze it; the user then gives feedback like what to ignore or investigate more deeply, and the system adjusts future reports.

## How it went

After about a week of daily use, the user said it cut their routine from roughly an hour of scanning to a 2-minute report focused on what mattered. The post does not give quantitative results beyond that or describe specific misses or failures.

## Worth knowing

The main catch stated is that this was only described after about a week of use, so the evidence shared is early and anecdotal.

## Prompt

```text
Set up a personal intelligence agent for me. Create a CLAUDE.md that explains I want to track [topics, e.g. my industry, a competitor, a technology] and what counts as important to me, then build a skill that collects recent news and sources on those topics and writes a short briefing in [folder or file]. You're done when I can run one command and get a briefing that highlights the 3 to 5 things I'm most likely to miss.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Link journal entries and write book reviews in Obsidian](./link-journal-entries-and-write-book-reviews-in-obsidian.md)
- [Produce a finished music release from one chat](./produce-a-finished-music-release-from-one-chat.md)
- [Run persistent financial research with an agent](./run-persistent-financial-research-with-an-agent.md)
- [Catalog and summarize papers dropped into Drive](./catalog-and-summarize-papers-dropped-into-drive.md)
- [Research Reddit customer pain points with a skill](./research-reddit-customer-pain-points-with-a-skill.md)
