---
title: "Generate prompts for a browser agent to execute trades"
slug: "generate-prompts-for-a-browser-agent-to-execute-trades"
summary: "A developer's signal generator reads stock and crypto portfolio files and produces browser-automation prompts for Perplexity Comet to execute trades on brokerage sites."
category: "Money, Bills & Benefits"
agents:
  - name: "Perplexity Comet"
    slug: "perplexity-comet"
source_platform: "github.com"
source_date: "Undated"
source_url: "https://github.com/cometportfolio/CometAgent"
fetched_from: "https://agentusecases.ai/use-case/generate-prompts-for-a-browser-agent-to-execute-trades"
---

# Generate prompts for a browser agent to execute trades

> A developer's signal generator reads stock and crypto portfolio files and produces browser-automation prompts for Perplexity Comet to execute trades on brokerage sites.

**Category:** Money, Bills & Benefits  
**Agent:** Perplexity Comet  
**Source:** github.com · Undated

## What they did

A Python script reads a CSV or Excel portfolio. It scores each holding from technical indicators, Yahoo Finance news sentiment and X posts, using weights set by time horizon. It maps scores to Strong Buy, Buy, Hold, Trim or Sell with allocation changes. It then writes a signals CSV and a text file of brokerage-specific prompts for Comet. Prompts pause for 2FA and order confirmation.

## How it went

The repo includes sample signal and prompt files from several runs, plus backtest outputs. The README gives no trade-execution results or performance numbers.

## Worth knowing

The README calls it educational, not financial advice, and recommends testing with paper trading first. Always review signals and prompts before Comet submits orders.

## Prompt

```text
Write a script that reads my portfolio files in [folder] and turns my trading signals into clear step-by-step instructions I can give a browser agent for [brokerage site]. Each instruction should include the ticker, buy or sell, quantity and limit price. Output them to [file] for me to review, and make sure the instructions tell the agent to stop and ask me before submitting any order.
```

## Related use cases

- [Find coffee makers under $100 and add options to the cart](./find-coffee-makers-under-100-and-add-options-to-the-cart.md)
- [Build an Instacart list for a charcuterie board](./build-an-instacart-list-for-a-charcuterie-board.md)
- [Follow an account and comment on LinkedIn](./follow-an-account-and-comment-on-linkedin.md)
- [Shop for umbrella insurance through your personal agent](./shop-for-umbrella-insurance-through-your-personal-agent.md)
- [Review IRS Tax Court case files and draft a settlement letter](./review-irs-tax-court-case-files-and-draft-a-settlement-lette.md)
- [Monitor DeFi positions and alert on risky pools](./monitor-defi-positions-and-alert-on-risky-pools.md)
