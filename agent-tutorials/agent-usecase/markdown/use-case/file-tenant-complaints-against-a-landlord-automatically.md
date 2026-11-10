---
title: "File tenant complaints against a landlord automatically"
slug: "file-tenant-complaints-against-a-landlord-automatically"
summary: "A Claude agent scraped violation databases and filed 14 complaints with the NYC housing board; the landlord was reportedly fined and the rent increase blocked."
category: "Money, Bills & Benefits"
agents:
  - name: "Claude"
    slug: "claude"
source_platform: "X"
source_date: "Apr 30, 2026"
source_url: "https://x.com/Argona0x/status/2049921143067288016"
fetched_from: "https://agentusecases.ai/use-case/file-tenant-complaints-against-a-landlord-automatically"
---

# File tenant complaints against a landlord automatically

> A Claude agent scraped violation databases and filed 14 complaints with the NYC housing board; the landlord was reportedly fined and the rent increase blocked.

**Category:** Money, Bills & Benefits  
**Agent:** Claude  
**Source:** X · Apr 30, 2026

## What they did

User told Claude code to act as tenant lawyer, find violations, and file them legally. The agent scraped HPD violation database and DOB history for the building BIN, pulled the full NYC housing code, matched unit issues to exact sections, drafted 14 311 complaints, filed them staggered on a $4 VPS workflow, tracked numbers in SQLite, and auto-replied to callbacks with user-uploaded photos.

## How it went

Nineteen days later the city fined the landlord $2,800, issued a class C designation, and blocked the rent raise. Inspector confirmed 14 violations; the agent later flagged two more.

## Worth knowing

Setup took 48 hours and ran on a $4 VPS.

## Prompt

```text
I rent at [my address, city]. Search [city's public housing violation database] for open violations on my building and list them with dates and case numbers. Then prepare a complaint form for each one using my details [name, unit, contact info]. Pause and show me each complaint before you submit anything.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Prospect, score leads and run outbound email sequences](./prospect-score-leads-and-run-outbound-email-sequences.md)
- [Build an anonymous wall of hopes and fears about AI](./build-an-anonymous-wall-of-hopes-and-fears-about-ai.md)
- [Shop for umbrella insurance through your personal agent](./shop-for-umbrella-insurance-through-your-personal-agent.md)
- [Prepare and file overdue German VAT statements](./prepare-and-file-overdue-german-vat-statements.md)
- [Pull stock fundamentals from SEC filings for valuation](./pull-stock-fundamentals-from-sec-filings-for-valuation.md)
