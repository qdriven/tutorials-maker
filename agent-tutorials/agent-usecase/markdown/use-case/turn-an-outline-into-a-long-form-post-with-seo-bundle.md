---
title: "Turn an outline into a long-form post with SEO bundle"
slug: "turn-an-outline-into-a-long-form-post-with-seo-bundle"
summary: "The author built an n8n workflow that expands an outline into a long-form post and generates an SEO bundle, chosen over GPT Agent Mode."
category: "Content & Creative"
agents:
  - name: "n8n"
    slug: "n8n"
  - name: "ChatGPT Agent"
    slug: "chatgpt-agent"
source_platform: "Reddit"
source_date: "Undated"
source_url: "https://www.reddit.com/r/n8n/comments/1my0dzq"
fetched_from: "https://agentusecases.ai/use-case/turn-an-outline-into-a-long-form-post-with-seo-bundle"
---

# Turn an outline into a long-form post with SEO bundle

> The author built an n8n workflow that expands an outline into a long-form post and generates an SEO bundle, chosen over GPT Agent Mode.

**Category:** Content & Creative  
**Agent:** n8n, ChatGPT Agent  
**Source:** Reddit · Undated

## What they did

They wired an n8n flow around a webhook that receives an item’s ID, title, summary, link, and featured image. The workflow turns the input into an outline, expands it into a roughly 500-word post, generates an SEO bundle, converts markdown to HTML, fetches and uploads the featured image to WordPress, creates a draft, writes Yoast fields, and updates Google Sheets for approval and status tracking; GPT Agent Mode was only used to help prototype the Python earlier.

## How it went

The result was a productionized pipeline for AI-news posts that outputs WordPress drafts with images and Yoast metadata. The author says they moved off GPT Agent Mode because approvals, retries, image upload, and visibility were better handled in n8n.

## Worth knowing

The main catch is that the approval loop and audit trail live in Google Sheets, and the author chose n8n specifically for determinism, retries, logs, and credential isolation.

## Prompt

```text
Build an n8n workflow that takes my outline for [topic] from [form, Google Doc, or webhook] and expands it into a long-form post of about [word count] words in [tone/voice]. Then generate an SEO bundle: title tag, meta description, URL slug, 5 keywords, and 3 headline options. It's done when the full draft and SEO bundle land in [Google Doc/Notion] for my review, and nothing is published automatically.
```

## Related use cases

- [Plan a family trip and pre-fill bookings](./plan-a-family-trip-and-pre-fill-bookings.md)
- [Handle routine email tasks and follow-up reminders with a personal assistant](./handle-routine-email-tasks-and-follow-up-reminders-with-a-pe.md)
- [Negotiate a TV price with a retailer's chat](./negotiate-a-tv-price-with-a-retailer-s-chat.md)
- [Produce a track in Ableton Live by talking](./produce-a-track-in-ableton-live-by-talking.md)
- [Turn videos and company research into slide decks](./turn-videos-and-company-research-into-slide-decks.md)
- [Make music videos, portfolio sites and sorting scripts](./make-music-videos-portfolio-sites-and-sorting-scripts.md)
