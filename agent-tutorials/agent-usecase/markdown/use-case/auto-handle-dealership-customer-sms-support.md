---
title: "Auto-handle dealership customer SMS support"
slug: "auto-handle-dealership-customer-sms-support"
summary: "A car dealership group built a Make flow analyzing customer SMS sentiment, auto-closing over 18,000 of 47,000 messages and flagging unhappy customers to Aftersales."
category: "Sales, Marketing & Support"
agents:
  - name: "Make"
    slug: "make"
source_platform: "make.com"
source_date: "Undated"
source_url: "https://www.make.com/how-to-guides/automate-customer-service"
fetched_from: "https://agentusecases.ai/use-case/auto-handle-dealership-customer-sms-support"
---

# Auto-handle dealership customer SMS support

> A car dealership group built a Make flow analyzing customer SMS sentiment, auto-closing over 18,000 of 47,000 messages and flagging unhappy customers to Aftersales.

**Category:** Sales, Marketing & Support  
**Agent:** Make  
**Source:** make.com · Undated

## What they did

Stellantis&You UK, a UK car dealership group, built a two-way SMS support flow in Make. It connected Knack, ClickSend and OpenAI sentiment analysis. The flow read each customer message and closed those needing no action. It flagged genuine dissatisfaction, even when politely worded, to the Aftersales team. The source gives only this summary, not the build steps.

## How it went

Over 12 months it analyzed more than 47,000 messages and auto-closed over 18,000 that needed no action. Make estimates this saved 151 hours of manual review.

## Worth knowing

The guide gives only a short summary of this case. Its generic build advice says to include an escalation path for anything the AI is unsure about.

## Prompt

```text
Build a Make scenario that receives incoming customer text messages from [SMS platform] and uses AI to classify sentiment and whether the message needs a human reply. Auto-close messages that are simple and positive, such as thanks or confirmations, and send anything negative or unclear to [team or person] with the message and customer details. Test it on [20] past messages and show me how each was classified before enabling any auto-close or live alerts.
```

## Related use cases

- [Manage email, calendar and tasks from Slack](./manage-email-calendar-and-tasks-from-slack.md)
- [Summarize a YouTuber's latest video into a Google Doc daily](./summarize-a-youtuber-s-latest-video-into-a-google-doc-daily.md)
- [Research, score and draft outreach for leads](./research-score-and-draft-outreach-for-leads.md)
- [Sell services through an agent that takes payment and delivers](./sell-services-through-an-agent-that-takes-payment-and-delive.md)
- [Schedule social posts through an AI agent](./schedule-social-posts-through-an-ai-agent.md)
- [Run outbound sales from research to booked demos](./run-outbound-sales-from-research-to-booked-demos.md)
