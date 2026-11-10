---
title: "Summarize new arXiv papers into notes with scheduled agents"
slug: "summarize-new-arxiv-papers-into-notes-with-scheduled-agents"
summary: "Scheduled scripts produce a daily arXiv digest, and a nightly script launches Claude Code agents to summarize each saved PDF into a notes folder."
category: "Research & Knowledge"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "chatprd.ai"
source_date: "Undated"
source_url: "https://www.chatprd.ai/how-i-ai/workflows/how-to-automate-academic-research-with-claude-code-and-python-scripts"
fetched_from: "https://agentusecases.ai/use-case/summarize-new-arxiv-papers-into-notes-with-scheduled-agents"
---

# Summarize new arXiv papers into notes with scheduled agents

> Scheduled scripts produce a daily arXiv digest, and a nightly script launches Claude Code agents to summarize each saved PDF into a notes folder.

**Category:** Research & Knowledge  
**Agent:** Claude Code  
**Source:** chatprd.ai · Undated

## What they did

A Python script driven by a topic file searches arXiv each morning, and Google Scholar weekly. It skips papers it has already seen and writes a dated Markdown digest. The user scans the digest and saves worthwhile PDFs into topic source folders. A nightly script then starts a Claude Code agent for each new PDF, using a summary skill, and saves the summary in the matching notes folder.

## How it went

The source gives no measured results. It describes the target as each saved PDF being summarized by the next digest run, with summaries covering method, sample, findings, effect sizes and limitations.

## Worth knowing

Keep the manual PDF selection step. It keeps the summarization queue small, and a vague summary prompt tends to just restate the abstract.

## Prompt

```text
Set up a daily job that fetches new arXiv papers in [categories] matching [keywords] and saves a digest to [folder]. Add a nightly job that launches an agent to summarize each PDF I've saved in [PDF folder] into a markdown note in [notes folder], with key claims, methods, and limitations. Finish by showing me the schedule entries and one sample note.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Link journal entries and write book reviews in Obsidian](./link-journal-entries-and-write-book-reviews-in-obsidian.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Run persistent financial research with an agent](./run-persistent-financial-research-with-an-agent.md)
- [Catalog and summarize papers dropped into Drive](./catalog-and-summarize-papers-dropped-into-drive.md)
- [Research Reddit customer pain points with a skill](./research-reddit-customer-pain-points-with-a-skill.md)
