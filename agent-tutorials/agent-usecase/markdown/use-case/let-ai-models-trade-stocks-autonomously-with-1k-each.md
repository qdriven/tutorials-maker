---
title: "Let AI models trade stocks autonomously with $1k each"
slug: "let-ai-models-trade-stocks-autonomously-with-1k-each"
summary: "Poster ran four AI models on a weekday pre-market prompt to trade $1,000 portfolios each for nine weeks; ChatGPT came out ahead."
category: "Money, Bills & Benefits"
agents:
  - name: "Gemini"
    slug: "gemini"
source_platform: "Reddit"
source_date: "Mar 12, 2026"
source_url: "https://www.reddit.com/r/ChatGPT/comments/1rq33za/chatgpt_vs_gemini_vs_claude_vs_perplexity_i_gave"
fetched_from: "https://agentusecases.ai/use-case/let-ai-models-trade-stocks-autonomously-with-1k-each"
---

# Let AI models trade stocks autonomously with $1k each

> Poster ran four AI models on a weekday pre-market prompt to trade $1,000 portfolios each for nine weeks; ChatGPT came out ahead.

**Category:** Money, Bills & Benefits  
**Agent:** Gemini  
**Source:** Reddit · Mar 12, 2026

## What they did

The poster set up four paper-trading portfolios with $1,000 each on Alpaca and ran the same weekday pre-market prompt against ChatGPT, Gemini, Claude, and Perplexity with Deep Research enabled. Each model could only return BUY, SELL, HOLD, or CANCEL, the trading flow was automated in Python and logged publicly, and the poster says they did not override any decisions.

## How it went

After nine weeks, ChatGPT led at +21.1%, helped by healthcare picks including IOVA doubling and ACHC rising 52%. Perplexity was +1.1%, Gemini -6.6%, Claude -11.5%, and the poster stressed it was paper money and too early to trust blindly.

## Worth knowing

One practical catch from the thread is that ChatGPT sat entirely in cash for almost three weeks before making trades, so the system may do nothing for long stretches.

## Prompt

```text
Every weekday before the market opens, review a paper-trading portfolio of $[1000] and suggest trades based on [your strategy or risk level], using only simulated money. Record each decision with a one-sentence reason and the portfolio value in a running log. After [number] weeks, summarize performance against [benchmark, e.g. S&P 500]. Do not place any real orders; show me any proposed trade for approval first.
```

## Related use cases

- [Orchestrate a multi-phase RAG migration](./orchestrate-a-multi-phase-rag-migration.md)
- [Vibe code an HTML5 browser game](./vibe-code-an-html5-browser-game.md)
- [Critique blog post drafts for technical errors](./critique-blog-post-drafts-for-technical-errors.md)
- [Shop for umbrella insurance through your personal agent](./shop-for-umbrella-insurance-through-your-personal-agent.md)
- [File FSA reimbursement claims from invoice PDFs](./file-fsa-reimbursement-claims-from-invoice-pdfs.md)
- [Monitor DeFi positions and alert on risky pools](./monitor-defi-positions-and-alert-on-risky-pools.md)
