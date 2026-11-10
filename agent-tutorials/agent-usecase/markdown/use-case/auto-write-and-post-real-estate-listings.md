---
title: "Auto-write and post real-estate listings"
slug: "auto-write-and-post-real-estate-listings"
summary: "A commenter uses ChatGPT with n8n to read records, write listings, pull photos, make a video and auto-post to social media once a listing goes live."
category: "Sales, Marketing & Support"
agents:
  - name: "ChatGPT"
    slug: "chatgpt"
  - name: "n8n"
    slug: "n8n"
source_platform: "Reddit"
source_date: "Undated"
source_url: "https://www.reddit.com/r/RealEstateTechnology/comments/1rj04o0/is_ai_actually_saving_you_time_on_listing"
fetched_from: "https://agentusecases.ai/use-case/auto-write-and-post-real-estate-listings"
---

# Auto-write and post real-estate listings

> A commenter uses ChatGPT with n8n to read records, write listings, pull photos, make a video and auto-post to social media once a listing goes live.

**Category:** Sales, Marketing & Support  
**Agent:** ChatGPT, n8n  
**Source:** Reddit · Undated

## What they did

A commenter said they built an n8n workflow that automatically sorts listing photos into folders, reads records from a spreadsheet, and uses ChatGPT to write the listing copy. The same flow pulls photos, sends them to Tour Estate AI to create a video, and auto-posts to social once the listing is live; they still cautioned that AI output needs the right tools and human judgment.

## How it went

They called it a game changer for consistency and speed, and said Tour Estate AI can produce cinematic tours and vertical Reels from photos in about five minutes. They also said low-quality AI photos are showing up in the market, so tool choice matters.

## Worth knowing

The clearest practical benchmark was video: they said Tour Estate AI turns photos into tours and Reels in about 5 minutes.

## Prompt

```text
Build me a workflow that triggers when a new listing in [spreadsheet, CRM, or database] is marked as live. It should have ChatGPT write a listing description from the record's fields, pull the photos from [folder or URL], and queue a short video and posts for [social platforms]. Put a manual approval step before anything is published, and stop once the posts are scheduled and a summary is sent to [my email].
```

## Related use cases

- [Generate LEGO CAD models in LDraw with AI agents](./generate-lego-cad-models-in-ldraw-with-ai-agents.md)
- [Track daily arXiv papers into a Notion database](./track-daily-arxiv-papers-into-a-notion-database.md)
- [Run business WhatsApp customer messages with an agent](./run-business-whatsapp-customer-messages-with-an-agent.md)
- [Sell services through an agent that takes payment and delivers](./sell-services-through-an-agent-that-takes-payment-and-delive.md)
- [Run marketing campaigns, SEO and content with agents](./run-marketing-campaigns-seo-and-content-with-agents.md)
- [Run outbound sales from research to booked demos](./run-outbound-sales-from-research-to-booked-demos.md)
