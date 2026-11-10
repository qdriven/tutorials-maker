---
title: "Run auto-outreach from a contact spreadsheet"
slug: "run-auto-outreach-from-a-contact-spreadsheet"
summary: "A reviewer built an outreach agent in Lindy that works from a spreadsheet of contacts and drafts tweets for approval rather than auto-posting."
category: "Sales, Marketing & Support"
agents:
  - name: "Lindy"
    slug: "lindy"
source_platform: "profitswarm.ai"
source_date: "Undated"
source_url: "https://profitswarm.ai/lindy-ai-review/"
fetched_from: "https://agentusecases.ai/use-case/run-auto-outreach-from-a-contact-spreadsheet"
---

# Run auto-outreach from a contact spreadsheet

> A reviewer built an outreach agent in Lindy that works from a spreadsheet of contacts and drafts tweets for approval rather than auto-posting.

**Category:** Sales, Marketing & Support  
**Agent:** Lindy  
**Source:** profitswarm.ai · Undated

## What they did

Woody Hayday built a small outreach agent in Lindy as a test for a later marketing agent. He added a trigger, a Perform Research step (a wrapped search prompt) with formatted output, an Add to Google Sheet step, and a Slack message. He later removed the Write step in the loop and reworked it so it creates drafts the way he wanted.

## How it went

It worked and was set up in minutes, producing the spreadsheet he wanted. It saved the file to the Drive root instead of his chosen folder, and loop debugging was hard.

## Worth knowing

Lindy asks for many Google permissions up front, and without filters on triggers like email it processes and bills for everything. The trial is $49 a month.

## Prompt

```text
Build me an outreach assistant that reads my contact spreadsheet at [link or name of spreadsheet], where each row has [columns, e.g. name, handle, company, notes]. For each contact I haven't reached yet, draft a short, personal tweet or message in [my tone, e.g. friendly and concise] that mentions something specific from their row. Do not post or send anything: put each draft in front of me for approval, and mark the row as drafted only after I approve it. Stop once every unmarked contact has a draft waiting for review.
```

## Related use cases

- [Spin up a customer-support agent from a prompt](./spin-up-a-customer-support-agent-from-a-prompt.md)
- [Compile a daily digest of Reddit AI tool chatter](./compile-a-daily-digest-of-reddit-ai-tool-chatter.md)
- [Turn Slack messages and sheet rows into Linear issues](./turn-slack-messages-and-sheet-rows-into-linear-issues.md)
- [Sell services through an agent that takes payment and delivers](./sell-services-through-an-agent-that-takes-payment-and-delive.md)
- [Turn a business website into a WhatsApp support agent](./turn-a-business-website-into-a-whatsapp-support-agent.md)
- [Extract prospecting data from a company CRM](./extract-prospecting-data-from-a-company-crm.md)
