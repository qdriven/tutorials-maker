---
title: "Check taxes against receipts and bank statements"
slug: "check-taxes-against-receipts-and-bank-statements"
summary: "A user had Claude compare tax figures with receipts and bank statements, flagging discrepancies, then reviewed the draft themselves."
category: "Money, Bills & Benefits"
agents:
  - name: "Claude"
    slug: "claude"
source_platform: "Reddit"
source_date: "Mar 1, 2026"
source_url: "https://www.reddit.com/r/ClaudeAI/comments/1rut65g/anyone_else_doing_taxes_with_claude"
fetched_from: "https://agentusecases.ai/use-case/check-taxes-against-receipts-and-bank-statements"
---

# Check taxes against receipts and bank statements

> A user had Claude compare tax figures with receipts and bank statements, flagging discrepancies, then reviewed the draft themselves.

**Category:** Money, Bills & Benefits  
**Agent:** Claude  
**Source:** Reddit · Mar 1, 2026

## What they did

The poster fed Claude Opus the numbers and dates from a more complicated household tax situation involving a spouse’s LLC, revenue and expense streams, and some public business names. Claude checked their first pass, caught issues like double-counted revenue and expenses and client attribution problems, rechecked the calculations, and produced a spreadsheet that the user then entered into FreeTaxUSA; the user says they also reviewed it against receipts and bank statements themselves.

## How it went

They say the final figures matched their receipts and bank statements after several prompts, and it helped enough that they skipped a CPA who had quoted $2,000. It was still a manual handoff into FreeTaxUSA rather than fully automated filing.

## Worth knowing

The privacy catch was that they only gave Claude numbers, dates, and a few public business names, not EINs, SSNs, or family or company names and addresses.

## Prompt

```text
I'm preparing my taxes for [year] in [country]. Below are my draft figures, and I've attached my receipts and bank statements. Compare them line by line, list any discrepancies, missing receipts, or deductions that look questionable, and say how confident you are in each flag. Finish with a short summary table, and note that I'll check everything myself before filing.

[paste figures]
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a charting tool from blood test PDFs](./build-a-charting-tool-from-blood-test-pdfs.md)
- [Build an anonymous wall of hopes and fears about AI](./build-an-anonymous-wall-of-hopes-and-fears-about-ai.md)
- [Shop for umbrella insurance through your personal agent](./shop-for-umbrella-insurance-through-your-personal-agent.md)
- [Prepare and file overdue German VAT statements](./prepare-and-file-overdue-german-vat-statements.md)
- [Pull stock fundamentals from SEC filings for valuation](./pull-stock-fundamentals-from-sec-filings-for-valuation.md)
