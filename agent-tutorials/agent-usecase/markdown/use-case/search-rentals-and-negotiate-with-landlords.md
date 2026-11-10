---
title: "Search rentals and negotiate with landlords"
slug: "search-rentals-and-negotiate-with-landlords"
summary: "An OpenClaw agent used browser automation to send 8 listing inquiries, tracked replies in a sheet and negotiated rent over three rounds in one example; showcase-style page."
category: "Life Admin & Home"
agents:
  - name: "OpenClaw"
    slug: "openclaw"
source_platform: "openclawcases.com"
source_date: "Undated"
source_url: "https://openclawcases.com/cases/openclaw-rental"
fetched_from: "https://agentusecases.ai/use-case/search-rentals-and-negotiate-with-landlords"
---

# Search rentals and negotiate with landlords

> An OpenClaw agent used browser automation to send 8 listing inquiries, tracked replies in a sheet and negotiated rent over three rounds in one example; showcase-style page.

**Category:** Life Admin & Home  
**Agent:** OpenClaw  
**Source:** openclawcases.com · Undated

## What they did

The agent drove a real browser (Browser Skill with Playwright MCP or browser-use) to open each of 8 listings, find the contact method and send the same three-question template. It logged send status and replies in a tracking sheet. For negotiation, the user set a target and walk-away price, and the agent ran the rounds itself, saving the conversation log for review.

## How it went

In the negotiation example, the landlord moved from $3,200 to $2,980 plus one month free after three rounds. The page gives no results for the 8 inquiries, and its examples read as illustrative rather than a documented run.

## Worth knowing

Set an explicit walk-away price and tell the agent not to open with your lowest number. The page says it should stop and report back once the landlord comes under your limit.

## Prompt

```text
Search [rental sites] for [property type] in [area] under [budget] with [must-haves]. Shortlist the best [number] listings, log them in a table with price, link and contact, and draft an inquiry for each. Pause and show me each message before sending. You're done when I've approved the messages and have a tracking table ready to update with replies.
```

## Related use cases

- [Manage 18 agents from a Notion workspace](./manage-18-agents-from-a-notion-workspace.md)
- [Edit video through chat with subtitles and export](./edit-video-through-chat-with-subtitles-and-export.md)
- [Draft messages, fill web forms and prototype sites by chat](./draft-messages-fill-web-forms-and-prototype-sites-by-chat.md)
- [Get a second opinion on an MRI](./get-a-second-opinion-on-an-mri.md)
- [Let Claude read Apple Health and Fitbit data via MCP](./let-claude-read-apple-health-and-fitbit-data-via-mcp.md)
- [Run pet relocation, Airbnb pricing, and disputes with agents](./run-pet-relocation-airbnb-pricing-and-disputes-with-agents.md)
