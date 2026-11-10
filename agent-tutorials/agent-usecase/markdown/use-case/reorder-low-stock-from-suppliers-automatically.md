---
title: "Reorder low stock from suppliers automatically"
slug: "reorder-low-stock-from-suppliers-automatically"
summary: "A system checks Shopify inventory each morning and emails a pre-written order to the right supplier when stock is low."
category: "Work & Operations"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_platform: "Reddit"
source_date: "Jul 19, 2026"
source_url: "https://www.reddit.com/r/AI_Agents/comments/1uh84cx/i_charge_clients_more_to_not_build_an_ai_agent"
fetched_from: "https://agentusecases.ai/use-case/reorder-low-stock-from-suppliers-automatically"
---

# Reorder low stock from suppliers automatically

> A system checks Shopify inventory each morning and emails a pre-written order to the right supplier when stock is low.

**Category:** Work & Operations  
**Agent:** custom-built or unnamed agent  
**Source:** Reddit · Jul 19, 2026

## What they did

A supplements brand owner wanted an AI system to watch Shopify inventory, decide when to reorder, and email suppliers. The builder reviewed the store, saw the same 14 products had been reordered at the same quantities from the same suppliers for over a year, and replaced the agent idea with a simple workflow that checks Shopify each morning against fixed reorder points and sends a prewritten order email to the matching supplier when stock is low.

## How it went

Instead of a quoted $5,200 AI build, the workflow cost $700 to set up and $60 a month to run. The ops person got back about 40 minutes every morning in the first week, but the client initially felt the solution was too basic.

## Worth knowing

The key catch was that nothing needed interpretation: with stable reorder rules like ordering protein powder at 200 units, a plain automation was cheaper to build and maintain.

## Prompt

```text
Build a workflow that runs every morning at [time] and checks my Shopify inventory for products below [threshold units]. For each low item, look up the supplier in [spreadsheet or Airtable] and draft an email with the pre-written order for [quantity]. Send the draft to me for approval at [my email] before anything goes to the supplier. The workflow is done when a test run with a low-stock item produces a correct draft.
```

## Related use cases

- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Delegate calendar, inbox and travel booking to a personal work agent](./delegate-calendar-inbox-and-travel-booking-to-a-personal-wor.md)
- [Check supplier invoices for duplicates and missing GST](./check-supplier-invoices-for-duplicates-and-missing-gst.md)
- [Run a business assistant that resumes project work](./run-a-business-assistant-that-resumes-project-work.md)
- [Scrape websites with a plain-language browser agent](./scrape-websites-with-a-plain-language-browser-agent.md)
- [Generate recurring weekly reports combining KPIs and pull requests](./generate-recurring-weekly-reports-combining-kpis-and-pull-re.md)
