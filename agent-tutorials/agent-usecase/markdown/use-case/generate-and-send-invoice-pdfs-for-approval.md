---
title: "Generate and send invoice PDFs for approval"
slug: "generate-and-send-invoice-pdfs-for-approval"
summary: "An AI skill prepares an invoice PDF for work or reimbursements and emails it to the user, then sends it once he replies yes or with corrections."
category: "Work & Operations"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_platform: "X"
source_date: "Oct 7, 2026"
source_url: "https://x.com/maietta/status/2107724318230954232"
fetched_from: "https://agentusecases.ai/use-case/generate-and-send-invoice-pdfs-for-approval"
---

# Generate and send invoice PDFs for approval

> An AI skill prepares an invoice PDF for work or reimbursements and emails it to the user, then sends it once he replies yes or with corrections.

**Category:** Work & Operations  
**Agent:** custom-built or unnamed agent  
**Source:** X · Oct 7, 2026

## What they did

User issues a command like "Bill them for $ amount for (work performed, reimbursements, etc)". The agent generates the invoice PDF on its own and emails it to the user. After the user replies yes or with corrections, the agent sends the final version to the recipient it already knows.

## How it went

The workflow runs as described with no reported metrics or shortfalls.

## Prompt

```text
Create an assistant that, when I message it about [work done or expenses to reimburse] for [client or company], generates an invoice PDF using my details [name, address, payment info] and these amounts [line items and rates]. Email the PDF to me first and wait. Only send it to [client email] after I reply yes, and if I reply with corrections, apply them and send me a revised version before anything goes out.
```

## Related use cases

- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Delegate calendar, inbox and travel booking to a personal work agent](./delegate-calendar-inbox-and-travel-booking-to-a-personal-wor.md)
- [Check supplier invoices for duplicates and missing GST](./check-supplier-invoices-for-duplicates-and-missing-gst.md)
- [Regrade assignments and update grades in Brightspace](./regrade-assignments-and-update-grades-in-brightspace.md)
- [Build a Telegram bot that sends emails and checks calendar](./build-a-telegram-bot-that-sends-emails-and-checks-calendar.md)
- [Generate recurring weekly reports combining KPIs and pull requests](./generate-recurring-weekly-reports-combining-kpis-and-pull-re.md)
