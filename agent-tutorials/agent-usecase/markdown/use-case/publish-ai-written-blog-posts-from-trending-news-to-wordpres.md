---
title: "Publish AI-written blog posts from trending news to WordPress"
slug: "publish-ai-written-blog-posts-from-trending-news-to-wordpres"
summary: "An n8n pipeline turns RSS news into AI articles with SEO metadata and images, publishes to WordPress and logs them; the author notes generic content and duplicates as problems."
category: "Content & Creative"
agents:
  - name: "n8n"
    slug: "n8n"
source_platform: "dev.to"
source_date: "Undated"
source_url: "https://dev.to/grewup/automate-blog-publishing-with-n8n-ai-wordpress-full-workflowpublished-true-56cl"
fetched_from: "https://agentusecases.ai/use-case/publish-ai-written-blog-posts-from-trending-news-to-wordpres"
---

# Publish AI-written blog posts from trending news to WordPress

> An n8n pipeline turns RSS news into AI articles with SEO metadata and images, publishes to WordPress and logs them; the author notes generic content and duplicates as problems.

**Category:** Content & Creative  
**Agent:** n8n  
**Source:** dev.to · Undated

## What they did

A scheduled n8n workflow pulls RSS news from the last 24 hours and filters it down to niche-relevant topics. An AI step writes the title, intro, structured body, conclusion and SEO metadata, and a second step generates a featured image. The workflow then posts to the WordPress API with status publish and stores the topic, publish date and URL.

## How it went

The source gives no traffic or volume results. The author lists generic content, duplicate posts and SEO gaps as what breaks, and suggests enforced structure, the tracking log and added metadata as fixes.

## Worth knowing

The example request sets status to publish, so posts go live with no review step; the source never mentions human review. The full template is in a linked tutorial.

## Prompt

```text
Build an n8n workflow that pulls news from [RSS feeds about my topic], skips any story already covered by checking a log sheet, and writes an original article with SEO title, meta description and a featured image that adds [my own angle or opinion] rather than a generic rewrite. Save it as a WordPress draft, not published, and log it. Finish when one test article appears as a draft for me to review.
```

## Related use cases

- [Add todo items to Todoist from Telegram](./add-todo-items-to-todoist-from-telegram.md)
- [Answer WhatsApp customer questions and escalate to humans](./answer-whatsapp-customer-questions-and-escalate-to-humans.md)
- [Automate client onboarding and schedule PDFs](./automate-client-onboarding-and-schedule-pdfs.md)
- [Produce a track in Ableton Live by talking](./produce-a-track-in-ableton-live-by-talking.md)
- [Make an AI trends presentation](./make-an-ai-trends-presentation.md)
- [Run content creation with specialized bots](./run-content-creation-with-specialized-bots.md)
