---
title: "Plan multi-platform social content calendars with an agent"
slug: "plan-multi-platform-social-content-calendars-with-an-agent"
summary: "The author built a social media manager agent using Gemini to write its prompt, producing a multi-week content calendar for Substack, LinkedIn and X with human review; publishing isn't shown."
category: "Sales, Marketing & Support"
agents:
  - name: "Gemini"
    slug: "gemini"
source_platform: "agentsofinsight.substack.com"
source_date: "Undated"
source_url: "https://agentsofinsight.substack.com/p/how-i-built-a-social-media-manager"
fetched_from: "https://agentusecases.ai/use-case/plan-multi-platform-social-content-calendars-with-an-agent"
---

# Plan multi-platform social content calendars with an agent

> The author built a social media manager agent using Gemini to write its prompt, producing a multi-week content calendar for Substack, LinkedIn and X with human review; publishing isn't shown.

**Category:** Sales, Marketing & Support  
**Agent:** Gemini  
**Source:** agentsofinsight.substack.com · Undated

## What they did

The author described his problem to Gemini Advanced and had it write the agent prompt. A second prompt asked for a markdown table calendar with days as columns, which Gemini exported to Google Sheets. After a third prompt for multi-week calendars, he saved the instructions as a Gem. He reviews and refines the output himself.

## How it went

He reports the build took under 20 minutes. Three blog ideas become 36+ social posts across Substack, LinkedIn and X. He says daily social media time dropped from 3 hours to 30 minutes. Later agents for copywriting, SEO and publishing are only planned.

## Worth knowing

The first Gemini reply was plain conversational text, not a calendar. You need a follow-up prompt specifying a pipe-delimited table, and the exported sheet still needed manual formatting.

## Prompt

```text
Act as my social media manager for [my name or brand], who writes about [topics] for [audience]. Plan a [number]-week content calendar across [platforms, e.g. Substack, LinkedIn, X], with post ideas, formats, draft copy for each and suggested posting days. Match this tone: [describe or paste a sample]. Finish with a calendar table I can review and edit, and do not publish anything.
```

## Related use cases

- [Orchestrate a multi-phase RAG migration](./orchestrate-a-multi-phase-rag-migration.md)
- [Vibe code an HTML5 browser game](./vibe-code-an-html5-browser-game.md)
- [Shop Etsy for party supplies within a budget](./shop-etsy-for-party-supplies-within-a-budget.md)
- [Sell services through an agent that takes payment and delivers](./sell-services-through-an-agent-that-takes-payment-and-delive.md)
- [Find weak-web-presence businesses and pitch them with personalized outreach](./find-weak-web-presence-businesses-and-pitch-them-with-person.md)
- [Run business WhatsApp customer messages with an agent](./run-business-whatsapp-customer-messages-with-an-agent.md)
