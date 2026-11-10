---
title: "Build searchable knowledge bases from videos and papers"
slug: "build-searchable-knowledge-bases-from-videos-and-papers"
summary: "An OpenClaw agent runs a YouTube summariser and a paper-condensing tool, saving Markdown into two indexed knowledge bases for videos and papers."
category: "Research & Knowledge"
agents:
  - name: "OpenClaw"
    slug: "openclaw"
source_platform: "notesfromzero.substack.com"
source_date: "Undated"
source_url: "https://notesfromzero.substack.com/p/building-knowledge-bases-for-my-openclaw"
fetched_from: "https://agentusecases.ai/use-case/build-searchable-knowledge-bases-from-videos-and-papers"
---

# Build searchable knowledge bases from videos and papers

> An OpenClaw agent runs a YouTube summariser and a paper-condensing tool, saving Markdown into two indexed knowledge bases for videos and papers.

**Category:** Research & Knowledge  
**Agent:** OpenClaw  
**Source:** notesfromzero.substack.com · Undated

## What they did

On the Mac mini where OpenClaw runs, the author installed youtube-summariser with pip and Tobi's QMD with bun, and handled the packages and LLM API keys himself. He then asked the agent, Eve, to learn both tools and build its own YouTube knowledge base. He wired in his paper-fluff-cutter, which saves paper essentials as Markdown that QMD can index.

## How it went

He ended up with two dense, searchable knowledge bases, one for videos and one for papers. The agent answered questions from the YouTube one well. The source gives no numbers or benchmarks.

## Worth knowing

Markdown output is what lets QMD index and search the content easily. The author installed the packages manually instead of having the agent do it.

## Prompt

```text
Set up two Markdown knowledge bases for me, one for videos and one for papers. When I send a [YouTube link or paper PDF/URL], summarize it in [200-300] words with key takeaways, save it as a .md file in the right folder, and update an index file listing title, date, and tags. Confirm each save with the file path, and ask before deleting or overwriting any existing file.
```

## Related use cases

- [Manage 18 agents from a Notion workspace](./manage-18-agents-from-a-notion-workspace.md)
- [Edit video through chat with subtitles and export](./edit-video-through-chat-with-subtitles-and-export.md)
- [Draft messages, fill web forms and prototype sites by chat](./draft-messages-fill-web-forms-and-prototype-sites-by-chat.md)
- [Find connections across 100 non-fiction books](./find-connections-across-100-non-fiction-books.md)
- [Turn any URL into a structured Notion note](./turn-any-url-into-a-structured-notion-note.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
