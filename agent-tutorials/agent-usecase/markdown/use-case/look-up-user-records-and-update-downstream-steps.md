---
title: "Look up user records and update downstream steps"
slug: "look-up-user-records-and-update-downstream-steps"
summary: "A poster used a Zapier agent to find user records and update later steps, but it failed when source data had latency or formatting mismatches."
category: "Work & Operations"
agents:
  - name: "Zapier Agents"
    slug: "zapier-agents"
source_platform: "Reddit"
source_date: "Feb 1, 2025"
source_url: "https://www.reddit.com/r/zapier/comments/1rmgfwu/issues_with_zapier_agents"
fetched_from: "https://agentusecases.ai/use-case/look-up-user-records-and-update-downstream-steps"
---

# Look up user records and update downstream steps

> A poster used a Zapier agent to find user records and update later steps, but it failed when source data had latency or formatting mismatches.

**Category:** Work & Operations  
**Agent:** Zapier Agents  
**Source:** Reddit · Feb 1, 2025

## What they did

The poster set up three Zapier agents for a subscription product: one to email admins a current user list, one to add users, and one to remove them, using a Zapier Table as the customer database. The agents looked up customers by the email Stripe had written into the table, then later needed to search by another field to find linked subaccounts; the person tried both changing the Find Records operator and adding a lowercase-normalized formula column, but hit bugs and missing-field issues.

## How it went

It never became reliable: case-sensitive lookups, inability to set the needed operator when multiple lookup fields were required, unseen new columns, and draft/version errors blocked the workflow. The poster says Agents were still in beta yet had cost $400, and support confirmed at least one behavior looked like a bug.

## Worth knowing

The biggest catch was data matching: because Stripe-fed emails kept original casing, even simple user lookup broke unless the tool could search case-insensitively or the data was normalized first.

## Prompt

```text
Create an agent that looks up a user record in [source app] by [email or ID] and then updates the matching record in [downstream app]. Have it normalize formatting such as email case, whitespace and phone numbers, and retry or flag the record if the source data hasn't arrived yet. Test it on [number] sample records and show me a report of which succeeded and which failed before it changes any live data.
```

## Related use cases

- [Find an NYC apartment with a listing-watching agent](./find-an-nyc-apartment-with-a-listing-watching-agent.md)
- [Turn new Gmail emails into Notion CRM leads](./turn-new-gmail-emails-into-notion-crm-leads.md)
- [Collect and summarize async standup updates](./collect-and-summarize-async-standup-updates.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Speed up multifamily deal research and property summaries](./speed-up-multifamily-deal-research-and-property-summaries.md)
- [Give an agent a phone number to make and answer calls](./give-an-agent-a-phone-number-to-make-and-answer-calls.md)
