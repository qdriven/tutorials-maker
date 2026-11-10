---
title: "Fill in flight delay compensation claim forms"
slug: "fill-in-flight-delay-compensation-claim-forms"
summary: "An agent checks what happened to a flight, works out compensation owed under the law, and fills in the airline's claim form, stopping before Submit."
category: "Money, Bills & Benefits"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_platform: "dev.to"
source_date: "Undated"
source_url: "https://dev.to/imarpan/i-built-an-ai-agent-that-fills-in-your-flight-delay-claim-ncb"
fetched_from: "https://agentusecases.ai/use-case/fill-in-flight-delay-compensation-claim-forms"
---

# Fill in flight delay compensation claim forms

> An agent checks what happened to a flight, works out compensation owed under the law, and fills in the airline's claim form, stopping before Submit.

**Category:** Money, Bills & Benefits  
**Agent:** custom-built or unnamed agent  
**Source:** dev.to · Undated

## What they did

Given a flight number and date, the agent converts the airline code, scrapes FlightAware gate times, and cross-checks them against AirHelp. A model reads the regulation live from legislation.gov.uk, and a built-in table of rules checks the amounts. It then fills Air India's claim form in a cloud browser, with an injected lock that blocks any submission.

## How it went

On Air India AI162 it found a 207-minute delay and an entitlement of £260 to £520. A full claim takes two to five minutes. A small model mis-filled fields, and 8 of 10 submit-trap pages got past the first text-based rule.

## Worth knowing

Each claim costs about 14 Anakin credits. Use a capable model (gpt-5-mini worked, gpt-4.1-nano mis-filled fields), and block submits in the page itself, not by matching button text.

## Prompt

```text
Check what happened to my flight [flight number] on [date] using public flight tracking sites, and work out whether I'm owed compensation under [EU261/other rule]. Then open [airline]'s claim form and fill it in using my details: [name, booking reference, contact info]. Stop before clicking Submit and show me the completed form and the amount you're claiming.
```

## Related use cases

- [Shop for umbrella insurance through your personal agent](./shop-for-umbrella-insurance-through-your-personal-agent.md)
- [Produce investment memos with Claude Cowork](./produce-investment-memos-with-claude-cowork.md)
- [Prepare federal and state tax returns from a folder](./prepare-federal-and-state-tax-returns-from-a-folder.md)
- [Research crypto assets and execute swaps and perps trades](./research-crypto-assets-and-execute-swaps-and-perps-trades.md)
- [Do taxes by selecting the right invoices](./do-taxes-by-selecting-the-right-invoices.md)
- [Cancel seven subscriptions and close the accounts](./cancel-seven-subscriptions-and-close-the-accounts.md)
