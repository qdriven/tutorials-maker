---
title: "Turn YouTube videos into cited research notes"
slug: "turn-youtube-videos-into-cited-research-notes"
summary: "The author uses Claude Code with NotebookLM and Obsidian to turn 20 videos into cited notes, audio overviews, a knowledge graph and flashcards."
category: "Research & Knowledge"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "artemxtech.substack.com"
source_date: "Feb 24, 2026"
source_url: "https://artemxtech.substack.com/p/notebooklm-has-a-knowledge-graph"
fetched_from: "https://agentusecases.ai/use-case/turn-youtube-videos-into-cited-research-notes"
---

# Turn YouTube videos into cited research notes

> The author uses Claude Code with NotebookLM and Obsidian to turn 20 videos into cited notes, audio overviews, a knowledge graph and flashcards.

**Category:** Research & Knowledge  
**Agent:** Claude Code  
**Source:** artemxtech.substack.com · Feb 24, 2026

## What they did

The author built a Claude Code skill that drives NotebookLM from the terminal. He searched YouTube with ytcli, picked 20 videos, and added them as sources to a new notebook. He then asked questions that returned cited JSON answers. The results were written into an Obsidian vault as source files, topic files and wikilinked citations. He also generated an audio overview and flashcards.

## How it went

He got a navigable knowledge graph, an audio overview synced to his phone, and 58 flashcards. In his audit, about 60% of citations were strong matches, 31% partial, and 10-15% weak.

## Worth knowing

Treat the citations as a research starting point and check them before citing. Setup takes about 15 minutes and needs Claude Code, an Obsidian vault and a Google account.

## Prompt

```text
Take these YouTube video links [list of URLs] on [topic] and turn them into research notes in my Obsidian vault at [folder path]. For each video, write a summary with citations back to timestamps, then add a note linking the shared concepts across videos and a set of flashcards. Finish when every video has a note and the flashcards are saved in one file.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Link journal entries and write book reviews in Obsidian](./link-journal-entries-and-write-book-reviews-in-obsidian.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Run persistent financial research with an agent](./run-persistent-financial-research-with-an-agent.md)
- [Catalog and summarize papers dropped into Drive](./catalog-and-summarize-papers-dropped-into-drive.md)
- [Research Reddit customer pain points with a skill](./research-reddit-customer-pain-points-with-a-skill.md)
