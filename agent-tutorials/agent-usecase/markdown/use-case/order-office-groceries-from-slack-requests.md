---
title: "Order office groceries from Slack requests"
slug: "order-office-groceries-from-slack-requests"
summary: "A startup's OpenClaw agent collects Slack requests, compiles a list, gets approval, builds the Instacart cart via ChatGPT's app, and posts the link back."
category: "Shopping & Errands"
agents:
  - name: "OpenClaw"
    slug: "openclaw"
source_platform: "nekuda.substack.com"
source_date: "Undated"
source_url: "https://nekuda.substack.com/p/we-connected-openclaw-with-instacart"
fetched_from: "https://agentusecases.ai/use-case/order-office-groceries-from-slack-requests"
---

# Order office groceries from Slack requests

> A startup's OpenClaw agent collects Slack requests, compiles a list, gets approval, builds the Instacart cart via ChatGPT's app, and posts the link back.

**Category:** Shopping & Errands  
**Agent:** OpenClaw  
**Source:** nekuda.substack.com · Undated

## What they did

The team runs an OpenClaw assistant, Gila, on a local machine in their New York office, and teammates tag her in Slack. A skill.md tells her to collect grocery requests, compile a list, and get approval from an authorized person. She then types the list as free text into ChatGPT's Instacart app, which builds the cart, and she posts the cart link and summary to Slack.

## How it went

It worked end to end, and Gila ordered the office groceries. The authors call it more reliable than expected. They keep a human approval step before final payment. No numbers are given.

## Worth knowing

It only works with ChatGPT apps that have in-chat checkout, such as Instacart. It also depends on a consumer product that OpenAI could change.

## Prompt

```text
Every [Thursday], collect grocery and supply requests posted in the Slack channel [#channel-name] and compile them into one deduplicated list. Post the list to me and wait for my approval, then build the cart at [Instacart store] and post the cart link back in the channel. Do not place the order or spend any money without my explicit go-ahead.
```

## Related use cases

- [Manage 18 agents from a Notion workspace](./manage-18-agents-from-a-notion-workspace.md)
- [Edit video through chat with subtitles and export](./edit-video-through-chat-with-subtitles-and-export.md)
- [Draft messages, fill web forms and prototype sites by chat](./draft-messages-fill-web-forms-and-prototype-sites-by-chat.md)
- [Order groceries online with a local LLM skill](./order-groceries-online-with-a-local-llm-skill.md)
- [Find holiday gifts and check stock and sales](./find-holiday-gifts-and-check-stock-and-sales.md)
- [Compare Coca-Cola prices across Belgian supermarkets](./compare-coca-cola-prices-across-belgian-supermarkets.md)
