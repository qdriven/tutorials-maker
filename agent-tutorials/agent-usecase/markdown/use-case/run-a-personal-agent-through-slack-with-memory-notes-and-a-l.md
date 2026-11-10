---
title: "Run a personal agent through Slack with memory notes and a live dashboard"
slug: "run-a-personal-agent-through-slack-with-memory-notes-and-a-l"
summary: "The author runs OpenClaw on a dedicated machine, talks to it in Slack, keeps daily memory notes, and tracks its tasks and actions on a dashboard."
category: "Work & Operations"
agents:
  - name: "OpenClaw"
    slug: "openclaw"
source_platform: "prompthub.substack.com"
source_date: "Undated"
source_url: "https://prompthub.substack.com/p/how-im-using-openclaw"
fetched_from: "https://agentusecases.ai/use-case/run-a-personal-agent-through-slack-with-memory-notes-and-a-l"
---

# Run a personal agent through Slack with memory notes and a live dashboard

> The author runs OpenClaw on a dedicated machine, talks to it in Slack, keeps daily memory notes, and tracks its tasks and actions on a dashboard.

**Category:** Work & Operations  
**Agent:** OpenClaw  
**Source:** prompthub.substack.com · Undated

## What they did

The author installed OpenClaw on a wiped old MacBook Air, separate from their main machine, and chats with it mostly in Slack. Memory is a daily notes file, with notes older than 7 days archived, plus a place for references. They vibe-coded a realtime Kanban dashboard with Converge and Convex. The agent updates it through authenticated HTTP endpoints.

## How it went

A morning brief worked, though the subreddit scan broke. The dashboard shows task status and actions updating live, and it fixed the Notion mobile and relevance problems. The author doesn't give outcome numbers.

## Worth knowing

OpenClaw has broad access and weak default security, so use a dedicated wiped machine, and start with few tools and add access gradually.

## Prompt

```text
Set up a Slack channel where I can give you tasks, and keep a daily memory note file called [filename] summarizing what you did, what you learned about my preferences, and open to-dos. Also create a simple dashboard that lists your current tasks and recent actions. Ask me before sending any message to other people or deleting files, and finish by showing me the dashboard and today's note.
```

## Related use cases

- [Manage 18 agents from a Notion workspace](./manage-18-agents-from-a-notion-workspace.md)
- [Edit video through chat with subtitles and export](./edit-video-through-chat-with-subtitles-and-export.md)
- [Draft messages, fill web forms and prototype sites by chat](./draft-messages-fill-web-forms-and-prototype-sites-by-chat.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Check supplier invoices for duplicates and missing GST](./check-supplier-invoices-for-duplicates-and-missing-gst.md)
- [Give an agent a phone number to make and answer calls](./give-an-agent-a-phone-number-to-make-and-answer-calls.md)
