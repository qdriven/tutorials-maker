---
title: "Check prospect fit and write cold email openers"
slug: "check-prospect-fit-and-write-cold-email-openers"
summary: "Claude Code automates checking whether companies fit the target and creates personalized openers, saving manual prospect checking."
category: "Sales, Marketing & Support"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "Reddit"
source_date: "Undated"
source_url: "https://www.reddit.com/r/coldemail/comments/1tbzhw3/claude_code_for_cold_email"
fetched_from: "https://agentusecases.ai/use-case/check-prospect-fit-and-write-cold-email-openers"
---

# Check prospect fit and write cold email openers

> Claude Code automates checking whether companies fit the target and creates personalized openers, saving manual prospect checking.

**Category:** Sales, Marketing & Support  
**Agent:** Claude Code  
**Source:** Reddit · Undated

## What they did

The poster starts with a broad company list exported from Apollo, then runs it through an AI segmentation tool they built with Claude Code. The tool scrapes each company website and labels it yes or no against their ICP; they remove the no companies, re-import the yes companies into Apollo, and then pull lead emails from those filtered accounts.

## How it went

It let them build highly segmented lists at bulk scale without doing the prospect checking by hand. In the thread, this example is about fit-checking and list building; it does not give numbers or describe the email-opener workflow in detail.

## Worth knowing

The key catch is that the post only describes the segmentation flow at a high level, not the exact prompt, stack, cost, or time needed to reproduce it.

## Prompt

```text
Here is my ideal customer profile: [industry, company size, signals that make a good fit]. Go through the companies in [path/to/companies file], check each one's website against this profile, and mark each as fit, not fit, or unsure with a one-line reason and source link. For the companies that fit, write a personalized email opener, then save the results to a new file without contacting anyone.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Link journal entries and write book reviews in Obsidian](./link-journal-entries-and-write-book-reviews-in-obsidian.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Sell services through an agent that takes payment and delivers](./sell-services-through-an-agent-that-takes-payment-and-delive.md)
- [Manage customer enquiries from Telegram](./manage-customer-enquiries-from-telegram.md)
- [Run SEO strategy and content with Claude to grow a product](./run-seo-strategy-and-content-with-claude-to-grow-a-product.md)
