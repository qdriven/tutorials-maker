---
title: "Scrub your phone number from data brokers to stop spam"
slug: "scrub-your-phone-number-from-data-brokers-to-stop-spam"
summary: "A Grok Bot skill finds a user's number on people-search sites, files removal requests, completes confirmation emails and rechecks on a schedule."
category: "Life Admin & Home"
agents:
  - name: "Grok Bot"
    slug: "grok-bot"
source_platform: "teslarati.com"
source_date: "Undated"
source_url: "https://www.teslarati.com/grok-bot-spam-call-text-scrubber-elon-musk/"
fetched_from: "https://agentusecases.ai/use-case/scrub-your-phone-number-from-data-brokers-to-stop-spam"
---

# Scrub your phone number from data brokers to stop spam

> A Grok Bot skill finds a user's number on people-search sites, files removal requests, completes confirmation emails and rechecks on a schedule.

**Category:** Life Admin & Home  
**Agent:** Grok Bot  
**Source:** teslarati.com · Undated

## What they did

An X user, Arash, got tired of spam calls and had an AI bot find his number on listing sites and file removal requests. He then packaged that as a free skill called Spam-Call Scrubber. It needs the Grok Bot app. The skill submits opt-outs on people-search sites and data brokers, completes their confirmation emails, and rechecks on a schedule the user picks.

## How it went

The article reports no results, because it says the first users will have to find out whether call volume drops. It warns that listings can reappear and that illegal robocallers ignore registries.

## Worth knowing

It only works on sites that honor removal requests. Because listings can return, the scheduled rechecks matter, and the article says illegal robocallers won't be affected.

## Prompt

```text
Search the main people-search and data broker sites (Spokeo, Whitepages, BeenVerified, and similar) for my phone number [phone number] and name [full name, city]. For each listing you find, file an opt-out or removal request and complete any confirmation emails sent to [email address]. Pause and show me before submitting any form that asks for ID or payment. Finish by giving me a list of sites, request status, and set a recheck every [30] days.
```

## Related use cases

- [Plan and book a short-notice work trip](./plan-and-book-a-short-notice-work-trip.md)
- [File receipts from a folder](./file-receipts-from-a-folder.md)
- [Monitor competitor marketplace prices](./monitor-competitor-marketplace-prices.md)
- [Get a second opinion on an MRI](./get-a-second-opinion-on-an-mri.md)
- [Give an AI its own inbox to act as personal assistant](./give-an-ai-its-own-inbox-to-act-as-personal-assistant.md)
- [Run personal life admin with Claude Code skills](./run-personal-life-admin-with-claude-code-skills.md)
