---
title: "Find vegetarian restaurants and save notes via computer use"
slug: "find-vegetarian-restaurants-and-save-notes-via-computer-use"
summary: "The author ran Anthropic's computer-use demo in Docker and had Claude find 5 vegetarian-friendly restaurants near Bond Street and save details to a notepad file."
category: "Shopping & Errands"
agents:
  - name: "Claude computer use"
    slug: "claude-computer-use"
source_platform: "lovkush.substack.com"
source_date: "Undated"
source_url: "https://lovkush.substack.com/p/i-tried-anthropics-computer-use-agent"
fetched_from: "https://agentusecases.ai/use-case/find-vegetarian-restaurants-and-save-notes-via-computer-use"
---

# Find vegetarian restaurants and save notes via computer use

> The author ran Anthropic's computer-use demo in Docker and had Claude find 5 vegetarian-friendly restaurants near Bond Street and save details to a notepad file.

**Category:** Shopping & Errands  
**Agent:** Claude computer use  
**Source:** lovkush.substack.com · Undated

## What they did

Following Anthropic's setup instructions, the author installed Docker, created a Claude API key, ran one Terminal command and opened the web app. They gave Claude the restaurant task with Google already open. Claude searched, clicked a result and wrote a notepad file. The author watched the remote machine's screen and screenshots live.

## How it went

Setup worked first time and the text file was created. But Claude took a screenshot before a clicked page had loaded and made up an answer. The author found it not useful yet.

## Worth knowing

Claude can act before a page finishes loading and then invent results, so check the saved file's contents against the real pages.

## Prompt

```text
Find [number] [type, e.g. vegetarian-friendly] restaurants near [location or landmark]. For each, note the name, address, opening hours, and a one-line description, then save everything to a text file called [filename]. Stop once the file is saved and tell me where it is; don't make any bookings.
```

## Related use cases

- [Fill out a Form 1040 with computer use](./fill-out-a-form-1040-with-computer-use.md)
- [Research a blog post with Claude computer use](./research-a-blog-post-with-claude-computer-use.md)
- [Build a 52-node n8n workflow](./build-a-52-node-n8n-workflow.md)
- [Order groceries online with a local LLM skill](./order-groceries-online-with-a-local-llm-skill.md)
- [Compare grocery prices across stores from a list](./compare-grocery-prices-across-stores-from-a-list.md)
- [Buy a microwave from Costco](./buy-a-microwave-from-costco.md)
