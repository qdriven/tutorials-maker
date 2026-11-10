---
title: "Automate follow-ups and inventory tracking for a food distributor"
slug: "automate-follow-ups-and-inventory-tracking-for-a-food-distri"
summary: "Built agents for a wholesale food distributor that ran on Excel, calls and email, including inventory tracking and a copywriter agent for outreach emails."
category: "Work & Operations"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_platform: "Reddit"
source_date: "May 1, 2025"
source_url: "https://www.reddit.com/r/AI_Agents/comments/1t6dt98/i_built_boring_ai_agents_for_a_food_distributor"
fetched_from: "https://agentusecases.ai/use-case/automate-follow-ups-and-inventory-tracking-for-a-food-distri"
---

# Automate follow-ups and inventory tracking for a food distributor

> Built agents for a wholesale food distributor that ran on Excel, calls and email, including inventory tracking and a copywriter agent for outreach emails.

**Category:** Work & Operations  
**Agent:** custom-built or unnamed agent  
**Source:** Reddit · May 1, 2025

## What they did

They started with a wholesaler that ran on Excel, phone calls, texts, emails, and manual follow-ups. The setup chained simple agents: scrape local businesses from Google Maps by ZIP code, generate segmented cold-email copy from scraped YouTube transcript examples, find and verify emails with Apollo, Apify, and Million Verifier, send campaigns through warmed inboxes in Aerosend and Smartlead, and flag inventory reorders from rules and sales history; a human still approved purchases.

## How it went

In 4 months, monthly revenue rose from about $22K to $45K, leads contacted from about 120 to 1,500+, verified local leads to around 900 a month, and new customers from 3–4 to 12–15 monthly. The inventory piece was intentionally basic, using rules plus historical sales velocity rather than advanced optimization.

## Worth knowing

They say the automation worked best because the tools had solid APIs, and the reorder system’s first version was simple rules with human approval, not a fully autonomous buyer.

## Prompt

```text
Build a workflow for my [type of business] that reads [Excel file] for inventory levels and customer orders, flags items below [threshold], and drafts follow-up emails to customers who haven't reordered in [number] days. Save the drafts for my review and never send them automatically. Finish when a test run produces an inventory alert list and a batch of drafted emails.
```

## Related use cases

- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Delegate calendar, inbox and travel booking to a personal work agent](./delegate-calendar-inbox-and-travel-booking-to-a-personal-wor.md)
- [Check supplier invoices for duplicates and missing GST](./check-supplier-invoices-for-duplicates-and-missing-gst.md)
- [Regrade assignments and update grades in Brightspace](./regrade-assignments-and-update-grades-in-brightspace.md)
- [Build a Telegram bot that sends emails and checks calendar](./build-a-telegram-bot-that-sends-emails-and-checks-calendar.md)
- [Generate recurring weekly reports combining KPIs and pull requests](./generate-recurring-weekly-reports-combining-kpis-and-pull-re.md)
