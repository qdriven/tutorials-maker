---
title: "Draft and schedule a weekly newsletter"
slug: "draft-and-schedule-a-weekly-newsletter"
summary: "A /newsletter command in Claude Code finds the week's posts, drafts in the author's voice, gets approval, then creates and schedules the broadcast in Kit in about two minutes."
category: "Content & Creative"
agents:
  - name: "Claude Code"
    slug: "claude-code"
source_platform: "sidbharath.com"
source_date: "Undated"
source_url: "https://sidbharath.com/blog/automate-email-newsletter-claude-code/"
fetched_from: "https://agentusecases.ai/use-case/draft-and-schedule-a-weekly-newsletter"
---

# Draft and schedule a weekly newsletter

> A /newsletter command in Claude Code finds the week's posts, drafts in the author's voice, gets approval, then creates and schedules the broadcast in Kit in about two minutes.

**Category:** Content & Creative  
**Agent:** Claude Code  
**Source:** sidbharath.com · Undated

## What they did

Sid wrote a Claude Code skill, a markdown file, with a Kit v4 API key kept in .env. On /newsletter it reads the site's content index for posts from the last 7 days and drafts a short email using his voice rules. He reviews and approves the draft. It then creates the Kit broadcast through the API and schedules it for the time he gives.

## How it went

The whole run takes about two minutes, down from 30+ minutes by hand. He went from about two newsletters a month, sometimes none, to one every week.

## Worth knowing

Kit's API can't create forms, sequences or automations, only broadcasts, subscribers and tags. Auto-generating opt-ins and sequences per post isn't possible yet.

## Prompt

```text
Set up a reusable /newsletter command for me. When I run it, it should find the posts I published this week in [folder or site URL], draft a newsletter in my voice using [2-3 past newsletters as style examples], and show me the draft for edits. Do not create or schedule anything in [email tool, e.g. Kit] until I approve; before that step, pause and show me exactly what will be sent and when.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Link journal entries and write book reviews in Obsidian](./link-journal-entries-and-write-book-reviews-in-obsidian.md)
- [Run data cleaning to executive summary with agent pipeline](./run-data-cleaning-to-executive-summary-with-agent-pipeline.md)
- [Produce a track in Ableton Live by talking](./produce-a-track-in-ableton-live-by-talking.md)
- [Turn a blog post into an animated infographic](./turn-a-blog-post-into-an-animated-infographic.md)
- [Prototype a promo video and design work with bots](./prototype-a-promo-video-and-design-work-with-bots.md)
