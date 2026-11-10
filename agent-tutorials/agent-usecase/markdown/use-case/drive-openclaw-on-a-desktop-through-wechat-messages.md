---
title: "Drive OpenClaw on a desktop through WeChat messages"
slug: "drive-openclaw-on-a-desktop-through-wechat-messages"
summary: "A tester used WorkBuddy to send WeChat messages controlling OpenClaw, including generating a document of recommended skills as a web page; it could not log into WeChat or message contacts. · Oct 31, 2026"
category: "Work & Operations"
agents:
  - name: "OpenClaw"
    slug: "openclaw"
source_platform: "sspai.com"
source_date: "Oct 31, 2026 · Submitted by from search gap: 微信"
source_url: "https://sspai.com/post/107186"
fetched_from: "https://agentusecases.ai/use-case/drive-openclaw-on-a-desktop-through-wechat-messages"
---

# Drive OpenClaw on a desktop through WeChat messages

> A tester used WorkBuddy to send WeChat messages controlling OpenClaw, including generating a document of recommended skills as a web page; it could not log into WeChat or message contacts. · Oct 31, 2026

**Category:** Work & Operations  
**Agent:** OpenClaw  
**Source:** sspai.com · Oct 31, 2026 · Submitted by from search gap: 微信

## What they did

The tester used WorkBuddy as a relay: a WeChat message goes to WorkBuddy, which has OpenClaw do the work on the desktop and send back the result. They asked it to write a Markdown file of 10 must-install skills, then to turn that file into a designed web page. The agent chose the frontend-design skill by itself. They also asked it to make a PDF on the desktop, and it wrote and ran a Python script to do that.

## How it went

The skills document, the web page and the desktop PDF were all produced. Tasks were mostly development and file generation, and complex ones took a long time to respond. It can't log into WeChat or message contacts.

## Worth knowing

Expect to wait on complex tasks, since the response chain gets long, and don't expect it to handle everyday chores like messaging people yet.

## Prompt

```text
I'll message you from [chat app] to control you on my desktop. Start with this task: research [topic, e.g. the best skills or plugins for my workflow] and produce a document of recommendations, published as a simple local web page. Reply with the file path when done, and pause and ask me before sending any message to another person or logging into any account.
```

## Related use cases

- [Manage 18 agents from a Notion workspace](./manage-18-agents-from-a-notion-workspace.md)
- [Draft and publish blog posts with an SEO-aware agent](./draft-and-publish-blog-posts-with-an-seo-aware-agent.md)
- [Track sleep, notes, code and earthquakes with a personal agent](./track-sleep-notes-code-and-earthquakes-with-a-personal-agent.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Check supplier invoices for duplicates and missing GST](./check-supplier-invoices-for-duplicates-and-missing-gst.md)
- [Give an agent a phone number to make and answer calls](./give-an-agent-a-phone-number-to-make-and-answer-calls.md)
