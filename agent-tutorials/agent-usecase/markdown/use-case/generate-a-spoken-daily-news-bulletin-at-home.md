---
title: "Generate a spoken daily news bulletin at home"
slug: "generate-a-spoken-daily-news-bulletin-at-home"
summary: "Poster built a morning news briefing with ChatGPT, ElevenLabs and Home Assistant that is read aloud through their home setup, replacing Alexa."
category: "Life Admin & Home"
agents:
  - name: "ChatGPT"
    slug: "chatgpt"
source_platform: "Reddit"
source_date: "Undated"
source_url: "https://www.reddit.com/r/homeassistant/comments/1og2mcn/goodbye_alexa_hello_local_ai_news_my_home"
fetched_from: "https://agentusecases.ai/use-case/generate-a-spoken-daily-news-bulletin-at-home"
---

# Generate a spoken daily news bulletin at home

> Poster built a morning news briefing with ChatGPT, ElevenLabs and Home Assistant that is read aloud through their home setup, replacing Alexa.

**Category:** Life Admin & Home  
**Agent:** ChatGPT  
**Source:** Reddit · Undated

## What they did

The poster used n8n to run a 6:30 a.m. workflow that asked Perplexity for factual stories from a fixed list of outlets, cleaned that output, then had ChatGPT rewrite it as a short spoken script. ElevenLabs turned the script into an MP3, which was saved to the poster’s NAS and automatically played through a Home Assistant Voice PE speaker in the kitchen; in comments, the poster clarified the AI services were cloud-based, not actually local.

## How it went

It replaced the poster’s Alexa flash briefing with a calmer custom bulletin and they shared a sample audio result, but they said it still needed better pauses and maybe a different voice. Cost-wise, they estimated about $3 to $4 a month for Perplexity API usage and about $10 for OpenAI, including other calls.

## Worth knowing

The main catch was that the setup was not truly local, and the poster said ChatGPT voice sounded better than ElevenLabs but was limited to 4096 characters.

## Prompt

```text
Every morning at [time], gather the top headlines from [news sources or topics], plus my weather for [city] and today's calendar. Write a 2-minute spoken-style briefing, convert it to audio with [text-to-speech service], and play it on my [smart speaker/Home Assistant device]. Done when the briefing plays on schedule; tell me before changing any device settings.
```

## Related use cases

- [Generate LEGO CAD models in LDraw with AI agents](./generate-lego-cad-models-in-ldraw-with-ai-agents.md)
- [Compile and filter apartment listings](./compile-and-filter-apartment-listings.md)
- [Find SEO competitors with ChatGPT Pro agent](./find-seo-competitors-with-chatgpt-pro-agent.md)
- [Get a second opinion on an MRI](./get-a-second-opinion-on-an-mri.md)
- [Plan meals and track symptoms with Claude Code](./plan-meals-and-track-symptoms-with-claude-code.md)
- [Use a coding agent for everyday non-programming chores](./use-a-coding-agent-for-everyday-non-programming-chores.md)
