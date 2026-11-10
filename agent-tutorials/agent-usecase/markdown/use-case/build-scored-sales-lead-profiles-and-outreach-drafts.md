---
title: "Build scored sales lead profiles and outreach drafts"
slug: "build-scored-sales-lead-profiles-and-outreach-drafts"
summary: "The author built a pipeline with Gemini Deep Research, NotebookLM and Sheets that produces a scored lead profile and outreach draft in under 20 minutes, tested on three companies."
category: "Sales, Marketing & Support"
agents:
  - name: "Gemini"
    slug: "gemini"
source_platform: "cashandcache.substack.com"
source_date: "Undated"
source_url: "https://cashandcache.substack.com/p/i-used-gemini-to-find-sales-leads"
fetched_from: "https://agentusecases.ai/use-case/build-scored-sales-lead-profiles-and-outreach-drafts"
---

# Build scored sales lead profiles and outreach drafts

> The author built a pipeline with Gemini Deep Research, NotebookLM and Sheets that produces a scored lead profile and outreach draft in under 20 minutes, tested on three companies.

**Category:** Sales, Marketing & Support  
**Agent:** Gemini  
**Source:** cashandcache.substack.com · Undated

## What they did

The author set up a custom Gem called Sales Lead Researcher with their offering and a four-part, 0-16 scoring framework. For each company, one command runs Deep Research and a second identifies a decision-maker, scores the company and drafts a short LinkedIn message. Results go to Google Docs, then NotebookLM for comparison, then Sheets.

## How it went

Deep Research cited 50-100+ sources per company and took 7-10 minutes each. Scores were 14/16, 13/16 and 9/16 for Airbnb, which gave three different outreach strategies. The prompts and rubric are paywalled.

## Worth knowing

It only researches companies you already picked, needs your own offer and scoring rubric defined first, runs on Gemini Pro at $20/month, and Deep Research has daily limits.

## Prompt

```text
Use Deep Research on [company name] to build a sales lead profile: what they do, recent news, key decision makers, likely pain points related to [my product], and a fit score from 1 to 10 with reasons. Then draft a short outreach email in [my tone]. Finish with the profile in a table plus the draft, and do not send anything.
```

## Related use cases

- [Orchestrate a multi-phase RAG migration](./orchestrate-a-multi-phase-rag-migration.md)
- [Hunt for unpatched vulnerabilities in SQLite commits](./hunt-for-unpatched-vulnerabilities-in-sqlite-commits.md)
- [Critique blog post drafts for technical errors](./critique-blog-post-drafts-for-technical-errors.md)
- [Sell services through an agent that takes payment and delivers](./sell-services-through-an-agent-that-takes-payment-and-delive.md)
- [Find weak-web-presence businesses and pitch them with personalized outreach](./find-weak-web-presence-businesses-and-pitch-them-with-person.md)
- [Run business WhatsApp customer messages with an agent](./run-business-whatsapp-customer-messages-with-an-agent.md)
