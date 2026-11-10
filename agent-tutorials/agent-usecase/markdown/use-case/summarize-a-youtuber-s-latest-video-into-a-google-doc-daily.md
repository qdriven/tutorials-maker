---
title: "Summarize a YouTuber's latest video into a Google Doc daily"
slug: "summarize-a-youtuber-s-latest-video-into-a-google-doc-daily"
summary: "A Make scenario runs at 9 AM, finds a YouTuber's newest video, has Hugging Face summarize it, and appends the summary to a Google Doc."
category: "Research & Knowledge"
agents:
  - name: "Make"
    slug: "make"
source_platform: "labellerr.com"
source_date: "Undated"
source_url: "https://www.labellerr.com/blog/building-ai-agents-with-make-com-a-no-code-guide/"
fetched_from: "https://agentusecases.ai/use-case/summarize-a-youtuber-s-latest-video-into-a-google-doc-daily"
---

# Summarize a YouTuber's latest video into a Google Doc daily

> A Make scenario runs at 9 AM, finds a YouTuber's newest video, has Hugging Face summarize it, and appends the summary to a Google Doc.

**Category:** Research & Knowledge  
**Agent:** Make  
**Source:** labellerr.com · Undated

## What they did

The author built a five-module Make scenario. A scheduler fires daily at 9 AM. The YouTube module looks up Matthew Berman's channel handle and pulls his latest video's title and description. Hugging Face summarizes that text, with a configurable summary length. Two Google Docs modules then create or find a document and append the summary. One-time connections to YouTube, Hugging Face and Google Docs were needed.

## How it went

The author says the daily check, copy and document steps no longer need doing by hand, leaving a summary to read each morning. No measured results are given. The summary covers only the title and description, not the video itself.

## Worth knowing

The summarizer only sees the video's title and description text, not a transcript, so summary quality depends on how detailed the description is.

## Prompt

```text
Create a Make scenario that runs every day at [time] and finds the newest video on the YouTube channel [channel URL]. Get a summary of the video's key points from its transcript with an AI step, then append the summary with the video title, link, and date to my Google Doc [doc name]. It's done when a test run adds one correct entry to the doc.
```

## Related use cases

- [Manage email, calendar and tasks from Slack](./manage-email-calendar-and-tasks-from-slack.md)
- [Prep sales calls and research YouTube ideas with agents](./prep-sales-calls-and-research-youtube-ideas-with-agents.md)
- [Enrich new CRM leads for personalized outreach](./enrich-new-crm-leads-for-personalized-outreach.md)
- [Find connections across 100 non-fiction books](./find-connections-across-100-non-fiction-books.md)
- [Catalog and summarize papers dropped into Drive](./catalog-and-summarize-papers-dropped-into-drive.md)
- [Measure how long jobs stay open at tech companies](./measure-how-long-jobs-stay-open-at-tech-companies.md)
