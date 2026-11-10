---
title: "Post to social channels from a Telegram prompt"
slug: "post-to-social-channels-from-a-telegram-prompt"
summary: "An n8n agent takes a Telegram prompt, finds files in Google Drive, writes an AI caption, and posts to LinkedIn and other channels, saving 3-5 hours weekly."
category: "Sales, Marketing & Support"
agents:
  - name: "n8n"
    slug: "n8n"
source_platform: "Reddit"
source_date: "Undated"
source_url: "https://www.reddit.com/r/n8nbusinessautomation/comments/1qi1r9b/i_built_an_ai_agent_that_posts_to_all_my_socials"
fetched_from: "https://agentusecases.ai/use-case/post-to-social-channels-from-a-telegram-prompt"
---

# Post to social channels from a Telegram prompt

> An n8n agent takes a Telegram prompt, finds files in Google Drive, writes an AI caption, and posts to LinkedIn and other channels, saving 3-5 hours weekly.

**Category:** Sales, Marketing & Support  
**Agent:** n8n  
**Source:** Reddit · Undated

## What they did

They wired an n8n posting agent that starts from a Telegram prompt, pulls content from a structured Google Drive folder, finds the matching file, adds an AI-written caption, and pushes the post to LinkedIn, X, Facebook, and Instagram. The post says the person creates the content once with a separate AI content agent and then n8n handles the upload flow automatically.

## How it went

They say it saves 3–5 hours a week on manual upload work. They also say native APIs were harder to set up, GetLate cost about $29/month and had support and reliability issues for them, while Blotato at about $39/month was the easiest option.

## Worth knowing

The main catch mentioned is the upload method: native APIs are free but more maintenance, while third-party posting tools add a monthly cost.

## Prompt

```text
Build an n8n workflow where I send a Telegram message like 'post the [file or event description] to [LinkedIn and other channels]'. It should find the matching files in my Google Drive folder [folder name], write a caption in my voice ([tone description]), and send me the draft and media back on Telegram. Only publish to [channels] after I reply 'approve', and then confirm with links to the live posts.
```

## Related use cases

- [Add todo items to Todoist from Telegram](./add-todo-items-to-todoist-from-telegram.md)
- [Answer WhatsApp customer questions and escalate to humans](./answer-whatsapp-customer-questions-and-escalate-to-humans.md)
- [Turn booking confirmation emails into calendar events](./turn-booking-confirmation-emails-into-calendar-events.md)
- [Sell services through an agent that takes payment and delivers](./sell-services-through-an-agent-that-takes-payment-and-delive.md)
- [Run a Monday competitor-monitoring brief from job listings](./run-a-monday-competitor-monitoring-brief-from-job-listings.md)
- [Prep sales calls and research YouTube ideas with agents](./prep-sales-calls-and-research-youtube-ideas-with-agents.md)
