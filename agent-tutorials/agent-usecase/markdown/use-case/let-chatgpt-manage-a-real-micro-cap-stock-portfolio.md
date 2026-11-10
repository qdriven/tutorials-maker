---
title: "Let ChatGPT manage a real micro-cap stock portfolio"
slug: "let-chatgpt-manage-a-real-micro-cap-stock-portfolio"
summary: "An author runs a 6-month experiment where ChatGPT gets daily price data and weekly Deep Research re-evaluations to manage a real micro-cap portfolio; week 5 limit orders mostly didn't fill."
category: "Money, Bills & Benefits"
agents:
  - name: "ChatGPT"
    slug: "chatgpt"
source_platform: "nathanbsmith729.substack.com"
source_date: "Undated"
source_url: "https://nathanbsmith729.substack.com/p/chatgpts-micro-cap-portfolio-week-9f4"
fetched_from: "https://agentusecases.ai/use-case/let-chatgpt-manage-a-real-micro-cap-stock-portfolio"
---

# Let ChatGPT manage a real micro-cap stock portfolio

> An author runs a 6-month experiment where ChatGPT gets daily price data and weekly Deep Research re-evaluations to manage a real micro-cap portfolio; week 5 limit orders mostly didn't fill.

**Category:** Money, Bills & Benefits  
**Agent:** ChatGPT  
**Source:** nathanbsmith729.substack.com · Undated

## What they did

Each trading day's end, the author gives ChatGPT real market data such as closing price and volume, and it has full control of the account. Once a week it runs Deep Research to re-evaluate the portfolio. In week 5 it placed limit orders, then turned defensive and trimmed ABEO from six shares to four. The author automates results and graphs with code on GitHub.

## How it went

Week 5 began with none of the planned orders executing. The AZTR limit sell missed, and the AXGN buy at $7.00 was far below the roughly $13 close. The portfolio ended with $32 cash, a Sharpe ratio of about 0.88 and a Sortino ratio of about 1.87.

## Worth knowing

The author accidentally reused the chat for coding debugging and had to start a new chat. He also plans to change the Deep Research prompt, which mostly researched new picks instead of reviewing the real portfolio.

## Prompt

```text
I want to run a paper-trading experiment on a [micro-cap / small-cap] portfolio with a starting balance of [amount]. Each week, use Deep Research on my current holdings and a watchlist of [tickers], then recommend buys, sells, or holds with a short reason and a limit price for each. Do not place real trades. End with a summary table of the proposed portfolio and which orders would likely not fill at those limit prices.
```

## Related use cases

- [Generate LEGO CAD models in LDraw with AI agents](./generate-lego-cad-models-in-ldraw-with-ai-agents.md)
- [Compile and filter apartment listings](./compile-and-filter-apartment-listings.md)
- [Run a 10-agent SEO content pipeline](./run-a-10-agent-seo-content-pipeline.md)
- [Shop for umbrella insurance through your personal agent](./shop-for-umbrella-insurance-through-your-personal-agent.md)
- [Negotiate a billing credit from AT&T](./negotiate-a-billing-credit-from-at-t.md)
- [Pull stock fundamentals from SEC filings for valuation](./pull-stock-fundamentals-from-sec-filings-for-valuation.md)
