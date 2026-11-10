---
title: "Extract invoice data and file it into a bookkeeping sheet"
slug: "extract-invoice-data-and-file-it-into-a-bookkeeping-sheet"
summary: "A self-hosted n8n workflow extracts accounting data from uploaded receipts and invoices with OpenAI, then after user review files the originals and appends data to a yearly sheet."
category: "Work & Operations"
agents:
  - name: "n8n"
    slug: "n8n"
source_platform: "github.com"
source_date: "Undated"
source_url: "https://github.com/Fabiano225/ai-invoice-automation"
fetched_from: "https://agentusecases.ai/use-case/extract-invoice-data-and-file-it-into-a-bookkeeping-sheet"
---

# Extract invoice data and file it into a bookkeeping sheet

> A self-hosted n8n workflow extracts accounting data from uploaded receipts and invoices with OpenAI, then after user review files the originals and appends data to a yearly sheet.

**Category:** Work & Operations  
**Agent:** n8n  
**Source:** github.com · Undated

## What they did

Users upload an image or PDF through a web page to an n8n webhook, which looks up the user by token in Google Sheets. Images go to OpenAI vision. PDFs have their text extracted first, then analyzed. The model returns structured JSON (date, merchant, gross amount, VAT rate, category) for the user to review and edit. On save, the file goes into a Drive user/month folder, and the data is appended to a yearly sheet.

## How it went

The source gives no accuracy or time-saving figures. It describes a working prototype with a demo video. The public repo holds sanitized exports that won't run until you configure your own credentials and IDs.

## Worth knowing

You need your own OpenAI, Google Drive and Sheets OAuth credentials, a user lookup sheet, a base Drive folder and an n8n webhook domain. The token lookup is a prototype stand-in for real authentication.

## Prompt

```text
Build a self-hosted n8n workflow where I upload receipts or invoices to [folder or form], and OpenAI extracts vendor, date, totals, tax and invoice number. Show me the extracted data for review, then on approval file the original in [Drive folder] and append a row to my [year] bookkeeping sheet. It's done when a sample invoice flows through; do not file or write anything until I approve.
```

## Related use cases

- [Add todo items to Todoist from Telegram](./add-todo-items-to-todoist-from-telegram.md)
- [Run 24/7 WhatsApp support and track application status](./run-24-7-whatsapp-support-and-track-application-status.md)
- [Automate client onboarding and schedule PDFs](./automate-client-onboarding-and-schedule-pdfs.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Give a teacher a Claude Code workspace for lessons and reports](./give-a-teacher-a-claude-code-workspace-for-lessons-and-repor.md)
- [Give an agent a phone number to make and answer calls](./give-an-agent-a-phone-number-to-make-and-answer-calls.md)
