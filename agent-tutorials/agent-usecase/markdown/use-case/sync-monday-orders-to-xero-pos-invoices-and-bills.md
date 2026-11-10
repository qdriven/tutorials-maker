---
title: "Sync Monday orders to Xero POs, invoices and bills"
slug: "sync-monday-orders-to-xero-pos-invoices-and-bills"
summary: "A Make.com setup for a client creates Xero purchase orders, emails client invoices, and matches supplier invoice uploads to bills, flagging failures for attention."
category: "Work & Operations"
agents:
  - name: "Make"
    slug: "make"
source_platform: "Reddit"
source_date: "May 18, 2026"
source_url: "https://www.reddit.com/r/mondaydotcom/comments/1tgn8rm/built_a_monday_xero_automation_in_makecom_sharing"
fetched_from: "https://agentusecases.ai/use-case/sync-monday-orders-to-xero-pos-invoices-and-bills"
---

# Sync Monday orders to Xero POs, invoices and bills

> A Make.com setup for a client creates Xero purchase orders, emails client invoices, and matches supplier invoice uploads to bills, flagging failures for attention.

**Category:** Work & Operations  
**Agent:** Make  
**Source:** Reddit · May 18, 2026

## What they did

The setup uses three Make.com scenarios triggered by Monday webhooks. When a PO item is marked Ready, it finds or creates the supplier in Xero, creates the purchase order with line items, downloads the PDF back onto the Monday item, and creates the matching bill; a client-invoice flow does the reverse and emails the invoice, while a supplier-upload flow takes a PDF added by an employee and attaches it to the matching Xero bill by PO reference.

## How it went

The author says all three flows were fully tested and running in production, with failures switching the Monday status to Needs Attention and adding a comment so staff can fix the data and retry. No results or volume numbers were given.

## Worth knowing

The main catch is that autonomy depends on clean status-based retries in Monday, so staff correct the item there instead of debugging inside Make.com.

## Prompt

```text
Build a Make scenario that watches my Monday.com board [board name] and, when an item reaches [status], creates a purchase order in Xero from its details and emails the client invoice. Also match supplier invoice files uploaded to [folder or column] to the right Xero bill, and post any failures or mismatches to [Slack channel or email] instead of guessing. Create the Xero records and emails in test mode first and show me a sample of each before turning anything live.
```

## Related use cases

- [Manage email, calendar and tasks from Slack](./manage-email-calendar-and-tasks-from-slack.md)
- [Summarize a YouTuber's latest video into a Google Doc daily](./summarize-a-youtuber-s-latest-video-into-a-google-doc-daily.md)
- [Enrich new CRM leads for personalized outreach](./enrich-new-crm-leads-for-personalized-outreach.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Create bills in QuickBooks from supplier invoices](./create-bills-in-quickbooks-from-supplier-invoices.md)
- [Draft follow-up emails automatically when no reply arrives](./draft-follow-up-emails-automatically-when-no-reply-arrives.md)
