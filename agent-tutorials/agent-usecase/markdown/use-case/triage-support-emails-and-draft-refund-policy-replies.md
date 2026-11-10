---
title: "Triage support emails and draft refund-policy replies"
slug: "triage-support-emails-and-draft-refund-policy-replies"
summary: "A consultant built a Claude agent that reads support Gmail, looks up orders, applies refund policy, drafts replies for human approval and creates triage records with optional Slack alerts."
category: "Sales, Marketing & Support"
agents:
  - name: "Claude"
    slug: "claude"
source_platform: "medium.com"
source_date: "Undated"
source_url: "https://medium.com/@nitin_26346/building-a-customer-support-triage-agent-with-claude-a-walkthrough-89a812cc09bf"
fetched_from: "https://agentusecases.ai/use-case/triage-support-emails-and-draft-refund-policy-replies"
---

# Triage support emails and draft refund-policy replies

> A consultant built a Claude agent that reads support Gmail, looks up orders, applies refund policy, drafts replies for human approval and creates triage records with optional Slack alerts.

**Category:** Sales, Marketing & Support  
**Agent:** Claude  
**Source:** medium.com · Undated

## What they did

For a fictional kitchenware brand demo, the consultant kept the returns policy and brand voice guide in Claude Projects. Gmail and Sheets connectors gave Claude the unread support emails and an orders sheet with final-sale, gift and prior-return flags. For each email it matched the order, walked a decision tree, and wrote a triage record with a drafted reply. Escalation flags sent edge cases to human review, and nothing was sent without a click.

## How it went

The author estimates 12–18 support hours saved weekly, assuming about 70% of requests are routine. Rough spots: right decisions sometimes cite the wrong policy section, tone on hard cases is imperfect, and there is no memory across interactions.

## Worth knowing

Cost is roughly $0.05 per email, about $4 a day at 80 emails. Keep the prompt thin and make policy changes in the policy and voice documents.

## Prompt

```text
Watch the support inbox [Gmail address or label]. For each new email, look up the order in [order system], apply our refund policy: [paste policy], and write a draft reply saved in Gmail without sending. Create a triage record in [tool] with category and urgency, and post a Slack alert to [channel] for anything urgent. Never send a reply or issue a refund without my approval.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a charting tool from blood test PDFs](./build-a-charting-tool-from-blood-test-pdfs.md)
- [Build an anonymous wall of hopes and fears about AI](./build-an-anonymous-wall-of-hopes-and-fears-about-ai.md)
- [Sell services through an agent that takes payment and delivers](./sell-services-through-an-agent-that-takes-payment-and-delive.md)
- [Run brand marketing end to end and publish to social](./run-brand-marketing-end-to-end-and-publish-to-social.md)
- [Find roofing leads and run AI voice outreach](./find-roofing-leads-and-run-ai-voice-outreach.md)
