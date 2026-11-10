---
title: "Run a business assistant that resumes project work"
slug: "run-a-business-assistant-that-resumes-project-work"
summary: "Poster linked a ChatGPT-based assistant to OpenClaw on an old Mac to resume project work, but it keeps forgetting the app's business goals and audience."
category: "Work & Operations"
agents:
  - name: "OpenClaw"
    slug: "openclaw"
source_platform: "Reddit"
source_date: "Sep 18, 2026"
source_url: "https://www.reddit.com/r/AI_Agents/comments/1we0319/i_trusted_chatgpt_to_help_me_build_an_ai"
fetched_from: "https://agentusecases.ai/use-case/run-a-business-assistant-that-resumes-project-work"
---

# Run a business assistant that resumes project work

> Poster linked a ChatGPT-based assistant to OpenClaw on an old Mac to resume project work, but it keeps forgetting the app's business goals and audience.

**Category:** Work & Operations  
**Agent:** OpenClaw  
**Source:** Reddit · Sep 18, 2026

## What they did

The poster used a ChatGPT business account tied to OpenClaw on an old Intel MacBook they had turned into a server, after following setup steps involving Homebrew, Node, Docker, n8n, Tailscale, plugins, device pairing, approvals, and Codex supervision. The goal was for it to retain project context, access Microsoft 365 and Airtable work, and follow through on tasks, but the person mostly ended up pasting errors back into ChatGPT and following its troubleshooting instructions.

## How it went

It did manage to resume a project, but immediately hit the same usage limit they were trying to avoid. The result was more maintenance than assistance, with the poster saying they had effectively become the admin of an AI stack they did not understand.

## Worth knowing

A commenter’s practical rule was that if it saves five hours a week but takes four hours to maintain, it is just another responsibility.

## Prompt

```text
Act as my business assistant for [app/business name]. Keep a file with our business goals ([goals]), target audience ([audience]), and current project status, and read it at the start of every session before resuming work on [project]. At the end of each session, update the file with what you finished and what's next, and ask me before sending anything or making changes outside the project.
```

## Related use cases

- [Manage 18 agents from a Notion workspace](./manage-18-agents-from-a-notion-workspace.md)
- [Draft and publish blog posts with an SEO-aware agent](./draft-and-publish-blog-posts-with-an-seo-aware-agent.md)
- [Draft messages, fill web forms and prototype sites by chat](./draft-messages-fill-web-forms-and-prototype-sites-by-chat.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Check supplier invoices for duplicates and missing GST](./check-supplier-invoices-for-duplicates-and-missing-gst.md)
- [Give an agent a phone number to make and answer calls](./give-an-agent-a-phone-number-to-make-and-answer-calls.md)
