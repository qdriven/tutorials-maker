---
title: "Use Claude Code as an agentic tutor in your learning environment"
slug: "use-claude-code-as-an-agentic-tutor-in-your-learning-environ"
summary: "The author gave Claude Code a tutor role with a CLAUDE.md brief so it could explain concepts and interact with his learning environment."
category: "Research & Knowledge"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "rmoff.net"
source_date: "Feb 20, 2026"
source_url: "https://rmoff.net/2026/02/20/claude-the-instructor/"
fetched_from: "https://agentusecases.ai/use-case/use-claude-code-as-an-agentic-tutor-in-your-learning-environ"
---

# Use Claude Code as an agentic tutor in your learning environment

> The author gave Claude Code a tutor role with a CLAUDE.md brief so it could explain concepts and interact with his learning environment.

**Category:** Research & Knowledge  
**Agent:** Claude Code  
**Source:** rmoff.net · Feb 20, 2026

## What they did

The author gave Claude his old SQL pipeline blog post and gists, then had it write a CLAUDE.md telling it to teach him dbt instead of just migrating the code. Claude explained concepts, gave skeletons for him to fill in, and ran installs and diagnostics. He stepped in whenever it started building things itself.

## How it went

He learned dbt by migrating his pipeline and called it great. Claude kept jumping ahead to build things, suggested shortcuts like SELECT *, and invented column values until challenged. He let it write the Dagster Python.

## Worth knowing

Expect to keep correcting Claude's urge to just do the work. The author also notes it can mislead, so check its claims, especially on newer or niche technology.

## Prompt

```text
Act as my tutor for [subject, e.g. Rust or linear algebra] inside this project folder. First write a CLAUDE.md that says: explain concepts at [my level], ask me questions before giving answers, and use the files, notebooks and exercises in this folder as teaching material. Then read the folder and start with a short lesson on [first topic] followed by one exercise for me. Don't change or delete my files without asking me first.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Link journal entries and write book reviews in Obsidian](./link-journal-entries-and-write-book-reviews-in-obsidian.md)
- [Produce a finished music release from one chat](./produce-a-finished-music-release-from-one-chat.md)
- [Run persistent financial research with an agent](./run-persistent-financial-research-with-an-agent.md)
- [Catalog and summarize papers dropped into Drive](./catalog-and-summarize-papers-dropped-into-drive.md)
- [Research Reddit customer pain points with a skill](./research-reddit-customer-pain-points-with-a-skill.md)
