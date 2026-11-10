---
title: "Find tattoo clients on Reddit and draft replies"
slug: "find-tattoo-clients-on-reddit-and-draft-replies"
summary: "A tattoo artist runs a team of Grok Bot agents; one reads Reddit posts for local recommendation requests and drafts replies for human review before posting."
category: "Sales, Marketing & Support"
agents:
  - name: "Grok Bot"
    slug: "grok-bot"
source_platform: "Reddit"
source_date: "Oct 19, 2026"
source_url: "https://www.reddit.com/r/GrokBot/comments/1xa4kex/did_someone_managed_to_connect_grok_bot_to_reddit"
fetched_from: "https://agentusecases.ai/use-case/find-tattoo-clients-on-reddit-and-draft-replies"
---

# Find tattoo clients on Reddit and draft replies

> A tattoo artist runs a team of Grok Bot agents; one reads Reddit posts for local recommendation requests and drafts replies for human review before posting.

**Category:** Sales, Marketing & Support  
**Agent:** Grok Bot  
**Source:** Reddit · Oct 19, 2026

## What they did

The tattoo artist says they built a team of Grok Bot agents and wanted one to watch relevant subreddits for posts asking for tattoo artist recommendations in their city. In the thread, they describe using bots to spot those posts and either notify them or draft a response, while commenters suggest read-only access through a signed-in browser session, RSS/JSON feeds, or third-party connectors; one commenter says they only let the bot draft replies and a human reviews before publishing.

## How it went

The thread only shows the idea and workarounds, not a finished case study with results. It does make clear Reddit often blocks direct bot reading and that automated posting or DMs can get accounts flagged or banned.

## Worth knowing

The main catch is operational: people in the thread warn to keep the setup read-only and have a human post, because Reddit detects automation quickly.

## Prompt

```text
Every day, check [subreddits, e.g. my city's subreddit] for posts where people ask for [type of service] recommendations near [my city]. For each match, draft a friendly, non-spammy reply that mentions [my business and what makes it relevant] and give me the post link plus your draft. Do not post anything yourself; wait for me to review and approve each reply.
```

## Related use cases

- [Plan and book a short-notice work trip](./plan-and-book-a-short-notice-work-trip.md)
- [File receipts from a folder](./file-receipts-from-a-folder.md)
- [Monitor competitor marketplace prices](./monitor-competitor-marketplace-prices.md)
- [Sell services through an agent that takes payment and delivers](./sell-services-through-an-agent-that-takes-payment-and-delive.md)
- [Run brand marketing end to end and publish to social](./run-brand-marketing-end-to-end-and-publish-to-social.md)
- [Run business WhatsApp customer messages with an agent](./run-business-whatsapp-customer-messages-with-an-agent.md)
