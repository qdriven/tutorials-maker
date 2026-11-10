---
title: "Extract supplier invoice PDFs into a monday.com board"
slug: "extract-supplier-invoice-pdfs-into-a-monday-com-board"
summary: "A Make workflow watches a Google Drive folder for supplier invoice PDFs, extracts data with AI Extractors, and writes it into monday.com."
category: "Work & Operations"
agents:
  - name: "Make"
    slug: "make"
source_platform: "Reddit"
source_date: "Aug 17, 2026"
source_url: "https://www.reddit.com/r/Make/comments/1vknc6a/tutorial_automated_supplier_invoice_processing"
fetched_from: "https://agentusecases.ai/use-case/extract-supplier-invoice-pdfs-into-a-monday-com-board"
---

# Extract supplier invoice PDFs into a monday.com board

> A Make workflow watches a Google Drive folder for supplier invoice PDFs, extracts data with AI Extractors, and writes it into monday.com.

**Category:** Work & Operations  
**Agent:** Make  
**Source:** Reddit · Aug 17, 2026

## What they did

The tutorial shows a Make scenario that watches a chosen Google Drive folder for new supplier invoice PDFs, downloads each file, then sends it through Make’s AI Extractors to pull fields such as invoice number, vendor details, dates, and amounts. The extracted data is then written into a monday.com Supplier Invoices board, and the person is told to connect Google Drive and monday.com, have AI Extractor credits, apply the prebuilt scenario, and test it until every module passes.

## How it went

The stated result is that invoice processing that is normally manual can be done automatically in seconds. The post does not give accuracy rates, throughput figures, or edge cases beyond advising users to validate the scenario.

## Worth knowing

You need Make AI Extractor credits plus a prepared monday.com board and Google Drive connection; the post mainly points to a prebuilt scenario template rather than detailing exceptions or cleanup work.

## Prompt

```text
Build a Make scenario that watches my Google Drive folder [folder name] for new supplier invoice PDFs and extracts supplier, invoice number, date, line items, and total using AI extraction. Create one item per invoice on my monday.com board [board name], mapping fields to columns [column names], and flag any PDF with missing or unclear fields for my review. Test with [number] sample PDFs and show me the results before enabling it.
```

## Related use cases

- [Manage email, calendar and tasks from Slack](./manage-email-calendar-and-tasks-from-slack.md)
- [Summarize a YouTuber's latest video into a Google Doc daily](./summarize-a-youtuber-s-latest-video-into-a-google-doc-daily.md)
- [Enrich new CRM leads for personalized outreach](./enrich-new-crm-leads-for-personalized-outreach.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Create bills in QuickBooks from supplier invoices](./create-bills-in-quickbooks-from-supplier-invoices.md)
- [Draft follow-up emails automatically when no reply arrives](./draft-follow-up-emails-automatically-when-no-reply-arrives.md)
