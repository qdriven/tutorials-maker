---
title: "Turn a LinkedIn URL into a cold email"
slug: "turn-a-linkedin-url-into-a-cold-email"
summary: "An n8n agent scrapes a LinkedIn profile from its URL and has an AI write a cold email; the author claims it books 20–30 qualified calls a month."
category: "Sales, Marketing & Support"
agents:
  - name: "n8n"
    slug: "n8n"
source_platform: "acquisitionx.substack.com"
source_date: "Undated"
source_url: "https://acquisitionx.substack.com/p/how-i-built-an-ai-agent-that-generates"
fetched_from: "https://agentusecases.ai/use-case/turn-a-linkedin-url-into-a-cold-email"
---

# Turn a LinkedIn URL into a cold email

> An n8n agent scrapes a LinkedIn profile from its URL and has an AI write a cold email; the author claims it books 20–30 qualified calls a month.

**Category:** Sales, Marketing & Support  
**Agent:** n8n  
**Source:** acquisitionx.substack.com · Undated

## What they did

An n8n workflow starts from a webhook or scheduler that receives a LinkedIn URL. It validates the URL, then scrapes the profile with Apify or a headless browser. It cleans the data and builds a dynamic prompt with the profile, email goal and tone. It sends the prompt to Claude or GPT, strips hallucinated details from the reply, and delivers the result to Slack, email, Sheets or Notion.

## How it went

The author says it books 20–30 qualified calls a month, but gives no breakdown, reply rates or method behind that figure. A commenter says the prompt is under-specified for Claude.

## Worth knowing

A commenter questions whether handing LinkedIn session cookies to n8n or Make is safe or allowed under LinkedIn's policy. The post doesn't address this.

## Prompt

```text
Build a workflow where I submit a LinkedIn profile URL, it scrapes the profile, and an AI agent writes a short cold email in [tone] tone offering [my product or service]. Reference something specific from the profile. Output the draft for my review and never send it automatically; the job is done when a draft appears for each URL.
```

## Related use cases

- [Add todo items to Todoist from Telegram](./add-todo-items-to-todoist-from-telegram.md)
- [Publish AI-written blog posts from trending news to WordPress](./publish-ai-written-blog-posts-from-trending-news-to-wordpres.md)
- [Write and send AI newsletters automatically](./write-and-send-ai-newsletters-automatically.md)
- [Sell services through an agent that takes payment and delivers](./sell-services-through-an-agent-that-takes-payment-and-delive.md)
- [Run browser-heavy business tasks and trip outfit picks](./run-browser-heavy-business-tasks-and-trip-outfit-picks.md)
- [Auto-apply to jobs on LinkedIn with ChatGPT Agent](./auto-apply-to-jobs-on-linkedin-with-chatgpt-agent.md)
