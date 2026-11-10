---
title: "Extract purchasing-card receipt data into a report cover sheet"
slug: "extract-purchasing-card-receipt-data-into-a-report-cover-she"
summary: "A Duke staff member tested Cowork on a receipt PDF; it crashed partway, though it handled a folder of PDFs and wrote results to an outputs folder."
category: "Work & Operations"
agents:
  - name: "Claude Cowork"
    slug: "claude-cowork"
source_platform: "sites.duke.edu"
source_date: "Feb 24, 2026"
source_url: "https://sites.duke.edu/ddmc/2026/02/24/what-claude-cowork-actually-does-and-what-it-doesnt/"
fetched_from: "https://agentusecases.ai/use-case/extract-purchasing-card-receipt-data-into-a-report-cover-she"
---

# Extract purchasing-card receipt data into a report cover sheet

> A Duke staff member tested Cowork on a receipt PDF; it crashed partway, though it handled a folder of PDFs and wrote results to an outputs folder.

**Category:** Work & Operations  
**Agent:** Claude Cowork  
**Source:** sites.duke.edu · Feb 24, 2026

## What they did

Stephen Toback pointed Cowork at a purchasing-card receipt PDF and asked it to extract the data and produce a cover sheet for his report, a job he normally does by hand. Cowork ran a Python script in its local Linux VM, hit an error, debugged it, and wrote the output files itself. He also pointed it at a folder of PDFs.

## How it went

The receipt workflow worked and the result files appeared in the outputs folder. Cowork then hung when his connectivity dropped. Restarting the app and the computer didn't fix it, and recovery required clearing the app's stored data.

## Worth knowing

Cowork's reasoning runs in Anthropic's cloud, so a connectivity drop mid-task can break the session. Avoid relying on it for time-sensitive work. Output files are ordinary files and survive the crash.

## Prompt

```text
I have purchasing-card receipts as PDFs in [folder path]. Extract vendor, date, amount and the business purpose from each one, and fill a cover sheet in the format of [template file or describe columns]. Process the files one at a time and save results to an outputs folder so progress isn't lost. List any receipts that couldn't be read.
```

## Related use cases

- [Summarize email and prep briefings from your phone](./summarize-email-and-prep-briefings-from-your-phone.md)
- [Turn trip receipts into an expense report and triage files](./turn-trip-receipts-into-an-expense-report-and-triage-files.md)
- [Fill out job applications in a browser](./fill-out-job-applications-in-a-browser.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Give a teacher a Claude Code workspace for lessons and reports](./give-a-teacher-a-claude-code-workspace-for-lessons-and-repor.md)
- [Give an agent a phone number to make and answer calls](./give-an-agent-a-phone-number-to-make-and-answer-calls.md)
