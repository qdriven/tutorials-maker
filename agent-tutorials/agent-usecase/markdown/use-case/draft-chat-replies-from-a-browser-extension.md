---
title: "Draft chat replies from a browser extension"
slug: "draft-chat-replies-from-a-browser-extension"
summary: "A browser extension sends the visible conversation to a Make webhook where ChatGPT analyzes it and drafts a reply."
category: "Sales, Marketing & Support"
agents:
  - name: "Make"
    slug: "make"
  - name: "ChatGPT"
    slug: "chatgpt"
source_platform: "Reddit"
source_date: "Jul 22, 2026"
source_url: "https://www.reddit.com/r/AiAutomations/comments/1um6i7c/what_are_some_of_the_coolest_ai_automations_youve"
fetched_from: "https://agentusecases.ai/use-case/draft-chat-replies-from-a-browser-extension"
---

# Draft chat replies from a browser extension

> A browser extension sends the visible conversation to a Make webhook where ChatGPT analyzes it and drafts a reply.

**Category:** Sales, Marketing & Support  
**Agent:** Make, ChatGPT  
**Source:** Reddit · Jul 22, 2026

## What they did

The setup was a simple Chrome extension used on Fiverr order messages. It added a Draft button in the message box; when clicked, it collected the visible prior messages and sent them to a Make webhook, where ChatGPT analyzed the chat and produced help for negotiation, breaking down requests, and drafting proposals.

## How it went

The poster says it was practical enough for live order management and also added one-click creation of new inquiries in ClickUp as their CRM. They gave no metrics, failure cases, or detail on how much editing the drafts still needed.

## Worth knowing

The main catch is that it only reads the visible messages in the conversation, so context may depend on what is loaded on screen.

## Prompt

```text
Build a Make scenario that starts with a webhook receiving the text of a chat conversation, sends it to ChatGPT with instructions to summarize the situation and draft a reply in [my tone, such as friendly and concise], and returns the draft to the webhook caller. Give me the webhook URL and a sample test request. The draft should only be shown to me and never sent automatically. Test it with [sample conversation] and show me the reply it drafts.
```

## Related use cases

- [Generate LEGO CAD models in LDraw with AI agents](./generate-lego-cad-models-in-ldraw-with-ai-agents.md)
- [Draft parent-teacher communications](./draft-parent-teacher-communications.md)
- [Plan daily schedules and household chores with ChatGPT](./plan-daily-schedules-and-household-chores-with-chatgpt.md)
- [Sell services through an agent that takes payment and delivers](./sell-services-through-an-agent-that-takes-payment-and-delive.md)
- [Run brand marketing end to end and publish to social](./run-brand-marketing-end-to-end-and-publish-to-social.md)
- [Pull Substack post stats via computer use](./pull-substack-post-stats-via-computer-use.md)
