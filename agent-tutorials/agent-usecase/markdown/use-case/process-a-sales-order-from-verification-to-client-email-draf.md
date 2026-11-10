---
title: "Process a sales order from verification to client email draft"
slug: "process-a-sales-order-from-verification-to-client-email-draf"
summary: "Grok Bot logged a sales order, checked the PI against the PO and bank slip, fixed a deposit date error, built a commission register and packing list, and drafted a client email in Gmail."
category: "Work & Operations"
agents:
  - name: "Grok Bot"
    slug: "grok-bot"
source_platform: "X"
source_date: "Oct 8, 2026"
source_url: "https://x.com/rassailor/status/2108221352641741264"
fetched_from: "https://agentusecases.ai/use-case/process-a-sales-order-from-verification-to-client-email-draf"
---

# Process a sales order from verification to client email draft

> Grok Bot logged a sales order, checked the PI against the PO and bank slip, fixed a deposit date error, built a commission register and packing list, and drafted a client email in Gmail.

**Category:** Work & Operations  
**Agent:** Grok Bot  
**Source:** X · Oct 8, 2026

## What they did

User gave one instruction to the Grok Bot: log the order, move to October, and base commission on ship date. The agent located the PI, verified it against the PO and bank slip, flagged the deposit date error, logged the order, created a commission register, and notified the user. It then built a packing list from the factory message and saved a drafted client email in Gmail.

## How it went

All steps completed from the single call plus the factory message, with the user only receiving a completion ping.

## Prompt

```text
I have a new sales order for [client]. Check the proforma invoice against the PO and the bank slip [attach files], flag any mismatches such as dates or amounts, and then build a commission register entry and a packing list. Draft a client email in [Gmail] and leave it as a draft for me to review before anything is sent.
```

## Related use cases

- [Plan and book a short-notice work trip](./plan-and-book-a-short-notice-work-trip.md)
- [Monitor PC memory and ask before closing apps](./monitor-pc-memory-and-ask-before-closing-apps.md)
- [Watch weekly deals and buy regular items](./watch-weekly-deals-and-buy-regular-items.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Send a 7am daily brief from email, calendar and Todoist](./send-a-7am-daily-brief-from-email-calendar-and-todoist.md)
- [Build a Telegram bot that sends emails and checks calendar](./build-a-telegram-bot-that-sends-emails-and-checks-calendar.md)
