---
title: "Handle post-meeting follow-ups automatically"
slug: "handle-post-meeting-follow-ups-automatically"
summary: "A demo agent finds the meeting transcript, extracts action items, messages teammates on Slack, and schedules the next meeting by checking calendars."
category: "Work & Operations"
agents:
  - name: "Zapier Agents"
    slug: "zapier-agents"
source_platform: "growwstacks.com"
source_date: "Undated"
source_url: "https://growwstacks.com/blog/zapier-agent-review-one-assistant-9000-apps"
fetched_from: "https://agentusecases.ai/use-case/handle-post-meeting-follow-ups-automatically"
---

# Handle post-meeting follow-ups automatically

> A demo agent finds the meeting transcript, extracts action items, messages teammates on Slack, and schedules the next meeting by checking calendars.

**Category:** Work & Operations  
**Agent:** Zapier Agents  
**Source:** growwstacks.com · Undated

## What they did

In Claude, the user adds Zapier as a connector and authorizes it with OAuth. They then build an MCP server at mcp.zapier.com and add Google Drive, Slack and Zoom, ticking only the permitted actions (file deletion left off). The agent finds the transcript in Google Docs, extracts action items, messages teammates on Slack, and checks calendar availability to schedule the next meeting.

## How it went

The article only describes the demo, at about 3:15 in a video. It gives no measured results, timings or failure cases for the follow-up workflow.

## Worth knowing

Start with read-only permissions and enable write actions only after testing. The article's lock-in cost figures and claims come without verification, so treat them cautiously.

## Prompt

```text
Build an agent that handles follow-ups after my meetings. After a meeting about [meeting name or type], find the transcript in [Zoom, Google Meet, or Fireflies], pull out the action items with owners and due dates, and draft a Slack message for each teammate. Then check everyone's calendars in [Google Calendar] and propose times for the next meeting. Before sending any Slack message or creating any calendar invite, pause and show me exactly what you are about to send.
```

## Related use cases

- [Find an NYC apartment with a listing-watching agent](./find-an-nyc-apartment-with-a-listing-watching-agent.md)
- [Turn new Gmail emails into Notion CRM leads](./turn-new-gmail-emails-into-notion-crm-leads.md)
- [Collect and summarize async standup updates](./collect-and-summarize-async-standup-updates.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Speed up multifamily deal research and property summaries](./speed-up-multifamily-deal-research-and-property-summaries.md)
- [Give an agent a phone number to make and answer calls](./give-an-agent-a-phone-number-to-make-and-answer-calls.md)
