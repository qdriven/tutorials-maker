---
title: "Automate freelance admin with a morning briefing agent"
slug: "automate-freelance-admin-with-a-morning-briefing-agent"
summary: "An OpenClaw agent sends a Telegram morning briefing, drafts weekly client status emails sent after one-tap approval, and chases follow-ups, cutting admin from about 9 hours to 20 minutes."
category: "Work & Operations"
agents:
  - name: "OpenClaw"
    slug: "openclaw"
source_platform: "dev.to"
source_date: "Undated"
source_url: "https://dev.to/farooqshabbir/i-built-a-247-freelance-operations-agent-with-openclaw-it-runs-my-business-while-i-sleep-4lde"
fetched_from: "https://agentusecases.ai/use-case/automate-freelance-admin-with-a-morning-briefing-agent"
---

# Automate freelance admin with a morning briefing agent

> An OpenClaw agent sends a Telegram morning briefing, drafts weekly client status emails sent after one-tap approval, and chases follow-ups, cutting admin from about 9 hours to 20 minutes.

**Category:** Work & Operations  
**Agent:** OpenClaw  
**Source:** dev.to · Undated

## What they did

OpenClaw runs on an always-on Mac Mini with Claude as the model. Three skill files and a Lobster workflow do the work. Weekday 8AM, it checks GitHub PRs and Slack for action items and posts a Telegram briefing. Fridays it drafts a client status email from merged PRs and closed Linear tickets. The author replies "send" to send it through Gmail.

## How it went

The author reports admin falling from about 9 hours a week to about 20 minutes, with setup taking 47 minutes. The status email tone needed two rounds of refinement.

## Worth knowing

The author runs with the sandbox disabled to give the agent shell access to the gh and linear CLIs, and advises starting sandboxed and enabling only the tools each skill needs.

## Prompt

```text
Every weekday at [time] send me a Telegram morning briefing covering my calendar, unanswered client emails and tasks due today. Every [day] draft a short status email for each of my clients [client names] based on my recent work notes and emails, then message me each draft so I can approve it with one tap. Do not send any email until I approve it, and flag any client who hasn't replied in [number] days with a suggested follow-up.
```

## Related use cases

- [Manage 18 agents from a Notion workspace](./manage-18-agents-from-a-notion-workspace.md)
- [Edit video through chat with subtitles and export](./edit-video-through-chat-with-subtitles-and-export.md)
- [Draft messages, fill web forms and prototype sites by chat](./draft-messages-fill-web-forms-and-prototype-sites-by-chat.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Check supplier invoices for duplicates and missing GST](./check-supplier-invoices-for-duplicates-and-missing-gst.md)
- [Give an agent a phone number to make and answer calls](./give-an-agent-a-phone-number-to-make-and-answer-calls.md)
