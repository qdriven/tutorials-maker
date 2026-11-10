---
title: "Extract vendor PDFs and create QuickBooks invoices"
slug: "extract-vendor-pdfs-and-create-quickbooks-invoices"
summary: "A custom integration built with Claude Code extracts data from vendor PDFs and creates categorized invoices in QuickBooks Online."
category: "Work & Operations"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "gotsheet.xyz"
source_date: "Undated"
source_url: "https://www.gotsheet.xyz/p/i-automated-quickbooks-w-claude-code"
fetched_from: "https://agentusecases.ai/use-case/extract-vendor-pdfs-and-create-quickbooks-invoices"
---

# Extract vendor PDFs and create QuickBooks invoices

> A custom integration built with Claude Code extracts data from vendor PDFs and creates categorized invoices in QuickBooks Online.

**Category:** Work & Operations  
**Agent:** Claude Code  
**Source:** gotsheet.xyz · Undated

## What they did

Eamonn Cottrell had already built, with Claude Code, an integration that reads vendor PDFs, categorizes items and creates QuickBooks Online invoices. He reopened the project and had Claude Code remove the remaining manual steps. It added PDF attachment through the QuickBooks attachment API, a prompt that asks for a category on unknown items and updates the master list itself, file cleanup, and duplicate checking.

## How it went

On a test run for another vendor workflow, it found 40 PDFs, created the QuickBooks records, attached the PDFs and cleaned up on its own. He says the workflow once took hours and now takes minutes. He tested duplicate protection by deliberately running the process twice.

## Worth knowing

He had never built a QuickBooks integration before, and the existing invoice-creation logic was left untouched while each improvement was added.

## Prompt

```text
Set up a workflow that extracts line-item data from vendor PDF invoices in [folder/email], categorizes expenses, and creates matching invoices in QuickBooks Online. Pause and show me the first few invoices it would create before it posts anything to QuickBooks.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Search years of research files in an Obsidian vault](./search-years-of-research-files-in-an-obsidian-vault.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Write end-of-sprint changelogs from completed tickets](./write-end-of-sprint-changelogs-from-completed-tickets.md)
- [Build a Telegram bot that sends emails and checks calendar](./build-a-telegram-bot-that-sends-emails-and-checks-calendar.md)
