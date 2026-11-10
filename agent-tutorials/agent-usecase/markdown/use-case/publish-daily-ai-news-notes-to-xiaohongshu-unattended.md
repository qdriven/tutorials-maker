---
title: "Publish daily AI news notes to Xiaohongshu unattended"
slug: "publish-daily-ai-news-notes-to-xiaohongshu-unattended"
summary: "A cron-scheduled agent searches for AI news, verifies sources, writes and renders a post, and publishes via browser automation; 28 of 29 runs succeeded. · Oct 26, 2026"
category: "Sales, Marketing & Support"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_platform: "github.com"
source_date: "Oct 26, 2026 · Submitted by from search gap: xiaohongshu"
source_url: "https://github.com/Peng2505/xhs-daily-agent"
fetched_from: "https://agentusecases.ai/use-case/publish-daily-ai-news-notes-to-xiaohongshu-unattended"
---

# Publish daily AI news notes to Xiaohongshu unattended

> A cron-scheduled agent searches for AI news, verifies sources, writes and renders a post, and publishes via browser automation; 28 of 29 runs succeeded. · Oct 26, 2026

**Category:** Sales, Marketing & Support  
**Agent:** custom-built or unnamed agent  
**Source:** github.com · Oct 26, 2026 · Submitted by from search gap: xiaohongshu

## What they did

A 09:00 cron job wakes the agent. It runs 3–4 web searches over the past 24–48 hours, opens each original source to verify it, and writes a spec file with 5 points and their URLs. Scripts render 1080×1440 images, then drive a dedicated, already-logged-in Edge profile over Chrome DevTools Protocol to upload, fill and publish. Finally it checks that the post went live. A person logs in manually when the session expires.

## How it went

In 36 days, 28 of 29 scheduled runs published, with no duplicates. The one failure was a model API timeout. Each run took 4–8 minutes. Hashtags end up as plain, non-clickable text.

## Worth knowing

Publishing is brittle: the publish button sits in a closed shadow DOM, coordinate clicks fail at random, and the editor ignores key events. The repo documents 20 failure modes.

## Prompt

```text
Every day at [time], search for the top [number] news items about [topic] from the past 24 hours and verify each against at least two reliable sources. Write a short social post in [language/tone], render it as an image card, and save it to [folder]. Before publishing it to [platform], pause and show me the final text and image for approval. Finish by logging what was published, with the source links, and flag any run that failed.
```

## Related use cases

- [Sell services through an agent that takes payment and delivers](./sell-services-through-an-agent-that-takes-payment-and-delive.md)
- [Resolve customer calls proactively with AI agents](./resolve-customer-calls-proactively-with-ai-agents.md)
- [Run a Monday competitor-monitoring brief from job listings](./run-a-monday-competitor-monitoring-brief-from-job-listings.md)
- [Draft daily niche-news posts for four social platforms](./draft-daily-niche-news-posts-for-four-social-platforms.md)
- [Qualify leads and draft emails pending human approval](./qualify-leads-and-draft-emails-pending-human-approval.md)
- [Research and suggest X posts for Slack approval](./research-and-suggest-x-posts-for-slack-approval.md)
