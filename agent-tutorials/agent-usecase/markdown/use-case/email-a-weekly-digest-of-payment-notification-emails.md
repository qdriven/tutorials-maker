---
title: "Email a weekly digest of payment notification emails"
slug: "email-a-weekly-digest-of-payment-notification-emails"
summary: "An n8n AI workflow reads labeled payment emails in Gmail, pulls the top three takeaways from each and sends a Sunday digest."
category: "Work & Operations"
agents:
  - name: "n8n"
    slug: "n8n"
source_platform: "mariannanakos.substack.com"
source_date: "Undated"
source_url: "https://mariannanakos.substack.com/p/n8n-tutorial-built-an-ai-workflow"
fetched_from: "https://agentusecases.ai/use-case/email-a-weekly-digest-of-payment-notification-emails"
---

# Email a weekly digest of payment notification emails

> An n8n AI workflow reads labeled payment emails in Gmail, pulls the top three takeaways from each and sends a Sunday digest.

**Category:** Work & Operations  
**Agent:** n8n  
**Source:** mariannanakos.substack.com · Undated

## What they did

The author labels payment emails in Gmail, then builds an n8n workflow that runs Sunday at 8 AM. It fetches the past week's labeled messages, aggregates them, and truncates the text to 100K characters. An AI Agent node running gpt-4o-mini through OpenRouter writes the digest from a system-message template. A code node converts the markdown to HTML, and Gmail sends it.

## How it went

The author gets about 15 payment notifications a week, and the workflow turns them into one weekly digest email. The post gives no measured results beyond a successful test run.

## Worth knowing

Truncating to 100K characters keeps the combined email text within what OpenAI can handle. Without the formatting code node, the email shows raw markdown symbols.

## Prompt

```text
Build an n8n workflow that every Sunday reads emails under Gmail label [payment notifications] from the past week, has AI pull the top three takeaways from each, and compiles them into one digest. Send the digest to [my email]. It's finished when a test run produces a digest from the last week's labeled emails.
```

## Related use cases

- [Add todo items to Todoist from Telegram](./add-todo-items-to-todoist-from-telegram.md)
- [Run 24/7 WhatsApp support and track application status](./run-24-7-whatsapp-support-and-track-application-status.md)
- [Automate client onboarding and schedule PDFs](./automate-client-onboarding-and-schedule-pdfs.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Give a teacher a Claude Code workspace for lessons and reports](./give-a-teacher-a-claude-code-workspace-for-lessons-and-repor.md)
- [Give an agent a phone number to make and answer calls](./give-an-agent-a-phone-number-to-make-and-answer-calls.md)
