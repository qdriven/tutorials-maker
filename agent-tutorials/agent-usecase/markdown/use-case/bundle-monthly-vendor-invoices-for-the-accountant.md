---
title: "Bundle monthly vendor invoices for the accountant"
slug: "bundle-monthly-vendor-invoices-for-the-accountant"
summary: "A scheduled bot pulls vendor, date, amount and invoice number from PDFs, bundles a month with an index, and waits for approval before sending to the accountant."
category: "Work & Operations"
agents:
  - name: "Grok Bot"
    slug: "grok-bot"
source_platform: "grokbot.dev"
source_date: "Undated"
source_url: "https://grokbot.dev/marketplace/invoice-hunter/"
fetched_from: "https://agentusecases.ai/use-case/bundle-monthly-vendor-invoices-for-the-accountant"
---

# Bundle monthly vendor invoices for the accountant

> A scheduled bot pulls vendor, date, amount and invoice number from PDFs, bundles a month with an index, and waits for approval before sending to the accountant.

**Category:** Work & Operations  
**Agent:** Grok Bot  
**Source:** grokbot.dev · Undated

## What they did

The shared Grok Bot template runs on a schedule rather than waiting to be asked. It reads each invoice PDF and extracts the vendor, date, amount and invoice number. It then bundles a whole month with an index. It holds the bundle until the owner approves it, and only then does anything go to the accountant.

## How it went

The page gives no results, numbers or time savings, and no examples of its output. It only describes what the bot is set up to do.

## Worth knowing

Adding the bot copies the shared instructions into your account. Read them before installing, and don't paste in any key or password it asks for.

## Prompt

```text
On the [day] of each month, collect vendor invoice PDFs from [folder or inbox] and extract vendor, date, amount, and invoice number into an index spreadsheet. Bundle the month's invoices and the index into one package. Before sending anything to [accountant's email], pause and show me the bundle and the draft email for approval.
```

## Related use cases

- [Plan and book a short-notice work trip](./plan-and-book-a-short-notice-work-trip.md)
- [Monitor PC memory and ask before closing apps](./monitor-pc-memory-and-ask-before-closing-apps.md)
- [Watch weekly deals and buy regular items](./watch-weekly-deals-and-buy-regular-items.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Send a 7am daily brief from email, calendar and Todoist](./send-a-7am-daily-brief-from-email-calendar-and-todoist.md)
- [Build a Telegram bot that sends emails and checks calendar](./build-a-telegram-bot-that-sends-emails-and-checks-calendar.md)
