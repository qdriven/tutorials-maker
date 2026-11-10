---
title: "Run a VC analyst agent over Telegram"
slug: "run-a-vc-analyst-agent-over-telegram"
summary: "A VC set up an OpenClaw agent as an analyst on a cheap VPS, reachable by Telegram, which he says could save dozens of hours per quarter."
category: "Work & Operations"
agents:
  - name: "OpenClaw"
    slug: "openclaw"
source_platform: "shriftman.substack.com"
source_date: "Undated"
source_url: "https://shriftman.substack.com/p/my-first-experience-with-openclaw"
fetched_from: "https://agentusecases.ai/use-case/run-a-vc-analyst-agent-over-telegram"
---

# Run a VC analyst agent over Telegram

> A VC set up an OpenClaw agent as an analyst on a cheap VPS, reachable by Telegram, which he says could save dozens of hours per quarter.

**Category:** Work & Operations  
**Agent:** OpenClaw  
**Source:** shriftman.substack.com · Undated

## What they did

Jonathan Shriftman installed OpenClaw on a $6.99/month Hostinger VPS with a Claude API key, paired it to Telegram through BotFather, and named the agent Pao. He asked it to audit its own security. He then started on a CRM replacement built on Supabase and Vercel, texting Pao to code and deploy. Portfolio monitoring and social media drafting are planned next.

## How it went

Setup took about 45 minutes. The security audit cost $0.30, and a basic CRM version cost about $25. Claude kept hitting its limits and deployments stalled. The models flattered him, and he couldn't tell what the sub-agents were doing. The portfolio monitoring is not yet built.

## Worth knowing

Costs are consumption-based: a partner spent $150 in a week of experimenting. Setup also assumes you're comfortable with API keys, SSH and the terminal.

## Prompt

```text
Act as my VC analyst, reachable by chat on [Telegram]. When I send a company name or URL, research it and reply with a one-page memo covering [what it does, team, funding, competitors, and red flags]. Keep it under [400] words, cite sources, and ask me before sending anything outside this chat or spending money on paid data.
```

## Related use cases

- [Manage 18 agents from a Notion workspace](./manage-18-agents-from-a-notion-workspace.md)
- [Edit video through chat with subtitles and export](./edit-video-through-chat-with-subtitles-and-export.md)
- [Draft messages, fill web forms and prototype sites by chat](./draft-messages-fill-web-forms-and-prototype-sites-by-chat.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Check supplier invoices for duplicates and missing GST](./check-supplier-invoices-for-duplicates-and-missing-gst.md)
- [Give an agent a phone number to make and answer calls](./give-an-agent-a-phone-number-to-make-and-answer-calls.md)
