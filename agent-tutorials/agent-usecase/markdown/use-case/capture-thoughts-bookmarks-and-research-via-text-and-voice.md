---
title: "Capture thoughts, bookmarks and research via text and voice"
slug: "capture-thoughts-bookmarks-and-research-via-text-and-voice"
summary: "A commenter describes an assistant that saves bookmarks, thoughts, wishlists and research from text and voice messages; another's WhatsApp-to-Notion flow failed at querying notes later."
category: "Life Admin & Home"
agents:
  - name: "n8n"
    slug: "n8n"
source_platform: "Reddit"
source_date: "Aug 5, 2026"
source_url: "https://vi.reddit.com/r/n8n/comments/1uwqg9a/building_an_ai_second_brainadhd_assistant_which"
fetched_from: "https://agentusecases.ai/use-case/capture-thoughts-bookmarks-and-research-via-text-and-voice"
---

# Capture thoughts, bookmarks and research via text and voice

> A commenter describes an assistant that saves bookmarks, thoughts, wishlists and research from text and voice messages; another's WhatsApp-to-Notion flow failed at querying notes later.

**Category:** Life Admin & Home  
**Agent:** n8n  
**Source:** Reddit · Aug 5, 2026

## What they did

One commenter said they built the capture side with WhatsApp feeding Notion, but it was only a save pipeline: notes went in as plain text and later queries failed. Another described a fuller pattern where n8n handled message intake, audio transcription, tool calls, Notion writes, calendar checks, and scheduled reviews, while a smaller agent handled intent and search; they also buffered related messages, like a voice note and URL, into one record before classifying and storing it.

## How it went

The save flow was easy to get working, but recall broke down: asking what had been noted about a topic two weeks later returned nothing, so they stopped using it. The thread’s suggested fix was semantic retrieval with embeddings or a vector store rather than relying on Notion text search alone.

## Worth knowing

One person said the hardest part was scheduling proactive messages, taking three rewrites before it felt natural.

## Prompt

```text
Build a capture assistant that takes text or voice messages I send via [WhatsApp or Telegram], transcribes voice notes, and sorts each item as a bookmark, thought, wishlist item, or research note. Save each one to [Notion or other notes app] with a title, tags, and date. Also add a way for me to ask a question about my saved notes and get an answer with the matching entries, then test it with 5 sample messages.
```

## Related use cases

- [Add todo items to Todoist from Telegram](./add-todo-items-to-todoist-from-telegram.md)
- [Publish AI-written blog posts from trending news to WordPress](./publish-ai-written-blog-posts-from-trending-news-to-wordpres.md)
- [Write and send AI newsletters automatically](./write-and-send-ai-newsletters-automatically.md)
- [Get a second opinion on an MRI](./get-a-second-opinion-on-an-mri.md)
- [Run the smart home by natural language](./run-the-smart-home-by-natural-language.md)
- [Flag risks in a 50-page contract before signing](./flag-risks-in-a-50-page-contract-before-signing.md)
