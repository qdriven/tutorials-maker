---
title: "Run finance project files through Claude Cowork"
slug: "run-finance-project-files-through-claude-cowork"
summary: "A portco CFO puts task files in a fresh folder for Cowork and moves them back afterward, and Claude is said to save the work of a full-time employee between projects."
category: "Work & Operations"
agents:
  - name: "Claude Cowork"
    slug: "claude-cowork"
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "Reddit"
source_date: "May 3, 2026"
source_url: "https://www.reddit.com/r/private_equity/comments/1t2983n/claude_cowork_anyone_using"
fetched_from: "https://agentusecases.ai/use-case/run-finance-project-files-through-claude-cowork"
---

# Run finance project files through Claude Cowork

> A portco CFO puts task files in a fresh folder for Cowork and moves them back afterward, and Claude is said to save the work of a full-time employee between projects.

**Category:** Work & Operations  
**Agent:** Claude Cowork, Claude Code  
**Source:** Reddit · May 3, 2026

## What they did

A portco CFO said they avoid file-deletion risk by putting only the files needed for a task into a new folder for Claude Cowork, then moving them back afterward. In the same thread, they described giving Claude project files with years of historical data plus instructions, then uploading a new ERP file so it could run scenario analysis; they also used Claude Code to build a payroll-variance web tool, with the human reviewing outputs for business-context nuances.

## How it went

They said Claude saves the work of an entire FTE between projects. Others in the thread reported faster modeling, flat headcount, and 10–15 hours a week saved, but stressed it has not fully automated everything and still needs checking for hallucinations and hidden errors.

## Worth knowing

The biggest catch described was rigor: keep Cowork scoped to a fresh folder, ask for an audit trail on Excel outputs, and expect human review rather than hands-off automation.

## Prompt

```text
I've put the files for [project name] in the folder [folder path]. Read everything there and do [task, e.g. build a variance analysis, reconcile the accounts, draft the board summary] following [any template or instructions file]. Save your output as [file type] in the same folder, with a short note listing your assumptions and anything you couldn't verify. Don't delete or overwrite the original files, and ask me before moving anything out of the folder.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Extract vendor PDFs and create QuickBooks invoices](./extract-vendor-pdfs-and-create-quickbooks-invoices.md)
- [Draft Reddit answers to reach a karma goal](./draft-reddit-answers-to-reach-a-karma-goal.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Delegate to-do items to AI agents](./delegate-to-do-items-to-ai-agents.md)
- [Turn receipts into CSV for bookkeeping](./turn-receipts-into-csv-for-bookkeeping.md)
