---
title: "Turn Reddit posts into fact-checked article drafts"
slug: "turn-reddit-posts-into-fact-checked-article-drafts"
summary: "An n8n and LangChain workflow ingests Reddit posts, summarizes comment sentiment, drafts articles in different writer styles, and fact-checks with an editor agent."
category: "Content & Creative"
agents:
  - name: "n8n"
    slug: "n8n"
source_platform: "Reddit"
source_date: "Undated"
source_url: "https://www.reddit.com/r/n8n/comments/1juaud2/automated_website_via_reddit_posts"
fetched_from: "https://agentusecases.ai/use-case/turn-reddit-posts-into-fact-checked-article-drafts"
---

# Turn Reddit posts into fact-checked article drafts

> An n8n and LangChain workflow ingests Reddit posts, summarizes comment sentiment, drafts articles in different writer styles, and fact-checks with an editor agent.

**Category:** Content & Creative  
**Agent:** n8n  
**Source:** Reddit · Undated

## What they did

The maker built an n8n workflow that watches specific subreddits for posts with article flairs, pulls the linked article text, summarizes the Reddit comments for sentiment, and sends both into AI writer agents with different styles to draft a new article. It then applies SEO formatting and posts to WordPress, while Supabase stores embeddings for context and tracks Reddit post IDs to avoid duplicates; featured images and tags still involved manual work.

## How it went

They batch-ran it to backfill up to 100 posts and said OpenRouter costs were under $1 for 100 articles. It missed news shared as images or under other flairs, and their separate fact-checking editor idea was not working reliably yet.

## Worth knowing

Their main cost figure was less than a dollar via OpenRouter to generate 100 articles, but they said the editor-in-chief fact-checking agent often looped or struggled with very new information.

## Prompt

```text
Build an n8n workflow using LangChain agents that takes Reddit posts from [subreddit] and summarizes the sentiment and main arguments in the comments. Then have a writer agent draft an article in [writer style] and an editor agent fact-check its claims against the source post and comments, flagging anything unsupported. It's finished when I get a revised draft plus a list of flagged claims for each post, saved to [Google Doc or Notion]. Do not publish anything.
```

## Related use cases

- [Add todo items to Todoist from Telegram](./add-todo-items-to-todoist-from-telegram.md)
- [Answer WhatsApp customer questions and escalate to humans](./answer-whatsapp-customer-questions-and-escalate-to-humans.md)
- [Turn booking confirmation emails into calendar events](./turn-booking-confirmation-emails-into-calendar-events.md)
- [Produce a track in Ableton Live by talking](./produce-a-track-in-ableton-live-by-talking.md)
- [Make an AI trends presentation](./make-an-ai-trends-presentation.md)
- [Run content creation with specialized bots](./run-content-creation-with-specialized-bots.md)
