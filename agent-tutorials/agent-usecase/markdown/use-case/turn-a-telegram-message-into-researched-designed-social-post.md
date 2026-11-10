---
title: "Turn a Telegram message into researched, designed social posts"
slug: "turn-a-telegram-message-into-researched-designed-social-post"
summary: "An n8n agent takes a Telegram message, researches the topic, designs the posts and publishes them to social media."
category: "Content & Creative"
agents:
  - name: "n8n"
    slug: "n8n"
source_platform: "Reddit"
source_date: "Mar 5, 2026"
source_url: "https://www.reddit.com/r/n8n/comments/1re2fo2/i_built_an_ai_content_agent_in_n8n_that"
fetched_from: "https://agentusecases.ai/use-case/turn-a-telegram-message-into-researched-designed-social-post"
---

# Turn a Telegram message into researched, designed social posts

> An n8n agent takes a Telegram message, researches the topic, designs the posts and publishes them to social media.

**Category:** Content & Creative  
**Agent:** n8n  
**Source:** Reddit · Mar 5, 2026

## What they did

The setup is an n8n workflow triggered by a Telegram message containing a topic. From there, the AI chooses a post format, Blotato researches the topic and returns structured information, the workflow creates either an infographic or slideshow video, then runs an async create-wait-retrieve-publish sequence that posts to Instagram and LinkedIn and sends a confirmation back to Telegram.

## How it went

The stated result is end-to-end social post production and publishing from a single Telegram prompt, with no manual editing or uploading. The post gives no performance numbers and the visible comments add no details on failures or quality limits.

## Worth knowing

The main catch is that it depends on async orchestration inside n8n and on Blotato for research and asset generation; the post points to a template rather than explaining the workflow step by step.

## Prompt

```text
Build me an n8n workflow that starts when I send a message to my Telegram bot with a topic. It should research the topic on the web, write a post for [platforms, e.g. LinkedIn and X] in [my brand voice], and generate a matching image. Before anything is published, send me the drafts back in Telegram and wait for my approval; the job is done when an approved post goes live on my accounts.
```

## Related use cases

- [Add todo items to Todoist from Telegram](./add-todo-items-to-todoist-from-telegram.md)
- [Answer WhatsApp customer questions and escalate to humans](./answer-whatsapp-customer-questions-and-escalate-to-humans.md)
- [Automate client onboarding and schedule PDFs](./automate-client-onboarding-and-schedule-pdfs.md)
- [Produce a track in Ableton Live by talking](./produce-a-track-in-ableton-live-by-talking.md)
- [Make an AI trends presentation](./make-an-ai-trends-presentation.md)
- [Run content creation with specialized bots](./run-content-creation-with-specialized-bots.md)
