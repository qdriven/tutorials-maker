---
title: "Collect international grant listings into Airtable"
slug: "collect-international-grant-listings-into-airtable"
summary: "A user has a Zapier agent scrape the web for grants from different countries and upload them to Airtable, and is still tuning it."
category: "Research & Knowledge"
agents:
  - name: "Zapier Agents"
    slug: "zapier-agents"
source_platform: "Reddit"
source_date: "Undated"
source_url: "https://www.reddit.com/r/zapier/comments/1i787nl/tips_and_tricks_needed_for_zapier_agents"
fetched_from: "https://agentusecases.ai/use-case/collect-international-grant-listings-into-airtable"
---

# Collect international grant listings into Airtable

> A user has a Zapier agent scrape the web for grants from different countries and upload them to Airtable, and is still tuning it.

**Category:** Research & Knowledge  
**Agent:** Zapier Agents  
**Source:** Reddit · Undated

## What they did

The poster had just started using Zapier Agents for a film-funding blog and resource site. They set the agent to scrape the web for grant listings from different countries and upload those records into Airtable, but said they were still new to it and were looking for better ways to instruct the agent because part of the issue might be their prompts.

## How it went

They said the setup was already pretty good but not perfect. No results, counts, or specific failures were given beyond the need to keep tuning how the agent is instructed.

## Worth knowing

The main catch they mention is that prompt quality seems to be the limiting factor, and they were still learning how to guide the agent well.

## Prompt

```text
Create an agent that searches the web each [week] for open grants for [type of organization or project] from [list of countries], and adds each one to my Airtable base [base name] with fields for name, funder, country, deadline, amount, eligibility, and link. Skip any grant already in the table and leave unknown fields blank rather than guessing. It's finished when a test run adds at least [number] new, accurate rows and I've reviewed them.
```

## Related use cases

- [Find an NYC apartment with a listing-watching agent](./find-an-nyc-apartment-with-a-listing-watching-agent.md)
- [Turn new Gmail emails into Notion CRM leads](./turn-new-gmail-emails-into-notion-crm-leads.md)
- [Collect and summarize async standup updates](./collect-and-summarize-async-standup-updates.md)
- [Find connections across 100 non-fiction books](./find-connections-across-100-non-fiction-books.md)
- [Catalog and summarize papers dropped into Drive](./catalog-and-summarize-papers-dropped-into-drive.md)
- [Measure how long jobs stay open at tech companies](./measure-how-long-jobs-stay-open-at-tech-companies.md)
