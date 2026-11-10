---
title: "Find recurring subscriptions in bank statements"
slug: "find-recurring-subscriptions-in-bank-statements"
summary: "Cowork reads a folder of bank statements, finds recurring charges and builds a dashboard of active and cancelled subscriptions and monthly savings."
category: "Money, Bills & Benefits"
agents:
  - name: "Claude Cowork"
    slug: "claude-cowork"
source_platform: "artificialcorner.com"
source_date: "Undated"
source_url: "https://artificialcorner.com/p/cowork-workflows"
fetched_from: "https://agentusecases.ai/use-case/find-recurring-subscriptions-in-bank-statements"
---

# Find recurring subscriptions in bank statements

> Cowork reads a folder of bank statements, finds recurring charges and builds a dashboard of active and cancelled subscriptions and monthly savings.

**Category:** Money, Bills & Benefits  
**Agent:** Claude Cowork  
**Source:** artificialcorner.com · Undated

## What they did

The author saved bank statements in a folder, one subfolder per bank with the month in each filename. Cowork read every file, in CSV, XLS, XLSX or PDF. It flagged charges repeating across two or more months, leaving out one-off purchases, groceries and bank fees. It then built an inline dashboard with a card per subscription, plus an .xlsx saved to the folder.

## How it went

The source shows the dashboard and report only as screenshots and gives no counts or savings totals. The author's example was a forgotten €5/month Glovo Premium subscription, noticed seven months late.

## Worth knowing

The source suggests scheduling the prompt monthly with Task Scheduler. The Canceled status column stays empty unless you confirm cancellations yourself.

## Prompt

```text
Read the bank statements in [folder path] and find every recurring charge. Build a simple dashboard or spreadsheet listing each subscription, its monthly cost, the last charge date, and whether it looks active or cancelled, plus the total monthly amount I could save if I cancelled the ones I flag. Stop when the list is complete, and do not cancel anything yourself.
```

## Related use cases

- [Summarize email and prep briefings from your phone](./summarize-email-and-prep-briefings-from-your-phone.md)
- [Build a 12-day homeschool curriculum from PDFs](./build-a-12-day-homeschool-curriculum-from-pdfs.md)
- [Fill out job applications in a browser](./fill-out-job-applications-in-a-browser.md)
- [Shop for umbrella insurance through your personal agent](./shop-for-umbrella-insurance-through-your-personal-agent.md)
- [Track personal finances nightly from bank emails](./track-personal-finances-nightly-from-bank-emails.md)
- [Audit credit card use for wrong-card charges and missed benefits](./audit-credit-card-use-for-wrong-card-charges-and-missed-bene.md)
