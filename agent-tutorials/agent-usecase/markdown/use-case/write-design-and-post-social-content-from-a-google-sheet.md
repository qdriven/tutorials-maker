---
title: "Write, design and post social content from a Google Sheet"
slug: "write-design-and-post-social-content-from-a-google-sheet"
summary: "An automation built with Make, OpenAI, Cloudinary and Buffer writes captions, designs content and posts it across social platforms from a sheet."
category: "Content & Creative"
agents:
  - name: "Make"
    slug: "make"
source_platform: "Reddit"
source_date: "Undated"
source_url: "https://www.reddit.com/r/automation/comments/1lff4ph/i_built_an_automation_that_writes_designs_and"
fetched_from: "https://agentusecases.ai/use-case/write-design-and-post-social-content-from-a-google-sheet"
---

# Write, design and post social content from a Google Sheet

> An automation built with Make, OpenAI, Cloudinary and Buffer writes captions, designs content and posts it across social platforms from a sheet.

**Category:** Content & Creative  
**Agent:** Make  
**Source:** Reddit · Undated

## What they did

The setup starts with one Google Sheets row carrying the post idea, audience and tone. In Make, the flow uses OpenAI to write a caption, generates an image with DALL·E or another image model, uploads that image to Cloudinary, writes the assets back to the sheet, then sends a Slack approval notice before Buffer publishes the post; the person checks the caption and image in Slack and approves it.

## How it went

The poster says it turns a sheet row into a published social post in under two minutes and can handle the caption, image and posting end to end. They describe it as consistent, but still keep a human approval step before anything goes live.

## Worth knowing

The main catch is that it is not fully hands-off: approval happens in Slack before publishing, and the builder says they got Make stable by adding error handling and filters.

## Prompt

```text
Build a scenario that reads rows from my Google Sheet [sheet link] containing post topics, writes captions in [brand voice] using OpenAI, creates an image for each, and queues them in Buffer for [platforms]. Mark each row as done once it's queued. Run it on one test row and show me the caption, image and scheduled time before anything is posted publicly.
```

## Related use cases

- [Manage email, calendar and tasks from Slack](./manage-email-calendar-and-tasks-from-slack.md)
- [Prep sales calls and research YouTube ideas with agents](./prep-sales-calls-and-research-youtube-ideas-with-agents.md)
- [Enrich new CRM leads for personalized outreach](./enrich-new-crm-leads-for-personalized-outreach.md)
- [Produce a track in Ableton Live by talking](./produce-a-track-in-ableton-live-by-talking.md)
- [Create a presentation on agentic AI in retail](./create-a-presentation-on-agentic-ai-in-retail.md)
- [Draft and publish LinkedIn posts from voice notes](./draft-and-publish-linkedin-posts-from-voice-notes.md)
