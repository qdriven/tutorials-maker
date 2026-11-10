---
title: "Collect financial data on 100 independent schools"
slug: "collect-financial-data-on-100-independent-schools"
summary: "A writer had Operator gather financial data for independent schools in the background; it was slow and was stopped after about 25 schools, then the data went to o1 for analysis."
category: "Research & Knowledge"
agents:
  - name: "Operator"
    slug: "operator"
source_platform: "fullstackeducator.substack.com"
source_date: "Undated"
source_url: "https://fullstackeducator.substack.com/p/ai-agents-in-action"
fetched_from: "https://agentusecases.ai/use-case/collect-financial-data-on-100-independent-schools"
---

# Collect financial data on 100 independent schools

> A writer had Operator gather financial data for independent schools in the background; it was slow and was stopped after about 25 schools, then the data went to o1 for analysis.

**Category:** Research & Knowledge  
**Agent:** Operator  
**Source:** fullstackeducator.substack.com · Undated

## What they did

The writer gave Operator a Google Sheet listing 100 school names, which came from an o3-mini-high query. Operator used its own browser to search ProPublica's Nonprofit Explorer for each school, read the summary financials, and paste them into the sheet. The writer mostly left it running in the background. They then pasted the sheet into o1, which wrote code for an interactive chart dashboard.

## How it went

Operator was very slow and was stopped after about 25 schools. It rounded numbers inconsistently and sometimes picked the wrong organization. o1's dashboard was usable, though basic and needing label fixes, and the writer chose not to share it.

## Worth knowing

Check every row. Operator confused schools with common names and began rounding figures after the first few, so the data needs verifying before you analyze it.

## Prompt

```text
For each of these [type of organization, e.g. independent schools] in [region], collect [data points, e.g. tuition, endowment, revenue] from their public websites and filings: [list or source]. Put results in a spreadsheet with a source link per row and mark any missing values. Start with the first [25] and stop there so I can check quality before you continue.
```

## Related use cases

- [Find a toy and start checkout with Operator](./find-a-toy-and-start-checkout-with-operator.md)
- [Test Operator on legal paperwork, party planning and shopping](./test-operator-on-legal-paperwork-party-planning-and-shopping.md)
- [Contact OpenAI support on the user's behalf](./contact-openai-support-on-the-user-s-behalf.md)
- [Find connections across 100 non-fiction books](./find-connections-across-100-non-fiction-books.md)
- [Turn any URL into a structured Notion note](./turn-any-url-into-a-structured-notion-note.md)
- [Send a daily AI news digest on a schedule](./send-a-daily-ai-news-digest-on-a-schedule.md)
