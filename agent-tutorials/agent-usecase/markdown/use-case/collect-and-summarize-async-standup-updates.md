---
title: "Collect and summarize async standup updates"
slug: "collect-and-summarize-async-standup-updates"
summary: "Zapier's internal agents gather async standup updates and summarize them, letting teams replace five daily standups with two weekly sessions."
category: "Work & Operations"
agents:
  - name: "Zapier Agents"
    slug: "zapier-agents"
source_platform: "getdx.com"
source_date: "Undated"
source_url: "https://getdx.com/blog/using-ai-to-accelerate-hiring-and-productivity-at-zapier/"
fetched_from: "https://agentusecases.ai/use-case/collect-and-summarize-async-standup-updates"
---

# Collect and summarize async standup updates

> Zapier's internal agents gather async standup updates and summarize them, letting teams replace five daily standups with two weekly sessions.

**Category:** Work & Operations  
**Agent:** Zapier Agents  
**Source:** getdx.com · Undated

## What they did

Andrew Kordampalos's team at Zapier saw daily standups eating too much time. They built two small agents on Zapier's own platform. One pinged each team member for an async update. The other summarized the updates for everyone. Slack was the coordination layer, and new agents were tested in sandbox channels before going to production.

## How it went

The daily standup turned into a twice-a-week sync almost overnight. The source gives no figures for time saved or summary quality, and says a new agent idea typically takes days to build.

## Worth knowing

Launch the agents in a controlled sandbox channel first and check the signal-to-noise ratio before rolling them out to the team.

## Prompt

```text
Every weekday at [time], collect async standup updates from [Slack channel or form] for [team name]. Summarize them into one post grouped by person, with blockers called out at the top, and list any items that need a decision. Draft the summary and show it to me before posting it to [channel]; the job is done once I approve and it's posted.
```

## Related use cases

- [Find an NYC apartment with a listing-watching agent](./find-an-nyc-apartment-with-a-listing-watching-agent.md)
- [Turn new Gmail emails into Notion CRM leads](./turn-new-gmail-emails-into-notion-crm-leads.md)
- [Generate weekly leadership reports and handle feature requests](./generate-weekly-leadership-reports-and-handle-feature-reques.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Speed up multifamily deal research and property summaries](./speed-up-multifamily-deal-research-and-property-summaries.md)
- [Give an agent a phone number to make and answer calls](./give-an-agent-a-phone-number-to-make-and-answer-calls.md)
