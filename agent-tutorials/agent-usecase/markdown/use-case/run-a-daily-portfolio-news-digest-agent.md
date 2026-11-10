---
title: "Run a daily portfolio news digest agent"
slug: "run-a-daily-portfolio-news-digest-agent"
summary: "A commenter runs an agent that automatically gathers news on their holdings and uses it each morning as a custom portfolio newsletter."
category: "Money, Bills & Benefits"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_platform: "Reddit"
source_date: "Undated"
source_url: "https://www.reddit.com/r/technology/comments/1vjtc0q/20_of_americans_are_already_using_ai_for"
fetched_from: "https://agentusecases.ai/use-case/run-a-daily-portfolio-news-digest-agent"
---

# Run a daily portfolio news digest agent

> A commenter runs an agent that automatically gathers news on their holdings and uses it each morning as a custom portfolio newsletter.

**Category:** Money, Bills & Benefits  
**Agent:** custom-built or unnamed agent  
**Source:** Reddit · Undated

## What they did

The commenter says they set up a Gemini Spark agent with a single prompt, leaning on Spark’s built-in access to Google Workspace rather than custom APIs. The agent continuously manages news on their holdings, automatically adds earnings calls to Google Calendar, and becomes a personalized morning newsletter; they contrast this with ChatGPT, where they say you’d need a custom GPT, Google Cloud OAuth, and an OpenAPI schema.

## How it went

They say it works very well and is more risk averse than they are. Beyond the digest, they also use it for DCF, budgeting, planning, and scenario forecasting, but they give no performance numbers or concrete investing results.

## Worth knowing

Their main catch is tooling: they say Spark is easy because it keeps running offline with Google Workspace access, while reproducing it in ChatGPT is a massive pain.

## Prompt

```text
Set up an assistant that every morning at [time] gathers the latest news on my holdings: [list of tickers or funds]. Summarize anything material, such as earnings, analyst changes, or major announcements, into a short newsletter with source links, highlighting the top three items. Send it to [my email] and ask me to confirm the draft format before turning on the daily schedule.
```

## Related use cases

- [Shop for umbrella insurance through your personal agent](./shop-for-umbrella-insurance-through-your-personal-agent.md)
- [Research stock positions as an AI analyst](./research-stock-positions-as-an-ai-analyst.md)
- [Review IRS Tax Court case files and draft a settlement letter](./review-irs-tax-court-case-files-and-draft-a-settlement-lette.md)
- [File tenant complaints against a landlord automatically](./file-tenant-complaints-against-a-landlord-automatically.md)
- [Monitor DeFi positions and alert on risky pools](./monitor-defi-positions-and-alert-on-risky-pools.md)
- [Reclaim forgotten crypto airdrops and deposits](./reclaim-forgotten-crypto-airdrops-and-deposits.md)
