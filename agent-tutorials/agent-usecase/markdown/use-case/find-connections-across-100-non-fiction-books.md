---
title: "Find connections across 100 non-fiction books"
slug: "find-connections-across-100-non-fiction-books"
summary: "Claude Code browses a personal library with CLI tools and surfaces trails of related excerpts across books. · Jan 10, 2026"
category: "Research & Knowledge"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_url: "https://trails.pieterma.es/"
fetched_from: "https://agentusecases.ai/use-case/find-connections-across-100-non-fiction-books"
---

# Find connections across 100 non-fiction books

> Claude Code browses a personal library with CLI tools and surfaces trails of related excerpts across books. · Jan 10, 2026

**Category:** Research & Knowledge  
**Agent:** Claude Code

## What they did

Pieter Maes pointed Claude Code at his personal library of non-fiction books. It automatically found thematic links across them and grouped them into named trails. Each trail has a short thesis, related concepts, and the books it draws on. The results are published as a browsable site with a books index.

## How it went

The site shows dozens of trails, such as Useful Lies, Pacemaker Principle and Proxy Trap. Each one links five books that would not normally be read together. The page doesn't say how the trails were checked.

## Worth knowing

The page doesn't describe the tooling or its cost. The full method is in the author's linked explainer, so read that before copying the setup.

## Prompt

```text
I have a folder of about [number] non-fiction books as [epub/pdf/txt] files at [folder path]. Index them so you can search across them, then find connections between books on the theme of [topic or question]. Give me 5 trails of related excerpts, each with the book title, the quote, and one sentence on how it links to the next, and stop once I have those 5 trails.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Search years of research files in an Obsidian vault](./search-years-of-research-files-in-an-obsidian-vault.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Run persistent financial research with an agent](./run-persistent-financial-research-with-an-agent.md)
- [Catalog and summarize papers dropped into Drive](./catalog-and-summarize-papers-dropped-into-drive.md)
- [Research Reddit customer pain points with a skill](./research-reddit-customer-pain-points-with-a-skill.md)
