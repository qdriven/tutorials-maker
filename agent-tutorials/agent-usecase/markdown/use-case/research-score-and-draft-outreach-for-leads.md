---
title: "Research, score and draft outreach for leads"
slug: "research-score-and-draft-outreach-for-leads"
summary: "A Make-based AI agent researches leads, scores them, and drafts personalized follow-up outreach automatically."
category: "Sales, Marketing & Support"
agents:
  - name: "Make"
    slug: "make"
source_platform: "Reddit"
source_date: "Jun 17, 2026"
source_url: "https://www.reddit.com/r/Make/comments/1to8mmo/tutorial_aiagent_for_lead_qualification_automated"
fetched_from: "https://agentusecases.ai/use-case/research-score-and-draft-outreach-for-leads"
---

# Research, score and draft outreach for leads

> A Make-based AI agent researches leads, scores them, and drafts personalized follow-up outreach automatically.

**Category:** Sales, Marketing & Support  
**Agent:** Make  
**Source:** Reddit · Jun 17, 2026

## What they did

The post describes a Make workflow for automated lead qualification that connects HubSpot contact data with Slack, Gmail, and Google Calendar. It says the agent researches leads, scores them, and drafts personalized outreach replies automatically, while the sales team is kept in the loop through Slack notifications and can use the drafted Gmail responses and calendar availability for follow-up.

## How it went

The source frames the result as letting the sales team focus on closing while the workflow handles qualification and draft follow-up. It does not give performance numbers, examples of scores, or any reported shortcomings in the thread shown.

## Worth knowing

The practical catch is the app stack: the setup requires Make plus HubSpot CRM access, Slack, Gmail, and Google Calendar; the post also links a ready-built scenario template.

## Prompt

```text
Build a Make scenario that takes new leads from [lead source, e.g. a Google Sheet or CRM], researches each company and contact on the web, and scores them 1 to 10 against my ideal customer: [describe ICP]. For leads scoring [threshold] or higher, draft a personalized follow-up email referencing something specific from the research, and save it as a draft in [email tool]. Do not send anything; stop once drafts and scores are written for the first [number] leads for me to review.
```

## Related use cases

- [Manage email, calendar and tasks from Slack](./manage-email-calendar-and-tasks-from-slack.md)
- [Summarize a YouTuber's latest video into a Google Doc daily](./summarize-a-youtuber-s-latest-video-into-a-google-doc-daily.md)
- [Enrich new CRM leads for personalized outreach](./enrich-new-crm-leads-for-personalized-outreach.md)
- [Sell services through an agent that takes payment and delivers](./sell-services-through-an-agent-that-takes-payment-and-delive.md)
- [Schedule social posts through an AI agent](./schedule-social-posts-through-an-ai-agent.md)
- [Run outbound sales from research to booked demos](./run-outbound-sales-from-research-to-booked-demos.md)
