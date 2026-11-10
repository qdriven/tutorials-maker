---
title: "Repurpose customer interviews into posts and newsletter copy"
slug: "repurpose-customer-interviews-into-posts-and-newsletter-copy"
summary: "A reusable Cowork skill turns one customer interview into a blog post, LinkedIn update and newsletter paragraph, with human review at each stage."
category: "Sales, Marketing & Support"
agents:
  - name: "Claude Cowork"
    slug: "claude-cowork"
source_platform: "aidecode.substack.com"
source_date: "Undated"
source_url: "https://aidecode.substack.com/p/building-a-content-repurposing-skill"
fetched_from: "https://agentusecases.ai/use-case/repurpose-customer-interviews-into-posts-and-newsletter-copy"
---

# Repurpose customer interviews into posts and newsletter copy

> A reusable Cowork skill turns one customer interview into a blog post, LinkedIn update and newsletter paragraph, with human review at each stage.

**Category:** Sales, Marketing & Support  
**Agent:** Claude Cowork  
**Source:** aidecode.substack.com · Undated

## What they did

The skill reads a folder holding a brief.txt, the interview video and photos. It transcribes the video with local Whisper, or falls back to TurboScribe in Chrome. It drafts a journalistic blog post and waits for approval, then uses the approved blog to write the LinkedIn post and newsletter paragraph. It saves each as a draft in the CMS, LinkedIn and email tool. It never publishes.

## How it went

The author says setting up the skill takes about an hour for the first interview and about ten minutes for each one after. The source gives no sample outputs. Photos are not handled automatically.

## Worth knowing

Most of the effort goes into writing down your style rules from your best existing pieces. Without them the output reads as generic marketing copy that you end up rewriting.

## Prompt

```text
Take this customer interview transcript [paste text or link] and turn it into a blog post draft, a LinkedIn update and a short newsletter paragraph in my brand voice. Show me each piece for review and edits before anything is published or sent anywhere.
```

## Related use cases

- [Summarize email and prep briefings from your phone](./summarize-email-and-prep-briefings-from-your-phone.md)
- [Turn trip receipts into an expense report and triage files](./turn-trip-receipts-into-an-expense-report-and-triage-files.md)
- [Fill out job applications in a browser](./fill-out-job-applications-in-a-browser.md)
- [Sell services through an agent that takes payment and delivers](./sell-services-through-an-agent-that-takes-payment-and-delive.md)
- [Find weak-web-presence businesses and pitch them with personalized outreach](./find-weak-web-presence-businesses-and-pitch-them-with-person.md)
- [Capture leads on WhatsApp and save them to Sheets](./capture-leads-on-whatsapp-and-save-them-to-sheets.md)
