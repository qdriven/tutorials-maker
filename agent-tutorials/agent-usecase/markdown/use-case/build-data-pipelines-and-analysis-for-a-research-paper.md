---
title: "Build data pipelines and analysis for a research paper"
slug: "build-data-pipelines-and-analysis-for-a-research-paper"
summary: "A researcher used Claude Code as the main agent to build data pipelines and do the data analysis for a paper, generating over 98% of the code."
category: "Research & Knowledge"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "yang3kc.substack.com"
source_date: "Undated"
source_url: "https://yang3kc.substack.com/p/claude-code-is-secretly-an-excellent"
fetched_from: "https://agentusecases.ai/use-case/build-data-pipelines-and-analysis-for-a-research-paper"
---

# Build data pipelines and analysis for a research paper

> A researcher used Claude Code as the main agent to build data pipelines and do the data analysis for a paper, generating over 98% of the code.

**Category:** Research & Knowledge  
**Agent:** Claude Code  
**Source:** yang3kc.substack.com · Undated

## What they did

Kevin Yang ran Claude Code in the terminal beside Cursor and Jupyter. He had it write a plan in Markdown, then a more detailed plan for each component (cleaning, two research questions, outputs), then one script per step. He gave it parquet-tools through CLAUDE.md so it could inspect data and check its own output. He reviewed each script and used Git to roll back.

## How it went

He estimates Claude Code wrote over 98% of the paper's code over a few weeks. It still made mistakes, so he reviewed every step. He wrote publication figures himself because describing the tweaks was harder.

## Worth knowing

He used the Pro plan at about $17 a month on yearly billing, with Sonnet 4. When he hit rate limits he switched to his own API key.

## Prompt

```text
Help me build the data pipeline and analysis for my research project on [topic]. The raw data is in [folder or file], and I want to [cleaning, merging, and statistical tests or models]. Write clean, documented scripts, run them, and save the outputs and figures to [output folder] with a README explaining each step so I can check the results. Ask me before deleting or overwriting any existing files.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Search years of research files in an Obsidian vault](./search-years-of-research-files-in-an-obsidian-vault.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Run persistent financial research with an agent](./run-persistent-financial-research-with-an-agent.md)
- [Catalog and summarize papers dropped into Drive](./catalog-and-summarize-papers-dropped-into-drive.md)
- [Research Reddit customer pain points with a skill](./research-reddit-customer-pain-points-with-a-skill.md)
