---
title: "Have Claude collect names from a Wikipedia page into a file"
slug: "have-claude-collect-names-from-a-wikipedia-page-into-a-file"
summary: "The poster tried Claude Computer Use to open Firefox, search Wikipedia, find all names on a page and save them to a text file."
category: "Research & Knowledge"
agents:
  - name: "Claude computer use"
    slug: "claude-computer-use"
source_platform: "Reddit"
source_date: "Apr 1, 2025"
source_url: "https://www.reddit.com/r/ClaudeAI/comments/1gat8i7"
fetched_from: "https://agentusecases.ai/use-case/have-claude-collect-names-from-a-wikipedia-page-into-a-file"
---

# Have Claude collect names from a Wikipedia page into a file

> The poster tried Claude Computer Use to open Firefox, search Wikipedia, find all names on a page and save them to a text file.

**Category:** Research & Knowledge  
**Agent:** Claude computer use  
**Source:** Reddit · Apr 1, 2025

## What they did

The poster used Claude Computer Use to control Firefox, go to Wikipedia, search for a topic, then identify all the names on the page and save them into a text file. From the comments, they ran Anthropic’s provided Docker image locally with their API key, and the task completed in about a minute with no manual editing described.

## How it went

It seemed to work for this simple extraction task. The main downside was cost: the run used nearly 100,000 tokens and cost about $0.31, which the poster felt was too expensive for hobby use.

## Worth knowing

The clearest catch is cost from screenshots: this trivial, roughly one-minute run was already about 31 cents.

## Prompt

```text
Open [browser] and go to the Wikipedia page for [topic]. Find every person's name mentioned on the page and save them, one per line with no duplicates, to a text file called [filename] in [folder]. Then tell me how many names you found and stop.
```

## Related use cases

- [Fill out a Form 1040 with computer use](./fill-out-a-form-1040-with-computer-use.md)
- [Research a blog post with Claude computer use](./research-a-blog-post-with-claude-computer-use.md)
- [Apply to 50 jobs in under 30 minutes](./apply-to-50-jobs-in-under-30-minutes.md)
- [Find connections across 100 non-fiction books](./find-connections-across-100-non-fiction-books.md)
- [Turn any URL into a structured Notion note](./turn-any-url-into-a-structured-notion-note.md)
- [Send a daily AI news digest on a schedule](./send-a-daily-ai-news-digest-on-a-schedule.md)
