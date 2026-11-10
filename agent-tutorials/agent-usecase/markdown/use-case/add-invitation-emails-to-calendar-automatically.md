---
title: "Add invitation emails to calendar automatically"
slug: "add-invitation-emails-to-calendar-automatically"
summary: "The poster uses Gemini daily to watch for invitation emails and add the event to their calendar with the Zoom link or location, saving them from writing responses."
category: "Work & Operations"
agents:
  - name: "Gemini"
    slug: "gemini"
source_platform: "Reddit"
source_date: "Sep 1, 2026"
source_url: "https://www.reddit.com/r/GeminiAI/comments/1wore7c/there_i_said_it_this_is_the_only_useful_feature"
fetched_from: "https://agentusecases.ai/use-case/add-invitation-emails-to-calendar-automatically"
---

# Add invitation emails to calendar automatically

> The poster uses Gemini daily to watch for invitation emails and add the event to their calendar with the Zoom link or location, saving them from writing responses.

**Category:** Work & Operations  
**Agent:** Gemini  
**Source:** Reddit · Sep 1, 2026

## What they did

The poster set up daily Gemini Spark schedules tied to their email. For meeting invites from certain senders, Spark reads the email, decides whether it is a mandatory invitation, and then adds it to the poster’s calendar with the Zoom link or physical location; the person’s role was setting the rules for which emails to watch.

## How it went

It removed the manual step of copying meeting details from email into the calendar and, by the poster’s account, works well enough that they use it every day. The thread gives no hard metrics or failure cases for this workflow.

## Worth knowing

The catch the poster mentions is that Spark requires an AI Pro plan.

## Prompt

```text
Each day, check my inbox for new invitation emails for [kinds of events, e.g. meetings, appointments, webinars]. For each one, add the event to my [Google Calendar name] with the right date, time, and the Zoom link or location in the description. Don't reply to anyone or accept on my behalf. If an invitation conflicts with something else or is missing a time, list it for me instead of adding it.
```

## Related use cases

- [Orchestrate a multi-phase RAG migration](./orchestrate-a-multi-phase-rag-migration.md)
- [Vibe code an HTML5 browser game](./vibe-code-an-html5-browser-game.md)
- [Shop Etsy for party supplies within a budget](./shop-etsy-for-party-supplies-within-a-budget.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Check supplier invoices for duplicates and missing GST](./check-supplier-invoices-for-duplicates-and-missing-gst.md)
- [Scrape websites with a plain-language browser agent](./scrape-websites-with-a-plain-language-browser-agent.md)
