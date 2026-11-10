---
title: "Run persistent financial research with an agent"
slug: "run-persistent-financial-research-with-an-agent"
summary: "LangAlpha is a Claude Code-style agent for investing research that keeps persistent workspaces and memory so analysis such as models and comps can be updated across sessions. · Apr 14, 2026"
category: "Research & Knowledge"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_url: "https://github.com/ginlix-ai/langalpha"
fetched_from: "https://agentusecases.ai/use-case/run-persistent-financial-research-with-an-agent"
---

# Run persistent financial research with an agent

> LangAlpha is a Claude Code-style agent for investing research that keeps persistent workspaces and memory so analysis such as models and comps can be updated across sessions. · Apr 14, 2026

**Category:** Research & Knowledge  
**Agent:** custom-built or unnamed agent

## What they did

You create one workspace per research goal, such as a Q2 rebalance. The agent interviews you about goals and style, then writes code in a Daytona sandbox to pull financial data and build deliverables like DCF or comps models. It saves files and an agent.md notes file in the workspace. Parallel subagents handle sub-tasks, and you can steer mid-run.

## How it went

The README gives no measured results. It shows a comps run that produced an Excel model and PDF report with implied price ranges for NVDA, AMD and GOOGL. Later sessions resume from the saved files and notes.

## Worth knowing

You can self-host with just Docker and your own LLM key, but without data keys you get reduced Yahoo Finance data. Price-triggered automations and channel integrations are hosted-only.

## Prompt

```text
Create a persistent research workspace for [company or ticker] in [folder]. Gather its latest filings and news, build a simple financial model and a comps table against [peers], and write notes on assumptions in a memory file. Next time I ask, update the model with new data and summarize what changed. Finish by showing the first model and notes.
```

## Related use cases

- [Find connections across 100 non-fiction books](./find-connections-across-100-non-fiction-books.md)
- [Search years of research files in an Obsidian vault](./search-years-of-research-files-in-an-obsidian-vault.md)
- [Turn any URL into a structured Notion note](./turn-any-url-into-a-structured-notion-note.md)
- [Run scheduled AI deep research on stock watchlists](./run-scheduled-ai-deep-research-on-stock-watchlists.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Research hedge fund portfolios from 13F filings](./research-hedge-fund-portfolios-from-13f-filings.md)
