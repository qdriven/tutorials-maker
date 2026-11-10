---
title: "Produce investment memos with Claude Cowork"
slug: "produce-investment-memos-with-claude-cowork"
summary: "The author walks non-developers through using Claude Cowork to produce a full investment memo in about 15 minutes and track the investment afterwards."
category: "Money, Bills & Benefits"
agents:
  - name: "Claude Cowork"
    slug: "claude-cowork"
source_platform: "investwithai.substack.com"
source_date: "Undated"
source_url: "https://investwithai.substack.com/p/9-steps-in-claude-cowork-to-automate"
fetched_from: "https://agentusecases.ai/use-case/produce-investment-memos-with-claude-cowork"
---

# Produce investment memos with Claude Cowork

> The author walks non-developers through using Claude Cowork to produce a full investment memo in about 15 minutes and track the investment afterwards.

**Category:** Money, Bills & Benefits  
**Agent:** Claude Cowork  
**Source:** investwithai.substack.com · Undated

## What they did

The author gave Claude Cowork access to a local folder and had it build a per-company structure. Using plain prompts, it downloaded Adyen's reports, transcripts and yfinance data, then wrote a business overview, an Excel model with a 3-scenario DCF and comps, a thesis memo and a one-pager. It also set up a weekly scheduled update task and turned the workflow into a reusable skill.

## How it went

The Adyen workflow finished in under 15 minutes, and the skill later produced an IREN memo and model in a couple of minutes. A commenter said the filing and transcript downloads often fail for other stocks.

## Worth knowing

Data gathering took about 5 minutes, mostly from hunting for transcripts. The weekly task only runs if the computer is on and Claude is open, and the author says to review the plan before running the skill.

## Prompt

```text
Write an investment memo on [company or ticker] for me. Cover the business, recent financials, competitors, key risks, valuation, and a clear buy/hold/pass view, citing the sources you used. Save it as a [Word doc or PDF] in my [folder], and also create a simple tracking sheet with the entry price, my thesis, and the dates and metrics I should review. Stop once both files are saved and give me a short summary.
```

## Related use cases

- [Summarize email and prep briefings from your phone](./summarize-email-and-prep-briefings-from-your-phone.md)
- [Build a 12-day homeschool curriculum from PDFs](./build-a-12-day-homeschool-curriculum-from-pdfs.md)
- [Fill out job applications in a browser](./fill-out-job-applications-in-a-browser.md)
- [Shop for umbrella insurance through your personal agent](./shop-for-umbrella-insurance-through-your-personal-agent.md)
- [Track personal finances nightly from bank emails](./track-personal-finances-nightly-from-bank-emails.md)
- [Audit credit card use for wrong-card charges and missed benefits](./audit-credit-card-use-for-wrong-card-charges-and-missed-bene.md)
