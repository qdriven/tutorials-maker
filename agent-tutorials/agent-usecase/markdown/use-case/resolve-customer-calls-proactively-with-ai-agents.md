---
title: "Resolve customer calls proactively with AI agents"
slug: "resolve-customer-calls-proactively-with-ai-agents"
summary: "TELUS uses Gemini Enterprise for CX agents to proactively resolve customer calls; Google's case study reports 30% of calls resolved and issues resolved 87% faster."
category: "Sales, Marketing & Support"
agents:
  - name: "Gemini"
    slug: "gemini"
source_platform: "cloud.google.com"
source_date: "Undated"
source_url: "https://cloud.google.com/customers/telus-gemini-enterprise-cx"
fetched_from: "https://agentusecases.ai/use-case/resolve-customer-calls-proactively-with-ai-agents"
---

# Resolve customer calls proactively with AI agents

> TELUS uses Gemini Enterprise for CX agents to proactively resolve customer calls; Google's case study reports 30% of calls resolved and issues resolved 87% faster.

**Category:** Sales, Marketing & Support  
**Agent:** Gemini  
**Source:** cloud.google.com · Undated

## What they did

TELUS Digital loaded call data from chat, voice and video into BigQuery. Sensitive Data Protection scrubbed private details, and Gemini Enterprise Agent Platform analyzed every call for sentiment and root causes. Those findings fed Generative Playbooks that guide Gemini Enterprise for CX. The agents keep context across channels and give frontline staff real-time recommendations when a call is handed to a person.

## How it went

30% of contact center traffic now runs through AI automation, and average resolution time fell 87%. The company reports $53.9M in annual savings, and analysis grew from about 1% of calls to all 22 million.

## Worth knowing

The setup depends on first unifying siloed channel data in BigQuery. All figures come from Google's own case study.

## Prompt

```text
Help me design an AI agent to proactively resolve [type of customer calls, e.g. billing or outage questions] for [my business]. Using the sample policies or call notes I paste here: [paste], draft the agent's instructions, the cases it can handle on its own, and when to escalate to a human. Finish with 10 test scenarios and expected responses.
```

## Related use cases

- [Orchestrate a multi-phase RAG migration](./orchestrate-a-multi-phase-rag-migration.md)
- [Hunt for unpatched vulnerabilities in SQLite commits](./hunt-for-unpatched-vulnerabilities-in-sqlite-commits.md)
- [Critique blog post drafts for technical errors](./critique-blog-post-drafts-for-technical-errors.md)
- [Sell services through an agent that takes payment and delivers](./sell-services-through-an-agent-that-takes-payment-and-delive.md)
- [Find weak-web-presence businesses and pitch them with personalized outreach](./find-weak-web-presence-businesses-and-pitch-them-with-person.md)
- [Run business WhatsApp customer messages with an agent](./run-business-whatsapp-customer-messages-with-an-agent.md)
