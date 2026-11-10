---
title: "Turn a keyword into approved Instagram content"
slug: "turn-a-keyword-into-approved-instagram-content"
summary: "A Make.com pipeline takes a keyword, generates AI content, sends it for email approval, and logs it to Google Sheets."
category: "Content & Creative"
agents:
  - name: "Make"
    slug: "make"
source_platform: "Reddit"
source_date: "Undated"
source_url: "https://www.reddit.com/r/maketemplates/comments/1s4g5wc/i_built_an_instagram_content_pipeline_on_makecom"
fetched_from: "https://agentusecases.ai/use-case/turn-a-keyword-into-approved-instagram-content"
---

# Turn a keyword into approved Instagram content

> A Make.com pipeline takes a keyword, generates AI content, sends it for email approval, and logs it to Google Sheets.

**Category:** Content & Creative  
**Agent:** Make  
**Source:** Reddit · Undated

## What they did

The setup was a no-code Make.com workflow using OpenAI, Gmail, and Google Sheets. A person entered one keyword, ChatGPT generated both the Instagram caption and image, Make.com emailed that content to a reviewer, and the reviewer chose approve or reject before the content, image, and decision were logged to Sheets.

## How it went

The poster says it worked well and highlights the human approval step as the main safeguard against off-brand auto-posting. No performance metrics, posting volume, or time-saved numbers were given.

## Worth knowing

The main catch is that it stops for manual approval by email, so a person still has to review every post before it is logged.

## Prompt

```text
Build a scenario that takes a keyword from [Google Sheet or form] and uses AI to write an Instagram caption and image idea for [my brand and tone]. Email the draft to [my email] for approval, and log each keyword, draft and approval status in Google Sheets. Don't publish anything to Instagram until I approve, and show me the first draft to review.
```

## Related use cases

- [Manage email, calendar and tasks from Slack](./manage-email-calendar-and-tasks-from-slack.md)
- [Prep sales calls and research YouTube ideas with agents](./prep-sales-calls-and-research-youtube-ideas-with-agents.md)
- [Enrich new CRM leads for personalized outreach](./enrich-new-crm-leads-for-personalized-outreach.md)
- [Produce a track in Ableton Live by talking](./produce-a-track-in-ableton-live-by-talking.md)
- [Create a presentation on agentic AI in retail](./create-a-presentation-on-agentic-ai-in-retail.md)
- [Draft and publish LinkedIn posts from voice notes](./draft-and-publish-linkedin-posts-from-voice-notes.md)
