---
title: "Track household expenses from receipts and emails into a spreadsheet"
slug: "track-household-expenses-from-receipts-and-emails-into-a-spr"
summary: "ChatGPT Work reads receipt photos, Gmail purchase emails and card notifications, sorts them into a spreadsheet and saves receipt images to Google Drive."
category: "Money, Bills & Benefits"
agents:
  - name: "ChatGPT"
    slug: "chatgpt"
source_platform: "note.com"
source_date: "Undated"
source_url: "https://note.com/martins_day/n/nb513607050ce?hl=en"
fetched_from: "https://agentusecases.ai/use-case/track-household-expenses-from-receipts-and-emails-into-a-spr"
---

# Track household expenses from receipts and emails into a spreadsheet

> ChatGPT Work reads receipt photos, Gmail purchase emails and card notifications, sorts them into a spreadsheet and saves receipt images to Google Drive.

**Category:** Money, Bills & Benefits  
**Agent:** ChatGPT  
**Source:** note.com · Undated

## What they did

The author connected Google Drive (which also covers Sheets), Gmail and optionally Google Calendar through ChatGPT's plugin settings. They photograph a receipt on an iPhone and send it to a pinned ChatGPT Work thread. The agent logs it in a spreadsheet and saves the image to Drive. A daily 9 PM scheduled Gmail check flags card notifications and purchase emails not yet organized.

## How it went

Receipts are logged by photo alone, with a Drive link stored in each row. It cannot pull bank balances or card statement amounts automatically. The author also uses it to create invoices.

## Worth knowing

Only one Google account can apparently be connected, so consolidate your purchase emails into a single address first.

## Prompt

```text
Help me track household expenses. Read the receipt photos in [folder or upload], purchase emails in my [Gmail label], and card notifications in [source], then add each expense to a spreadsheet with date, merchant, amount, and category from [my categories]. Save receipt images to [Google Drive folder]. Show me the first 10 rows for approval before filling the rest, and don't delete or send anything.
```

## Related use cases

- [Generate LEGO CAD models in LDraw with AI agents](./generate-lego-cad-models-in-ldraw-with-ai-agents.md)
- [Turn spoken answers into a Todoist task list](./turn-spoken-answers-into-a-todoist-task-list.md)
- [Accelerate scientific research with Codex](./accelerate-scientific-research-with-codex.md)
- [Shop for umbrella insurance through your personal agent](./shop-for-umbrella-insurance-through-your-personal-agent.md)
- [File FSA reimbursement claims from invoice PDFs](./file-fsa-reimbursement-claims-from-invoice-pdfs.md)
- [Do taxes by selecting the right invoices](./do-taxes-by-selecting-the-right-invoices.md)
