---
title: "Compare grocery prices across stores from a list"
slug: "compare-grocery-prices-across-stores-from-a-list"
summary: "A tech worker built a Gemini browser agent that takes a typed or scanned handwritten grocery list and compares prices on Amazon Fresh and Flipkart Minutes."
category: "Shopping & Errands"
agents:
  - name: "Gemini"
    slug: "gemini"
source_platform: "medium.com"
source_date: "Undated"
source_url: "https://medium.com/google-cloud/effortless-grocery-shopping-creating-an-ai-agent-with-gemini-to-automate-your-purchases-a1c51973633b"
fetched_from: "https://agentusecases.ai/use-case/compare-grocery-prices-across-stores-from-a-list"
---

# Compare grocery prices across stores from a list

> A tech worker built a Gemini browser agent that takes a typed or scanned handwritten grocery list and compares prices on Amazon Fresh and Flipkart Minutes.

**Category:** Shopping & Errands  
**Agent:** Gemini  
**Source:** medium.com · Undated

## What they did

Vikas Ranjan built an assistant called Dinu Kaka with the browser-use library (Playwright), driven by Gemini 2.0 Flash in his own Chrome. You type a list or upload a handwritten one, and the agent searches each item on Amazon Fresh and Flipkart Minutes. It screenshots prices, discounts and delivery details, picks the best option, adds it to the cart and writes a summary report.

## How it went

The author says it freed up his weekends and gets him good deals without hours of research. The article gives no timings, savings figures or accuracy results, and a reader asked how long a 15–20 item list takes.

## Worth knowing

The published code is simplified, and its task prompt doesn't show how the list is passed in. Check the linked GitHub repo for the real setup.

## Prompt

```text
Here is my grocery list: [paste list or attach a photo of a handwritten list]. Compare prices for each item across [store 1] and [store 2], noting pack sizes and anything out of stock. Give me a table with the cheapest option per item and the total per store. Do not add anything to a cart or place an order without showing me first.
```

## Related use cases

- [Orchestrate a multi-phase RAG migration](./orchestrate-a-multi-phase-rag-migration.md)
- [Hunt for unpatched vulnerabilities in SQLite commits](./hunt-for-unpatched-vulnerabilities-in-sqlite-commits.md)
- [Critique blog post drafts for technical errors](./critique-blog-post-drafts-for-technical-errors.md)
- [Order groceries online with a local LLM skill](./order-groceries-online-with-a-local-llm-skill.md)
- [Find vegetarian restaurants and save notes via computer use](./find-vegetarian-restaurants-and-save-notes-via-computer-use.md)
- [Shop, play a game and compile course info with Operator](./shop-play-a-game-and-compile-course-info-with-operator.md)
