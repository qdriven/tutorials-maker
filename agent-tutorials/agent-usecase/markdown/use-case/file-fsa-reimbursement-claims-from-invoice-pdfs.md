---
title: "File FSA reimbursement claims from invoice PDFs"
slug: "file-fsa-reimbursement-claims-from-invoice-pdfs"
summary: "Claude Code with the Chrome extension parsed Amazon invoice PDFs and spotted duplicates, but couldn't upload files and was slow, so the user had to step in."
category: "Money, Bills & Benefits"
agents:
  - name: "Claude Code"
    slug: "claude-code"
  - name: "Claude in Chrome"
    slug: "claude-in-chrome"
source_platform: "b2.broom9.com"
source_date: "Undated"
source_url: "https://b2.broom9.com/?p=14418"
fetched_from: "https://agentusecases.ai/use-case/file-fsa-reimbursement-claims-from-invoice-pdfs"
---

# File FSA reimbursement claims from invoice PDFs

> Claude Code with the Chrome extension parsed Amazon invoice PDFs and spotted duplicates, but couldn't upload files and was slow, so the user had to step in.

**Category:** Money, Bills & Benefits  
**Agent:** Claude Code, Claude in Chrome  
**Source:** b2.broom9.com · Undated

## What they did

The user exported 2025 Amazon invoice PDFs showing FSA-eligible amounts. They told Claude Code to read each PDF's eligible amount and order date, then submit a reimbursement claim in the already-open Optum portal through the Chrome extension. Claude parsed the PDFs and flagged two duplicates. The extension couldn't upload files, and ChatGPT agent mode and Claude Desktop also failed. Claude Code with Playwright MCP worked.

## How it went

Playwright MCP could upload files and ran faster. After the first submission Claude Code wrote a script for the rest, and about a dozen claims were submitted in roughly two minutes.

## Worth knowing

The Chrome extension needed other Chrome extensions disabled to take screenshots, and it took nearly a minute to find a button. Playwright MCP avoided both problems.

## Prompt

```text
Parse the invoice PDFs in [folder path] to extract amounts, dates and vendors for my FSA reimbursement claims, flagging any duplicates. Produce a clean summary spreadsheet ready for me to manually upload to my FSA portal, since file uploads may need to be done by hand.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Build a newsletter performance dashboard without coding](./build-a-newsletter-performance-dashboard-without-coding.md)
- [Migrate WordPress posts to MDX](./migrate-wordpress-posts-to-mdx.md)
- [Shop for umbrella insurance through your personal agent](./shop-for-umbrella-insurance-through-your-personal-agent.md)
- [Analyze budgets and research investments from bank data](./analyze-budgets-and-research-investments-from-bank-data.md)
- [Lower an internet bill and file expense reports](./lower-an-internet-bill-and-file-expense-reports.md)
