---
title: "Summarize months of notes in Logseq via CLI agent"
slug: "summarize-months-of-notes-in-logseq-via-cli-agent"
summary: "User points Codex at the Logseq CLI docs so it can query and summarize journals and tagged job-application and project pages."
category: "Research & Knowledge"
agents:
  - name: "Codex"
    slug: "codex"
source_platform: "HN"
source_date: "Jul 13, 2026"
source_url: "https://news.ycombinator.com/item?id=48897407"
fetched_from: "https://agentusecases.ai/use-case/summarize-months-of-notes-in-logseq-via-cli-agent"
---

# Summarize months of notes in Logseq via CLI agent

> User points Codex at the Logseq CLI docs so it can query and summarize journals and tagged job-application and project pages.

**Category:** Research & Knowledge  
**Agent:** Codex  
**Source:** HN · Jul 13, 2026

## What they did

wosk pasted the Logseq CLI documentation, installed alongside Logseq, to Codex, which then knew how to query the graph. It summarizes journals across months and works with tagged pages such as job applications (with status values) and research projects. For version control, wosk exports the .edn file and commits it with git.

## How it went

Codex can summarize months of journals, and tagged blocks make queries natural. wosk calls the whole setup very alpha, though, and does not give any numbers.

## Worth knowing

A markdown-mirror setting gives one-way database-to-markdown sync, which wosk says is convenient for agents; the tooling is alpha, so follow the Discord for changes.

## Prompt

```text
Read the Logseq CLI docs at [URL or path], then query my graph at [path] for journal entries from [date range] and pages tagged [tag, e.g. job-application]. Write a summary of the main themes, open tasks, and status of each project or application. Save it to [file name] and don't edit my notes.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Build a racing game from a single prompt](./build-a-racing-game-from-a-single-prompt.md)
- [Spin up a second agent as an independent QA reviewer](./spin-up-a-second-agent-as-an-independent-qa-reviewer.md)
- [Find connections across 100 non-fiction books](./find-connections-across-100-non-fiction-books.md)
- [Turn any URL into a structured Notion note](./turn-any-url-into-a-structured-notion-note.md)
- [Measure how long jobs stay open at tech companies](./measure-how-long-jobs-stay-open-at-tech-companies.md)
