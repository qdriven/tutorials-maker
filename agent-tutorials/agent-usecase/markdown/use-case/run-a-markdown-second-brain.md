---
title: "Run a markdown second brain"
slug: "run-a-markdown-second-brain"
summary: "A commenter uses Claude Code daily to answer questions, retrieve docs, create files and reorganize a markdown knowledge base synced with git and viewable in Obsidian."
category: "Research & Knowledge"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "Reddit"
source_date: "Undated"
source_url: "https://www.reddit.com/r/ClaudeAI/comments/1n50sne/claude_for_noncoding_stuff"
fetched_from: "https://agentusecases.ai/use-case/run-a-markdown-second-brain"
---

# Run a markdown second brain

> A commenter uses Claude Code daily to answer questions, retrieve docs, create files and reorganize a markdown knowledge base synced with git and viewable in Obsidian.

**Category:** Research & Knowledge  
**Agent:** Claude Code  
**Source:** Reddit · Undated

## What they did

A commenter built a personal “second brain” as a repo of markdown files covering projects, thoughts, and writing, then uses Claude Code on that folder every day. The agent answers questions over the files, retrieves documents, creates new notes, and reorganizes the knowledge base; git handles syncing and the same files are read and edited in Obsidian.

## How it went

They say they use it daily and love the setup, but the thread gives no metrics or detailed limits. The source also does not spell out any human review steps beyond the person using Claude Code on the repo.

## Worth knowing

The practical catch is the stack: markdown files in a git-synced repo, with Obsidian as the interface for reading and writing.

## Prompt

```text
Treat the markdown files in [folder path] as my personal knowledge base. Answer questions from it, find specific documents on request, create new notes, and propose a cleaner folder structure for the existing ones. Show me the proposed reorganization before moving or deleting any files, and commit changes to git once I approve.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Link journal entries and write book reviews in Obsidian](./link-journal-entries-and-write-book-reviews-in-obsidian.md)
- [Produce a finished music release from one chat](./produce-a-finished-music-release-from-one-chat.md)
- [Run persistent financial research with an agent](./run-persistent-financial-research-with-an-agent.md)
- [Catalog and summarize papers dropped into Drive](./catalog-and-summarize-papers-dropped-into-drive.md)
- [Research Reddit customer pain points with a skill](./research-reddit-customer-pain-points-with-a-skill.md)
