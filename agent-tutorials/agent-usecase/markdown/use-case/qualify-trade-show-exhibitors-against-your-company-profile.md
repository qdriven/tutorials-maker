---
title: "Qualify trade show exhibitors against your company profile"
slug: "qualify-trade-show-exhibitors-against-your-company-profile"
summary: "An n8n AI agent researches companies from a trade show listing by scraping their sites, scores fit, and appends reasoning to a Google Sheet."
category: "Sales, Marketing & Support"
agents:
  - name: "n8n"
    slug: "n8n"
source_platform: "dev.to"
source_date: "Undated"
source_url: "https://dev.to/andremoreira73/using-agents-for-business-development-51i6"
fetched_from: "https://agentusecases.ai/use-case/qualify-trade-show-exhibitors-against-your-company-profile"
---

# Qualify trade show exhibitors against your company profile

> An n8n AI agent researches companies from a trade show listing by scraping their sites, scores fit, and appends reasoning to a Google Sheet.

**Category:** Sales, Marketing & Support  
**Agent:** n8n  
**Source:** dev.to · Undated

## What they did

Bright Data scrapes the exhibitor list, and code parses out names, descriptions, booths and URLs. Companies go through in batches to an n8n AI agent (GPT-5-mini) whose system prompt describes the author's company and ideal client. The agent searches with SerpAPI and scrapes company sites, then returns size, a low/medium/high score and reasoning. Rows are appended to a Google Sheet.

## How it went

The author reports it ran with no manual intervention and turns hours of research into a prioritized visit list. The post gives no accuracy figures, and it only ran small test batches while he was developing it.

## Worth knowing

The batch size was kept small during development to control API costs. The workflow runs stateless, so each company is judged independently, and the prompt tells the agent to leave blanks rather than guess.

## Prompt

```text
Build a workflow that reads exhibitors from [trade show listing URL or sheet], visits each company's website, and has an AI agent judge how well they fit my company: [what we sell and who we sell to]. Append a fit score from 1-10 and a short reasoning to a Google Sheet called [name], one row per exhibitor. The job is done when every exhibitor has a row, and nothing should be sent to any company.
```

## Related use cases

- [Add todo items to Todoist from Telegram](./add-todo-items-to-todoist-from-telegram.md)
- [Publish AI-written blog posts from trending news to WordPress](./publish-ai-written-blog-posts-from-trending-news-to-wordpres.md)
- [Write and send AI newsletters automatically](./write-and-send-ai-newsletters-automatically.md)
- [Sell services through an agent that takes payment and delivers](./sell-services-through-an-agent-that-takes-payment-and-delive.md)
- [Run browser-heavy business tasks and trip outfit picks](./run-browser-heavy-business-tasks-and-trip-outfit-picks.md)
- [Auto-apply to jobs on LinkedIn with ChatGPT Agent](./auto-apply-to-jobs-on-linkedin-with-chatgpt-agent.md)
