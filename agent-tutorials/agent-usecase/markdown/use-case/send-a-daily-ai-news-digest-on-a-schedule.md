---
title: "Send a daily AI news digest on a schedule"
slug: "send-a-daily-ai-news-digest-on-a-schedule"
summary: "A Manus scheduled task searches Reddit, X and Hacker News each morning, ranks results and delivers a digest to email or Notion; a how-to guide."
category: "Research & Knowledge"
agents:
  - name: "Manus"
    slug: "manus"
source_platform: "mindstudio.ai"
source_date: "Undated"
source_url: "https://www.mindstudio.ai/blog/manus-ai-scheduled-tasks-daily-news-briefing"
fetched_from: "https://agentusecases.ai/use-case/send-a-daily-ai-news-digest-on-a-schedule"
---

# Send a daily AI news digest on a schedule

> A Manus scheduled task searches Reddit, X and Hacker News each morning, ranks results and delivers a digest to email or Notion; a how-to guide.

**Category:** Research & Knowledge  
**Agent:** Manus  
**Source:** mindstudio.ai · Undated

## What they did

You create a scheduled task in Manus and write a plain-language standing prompt. The prompt names the subreddits, Hacker News and X searches to cover, the ranking criteria, and the digest format and destination. Each morning the agent browses those public pages, collects top posts, ranks them by engagement and relevance, and sends the digest. The person runs one manual test first, then refines the prompt.

## How it went

The source gives no measured results. It says first prompts usually need tuning after about a week, and that X coverage is inconsistent, paywalled stories can't be summarized, and complex scrapes can fail.

## Worth knowing

A daily recurring task will likely need a paid Manus plan, since the free tier caps task runs. Test manually first to find blocked sources.

## Prompt

```text
Set up a scheduled task that runs every morning at [time and timezone]. Search Reddit, X and Hacker News for the newest posts about [your topic, e.g. AI news], rank the top [number] by relevance and engagement, and write a short digest with a one-line summary and link for each. Send it to [your email or Notion page]; once you've delivered a test digest today, show it to me before turning on the daily schedule.
```

## Related use cases

- [Compile journalist lists and search apartment listings](./compile-journalist-lists-and-search-apartment-listings.md)
- [Generate slide decks from titles and a branded template](./generate-slide-decks-from-titles-and-a-branded-template.md)
- [Run varied business tasks through a general agent](./run-varied-business-tasks-through-a-general-agent.md)
- [Find connections across 100 non-fiction books](./find-connections-across-100-non-fiction-books.md)
- [Turn any URL into a structured Notion note](./turn-any-url-into-a-structured-notion-note.md)
- [Measure how long jobs stay open at tech companies](./measure-how-long-jobs-stay-open-at-tech-companies.md)
