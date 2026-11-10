---
title: "Save AI Q&A summaries into git repos as persistent notes"
slug: "save-ai-q-a-summaries-into-git-repos-as-persistent-notes"
summary: "A user has ChatGPT use the GitHub MCP server and per-repo AGENTS.md files to write summaries of discussions and decisions into their repos."
category: "Research & Knowledge"
agents:
  - name: "ChatGPT"
    slug: "chatgpt"
source_platform: "HN"
source_date: "Oct 17, 2026"
source_url: "https://news.ycombinator.com/item?id=50128580"
fetched_from: "https://agentusecases.ai/use-case/save-ai-q-a-summaries-into-git-repos-as-persistent-notes"
---

# Save AI Q&A summaries into git repos as persistent notes

> A user has ChatGPT use the GitHub MCP server and per-repo AGENTS.md files to write summaries of discussions and decisions into their repos.

**Category:** Research & Knowledge  
**Agent:** ChatGPT  
**Source:** HN · Oct 17, 2026

## What they did

The user connected ChatGPT to the GitHub MCP server with access to three or four of their repos. Each repo has an AGENTS.md, and a custom instruction tells ChatGPT to read the relevant one at session start or on request. After a long Q&A, they ask it to write a summary into a chosen repo. Files cataloging discussions, decisions and research ideas are referenced from AGENTS.md.

## How it went

The author says the setup took some work but makes the AI much more reliable than relying on its built-in memory. No numbers or specific failures are given.

## Worth knowing

Expect upfront setup: MCP server access, repo permissions, AGENTS.md files, and a custom instruction before this works.

## Prompt

```text
Connect to my GitHub repo [owner/repo] and read its AGENTS.md for where notes belong. At the end of our conversation about [topic], write a short summary of the question, the options we weighed, and the decision we reached into a new markdown file at [notes folder path]. Show me the file contents and target path before you commit anything, and stop once I approve and the commit is made.
```

## Related use cases

- [Generate LEGO CAD models in LDraw with AI agents](./generate-lego-cad-models-in-ldraw-with-ai-agents.md)
- [Compile and filter apartment listings](./compile-and-filter-apartment-listings.md)
- [Find SEO competitors with ChatGPT Pro agent](./find-seo-competitors-with-chatgpt-pro-agent.md)
- [Find connections across 100 non-fiction books](./find-connections-across-100-non-fiction-books.md)
- [Grade Cursor on a real data science project](./grade-cursor-on-a-real-data-science-project.md)
- [Survey AI product names with a swarm of search agents](./survey-ai-product-names-with-a-swarm-of-search-agents.md)
