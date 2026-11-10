---
title: "Scrape freelancer leads and automate email and LinkedIn outreach"
slug: "scrape-freelancer-leads-and-automate-email-and-linkedin-outr"
summary: "The author used AI-built scripts (via Cursor) to scrape LinkedIn freelancer profiles, send personalized emails and DMs, and log engagement to promote a webinar; he calls it a proof of concept with ban risk."
category: "Sales, Marketing & Support"
agents:
  - name: "Cursor"
    slug: "cursor"
  - name: "ChatGPT"
    slug: "chatgpt"
source_platform: "goodreads.com"
source_date: "Undated"
source_url: "https://www.goodreads.com/author_blog_posts/25687929-building-ai-systems-that-work-for-me-automating-business-income-with"
fetched_from: "https://agentusecases.ai/use-case/scrape-freelancer-leads-and-automate-email-and-linkedin-outr"
---

# Scrape freelancer leads and automate email and LinkedIn outreach

> The author used AI-built scripts (via Cursor) to scrape LinkedIn freelancer profiles, send personalized emails and DMs, and log engagement to promote a webinar; he calls it a proof of concept with ban risk.

**Category:** Sales, Marketing & Support  
**Agent:** Cursor, ChatGPT  
**Source:** goodreads.com · Undated

## What they did

Jesse Stay built a Cursor IDE script that scraped LinkedIn profiles of freelancers in Mexico, pulled public emails, filtered for English speakers, and used proxies and anti-detection techniques. A Google Apps Script then sent personalized emails from Google Sheets, skipping duplicates and marking each lead as sent. He extended the Cursor script to send LinkedIn DMs and log engagement. Gmail replies were logged and GPT-4o sorted them.

## How it went

He says he built the whole system in one day, and that the run-once script "just worked". The post gives no response or sales numbers for the webinar.

## Worth knowing

Stay calls this a proof of concept and warns that repeated LinkedIn automation risks getting your account banned.

## Prompt

```text
Help me build a small script that takes a list of [target audience, e.g. freelancers] from [a CSV I provide or a source I am permitted to use], drafts a personalized email for each using [fields], and logs opens and replies to a CSV. Start with a dry run that only writes the drafts to a file, and do not send anything until I review them. Also add rate limits and flag any steps that could violate the terms of [platform] so I can decide how to proceed.
```

## Related use cases

- [Keep coding agents running autonomously for long stretches](./keep-coding-agents-running-autonomously-for-long-stretches.md)
- [Scaffold a new service end to end with agents](./scaffold-a-new-service-end-to-end-with-agents.md)
- [Reclaim forgotten crypto airdrops and deposits](./reclaim-forgotten-crypto-airdrops-and-deposits.md)
- [Sell services through an agent that takes payment and delivers](./sell-services-through-an-agent-that-takes-payment-and-delive.md)
- [Answer tenant and rental prospect questions with AI](./answer-tenant-and-rental-prospect-questions-with-ai.md)
- [Take orders for a sushi chain with an agent](./take-orders-for-a-sushi-chain-with-an-agent.md)
