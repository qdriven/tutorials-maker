---
title: "Answer data questions and build dashboards from the warehouse"
slug: "answer-data-questions-and-build-dashboards-from-the-warehous"
summary: "Cognition's team uses a Devin variant called DANA to query their data warehouse, build dashboards and answer data questions, and Devin fills out report forms."
category: "Work & Operations"
agents:
  - name: "Devin"
    slug: "devin"
source_platform: "cognition.com"
source_date: "Undated"
source_url: "https://cognition.com/blog/how-cognition-uses-devin-to-build-devin"
fetched_from: "https://agentusecases.ai/use-case/answer-data-questions-and-build-dashboards-from-the-warehous"
---

# Answer data questions and build dashboards from the warehouse

> Cognition's team uses a Devin variant called DANA to query their data warehouse, build dashboards and answer data questions, and Devin fills out report forms.

**Category:** Work & Operations  
**Agent:** Devin  
**Source:** cognition.com · Undated

## What they did

DANA is a Devin variant reached from the web app's agent picker or in Slack with /dana or @Devin !dana. It connects to the warehouse (Redshift, Postgres, Snowflake, BigQuery) through MCP and keeps its own knowledge of the schema. It runs SQL, returns concise answers with seaborn charts, and can build shareable Metabase dashboards.

## How it went

Ad-hoc questions that used to wait days in an engineer's queue can now be answered by anyone in Slack, with the SQL included so the logic can be checked. The post gives no numbers for this.

## Worth knowing

Be specific about metrics, include time periods, and ask for visualizations. Read the SQL that DANA returns to check its logic.

## Prompt

```text
Connect to my data warehouse using the read-only credentials in [config file or env var] and answer this question: [business question, e.g. weekly signups by channel for the last 90 days]. Show me the SQL you used, the result table, and a simple chart or dashboard file I can open. Before running any query that writes or modifies data, stop and ask me; otherwise you're done when I have a verified answer and the query saved in [folder].
```

## Related use cases

- [Hand narrow code changes to Devin for pull requests](./hand-narrow-code-changes-to-devin-for-pull-requests.md)
- [Rewrite a README after a rearchitecture](./rewrite-a-readme-after-a-rearchitecture.md)
- [Turn Slack feedback into PRs and debug infra](./turn-slack-feedback-into-prs-and-debug-infra.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Speed up multifamily deal research and property summaries](./speed-up-multifamily-deal-research-and-property-summaries.md)
- [Build a Telegram bot that sends emails and checks calendar](./build-a-telegram-bot-that-sends-emails-and-checks-calendar.md)
