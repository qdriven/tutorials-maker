---
title: "Cut a hospital bill using Claude's Medicare price analysis"
slug: "cut-a-hospital-bill-using-claude-s-medicare-price-analysis"
summary: "Claude built a spreadsheet of Medicare prices per code on a $195,628 hospital bill; the user then wrote the letter and negotiated about $163,000 off himself, so Claude only analyzed."
category: "Money, Bills & Benefits"
agents:
  - name: "Claude"
    slug: "claude"
source_platform: "aol.com"
source_date: "Undated"
source_url: "https://www.aol.com/articles/used-claude-negotiate-163-000-100601051.html"
fetched_from: "https://agentusecases.ai/use-case/cut-a-hospital-bill-using-claude-s-medicare-price-analysis"
---

# Cut a hospital bill using Claude's Medicare price analysis

> Claude built a spreadsheet of Medicare prices per code on a $195,628 hospital bill; the user then wrote the letter and negotiated about $163,000 off himself, so Claude only analyzed.

**Category:** Money, Bills & Benefits  
**Agent:** Claude  
**Source:** aol.com · Undated

## What they did

Matt Rosenberg got the hospital to send its coded UB-04 form. He asked Claude to build a spreadsheet of Medicare payments per CPT code and flag anything needing more research. Claude asked about insurance type, location and year, then found unbundled charges, an inpatient-only bypass charge and a ventilation charge. He had ChatGPT check the work, spot-checked it himself for 20 minutes, then wrote the letter.

## How it went

Claude estimated Medicare would have paid about $28,675 against $195,628. The hospital countered at $36,356, and they settled near $32,500, which is roughly $163,000 off.

## Worth knowing

Claude's first spreadsheet showed zeros for bundled codes, so you have to ask follow-up questions. Rosenberg also verified the analysis and advises against using AI as your lawyer.

## Prompt

```text
I'll paste an itemized hospital bill totaling [amount] with its billing codes. For each code, look up the Medicare reimbursement rate and build a spreadsheet comparing billed charge, Medicare price, and the multiple. Highlight the biggest gaps and any duplicate or questionable charges, then suggest talking points for a negotiation letter that I'll write myself.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a charting tool from blood test PDFs](./build-a-charting-tool-from-blood-test-pdfs.md)
- [Build an anonymous wall of hopes and fears about AI](./build-an-anonymous-wall-of-hopes-and-fears-about-ai.md)
- [Shop for umbrella insurance through your personal agent](./shop-for-umbrella-insurance-through-your-personal-agent.md)
- [Prepare and file overdue German VAT statements](./prepare-and-file-overdue-german-vat-statements.md)
- [Pull stock fundamentals from SEC filings for valuation](./pull-stock-fundamentals-from-sec-filings-for-valuation.md)
