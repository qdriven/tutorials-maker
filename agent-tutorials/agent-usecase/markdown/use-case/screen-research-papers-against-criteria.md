---
title: "Screen research papers against criteria"
slug: "screen-research-papers-against-criteria"
summary: "Codex reads a folder of PDFs to find articles that disagree with an argument, screens about fifty papers for a systematic review, and cleans messy CSV or Excel files."
category: "Research & Knowledge"
agents:
  - name: "Codex"
    slug: "codex"
source_platform: "X"
source_date: "Undated"
source_url: "https://x.com/MushtaqBilalPhD/article/2054565093430493609"
fetched_from: "https://agentusecases.ai/use-case/screen-research-papers-against-criteria"
---

# Screen research papers against criteria

> Codex reads a folder of PDFs to find articles that disagree with an argument, screens about fifty papers for a systematic review, and cleans messy CSV or Excel files.

**Category:** Research & Knowledge  
**Agent:** Codex  
**Source:** X · Undated

## What they did

User installs Codex app, opens a project folder containing PDFs or CSVs, and creates or lets Codex generate an AGENTS.md file with role, standards, and task instructions. Codex is given access to read all files in the folder, then prompted to screen papers against inclusion/exclusion criteria, identify articles disagreeing with a pasted argument, or clean a messy CSV/Excel file; it extracts information, builds tables or new files, and requests permission for actions like renaming or saving.

## How it went

Codex outputs results as tables or new markdown/Word/Excel files in the folder. User must still verify screening and results before relying on them, as Codex handles labor-intensive extraction but not final judgment.

## Worth knowing

Set Codex to ask permission before editing files; results require manual verification.

## Prompt

```text
Read all the PDFs in [folder] and screen them against these criteria: [inclusion and exclusion criteria, or the argument to test]. Produce a table with each paper, include or exclude, and a one-line reason with a quote. Finish when every paper is covered, and flag unclear ones for me rather than guessing.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Build a racing game from a single prompt](./build-a-racing-game-from-a-single-prompt.md)
- [Spin up a second agent as an independent QA reviewer](./spin-up-a-second-agent-as-an-independent-qa-reviewer.md)
- [Find connections across 100 non-fiction books](./find-connections-across-100-non-fiction-books.md)
- [Turn any URL into a structured Notion note](./turn-any-url-into-a-structured-notion-note.md)
- [Measure how long jobs stay open at tech companies](./measure-how-long-jobs-stay-open-at-tech-companies.md)
