---
title: "Send daily trending social posts as content references"
slug: "send-daily-trending-social-posts-as-content-references"
summary: "An OpenClaw agent uses a social data API to send the author a morning digest of trending posts across X, Threads and LinkedIn to inform their own content."
category: "Sales, Marketing & Support"
agents:
  - name: "OpenClaw"
    slug: "openclaw"
source_platform: "HN"
source_date: "Apr 20, 2026"
source_url: "https://news.ycombinator.com/item?id=47838224"
fetched_from: "https://agentusecases.ai/use-case/send-daily-trending-social-posts-as-content-references"
---

# Send daily trending social posts as content references

> An OpenClaw agent uses a social data API to send the author a morning digest of trending posts across X, Threads and LinkedIn to inform their own content.

**Category:** Sales, Marketing & Support  
**Agent:** OpenClaw  
**Source:** HN · Apr 20, 2026

## What they did

The author built socialcrawl, a single-API-key service that pulls data from 21+ social platforms, and connected it to OpenClaw. Each morning the agent sends them the posts trending across X, Threads and LinkedIn over the previous 24 hours. The author then uses those posts as benchmarks and references when writing their own content.

## How it went

The author reports that over the following week their posts reached 100K views on Threads and gained 200 followers. The source gives no figures for X or LinkedIn.

## Worth knowing

The author built and promotes socialcrawl themselves, and the results are self-reported over one week; the service offers 100 free credits on signup.

## Prompt

```text
Every morning at [time], collect the top trending posts on [X, Threads, LinkedIn] about [my topics or niche] and send me a digest. For each post include a link, a one-line summary, and why it is working. Limit it to [number] posts. Finished means I receive a sample digest today so I can adjust the format.
```

## Related use cases

- [Manage 18 agents from a Notion workspace](./manage-18-agents-from-a-notion-workspace.md)
- [Edit video through chat with subtitles and export](./edit-video-through-chat-with-subtitles-and-export.md)
- [Draft messages, fill web forms and prototype sites by chat](./draft-messages-fill-web-forms-and-prototype-sites-by-chat.md)
- [Sell services through an agent that takes payment and delivers](./sell-services-through-an-agent-that-takes-payment-and-delive.md)
- [Generate customer-service agents from a URL that book appointments](./generate-customer-service-agents-from-a-url-that-book-appoin.md)
- [Run business WhatsApp customer messages with an agent](./run-business-whatsapp-customer-messages-with-an-agent.md)
