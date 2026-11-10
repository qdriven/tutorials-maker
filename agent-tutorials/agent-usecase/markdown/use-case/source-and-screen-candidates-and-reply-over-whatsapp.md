---
title: "Source and screen candidates and reply over WhatsApp"
slug: "source-and-screen-candidates-and-reply-over-whatsapp"
summary: "Recruiters run OpenClaw to monitor GitHub for new contributors overnight, score resume folders against a job description, and draft WhatsApp replies held for human approval."
category: "Work & Operations"
agents:
  - name: "OpenClaw"
    slug: "openclaw"
source_platform: "glozo.com"
source_date: "Undated"
source_url: "https://www.glozo.com/blog/openclaw-for-recruiters"
fetched_from: "https://agentusecases.ai/use-case/source-and-screen-candidates-and-reply-over-whatsapp"
---

# Source and screen candidates and reply over WhatsApp

> Recruiters run OpenClaw to monitor GitHub for new contributors overnight, score resume folders against a job description, and draft WhatsApp replies held for human approval.

**Category:** Work & Operations  
**Agent:** OpenClaw  
**Source:** glozo.com · Undated

## What they did

OpenClaw runs on a dedicated machine such as a Mac Mini. A 6 AM scheduled task uses the browser skill to visit chosen GitHub repos, pull contributors, filter for recent activity and send a Telegram digest. For screening, the recruiter drops PDF resumes and a JD into the workspace, and the agent returns a ranked CSV with rationales. For replies, it drafts a response and sends it to the recruiter on WhatsApp, and sends it only after the recruiter says yes.

## How it went

The guide says API costs run roughly $10 to $30 a month for light use and $100 to $200 for heavy use. It gives no measured sourcing results. LinkedIn scraping is fragile, and a clean first workflow takes most of a day.

## Worth knowing

Sandboxing, approval prompts and workspace limits ship with 2.0 but are off by default, so turn them on before pointing the agent at candidate data.

## Prompt

```text
Every night, check GitHub for new contributors to [repos or topics] who match [skills, location] and add them to [sheet]. Also score the resumes in [folder] against this job description: [paste JD], with a one-line reason each. Draft WhatsApp replies to [candidates or contacts], but hold them for my approval and never send without it.
```

## Related use cases

- [Manage 18 agents from a Notion workspace](./manage-18-agents-from-a-notion-workspace.md)
- [Draft and publish blog posts with an SEO-aware agent](./draft-and-publish-blog-posts-with-an-seo-aware-agent.md)
- [Draft messages, fill web forms and prototype sites by chat](./draft-messages-fill-web-forms-and-prototype-sites-by-chat.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Check supplier invoices for duplicates and missing GST](./check-supplier-invoices-for-duplicates-and-missing-gst.md)
- [Give an agent a phone number to make and answer calls](./give-an-agent-a-phone-number-to-make-and-answer-calls.md)
