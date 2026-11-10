---
title: "Run cron agents for inbox, research and site audits"
slug: "run-cron-agents-for-inbox-research-and-site-audits"
summary: "The author runs two OpenClaw agents with 12 cron jobs covering inbox scanning, article indexing, research digests, Search Console analysis, site audits and health monitoring."
category: "Work & Operations"
agents:
  - name: "OpenClaw"
    slug: "openclaw"
source_platform: "buildtolaunch.substack.com"
source_date: "Undated"
source_url: "https://buildtolaunch.substack.com/p/openclaw-ai-agent-one-person-business"
fetched_from: "https://agentusecases.ai/use-case/run-cron-agents-for-inbox-research-and-site-audits"
---

# Run cron agents for inbox, research and site audits

> The author runs two OpenClaw agents with 12 cron jobs covering inbox scanning, article indexing, research digests, Search Console analysis, site audits and health monitoring.

**Category:** Work & Operations  
**Agent:** OpenClaw  
**Source:** buildtolaunch.substack.com · Undated

## What they did

Jenny Ouyang runs two OpenClaw agents on one Oracle Cloud ARM server. One is a personal assistant with memory, and the other is a website-building bot she shares with her business partner. Twelve cron jobs run on a schedule. Twice a day the inbox job reads new newsletter posts and searches her memory database for related work of hers. It saves the results to a database and a markdown report, which she reviews via Telegram or GitHub. She writes every comment herself.

## How it went

The inbox scanning works well for her. The jobs don't yet trigger each other, so handoffs are still manual. One agent wiped a database while debugging a seed conflict, and she restored it from backups.

## Worth knowing

Give agents scoped credentials with no DROP permission, keep automatic backups, and bind the gateway to localhost. Setup took longer than the documentation suggested.

## Prompt

```text
Set up scheduled jobs for me: every morning scan my inbox at [email account] and send me a short summary of what needs a reply, every week compile a research digest on [topic], and every month audit [my website URL] for broken links and slow pages. Send each result to me in [chat app] as a short list. Do not send, delete, or archive any email without showing me first; after setting up the jobs, show me the schedule and stop.
```

## Related use cases

- [Manage 18 agents from a Notion workspace](./manage-18-agents-from-a-notion-workspace.md)
- [Draft and publish blog posts with an SEO-aware agent](./draft-and-publish-blog-posts-with-an-seo-aware-agent.md)
- [Draft messages, fill web forms and prototype sites by chat](./draft-messages-fill-web-forms-and-prototype-sites-by-chat.md)
- [Run a solo company with eight agent departments](./run-a-solo-company-with-eight-agent-departments.md)
- [Check supplier invoices for duplicates and missing GST](./check-supplier-invoices-for-duplicates-and-missing-gst.md)
- [Give an agent a phone number to make and answer calls](./give-an-agent-a-phone-number-to-make-and-answer-calls.md)
