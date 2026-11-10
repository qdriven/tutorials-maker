---
title: "Enrich new CRM leads for personalized outreach"
slug: "enrich-new-crm-leads-for-personalized-outreach"
summary: "A Make.com automation enriches new leads entering the CRM with detailed profiles so cold outreach can be more targeted."
category: "Sales, Marketing & Support"
agents:
  - name: "Make"
    slug: "make"
source_platform: "Reddit"
source_date: "Feb 13, 2025"
source_url: "https://www.reddit.com/r/coldemail/comments/1jzhsss"
fetched_from: "https://agentusecases.ai/use-case/enrich-new-crm-leads-for-personalized-outreach"
---

# Enrich new CRM leads for personalized outreach

> A Make.com automation enriches new leads entering the CRM with detailed profiles so cold outreach can be more targeted.

**Category:** Sales, Marketing & Support  
**Agent:** Make  
**Source:** Reddit · Feb 13, 2025

## What they did

The poster built a Make.com scenario that watches Airtable for each new lead, then runs two enrichment calls: one to LinkedIn via RapidAPI to pull profile details and another to a service like Clearbit or FullContact for company and role data. The enriched fields are written back to Airtable for use in targeted outreach, and in the comments the poster suggests adding an AI step to choose the closest match when basic identifiers are ambiguous.

## How it went

They present it as a way to turn bare lead records into profiles detailed enough for hyper-targeted cold emails, but the thread gives no performance numbers or measured lift. A commenter’s main caveat was that matching can be fuzzy unless you provide more than just a name and maybe company.

## Prompt

```text
Build a Make scenario that triggers when a new lead is added to my CRM [CRM name] and enriches it with company size, industry, role, recent news, and a short summary of what they likely care about. Write the results back to custom fields [field names] on the lead record. Test it on [number] existing leads and show me the enriched records before turning it on for new ones.
```

## Related use cases

- [Manage email, calendar and tasks from Slack](./manage-email-calendar-and-tasks-from-slack.md)
- [Summarize a YouTuber's latest video into a Google Doc daily](./summarize-a-youtuber-s-latest-video-into-a-google-doc-daily.md)
- [Research, score and draft outreach for leads](./research-score-and-draft-outreach-for-leads.md)
- [Sell services through an agent that takes payment and delivers](./sell-services-through-an-agent-that-takes-payment-and-delive.md)
- [Schedule social posts through an AI agent](./schedule-social-posts-through-an-ai-agent.md)
- [Run outbound sales from research to booked demos](./run-outbound-sales-from-research-to-booked-demos.md)
