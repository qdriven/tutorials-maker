---
title: "Deliver scheduled article digests to Telegram with OpenClaw cron jobs"
slug: "deliver-scheduled-article-digests-to-telegram-with-openclaw-"
summary: "A developer fixed OpenClaw cron jobs that ran without delivering by turning thinking mode off, after which six articles reached Telegram in 30 seconds."
category: "Work & Operations"
agents:
  - name: "OpenClaw"
    slug: "openclaw"
source_platform: "blog.rezvov.com"
source_date: "Undated"
source_url: "https://blog.rezvov.com/openclaw-troubleshooting-no-reply-workflow-auto-delivery-failures"
fetched_from: "https://agentusecases.ai/use-case/deliver-scheduled-article-digests-to-telegram-with-openclaw-"
---

# Deliver scheduled article digests to Telegram with OpenClaw cron jobs

> A developer fixed OpenClaw cron jobs that ran without delivering by turning thinking mode off, after which six articles reached Telegram in 30 seconds.

**Category:** Work & Operations  
**Agent:** OpenClaw  
**Source:** blog.rezvov.com · Undated

## What they did

The cron job scanned RSS feeds, filtered articles and wrote a digest. A separate announce agent then forwarded the digest to Telegram. With thinking on, the model did all its work inside the thinking block, so the summary was empty and nothing was sent. The developer set thinking to off in the heartbeat config, using DeepSeek Chat as the heartbeat/cron model, and added isolated sessions.

## How it went

With thinking enabled, jobs averaged 88 seconds and delivered nothing across five test runs. With thinking off, the same job took 30 seconds and delivered six articles to Telegram on the first attempt.

## Worth knowing

The delivered:true status only means the announce agent ran without error, so confirm in Telegram. A daily digest cost about $0.03/day on OpenRouter.

## Prompt

```text
My scheduled job that sends [N] article digests to [Telegram] at [time] runs but nothing arrives. Check the cron job settings and logs, find why delivery fails (try turning thinking mode off), and fix it. Finish by running it once so the digest actually shows up in Telegram, and ask before changing other jobs.
```

## Related use cases

- [Manage 18 agents from a Notion workspace](./manage-18-agents-from-a-notion-workspace.md)
- [Draft and publish blog posts with an SEO-aware agent](./draft-and-publish-blog-posts-with-an-seo-aware-agent.md)
- [Draft messages, fill web forms and prototype sites by chat](./draft-messages-fill-web-forms-and-prototype-sites-by-chat.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Check supplier invoices for duplicates and missing GST](./check-supplier-invoices-for-duplicates-and-missing-gst.md)
- [Give an agent a phone number to make and answer calls](./give-an-agent-a-phone-number-to-make-and-answer-calls.md)
