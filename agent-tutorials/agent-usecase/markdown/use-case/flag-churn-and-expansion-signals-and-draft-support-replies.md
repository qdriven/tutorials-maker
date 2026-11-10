---
title: "Flag churn and expansion signals and draft support replies"
slug: "flag-churn-and-expansion-signals-and-draft-support-replies"
summary: "Healthie's Zapier agent checks CRM and support tools weekly for churn or expansion signals and posts a summary in Slack; Erewhon drafts personalized support replies."
category: "Sales, Marketing & Support"
agents:
  - name: "Zapier Agents"
    slug: "zapier-agents"
source_platform: "zapier.com"
source_date: "Undated"
source_url: "https://zapier.com/blog/ai-agent-use-cases/"
fetched_from: "https://agentusecases.ai/use-case/flag-churn-and-expansion-signals-and-draft-support-replies"
---

# Flag churn and expansion signals and draft support replies

> Healthie's Zapier agent checks CRM and support tools weekly for churn or expansion signals and posts a summary in Slack; Erewhon drafts personalized support replies.

**Category:** Sales, Marketing & Support  
**Agent:** Zapier Agents  
**Source:** zapier.com · Undated

## What they did

Healthie built a Zapier agent that checks Salesforce, HubSpot, Vitally and Help Scout every Monday for early churn or expansion signals. It posts a prioritized Slack summary for support and product leads to act on. Erewhon chained Help Scout, ChatGPT, a vector store and BigQuery. The workflow checks the customer's membership profile and drafts a policy-grounded reply. A second agent grades each draft against the final human reply.

## How it went

Erewhon says 70% of drafts go out unchanged, saving about 1,500 labor hours a year across 10 stores. The article gives no outcome numbers for Healthie's churn agent.

## Worth knowing

Erewhon added a second agent that scores how much humans edit each draft, which gives you a running quality check on the drafts.

## Prompt

```text
Build a Zapier Agent that runs every [Monday] and reviews [my CRM] and [my support tool] for accounts showing churn signals like [drop in usage, unresolved tickets, cancellation questions] or expansion signals like [new seats, feature requests]. Post a short summary in [Slack channel] listing each account, the signal, and why. Separately, draft personalized replies to open support tickets, saved as drafts only and never sent without my approval. You're done when one run produces the Slack summary and drafts.
```

## Related use cases

- [Find an NYC apartment with a listing-watching agent](./find-an-nyc-apartment-with-a-listing-watching-agent.md)
- [Turn new Gmail emails into Notion CRM leads](./turn-new-gmail-emails-into-notion-crm-leads.md)
- [Generate weekly leadership reports and handle feature requests](./generate-weekly-leadership-reports-and-handle-feature-reques.md)
- [Sell services through an agent that takes payment and delivers](./sell-services-through-an-agent-that-takes-payment-and-delive.md)
- [Find weak-web-presence businesses and pitch them with personalized outreach](./find-weak-web-presence-businesses-and-pitch-them-with-person.md)
- [Run business WhatsApp customer messages with an agent](./run-business-whatsapp-customer-messages-with-an-agent.md)
