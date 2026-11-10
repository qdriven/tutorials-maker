---
title: "Build data analysis reports and dashboards with a coding agent"
slug: "build-data-analysis-reports-and-dashboards-with-a-coding-age"
summary: "A toolkit gives a coding agent a semantic layer and dashboard files so it can query data warehouses and publish in-depth reports and visualizations. · Oct 1, 2026"
category: "Research & Knowledge"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_url: "https://github.com/graphene-data/graphene"
fetched_from: "https://agentusecases.ai/use-case/build-data-analysis-reports-and-dashboards-with-a-coding-age"
---

# Build data analysis reports and dashboards with a coding agent

> A toolkit gives a coding agent a semantic layer and dashboard files so it can query data warehouses and publish in-depth reports and visualizations. · Oct 1, 2026

**Category:** Research & Knowledge  
**Agent:** custom-built or unnamed agent

## What they did

Graphene is an npm CLI that you add to a project, either standalone or inside a repo such as dbt. You define semantic models in .gsql files and pages in markdown files. You start the dev server and prompt your coding agent to answer a question, build a dashboard, or edit the model. The agent writes GSQL queries and chart components, and the CLI checks syntax, renders pages, and prints screenshots so it can iterate.

## How it went

The source gives no measured results. It claims analysis runs 10x faster and that pages look consistent by default, and it lists Snowflake, BigQuery, ClickHouse, Postgres, MotherDuck and DuckDB as supported sources.

## Worth knowing

The Elastic License 2.0 allows free internal use only. Building a commercial product on it needs a separate agreement, and using it without Graphene Cloud requires git and a coding agent.

## Prompt

```text
Help me build a data analysis report from [my data warehouse or data files, e.g. a Postgres database or a folder of CSVs]. First define a simple semantic layer in files, with the key tables, metrics and joins for [my business area]. Then query the data, answer [my main question], and publish a dashboard or report with charts as files in this folder. Stop when I can open the report and each chart lists the query behind it, and ask me before running anything that writes to the database.
```

## Related use cases

- [Find connections across 100 non-fiction books](./find-connections-across-100-non-fiction-books.md)
- [Link journal entries and write book reviews in Obsidian](./link-journal-entries-and-write-book-reviews-in-obsidian.md)
- [Catalog and summarize papers dropped into Drive](./catalog-and-summarize-papers-dropped-into-drive.md)
- [Run scheduled AI deep research on stock watchlists](./run-scheduled-ai-deep-research-on-stock-watchlists.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Research hedge fund portfolios from 13F filings](./research-hedge-fund-portfolios-from-13f-filings.md)
