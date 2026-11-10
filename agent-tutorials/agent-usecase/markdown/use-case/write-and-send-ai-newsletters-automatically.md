---
title: "Write and send AI newsletters automatically"
slug: "write-and-send-ai-newsletters-automatically"
summary: "An n8n agent finds a trending AI topic, writes a newsletter with Gemini, formats it and emails it to subscribers without manual work."
category: "Content & Creative"
agents:
  - name: "n8n"
    slug: "n8n"
  - name: "Gemini"
    slug: "gemini"
source_platform: "dev.to"
source_date: "Undated"
source_url: "https://dev.to/techstuff/automating-ai-newsletters-with-n8n-the-newsletter-agent-workflow-2agj"
fetched_from: "https://agentusecases.ai/use-case/write-and-send-ai-newsletters-automatically"
---

# Write and send AI newsletters automatically

> An n8n agent finds a trending AI topic, writes a newsletter with Gemini, formats it and emails it to subscribers without manual work.

**Category:** Content & Creative  
**Agent:** n8n, Gemini  
**Source:** dev.to · Undated

## What they did

A schedule trigger starts an n8n workflow daily or weekly. One Gemini node picks a trending AI topic from the last 24–48 hours, and a second writes a structured HTML newsletter. A JavaScript Code node strips escape characters and metadata. The workflow then reads subscriber emails from a Google Sheet, aggregates them, and sends the email through Gmail.

## How it went

The article says the workflow runs on schedule with no manual effort and produces a styled email with a gradient header and topic badge. It gives no usage numbers or measured results.

## Worth knowing

Raw Gemini output needed cleanup code to avoid broken email layouts, and the author advises reviewing the first few outputs manually before fully automating.

## Prompt

```text
Build me an n8n workflow that runs every [day/week], finds a trending topic in [niche, e.g. AI] from [sources], and uses Gemini to write a newsletter in this voice: [tone description]. Format it as clean HTML and prepare it to send to my subscriber list in [email tool or sheet]. Before the send step is enabled, pause and show me the full draft and recipient count so I can approve it.
```

## Related use cases

- [Orchestrate a multi-phase RAG migration](./orchestrate-a-multi-phase-rag-migration.md)
- [Call and text appointment reminders every morning](./call-and-text-appointment-reminders-every-morning.md)
- [Critique blog post drafts for technical errors](./critique-blog-post-drafts-for-technical-errors.md)
- [Produce a track in Ableton Live by talking](./produce-a-track-in-ableton-live-by-talking.md)
- [Build a consultancy-style deck from a vague prompt](./build-a-consultancy-style-deck-from-a-vague-prompt.md)
- [Draft and publish LinkedIn posts from voice notes](./draft-and-publish-linkedin-posts-from-voice-notes.md)
