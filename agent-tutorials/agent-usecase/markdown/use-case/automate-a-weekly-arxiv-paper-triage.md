---
title: "Automate a weekly arXiv paper triage"
slug: "automate-a-weekly-arxiv-paper-triage"
summary: "A weekly Codex automation searches arXiv for keywords, logs new papers to a CSV, sorts them into keep/skim/drop buckets and can check claims against Zotero."
category: "Research & Knowledge"
agents:
  - name: "Codex"
    slug: "codex"
source_platform: "aisagroup.substack.com"
source_date: "Undated"
source_url: "https://aisagroup.substack.com/p/how-i-use-codex-to-automate-parts"
fetched_from: "https://agentusecases.ai/use-case/automate-a-weekly-arxiv-paper-triage"
---

# Automate a weekly arXiv paper triage

> A weekly Codex automation searches arXiv for keywords, logs new papers to a CSV, sorts them into keep/skim/drop buckets and can check claims against Zotero.

**Category:** Research & Knowledge  
**Agent:** Codex  
**Source:** aisagroup.substack.com · Undated

## What they did

A weekly Codex automation searches arXiv for the author's keywords, such as AI alignment. It saves results to a CSV so only new papers are triaged each run. Each paper gets a label: keep, skim, drop, duplicate, outside scope or weak method. Promising ones go to a Zotero inbox, where they are embedded in a vector database. The author reads the papers himself.

## How it went

The author says that checking claims against scoped Zotero collections leads to fewer hallucinated related-work citations and less double-checking. The post gives no numbers, and he stresses that he still verifies the evidence himself.

## Worth knowing

Start with this triage workflow before automating more, since maintaining an over-built system can cost more time than it saves. The post doesn't explain how Zotero connects to the vector database.

## Prompt

```text
Set up a weekly automation that searches arXiv for new papers matching [keywords or topics], logs them to a CSV with title, authors, date, link, and one-line summary, and sorts each into keep, skim, or drop based on [my research interests]. Stop when the CSV is updated and give me the keep list. Don't delete past entries.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Build a racing game from a single prompt](./build-a-racing-game-from-a-single-prompt.md)
- [Spin up a second agent as an independent QA reviewer](./spin-up-a-second-agent-as-an-independent-qa-reviewer.md)
- [Find connections across 100 non-fiction books](./find-connections-across-100-non-fiction-books.md)
- [Turn any URL into a structured Notion note](./turn-any-url-into-a-structured-notion-note.md)
- [Measure how long jobs stay open at tech companies](./measure-how-long-jobs-stay-open-at-tech-companies.md)
