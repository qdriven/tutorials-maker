---
title: "Run daily market trend research across X and Reddit"
slug: "run-daily-market-trend-research-across-x-and-reddit"
summary: "The poster has Claude gather daily market research on trends from Twitter/X and Reddit using agent workflows and browser automation."
category: "Research & Knowledge"
agents:
  - name: "Claude"
    slug: "claude"
source_platform: "Reddit"
source_date: "Undated"
source_url: "https://www.reddit.com/r/ClaudeAI/comments/1tm9gm5/claude_working_autonomously"
fetched_from: "https://agentusecases.ai/use-case/run-daily-market-trend-research-across-x-and-reddit"
---

# Run daily market trend research across X and Reddit

> The poster has Claude gather daily market research on trends from Twitter/X and Reddit using agent workflows and browser automation.

**Category:** Research & Knowledge  
**Agent:** Claude  
**Source:** Reddit · Undated

## What they did

A commenter said they use Claude Cowork as a scheduled task runner for daily market research, with browser access so Claude can read X/Twitter and Reddit even when direct access would be blocked. In follow-up, they said they still prompt through Claude Chat and Claude Cowork as separate “brains,” and they constrain Cowork to specific sources such as Reddit JSON feeds and selected posts instead of open-ended web searching.

## How it went

They reported it works for daily trend research across X and Reddit. They also described related autonomous jobs as effective, but said frequent polling can consume a lot of tokens.

## Worth knowing

Their main practical catch was security and scope control: they point Cowork only at trusted sites, and they isolated it on a separate old MacBook to limit risk.

## Prompt

```text
Each day, research what's trending in [my market or industry] on X and Reddit, focusing on [keywords, subreddits, or accounts]. Give me a summary of the top 5 to 7 trends, with links to the posts, why each matters for [my business or role], and any recurring complaints or requests people are making. Keep it to one page I can read in five minutes, and flag anything that is new since yesterday.
```

## Related use cases

- [Build a C compiler with a team of parallel agents](./build-a-c-compiler-with-a-team-of-parallel-agents.md)
- [Build a charting tool from blood test PDFs](./build-a-charting-tool-from-blood-test-pdfs.md)
- [Run a daily-updated local business directory autonomously](./run-a-daily-updated-local-business-directory-autonomously.md)
- [Find connections across 100 non-fiction books](./find-connections-across-100-non-fiction-books.md)
- [Turn any URL into a structured Notion note](./turn-any-url-into-a-structured-notion-note.md)
- [Send a daily AI news digest on a schedule](./send-a-daily-ai-news-digest-on-a-schedule.md)
