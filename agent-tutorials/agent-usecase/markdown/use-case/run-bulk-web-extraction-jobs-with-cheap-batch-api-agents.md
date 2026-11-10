---
title: "Run bulk web-extraction jobs with cheap batch-API agents"
slug: "run-bulk-web-extraction-jobs-with-cheap-batch-api-agents"
summary: "A developer uses coding agents for daily work and sets up cheap agents-SDK jobs on batch APIs for large runs like visiting 5000 websites to extract data, plus recurring cloud agent jobs."
category: "Research & Knowledge"
agents:
  - name: "Claude Code"
    slug: "claude-code"
  - name: "Codex"
    slug: "codex"
  - name: "Meta Muse"
    slug: "meta-muse"
source_platform: "HN"
source_date: "Nov 4, 2026"
source_url: "https://news.ycombinator.com/item?id=50367744"
fetched_from: "https://agentusecases.ai/use-case/run-bulk-web-extraction-jobs-with-cheap-batch-api-agents"
---

# Run bulk web-extraction jobs with cheap batch-API agents

> A developer uses coding agents for daily work and sets up cheap agents-SDK jobs on batch APIs for large runs like visiting 5000 websites to extract data, plus recurring cloud agent jobs.

**Category:** Research & Knowledge  
**Agent:** Claude Code, Codex, Meta Muse  
**Source:** HN · Nov 4, 2026

## What they did

For large extraction runs, such as visiting 5000 websites and pulling something from each, the developer builds a cheap job with an agents SDK instead of using a main coding agent. The model is Muse, Deepseek, or GPT-6-luna, called through its batch API. Recurring work goes to cloud agents. Dotfiles and agent context live in a GitHub repo so harnesses and providers are easy to switch.

## How it went

The source gives no results or numbers for the bulk runs themselves. It only describes the setup and why it was chosen: cost. Nothing is said about accuracy or failures.

## Worth knowing

Batch APIs on cheaper models keep large runs inexpensive, but the comment gives no actual costs or turnaround times.

## Prompt

```text
I have a list of [number] websites in [file name or path]. Write a script that visits each one and extracts [the data fields you want, e.g. pricing, contact email, product list] into a single CSV, running it as a batch job to keep costs low. Test it on 10 sites first and show me the results and an estimated cost before starting the full run; you are done when the CSV has one row per site with failures logged separately.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Email scheduled project summaries with Codex](./email-scheduled-project-summaries-with-codex.md)
- [Book the best-priced flight and later refund it](./book-the-best-priced-flight-and-later-refund-it.md)
- [Run persistent financial research with an agent](./run-persistent-financial-research-with-an-agent.md)
- [Turn any URL into a structured Notion note](./turn-any-url-into-a-structured-notion-note.md)
- [Survey AI product names with a swarm of search agents](./survey-ai-product-names-with-a-swarm-of-search-agents.md)
