---
title: "Summarize emails and draft replies with Gemini Gem flows"
slug: "summarize-emails-and-draft-replies-with-gemini-gem-flows"
summary: "The writer plugged a custom Gemini Gem into Workspace Studio flows that run in the background, summarize Gmail messages and create draft replies to review and send."
category: "Work & Operations"
agents:
  - name: "Gemini"
    slug: "gemini"
source_platform: "tomsguide.com"
source_date: "Undated"
source_url: "https://www.tomsguide.com/ai/i-turned-gemini-gems-into-automated-google-workspace-agents-heres-how"
fetched_from: "https://agentusecases.ai/use-case/summarize-emails-and-draft-replies-with-gemini-gem-flows"
---

# Summarize emails and draft replies with Gemini Gem flows

> The writer plugged a custom Gemini Gem into Workspace Studio flows that run in the background, summarize Gmail messages and create draft replies to review and send.

**Category:** Work & Operations  
**Agent:** Gemini  
**Source:** tomsguide.com · Undated

## What they did

The writer opened Google Workspace Studio, created a new flow from a Google template with a Gmail trigger, and added the Ask a Gem step so a custom Gem processes incoming mail in the background. She used the Gem's output to create Gmail draft replies, which she reviewed and sent herself. She ran a test, then switched the flow on.

## How it went

The flow worked after a test run, and she says the setup felt intuitive. She claims about 10 hours a week saved, but the article gives no measurements.

## Worth knowing

The Gem must be grounded in Google Drive files, because Gems that use extensions such as YouTube or Maps don't show up. Work accounts also need an admin to enable Gemini actions.

## Prompt

```text
Help me set up a background flow in Google Workspace Studio using a custom Gemini Gem. When new emails arrive in Gmail matching [label, sender, or topic], it should summarize each one in [2] sentences and create a draft reply in [my tone]. Drafts should only be saved, never sent. Walk me through setup and test it on [a few] recent emails.
```

## Related use cases

- [Orchestrate a multi-phase RAG migration](./orchestrate-a-multi-phase-rag-migration.md)
- [Hunt for unpatched vulnerabilities in SQLite commits](./hunt-for-unpatched-vulnerabilities-in-sqlite-commits.md)
- [Critique blog post drafts for technical errors](./critique-blog-post-drafts-for-technical-errors.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Check supplier invoices for duplicates and missing GST](./check-supplier-invoices-for-duplicates-and-missing-gst.md)
- [Scrape websites with a plain-language browser agent](./scrape-websites-with-a-plain-language-browser-agent.md)
