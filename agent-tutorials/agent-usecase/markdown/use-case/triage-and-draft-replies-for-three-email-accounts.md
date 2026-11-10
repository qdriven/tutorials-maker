---
title: "Triage and draft replies for three email accounts"
slug: "triage-and-draft-replies-for-three-email-accounts"
summary: "An OpenClaw agent drafted routine replies at about 70% ready quality and cut inbox processing from 10 to 2 minutes, though some things broke."
category: "Work & Operations"
agents:
  - name: "OpenClaw"
    slug: "openclaw"
source_platform: "dev.to"
source_date: "Mar 8, 2026"
source_url: "https://dev.to/jarveyspecter/i-let-an-ai-agent-manage-my-emails-for-30-days-heres-what-broke-4n12"
fetched_from: "https://agentusecases.ai/use-case/triage-and-draft-replies-for-three-email-accounts"
---

# Triage and draft replies for three email accounts

> An OpenClaw agent drafted routine replies at about 70% ready quality and cut inbox processing from 10 to 2 minutes, though some things broke.

**Category:** Work & Operations  
**Agent:** OpenClaw  
**Source:** dev.to · Mar 8, 2026

## What they did

An agent named Donna, running on an OpenClaw gateway, got IMAP and Microsoft Graph access to three accounts. Every 30 minutes in business hours it sorted mail into urgent, important, informational and noise, pinged urgent items on Telegram, and drafted routine replies. It never sent anything without approval. It also read a memory file of relationship notes.

## How it went

Triage was about 85% right, no urgent email was missed in 30 days, and routine drafts were about 70% ready. Tone, CC choices, context across sessions and relationship-sensitive emails went badly.

## Worth knowing

Define failure modes before deploying. The author narrowed the agent to routine, templated and newsletter mail, and had it flag negotiations, legal matters and established relationships without drafting.

## Prompt

```text
Connect to my email accounts [list accounts] and go through unread messages from the last [time period]. Sort them into needs reply, FYI, and ignore, and write draft replies for the routine ones in my usual tone, which is [describe tone]. Save the drafts as drafts only and never send anything without asking me first. Finish with a short summary of what is waiting on me.
```

## Related use cases

- [Manage 18 agents from a Notion workspace](./manage-18-agents-from-a-notion-workspace.md)
- [Edit video through chat with subtitles and export](./edit-video-through-chat-with-subtitles-and-export.md)
- [Draft messages, fill web forms and prototype sites by chat](./draft-messages-fill-web-forms-and-prototype-sites-by-chat.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Check supplier invoices for duplicates and missing GST](./check-supplier-invoices-for-duplicates-and-missing-gst.md)
- [Give an agent a phone number to make and answer calls](./give-an-agent-a-phone-number-to-make-and-answer-calls.md)
