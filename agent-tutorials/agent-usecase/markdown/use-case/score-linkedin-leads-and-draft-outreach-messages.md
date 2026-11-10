---
title: "Score LinkedIn leads and draft outreach messages"
slug: "score-linkedin-leads-and-draft-outreach-messages"
summary: "A start-up's n8n workflow enriches LinkedIn profiles, has an AI agent score each against the ideal customer profile and write three outreach messages, saved to Google Sheets."
category: "Sales, Marketing & Support"
agents:
  - name: "n8n"
    slug: "n8n"
source_platform: "community.n8n.io"
source_date: "Undated"
source_url: "https://community.n8n.io/t/doing-lead-generation-outreach-on-linkedin/237188"
fetched_from: "https://agentusecases.ai/use-case/score-linkedin-leads-and-draft-outreach-messages"
---

# Score LinkedIn leads and draft outreach messages

> A start-up's n8n workflow enriches LinkedIn profiles, has an AI agent score each against the ideal customer profile and write three outreach messages, saved to Google Sheets.

**Category:** Sales, Marketing & Support  
**Agent:** n8n  
**Source:** community.n8n.io · Undated

## What they did

The workflow reads a list of LinkedIn profile URLs and enriches each one with hard and soft skills through the SourceGeek node. An AI agent, given the company's ideal customer profile, scores each lead and writes three messages: an intro, a follow-up and a final one. Results go to a Google Sheet, where a person picks which leads to contact.

## How it went

The post gives no results or numbers. The workflow produces scored leads and drafted messages. Actually sending the outreach was left as the next step. A commenter raised the difficulty of keeping scores consistent across leads.

## Worth knowing

In the comments, the author suggests spelling out the ICP in detail: role, company size, industry, geography, budget, example personas and an anti-ICP. Ask the agent to give its reasoning for each score.

## Prompt

```text
Build a workflow that takes LinkedIn profile URLs from [Google Sheet name], enriches each profile, and passes it to an AI agent. The agent should score the person from 1-10 against my ideal customer profile: [ICP description], then write three outreach message variants in a [tone] tone. Save the score, reasoning and messages back to the sheet. The workflow should only draft and save messages and never send anything.
```

## Related use cases

- [Add todo items to Todoist from Telegram](./add-todo-items-to-todoist-from-telegram.md)
- [Publish AI-written blog posts from trending news to WordPress](./publish-ai-written-blog-posts-from-trending-news-to-wordpres.md)
- [Write and send AI newsletters automatically](./write-and-send-ai-newsletters-automatically.md)
- [Sell services through an agent that takes payment and delivers](./sell-services-through-an-agent-that-takes-payment-and-delive.md)
- [Run browser-heavy business tasks and trip outfit picks](./run-browser-heavy-business-tasks-and-trip-outfit-picks.md)
- [Auto-apply to jobs on LinkedIn with ChatGPT Agent](./auto-apply-to-jobs-on-linkedin-with-chatgpt-agent.md)
