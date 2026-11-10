---
title: "Research and draft cold outreach with Claude Code"
slug: "research-and-draft-cold-outreach-with-claude-code"
summary: "Claude Code handles research and drafting for cold outreach while a separate platform sends at scale."
category: "Sales, Marketing & Support"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "Reddit"
source_date: "Undated"
source_url: "https://www.reddit.com/r/AiAutomations/comments/1uf95tk/how_i_automated_my_cold_email_outreach_with"
fetched_from: "https://agentusecases.ai/use-case/research-and-draft-cold-outreach-with-claude-code"
---

# Research and draft cold outreach with Claude Code

> Claude Code handles research and drafting for cold outreach while a separate platform sends at scale.

**Category:** Sales, Marketing & Support  
**Agent:** Claude Code  
**Source:** Reddit · Undated

## What they did

The poster connected Claude Code to their Gmail inbox and Google Sheets, then let it research businesses and log each lead in a spreadsheet with the email address, location, and business-specific notes. Claude also drafted a personalized cold email for each business; the person reviewed the drafts at the end and sent them manually, and later said they had also started building a Google Maps API-based lead system.

## How it went

It appears to be working as a time-saver for research and draft writing, but the post gives no reply-rate or revenue numbers. The stated gaps were using a personal Gmail inbox and not having enough email validation capacity on ZeroBounce’s free tier.

## Worth knowing

The clearest catch is setup around sending: they were still on a personal Gmail account and said domain setup and email validation were still pending.

## Prompt

```text
I'm doing cold outreach for [my product/service] to [target audience]. For each lead in [path/to/leads file], research the company and draft a short first-touch email under [100] words in this tone: [tone]. Save the drafts to a file with a source link for each claim you used, and do not send anything. I'll upload the approved drafts to my sending platform myself.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Link journal entries and write book reviews in Obsidian](./link-journal-entries-and-write-book-reviews-in-obsidian.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Sell services through an agent that takes payment and delivers](./sell-services-through-an-agent-that-takes-payment-and-delive.md)
- [Manage customer enquiries from Telegram](./manage-customer-enquiries-from-telegram.md)
- [Run SEO strategy and content with Claude to grow a product](./run-seo-strategy-and-content-with-claude-to-grow-a-product.md)
