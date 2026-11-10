---
title: "Sort tax documents and fill IRS forms"
slug: "sort-tax-documents-and-fill-irs-forms"
summary: "Author had Claude sort wage forms, 1099s and brokerage summary, extract numbers, and fill blank IRS forms, but did not let it file via browser automation."
category: "Money, Bills & Benefits"
agents:
  - name: "Claude"
    slug: "claude"
source_platform: "doempke.com"
source_date: "Undated"
source_url: "https://doempke.com/taxes-with-claude/"
fetched_from: "https://agentusecases.ai/use-case/sort-tax-documents-and-fill-irs-forms"
---

# Sort tax documents and fill IRS forms

> Author had Claude sort wage forms, 1099s and brokerage summary, extract numbers, and fill blank IRS forms, but did not let it file via browser automation.

**Category:** Money, Bills & Benefits  
**Agent:** Claude  
**Source:** doempke.com · Undated

## What they did

Geoffrey Doempke, a former PwC individual tax preparer, put wage forms, 1099s, a brokerage summary, and blank IRS forms with instructions into a folder. Claude, working in a terminal, classified each document, extracted the numbers, and wrote them to plain-text files he could inspect. He later added bank and credit card exports, which Claude categorized, asking questions when items were ambiguous. A skill then filled the forms. He also ran the return through TurboTax and reconciled the two.

## How it went

Claude and TurboTax agreed on almost everything, and he reconciled them to the dollar. Claude suggested a health insurance form and a deduction strategy. The form-filling skill checked Married Filing Separately instead of Single.

## Worth knowing

Check every checkbox on the filled forms yourself. The math was right but one box was wrong, and a second independent run in TurboTax helped catch differences.

## Prompt

```text
Sort the tax documents in [folder path] into wage forms, 1099s, and brokerage summaries. Extract the key numbers from each into a single spreadsheet, then fill the blank IRS forms [form names, e.g. 1040] saved in the same folder. You're done when I have a filled draft plus a list of any numbers you were unsure about. Don't file or submit anything online, and show me the draft before saving over any file.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Prospect, score leads and run outbound email sequences](./prospect-score-leads-and-run-outbound-email-sequences.md)
- [Build an anonymous wall of hopes and fears about AI](./build-an-anonymous-wall-of-hopes-and-fears-about-ai.md)
- [Shop for umbrella insurance through your personal agent](./shop-for-umbrella-insurance-through-your-personal-agent.md)
- [Prepare and file overdue German VAT statements](./prepare-and-file-overdue-german-vat-statements.md)
- [Pull stock fundamentals from SEC filings for valuation](./pull-stock-fundamentals-from-sec-filings-for-valuation.md)
