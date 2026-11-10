---
title: "Build a self-hosted bookkeeping and finance app"
slug: "build-a-self-hosted-bookkeeping-and-finance-app"
summary: "Poster used Claude over a weekend to plan and build a self-hosted app that organizes receipts for an accountant and replaces paid bookkeeping software."
category: "Money, Bills & Benefits"
agents:
  - name: "Claude"
    slug: "claude"
source_platform: "Reddit"
source_date: "Jul 1, 2026"
source_url: "https://www.reddit.com/r/ClaudeAI/comments/1uerum1/spent_a_weekend_getting_claude_to_replace_quickbooks_and_quicken_the_plan_did_90_of_the_work_and_saved_me_500yr"
fetched_from: "https://agentusecases.ai/use-case/build-a-self-hosted-bookkeeping-and-finance-app"
---

# Build a self-hosted bookkeeping and finance app

> Poster used Claude over a weekend to plan and build a self-hosted app that organizes receipts for an accountant and replaces paid bookkeeping software.

**Category:** Money, Bills & Benefits  
**Agent:** Claude  
**Source:** Reddit · Jul 1, 2026

## What they did

The poster first used ChatGPT for a high-level accounting plan, then had Claude turn it into an implementation plan, and used Codex to find gaps before sending revisions back through Claude’s UltraPlan for a few rounds. They then ran the plan to build a self-hosted Mac app where bank transactions come in through an MCP, Claude tags them to Schedule C categories, uncertain items go to a review queue, and the poster’s fixes become reusable rules.

## How it went

They say it handled a couple thousand transactions, was built end to end in two days including a simple Android dashboard app, and cut their software spend from about $524 a year to a $60 yearly bank-feed cost. In comments they stress it is for a small, passive LLC and still gets professional review, with live bank feeds the hardest part.

## Worth knowing

The planning loop took about an hour of back-and-forth across GPT, Claude, Codex, and UltraPlan; wiring the MCP to live bank data was the only part they say needed real trial and error.

## Prompt

```text
Help me plan and build a self-hosted bookkeeping app for my [freelance/small business] that replaces [current paid software]. It should collect receipts, categorize expenses, and export a clean package for my accountant in [format]. Start by asking me about my needs, propose a simple stack I can run at home, then give me the code step by step. You're done when I can upload a receipt and export a monthly report.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a charting tool from blood test PDFs](./build-a-charting-tool-from-blood-test-pdfs.md)
- [Build an anonymous wall of hopes and fears about AI](./build-an-anonymous-wall-of-hopes-and-fears-about-ai.md)
- [Shop for umbrella insurance through your personal agent](./shop-for-umbrella-insurance-through-your-personal-agent.md)
- [Prepare and file overdue German VAT statements](./prepare-and-file-overdue-german-vat-statements.md)
- [Pull stock fundamentals from SEC filings for valuation](./pull-stock-fundamentals-from-sec-filings-for-valuation.md)
