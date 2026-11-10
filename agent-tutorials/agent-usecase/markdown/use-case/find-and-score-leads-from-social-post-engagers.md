---
title: "Find and score leads from social post engagers"
slug: "find-and-score-leads-from-social-post-engagers"
summary: "A Cowork agent scrapes LinkedIn post engagers via Apify, enriches via Apollo, scores them against an ideal customer, and drafts outreach for the best fits."
category: "Sales, Marketing & Support"
agents:
  - name: "Claude Cowork"
    slug: "claude-cowork"
source_platform: "pietromontaldo.substack.com"
source_date: "Undated"
source_url: "https://pietromontaldo.substack.com/p/find-leads-with-claude-cowork"
fetched_from: "https://agentusecases.ai/use-case/find-and-score-leads-from-social-post-engagers"
---

# Find and score leads from social post engagers

> A Cowork agent scrapes LinkedIn post engagers via Apify, enriches via Apollo, scores them against an ideal customer, and drafts outreach for the best fits.

**Category:** Sales, Marketing & Support  
**Agent:** Claude Cowork  
**Source:** pietromontaldo.substack.com · Undated

## What they did

Pietro connects Apify and Apollo to Claude, then points Cowork at a folder holding his company, ideal customer and offer details. Given a LinkedIn post URL, the agent picks an Apify scraper to pull commenters, enriches them through Apollo (which checks before spending credits), scores each 0–5 for fit, and drafts DMs for the 4s and 5s. He then saves the workflow as a skill.

## How it went

He reports a 48% response rate on the DMs, and says up to 400 signups per live event come from this. The source gives no sample sizes or details on how the scoring held up.

## Worth knowing

Save the whole skill folder, not just SKILL.md, because it holds the scoring rules and setup notes. Save the skill manually once the run finishes.

## Prompt

```text
Find people who engaged with this LinkedIn post: [post URL]. Enrich each one with their role, company and email, then score them 1 to 10 against my ideal customer: [describe job titles, company size, industry]. Save a spreadsheet ranked by score and draft a short outreach message for the top [number] fits. Save the drafts for my review and do not send anything.
```

## Related use cases

- [Summarize email and prep briefings from your phone](./summarize-email-and-prep-briefings-from-your-phone.md)
- [Build a 12-day homeschool curriculum from PDFs](./build-a-12-day-homeschool-curriculum-from-pdfs.md)
- [Fill out job applications in a browser](./fill-out-job-applications-in-a-browser.md)
- [Sell services through an agent that takes payment and delivers](./sell-services-through-an-agent-that-takes-payment-and-delive.md)
- [Find weak-web-presence businesses and pitch them with personalized outreach](./find-weak-web-presence-businesses-and-pitch-them-with-person.md)
- [Capture leads on WhatsApp and save them to Sheets](./capture-leads-on-whatsapp-and-save-them-to-sheets.md)
