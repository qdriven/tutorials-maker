---
title: "Run a personal health agent over FHIR records"
slug: "run-a-personal-health-agent-over-fhir-records"
summary: "A personal OpenClaw agent reads health data via a guardrail proxy to prep appointments, draft follow-ups, fill forms, write insurance appeals and track trends."
category: "Life Admin & Home"
agents:
  - name: "OpenClaw"
    slug: "openclaw"
source_platform: "evestel.substack.com"
source_date: "Undated"
source_url: "https://evestel.substack.com/p/how-i-build-my-personal-openclaw"
fetched_from: "https://agentusecases.ai/use-case/run-a-personal-health-agent-over-fhir-records"
---

# Run a personal health agent over FHIR records

> A personal OpenClaw agent reads health data via a guardrail proxy to prep appointments, draft follow-ups, fill forms, write insurance appeals and track trends.

**Category:** Life Admin & Home  
**Agent:** OpenClaw  
**Source:** evestel.substack.com · Undated

## What they did

The author had Claude Code design a guardrail proxy between OpenClaw and a private HAPI FHIR server. The server held Epic data from two health systems, pharmacy records, and Flexpa insurance claims. The proxy masks PHI, keeps audit logs, and requires human confirmation for clinical or financial actions. The agent then prepared appointments, drafted messages and appeals, and tracked trends.

## How it went

On a colonoscopy billed as diagnostic, which left a $1,000 deductible, the agent explained the billing, drafted a dispute and weighed escalation. The source gives no result for the dispute.

## Worth knowing

Run the agent on an isolated machine (the author uses a Mac mini with its own account), avoid third-party skills, and enforce PHI reduction at the data layer, not in the model.

## Prompt

```text
Connect to my health records at [FHIR source or export file] in read-only mode and prepare me for my [type] appointment on [date]. Summarize recent results, trends in [metric], current medications and open questions, then draft a list of questions to ask and a follow-up message to my provider. Do not send anything or submit any form without showing me the exact content first. Finish with a one-page briefing I can print.
```

## Related use cases

- [Manage 18 agents from a Notion workspace](./manage-18-agents-from-a-notion-workspace.md)
- [Draft and publish blog posts with an SEO-aware agent](./draft-and-publish-blog-posts-with-an-seo-aware-agent.md)
- [Track sleep, notes, code and earthquakes with a personal agent](./track-sleep-notes-code-and-earthquakes-with-a-personal-agent.md)
- [Get a second opinion on an MRI](./get-a-second-opinion-on-an-mri.md)
- [Let Claude read Apple Health and Fitbit data via MCP](./let-claude-read-apple-health-and-fitbit-data-via-mcp.md)
- [Run pet relocation, Airbnb pricing, and disputes with agents](./run-pet-relocation-airbnb-pricing-and-disputes-with-agents.md)
