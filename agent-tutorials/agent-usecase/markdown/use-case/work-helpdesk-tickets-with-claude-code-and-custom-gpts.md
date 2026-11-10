---
title: "Work helpdesk tickets with Claude Code and custom GPTs"
slug: "work-helpdesk-tickets-with-claude-code-and-custom-gpts"
summary: "Support admins built CLIs and skills for Confluence, Jira and Zendesk with Claude Code, and used a custom GPT to draft ticket answers that had to be pasted back manually."
category: "Sales, Marketing & Support"
agents:
  - name: "Claude Code"
    slug: "claude-code"
  - name: "ChatGPT"
    slug: "chatgpt"
source_platform: "eesel.ai"
source_date: "Undated"
source_url: "https://www.eesel.ai/blog/how-to-use-claude-for-customer-support"
fetched_from: "https://agentusecases.ai/use-case/work-helpdesk-tickets-with-claude-code-and-custom-gpts"
---

# Work helpdesk tickets with Claude Code and custom GPTs

> Support admins built CLIs and skills for Confluence, Jira and Zendesk with Claude Code, and used a custom GPT to draft ticket answers that had to be pasted back manually.

**Category:** Sales, Marketing & Support  
**Agent:** Claude Code, ChatGPT  
**Source:** eesel.ai · Undated

## What they did

One admin, quoted from Hacker News, connected Zendesk, Jira, Confluence and GitHub to Claude Code. They built a CLI for each of Confluence, Jira and Zendesk, with matching skills and an OAuth login for each, in a couple of days. A separate admin built a custom GPT that answers tickets. Its replies had to be copied back into Zendesk by hand.

## How it went

The commenter says cross-tool search dropped from about 15 minutes of manual hunting to about one minute. The custom GPT drafts worked well, but the paste-back step stayed manual.

## Worth knowing

A Zendesk draft is stored locally and can't be written into the ticket from outside, so an external drafter can only post an internal note or feed a sidebar app.

## Prompt

```text
I work on support tickets in [Zendesk/Jira/other helpdesk] and keep answers in [Confluence/knowledge base]. Build me a small command-line tool and reusable skill that pulls a ticket by ID, searches our docs for relevant articles, and drafts a reply in our tone. Do not post or send anything; show me the draft and ask for approval first. You're done when I can run it on [ticket ID] and get a draft with links to the sources.
```

## Related use cases

- [Turn tickets into merged pull requests](./turn-tickets-into-merged-pull-requests.md)
- [Migrate a SaaS from AWS to DigitalOcean](./migrate-a-saas-from-aws-to-digitalocean.md)
- [Text every World Cup final score to a friends' Signal group](./text-every-world-cup-final-score-to-a-friends-signal-group.md)
- [Sell services through an agent that takes payment and delivers](./sell-services-through-an-agent-that-takes-payment-and-delive.md)
- [Answer home-service customer calls and text the owner](./answer-home-service-customer-calls-and-text-the-owner.md)
- [Find roofing leads and run AI voice outreach](./find-roofing-leads-and-run-ai-voice-outreach.md)
