---
title: "Draft email replies and LinkedIn posts with n8n workflows"
slug: "draft-email-replies-and-linkedin-posts-with-n8n-workflows"
summary: "The author built n8n workflows that draft Gmail replies for approval, generate LinkedIn posts from a topic, and extract tasks from emails into Google Tasks or Notion."
category: "Work & Operations"
agents:
  - name: "n8n"
    slug: "n8n"
source_platform: "learninwithak.substack.com"
source_date: "Undated"
source_url: "https://learninwithak.substack.com/p/lear-n8n-automation-in-few-steps"
fetched_from: "https://agentusecases.ai/use-case/draft-email-replies-and-linkedin-posts-with-n8n-workflows"
---

# Draft email replies and LinkedIn posts with n8n workflows

> The author built n8n workflows that draft Gmail replies for approval, generate LinkedIn posts from a topic, and extract tasks from emails into Google Tasks or Notion.

**Category:** Work & Operations  
**Agent:** n8n  
**Source:** learninwithak.substack.com · Undated

## What they did

The author built three n8n workflows. One reads new Gmail messages, sends the body to OpenAI or Gemini for a reply, asks for approval, then sends it through Gmail. Another takes a topic from a form, has OpenAI write a LinkedIn post, and saves it to Notion or emails it. The third watches Gmail, pulls out tasks by keyword or AI, and adds them to Google Tasks or Notion.

## How it went

The post gives no measured results. It only claims that small automations like these can save hours each week. Each workflow is shown in a linked video tutorial.

## Worth knowing

You can run n8n locally with npm or Docker, or use the cloud version. The author suggests starting with a simple test workflow first.

## Prompt

```text
Build me an n8n workflow that watches my Gmail for new emails matching [label or sender], drafts a reply in my tone using [short tone description], and saves it as a draft for me to approve. Add a second branch that extracts any tasks from the email into [Google Tasks or Notion database]. You're done when a test email produces both a draft and a task. Never send an email automatically; leave everything as a draft.
```

## Related use cases

- [Add todo items to Todoist from Telegram](./add-todo-items-to-todoist-from-telegram.md)
- [Run 24/7 WhatsApp support and track application status](./run-24-7-whatsapp-support-and-track-application-status.md)
- [Automate client onboarding and schedule PDFs](./automate-client-onboarding-and-schedule-pdfs.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Give a teacher a Claude Code workspace for lessons and reports](./give-a-teacher-a-claude-code-workspace-for-lessons-and-repor.md)
- [Give an agent a phone number to make and answer calls](./give-an-agent-a-phone-number-to-make-and-answer-calls.md)
