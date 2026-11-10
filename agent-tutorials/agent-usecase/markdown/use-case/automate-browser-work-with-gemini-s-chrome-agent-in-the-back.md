---
title: "Automate browser work with Gemini's Chrome agent in the background"
slug: "automate-browser-work-with-gemini-s-chrome-agent-in-the-back"
summary: "The poster uses Gemini's Chrome browser agent to automate browser tasks, and it keeps working while the tab is closed and they do other things."
category: "Work & Operations"
agents:
  - name: "Gemini"
    slug: "gemini"
source_platform: "Reddit"
source_date: "Undated"
source_url: "https://www.reddit.com/r/GeminiAI/comments/1s0bdhw/the_chrome_browser_agent_is_way_too_cool"
fetched_from: "https://agentusecases.ai/use-case/automate-browser-work-with-gemini-s-chrome-agent-in-the-back"
---

# Automate browser work with Gemini's Chrome agent in the background

> The poster uses Gemini's Chrome browser agent to automate browser tasks, and it keeps working while the tab is closed and they do other things.

**Category:** Work & Operations  
**Agent:** Gemini  
**Source:** Reddit · Undated

## What they did

The poster says Gemini’s Chrome browser agent can be given a defined protocol and left to work in its own tab even while they use other tabs or windows. In the comments, they explain they use it to partially automate subreddit moderation: they set rules and a process, the agent works through report queues, asks back when unsure, sends prewritten removal notices that disclose Gemini was used, and flags severe cases for later human review instead of banning users.

## How it went

They say it has helped a lot with thinning big moderation queues and has done a pretty good job. The main limits they mention are safety guardrails that sometimes stop actions, no ability to ban users, and availability only for Pro or Ultra subscribers in some countries.

## Worth knowing

Their main safeguard is keeping high-stakes actions manual: the agent can flag severe violations for review, but it cannot ban anyone.

## Prompt

```text
In Chrome, do this task for me in the background: [describe browser task, e.g. gather pricing from these 10 sites into a table]. Keep working while I use other tabs, and tell me when it is done with a summary of what you found. Pause and ask me before submitting any form, sending any message, or making any purchase.
```

## Related use cases

- [Orchestrate a multi-phase RAG migration](./orchestrate-a-multi-phase-rag-migration.md)
- [Vibe code an HTML5 browser game](./vibe-code-an-html5-browser-game.md)
- [Shop Etsy for party supplies within a budget](./shop-etsy-for-party-supplies-within-a-budget.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Check supplier invoices for duplicates and missing GST](./check-supplier-invoices-for-duplicates-and-missing-gst.md)
- [Scrape websites with a plain-language browser agent](./scrape-websites-with-a-plain-language-browser-agent.md)
