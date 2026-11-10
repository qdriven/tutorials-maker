---
title: "Build a Telegram bot that sends emails and checks calendar"
slug: "build-a-telegram-bot-that-sends-emails-and-checks-calendar"
summary: "Julian Goldie used Replit's agents and automations feature to build a Telegram bot that sends emails and checks his calendar, taking 28 messages; the feature is in beta and buggy."
category: "Work & Operations"
agents:
  - name: "Replit Agent"
    slug: "replit-agent"
source_platform: "X"
source_date: "Undated"
source_url: "https://x.com/JulianGoldieSEO/status/1970461781899547063"
fetched_from: "https://agentusecases.ai/use-case/build-a-telegram-bot-that-sends-emails-and-checks-calendar"
---

# Build a Telegram bot that sends emails and checks calendar

> Julian Goldie used Replit's agents and automations feature to build a Telegram bot that sends emails and checks his calendar, taking 28 messages; the feature is in beta and buggy.

**Category:** Work & Operations  
**Agent:** Replit Agent  
**Source:** X · Undated

## What they did

Opened Replit agents and automations, entered OpenAI key, and connected Outlook via OAuth for email and calendar access. Selected Telegram bot trigger, then exchanged 28 messages describing the desired bot so the agent handled all API setup and code generation automatically before publishing.

## How it went

Produced a working Telegram bot that checked calendar gaps and sent Outlook meeting invites. Beta bugs included no persistent memory in the test playground and occasional formatting errors.

## Worth knowing

Requires own OpenAI API key; beta with bugs like needing a fresh Telegram bot for each deployment.

## Prompt

```text
Build me a Telegram bot that can send emails from my [email provider] account and check my [Google Calendar or other calendar] for upcoming events when I message it. Only respond to my Telegram user ID [your ID], and before sending any email, show me the recipient, subject and body and wait for me to confirm. When you are done, give me setup steps for the tokens and permissions I need to add, and run a test where I ask it 'what's on my calendar tomorrow?'
```

## Related use cases

- [Build a searchable map of funded companies](./build-a-searchable-map-of-funded-companies.md)
- [Ship a first iOS app to the App Store with Replit](./ship-a-first-ios-app-to-the-app-store-with-replit.md)
- [Build an RFP analysis tool](./build-an-rfp-analysis-tool.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Check supplier invoices for duplicates and missing GST](./check-supplier-invoices-for-duplicates-and-missing-gst.md)
- [Automate email replies, form data extraction, and lead notes](./automate-email-replies-form-data-extraction-and-lead-notes.md)
