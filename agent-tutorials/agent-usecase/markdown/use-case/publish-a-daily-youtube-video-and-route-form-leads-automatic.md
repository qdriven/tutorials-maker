---
title: "Publish a daily YouTube video and route form leads automatically"
slug: "publish-a-daily-youtube-video-and-route-form-leads-automatic"
summary: "Reviewers use Make workflows with Gemini to generate ideas, create and title a daily YouTube video, and route Google Form responses into a CRM with follow-ups."
category: "Content & Creative"
agents:
  - name: "Make"
    slug: "make"
  - name: "Gemini"
    slug: "gemini"
source_platform: "aws.amazon.com"
source_date: "Apr 3, 2026"
source_url: "https://aws.amazon.com/marketplace/reviews/reviews-list/prodview-pdindd434qtpi"
fetched_from: "https://agentusecases.ai/use-case/publish-a-daily-youtube-video-and-route-form-leads-automatic"
---

# Publish a daily YouTube video and route form leads automatically

> Reviewers use Make workflows with Gemini to generate ideas, create and title a daily YouTube video, and route Google Form responses into a CRM with follow-ups.

**Category:** Content & Creative  
**Agent:** Make, Gemini  
**Source:** aws.amazon.com · Apr 3, 2026

## What they did

One reviewer, a CTO, tried to build a Make workflow that a scheduler starts each evening. It asked Gemini for ideas, triggered a video API to make a video from the prompt, then had the Gemini API write a title, aiming to upload to YouTube with no manual steps. Separately, Amrit Dash uses Make to read Google Form responses, pass them into a monday.com CRM, and send email or text follow-ups.

## How it went

The YouTube workflow was never finished. The reviewer found API keys and error handling hard and rebuilt it in Python. The form-to-CRM setup works at scale, with over 600 automated processes.

## Worth knowing

Start with a very simple workflow. The YouTube builder said complex error handling in Make's visual builder got messy fast, and the form-to-CRM user runs 1.5 to 2 million operations a month, which makes the bill substantial.

## Prompt

```text
Set up a Make scenario with two parts. First, every day at [time], use Gemini to come up with a video idea about [topic], write a title and description, and put them in [Google Sheet or Doc] for my review. Second, when someone submits my Google Form [form name], add them to [CRM or sheet] and draft a follow-up email. Pause and show me the draft video details and follow-up emails before anything is published or sent.
```

## Related use cases

- [Orchestrate a multi-phase RAG migration](./orchestrate-a-multi-phase-rag-migration.md)
- [Sort waste using local recycling rules](./sort-waste-using-local-recycling-rules.md)
- [Answer patient enquiries for a clinic by chat](./answer-patient-enquiries-for-a-clinic-by-chat.md)
- [Produce a track in Ableton Live by talking](./produce-a-track-in-ableton-live-by-talking.md)
- [Generate slide decks from titles and a branded template](./generate-slide-decks-from-titles-and-a-branded-template.md)
- [Research newsletter ideas into a Notion backlog](./research-newsletter-ideas-into-a-notion-backlog.md)
