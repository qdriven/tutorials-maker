---
title: "Let the bot email customers from your own domain"
slug: "let-the-bot-email-customers-from-your-own-domain"
summary: "The poster set up a custom-domain mailbox as an MCP connector for Grok Bot, plus a webhook so new mail triggers an automation."
category: "Work & Operations"
agents:
  - name: "Grok Bot"
    slug: "grok-bot"
source_platform: "Reddit"
source_date: "Oct 10, 2026"
source_url: "https://www.reddit.com/r/GrokBot/comments/1x2iafb/grokbot_email_after_a_day_the_limits_nobody"
fetched_from: "https://agentusecases.ai/use-case/let-the-bot-email-customers-from-your-own-domain"
---

# Let the bot email customers from your own domain

> The poster set up a custom-domain mailbox as an MCP connector for Grok Bot, plus a webhook so new mail triggers an automation.

**Category:** Work & Operations  
**Agent:** Grok Bot  
**Source:** Reddit · Oct 10, 2026

## What they did

The poster found Grok Bot’s built-in mail too limited for customer-facing use, so they created a mailbox on their own domain and connected it to Grok as a custom MCP connector. Because incoming mail does not wake the bot automatically, they also added a webhook that starts a Grok automation on each new message; they note the webhook had to use Grok’s signed whsec_ secret format, not a bearer token.

## How it went

It gave them a customer-facing address on their own domain and an inbox they could open themselves, while still letting the bot react to mail as it arrived. They say Grok’s native mail works for signups and verification codes, but shares one address across bots and has no inbox view or automatic trigger.

## Worth knowing

Their main gotcha was that Grok automation webhooks rejected bearer-token requests with 400s; only signed requests using the provided whsec_ secret worked.

## Prompt

```text
Connect to the mailbox [address@mydomain.com] so you can read and draft email as my business. When a new customer email arrives, categorize it, look up relevant details in [system or docs], and draft a reply in my tone. Show me each draft and wait for my approval before sending, until I say a category is safe to send automatically.
```

## Related use cases

- [Plan and book a short-notice work trip](./plan-and-book-a-short-notice-work-trip.md)
- [File receipts from a folder](./file-receipts-from-a-folder.md)
- [Monitor competitor marketplace prices](./monitor-competitor-marketplace-prices.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Send a 7am daily brief from email, calendar and Todoist](./send-a-7am-daily-brief-from-email-calendar-and-todoist.md)
- [Build a Telegram bot that sends emails and checks calendar](./build-a-telegram-bot-that-sends-emails-and-checks-calendar.md)
