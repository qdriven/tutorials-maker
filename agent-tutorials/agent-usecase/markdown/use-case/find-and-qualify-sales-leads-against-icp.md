---
title: "Find and qualify sales leads against ICP"
slug: "find-and-qualify-sales-leads-against-icp"
summary: "Hermes Agent searches and compares company and people context, judges leads on ICP, role fit and timing, and explains why each qualified to feed outreach."
category: "Sales, Marketing & Support"
agents:
  - name: "Hermes Agent"
    slug: "hermes-agent"
source_platform: "dev.to"
source_date: "Undated"
source_url: "https://dev.to/nimay_04/how-i-built-a-hermes-agent-for-lead-generation-that-finds-and-qualifies-better-prospects-1hm6"
fetched_from: "https://agentusecases.ai/use-case/find-and-qualify-sales-leads-against-icp"
---

# Find and qualify sales leads against ICP

> Hermes Agent searches and compares company and people context, judges leads on ICP, role fit and timing, and explains why each qualified to feed outreach.

**Category:** Sales, Marketing & Support  
**Agent:** Hermes Agent  
**Source:** dev.to · Undated

## What they did

The author defined a tight ICP (B2B SaaS, 20 to 300 employees, hiring engineering or DevOps roles). Public-source candidates were filtered early. Hermes then searched and read company pages to gather hiring, stack and role context, and scored each lead on fit and confidence. It returned structured rows with reasons, and a human reviewed edge cases.

## How it went

The source gives no measured results. It describes faster per-lead research, more consistent filtering and a better handoff to outreach. Misses came from keyword matches on too-early companies, wrong-function contacts, and overly strict scoring prompts.

## Worth knowing

Review false positives and false negatives and tighten the rules; the author keeps a human on final outreach priority and edge cases.

## Prompt

```text
Find [number] companies and contacts that match my ideal customer profile: [industry, size, region, role, buying signals]. For each, research company and person context, then score ICP fit, role fit and timing, and explain in one or two sentences why they qualify. Return a table with links, ready for outreach; don't contact anyone.
```

## Related use cases

- [Set up a home chat server and manage accounts from your phone](./set-up-a-home-chat-server-and-manage-accounts-from-your-phon.md)
- [Produce a short-form video from research to captions](./produce-a-short-form-video-from-research-to-captions.md)
- [Debloat an Android TV](./debloat-an-android-tv.md)
- [Sell services through an agent that takes payment and delivers](./sell-services-through-an-agent-that-takes-payment-and-delive.md)
- [Run a solo business with a team of 16 agents](./run-a-solo-business-with-a-team-of-16-agents.md)
- [Run business WhatsApp customer messages with an agent](./run-business-whatsapp-customer-messages-with-an-agent.md)
