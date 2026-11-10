---
title: "Review bookkeeping for errors with AI agents"
slug: "review-bookkeeping-for-errors-with-ai-agents"
summary: "A poster tested AI agents on a month of fake bookkeeping with six planted errors; they caught five and missed one."
category: "Money, Bills & Benefits"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_platform: "Reddit"
source_date: "Aug 2, 2026"
source_url: "https://www.reddit.com/r/AIToolsForSMB/comments/1uxrkgc/i_planted_six_errors_into_a_month_of_fake"
fetched_from: "https://agentusecases.ai/use-case/review-bookkeeping-for-errors-with-ai-agents"
---

# Review bookkeeping for errors with AI agents

> A poster tested AI agents on a month of fake bookkeeping with six planted errors; they caught five and missed one.

**Category:** Money, Bills & Benefits  
**Agent:** custom-built or unnamed agent  
**Source:** Reddit · Aug 2, 2026

## What they did

The poster created a fake month of bookkeeping for a nonexistent business, with realistic invoices, vendor payments, churn data, and six planted errors, then gave that dataset to their own AI agent setup alongside an answer key they wrote first. The agents reviewed it on their own and flagged issues without extra prompting; the human then checked mismatches, which also exposed two mistakes in the answer key itself.

## How it went

The agents caught five of the six planted errors unprompted, and two agents also noticed the grading logic had missed the sign-off rule behind the sixth. The poster says the more useful behavior was that some agents refused to answer when key inputs or definitions were missing.

## Worth knowing

The whole test took under half an hour and cost about $5.50.

## Prompt

```text
Here is my bookkeeping for [month]: [paste transactions or attach the file]. Review it for errors such as duplicates, miscategorized items, missing entries, wrong amounts, and transactions that don't reconcile with [bank statement or balance]. Finish with a list of each suspected error, the row it is on, why it looks wrong, and your confidence. Don't change anything; I'll fix the entries myself.
```

## Related use cases

- [Shop for umbrella insurance through your personal agent](./shop-for-umbrella-insurance-through-your-personal-agent.md)
- [Build an Excel portfolio tracker from trade logs](./build-an-excel-portfolio-tracker-from-trade-logs.md)
- [Track personal finances nightly from bank emails](./track-personal-finances-nightly-from-bank-emails.md)
- [Negotiate a lower fiber bill with AT&T chat](./negotiate-a-lower-fiber-bill-with-at-t-chat.md)
- [Run an 11-agent team for trading prep](./run-an-11-agent-team-for-trading-prep.md)
- [Track personal investments with a Claude-built portfolio tracker](./track-personal-investments-with-a-claude-built-portfolio-tra.md)
