---
title: "Turn a week of GitHub activity into a blog post"
slug: "turn-a-week-of-github-activity-into-a-blog-post"
summary: "A three-agent pipeline that drafts weekly posts from commit history and publishes to Notion and DEV."
category: "Content & Creative"
agents:
  - name: "custom-built or unnamed agent"
    slug: "other"
source_platform: "DEV"
source_date: "Mar 27, 2026"
source_url: "https://dev.to/yashksaini/i-built-a-3-agent-pipeline-that-turns-my-github-activity-into-weekly-blog-posts-on-notion-devto-1ndn"
fetched_from: "https://agentusecases.ai/use-case/turn-a-week-of-github-activity-into-a-blog-post"
---

# Turn a week of GitHub activity into a blog post

> A three-agent pipeline that drafts weekly posts from commit history and publishes to Notion and DEV.

**Category:** Content & Creative  
**Agent:** custom-built or unnamed agent  
**Source:** DEV · Mar 27, 2026

## What they did

The author built DevNotion on Mastra, run by a Sunday GitHub Actions cron. A GraphQL call pulls the week's commits, PRs, issues, reviews and language stats with no LLM. Gemini then writes a first-person post, with a deterministic fallback if it fails. The publisher creates a DEV.to draft and a Notion planner page with tables.

## How it went

It reliably produces a draft each week, which the author edits before publishing. The source gives no engagement figures. Gemini gave the best output among the models tried, including Ollama and Groq ones.

## Worth knowing

Asking Gemini for native structured output added 20-40 seconds per call. Plain text with YAML frontmatter parsing was 3-4x faster, and Notion needs rate limiting.

## Prompt

```text
Build a weekly workflow that pulls my commits and pull requests from [GitHub repo or username] for the past 7 days, has one step summarize the changes, a second draft a blog post in [tone], and a third format it for [Notion and DEV]. Save the output as a draft in Notion. Finished means I can review a draft each week, and the workflow must pause for my approval before publishing anything publicly.
```

## Related use cases

- [Produce a track in Ableton Live by talking](./produce-a-track-in-ableton-live-by-talking.md)
- [Take a video from thumbnail to published with promo posts](./take-a-video-from-thumbnail-to-published-with-promo-posts.md)
- [Turn videos and company research into slide decks](./turn-videos-and-company-research-into-slide-decks.md)
- [Build a newsletter-to-social content agent (it failed)](./build-a-newsletter-to-social-content-agent-it-failed.md)
- [Prototype a promo video and design work with bots](./prototype-a-promo-video-and-design-work-with-bots.md)
- [Auto-post blog summaries to Bluesky from RSS](./auto-post-blog-summaries-to-bluesky-from-rss.md)
