---
title: "Pick the cheapest capable model per task for CRM and email work"
slug: "pick-the-cheapest-capable-model-per-task-for-crm-and-email-w"
summary: "A user had their OpenClaw agent rewrite its own code to add a throttle module that picks the cheapest capable model for tasks like CRM analysis and drafting outbound emails."
category: "Work & Operations"
agents:
  - name: "OpenClaw"
    slug: "openclaw"
source_platform: "substack.com"
source_date: "Undated"
source_url: "https://substack.com/@stackandscaleai/note/c-217266874"
fetched_from: "https://agentusecases.ai/use-case/pick-the-cheapest-capable-model-per-task-for-crm-and-email-w"
---

# Pick the cheapest capable model per task for CRM and email work

> A user had their OpenClaw agent rewrite its own code to add a throttle module that picks the cheapest capable model for tasks like CRM analysis and drafting outbound emails.

**Category:** Work & Operations  
**Agent:** OpenClaw  
**Source:** substack.com · Undated

## What they did

Koka Sexton runs OpenClaw as a routing layer over OpenAI, Claude and Gemini. He had the agent rewrite its own code to add a manual-throttle module. The agent then picks the cheapest capable model for each job, such as a 30-row CRM analysis versus writing 20 outbound emails, and switches when he tells it to.

## How it went

The agent now matches model cost to task complexity and acts as a chief of staff, handling follow-ups and drafts. The source gives no cost savings figures.

## Worth knowing

The throttle is manual: the agent switches models when he tells it to. It sends external messages only after his explicit approval.

## Prompt

```text
Add a model-routing module to yourself that picks the cheapest capable model for each task type, such as [task types, e.g. CRM analysis, drafting outbound emails, summarizing]. Use these models and prices: [list of models and costs]. Show me the code changes and a test run with sample tasks before applying them, and finish by logging which model handled each task and the estimated cost.
```

## Related use cases

- [Manage 18 agents from a Notion workspace](./manage-18-agents-from-a-notion-workspace.md)
- [Draft and publish blog posts with an SEO-aware agent](./draft-and-publish-blog-posts-with-an-seo-aware-agent.md)
- [Draft messages, fill web forms and prototype sites by chat](./draft-messages-fill-web-forms-and-prototype-sites-by-chat.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Check supplier invoices for duplicates and missing GST](./check-supplier-invoices-for-duplicates-and-missing-gst.md)
- [Give an agent a phone number to make and answer calls](./give-an-agent-a-phone-number-to-make-and-answer-calls.md)
